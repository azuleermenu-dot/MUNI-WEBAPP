'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createClient } from '../../lib/supabase/browser';

function friendlyError(message: string) {
  const value = message.toLowerCase();
  if (value.includes('invalid login credentials')) return 'That email and password combination did not match. Check them and try again.';
  if (value.includes('email not confirmed')) return 'Please confirm your email first. Check your inbox, including spam.';
  if (value.includes('too many requests')) return 'Too many attempts. Please wait a little and try again.';
  return 'We could not sign you in right now. Check your details and connection, then try again.';
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(''); setNotice('');
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(), password,
      });
      if (signInError) throw signInError;
      window.location.assign('/dashboard');
    } catch (err) {
      setError(friendlyError(err instanceof Error ? err.message : 'Sign in failed.'));
    } finally { setBusy(false); }
  }

  async function resendConfirmation() {
    if (!email.trim()) { setError('Enter your email address first.'); return; }
    setBusy(true); setError(''); setNotice('');
    try {
      const { error: resendError } = await createClient().auth.resend({
        type: 'signup', email: email.trim().toLowerCase(),
      });
      if (resendError) throw resendError;
      setNotice('If that address has a pending confirmation, a new email is on its way.');
    } catch {
      setError('We could not resend the confirmation email. Wait a moment and try again.');
    } finally { setBusy(false); }
  }

  return (
    <main className="auth auth-background">
      <section className="auth-card auth-card-modern">
        <Link href="/" className="brand"><span>M</span><strong>MUNI</strong></Link>
        <div className="auth-intro">
          <p className="eyebrow">YOUR STUDENT WORKSPACE</p>
          <h1>Welcome<br /><em>back.</em></h1>
          <p className="muted">Pick up where you left off. Your next small step starts here.</p>
        </div>
        <form onSubmit={signIn} className="auth-form-modern">
          <label>Email address
            <input autoComplete="username" type="email" inputMode="email" value={email}
              onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
              required maxLength={254} />
          </label>
          <label>Password
            <span className="password-field">
              <input autoComplete="current-password" type={showPassword ? 'text' : 'password'}
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password" required maxLength={128} />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
            </span>
          </label>
          <div className="auth-inline"><span className="muted-small">Use your MUNI account</span><Link href="/forgot-password">Forgot password?</Link></div>
          {error && <p role="alert" className="auth-message error">{error}</p>}
          {notice && <p role="status" className="auth-message success">{notice}</p>}
          <button className="auth-submit" type="submit" disabled={busy}>{busy ? 'Signing you in…' : 'Sign in'} <span aria-hidden="true">→</span></button>
          {error.toLowerCase().includes('confirm your email') && <button className="text-action" type="button" disabled={busy} onClick={() => void resendConfirmation()}>Resend confirmation email</button>}
        </form>
        <div className="auth-divider"><span>NEW TO MUNI?</span></div>
        <Link className="auth-secondary" href="/signup">Create a student account</Link>
        <p className="auth-legal">By continuing, you agree to use MUNI respectfully. <Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link></p>
      </section>
    </main>
  );
}
