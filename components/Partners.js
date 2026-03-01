// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';

const TIER_COLORS = { platinum: '#9945FF', gold: '#FFD700', silver: '#03E1FF', community: '#14F195' };

function PartnerChip({ p }) {
  const color = TIER_COLORS[p.tier] || '#03E1FF';
  return (
    <div style={{
      padding: '16px 32px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', transition: 'all 0.3s', cursor: 'default', minWidth: 180,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${color}22, rgba(255,255,255,0.05))`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color,
      }}>{p.name?.charAt(0)}</div>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{p.name}</span>
    </div>
  );
}

export default function Partners({ partners = [] }) {
  const [ref, inView] = useInView();
  const reversed = [...partners].reverse();

  return (
    <section id="partners" ref={ref} style={{ padding: '80px 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#FFD700', letterSpacing: 2, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Ecosystem</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#fff', margin: 0 }}>Partners & Ecosystem</h2>
        </div>

        {/* Forward marquee */}
        <div className="marquee-container" style={{ overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, animation: 'marquee 30s linear infinite', width: 'max-content' }}>
            {[...partners, ...partners].map((p, i) => <PartnerChip key={`f-${i}`} p={p} />)}
          </div>
        </div>

        {/* Reverse marquee */}
        <div className="marquee-container" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 16, animation: 'marquee-reverse 35s linear infinite', width: 'max-content' }}>
            {[...reversed, ...reversed].map((p, i) => <PartnerChip key={`r-${i}`} p={p} />)}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  );
}
