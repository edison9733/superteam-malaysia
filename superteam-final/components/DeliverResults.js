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
    <section id="results" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
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

      <div className="results-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {RESULTS.map((r, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              border: `1px solid ${hovered === i ? 'rgba(20,241,149,0.3)' : 'rgba(255,255,255,0.06)'}`,
              background: hovered === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
              transition: 'all 0.3s ease',
              transform: hovered === i ? 'translateY(-4px)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Square-ish image */}
            <div style={{
              width: '100%', aspectRatio: '4/3', overflow: 'hidden', position: 'relative',
              background: 'linear-gradient(135deg, rgba(20,241,149,0.06), rgba(153,69,255,0.06))',
            }}>
              {r.poster && (
                <img src={r.poster} alt={r.title} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  opacity: hovered === i ? 0.8 : 0.5,
                  transition: 'opacity 0.4s',
                }}
                  onError={(ev) => { ev.target.style.display = 'none'; }}
                />
              )}
              <div style={{
                position: 'absolute', top: 16, right: 16,
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 16,
                border: '1px solid rgba(255,255,255,0.2)',
              }}>▶</div>
            </div>

            <div style={{ padding: 24 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#14F195', fontWeight: 700, marginBottom: 8 }}>{r.stat}</p>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff', margin: '0 0 10px' }}>{r.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 700px) {
          .results-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
