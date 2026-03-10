// © 2026 edison9733. All rights reserved.
// components/LatestSection.js
// Latest by Superteam MY — Individual tweet embeds (not timeline)
// Shows the most impactful tweets as mini embeds, like Superteam UAE
'use client';
import { useInView } from '@/hooks/useInView';
import { useEffect, useRef, useState } from 'react';

// ═══ FEATURED TWEETS ═══
// These are real, high-engagement tweets from @SuperteamMY
// To add/remove tweets: just edit this array with tweet IDs
const FEATURED_TWEETS = [
  '1755818270022889805', // Launch Day — 19K views, 92 likes
  '1961599387689459802', // Solana Hub Milestone
  '1967442054482731061', // New office looking fire (Nic from Sanctum)
  '1963008089923453428', // Drop by Solana Hub (Wei Hup)
];

function SingleTweetEmbed({ tweetId, index }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const tryEmbed = () => {
      if (window.twttr?.widgets) {
        window.twttr.widgets.createTweet(tweetId, ref.current, {
          theme: 'dark',
          width: 480,
          conversation: 'none',
          dnt: true,
        }).then((el) => {
          if (el) setLoaded(true);
        }).catch(() => {});
      }
    };

    // Retry every 500ms for up to 5s
    const interval = setInterval(() => {
      if (window.twttr?.widgets) {
        clearInterval(interval);
        tryEmbed();
      }
    }, 500);

    const timeout = setTimeout(() => clearInterval(interval), 5000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [tweetId]);

  return (
    <div style={{
      minHeight: loaded ? 'auto' : 200,
      borderRadius: 16,
      overflow: 'hidden',
    }}>
      <div ref={ref} />
      {!loaded && (
        <a
          href={`https://x.com/SuperteamMY/status/${tweetId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 200, borderRadius: 16,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.3)', fontSize: 14,
            textDecoration: 'none',
          }}
        >
          Loading tweet... ↗
        </a>
      )}
    </div>
  );
}

export default function LatestSection() {
  const [ref, inView] = useInView();
  const scriptLoaded = useRef(false);

  // Load Twitter widget script
  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    if (!document.querySelector('script[src*="platform.twitter.com/widgets.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section id="latest" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 40,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s',
        }}>
          <span style={{
            fontSize: 12, fontWeight: 700, color: '#03E1FF',
            letterSpacing: 2, textTransform: 'uppercase',
            display: 'block', marginBottom: 16,
          }}>Latest</span>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff', margin: '0 0 16px',
          }}>
            The Latest by Superteam <span style={{ color: '#14F195' }}>MY</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 460, margin: '0 auto' }}>
            Real tweets from our community. Follow{' '}
            <a href="https://x.com/SuperteamMY" target="_blank" rel="noopener noreferrer" style={{ color: '#03E1FF', textDecoration: 'none' }}>@SuperteamMY</a>
            {' '}for more.
          </p>
        </div>

        {/* Tweet grid — 2 columns on desktop, 1 on mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 16,
          alignItems: 'start',
        }}>
          {FEATURED_TWEETS.map((id, i) => (
            <SingleTweetEmbed key={id} tweetId={id} index={i} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="https://x.com/SuperteamMY" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 24px', borderRadius: 100,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600,
            textDecoration: 'none',
          }}>Follow @SuperteamMY on 𝕏 ↗</a>
        </div>

        {/* Community quote */}
        <div style={{
          textAlign: 'center', padding: '48px 24px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s 0.3s',
        }}>
          <blockquote style={{
            fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: '#fff',
            fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic',
            lineHeight: 1.3, margin: '0 0 20px', maxWidth: 600,
            marginLeft: 'auto', marginRight: 'auto',
          }}>
            Dibangunkan oleh creators, disayangi rakyat.
          </blockquote>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
            — Superteam Malaysia
          </span>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', marginTop: 8 }}>
            Built by creators, loved by the people. 🇲🇾
          </p>
        </div>
      </div>
    </section>
  );
}
