'use client';
import { useInView } from '@/hooks/useInView';

export default function WallOfLove({ testimonials = [] }) {
  const [ref, inView] = useInView();
  return (
    <section id="wall-of-love" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#FF6B9D', letterSpacing: 2, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Community</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#fff', margin: 0 }}>Wall of Love 💜</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {testimonials.map((t, i) => (
            <div key={t.id} style={{
              padding: 24, borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.4s', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${i * 0.1}s`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, rgba(153,69,255,0.2), rgba(20,241,149,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#9945FF' }}>
                    {t.author?.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{t.author}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{t.role}</div>
                  </div>
                </div>
                <a href={`https://x.com/${t.twitter}`} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: 18 }}>𝕏</a>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>"{t.content}"</p>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <a href={`https://x.com/${t.twitter}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>@{t.twitter}</a>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>· via 𝕏</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
