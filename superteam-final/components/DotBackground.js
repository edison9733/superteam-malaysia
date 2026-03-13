'use client';

export default function DotBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      {/* CSS dot pattern fallback — always renders */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      {/* dotwhite.jpeg overlay — renders if file exists */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/dotwhite.jpeg)',
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        opacity: 0.15,
        mixBlendMode: 'screen',
      }} />
    </div>
  );
}
