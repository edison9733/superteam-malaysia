'use client';
import { useState } from 'react';

const LATEST_TWEETS = [
  { name: 'Ivan', handle: '@ivan_nomadz', text: "Solana Network State × @SuperteamMY × @ns — Johor & KL, Malaysia. Apr 1 – May 14. A full month hackathon with side tracks from SNS & @magicblock, culminating in Demo Day at @balajis's Network School. This is where startups get built.", image: '/wall/ivan.jpeg', url: 'https://x.com/ivan_nomadz/status/2032109845697216949' },
  { name: 'Superteam MY', handle: '@SuperteamMY', text: "The results are in! 🏆 Telegram Bot Bounty winners — Jing Yuan & Qi Jian, Zhe Hong, Wei Hup, HaoXiang. Congrats builders! This is what shipping looks like.", image: '/wall/bounty.jpeg', url: 'https://x.com/SuperteamMY/status/2031347706606793161' },
  { name: 'Superteam MY', handle: '@SuperteamMY', text: "Next Ecosystem Sync — Inside Chiliz Vision 2030 with @Siyi_Chen1 from @Chiliz. Fresh from the Manifesto drop, Siyi unpacks the 2026–2030 strategy for turning Fan Tokens into the financial rails of a trillion-dollar SportFi economy.", image: '/wall/siyi.jpeg', url: 'https://x.com/SuperteamMY/status/2030979620686950638' },
];

function LatestCard({ t, span }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={t.url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${span}`, display: 'flex', flexDirection: 'column',
        textDecoration: 'none', borderRadius: 24, overflow: 'hidden',
        background: 'rgba(18,18,18,0.80)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(255,255,255,${hovered ? 0.20 : 0.05})`,
        transition: 'all 0.35s ease',
        transform: hovered ? 'scale(1.02)' : 'none',
        boxShadow: hovered ? '0 0 24px rgba(20,241,149,0.08)' : 'none',
      }}>
      {t.image && (
        <div style={{ height: span >= 8 ? 220 : 160, overflow: 'hidden', flexShrink: 0 }}>
          <img src={t.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(ev) => { ev.target.parentElement.style.display = 'none'; }} />
        </div>
      )}
      <div style={{ padding: 24, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(20,241,149,0.2), rgba(153,69,255,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#14F195', fontFamily: "'Inter', sans-serif", flexShrink: 0 }}>{t.name[0]}</div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: '#fff', margin: 0 }}>{t.name}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>{t.handle}</p>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 16, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>𝕏</span>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.65 }}>{t.text}</p>
      </div>
    </a>
  );
}

export default function LatestSection() {
  const spans = [8, 4, 12];
  return (
    <section id="latest" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#14F195', textAlign: 'center', marginBottom: 12 }}>Latest</p>
      <h2 className="section-title" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 56px)', textAlign: 'center', marginBottom: 48 }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>The Latest by Superteam </span>
        <span style={{ color: '#14F195' }}>MY</span>
      </h2>
      <div className="latest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12 }}>
        {LATEST_TWEETS.map((t, i) => (<LatestCard key={i} t={t} span={spans[i]} />))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <a href="https://x.com/SuperteamMY" target="_blank" rel="noopener noreferrer" className="cta-bounce" style={{
          display: 'inline-block', padding: '14px 32px',
          background: 'linear-gradient(135deg, #14F195, #0fcc7d)', color: '#000',
          borderRadius: 50, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
          textDecoration: 'none', boxShadow: '0 0 24px rgba(20,241,149,0.35)',
        }}>Follow @SuperteamMY →</a>
      </div>
      <style jsx>{`@media (max-width: 768px) { .latest-grid > * { grid-column: span 12 !important; } }`}</style>
    </section>
  );
}
