'use client';

export default function CTA() {
  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{
        maxWidth: 800, margin: '0 auto', padding: '56px 40px',
        borderRadius: 24, border: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)', textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 800,
          fontSize: 'clamp(28px, 5vw, 48px)', color: 'rgba(255,255,255,0.85)',
          marginBottom: 16, fontStyle: 'italic',
        }}>Ready to Build the Future?</h2>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 16,
          color: 'rgba(255,255,255,0.4)', marginBottom: 32, lineHeight: 1.7,
        }}>
          Join 3,400+ builders, creators, and founders in the Malaysian Solana ecosystem.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://linktr.ee/SuperteamMY" target="_blank" rel="noopener noreferrer" style={{
            padding: '12px 24px', borderRadius: 50, fontFamily: "'Inter', sans-serif",
            fontSize: 14, fontWeight: 600, textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)',
            transition: 'border-color 0.2s',
          }}>🔗 Community</a>
          <a href="https://discord.gg/rrUMX92p" target="_blank" rel="noopener noreferrer" style={{
            padding: '12px 24px', borderRadius: 50, fontFamily: "'Inter', sans-serif",
            fontSize: 14, fontWeight: 600, textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)',
          }}>💬 Discord</a>
          <a href="https://x.com/SuperteamMY" target="_blank" rel="noopener noreferrer" style={{
            padding: '12px 24px', borderRadius: 50, fontFamily: "'Inter', sans-serif",
            fontSize: 14, fontWeight: 600, textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)',
          }}>𝕏 Twitter / X</a>
        </div>

        {/* Email subscribe */}
        <div style={{ marginTop: 32, display: 'flex', gap: 8, justifyContent: 'center', maxWidth: 420, margin: '32px auto 0' }}>
          <input type="email" placeholder="Enter your email" style={{
            flex: 1, padding: '12px 16px', borderRadius: 50,
            border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
            color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none',
          }} />
          <button style={{
            padding: '12px 24px', borderRadius: 50, border: 'none',
            background: '#fff', color: '#000', fontFamily: "'Inter', sans-serif",
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>Subscribe</button>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 8 }}>
          Get notified about events, bounties, and opportunities.
        </p>
      </div>
    </section>
  );
}
