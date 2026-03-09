// © 2026 edison9733. All rights reserved.
// Subtle dark noise texture background
export default function DotBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundImage: 'url(/bg-texture.png)',
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
    }} />
  );
}
