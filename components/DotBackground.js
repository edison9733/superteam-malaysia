// © 2026 edison9733. All rights reserved.
// components/DotBackground.js
// Subtle star/dot background for the entire site (except hero which has its own bg)
// To use your custom HTML background: replace this component's content with an iframe
// pointing to /sp_star_background.html, or inline the CSS from that file here.

export default function DotBackground() {
  return (
    <>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.08) 0%, transparent 100%),
          radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.05) 0%, transparent 100%),
          radial-gradient(1px 1px at 50% 30%, rgba(255,255,255,0.06) 0%, transparent 100%),
          radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.04) 0%, transparent 100%),
          radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.07) 0%, transparent 100%),
          radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 32px 32px',
      }} />

      {/* ═══ TO USE YOUR CUSTOM sp_star_background.html ═══
       
       1. Place sp_star_background.html in /public/
       2. Replace the <div> above with:
       
       <iframe
         src="/sp_star_background.html"
         style={{
           position: 'fixed', inset: 0, zIndex: 0,
           width: '100%', height: '100%',
           border: 'none', pointerEvents: 'none',
         }}
         loading="lazy"
       />

       This will render your HTML background behind all content.
      ═══════════════════════════════════════════════════ */}
    </>
  );
}
