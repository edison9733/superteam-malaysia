'use client';
import { useState, useEffect } from 'react';

export default function useScrollSpy(sectionIds, options = {}) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, {
      rootMargin: options.rootMargin || '-15% 0px -15% 0px',
      threshold: options.threshold || 0.1,
    });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
