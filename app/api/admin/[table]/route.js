// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
// app/api/admin/[table]/route.js
// Generic CRUD API for all CMS tables
// Handles: GET (list), POST (create), PUT (update), DELETE (remove)
// Protected by auth + role check — only admin/editor can write

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ALLOWED_TABLES = [
  'events',
  'members',
  'partners',
  'testimonials',
  'faqs',
  'announcements',
  'site_content',
];

async function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  const { createRouteHandlerClient } = await import('@supabase/auth-helpers-nextjs');
  const cookieStore = cookies();
  return createRouteHandlerClient({ cookies: () => cookieStore });
}

async function getAuthenticatedClient() {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { error: 'Supabase not configured', status: 503 };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { error: 'Unauthorized', status: 401 };
  }

  // Check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!profile || !['admin', 'editor'].includes(profile.role)) {
    return { error: 'Forbidden — admin or editor role required', status: 403 };
  }

  return { supabase, session, profile };
}

// ── GET: List all items in a table ─────────────────────────
export async function GET(request, { params }) {
  const { table } = params;

  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  const supabase = await getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ data: [], count: 0, error: 'Supabase not configured' });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit')) || 100;
  const offset = parseInt(searchParams.get('offset')) || 0;
  const orderBy = searchParams.get('order_by') || 'created_at';
  const ascending = searchParams.get('ascending') === 'true';

  let query = supabase
    .from(table)
    .select('*', { count: 'exact' })
    .order(orderBy, { ascending })
    .range(offset, offset + limit - 1);

  // Optional filters via query params
  const status = searchParams.get('status');
  const featured = searchParams.get('featured');
  const section = searchParams.get('section');

  if (status) query = query.eq('status', status);
  if (featured === 'true') query = query.eq('featured', true);
  if (section) query = query.eq('section', section);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, count, limit, offset });
}

// ── POST: Create a new item ────────────────────────────────
export async function POST(request, { params }) {
  const { table } = params;

  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  const auth = await getAuthenticatedClient();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json();

  // Add created_by if column exists
  if (['events', 'announcements'].includes(table)) {
    body.created_by = auth.session.user.id;
  }

  const { data, error } = await auth.supabase
    .from(table)
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

// ── PUT: Update an existing item ───────────────────────────
export async function PUT(request, { params }) {
  const { table } = params;

  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  const auth = await getAuthenticatedClient();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  // Track who updated site content
  if (table === 'site_content') {
    updates.updated_by = auth.session.user.id;
  }

  const { data, error } = await auth.supabase
    .from(table)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// ── DELETE: Remove an item ─────────────────────────────────
export async function DELETE(request, { params }) {
  const { table } = params;

  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  const auth = await getAuthenticatedClient();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const { error } = await auth.supabase.from(table).delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
