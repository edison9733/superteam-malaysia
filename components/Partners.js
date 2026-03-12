'use client';
import { useEffect, useState } from 'react';

const PARTNERS = [
  { name: 'Solana Foundation', logo: '/partners/solana-foundation.svg', url: 'https://solana.org' },
  { name: 'Jupiter', logo: '/partners/jupiter.svg', url: 'https://jup.ag' },
  { name: 'Wormhole', logo: '/partners/wormhole.svg', url: 'https://wormhole.com' },
  { name: 'Helius', logo: '/partners/helius.svg', url: 'https://helius.dev' },
  { name: 'Sanctum', logo: '/partners/sanctum.svg', url: 'https://sanctum.so' },
  { name: 'Magic Eden', logo: '/partners/magic-eden.svg', url: 'https://magiceden.io' },
  { name: 'Phantom', logo: '/partners/phantom.svg', url: 'https://phantom.app' },
  { name: 'Backpack', logo: '/partners/backpack.svg', url: 'https://backpack.app' },
  { name: 'Jito', logo: '/partners/jito.svg', url: 'https://jito.wtf' },
  { name: 'Orca', logo: '/partners/orca.svg', url: 'https://orca.so' },
  { name: 'Tensor', logo: '/partners/tensor.svg', url: 'https://tensor.trade' },
  { name: 'Pyth Network', logo: '/partners/pyth.svg', url: 'https://pyth.network' },
  { name: 'Raydium', logo: '/partners/raydium.svg', url: 'https://raydium.io' },
  { name: 'Marinade Finance', logo: '/partners/marinade.svg', url: 'https://marinade.finance' },
  { name: 'CUDIS', logo: '/partners/cudis.svg', url: 'https://cudis.xyz' },
];

export default function Partners({ partners: propPartners }) {
  const items = PARTNERS;
  const doubled = [...items, ...items];

  return (
    <section id="partners" className="scroll-spy-section" style={{ padding: '80px 24px', overflow: 'hidden' }}>
      <h2 className="section-title" style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 800,
        fontSize: 'clamp(28px, 5vw, 48px)', textAlign: 'center',
        marginBottom: 48,
        transition: 'opacity 0.5s ease, text-shadow 0.5s ease',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>Trusted by Solana's </span>
        <span style={{ color: '#14F195' }}>Top Projects.</span>
      </h2>

      {/* Scrolling row 1 */}
      <div style={{ overflow: 'hidden', marginBottom: 16 }}>
        <div style={{
          display: 'flex', gap: 40, width: 'max-content',
          animation: 'marqueeLeft 40s linear infinite',
        }}>
          {doubled.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 80, height: 80, flexShrink: 0,
              opacity: 0.5, transition: 'opacity 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
            >
              <img src={p.logo} alt={p.name} style={{ maxWidth: 56, maxHeight: 56, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                onError={(ev) => { ev.target.style.display = 'none'; }}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Scrolling row 2 — reverse */}
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: 40, width: 'max-content',
          animation: 'marqueeRight 40s linear infinite',
        }}>
          {[...doubled].reverse().map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 80, height: 80, flexShrink: 0,
              opacity: 0.5, transition: 'opacity 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
            >
              <img src={p.logo} alt={p.name} style={{ maxWidth: 56, maxHeight: 56, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                onError={(ev) => { ev.target.style.display = 'none'; }}
              />
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
