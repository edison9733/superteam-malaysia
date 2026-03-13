'use client';
import { FALLBACK_PARTNERS } from '../lib/fallback-data';

const LOGO_MAP = {
  'Solana Foundation': '/partners/solana-foundation.svg',
  'Jupiter': '/partners/jupiter.svg',
  'Wormhole': '/partners/wormhole.svg',
  'Helius': '/partners/helius.svg',
  'Sanctum': '/partners/sanctum.svg',
  'Magic Eden': '/partners/magic-eden.svg',
  'Phantom': '/partners/phantom.svg',
  'Backpack': '/partners/backpack.svg',
  'Jito': '/partners/jito.svg',
  'Orca': '/partners/orca.svg',
  'Tensor': '/partners/tensor.svg',
  'Pyth Network': '/partners/pyth.svg',
  'Raydium': '/partners/raydium.svg',
  'Marinade Finance': '/partners/marinade.svg',
  'CUDIS': '/partners/cudis.svg',
};

// Remove community/university tier
const EXCLUDED = ['APUBCC', 'Sunway Blockchain Club', 'Monash Blockchain Club'];

export default function Partners({ partners: propPartners }) {
  const raw = (propPartners && propPartners.length > 0)
    ? propPartners
        .filter(p => !EXCLUDED.includes(p.name) && p.tier !== 'community' && p.tier !== 'university')
        .map(p => ({
          name: p.name,
          logo: p.logo_url || p.logo || LOGO_MAP[p.name] || null,
          url: p.website_url || p.website || p.url || '#',
        }))
    : FALLBACK_PARTNERS
        .filter(p => !EXCLUDED.includes(p.name) && p.tier !== 'community')
        .map(p => ({
          name: p.name,
          logo: LOGO_MAP[p.name] || null,
          url: p.website || '#',
        }));

  const doubled = [...raw, ...raw];

  return (
    <section id="partners" className="scroll-spy-section" style={{ padding: '80px 24px', overflow: 'hidden' }}>
      <h2 className="section-title" style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 800,
        fontSize: 'clamp(28px, 5vw, 48px)', textAlign: 'center', marginBottom: 12,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>Backed by Solana's </span>
        <span style={{ color: '#14F195' }}>Most Geng Projects.</span>
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 48 }}>
        These projects all pakat with us — from hackathons to workshops, they've been supporting the Malaysian Solana scene. Confirm solid la.
      </p>

      {/* Row 1 */}
      <div style={{ overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 32, width: 'max-content', animation: 'marqueeLeft 35s linear infinite' }}>
          {doubled.map((p, i) => (
            <a key={`r1-${i}`} href={p.url} target="_blank" rel="noopener noreferrer" title={p.name}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 120, height: 60, flexShrink: 0,
                opacity: 0.85, transition: 'opacity 0.3s, transform 0.2s',
                padding: 8,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {p.logo ? (
                <img src={p.logo} alt={p.name} style={{
                  maxWidth: 100, maxHeight: 44, objectFit: 'contain',
                  filter: 'brightness(1.3)',
                }} onError={(ev) => {
                  ev.target.style.display = 'none';
                  ev.target.parentElement.innerHTML = `<span style="font-size:11px;color:rgba(255,255,255,0.5);font-family:Inter,sans-serif;text-align:center;font-weight:600">${p.name}</span>`;
                }} />
              ) : (
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif", textAlign: 'center', fontWeight: 600 }}>{p.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 32, width: 'max-content', animation: 'marqueeRight 35s linear infinite' }}>
          {[...doubled].reverse().map((p, i) => (
            <a key={`r2-${i}`} href={p.url} target="_blank" rel="noopener noreferrer" title={p.name}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 120, height: 60, flexShrink: 0,
                opacity: 0.85, transition: 'opacity 0.3s, transform 0.2s',
                padding: 8,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {p.logo ? (
                <img src={p.logo} alt={p.name} style={{
                  maxWidth: 100, maxHeight: 44, objectFit: 'contain',
                  filter: 'brightness(1.3)',
                }} onError={(ev) => {
                  ev.target.style.display = 'none';
                  ev.target.parentElement.innerHTML = `<span style="font-size:11px;color:rgba(255,255,255,0.5);font-family:Inter,sans-serif;text-align:center;font-weight:600">${p.name}</span>`;
                }} />
              ) : (
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif", textAlign: 'center', fontWeight: 600 }}>{p.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marqueeRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
    </section>
  );
}
