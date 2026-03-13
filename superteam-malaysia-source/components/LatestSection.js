'use client';
import { useState } from 'react';

const LATEST_TWEETS = [
  { name: 'Superteam MY', handle: '@SuperteamMY', text: "Malaysia's first permanent Solana Hub is officially open at CCACC MYVerse, KL! Come visit us for coworking, community events, and everything Solana.", image: '/gallery/event-1.jpg', url: 'https://x.com/SuperteamMY/status/1961599387689459802' },
  { name: 'Nic', handle: '@NicFuryyy', text: 'The new SuperteamMY Office looking fire ngl', image: '/gallery/event-2.jpg', url: 'https://x.com/NicFuryyy/status/1967442054482731061' },
  { name: 'SOON SVM', handle: '@soon_svm', text: "The first ever SuperteamMY Solana and ETHKL Ethereum workshop at ETHKL24. We're making history.", image: '/gallery/event-3.jpg', url: 'https://x.com/soon_svm/status/1841787165673705486' },
  { name: 'Superteam MY', handle: '@SuperteamMY', text: "CYPHERthon 2025 — our 4-week hackathon with Colosseum is live! Build real MVPs on Solana. Prize pool USD 5-10K. Let's go Malaysia!", image: '/gallery/event-5.jpg', url: 'https://x.com/SuperteamMY/status/1755818270022889805' },
];

function LatestCard({ t, span }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a href={t.url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${span}`,
        display: 'flex', flexDirection: 'column',
        textDecoration: 'none', borderRadius: 24, overflow: 'hidden',
        background: 'rgba(18,18,18,0.80)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(255,255,255,${hovered ? 0.20 : 0.05})`,
        transition: 'all 0.35s ease',
        transform: hovered ? 'scale(1.02)' : 'none',
        boxShadow: hovered ? '0 0 24px rgba(20,241,149,0.08)' : 'none',
      }}
    >
      {t.image && (
        <div style={{ height: span >= 8 ? 220 : 160, overflow: 'hidden', flexShrink: 0 }}>
          <img src={t.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(ev) => { ev.target.parentElement.style.display = 'none'; }} />
        </div>
      )}
      <div style={{ padding: 24, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(20,241,149,0.2), rgba(153,69,255,0.2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: '#14F195',
            fontFamily: "'Inter', sans-serif", flexShrink: 0,
          }}>{t.name[0]}</div>
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
  const spans = [8, 4, 4, 8];

  return (
    <section id="latest" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#14F195', textAlign: 'center', marginBottom: 12 }}>Latest</p>
      <h2 className="section-title" style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 800,
        fontSize: 'clamp(32px, 5vw, 56px)', textAlign: 'center', marginBottom: 48,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>The Latest by Superteam </span>
        <span style={{ color: '#14F195' }}>MY</span>
      </h2>

      <div className="latest-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12,
      }}>
        {LATEST_TWEETS.map((t, i) => (
          <LatestCard key={i} t={t} span={spans[i]} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <a href="https://x.com/SuperteamMY" target="_blank" rel="noopener noreferrer" className="cta-bounce" style={{
          display: 'inline-block', padding: '14px 32px',
          background: 'linear-gradient(135deg, #14F195, #0fcc7d)', color: '#000',
          borderRadius: 50, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
          textDecoration: 'none', boxShadow: '0 0 24px rgba(20,241,149,0.35)',
        }}>Follow @SuperteamMY →</a>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .latest-grid > * { grid-column: span 12 !important; }
        }
      `}</style>
    </section>
  );
}
