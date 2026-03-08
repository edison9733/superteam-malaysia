// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';
import { useEffect, useRef } from 'react';

// Tweet IDs to embed — replace with your actual SuperteamMY tweet IDs
const TWEET_IDS = [
  '1234567890123456789', // Replace with real tweet ID
  '1234567890123456790', // Replace with real tweet ID
  '1234567890123456791', // Replace with real tweet ID
];

function TweetEmbed({ tweetId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load Twitter widget script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.head.appendChild(script);
      script.onload = () => {
        window.twttr?.widgets?.createTweet(tweetId, containerRef.current, {
          theme: 'dark', width: 360, conversation: 'none',
        });
      };
    } else {
      window.twttr?.widgets?.createTweet(tweetId, containerRef.current, {
        theme: 'dark', width: 360, conversation: 'none',
      });
    }
  }, [tweetId]);

  return (
    <div ref={containerRef} style={{
      minWidth: 300, maxWidth: 400, flexShrink: 0,
      borderRadius: 16, overflow: 'hidden',
    }} />
  );
}

export default function LatestSection() {
  const [ref, inView] = useInView();

  return (
    <section id="latest" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 48,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#03E1FF', letterSpacing: 2, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Latest</span>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>
            The Latest by Superteam{' '}
            <span style={{ color: '#14F195' }}>MY</span>
          </h2>
        </div>

        {/* Twitter Timeline Embed — alternative to individual tweets */}
        <div style={{
          display: 'flex', justifyContent: 'center', marginBottom: 48,
          borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(0,0,0,0.3)', maxWidth: 600, margin: '0 auto 48px',
        }}>
          <a
            className="twitter-timeline"
            data-theme="dark"
            data-height="500"
            data-chrome="noheader nofooter noborders transparent"
            href="https://twitter.com/SuperteamMY"
          >
            Loading tweets...
          </a>
        </div>

        {/* Quote */}
        <div style={{
          textAlign: 'center', padding: '48px 24px',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s 0.3s',
        }}>
          <blockquote style={{
            fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: '#fff',
            fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic',
            lineHeight: 1.3, margin: '0 0 20px', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto',
          }}>
            &ldquo;Driven by creators, loved by the community.&rdquo;
          </blockquote>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>— Superteam Malaysia</span>
        </div>
      </div>
    </section>
  );
}
