// © 2026 edison9733. All rights reserved.
'use client';
import { useInView } from '@/hooks/useInView';
import { useEffect, useRef } from 'react';

export default function LatestSection() {
  const [ref, inView] = useInView();
  const twitterRef = useRef(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    script.onload = () => {
      if (window.twttr && twitterRef.current) {
        window.twttr.widgets.load(twitterRef.current);
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <section id="latest" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 40,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#03E1FF', letterSpacing: 2, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Latest</span>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>
            The Latest by Superteam{' '}
            <span style={{ color: '#14F195' }}>MY</span>
          </h2>
        </div>

        {/* Twitter Timeline */}
        <div ref={twitterRef} style={{
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(0,0,0,0.2)',
          minHeight: 500,
        }}>
          
            className="twitter-timeline"
            data-theme="dark"
            data-height="500"
            data-width="100%"
            data-chrome="noheader nofooter noborders transparent"
            href="https://twitter.com/SuperteamMY"
          >
            Loading @SuperteamMY tweets...
          </a>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 16 }}>
          If tweets do not load above,{' '}
          <a href="https://x.com/SuperteamMY" target="_blank" rel="noopener noreferrer" style={{ color: '#03E1FF', textDecoration: 'underline' }}>
            visit @SuperteamMY on 𝕏
          </a>
        </p>

        {/* Quote */}
        <div style={{
          textAlign: 'center', padding: '48px 24px',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s 0.3s',
        }}>
          <blockquote style={{
            fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: '#fff',
            fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic',
            lineHeight: 1.3, margin: '0 0 20px', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto',
          }}>
            &ldquo;Driven by creators, loved by the community.&rdquo;
          </blockquote>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>— Superteam Malaysia</span>
        </div>
      </div>
    </section>
  );
}
