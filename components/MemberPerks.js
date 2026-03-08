// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';

const PERKS = [
  { icon: '🛠️', title: 'Builder Support & Mentorship', desc: '1-on-1 mentoring from experienced Solana developers and founders to help you ship.' },
  { icon: '💰', title: 'Grants & Funding Access', desc: 'Direct access to Solana Foundation grants, ecosystem funding, and investor introductions.' },
  { icon: '🎯', title: 'Jobs, Bounties & Gigs', desc: 'Get paid to build. Bounties, freelance gigs, and full-time positions in the Solana ecosystem.' },
  { icon: '🎪', title: 'Events & Hackathons', desc: 'Monthly meetups, hackathons, and demo days. The best place to learn and build together.' },
  { icon: '📚', title: 'Education & Workshops', desc: 'From Rust to Anchor to DeFi — hands-on workshops to level up your Web3 skills.' },
  { icon: '🌏', title: 'Global Network', desc: 'Access to the Superteam network spanning 15+ countries. Build local, connect global.' },
];

export default function MemberPerks() {
  const [ref, inView] = useInView();

  return (
    <section id="perks" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 56,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#FFD700', letterSpacing: 2, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Member Perks</span>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff',
            margin: '0 0 16px', lineHeight: 1.15,
          }}>
            We Help You Achieve Your Goals<br />
            <span className="gradient-text" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
              in the Solana Ecosystem
            </span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
          {PERKS.map((p, i) => (
            <div key={p.title} className="glass-card" style={{
              padding: 28,
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: `${i * 0.08}s`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <span style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'rgba(153,69,255,0.1)', border: '1px solid rgba(153,69,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>{p.icon}</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: 0 }}>{p.title}</h3>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
