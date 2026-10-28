'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createClient } from '../../lib/supabase/browser';

export default function ForgotPassword() {
  const [email,setEmail]=useState('');
  const [busy,setBusy]=useState(false);
  const [sent,setSent]=useState(false);
  const [error,setError]=useState('');
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setError('');
    try{
      const {error}=await createClient().auth.resetPasswordForEmail(email.trim().toLowerCase(),{redirectTo: `${window.location.origin}/reset-password`});
      if(error)throw error;
      setSent(true);
    }catch{setError('We could not send a reset link right now. Check your email address and try again.');}
    finally{setBusy(false);}
  }
  return <main className="auth auth-background"><section className="auth-card auth-card-modern"><Link href="/" className="brand"><span>M</span><strong>MUNI</strong></Link><div className="auth-intro"><p className="eyebrow">ACCOUNT RECOVERY</p><h1>Let’s get you<br/><em>back in.</em></h1><p className="muted">We’ll send a password reset link to the email connected to your MUNI account.</p></div>{sent?<div className="auth-message success" role="status">If an account matches that email, a reset link will arrive shortly. Check your inbox and spam folder.</div>:<form className="auth-form-modern" onSubmit={submit}><label>Email address<input type="email" autoComplete="email" inputMode="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={254} placeholder="you@example.com"/></label>{error&&<p role="alert" className="auth-message error">{error}</p>}<button className="auth-submit" type="submit" disabled={busy}>{busy?'Sending link…':'Send reset link'} <span aria-hidden="true">→</span></button></form>}<Link className="auth-secondary" href="/login">Back to sign in</Link><p className="auth-legal">For your security, MUNI does not reveal whether an email address has an account.</p></section></main>;
}
