'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createClient } from '../../lib/supabase/browser';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accepted) { setError('Please accept the Terms of Use and Privacy Notice to continue.'); return; }
    setBusy(true); setError(''); setMessage('');
    try {
      const supabase = createClient();
      const { data, error: signupError } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: name.trim(), school_name: 'Minuyan National High School' } },
      });
      if (signupError) throw signupError;
      if (data.session) window.location.assign('/dashboard');
      else setMessage('Check your email for a confirmation link, then sign in to MUNI.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create your account.');
    } finally { setBusy(false); }
  }

  return <main className="auth"><div className="auth-card">
    <Link href="/" className="brand"><span>M</span><strong>MUNI</strong></Link>
    <p className="eyebrow" style={{marginTop:28}}>YOUR STUDENT WORKSPACE</p><h1>Make room to learn.</h1>
    <p className="muted">Create your account to keep your study life in one place.</p>
    <form onSubmit={register}>
      <label>Full name<input autoComplete="name" value={name} onChange={e=>setName(e.target.value)} required maxLength={100} placeholder="Your name"/></label>
      <label>Email address<input autoComplete="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={254} placeholder="you@example.com"/></label>
      <label>Password<input autoComplete="new-password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8} maxLength={128} placeholder="At least 8 characters"/></label>
      <label className="terms-check"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)}/> <span>I agree to the <Link href="/terms">Terms of Use</Link> and <Link href="/privacy">Privacy Notice</Link>.</span></label>
      {error && <p role="alert" className="error">{error}</p>}{message && <p role="status" className="success">{message}</p>}
      <button type="submit" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</button>
    </form>
    <p className="note">Already have an account? <Link href="/login">Sign in</Link>. Use MUNI respectfully and keep your password private.</p>
  </div></main>;
}
