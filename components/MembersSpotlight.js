// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';
import { useState } from 'react';
import Link from 'next/link';

const BADGE_COLORS = {
  'Core Contributor': '#9945FF',
  'Solana Builder': '#14F195',
  'Hackathon Winner': '#03E1FF',
  'Grant Recipient': '#FFD700',
  'Bounty Hunter': '#FF6B6B',
};

export default function MembersSpotlight({ members = [] }) {
  const [ref, inView] = useInView();
  const [flipped, setFlipped] = useState(null);
  const featured = members.filter(m => m.featured);

  return (
    <section id="members-section" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header — UAE style */}
        <div style={{
          textAlign: 'center', marginBottom: 56,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s',
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15,
            margin: '0 0 16px', color: '#fff',
          }}>
            Our Members Are{' '}
            <span className="gradient-text" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
              Industry Leaders
            </span>
            , Top-Tier Founders
            <br />and Influential Creators.
          </h2>
        </div>

        {/* Member grid with profile photos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 16 }}>
          {(featured.length > 0 ? featured : members.slice(0, 8)).map((m, i) => {
            const isFlipped = flipped === m.id;
            const badgeColor = BADGE_COLORS[m.badge] || '#9945FF';
            const achievements = m.achievements || {};

            return (
              <div key={m.id} onClick={() => setFlipped(isFlipped ? null : m.id)}
                style={{
                  perspective: '1000px', cursor: 'pointer', height: 340,
                  opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.8s ${i * 0.08}s, transform 0.8s ${i * 0.08}s`,
                }}>
                <div style={{
                  position: 'relative', width: '100%', height: '100%',
                  transformStyle: 'preserve-3d', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                }}>
                  {/* Front */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                      {/* Profile photo or initial */}
                      <div style={{
                        width: 56, height: 56, borderRadius: 16, overflow: 'hidden',
                        background: `linear-gradient(135deg, ${badgeColor}33, rgba(255,255,255,0.05))`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <img
                          src={`/members/${m.twitter}.jpg`}
                          alt={m.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<span style="font-size:24px;font-weight:800;color:${badgeColor}">${m.name?.charAt(0)}</span>`;
                          }}
                        />
                      </div>
                      {m.badge && <span style={{ padding: '4px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700, background: badgeColor + '15', color: badgeColor, alignSelf: 'flex-start' }}>{m.badge}</span>}
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>{m.name}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 4px' }}>{m.role}</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: '0 0 16px' }}>@ {m.company}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                      {m.skills?.map((s) => <span key={s} style={{ padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: 'rgba(153,69,255,0.1)', color: '#9945FF' }}>{s}</span>)}
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                      <span>↻ Click to flip</span>
                      {m.twitter && (
                        <a href={`https://x.com/${m.twitter}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 12 }}>
                          @{m.twitter}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Back — Achievements */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)', borderRadius: 16, padding: 24,
                    background: `linear-gradient(135deg, rgba(153,69,255,0.08), rgba(20,241,149,0.05))`,
                    border: '1px solid rgba(153,69,255,0.2)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#14F195', margin: '0 0 12px', letterSpacing: 1, textTransform: 'uppercase' }}>Achievements</h4>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', lineHeight: 1.6 }}>{m.bio}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {[
                        { label: 'Hackathon Wins', val: achievements.hackathon_wins || achievements.hackathons || 0 },
                        { label: 'Projects Built', val: achievements.projects_built || achievements.projects || 0 },
                        { label: 'Grants Received', val: achievements.grants_received || achievements.grants || 0 },
                        { label: 'Bounties Done', val: achievements.bounties_completed || achievements.bounties || 0 },
                      ].map((a) => (
                        <div key={a.label} style={{ textAlign: 'center', padding: '10px 0', borderRadius: 10, background: 'rgba(0,0,0,0.2)' }}>
                          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{a.val}</div>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.3 }}>{a.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/members" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px',
            borderRadius: 100, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none',
          }}>View All Members →</Link>
        </div>
      </div>
    </section>
  );
}
