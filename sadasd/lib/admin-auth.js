// lib/admin-auth.js
// Simple admin authentication for Superteam Malaysia CMS
// Uses ADMIN_PASSWORD env var + session cookie

import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'superteam-my-admin-2026';
const SESSION_TOKEN = process.env.ADMIN_SESSION_SECRET || 'stmy-session-secret-change-me';

// Simple hash for session validation (not crypto-grade, but sufficient for admin panel)
function generateSessionToken(password) {
  // Create a predictable token from password + secret
  const combined = `${password}:${SESSION_TOKEN}:superteam-malaysia`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return `stmy_${Math.abs(hash).toString(36)}_${Buffer.from(combined).toString('base64').slice(0, 16)}`;
}

export const VALID_TOKEN = generateSessionToken(ADMIN_PASSWORD);

// Verify admin session from API route
export function verifyAdminSession(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_session=([^;]+)/);
  const token = match ? match[1] : null;
  return token === VALID_TOKEN;
}

// Verify password and return session token
export function verifyPassword(password) {
  if (password === ADMIN_PASSWORD) {
    return VALID_TOKEN;
  }
  return null;
}
