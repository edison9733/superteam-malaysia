'use client';
import { useState } from 'react';

const EVENTS = [
  {
    title: 'Solana Network State [Spring 2026]',
    type: 'Hackathon',
    date: 'Apr 1 – May 14, 2026',
    desc: '5-week Build Station at Network School × Colosseum Hackathon. Ship startups on Solana with mentor office hours, pitch sessions, and Demo Day.',
    location: 'Forest City, Johor & AWS Office, KL',
    image: '/events/state.jpeg',
    link: 'https://lu.ma/mysuperteam',
  },
  {
    title: 'Ecosystem Sync ft. Arcium',
    type: 'Community Call',
    date: 'Mar 24, 2026',
    desc: 'Deep dive into Arcium — the Encrypted Supercomputer on Solana. Privacy-preserving compute, Umbra wallet, and the RTG model with Loosty (Head of Community).',
    location: 'Network School Library',
    image: '/events/arcium.jpeg',
    link: 'https://lu.ma/mysuperteam',
  },
  {
    title: 'Solana Turns 6! 🎂',
    type: 'Party',
    date: 'Mar 14, 2026',
    desc: "Celebrating 6 years of Solana at Network School! Community session, birthday cake, mini tarts, then DJs take over the Mafia Room at 8PM.",
    location: 'NS Mafia Room Level 13',
    image: '/events/6.jpeg',
    link: 'https://lu.ma/mysuperteam',
  },
  {
    title: 'Ecosystem Sync ft. CUDIS Wellness',
    type: 'Community Call',
    date: 'Mar 31, 2026',
    desc: 'From steps to store credit. CUDIS is building health-native experiences on Solana — wearables, habit tracking, and onchain wellness rewards.',
    location: 'NS Library',
    image: '/events/cudis.jpeg',
    link: 'https://lu.ma/mysuperteam',
  },
];

const TYPE_EMOJI = { Hackathon: '🏆', 'Community Call': '🎤', Party: '🎉', Meetup: '🤝' };

export default function Events({ events: propEvents }) {
  const [hovered, setHovered] = useState(null);
  const evts = EVENTS;

  return (
    <section id="events" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <h2 className="section-title" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 56px)', textAlign: 'center', color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
        Our <span style={{ color: '#14F195', fontStyle: 'italic' }}>Events</span>
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 48 }}>
        Hackathons, community calls, demo days, and birthday parties.
      </p>

      <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {evts.map((e, i) => {
          const emoji = TYPE_EMOJI[e.type] || '📌';
          return (
            <a key={i} href={e.link} target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex', flexDirection: 'column', textDecoration: 'none', borderRadius: 20, overflow: 'hidden',
                border: `1px solid ${hovered === i ? 'rgba(20,241,149,0.3)' : 'rgba(255,255,255,0.06)'}`,
                background: hovered === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                transition: 'all 0.3s ease', transform: hovered === i ? 'translateY(-4px)' : 'none',
              }}>
              <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(20,241,149,0.08), rgba(153,69,255,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {e.image ? (
                  <img src={e.image} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(ev) => { ev.target.style.display = 'none'; ev.target.parentElement.innerHTML = `<span style="color:rgba(255,255,255,0.2);font-size:40px">${emoji}</span>`; }} />
                ) : <span style={{ fontSize: 40 }}>{emoji}</span>}
              </div>
              <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#14F195', fontWeight: 600 }}>{emoji} {e.type}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{e.date}</span>
                </div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', margin: '0 0 8px' }}>{e.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: '0 0 12px', lineHeight: 1.5, flex: 1 }}>{e.desc}</p>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>📍 {e.location}</span>
              </div>
            </a>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <a href="https://lu.ma/mysuperteam" target="_blank" rel="noopener noreferrer" className="cta-bounce" style={{
          display: 'inline-block', padding: '14px 32px',
          background: 'linear-gradient(135deg, #14F195, #0fcc7d)', color: '#000',
          borderRadius: 50, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
          textDecoration: 'none', boxShadow: '0 0 24px rgba(20,241,149,0.35)',
        }}>Browse All Events on Luma →</a>
      </div>

      <style jsx>{`
        @media (max-width: 768px) { .events-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
