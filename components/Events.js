// © 2026 edison9733. All rights reserved.
'use client';
import { useInView } from '@/hooks/useInView';
import { useEffect } from 'react';

export default function Events({ lumaUrl }) {
  const [ref, inView] = useInView();
  const calendarUrl = lumaUrl || 'https://lu.ma/mysuperteam';

  // Load Luma embed script
  useEffect(() => {
    const id = 'luma-checkout-script';
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.src = 'https://embed.lu.ma/checkout-button.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

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

        {/* Luma Calendar Embed */}
        <div
          className="luma-embed"
          style={{
            borderRadius: 16, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            opacity: inView ? 1 : 0,
            transition: 'opacity 1s 0.2s',
          }}
        >
          <iframe
            src="https://lu.ma/embed/calendar/cal-mysuperteam/events?lt=light"
            style={{ width: '100%', height: 700, border: 'none', borderRadius: 16 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
          />
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 16 }}>
          If events do not load above,{' '}
          <a href={calendarUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#03E1FF', textDecoration: 'underline' }}>
            view them directly on Luma
          </a>
        </p>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
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
