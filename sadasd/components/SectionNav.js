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
  const [activeId, setActiveId] = useState('');
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    const handleActive = (e) => setActiveId(e.detail);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scrollspy-active', handleActive);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollspy-active', handleActive);
    };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      right: 16,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'flex-end',
    }}>
      {SECTIONS.map((s, i) => {
        const isActive = activeId === s.id;
        const isHovered = hoveredIdx === i;

        return (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => {
              const el = document.getElementById(s.id);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            {/* Label on hover */}
            {isHovered && (
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: 'rgba(255,255,255,0.7)',
                whiteSpace: 'nowrap',
                animation: 'fadeIn 0.2s ease',
              }}>{s.label}</span>
            )}
            {/* Bar */}
            <div style={{
              width: 3,
              height: isActive ? 28 : 14,
              borderRadius: 2,
              backgroundColor: isActive ? '#14F195' : 'rgba(255,255,255,0.2)',
              boxShadow: isActive ? '0 0 8px rgba(20,241,149,0.5)' : 'none',
              transition: 'all 0.3s ease',
            }} />
          </div>
        );
      })}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          div[style*="position: fixed"] { display: none !important; }
        }
      `}</style>
    </div>
  );
}
