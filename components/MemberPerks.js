'use client';
import { useState } from 'react';

const PERKS = [
  { title: 'For Builders', desc: "Level up your Solana game with 1-on-1 mentorship from chads who shipped, grants up to $10K, and direct alpha from the Solana Foundation.", tags: ['1-on-1 Mentorship', 'Grant Applications', 'Technical Workshops'], image: '/perks/forbuilders.jpeg', accent: '#14F195' },
  { title: 'For Creators', desc: "Get paid to cook. Bounties, content gigs, and design challenges across the Solana ecosystem. Your alpha, your bag.", tags: ['Bounties & Gigs', 'Content Creation', 'Design Challenges'], image: '/perks/forcreators.jpeg', accent: '#9945FF' },
  { title: 'For Founders', desc: "From fundraising support to hiring cracked devs, we help you build and scale your Solana startup in Malaysia. WAGMI.", tags: ['Fundraising Support', 'Talent Acquisition', 'Investor Network'], image: '/perks/forfounders.jpeg', accent: '#00C2FF' },
  { title: 'For Everyone', desc: "Access the global Superteam network spanning 15+ countries. Events, hackathons, and vibes every week. No gatekeeping — just show up and build.", tags: ['Global Network', 'Weekly Events', 'Hackathons'], image: '/perks/foreveryone.png', accent: '#EAB308' },
];

export default function MemberPerks() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="perks" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 900, margin: '0 auto' }}>
      <h2 className="section-title" style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 800,
        fontSize: 'clamp(28px, 5vw, 52px)', textAlign: 'center',
        lineHeight: 1.15, marginBottom: 16,
        transition: 'opacity 0.5s ease, text-shadow 0.5s ease',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>We Help You </span>
        <span style={{ color: '#14F195', fontStyle: 'italic' }}>Cook</span>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}> in the Solana</span>
        <br />
        <span style={{ color: '#14F195', fontStyle: 'italic' }}>Ecosystem.</span>
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 48 }}>
        Whether you're a degen, a chef, or just getting started — we got you.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {PERKS.map((p, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: 28,
              borderRadius: 20,
              border: `1px solid ${hovered === i ? p.accent + '55' : 'rgba(255,255,255,0.06)'}`,
              background: hovered === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
              transition: 'all 0.3s ease',
              transform: hovered === i ? 'translateY(-3px)' : 'none',
            }}
          >
            {/* Image */}
            {p.image ? (
              <div style={{ marginBottom: 20, borderRadius: 16, overflow: 'hidden' }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                  onError={(ev) => { ev.target.parentElement.style.display = 'none'; }}
                />
              </div>
            ) : (
              <div style={{ marginBottom: 20, height: 120, borderRadius: 16, border: '1px dashed rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                📷 Add image here
              </div>
            )}

            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff', margin: '0 0 10px' }}>{p.title}</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.45)', margin: '0 0 16px', lineHeight: 1.6 }}>{p.desc}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {p.tags.map((t, j) => (
                <span key={j} style={{
                  padding: '5px 14px', borderRadius: 20,
                  fontSize: 13, fontFamily: "'Inter', sans-serif",
                  border: `1px solid ${p.accent}44`,
                  color: p.accent, fontWeight: 500,
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
