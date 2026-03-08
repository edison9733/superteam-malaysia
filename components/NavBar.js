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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const navLinks = [
    { label: 'Events', id: 'events' },
    { label: 'Results', id: 'results' },
    { label: 'Members', id: 'members-section' },
    { label: 'Perks', id: 'perks' },
    { label: 'Join', id: 'how-to-join' },
    { label: 'Latest', id: 'latest' },
    { label: 'Directory', href: '/members' },
  ];

  return (
    <>
      {/* Vertical side text */}
      <div className="desktop-only" style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: 48, zIndex: 101,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{
          writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)',
          fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.12)', fontFamily: "'Outfit', sans-serif",
        }}>
          Superteam Malaysia
        </span>
      </div>

      {/* Top nav bar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '14px 0' : '22px 0',
        background: scrolled ? 'rgba(8,8,14,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px 0 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/logo.png" alt="Superteam Malaysia" style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'contain' }} />
            <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.5, color: '#fff' }}>
              SUPERTEAM<span style={{ color: '#14F195' }}> MY</span>
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              padding: '10px 28px', borderRadius: 100, fontSize: 12, fontWeight: 800,
              letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer',
              background: menuOpen ? '#fff' : 'rgba(255,255,255,0.06)',
              color: menuOpen ? '#08080e' : '#fff',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </nav>

      {/* Fullscreen menu overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'rgba(8,8,14,0.98)', backdropFilter: 'blur(30px)',
        opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          {navLinks.map(({ label, id, href }, i) => (
            <div key={label} style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? i * 0.06 : 0}s`,
            }}>
              {href ? (
                <Link href={href} onClick={() => setMenuOpen(false)} className="menu-link" style={{
                  display: 'block', padding: '14px 0', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
                  color: 'rgba(255,255,255,0.7)', textDecoration: 'none', letterSpacing: '-0.02em',
                }}>{label}</Link>
              ) : (
                <span onClick={() => scrollTo(id)} className="menu-link" style={{
                  display: 'block', padding: '14px 0', cursor: 'pointer',
                  fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
                  color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.02em',
                }}>{label}</span>
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 48, opacity: menuOpen ? 1 : 0, transition: 'opacity 0.6s 0.5s' }}>
            {[
              { label: '𝕏 Twitter', url: 'https://x.com/SuperteamMY' },
              { label: '🔗 Linktree', url: 'https://linktr.ee/SuperteamMY' },
              { label: '💬 Discord', url: 'https://discord.gg/rrUMX92p' },
            ].map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="menu-social" style={{
                fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
              }}>{s.label}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
