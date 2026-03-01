'use client';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';

function AnimCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  const num = parseInt(String(target).replace(/[^0-9]/g, '')) || 0;
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(num / 125);
    const timer = setInterval(() => { start += step; if (start >= num) { setCount(num); clearInterval(timer); } else setCount(start); }, 16);
    return () => clearInterval(timer);
  }, [inView, num]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Stats({ members, events, projects, bounties, reach }) {
  const [ref, inView] = useInView();
  const stats = [
    { value: members || '150+', label: 'Community Members', color: '#9945FF' },
    { value: events || '30+', label: 'Events Hosted', color: '#14F195' },
    { value: projects || '45+', label: 'Projects Built', color: '#03E1FF' },
    { value: bounties || '80+', label: 'Bounties Completed', color: '#FFD700' },
    { value: reach || '5,000+', label: 'Community Reach', color: '#FF6B9D' },
  ];

  return (
    <section id="stats" ref={ref} style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(153,69,255,0.03), transparent)' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, padding: '48px 40px', borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}>
          {stats.map((s, i) => {
            const num = String(s.value).replace(/[^0-9]/g, '');
            const suffix = String(s.value).replace(/[0-9,]/g, '');
            return (
              <div key={s.label} style={{ textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s` }}>
                <div style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 8 }}>
                  <AnimCounter target={num} suffix={suffix} />
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
