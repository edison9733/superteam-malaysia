// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
// Global dot-pattern background — subtle dots across the entire page

export default function DotBackground() {
  return (
    <div className="dot-background" style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    }} />
  );
}
