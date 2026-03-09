// © 2026 edison9733. All rights reserved.
'use client';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const BADGE_COLORS = {
  'Core Contributor': '#9945FF',
  'Solana Builder': '#14F195',
  'Hackathon Winner': '#03E1FF',
  'Grant Recipient': '#FFD700',
  'Bounty Hunter': '#FF6B6B',
};

function MemberCard({ m, isActive, onClick }) {
  const badgeColor = BADGE_COLORS[m.badge] || '#9945FF';
  const achievements = m.achievements || {};

  return (
    <div onClick={onClick} style={{
      width: 280, height: 380, flexShrink: 0, cursor: 'pointer',
      borderRadius: 20, overflow: 'hidden', position: 'relative',
      background: isActive
        ? 'linear-gradient(135deg, rgba(153,69,255,0.12), rgba(20,241,149,0.06))'
        : 'rgba(255,255,255,0.02)',
      border: isActive ? '1px solid rgba(153,69,255,0.25)' : '1px solid rgba(255,255,255,0.06)',
      transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
      transform: isActive ? 'scale(1.05)' : 'scale(0.95)',
      opacity: isActive ? 1 : 0.6,
    }}>
      {/* Profile photo area */}
      <div style={{
        height: 160, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(135deg, ${badgeColor}20, rgba(8,8,14,0.8))`,
      }}>
        <img
          src={`/members/${m.twitter}.jpg`}
          alt={m.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {/* Badge */}
        {m.badge && (
          <span style={{
            position: 'absolute', top: 12, right: 12,
            padding: '4px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
            color: badgeColor, border: `1px solid ${badgeColor}40`,
          }}>{m.badge}</span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '16px 20px' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 2px' }}>{m.name}</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 10px' }}>
          {m.role} · {m.company}
        </p>

        {/* Skills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
          {m.skills?.slice(0, 3).map((s) => (
            <span key={s} style={{
              padding: '3px 8px', borderRadius: 100, fontSize: 10, fontWeight: 600,
              background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)',
            }}>{s}</span>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
          <span><strong style={{ color: '#fff', fontSize: 14 }}>{achievements.hackathon_wins || 0}</strong> wins</span>
          <span><strong style={{ color: '#fff', fontSize: 14 }}>{achievements.projects_built || 0}</strong> projects</span>
          <span><strong style={{ color: '#fff', fontSize: 14 }}>{achievements.bounties_completed || 0}</strong> bounties</span>
        </div>

        {/* Twitter */}
        {m.twitter && (
          <a href={`https://x.com/${m.twitter}`} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'block', marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
            𝕏 @{m.twitter}
          </a>
        )}
      </div>
    </div>
  );
}

export default function MembersSpotlight({ members = [] }) {
  const [ref, inView] = useInView();
  const featured = members.filter(m => m.featured);
  const displayMembers = featured.length > 0 ? featured : members.slice(0, 8);
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  // Auto-rotate
  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % displayMembers.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [inView, displayMembers.length]);

  // Scroll active card into view (horizontally only — does NOT move the page)
  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[active + 1]; // +1 for spacer div
    if (card) {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const containerCenter = container.offsetWidth / 2;
      container.scrollTo({ left: cardCenter - containerCenter, behavior: 'smooth' });
    }
  }, [active]);

  return (
    <section id="members-section" ref={ref} style={{ padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          textAlign: 'center', marginBottom: 48,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s',
        }}>
          <h2 style={{
            fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 800, lineHeight: 1.15,
            margin: '0 0 12px', color: '#fff', letterSpacing: '-0.02em',
          }}>
            Our Members Are{' '}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#14F195' }}>
              Industry Leaders
            </span>
            ,<br />Top-Tier Founders and Influential Creators.
          </h2>
        </div>
      </div>

      {/* Horizontal scrolling carousel */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex', gap: 16, padding: '20px 24px',
          overflowX: 'auto', scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
          justifyContent: displayMembers.length <= 4 ? 'center' : 'flex-start',
        }}
      >
        {/* Spacer for centering */}
        <div style={{ minWidth: 'calc(50vw - 156px)', flexShrink: 0 }} />
        {displayMembers.map((m, i) => (
          <div key={m.id} style={{ scrollSnapAlign: 'center' }}>
            <MemberCard m={m} isActive={i === active} onClick={() => setActive(i)} />
          </div>
        ))}
        <div style={{ minWidth: 'calc(50vw - 156px)', flexShrink: 0 }} />
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
        {displayMembers.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 24 : 6, height: 6, borderRadius: 3,
              background: i === active ? '#14F195' : 'rgba(255,255,255,0.15)',
              border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 32, padding: '0 24px' }}>
        <Link href="/members" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 28px',
          borderRadius: 100, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600, textDecoration: 'none',
        }}>View All Members →</Link>
      </div>
    </section>
  );
}
