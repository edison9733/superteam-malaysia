'use client';
import { useState } from 'react';
import { FALLBACK_EVENTS } from '../lib/fallback-data';

const TYPE_EMOJI = { hackathon: '🏆', meetup: '🤝', workshop: '🛠️', bootcamp: '🎓', demo: '🎤', demo_day: '🎤', 'ecosystem-sync': '🔄', networking: '🌐', other: '📌' };

function formatDate(dateStr) {
  if (!dateStr) return '';
  try { return new Date(dateStr).toLocaleDateString('en-MY', { month: 'short', year: 'numeric' }); } catch { return dateStr; }
}

export default function Events({ events: propEvents }) {
  const [hovered, setHovered] = useState(null);
  const evts = (propEvents && propEvents.length > 0) ? propEvents : FALLBACK_EVENTS;

  return (
    <section id="events" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <h2 className="section-title" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 56px)', textAlign: 'center', color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
        Our <span style={{ color: '#14F195', fontStyle: 'italic' }}>Events</span>
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 48 }}>
        30+ events hosted. Hackathons, workshops, demo days, and community meetups.
      </p>

      <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {evts.slice(0, 6).map((e, i) => {
          const title = e.title;
          const type = e.type || e.event_type || 'other';
          const emoji = TYPE_EMOJI[type] || '📌';
          const date = e.date ? formatDate(e.date) : '';
          const desc = e.description || e.desc || '';
          const location = e.location || e.venue || '';
          const prize = e.prize_pool || e.prize || '';
          const image = e.image_url || e.image || null;
          const link = e.luma_url || e.link || 'https://lu.ma/mysuperteam';

          return (
            <a key={i} href={link} target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex', flexDirection: 'column', textDecoration: 'none', borderRadius: 20, overflow: 'hidden',
                border: `1px solid ${hovered === i ? 'rgba(20,241,149,0.3)' : 'rgba(255,255,255,0.06)'}`,
                background: hovered === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                transition: 'all 0.3s ease', transform: hovered === i ? 'translateY(-4px)' : 'none',
              }}>
              <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(20,241,149,0.08), rgba(153,69,255,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {image ? (
                  <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(ev) => { ev.target.style.display = 'none'; ev.target.parentElement.innerHTML = `<span style="color:rgba(255,255,255,0.2);font-size:40px">${emoji}</span>`; }} />
                ) : <span style={{ fontSize: 40 }}>{emoji}</span>}
              </div>
              <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#14F195', fontWeight: 600 }}>{emoji} {type.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{date}</span>
                </div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', margin: '0 0 8px' }}>{title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: '0 0 12px', lineHeight: 1.5, flex: 1 }}>{desc}</p>
                <div style={{ display: 'flex', gap: 12, fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.35)', flexWrap: 'wrap' }}>
                  {location && <span>📍 {location}</span>}
                  {prize && <span>💰 {prize}</span>}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <a href="https://lu.ma/mysuperteam" target="_blank" rel="noopener noreferrer" className="cta-bounce" style={{
          display: 'inline-block', padding: '14px 32px',
          background: 'linear-gradient(135deg, #14F195, #0fcc7d)', color: '#000',
          borderRadius: 50, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
          textDecoration: 'none', boxShadow: '0 0 24px rgba(20,241,149,0.35)',
        }}>Browse All Events on Luma →</a>
      </div>

      <style jsx>{`
        @media (max-width: 700px) { .events-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
