'use client';
import { useState } from 'react';

const FAQS = [
  { q: 'What is Superteam Malaysia?', a: "Superteam Malaysia is the local chapter of the global Superteam network, dedicated to empowering builders, creators, founders, and talent in the Solana ecosystem. Launched Feb 2024, we've grown to 3,400+ followers with 30+ events." },
  { q: 'How do I join?', a: 'Join via linktr.ee/SuperteamMY, attend events, and start contributing. No formal application — just show up and build! Weekly Ecosystem Sync calls every Tuesday at 8PM GMT+8.' },
  { q: 'What opportunities are available?', a: 'Bounties on Superteam Earn (~$1,500 USDC avg), grants up to $10K via Solana Foundation, hackathon prizes ($30K+ total), jobs with ecosystem projects, mentorship, and weekly events.' },
  { q: 'How can projects collaborate with us?', a: 'Reach out via Twitter @SuperteamMY or Telegram t.me/SuperteamMY. We partner with Solana projects for events, hackathons, workshops, and community initiatives.' },
  { q: 'Do I need to be a developer to join?', a: 'Not at all! We welcome designers, content creators, growth marketers, community managers, founders, and anyone passionate about Web3.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 17, color: '#fff', textAlign: 'left' }}>{q}</span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 24, fontWeight: 300, transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none', flexShrink: 0, marginLeft: 16 }}>+</span>
      </button>
      {open && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>{a}</p>
      )}
    </div>
  );
}

export default function FAQ({ faqs: propFaqs }) {
  const items = propFaqs || FAQS;
  return (
    <section id="faq" style={{ padding: '100px 24px', maxWidth: 700, margin: '0 auto' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#14F195', textAlign: 'center', marginBottom: 12 }}>FAQ</p>
      <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', textAlign: 'center', color: 'rgba(255,255,255,0.85)', marginBottom: 48, fontStyle: 'italic' }}>Frequently Asked Questions</h2>
      <div>
        {items.map((f, i) => <FAQItem key={i} q={f.q || f.question} a={f.a || f.answer} />)}
      </div>
    </section>
  );
}
