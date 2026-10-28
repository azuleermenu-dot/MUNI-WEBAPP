'use client';

import { FormEvent, useState } from 'react';
import { createClient } from '../../lib/supabase/browser';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      window.location.assign('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth">
      <div className="auth-card">
        <div className="brand"><span>M</span><strong>MUNI</strong></div>
        <p className="eyebrow">STUDENT ACCESS</p>
        <h1>Welcome back.</h1>
        <p className="muted">Sign in to continue your study plan.</p>
        <form onSubmit={signIn}>
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" minLength={6} required /></label>
          {error && <p role="alert" className="error">{error}</p>}
          <button type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        </form>
        <p className="note">Your account is securely handled by the existing MUNI Supabase project.</p>
      </div>
    </main>
  );
}
