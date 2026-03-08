// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';

const STEPS = [
  { num: '01', title: 'Join the Community', desc: 'Connect with us on Telegram, Discord, or Twitter. Follow @SuperteamMY for the latest updates.', color: '#9945FF' },
  { num: '02', title: 'Attend an Event', desc: 'Come to a meetup, hackathon, or workshop. Meet fellow builders and find your tribe.', color: '#14F195' },
  { num: '03', title: 'Start Contributing', desc: 'Complete bounties on Superteam Earn, build a project, or help with community initiatives.', color: '#03E1FF' },
  { num: '04', title: 'Become a Member', desc: 'Active contributors are invited to become official members with full access to perks and the global network.', color: '#FFD700' },
];

export default function HowToJoin() {
  const [ref, inView] = useInView();

  return (
    <section id="how-to-join" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 56,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#14F195', letterSpacing: 2, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Get Started</span>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff', margin: 0 }}>
            How to Become a{' '}
            <span className="gradient-text" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>Member</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {STEPS.map((s, i) => (
            <div key={s.num} style={{
              display: 'flex', gap: 24, alignItems: 'flex-start',
              padding: 28, borderRadius: 16,
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-30px)',
              transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                background: `${s.color}15`, border: `1px solid ${s.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 900, color: s.color,
                fontFamily: "'Space Mono', monospace",
              }}>{s.num}</div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="https://linktr.ee/SuperteamMY" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px',
            borderRadius: 100, background: 'linear-gradient(135deg, #9945FF, #14F195)',
            color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(153,69,255,0.3)',
          }}>Join Community Now →</a>
        </div>
      </div>
    </section>
  );
}
