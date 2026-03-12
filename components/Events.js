'use client';
import { useState, useEffect } from 'react';

const EVENTS = [
  { type: '🏆 Hackathon', date: 'Sep 2025', title: 'CYPHERthon 2025', desc: '4-week hackathon with Colosseum. Build real MVPs on Solana.', location: 'Kuala Lumpur', prize: '$5-10K', image: '/events/cypherthon.jpeg', link: 'https://lu.ma/mysuperteam' },
  { type: '🚀 Milestone', date: 'Aug 2025', title: 'Solana Hub Launch', desc: "Malaysia's first permanent Solana Hub officially opens.", location: 'CCACC MYVerse, KL', image: '/events/solanahub.jpeg', link: 'https://lu.ma/mysuperteam' },
  { type: '🏆 Hackathon', date: 'Jun 2025', title: 'MegaHackathon 2025', desc: 'Major hackathon with 9-week workshop preparation series.', location: 'Monash University MY', prize: '$15,000', image: '/events/megahackathon.jpeg', link: 'https://lu.ma/mysuperteam' },
  { type: '🎤 Demo Day', date: 'May 2025', title: 'Solana Demo Day Malaysia', desc: 'First-ever Solana Demo Day. 87 attendees, 6 judges.', location: 'AWS Office, 35th Floor', image: '/events/solanademo.jpeg', link: 'https://lu.ma/mysuperteam' },
  { type: '🤝 Meetup', date: '2025', title: 'Build to Scale: Solana Edition', desc: '218 attendees. Co-hosted with ScalingX and GEN.', location: 'Kuala Lumpur', image: '/events/buidl.jpeg', link: 'https://lu.ma/mysuperteam' },
  { type: '🏆 Hackathon', date: 'Apr 2024', title: 'Solana Hackfest', desc: '62K views. The most viral Superteam MY event ever.', location: 'APU, KL', image: '/events/solanahackfest.jpeg', link: 'https://lu.ma/mysuperteam' },
];

export default function Events({ events: propEvents }) {
  const [visible, setVisible] = useState(false);
  const evts = EVENTS;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="events" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 900, margin: '0 auto' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#14F195', textAlign: 'center', marginBottom: 12 }}>Our Events</p>
      <h2 className="section-title" style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 800,
        fontSize: 'clamp(32px, 5vw, 56px)', textAlign: 'center',
        color: 'rgba(255,255,255,0.85)', marginBottom: 16,
        transition: 'opacity 0.5s ease, text-shadow 0.5s ease',
      }}>
        Our <span style={{ color: '#14F195', fontStyle: 'italic' }}>Events</span>
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 48 }}>
        30+ events hosted. Hackathons, workshops, demo days, and community meetups.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {evts.map((e, i) => (
          <a key={i} href={e.link} target="_blank" rel="noopener noreferrer" style={{
            display: 'block',
            textDecoration: 'none',
            padding: 24,
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            transition: 'border-color 0.3s, transform 0.3s, background 0.3s',
          }}
          onMouseEnter={ev => { ev.currentTarget.style.borderColor = 'rgba(20,241,149,0.3)'; ev.currentTarget.style.transform = 'translateY(-2px)'; ev.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
          onMouseLeave={ev => { ev.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; ev.currentTarget.style.transform = 'none'; ev.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
          >
            {/* Event image */}
            {e.image ? (
              <div style={{ marginBottom: 16, borderRadius: 12, overflow: 'hidden' }}>
                <img src={e.image} alt={e.title} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
                  onError={(ev) => { ev.target.style.display = 'none'; }}
                />
              </div>
            ) : (
              <div style={{ marginBottom: 16, height: 100, borderRadius: 12, border: '1px dashed rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                📷 Add event image
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#14F195', fontWeight: 600 }}>{e.type}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{e.date}</span>
            </div>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff', margin: '0 0 8px' }}>{e.title}</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: '0 0 12px', lineHeight: 1.5 }}>{e.desc}</p>
            <div style={{ display: 'flex', gap: 16, fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
              <span>📍 {e.location}</span>
              {e.prize && <span>💰 {e.prize}</span>}
            </div>
          </a>
        ))}
      </div>

      {/* Green bouncing buttons */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
        <a href="https://lu.ma/mysuperteam" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block', padding: '14px 32px',
          backgroundColor: '#14F195', color: '#000',
          borderRadius: 50, fontFamily: "'Inter', sans-serif",
          fontWeight: 700, fontSize: 15, textDecoration: 'none',
          boxShadow: '0 0 20px rgba(20,241,149,0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(20,241,149,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 20px rgba(20,241,149,0.3)'; }}
        >Browse All Events on Luma →</a>
        <a href="https://lu.ma/mysuperteam" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block', padding: '14px 32px',
          border: '1px solid #14F195', color: '#14F195',
          borderRadius: 50, fontFamily: "'Inter', sans-serif",
          fontWeight: 600, fontSize: 15, textDecoration: 'none',
          transition: 'background 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(20,241,149,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}
        >View Full Calendar →</a>
      </div>
    </section>
  );
}
