'use client';
import { useEffect } from 'react';

export default function ScrollSpyProvider() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('.scroll-spy-section');
      const titles = document.querySelectorAll('.section-title');

      // Set all titles to dim initially
      titles.forEach(t => {
        t.style.opacity = '0.3';
        t.style.textShadow = 'none';
        t.style.transition = 'opacity 0.5s ease-in-out, text-shadow 0.5s ease-in-out';
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const title = entry.target.querySelector('.section-title');
          if (!title) return;

          if (entry.isIntersecting) {
            title.style.opacity = '1';
            title.style.textShadow = '0 0 20px rgba(255,255,255,0.25)';
          } else {
            title.style.opacity = '0.3';
            title.style.textShadow = 'none';
          }
        });

        // Update SectionNav
        const activeIds = [];
        entries.forEach(e => {
          if (e.isIntersecting) activeIds.push(e.target.id);
        });
        if (activeIds.length > 0) {
          window.dispatchEvent(new CustomEvent('scrollspy-active', { detail: activeIds[0] }));
        }
      }, {
        rootMargin: '-15% 0px -15% 0px',
        threshold: 0.1,
      });

      sections.forEach(s => observer.observe(s));
      return () => observer.disconnect();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
