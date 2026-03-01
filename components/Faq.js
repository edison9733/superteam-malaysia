// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';
import { useState } from 'react';

export default function Faq({ faqs = [] }) {
  const [ref, inView] = useInView();
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#03E1FF', letterSpacing: 2, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>FAQ</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#fff', margin: 0 }}>Frequently Asked Questions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((f, i) => (
            <div key={f.id || i} style={{
              borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden', transition: 'all 0.3s',
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)', transitionDelay: `${i * 0.06}s`,
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 600,
                fontFamily: "'Outfit', sans-serif", textAlign: 'left',
              }}>
                {f.question || f.q}
                <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.3)', transform: open === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s', flexShrink: 0, marginLeft: 16 }}>+</span>
              </button>
              <div style={{ maxHeight: open === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                <p style={{ padding: '0 24px 18px', margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{f.answer || f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
