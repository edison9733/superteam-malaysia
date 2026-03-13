'use client';
import { useState } from 'react';
import { FALLBACK_TESTIMONIALS } from '../lib/fallback-data';

const HARDCODED_TWEETS = [
  { name: 'Wei Hup', handle: '@_weihup', org: 'Community Member', text: "Drop by Solana hub today. It's got the new office smell and vibe. Shoutout to @mirrorfi_xyz @SuperteamMY @ccacc_hub", image: '/gallery/event-1.jpg', url: 'https://x.com/_weihup/status/1963008089923453428' },
  { name: 'Nic', handle: '@NicFuryyy', org: 'Sanctum', text: 'The new SuperteamMY Office looking fire ngl', image: '/gallery/event-2.jpg', url: 'https://x.com/NicFuryyy/status/1967442054482731061' },
  { name: 'SOON SVM', handle: '@soon_svm', org: 'Solana SVM Project', text: "The first ever SuperteamMY Solana and ETHKL Ethereum workshop at ETHKL24. We're making history.", image: '/gallery/event-3.jpg', url: 'https://x.com/soon_svm/status/1841787165673705486' },
  { name: 'Chii Yuen', handle: '@ChiiYuen', org: 'Guild Lead, Lavarage', text: 'Building with the Superteam MY fam has been incredible. The energy at every event, the support from Henry and the team — this community is special. Malaysia Boleh!', image: '/gallery/event-4.jpg', url: 'https://x.com/ChiiYuen' },
];

function TweetCard({ t, span }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a href={t.url || '#'} target="_blank" rel="noopener noreferrer"
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
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(20,241,149,0.2), rgba(153,69,255,0.2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: '#14F195',
            fontFamily: "'Inter', sans-serif", flexShrink: 0,
          }}>{t.name[0]}</div>
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

export default function WallOfLove({ testimonials: propTestimonials }) {
  const tweets = (propTestimonials && propTestimonials.length > 0)
    ? propTestimonials.slice(0, 4).map((t, idx) => ({
        name: t.author || t.name,
        handle: t.twitter ? `@${t.twitter}` : '@',
        org: t.role || t.org || '',
        text: t.content || t.text || '',
        image: t.image || `/gallery/event-${idx + 1}.jpg`,
        url: t.tweet_url || t.url || '#',
      }))
    : HARDCODED_TWEETS;

  const spans = [8, 4, 4, 8];

  return (
    <section id="wall-of-love" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EC4899', textAlign: 'center', marginBottom: 12 }}>Community</p>
      <h2 className="section-title" style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 800,
        fontSize: 'clamp(32px, 5vw, 56px)', textAlign: 'center',
        color: 'rgba(255,255,255,0.85)', marginBottom: 48,
      }}>Wall of Love</h2>

      <div className="wall-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12 }}>
        {tweets.slice(0, 4).map((t, i) => (
          <TweetCard key={i} t={t} span={spans[i]} />
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .wall-grid > * { grid-column: span 12 !important; }
        }
      `}</style>
    </section>
  );
}
