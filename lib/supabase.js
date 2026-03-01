// lib/supabase.js
// Supabase client configuration for Superteam Malaysia CMS
// Provides both public (read-only) and admin (authenticated) clients
// SAFE: Returns null if env vars are not configured (allows build without Supabase)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// ── Public client (browser-safe, respects RLS) ─────────────
// Used for: reading public content on the website
// Returns null if Supabase is not configured
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ── Server-side admin client (bypasses RLS) ────────────────
// Used for: admin API routes only. NEVER expose to the browser.
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;

// ── Auth helpers ────────────────────────────────────────────
export async function getSession() {
  if (!supabase) return null;
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

export async function getUserProfile(userId) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function isAdminOrEditor(userId) {
  const profile = await getUserProfile(userId);
  return ['admin', 'editor'].includes(profile?.role);
}
