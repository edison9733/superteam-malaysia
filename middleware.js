// middleware.js
// Protects /admin routes — redirects unauthenticated users to /admin/login

import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();

  // Only protect admin routes
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return res;
  }

  // Allow the login page itself
  if (req.nextUrl.pathname === '/admin/login') {
    return res;
  }

  // Allow API routes (they handle their own auth)
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return res;
  }

  // If Supabase is not configured, allow access (dev mode)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return res;
  }

  try {
    const { createMiddlewareClient } = await import('@supabase/auth-helpers-nextjs');
    const supabase = createMiddlewareClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  } catch (err) {
    // If auth check fails, allow through (will be caught by API auth)
    console.error('Middleware auth error:', err.message);
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
