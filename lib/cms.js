// lib/cms.js
// Content fetching utilities for Superteam Malaysia website
// These functions are used by page components to fetch CMS-managed data.
// All data comes from Supabase — admins edit via the dashboard, the site reflects changes automatically.
// If Supabase is not configured, functions throw so the caller can use fallback data.

import { supabase } from './supabase';

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase not configured — using fallback data');
  }
  return supabase;
}

// ── EVENTS ─────────────────────────────────────────────────
export async function getEvents({ status, featured, limit } = {}) {
  let query = requireSupabase()
    .from('events')
    .select('*')
    .order('date', { ascending: status === 'upcoming' });

  if (status) query = query.eq('status', status);
  if (featured) query = query.eq('featured', true);
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getEventById(id) {
  const { data, error } = await requireSupabase()
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

// ── MEMBERS ────────────────────────────────────────────────
export async function getMembers({ skills, featured, search, limit } = {}) {
  let query = requireSupabase()
    .from('members')
    .select('*')
    .order('display_order', { ascending: true });

  if (featured) query = query.eq('featured', true);
  if (skills && skills.length > 0) query = query.overlaps('skills', skills);
  if (search) query = query.or(`name.ilike.%${search}%,role.ilike.%${search}%,company.ilike.%${search}%`);
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// ── PARTNERS ───────────────────────────────────────────────
export async function getPartners({ tier } = {}) {
  let query = requireSupabase()
    .from('partners')
    .select('*')
    .order('display_order', { ascending: true });

  if (tier) query = query.eq('tier', tier);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// ── TESTIMONIALS ───────────────────────────────────────────
export async function getTestimonials({ featured } = {}) {
  let query = requireSupabase()
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (featured) query = query.eq('featured', true);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// ── FAQs ───────────────────────────────────────────────────
export async function getFaqs() {
  const { data, error } = await requireSupabase()
    .from('faqs')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}

// ── ANNOUNCEMENTS ──────────────────────────────────────────
export async function getAnnouncements({ published = true } = {}) {
  let query = requireSupabase()
    .from('announcements')
    .select('*')
    .order('pinned', { ascending: false })
    .order('date', { ascending: false });

  if (published) query = query.eq('published', true);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// ── SITE CONTENT (Key-Value store) ─────────────────────────
export async function getSiteContent(section) {
  let query = requireSupabase().from('site_content').select('*');

  if (section) query = query.eq('section', section);

  const { data, error } = await query;
  if (error) throw error;

  // Convert to a key-value map for easy usage in components:
  // { hero_title: "Building Solana's Future...", hero_subtitle: "...", ... }
  const contentMap = {};
  data?.forEach((item) => {
    contentMap[item.key] = item.value;
  });
  return contentMap;
}

// ── COMBINED PAGE DATA (for SSG/ISR) ───────────────────────
// Fetch everything needed for the landing page in one call
export async function getLandingPageData() {
  const [content, events, members, partners, testimonials, faqs, announcements] =
    await Promise.all([
      getSiteContent(),
      getEvents({ status: 'upcoming', limit: 6 }),
      getMembers({ featured: true, limit: 8 }),
      getPartners(),
      getTestimonials({ featured: true }),
      getFaqs(),
      getAnnouncements({ published: true }),
    ]);

  return {
    content,
    events,
    members,
    partners,
    testimonials,
    faqs,
    announcements,
  };
}

// Fetch everything needed for the members page
export async function getMembersPageData() {
  const [members, content] = await Promise.all([
    getMembers(),
    getSiteContent('social'),
  ]);

  return { members, content };
}
