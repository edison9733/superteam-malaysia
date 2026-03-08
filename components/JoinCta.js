// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';
import { useState } from 'react';

export default function JoinCta({ title, subtitle, telegramUrl, discordUrl, twitterUrl }) {
  const [ref, inView] = useInView();
  const [email, setEmail] = useState('');

  const socials = [
    { name: 'Community', url: telegramUrl || 'https://linktr.ee/SuperteamMY', icon: '🔗' },
    { name: 'Discord', url: discordUrl || 'https://discord.gg/rrUMX92p', icon: '💬' },
    { name: 'Twitter / X', url: twitterUrl || 'https://x.com/SuperteamMY', icon: '𝕏' },
  ];

  return (
    <section id="join" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{
        maxWidth: 800, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px)', borderRadius: 28,
        background: 'linear-gradient(135deg, rgba(153,69,255,0.08), rgba(20,241,149,0.05), rgba(3,225,255,0.05))',
        border: '1px solid rgba(153,69,255,0.15)', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 2, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s' }}>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 16px', lineHeight: 1.15 }}>
            {title || 'Ready to Build the Future?'}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7 }}>
            {subtitle || 'Join Superteam Malaysia and connect with the most ambitious builders in the Solana ecosystem.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
            {socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 100,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600,
              }}>{s.icon} {s.name}</a>
            ))}
          </div>
          <div style={{ display: 'flex', maxWidth: 400, margin: '0 auto', gap: 8 }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
              style={{
                flex: 1, padding: '12px 18px', borderRadius: 100, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: 'none',
              }} />
            <button onClick={() => { if (email) setEmail(''); }} style={{
              padding: '12px 24px', borderRadius: 100, background: 'linear-gradient(135deg, #9945FF, #14F195)',
              color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
            }}>Subscribe</button>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 12 }}>Get notified about events, bounties, and opportunities.</p>
        </div>
      </div>
    </section>
  );
}
