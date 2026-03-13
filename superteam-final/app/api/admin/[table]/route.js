// app/api/admin/[table]/route.js — Generic CRUD API
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { FALLBACK_MEMBERS, FALLBACK_EVENTS, FALLBACK_PARTNERS, FALLBACK_TESTIMONIALS, FALLBACK_FAQS } from '@/lib/fallback-data';

const ALLOWED_TABLES = ['events','members','partners','testimonials','faqs','announcements','site_content','stats'];

const FALLBACK_MAP = {
  members: FALLBACK_MEMBERS,
  events: FALLBACK_EVENTS,
  partners: FALLBACK_PARTNERS,
  testimonials: FALLBACK_TESTIMONIALS,
  faqs: FALLBACK_FAQS,
  announcements: [],
  site_content: [],
  stats: [],
};

async function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return null;
  try {
    const { createClient } = await import('@supabase/supabase-js');
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  } catch { return null; }
}

export async function GET(request, { params }) {
  const { table } = params;
  if (!ALLOWED_TABLES.includes(table)) return NextResponse.json({ error: 'Invalid table' }, { status: 400 });

  const supabase = await getSupabaseClient();
  if (!supabase) {
    // Return fallback data when Supabase not configured
    const fallback = FALLBACK_MAP[table] || [];
    return NextResponse.json({ data: fallback, count: fallback.length, source: 'fallback' });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit')) || 100;
  const offset = parseInt(searchParams.get('offset')) || 0;
  const orderBy = searchParams.get('order_by') || 'created_at';
  const ascending = searchParams.get('ascending') === 'true';

  let query = supabase.from(table).select('*', { count: 'exact' }).order(orderBy, { ascending }).range(offset, offset + limit - 1);
  const status = searchParams.get('status');
  const featured = searchParams.get('featured');
  if (status) query = query.eq('status', status);
  if (featured === 'true') query = query.eq('featured', true);

  const { data, error, count } = await query;
  if (error) {
    const fallback = FALLBACK_MAP[table] || [];
    return NextResponse.json({ data: fallback, count: fallback.length, source: 'fallback' });
  }
  if (!data || data.length === 0) {
    const fallback = FALLBACK_MAP[table] || [];
    return NextResponse.json({ data: fallback, count: fallback.length, source: 'fallback' });
  }
  return NextResponse.json({ data, count, limit, offset, source: 'supabase' });
}

export async function POST(request, { params }) {
  const supabase = await getSupabaseClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  const body = await request.json();
  const { data, error } = await supabase.from(params.table).insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PUT(request, { params }) {
  const supabase = await getSupabaseClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const { data, error } = await supabase.from(params.table).update(updates).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(request, { params }) {
  const supabase = await getSupabaseClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const { error } = await supabase.from(params.table).delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
