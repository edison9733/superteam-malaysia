// app/api/auth/login/route.js
// Admin login via Supabase Auth (email + password)

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json(
      { error: 'Supabase not configured. Set environment variables first.' },
      { status: 503 }
    );
  }

  const { createRouteHandlerClient } = await import('@supabase/auth-helpers-nextjs');
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // Check if user has admin/editor role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', data.user.id)
    .single();

  if (!profile || !['admin', 'editor'].includes(profile.role)) {
    await supabase.auth.signOut();
    return NextResponse.json(
      { error: 'Access denied. Admin or editor role required.' },
      { status: 403 }
    );
  }

  return NextResponse.json({
    user: {
      id: data.user.id,
      email: data.user.email,
      name: profile.full_name,
      role: profile.role,
    },
  });
}
