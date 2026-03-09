// © 2026 edison9733. All rights reserved.
'use client';
import { useInView } from '@/hooks/useInView';

export default function Hero({ title, subtitle, telegramUrl }) {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '120px 24px 80px',
    }}>
      {/* ═══ HERO BACKGROUND IMAGE ═══
           Place your 1920x1080 image as /public/hero-bg.jpg
           Works on both desktop and mobile (cover + center) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/sp_background.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.25,
      }} />

      {/* Dark gradient overlay for text readability */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at center, rgba(8,8,14,0.3) 0%, rgba(8,8,14,0.85) 70%, rgba(8,8,14,1) 100%)',
      }} />

      {/* Subtle animated glow */}
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vmin', height: '80vmin', borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,241,149,0.06) 0%, transparent 60%)', animation: 'pulse-globe 8s ease-in-out infinite', zIndex: 1 }} />

      <div style={{ maxWidth: 800, textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
          borderRadius: 100, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 32,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#14F195', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase' }}>Solana Ecosystem · Malaysia</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(42px, 8vw, 84px)', fontWeight: 800, lineHeight: 1.0,
          margin: '0 0 24px', letterSpacing: '-0.04em',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.1s', color: '#fff',
        }}>
          We Lead Solana{'\n'}Growth{' '}
          <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', color: '#14F195' }}>
            in Malaysia
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.45)',
          maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.25s',
        }}>
          {subtitle || "Founders, creators, and builders unite to shape Solana's future in Southeast Asia."}
        </p>

        <div style={{
          display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.4s',
        }}>
          <a href={telegramUrl || "https://linktr.ee/SuperteamMY"} target="_blank" rel="noopener noreferrer" style={{
            padding: '13px 32px', borderRadius: 100, fontSize: 14, fontWeight: 700,
            textDecoration: 'none', background: '#fff', color: '#08080e',
          }}>Join Community →</a>
          <a href="https://superteam.fun" target="_blank" rel="noopener noreferrer" style={{
            padding: '13px 32px', borderRadius: 100, fontSize: 14, fontWeight: 700,
            textDecoration: 'none', background: 'transparent', color: '#fff',
            border: '1px solid rgba(255,255,255,0.15)',
          }}>Explore Opportunities</a>
        </div>
      </div>
    </section>
  );
}
