// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';
import { useState } from 'react';

export default function Events({ events = [], lumaUrl }) {
  const [ref, inView] = useInView();
  const [tab, setTab] = useState('upcoming');
  const filtered = events.filter((e) => e.status === tab);

  return (
    <section id="events" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          flexWrap: 'wrap', gap: 20, marginBottom: 48,
        }}>
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s',
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#03E1FF', letterSpacing: 2, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Events</span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0, color: '#fff' }}>
              Join Us for Our{' '}
              <span style={{ fontStyle: 'italic', fontFamily: "'Instrument Serif', serif", color: '#14F195' }}>Upcoming Events</span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginTop: 12, maxWidth: 500 }}>
              Find your tribe and ignite your passion. Our events are the best place to learn, build, and connect.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['upcoming', 'past'].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '8px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: tab === t ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: tab === t ? '#fff' : 'rgba(255,255,255,0.4)',
                border: tab === t ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
                transition: 'all 0.3s', textTransform: 'capitalize', fontFamily: "'Outfit', sans-serif",
              }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {filtered.map((e, i) => (
            <a key={e.id} href={e.luma_url || lumaUrl || '#'} target="_blank" rel="noopener noreferrer" className="glass-card" style={{
              display: 'block', padding: 24, textDecoration: 'none',
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 0.08}s`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, background: 'rgba(3,225,255,0.1)', color: '#03E1FF', textTransform: 'capitalize' }}>{e.type}</span>
                {e.featured && <span style={{ padding: '4px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700, background: 'rgba(255,215,0,0.1)', color: '#FFD700' }}>★ Featured</span>}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{e.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 12px', lineHeight: 1.6 }}>{e.description}</p>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                <span>📅 {e.date}</span><span>🕐 {e.time}</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>📍 {e.location}</div>
            </a>
          ))}
        </div>

        {/* Embedded Luma Calendar */}
        <div style={{ marginTop: 48, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          <iframe
            src={`https://lu.ma/embed/calendar/cal-${(lumaUrl || 'https://lu.ma/mysuperteam').split('/').pop()}/events`}
            style={{ width: '100%', height: 450, border: 'none', background: 'rgba(0,0,0,0.3)', borderRadius: 20 }}
            allowFullScreen
            aria-label="Luma Calendar"
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href={lumaUrl || 'https://lu.ma/mysuperteam'} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 100,
            background: 'rgba(3,225,255,0.08)', border: '1px solid rgba(3,225,255,0.2)', color: '#03E1FF',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
          }}>View All Events on Luma ↗</a>
        </div>
      </div>
    </section>
  );
}
