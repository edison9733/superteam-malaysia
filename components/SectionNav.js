// © 2026 edison9733. SectionNav — Grok-style right side indicator bars
'use client';
import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'events', label: 'Events' },
  { id: 'results', label: 'Results' },
  { id: 'members-section', label: 'Members' },
  { id: 'perks', label: 'Perks' },
  { id: 'partners', label: 'Partners' },
  { id: 'how-to-join', label: 'Join' },
  { id: 'wall-of-love', label: 'Love' },
  { id: 'latest', label: 'Latest' },
];

export default function SectionNav() {
  const [activeId, setActiveId] = useState(null);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    // Only show after scrolling past hero
    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Intersection observer for active section
    const sectionRatios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            sectionRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            sectionRatios.delete(entry.target.id);
          }
        });
        // Find most visible
        let best = null, bestR = 0;
        sectionRatios.forEach((r, id) => { if (r > bestR) { bestR = r; best = id; } });
        setActiveId(best);
      },
      { rootMargin: '-20% 0px -20% 0px', threshold: [0, 0.1, 0.2, 0.4, 0.6, 1] }
    );

    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => { observer.disconnect(); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <div className="section-nav" style={{
        position: 'fixed',
        right: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 6,
        opacity: showNav ? 1 : 0,
        pointerEvents: showNav ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }}>
        {SECTIONS.map(s => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="nav-bar-item"
              title={s.label}
              style={{
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                outline: 'none',
              }}
            >
              {/* Label — only shows on hover/active */}
              <span className="nav-bar-label" style={{
                fontSize: 10,
                fontWeight: 600,
                color: isActive ? '#14F195' : 'rgba(255,255,255,0.35)',
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(8px)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}>{s.label}</span>
              {/* Bar */}
              <div style={{
                width: isActive ? 4 : 2.5,
                height: isActive ? 28 : 14,
                borderRadius: 100,
                background: isActive ? '#14F195' : 'rgba(255,255,255,0.15)',
                boxShadow: isActive ? '0 0 12px rgba(20,241,149,0.5), 0 0 24px rgba(20,241,149,0.2)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </button>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .section-nav { display: none !important; }
        }
        .nav-bar-item:hover .nav-bar-label {
          opacity: 1 !important;
          transform: translateX(0) !important;
          color: rgba(255,255,255,0.7) !important;
        }
        .nav-bar-item:hover div {
          background: rgba(255,255,255,0.4) !important;
          height: 20px !important;
          width: 3px !important;
        }
      `}</style>
    </>
  );
}
