// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Mission', id: 'mission' },
    { label: 'Events', id: 'events' },
    { label: 'Members', id: 'members-section' },
    { label: 'Partners', id: 'partners' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '12px 0' : '20px 0',
      background: scrolled ? 'rgba(8,8,14,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logo.png" alt="Superteam Malaysia" style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'contain' }} />
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.5, color: '#fff' }}>Superteam<span style={{ color: '#14F195' }}> MY</span></span>
        </Link>
        {/* Desktop */}
        <div className="desktop-only" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {navLinks.map(({ label, id }) => (
            <span key={id} onClick={() => scrollTo(id)} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'color 0.2s' }}>{label}</span>
          ))}
          <Link href="/members" style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Directory</Link>
          <a href="https://linktr.ee/SuperteamMY" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 20px', borderRadius: 100, fontSize: 13, fontWeight: 700, textDecoration: 'none', background: 'linear-gradient(135deg, #9945FF, #14F195)', color: '#fff' }}>Join Community</a>
        </div>
        {/* Mobile */}
        <button className="mobile-only" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', padding: 4 }}>{menuOpen ? '✕' : '☰'}</button>
      </div>
      {menuOpen && (
        <div style={{ padding: '20px 24px', background: 'rgba(8,8,14,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {navLinks.map(({ label, id }) => (
            <div key={id} onClick={() => scrollTo(id)} style={{ padding: '12px 0', fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{label}</div>
          ))}
          <Link href="/members" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0', fontSize: 16, fontWeight: 500, color: '#14F195', textDecoration: 'none' }}>Member Directory</Link>
        </div>
      )}
    </nav>
  );
}
