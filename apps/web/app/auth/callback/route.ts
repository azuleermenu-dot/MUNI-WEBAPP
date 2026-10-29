import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const tokenHash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type');
  const next = url.searchParams.get('next');
  const destination = next && next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';
  const supabase = await createClient();

  // Supabase PKCE flow: exchange the one-time code for a cookie-backed session.
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(destination, url.origin));
  }

  // Also support Supabase email templates that use token_hash/type verification.
  if (tokenHash && (type === 'signup' || type === 'email' || type === 'recovery' || type === 'invite' || type === 'magiclink' || type === 'email_change')) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return NextResponse.redirect(new URL(destination, url.origin));
  }

  return NextResponse.redirect(new URL('/login?verification=failed', url.origin));
}
