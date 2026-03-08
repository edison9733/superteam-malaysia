// © 2026 edison9733. All rights reserved.
'use client';
import { useInView } from '@/hooks/useInView';

const PERKS = [
  {
    title: 'For Builders',
    desc: 'Kickstart your Solana journey with mentorship, grants up to $10K, and direct access to the Solana Foundation.',
    items: ['1-on-1 Mentorship', 'Grant Applications', 'Technical Workshops'],
    gradient: 'linear-gradient(135deg, rgba(153,69,255,0.1), rgba(20,241,149,0.05))',
    accent: '#9945FF',
  },
  {
    title: 'For Creators',
    desc: 'Get paid to create. Bounties, content gigs, and design opportunities across the Solana ecosystem.',
    items: ['Bounties & Gigs', 'Content Creation', 'Design Challenges'],
    gradient: 'linear-gradient(135deg, rgba(20,241,149,0.1), rgba(3,225,255,0.05))',
    accent: '#14F195',
  },
  {
    title: 'For Founders',
    desc: 'From fundraising support to hiring talent, we help you build and scale your Solana startup in Malaysia.',
    items: ['Fundraising Support', 'Talent Acquisition', 'Investor Network'],
    gradient: 'linear-gradient(135deg, rgba(3,225,255,0.1), rgba(153,69,255,0.05))',
    accent: '#03E1FF',
  },
  {
    title: 'For Everyone',
    desc: 'Access the global Superteam network spanning 15+ countries. Events, hackathons, and community every week.',
    items: ['Global Network', 'Weekly Events', 'Hackathons'],
    gradient: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(153,69,255,0.05))',
    accent: '#FFD700',
  },
];

export default function MemberPerks() {
  const [ref, inView] = useInView();

  return (
    <section id="perks" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 56,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s',
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff',
            margin: '0 0 12px', letterSpacing: '-0.02em',
          }}>
            We Help You Achieve Your Goals{' '}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#14F195' }}>
              in the Solana Ecosystem.
            </span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 440, margin: '0 auto' }}>
            Our team is ready to help founders, builders, and creators succeed.
          </p>
        </div>

        {/* 2×2 grid — clean, minimalist cards like UAE */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 12 }}>
          {PERKS.map((p, i) => (
            <div key={p.title} style={{
              padding: 32, borderRadius: 16,
              background: p.gradient,
              border: '1px solid rgba(255,255,255,0.06)',
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}>
              <h3 style={{
                fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 10px',
              }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: '0 0 20px' }}>
                {p.desc}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {p.items.map((item) => (
                  <span key={item} style={{
                    padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                    background: `${p.accent}10`, color: p.accent,
                    border: `1px solid ${p.accent}20`,
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
