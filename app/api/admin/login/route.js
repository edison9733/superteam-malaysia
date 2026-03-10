// app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/admin-auth';

export async function POST(request) {
  try {
    const { password } = await request.json();
    const token = verifyPassword(password);

    if (!token) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
