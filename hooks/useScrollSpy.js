// © 2026 edison9733. ScrollSpy — FIXED: stays lit while in section, no flicker
'use client';
import { useEffect } from 'react';

const SECTION_IDS = [
  'events',
  'results',
  'members-section',
  'perks',
  'partners',
  'how-to-join',
  'wall-of-love',
  'latest',
];

const TITLE_CLASS_MAP = {
  'events': '.events-section-title',
  'results': '.results-section-title',
  'members-section': '.members-section-title',
  'perks': '.perks-section-title',
  'partners': '.partners-section-title',
  'how-to-join': '.howtojoin-section-title',
  'wall-of-love': '.wol-section-title',
  'latest': '.latest-section-title',
};

export default function useScrollSpy() {
  useEffect(() => {
    const styleId = 'scrollspy-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .section-title-spy {
          transition: opacity 0.5s ease-in-out, text-shadow 0.5s ease-in-out !important;
        }
        .section-title-spy.spy-active {
          opacity: 1 !important;
          text-shadow: 0 0 20px rgba(255,255,255,0.25), 0 0 60px rgba(255,255,255,0.08) !important;
        }
        .section-title-spy.spy-inactive {
          opacity: 0.3 !important;
          text-shadow: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Wait for initial animations to complete before activating spy
    const activateTimeout = setTimeout(() => {
      const titleElements = {};
      SECTION_IDS.forEach(id => {
        const className = TITLE_CLASS_MAP[id];
        if (className) {
          const el = document.querySelector(className);
          if (el) {
            el.classList.add('section-title-spy');
            titleElements[id] = el;
          }
        }
      });

      // Track intersecting sections with their ratios
      const sectionEntries = new Map();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            const id = entry.target.id;
            if (entry.isIntersecting) {
              sectionEntries.set(id, entry.intersectionRatio);
            } else {
              sectionEntries.delete(id);
            }
          });

          // If nothing is visible, remove all states
          if (sectionEntries.size === 0) {
            SECTION_IDS.forEach(id => {
              const el = titleElements[id];
              if (el) {
                el.classList.remove('spy-active', 'spy-inactive');
              }
            });
            return;
          }

          // Find the most centered section (highest ratio)
          let activeId = null;
          let maxRatio = 0;
          sectionEntries.forEach((ratio, id) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              activeId = id;
            }
          });

          // Apply states
          SECTION_IDS.forEach(id => {
            const el = titleElements[id];
            if (!el) return;
            if (id === activeId) {
              el.classList.add('spy-active');
              el.classList.remove('spy-inactive');
            } else {
              el.classList.remove('spy-active');
              el.classList.add('spy-inactive');
            }
          });
        },
        {
          // Use smaller margins so sections stay "active" longer
          rootMargin: '-15% 0px -15% 0px',
          threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.5, 0.7, 1.0],
        }
      );

      SECTION_IDS.forEach(id => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      });

      return () => {
        observer.disconnect();
        Object.values(titleElements).forEach(el => {
          el?.classList.remove('section-title-spy', 'spy-active', 'spy-inactive');
        });
      };
    }, 2000); // Wait 2s for entrance animations

    return () => clearTimeout(activateTimeout);
  }, []);
}
