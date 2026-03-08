// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';

// Malaysian Skyline SVG (Petronas Twin Towers, KL Tower, Merdeka 118)
function MalaysianSkyline() {
  return (
    <svg viewBox="0 0 1200 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', opacity: 0.06 }}>
      {/* Petronas Twin Towers */}
      <rect x="380" y="30" width="28" height="190" rx="2" fill="white"/>
      <rect x="415" y="30" width="28" height="190" rx="2" fill="white"/>
      <rect x="405" y="70" width="12" height="40" rx="1" fill="white"/>
      <polygon points="394,30 380,30 394,10" fill="white"/>
      <polygon points="429,30 443,30 429,10" fill="white"/>
      {/* KL Tower */}
      <rect x="550" y="80" width="10" height="140" rx="1" fill="white"/>
      <ellipse cx="555" cy="90" rx="18" ry="12" fill="white"/>
      <rect x="553" y="40" width="4" height="50" fill="white"/>
      {/* Merdeka 118 */}
      <polygon points="700,220 700,20 720,0 740,20 740,220" fill="white"/>
      {/* Generic buildings */}
      <rect x="100" y="140" width="40" height="80" rx="2" fill="white"/>
      <rect x="150" y="160" width="30" height="60" rx="2" fill="white"/>
      <rect x="200" y="130" width="35" height="90" rx="2" fill="white"/>
      <rect x="260" y="170" width="25" height="50" rx="1" fill="white"/>
      <rect x="300" y="150" width="30" height="70" rx="2" fill="white"/>
      <rect x="800" y="150" width="35" height="70" rx="2" fill="white"/>
      <rect x="850" y="130" width="25" height="90" rx="2" fill="white"/>
      <rect x="900" y="160" width="40" height="60" rx="2" fill="white"/>
      <rect x="960" y="140" width="30" height="80" rx="2" fill="white"/>
      <rect x="1010" y="170" width="35" height="50" rx="2" fill="white"/>
      <rect x="1060" y="155" width="25" height="65" rx="1" fill="white"/>
    </svg>
  );
}

export default function Hero({ title, subtitle, telegramUrl }) {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '120px 24px 80px',
    }}>
      {/* Earth / Globe radial gradient background */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '140vmin', height: '140vmin', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,241,149,0.08) 0%, rgba(153,69,255,0.06) 30%, rgba(3,225,255,0.03) 50%, transparent 70%)',
        animation: 'pulse-globe 8s ease-in-out infinite',
      }} />

      {/* Floating orbs */}
      <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(153,69,255,0.12), transparent 70%)', filter: 'blur(80px)', animation: 'float1 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,241,149,0.08), transparent 70%)', filter: 'blur(60px)', animation: 'float2 10s ease-in-out infinite' }} />

      {/* Malaysian Skyline */}
      <MalaysianSkyline />

      <div style={{ maxWidth: 900, textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
          borderRadius: 100, background: 'rgba(153,69,255,0.1)', border: '1px solid rgba(153,69,255,0.2)',
          marginBottom: 28,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#14F195', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#9945FF', letterSpacing: 1, textTransform: 'uppercase' }}>Solana Ecosystem · Malaysia 🇲🇾</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 88px)', fontWeight: 800, lineHeight: 1.0,
          margin: '0 0 24px', letterSpacing: '-0.04em',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.1s',
        }}>
          <span style={{ color: '#fff' }}>We Lead Solana</span><br />
          <span style={{ color: '#fff' }}>Growth </span>
          <span className="gradient-text" style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic' }}>
            in Malaysia
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.5)',
          maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.7,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.25s',
        }}>
          {subtitle || "Founders, creators, and builders unite to shape Solana's future in Southeast Asia."}
        </p>

        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.4s',
        }}>
          <a href={telegramUrl || "https://linktr.ee/SuperteamMY"} target="_blank" rel="noopener noreferrer" style={{
            padding: '14px 36px', borderRadius: 100, fontSize: 15, fontWeight: 700,
            textDecoration: 'none', background: 'linear-gradient(135deg, #9945FF, #14F195)',
            color: '#fff', boxShadow: '0 4px 20px rgba(153,69,255,0.3)',
          }}>Join Community →</a>
          <a href="https://superteam.fun" target="_blank" rel="noopener noreferrer" style={{
            padding: '14px 36px', borderRadius: 100, fontSize: 15, fontWeight: 700,
            textDecoration: 'none', background: 'rgba(255,255,255,0.05)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>Explore Opportunities</a>
        </div>
      </div>
    </section>
  );
}
