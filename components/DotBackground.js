// © 2026 edison9733. All rights reserved.
// Star background using Framer HTML via iframe
export default function DotBackground() {
  return (
    <iframe
      src="/sp_star_background.html"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        pointerEvents: 'none',
        opacity: 0.6,
      }}
      loading="eager"
      aria-hidden="true"
      title="background"
    />
  );
}
