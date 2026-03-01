// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';

export default function Hero({ title, subtitle, telegramUrl }) {
  const [ref, inView] = useInView();
  const mainText = title?.split(' in ')[0] || "Building Solana's Future";
  const subText = title?.includes(' in ') ? `in ${title.split(' in ')[1]}` : 'in Malaysia';

  return (
    <section ref={ref} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '120px 24px 80px' }}>
      <div className="batik-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.04 }} />
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(153,69,255,0.15), transparent 70%)', filter: 'blur(80px)', animation: 'float1 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,241,149,0.1), transparent 70%)', filter: 'blur(60px)', animation: 'float2 10s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '30%', left: '40%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(3,225,255,0.08), transparent 70%)', filter: 'blur(50px)', animation: 'float3 12s ease-in-out infinite' }} />

      <div style={{ maxWidth: 900, textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, background: 'rgba(153,69,255,0.1)', border: '1px solid rgba(153,69,255,0.2)', marginBottom: 28, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#14F195', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#9945FF', letterSpacing: 1, textTransform: 'uppercase' }}>Solana Ecosystem · Malaysia 🇲🇾</span>
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.05, margin: '0 0 24px', letterSpacing: '-0.03em', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.1s' }}>
          <span style={{ color: '#fff' }}>{mainText}</span><br />
          <span className="gradient-text">{subText}</span>
        </h1>
        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.25s' }}>
          {subtitle || "The home for builders, creators, and innovators in Malaysia's Solana ecosystem."}
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.4s' }}>
          <a href={telegramUrl || "https://linktr.ee/SuperteamMY"} target="_blank" rel="noopener noreferrer" style={{ padding: '14px 32px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none', background: 'linear-gradient(135deg, #9945FF, #14F195)', color: '#fff', boxShadow: '0 4px 20px rgba(153,69,255,0.3)' }}>Join Community →</a>
          <a href="https://superteam.fun" target="_blank" rel="noopener noreferrer" style={{ padding: '14px 32px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}>Explore Opportunities</a>
        </div>
      </div>
    </section>
  );
}
