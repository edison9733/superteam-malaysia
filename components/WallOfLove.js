'use client';
import { useState } from 'react';

const HARDCODED_TWEETS = [
  { name: 'Lam', handle: '@LamWeb3', org: 'Web3 Builder', text: "I've been to ETHGlobal hackathons in Tokyo, Lisbon, Buenos Aires. I know what a well-run Web3 community looks like. Last month I sat in a @SuperteamMY outpost at Network School. No panels. No sponsors on stage. Just builders talking honestly. That's when I realized — Malaysia's Web3 infrastructure is further along than most people think.", image: '/wall/lam.jpeg', url: 'https://x.com/LamWeb3/status/2027588155965358149' },
  { name: 'Button', handle: '@nftbutton', org: 'Builder, SEA', text: "@SuperteamMY has honestly been one of the most welcoming builder communities I've experienced in Southeast Asia. Not hype. Not noise. Just real people building on Solana.", image: '/wall/button.jpeg', url: 'https://x.com/nftbutton/status/2027602414992560590' },
  { name: 'Circle', handle: '@decircusmaster', org: 'Community', text: "Peek @jemmmyjemm sharing the @MonkeDAO playbook at the Solana Outpost — amazing event put together by @SuperteamMY!", image: '/wall/circle.jpeg', url: 'https://x.com/decircusmaster/status/2015710932853539029' },
  { name: 'Amit Kumar', handle: '@amitkumar0331', org: 'Founder, Grovio AI', text: "AI thinks as you do, and @GrovioAI executes on your behalf. Amazing demo day during @SuperteamMY where we showcased how marketing works in the AI era! Grateful for the community.", image: '/wall/amit.jpeg', url: 'https://x.com/amitkumar0331/status/2016021153077498137' },
];

function TweetCard({ t, span }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={t.url || '#'} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${span}`, display: 'flex', flexDirection: 'column',
        textDecoration: 'none', borderRadius: 24, overflow: 'hidden',
        background: 'rgba(18,18,18,0.80)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(255,255,255,${hovered ? 0.20 : 0.05})`,
        transition: 'all 0.35s ease',
        transform: hovered ? 'scale(1.02)' : 'none',
        boxShadow: hovered ? '0 0 24px rgba(255,255,255,0.06)' : 'none',
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
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>{t.handle} · {t.org}</p>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 16, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>𝕏</span>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.65 }}>{t.text}</p>
      </div>
    </a>
  );
}

export default function WallOfLove() {
  const spans = [8, 4, 4, 8];
  return (
    <section id="wall-of-love" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EC4899', textAlign: 'center', marginBottom: 12 }}>Community</p>
      <h2 className="section-title" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 56px)', textAlign: 'center', color: 'rgba(255,255,255,0.85)', marginBottom: 48 }}>Wall of Love</h2>
      <div className="wall-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12 }}>
        {HARDCODED_TWEETS.map((t, i) => (<TweetCard key={i} t={t} span={spans[i]} />))}
      </div>
      <style jsx>{`@media (max-width: 768px) { .wall-grid > * { grid-column: span 12 !important; } }`}</style>
    </section>
  );
}
