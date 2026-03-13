'use client';
import { useState } from 'react';
import { FALLBACK_MEMBERS } from '../lib/fallback-data';

function MemberCard({ m }) {
  const [hovered, setHovered] = useState(false);
  const name = m.name;
  const role = m.role + (m.company ? ` · ${m.company}` : '');
  const badge = m.badge || (m.badges ? m.badges[0] : 'Member');
  const skills = m.skills || [];
  const photo = m.photo || m.photo_url || null;
  const twitter = m.twitter || m.twitter_handle || null;

  const badgeColors = { 'Core Contributor': '#14F195', 'Solana Builder': '#9945FF', 'Hackathon Winner': '#F59E0B', 'Guild Lead': '#00C2FF', 'Member': '#9945FF' };
  const badgeColor = badgeColors[badge] || '#14F195';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '0 0 320px', width: 320,
        borderRadius: 24, overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(20,241,149,0.3)' : 'rgba(255,255,255,0.06)'}`,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      <div style={{
        width: '100%', height: 260, overflow: 'hidden',
        background: `linear-gradient(135deg, ${badgeColor}15, rgba(255,255,255,0.03))`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {photo ? (
          <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(ev) => { ev.target.style.display = 'none'; }} />
        ) : (
          <span style={{ fontSize: 64, color: badgeColor, fontWeight: 700, opacity: 0.4 }}>{name[0]}</span>
        )}
        <span style={{
          position: 'absolute', top: 16, right: 16,
          padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600,
          backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          color: badgeColor, border: `1px solid ${badgeColor}44`,
          fontFamily: "'Inter', sans-serif",
        }}>{badge}</span>
      </div>
      <div style={{ padding: 20 }}>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 17, color: '#fff', margin: '0 0 4px' }}>{name}</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 12px' }}>{role}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {skills.slice(0, 3).map((s, i) => (
            <span key={i} style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontFamily: "'Inter', sans-serif", border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)' }}>{s}</span>
          ))}
        </div>
        {twitter && (
          <a href={`https://x.com/${twitter}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>𝕏 @{twitter}</a>
        )}
      </div>
    </div>
  );
}

export default function MembersSpotlight({ members: propMembers }) {
  const allMembers = (propMembers && propMembers.length > 0) ? propMembers : FALLBACK_MEMBERS;
  const featured = allMembers.filter(m => m.featured || m.is_featured);
  const displayMembers = featured.length > 0 ? featured : allMembers.slice(0, 8);
  // Double for seamless loop
  const doubled = [...displayMembers, ...displayMembers];

  return (
    <section id="members-section" className="scroll-spy-section" style={{ padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <h2 className="section-title" style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 800,
          fontSize: 'clamp(24px, 4.5vw, 48px)', textAlign: 'center',
          lineHeight: 1.2, marginBottom: 48,
          maxWidth: 800, marginLeft: 'auto', marginRight: 'auto',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>Our Members Are </span>
          <span style={{ color: '#14F195', fontStyle: 'italic' }}>Cracked Builders,</span>
          <br />
          <span style={{ color: '#14F195' }}>Based Founders</span>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}> and </span>
          <span style={{ color: '#14F195' }}>Alpha Creators.</span>
        </h2>
      </div>

      {/* Auto-scrolling marquee — UAE style */}
      <div className="members-marquee" style={{ overflow: 'hidden' }}>
        <div className="members-marquee-track" style={{
          display: 'flex', gap: 20, width: 'max-content',
          animation: 'membersScroll 40s linear infinite',
        }}>
          {doubled.map((m, i) => <MemberCard key={i} m={m} />)}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 32, padding: '0 24px' }}>
        <a href="/members" className="cta-bounce" style={{
          display: 'inline-block', padding: '14px 32px',
          background: 'linear-gradient(135deg, #14F195, #0fcc7d)', color: '#000',
          borderRadius: 50, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
          textDecoration: 'none', boxShadow: '0 0 24px rgba(20,241,149,0.35)',
        }}>View All Members →</a>
      </div>

      <style jsx>{`
        @keyframes membersScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .members-marquee:hover .members-marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
