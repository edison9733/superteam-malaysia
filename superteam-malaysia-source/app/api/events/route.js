// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
// app/api/events/route.js
// Fetches events from Luma API with Supabase fallback
// GET /api/events?status=upcoming

import { NextResponse } from 'next/server';

const LUMA_API_BASE = 'https://api.lu.ma/public/v2';
const LUMA_CALENDAR_ID = process.env.LUMA_CALENDAR_ID || 'superteammy';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'upcoming';

  // Try Luma API first (if key is available)
  if (process.env.LUMA_API_KEY) {
    try {
      const lumaRes = await fetch(
        `${LUMA_API_BASE}/calendar/${LUMA_CALENDAR_ID}/events?status=${status}`,
        {
          headers: { 'x-luma-api-key': process.env.LUMA_API_KEY },
          next: { revalidate: 300 },
        }
      );

      if (lumaRes.ok) {
        const lumaData = await lumaRes.json();
        const events = lumaData.entries?.map((entry) => ({
          id: entry.event.api_id,
          title: entry.event.name,
          description: entry.event.description_short,
          date: entry.event.start_at?.split('T')[0],
          time: entry.event.start_at?.split('T')[1]?.slice(0, 5),
          location: entry.event.geo_address_info?.full_address || 'Online',
          type: entry.event.event_type || 'meetup',
          status: new Date(entry.event.start_at) > new Date() ? 'upcoming' : 'past',
          luma_url: entry.event.url,
          image_url: entry.event.cover_url,
          featured: false,
        }));

        return NextResponse.json({ data: events, source: 'luma' });
      }
    } catch (err) {
      console.error('Luma API error:', err.message);
    }
  }

  // Fallback to Supabase (if configured)
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { supabase } = await import('@/lib/supabase');
      if (supabase) {
        let query = supabase
          .from('events')
          .select('*')
          .order('date', { ascending: status === 'upcoming' });

        if (status) query = query.eq('status', status);

        const { data, error } = await query;
        if (error) throw error;

        return NextResponse.json({ data, source: 'supabase' });
      }
    } catch (err) {
      console.error('Supabase fallback error:', err.message);
    }
  }

  // Final fallback: return empty array (page will use fallback data)
  return NextResponse.json({ data: [], source: 'fallback' });
}
