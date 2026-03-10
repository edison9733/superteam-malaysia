// © 2026 edison9733. All rights reserved.
// components/Events.js
// Events Section — Luma Integration
// Strategy: Try iframe with public Luma URL first, fall back to animated event cards
'use client';
import { useInView } from '@/hooks/useInView';
import { useState } from 'react';

// ═══ LUMA INTEGRATION GUIDE ═══
//
// METHOD 1: Public URL iframe (works without admin access)
//   - Uses https://lu.ma/mysuperteam directly in iframe
//   - Luma MAY block this via X-Frame-Options header
//   - If it works: you get a full mini-Luma experience
//   - If blocked: we show animated event cards as fallback
//
// METHOD 2: Official embed URL (requires admin)
//   - Ask Henry or Marianne for: Luma → Manage Calendar → Settings → Embed
//   - The URL format: https://lu.ma/embed/calendar/cal-XXXXX/events
//   - Replace LUMA_EMBED_URL below with the real one
//
// METHOD 3: Luma API (requires API key from admin)
//   - Get API key from https://docs.lu.ma/reference/getting-started
//   - Set LUMA_API_KEY in .env.local
//   - Our /api/events route already supports this!

const LUMA_PUBLIC_URL = 'https://lu.ma/mysuperteam';

// ★ Replace this with the real embed URL when you get it from the admin ★
const LUMA_EMBED_URL = null; // e.g. 'https://lu.ma/embed/calendar/cal-XXXXX/events'

// Real past events for the animated cards fallback
const REAL_EVENTS = [
  {
    title: 'CYPHERthon 2025',
    date: 'Sep 2025',
    type: 'hackathon',
    venue: 'Kuala Lumpur',
    prize: '$5-10K',
    desc: '4-week hackathon with Colosseum. Build real MVPs on Solana.',
    color: '#9945FF',
    luma: 'https://lu.ma/mysuperteam',
  },
  {
    title: 'Solana Hub Launch',
    date: 'Aug 2025',
    type: 'milestone',
    venue: 'CCACC MYVerse, KL',
    prize: '',
    desc: "Malaysia's first permanent Solana Hub officially opens.",
    color: '#14F195',
    luma: 'https://lu.ma/mysuperteam',
  },
  {
    title: 'MegaHackathon 2025',
    date: 'Jun 2025',
    type: 'hackathon',
    venue: 'Monash University MY',
    prize: '$15,000',
    desc: 'Major hackathon with 9-week workshop preparation series.',
    color: '#03E1FF',
    luma: 'https://lu.ma/mysuperteam',
  },
  {
    title: 'Solana Demo Day Malaysia',
    date: 'May 2025',
    type: 'demo_day',
    venue: 'AWS Office, 35th Floor',
    prize: '',
    desc: 'First-ever Solana Demo Day. 87 attendees, 6 judges.',
    color: '#FFD700',
    luma: 'https://lu.ma/mysuperteam',
  },
  {
    title: 'Buidl to Scale: Solana Edition',
    date: '2025',
    type: 'meetup',
    venue: 'Kuala Lumpur',
    prize: '',
    desc: '218 attendees. Co-hosted with ScalingX and GEN.',
    color: '#FF6B9D',
    luma: 'https://lu.ma/mysuperteam',
  },
  {
    title: 'Solana Hackfest',
    date: 'Apr 2024',
    type: 'hackathon',
    venue: 'APU, KL',
    prize: '',
    desc: '62K views. The most viral Superteam MY event ever.',
    color: '#9945FF',
    luma: 'https://lu.ma/mysuperteam',
  },
];

const TYPE_LABELS = {
  hackathon: '🏆 Hackathon',
  meetup: '🤝 Meetup',
  workshop: '🛠️ Workshop',
  demo_day: '🎤 Demo Day',
  milestone: '🚀 Milestone',
};

function EventCard({ event, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={event.luma}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        padding: 24,
        borderRadius: 16,
        background: hovered
          ? `linear-gradient(135deg, ${event.color}12, rgba(255,255,255,0.03))`
          : 'rgba(255,255,255,0.02)',
        border: hovered
          ? `1px solid ${event.color}30`
          : '1px solid rgba(255,255,255,0.06)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span style={{
          padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600,
          background: `${event.color}15`, color: event.color,
        }}>
          {TYPE_LABELS[event.type] || event.type}
        </span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{event.date}</span>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>{event.title}</h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: '0 0 10px', lineHeight: 1.5 }}>{event.desc}</p>

      <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
        <span>📍 {event.venue}</span>
        {event.prize && <span>💰 {event.prize}</span>}
      </div>
    </a>
  );
}

export default function Events({ lumaUrl }) {
  const [ref, inView] = useInView();
  const [iframeError, setIframeError] = useState(false);
  const calendarUrl = lumaUrl || LUMA_PUBLIC_URL;
  const embedUrl = LUMA_EMBED_URL;

  return (
    <section id="events" ref={ref} style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 40,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s',
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff',
            margin: '0 0 12px', letterSpacing: '-0.02em',
          }}>
            Our{' '}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#14F195' }}>
              Events
            </span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 460, margin: '0 auto' }}>
            30+ events hosted. Hackathons, workshops, demo days, and community meetups.
          </p>
        </div>

        {/* If we have the official embed URL, show iframe */}
        {embedUrl && !iframeError ? (
          <div style={{
            borderRadius: 16, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            background: '#0a0a12',
            opacity: inView ? 1 : 0, transition: 'opacity 1s 0.2s',
            marginBottom: 24,
          }}>
            <iframe
              src={embedUrl}
              style={{ width: '100%', height: 700, border: 'none', borderRadius: 16 }}
              allowFullScreen
              loading="lazy"
              onError={() => setIframeError(true)}
            />
          </div>
        ) : (
          /* Animated event cards — shows real events */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 12,
            marginBottom: 24,
          }}>
            {REAL_EVENTS.map((event, i) => (
              <EventCard key={event.title} event={event} index={i} inView={inView} />
            ))}
          </div>
        )}

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={calendarUrl} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 32px', borderRadius: 100,
            background: 'linear-gradient(135deg, #9945FF, #14F195)',
            color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'none',
          }}>Browse All Events on Luma ↗</a>

          <a href={calendarUrl} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 24px', borderRadius: 100,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600,
            textDecoration: 'none',
          }}>View Full Calendar ↗</a>
        </div>
      </div>
    </section>
  );
}
