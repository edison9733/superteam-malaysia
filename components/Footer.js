// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
import Link from 'next/link';

export default function Footer({ twitterUrl, telegramUrl, discordUrl }) {
  return (
    <footer style={{ padding: '48px 24px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #9945FF, #14F195)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Superteam<span style={{ color: '#14F195' }}> MY</span></span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, maxWidth: 280 }}>
              Building Solana's future in Malaysia. Part of the global Superteam network.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>Navigate</h4>
            {[
              ['Mission', '/#mission'],
              ['Events', '/#events'],
              ['Members', '/#members-section'],
              ['Partners', '/#partners'],
              ['FAQ', '/#faq'],
            ].map(([label, href]) => (
              <Link key={label} href={href} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.4)', padding: '6px 0', textDecoration: 'none' }}>{label}</Link>
            ))}
            <Link href="/members" style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.4)', padding: '6px 0', textDecoration: 'none' }}>Member Directory</Link>
          </div>

          {/* Community */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>Community</h4>
            {[
              ['Community', telegramUrl || 'https://linktr.ee/SuperteamMY'],
              ['Discord', discordUrl || 'https://discord.gg/rrUMX92p'],
              ['Twitter / X', twitterUrl || 'https://x.com/SuperteamMY'],
              ['Superteam Earn', 'https://superteam.fun'],
            ].map(([l, u]) => (
              <a key={l} href={u} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.4)', padding: '6px 0', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>

          {/* Global Network */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>Global Network</h4>
            {[
              ['Superteam Global', 'https://superteam.fun'],
              ['Superteam UAE', 'https://uae.superteam.fun'],
              ['Superteam Germany', 'https://de.superteam.fun'],
            ].map(([l, u]) => (
              <a key={l} href={u} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.4)', padding: '6px 0', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2026 Superteam Malaysia. Part of the Superteam network.</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', marginTop: 4, display: 'block' }}>Designed & Built by edison9733 for Superteam Earn Bounty</span>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              ['𝕏', twitterUrl || 'https://x.com/SuperteamMY'],
              ['🔗', telegramUrl || 'https://linktr.ee/SuperteamMY'],
              ['💬', discordUrl || 'https://discord.gg/rrUMX92p'],
            ].map(([icon, url]) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 16, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
