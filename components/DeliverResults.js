'use client';
import { useState } from 'react';

const RESULTS = [
  { stat: '10+ Hackathons', title: 'Hackathon Highlights', desc: 'World-class hackathons bringing the best Solana builders together.', poster: '/results/hackathonhighlights.jpeg', link: '#' },
  { stat: '30+ Events', title: 'Community Events', desc: 'Monthly meetups, workshops, and demo days for the Malaysian Solana community.', poster: '/results/communityevents.jpeg', link: '#' },
  { stat: '$500K+ in Grants', title: 'Builder Success', desc: 'Helping Malaysian builders access Solana Foundation grants and ecosystem funding.', poster: '/results/buildersuccess.jpeg', link: '#' },
];

export default function DeliverResults() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="results" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <h2 className="section-title" style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 800,
        fontSize: 'clamp(36px, 6vw, 64px)', textAlign: 'center',
        marginBottom: 16,
        transition: 'opacity 0.5s ease, text-shadow 0.5s ease',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>We Deliver </span>
        <span style={{ color: '#14F195', fontStyle: 'italic' }}>Results.</span>
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 56 }}>
        Hover to preview, click to see the full story on 𝕏.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {RESULTS.map((r, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              minHeight: 220,
              transition: 'border-color 0.3s, transform 0.3s',
              transform: hovered === i ? 'translateY(-3px)' : 'none',
              borderColor: hovered === i ? 'rgba(20,241,149,0.3)' : 'rgba(255,255,255,0.06)',
              cursor: 'pointer',
            }}
          >
            {/* Poster image — 45% visible */}
            {r.poster && (
              <div style={{
                position: 'absolute', inset: 0,
                opacity: hovered === i ? 0.45 : 0.2,
                transition: 'opacity 0.5s ease',
              }}>
                <img src={r.poster} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(ev) => { ev.target.style.display = 'none'; }}
                />
              </div>
            )}

            {/* Content overlay */}
            <div style={{
              position: 'relative', zIndex: 2,
              padding: 32,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%)',
            }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#14F195', fontWeight: 700, marginBottom: 8 }}>{r.stat}</p>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 24, color: '#fff', margin: '0 0 10px' }}>{r.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>{r.desc}</p>
            </div>

            {/* Play button */}
            <div style={{
              position: 'absolute', top: 20, right: 20, zIndex: 3,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 16,
              border: '1px solid rgba(255,255,255,0.2)',
            }}>▶</div>
          </div>
        ))}
      </div>
    </section>
  );
}
