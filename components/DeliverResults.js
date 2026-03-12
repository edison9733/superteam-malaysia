// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';
import { useRef, useState } from 'react';

// ═══ EDIT THIS ARRAY to change the "We Deliver Results" cards ═══
// - video: path to a short clip in /public/videos/ (plays on hover)
// - poster: fallback image shown before hover
// - link: URL that opens when you CLICK the card (e.g. a Twitter/X video post)
const RESULTS = [
  {
    title: 'Hackathon Highlights',
    stat: '10+ Hackathons',
    desc: 'World-class hackathons bringing the best Solana builders together.',
    video: '/videos/hackathon.mp4',
    poster: '/results/hackathonhighlights.jpeg',
    link: 'https://x.com/SuperteamMY/status/2017135281745322427',
    gradient: 'linear-gradient(135deg, #9945FF33, #14F19522)',
  },
  {
    title: 'Community Events',
    stat: '30+ Events',
    desc: 'Monthly meetups, workshops, and demo days for the Malaysian Solana community.',
    video: '/videos/events.mp4',
    poster: '/results/communityevents.jpeg',
    link: 'https://x.com/SuperteamMY',
    gradient: 'linear-gradient(135deg, #14F19533, #03E1FF22)',
  },
  {
    title: 'Builder Success',
    stat: '$500K+ in Grants',
    desc: 'Helping Malaysian builders access Solana Foundation grants and ecosystem funding.',
    video: '/videos/builders.mp4',
    poster: '/results/buildersuccess.jpeg',
    link: 'https://x.com/SuperteamMY',
    gradient: 'linear-gradient(135deg, #03E1FF33, #9945FF22)',
  },
];

function ResultCard({ item, index, inView }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play()?.catch(() => {});
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        height: 360, cursor: 'pointer',
        background: item.gradient,
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 0.12}s`,
      }}
    >
      {/* Video layer — plays on hover */}
      <video
        ref={videoRef}
        src={item.video}
        poster={item.poster}
        muted
        loop
        playsInline
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: hovered ? 0.6 : 0,
          transition: 'opacity 0.5s',
        }}
      />

      {/* Poster image fallback (shows when no video or not hovered) */}
      <img
        src={item.poster}
        alt={item.title}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: hovered ? 0 : 0.25,
          transition: 'opacity 0.5s',
        }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 30%, rgba(8,8,14,0.95) 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
          color: '#14F195', marginBottom: 8,
        }}>{item.stat}</div>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>{item.title}</h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
      </div>

      {/* Play + link indicator */}
      <div style={{
        position: 'absolute', top: 20, right: 20,
        display: 'flex', gap: 8,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: '#fff',
          opacity: hovered ? 1 : 0.5, transition: 'opacity 0.3s',
        }}>{hovered ? '↗' : '▶'}</div>
      </div>
    </div>
  );
}

export default function DeliverResults() {
  const [ref, inView] = useInView();

  return (
    <section id="results" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 56,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s',
        }}>
          <h2 style={{
            fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, color: '#fff',
            margin: '0 0 16px', letterSpacing: '-0.03em',
          }}>
            We Deliver <span className="gradient-text" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>Results</span>.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 500, margin: '0 auto' }}>
            Hover to preview, click to see the full story on 𝕏.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {RESULTS.map((item, i) => (
            <ResultCard key={item.title} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
