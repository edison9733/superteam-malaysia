// © 2026 edison9733. All rights reserved.
'use client';
import { useInView } from '@/hooks/useInView';

export default function Events({ lumaUrl }) {
  const [ref, inView] = useInView();
  const calendarUrl = lumaUrl || 'https://lu.ma/mysuperteam';

  /* ═══════════════════════════════════════════════════════
     HOW TO GET YOUR LUMA EMBED URL (step by step):

     1. Go to https://lu.ma/mysuperteam
     2. Click your profile icon (top right) → "Manage Calendar"
     3. Click "Settings" → "Embed"
     4. Copy the embed URL they give you
     5. Replace the src= URL in the iframe below

     The URL format looks like:
     https://lu.ma/embed/calendar/cal-XXXXXXXXXXXXXXXX/events

     The XXXXXXXXXXXXXXXX is your unique calendar ID,
     NOT "mysuperteam". That's why it shows "No Upcoming Events".
  ═══════════════════════════════════════════════════════ */

  // ★★★ REPLACE THIS URL with your actual Luma embed URL from step 4 above ★★★
  const LUMA_EMBED_URL = 'https://lu.ma/embed/calendar/cal-PASTE_YOUR_ID_HERE/events';

  // While you haven't set up the embed URL yet, show the direct Luma page
  const useDirectUrl = LUMA_EMBED_URL.includes('PASTE_YOUR_ID_HERE');

  return (
    <section id="events" ref={ref} style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 40,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s',
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff',
            margin: '0 0 12px', letterSpacing: '-0.02em',
          }}>
            Join Us for Our{' '}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#14F195' }}>
              Upcoming Events
            </span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 460, margin: '0 auto' }}>
            Browse our events, RSVP, and join the community.
          </p>
        </div>

        {useDirectUrl ? (
          /* Fallback: link to Luma instead of broken iframe */
          <div style={{
            borderRadius: 16, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,0,0,0.2)',
            padding: '60px 24px', textAlign: 'center',
            opacity: inView ? 1 : 0, transition: 'opacity 1s 0.2s',
          }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>📅</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>
              Superteam Malaysia Events
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '0 0 24px', lineHeight: 1.6 }}>
              View our upcoming events, RSVP, and join weekly ecosystem syncs.
            </p>
            <a href={calendarUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 100,
              background: 'linear-gradient(135deg, #9945FF, #14F195)',
              color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'none',
            }}>Browse Events on Luma ↗</a>
          </div>
        ) : (
          /* Real Luma embed (once you paste your calendar ID) */
          <div style={{
            borderRadius: 16, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            background: '#0a0a12',
            opacity: inView ? 1 : 0, transition: 'opacity 1s 0.2s',
          }}>
            <iframe
              src={LUMA_EMBED_URL}
              style={{ width: '100%', height: 700, border: 'none', borderRadius: 16 }}
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
            />
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href={calendarUrl} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 100,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600, textDecoration: 'none',
          }}>View Full Calendar on Luma ↗</a>
        </div>
      </div>
    </section>
  );
}
