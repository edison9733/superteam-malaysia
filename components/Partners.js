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
  'Jito': '/partners/jito.png',
  'Orca': '/partners/orca.svg',
  'Tensor': '/partners/tensor.png',
  'Pyth Network': '/partners/pyth.svg',
  'Raydium': '/partners/raydium.svg',
  'Marinade Finance': '/partners/marinade.svg',
  'CUDIS': '/partners/cudis.svg',
};

const EXCLUDED = ['APUBCC', 'Sunway Blockchain Club', 'Monash Blockchain Club', 'SOON SVM', 'MDEC', 'Colosseum', 'Eclipse'];

export default function Partners({ partners: propPartners }) {
  const raw = (propPartners && propPartners.length > 0)
    ? propPartners
        .filter(p => !EXCLUDED.includes(p.name) && p.tier !== 'community' && p.tier !== 'university')
        .map(p => ({ name: p.name, logo: p.logo_url || p.logo || LOGO_MAP[p.name] || null, url: p.website_url || p.website || p.url || '#' }))
    : FALLBACK_PARTNERS
        .filter(p => !EXCLUDED.includes(p.name) && p.tier !== 'community')
        .map(p => ({ name: p.name, logo: LOGO_MAP[p.name] || null, url: p.website || '#' }));

  const doubled = [...raw, ...raw];

  return (
    <section id="partners" className="scroll-spy-section" style={{ padding: '80px 24px', overflow: 'hidden' }}>
      <h2 className="section-title" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', textAlign: 'center', marginBottom: 12 }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>Backed by Solana's </span>
        <span style={{ color: '#14F195' }}>Most Geng Projects.</span>
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 48 }}>
        These projects all pakat with us — from hackathons to workshops, they support the Malaysian Solana scene. Confirm solid la.
      </p>

      <div style={{ overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 48, width: 'max-content', animation: 'marqueeLeft 30s linear infinite' }}>
          {doubled.map((p, i) => (
            <a key={`r1-${i}`} href={p.url} target="_blank" rel="noopener noreferrer" title={p.name}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 160, height: 80, flexShrink: 0, padding: 12, opacity: 0.9, transition: 'opacity 0.3s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1)'; }}>
              {p.logo ? (
                <img src={p.logo} alt={p.name} style={{ maxWidth: 140, maxHeight: 65, objectFit: 'contain', filter: 'brightness(1.5) contrast(1.1)' }}
                  onError={(ev) => { ev.target.style.display = 'none'; ev.target.parentElement.innerHTML = `<span style="font-size:14px;color:rgba(255,255,255,0.7);font-family:Inter,sans-serif;text-align:center;font-weight:700">${p.name}</span>`; }} />
              ) : (
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", textAlign: 'center', fontWeight: 700 }}>{p.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 48, width: 'max-content', animation: 'marqueeRight 30s linear infinite' }}>
          {[...doubled].reverse().map((p, i) => (
            <a key={`r2-${i}`} href={p.url} target="_blank" rel="noopener noreferrer" title={p.name}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 160, height: 80, flexShrink: 0, padding: 12, opacity: 0.9, transition: 'opacity 0.3s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1)'; }}>
              {p.logo ? (
                <img src={p.logo} alt={p.name} style={{ maxWidth: 140, maxHeight: 65, objectFit: 'contain', filter: 'brightness(1.5) contrast(1.1)' }}
                  onError={(ev) => { ev.target.style.display = 'none'; ev.target.parentElement.innerHTML = `<span style="font-size:14px;color:rgba(255,255,255,0.7);font-family:Inter,sans-serif;text-align:center;font-weight:700">${p.name}</span>`; }} />
              ) : (
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", textAlign: 'center', fontWeight: 700 }}>{p.name}</span>
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
