'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createClient } from '../../lib/supabase/browser';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3;
  const strengthLabel = ['', 'Too short', 'Getting there', 'Good length'][strength];

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) { setError('Choose a password with at least 8 characters.'); return; }
    if (!accepted) { setError('Please accept the Terms of Use and Privacy Notice to continue.'); return; }
    setBusy(true); setError(''); setMessage('');
    try {
      const supabase = createClient();
      const { data, error: signupError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(), password,
        options: { data: { full_name: name.trim(), school_name: 'Minuyan National High School' } },
      });
      if (signupError) {
        const lower = signupError.message.toLowerCase();
        if (lower.includes('already registered') || lower.includes('already been registered')) throw new Error('An account may already exist for this email. Try signing in or resetting your password.');
        throw signupError;
      }
      if (data.session) window.location.assign('/dashboard');
      else setMessage('Your account request is ready. Check your inbox for the confirmation link. Once confirmed, sign in to MUNI.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not create your account. Please try again.');
    } finally { setBusy(false); }
  }

  return <main className="auth auth-background"><section className="auth-card auth-card-modern">
    <Link href="/" className="brand"><span>M</span><strong>MUNI</strong></Link>
    <div className="auth-intro"><p className="eyebrow">A BETTER WAY TO STUDY</p><h1>Your goals.<br /><em>Your pace.</em></h1><p className="muted">Create your free student workspace and make school feel more manageable.</p></div>
    <form onSubmit={register} className="auth-form-modern">
      <label>Full name<input autoComplete="name" value={name} onChange={e=>setName(e.target.value)} required maxLength={100} placeholder="What should we call you?"/></label>
      <label>Email address<input autoComplete="email" type="email" inputMode="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={254} placeholder="you@example.com"/></label>
      <label>Create password<span className="password-field"><input autoComplete="new-password" type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required minLength={8} maxLength={128} placeholder="At least 8 characters"/><button type="button" className="password-toggle" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword?'Hide password':'Show password'}>{showPassword?'Hide':'Show'}</button></span></label>
      {password.length > 0 && <div className="password-strength" aria-live="polite"><div className="strength-track"><i style={{width:strength===1?'33%':strength===2?'66%':'100%'}} /></div><span>{strengthLabel} · Use a unique password you do not use elsewhere.</span></div>}
      <label className="terms-check"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)}/> <span>I agree to the <Link href="/terms">Terms of Use</Link> and <Link href="/privacy">Privacy Notice</Link>.</span></label>
      {error && <p role="alert" className="auth-message error">{error}</p>}{message && <p role="status" className="auth-message success">{message}</p>}
      <button className="auth-submit" type="submit" disabled={busy}>{busy ? 'Creating your account…' : 'Create account'} <span aria-hidden="true">→</span></button>
    </form>
    <div className="auth-divider"><span>ALREADY WITH MUNI?</span></div>
    <Link className="auth-secondary" href="/login">Sign in instead</Link>
    <p className="auth-legal">Your study space belongs to you. Keep your password private. <Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link></p>
  </section></main>;
}
