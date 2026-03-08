// © 2026 edison9733. All rights reserved.
'use client';
import { useInView } from '@/hooks/useInView';

export default function Events({ lumaUrl }) {
  const [ref, inView] = useInView();
  const calendarUrl = lumaUrl || 'https://lu.ma/mysuperteam';

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
            Find your tribe and ignite your passion. Scroll through our events below and RSVP directly.
          </p>
        </div>

        {/* ═══ Luma Calendar Embed ═══
             Scrollable Luma calendar embedded directly in the page.
             Users can browse events, see details, and RSVP without leaving your site. */}
        <div style={{
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          background: '#0a0a12',
          opacity: inView ? 1 : 0,
          transition: 'opacity 1s 0.2s',
        }}>
          <iframe
            src={calendarUrl}
            style={{
              width: '100%', height: 650, border: 'none',
              borderRadius: 16, colorScheme: 'dark',
            }}
            allowFullScreen
            aria-label="Superteam Malaysia Events on Luma"
          />
        </div>

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
