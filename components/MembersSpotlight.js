'use client';
import { useState, useEffect } from 'react';

const MEMBERS = [
  { name: 'Henry Lee Min Rong', role: 'Country Lead & Founder · Superteam MY / Kite', badge: 'Core Contributor', skills: ['Rust', 'ML', 'Leadership'], wins: 0, projects: 5, bounties: 0, twitter: 'Henryleemr', photo: '/members/Henry.jpeg' },
  { name: 'Marianne', role: 'Events & Operations Lead · Superteam Malaysia', badge: 'Core Contributor', skills: ['Operations', 'Events', 'Community'], wins: 0, projects: 2, bounties: 0, twitter: null, photo: '/members/marianne.jpeg' },
  { name: 'Chii Yuen Law', role: 'Guild Lead · Superteam MY / Lavarage', badge: 'Core Contributor', skills: ['Rust', 'DeFi', 'Backend'], wins: 0, projects: 3, bounties: 2, twitter: 'ChiiYuen', photo: '/members/chiiyuen.jpeg' },
  { name: 'Wong Jun Shen', role: 'Member / Designer · APU', badge: 'Solana Builder', skills: ['Design', 'Frontend', 'Content'], wins: 0, projects: 3, bounties: 4, twitter: '_Junshen18', photo: '/members/junshen.jpeg' },
  { name: 'Wei Hup', role: 'Active Community Member', badge: 'Solana Builder', skills: ['Community', 'Growth'], wins: 0, projects: 1, bounties: 0, twitter: '_weihup', photo: '/members/weihue.jpeg' },
  { name: 'Phen Jing Yuan', role: 'Guild Lead · Superteam Malaysia', badge: 'Core Contributor', skills: ['Rust', 'Backend', 'Education'], wins: 0, projects: 2, bounties: 0, twitter: null, photo: null },
  { name: 'Derek Liew Qi Jian', role: 'Guild Lead · Superteam MY / TARUMT BCC', badge: 'Hackathon Winner', skills: ['Rust', 'Frontend', 'AI'], wins: 1, projects: 3, bounties: 1, twitter: null, photo: null },
];

function MemberCard({ m }) {
  const [hovered, setHovered] = useState(false);
  const badgeColors = {
    'Core Contributor': '#14F195',
    'Solana Builder': '#9945FF',
    'Hackathon Winner': '#F59E0B',
  };
  const badgeColor = badgeColors[m.badge] || '#14F195';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '0 0 280px',
        padding: 24,
        borderRadius: 20,
        border: `1px solid ${hovered ? 'rgba(20,241,149,0.3)' : 'rgba(255,255,255,0.06)'}`,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 16, overflow: 'hidden',
          background: 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, color: badgeColor, fontWeight: 700,
        }}>
          {m.photo ? (
            <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(ev) => { ev.target.style.display = 'none'; ev.target.parentElement.textContent = m.name[0]; }}
            />
          ) : m.name[0]}
        </div>
        <span style={{
          position: 'absolute', top: 0, right: 0,
          padding: '4px 10px', borderRadius: 20,
          fontSize: 11, fontWeight: 600,
          backgroundColor: `${badgeColor}22`,
          color: badgeColor, border: `1px solid ${badgeColor}44`,
          fontFamily: "'Inter', sans-serif",
        }}>{m.badge}</span>
      </div>

      <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 17, color: '#fff', margin: '0 0 4px' }}>{m.name}</h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 12px' }}>{m.role}</p>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {m.skills.map((s, i) => (
          <span key={i} style={{
            padding: '3px 10px', borderRadius: 20,
            fontSize: 12, fontFamily: "'Inter', sans-serif",
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.55)',
          }}>{s}</span>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, fontSize: 13, fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>
        <span><strong style={{ color: '#fff' }}>{m.wins}</strong> wins</span>
        <span><strong style={{ color: '#fff' }}>{m.projects}</strong> projects</span>
        <span><strong style={{ color: '#fff' }}>{m.bounties}</strong> bounties</span>
      </div>

      {/* Twitter */}
      {m.twitter && (
        <a href={`https://x.com/${m.twitter}`} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: "'Inter', sans-serif", fontSize: 13,
          color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
        }}>𝕏 @{m.twitter}</a>
      )}
    </div>
  );
}

export default function MembersSpotlight({ members: propMembers }) {
  return (
    <section id="members-section" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <h2 className="section-title" style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 800,
        fontSize: 'clamp(28px, 5vw, 52px)', textAlign: 'center',
        lineHeight: 1.15, marginBottom: 48,
        transition: 'opacity 0.5s ease, text-shadow 0.5s ease',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>Our Members Are </span>
        <span style={{ color: '#14F195', fontStyle: 'italic' }}>Cracked</span>
        <br />
        <span style={{ color: '#14F195' }}>Builders,</span>
        <br />
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>Based Founders and Alpha</span>
        <br />
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>Creators.</span>
      </h2>

      {/* Horizontal scroll */}
      <div style={{
        display: 'flex',
        gap: 20,
        overflowX: 'auto',
        paddingBottom: 16,
        scrollSnapType: 'x mandatory',
      }}>
        {MEMBERS.map((m, i) => <MemberCard key={i} m={m} />)}
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <a href="/members" style={{
          display: 'inline-block', padding: '14px 32px',
          backgroundColor: '#14F195', color: '#000',
          borderRadius: 50, fontFamily: "'Inter', sans-serif",
          fontWeight: 700, fontSize: 15, textDecoration: 'none',
          boxShadow: '0 0 20px rgba(20,241,149,0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(20,241,149,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 20px rgba(20,241,149,0.3)'; }}
        >View All Members →</a>
      </div>
    </section>
  );
}
