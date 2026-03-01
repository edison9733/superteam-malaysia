// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';

const pillars = [
  { num: '01', title: 'Builder Support & Mentorship', desc: '1-on-1 mentoring from experienced Solana developers and founders. We help you ship.', icon: '🛠️' },
  { num: '02', title: 'Events & Hackathons', desc: 'Monthly meetups, hackathons, and demo days. The best place to learn and build together.', icon: '🎪' },
  { num: '03', title: 'Grants & Funding Access', desc: 'Direct access to Solana Foundation grants, ecosystem funding, and investor introductions.', icon: '💰' },
  { num: '04', title: 'Jobs, Bounties & Opportunities', desc: 'Get paid to build. Bounties, freelance gigs, and full-time positions in the Solana ecosystem.', icon: '🎯' },
  { num: '05', title: 'Education & Workshops', desc: 'From Rust to Anchor to DeFi — hands-on workshops to level up your Web3 skills.', icon: '📚' },
  { num: '06', title: 'Ecosystem Connections', desc: 'Global Superteam network spanning 15+ countries. Build local, connect global.', icon: '🌏' },
];

export default function Mission() {
  const [ref, inView] = useInView();
  return (
    <section id="mission" ref={ref} style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 64, maxWidth: 560, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#9945FF', letterSpacing: 2, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>What We Do</span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 16px', color: '#fff', letterSpacing: '-0.02em' }}>
            Empowering Malaysia's{' '}
            <span style={{ fontStyle: 'italic', fontFamily: "'Instrument Serif', Georgia, serif", background: 'linear-gradient(135deg, #14F195, #03E1FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Web3 Builders</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>Six pillars driving the growth of Solana in Malaysia.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
          {pillars.map((p, i) => (
            <div key={p.num} className="glass-card" style={{ padding: 28, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${i * 0.08}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 32 }}>{p.icon}</span>
                <span style={{ fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.04)', fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic' }}>{p.num}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
