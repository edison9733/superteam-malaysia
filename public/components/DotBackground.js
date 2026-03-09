// © 2026 edison9733. All rights reserved.
// Minimalist dot pattern - pure CSS, no image needed
export default function DotBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
    }} />
  );
}
