// © 2026 edison9733. All rights reserved.
'use client';
import { useInView } from '@/hooks/useInView';

/* ═══ PARTNER LOGOS ═══
   Place logo images in /public/partners/ named by the partner:
     solana-foundation.svg, jupiter.svg, marinade.svg, etc.
   Recommended: SVG or PNG, white/light colored, ~200px wide */
const PARTNER_LIST = [
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

function PartnerItem({ p }) {
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px 32px', minWidth: 160,
      opacity: 0.5, transition: 'opacity 0.3s', textDecoration: 'none',
    }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
      onMouseLeave={(e) => e.currentTarget.style.opacity = 0.5}
    >
      <img
        src={p.logo}
        alt={p.name}
        style={{ height: 32, maxWidth: 150, objectFit: 'contain' }}
        onError={(e) => {
          // Fallback: show text name if logo not found
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = `<span style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.5);white-space:nowrap">${p.name}</span>`;
        }}
      />
    </a>
  );
}

export default function Partners({ partners = [] }) {
  const [ref, inView] = useInView();

  // Use PARTNER_LIST for logos, or fall back to props
  const displayPartners = PARTNER_LIST;
  const doubled = [...displayPartners, ...displayPartners];

  return (
    <section id="partners" ref={ref} style={{ padding: '80px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          textAlign: 'center', marginBottom: 40,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s',
        }}>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#fff',
            margin: '0 0 8px', letterSpacing: '-0.02em',
          }}>
            Trusted by Solana&apos;s{' '}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#14F195' }}>
              Top Projects
            </span>.
          </h2>
        </div>
      </div>

      {/* Scrolling logo marquee */}
      <div className="marquee-container" style={{ overflow: 'hidden', marginBottom: 8 }}>
        <div style={{
          display: 'flex', gap: 0, animation: 'marquee 40s linear infinite', width: 'max-content',
        }}>
          {doubled.map((p, i) => <PartnerItem key={`f-${i}`} p={p} />)}
        </div>
      </div>

      <div className="marquee-container" style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: 0, animation: 'marquee-reverse 45s linear infinite', width: 'max-content',
        }}>
          {[...doubled].reverse().map((p, i) => <PartnerItem key={`r-${i}`} p={p} />)}
        </div>
      </div>

      {/* ═══ PARTNER LOGO FILES NEEDED ═══
           Create folder: public/partners/
           Add these logo files (SVG preferred, white on transparent):
           
           1. solana-foundation.svg
           2. jupiter.svg
           3. marinade.svg
           4. helius.svg
           5. tensor.svg
           6. magic-eden.svg
           7. orca.svg
           8. phantom.svg
           9. backpack.svg
           10. jito.svg
           11. pyth.svg
           12. raydium.svg

           Where to download logos:
           - Most projects have press kits or brand pages
           - Search: "[project name] logo svg" or check their GitHub
           - Or screenshot their logo and use remove.bg to remove background

           If a logo file is missing, the partner name shows as text instead. */}

      <style jsx>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  );
}
