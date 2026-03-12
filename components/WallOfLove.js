'use client';
import { useState } from 'react';

const TWEETS = [
  { name: 'Wei Hup', handle: '@_weihup', org: 'Community Member', text: "Drop by Solana hub today. It's got the new office smell and vibe. Shoutout to @mirrorfi_xyz @SuperteamMY @ccacc_hub", image: '/gallery/event-1.jpg', url: 'https://x.com/_weihup/status/1963008089923453428' },
  { name: 'Nic', handle: '@NicFuryyy', org: 'Sanctum', text: 'The new SuperteamMY Office looking fire ngl', image: '/gallery/event-2.jpg', url: 'https://x.com/NicFuryyy/status/1967442054482731061' },
  { name: 'SOON SVM', handle: '@soon_svm', org: 'Solana SVM Project', text: 'The first ever SuperteamMY Solana and ETHKL Ethereum workshop at ETHKL24. We\'re making history.', image: '/gallery/event-3.jpg', url: 'https://x.com/soon_svm/status/1841787165673705486' },
  { name: 'Chii Yuen', handle: '@ChiiYuen', org: 'Guild Lead, Lavarage', text: 'Building with the Superteam MY fam has been incredible. The energy at every event, the support from Henry and the team — this community is special. Malaysia Boleh!', image: '/gallery/event-4.jpg', url: 'https://x.com/ChiiYuen' },
  { name: 'Wong Jun Shen', handle: '@_Junshen18', org: 'Designer, APU Hackthletes', text: 'Proud to have contributed to the Solana Ecosystem Market Map with Superteam MY. This community gave me real opportunities to showcase my design work on a global stage.', image: '/gallery/event-5.jpg', url: 'https://x.com/_Junshen18' },
  { name: 'Derek Liew', handle: '@', org: 'Guild Lead, TARUMT BCC', text: "Won my first hackathon through Superteam MY. From TARUMT student to guild lead — the growth pipeline here is real. If you're a student, just show up and build.", image: '/gallery/event-6.jpg', url: 'https://x.com/' },
];

function TweetCard({ t, span }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a href={t.url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${span}`,
        display: 'block',
        textDecoration: 'none',
        borderRadius: 24,
        overflow: 'hidden',
        background: 'rgba(18,18,18,0.80)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(255,255,255,${hovered ? 0.20 : 0.05})`,
        transition: 'all 0.35s ease',
        transform: hovered ? 'scale(1.02)' : 'none',
        boxShadow: hovered ? '0 0 24px rgba(255,255,255,0.06)' : 'none',
      }}
    >
      {/* Image */}
      {t.image && (
        <div style={{ height: span >= 7 ? 220 : 160, overflow: 'hidden' }}>
          <img src={t.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(ev) => { ev.target.parentElement.style.display = 'none'; }}
          />
        </div>
      )}

      <div style={{ padding: 24 }}>
        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff',
            fontFamily: "'Inter', sans-serif",
          }}>{t.name[0]}</div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: '#fff', margin: 0 }}>{t.name}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>{t.handle} · {t.org}</p>
          </div>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>{t.text}</p>
      </div>
    </a>
  );
}

export default function WallOfLove({ testimonials: propTestimonials }) {
  const spans = [7, 5, 5, 7, 6, 6];

  return (
    <section id="wall-of-love" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EC4899', textAlign: 'center', marginBottom: 12 }}>Community</p>
      <h2 className="section-title" style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 800,
        fontSize: 'clamp(32px, 5vw, 56px)', textAlign: 'center',
        color: 'rgba(255,255,255,0.85)', marginBottom: 48,
        transition: 'opacity 0.5s ease, text-shadow 0.5s ease',
      }}>Wall of Love</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 10,
      }}>
        {TWEETS.map((t, i) => (
          <TweetCard key={i} t={t} span={spans[i]} />
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] > * {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
