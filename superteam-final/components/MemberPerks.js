'use client';
import { useState } from 'react';

const PERKS = [
  { title: 'For Builders', desc: "Level up your Solana game with 1-on-1 mentorship from chads who shipped, grants up to $10K, and direct alpha from the Solana Foundation.", tags: ['1-on-1 Mentorship', 'Grant Applications', 'Technical Workshops'], image: '/perks/forbuilders.jpeg', accent: '#14F195' },
  { title: 'For Creators', desc: "Get paid to cook. Bounties, content gigs, and design challenges across the Solana ecosystem. Your alpha, your bag.", tags: ['Bounties & Gigs', 'Content Creation', 'Design Challenges'], image: '/perks/forcreators.jpeg', accent: '#9945FF' },
  { title: 'For Founders', desc: "From fundraising support to hiring cracked devs, we help you build and scale your Solana startup in Malaysia. WAGMI.", tags: ['Fundraising Support', 'Talent Acquisition', 'Investor Network'], image: '/perks/forfounders.jpeg', accent: '#00C2FF' },
  { title: 'For Everyone', desc: "Access the global Superteam network spanning 15+ countries. Events, hackathons, and vibes every week. No gatekeeping — just show up and build.", tags: ['Global Network', 'Weekly Events', 'Hackathons'], image: '/perks/foreveryone.jpeg', accent: '#EAB308' },
];

export default function MemberPerks() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="perks" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <h2 className="section-title" style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 800,
        fontSize: 'clamp(28px, 5vw, 52px)', textAlign: 'center',
        lineHeight: 1.15, marginBottom: 16,
        transition: 'opacity 0.5s ease, text-shadow 0.5s ease',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>We Help You </span>
        <span style={{ color: '#14F195', fontStyle: 'italic' }}>Cook</span>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}> in the Solana </span>
        <span style={{ color: '#14F195', fontStyle: 'italic' }}>Ecosystem.</span>
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 48 }}>
        Whether you're a degen, a chef, or just getting started — we got you.
      </p>

      <div className="perks-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20,
      }}>
        {PERKS.map((p, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              border: `1px solid ${hovered === i ? p.accent + '55' : 'rgba(255,255,255,0.06)'}`,
              background: hovered === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
              transition: 'all 0.3s ease',
              transform: hovered === i ? 'translateY(-4px)' : 'none',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Square-ish image */}
            <div style={{
              width: '100%', aspectRatio: '16/10', overflow: 'hidden',
              background: `linear-gradient(135deg, ${p.accent}15, rgba(255,255,255,0.02))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {p.image ? (
                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(ev) => { ev.target.parentElement.innerHTML = `<span style="font-size:48px;opacity:0.3">${p.title === 'For Builders' ? '🛠️' : p.title === 'For Creators' ? '🎨' : p.title === 'For Founders' ? '🚀' : '🌍'}</span>`; }}
                />
              ) : (
                <span style={{ fontSize: 48, opacity: 0.3 }}>
                  {p.title === 'For Builders' ? '🛠️' : p.title === 'For Creators' ? '🎨' : p.title === 'For Founders' ? '🚀' : '🌍'}
                </span>
              )}
            </div>

            <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff', margin: '0 0 10px' }}>{p.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: '0 0 16px', lineHeight: 1.6, flex: 1 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.tags.map((t, j) => (
                  <span key={j} style={{
                    padding: '5px 14px', borderRadius: 20,
                    fontSize: 12, fontFamily: "'Inter', sans-serif",
                    border: `1px solid ${p.accent}44`,
                    color: p.accent, fontWeight: 500,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .perks-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
