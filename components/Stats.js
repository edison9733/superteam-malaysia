'use client';
import { useState, useEffect, useRef } from 'react';

const STATS = [
  { label: 'Community Members', end: 3400, suffix: '+', color: '#9333EA' },
  { label: 'Events Hosted', end: 30, suffix: '+', color: '#14F195' },
  { label: 'Projects Built', end: 50, suffix: '+', color: '#EC4899' },
  { label: 'Bounties Completed', end: 100, suffix: '+', color: '#EAB308' },
  { label: 'Community Reach', end: 10000, suffix: '+', color: '#F97316' },
];

function formatNum(n) {
  if (n >= 1000) return n.toLocaleString();
  return String(n);
}

function Counter({ end, suffix, color }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  const isLargeNum = end >= 10000;

  return (
    <span ref={ref} style={{
      display: 'inline-flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      fontWeight: 800,
      fontSize: isLargeNum ? 'clamp(28px, 4vw, 42px)' : 'clamp(36px, 5vw, 52px)',
      color: color,
      lineHeight: 1,
    }}>
      {formatNum(count)}{suffix}
    </span>
  );
}

export default function Stats() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{
      padding: '80px 24px',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
      }}>
        {STATS.map((s, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: '1 1 190px',
              minWidth: 190,
              maxWidth: 240,
              padding: '28px 20px',
              borderRadius: 20,
              background: hovered === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${hovered === i ? s.color : 'rgba(255,255,255,0.06)'}`,
              textAlign: 'center',
              transition: 'all 0.35s ease',
              transform: hovered === i ? 'translateY(-4px)' : 'none',
              boxShadow: hovered === i ? `0 0 24px ${s.color}33, 0 8px 32px rgba(0,0,0,0.3)` : '0 2px 12px rgba(0,0,0,0.2)',
              cursor: 'default',
            }}
          >
            <Counter end={s.end} suffix={s.suffix} color={s.color} />
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginTop: 10,
              marginBottom: 0,
            }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
