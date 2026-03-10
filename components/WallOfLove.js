// © 2026 edison9733. All rights reserved.
// components/WallOfLove.js
// Wall of Love with REAL tweet embeds using Twitter's oEmbed API
// Displays mini tweet cards like Superteam UAE's website
'use client';
import { useInView } from '@/hooks/useInView';
import { useEffect, useRef, useState } from 'react';

// ═══ HOW TWITTER oEmbed WORKS ═══
// 1. We have real tweet URLs from verified Superteam MY supporters
// 2. Twitter's widgets.js script loads and renders each tweet as an embed
// 3. If Twitter embed fails (ad blocker, slow load), we show a styled fallback card
// 4. The fallback card looks like a tweet (avatar, name, handle, content, link)

function TweetEmbed({ tweetUrl, fallback, index, inView }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Extract tweet ID from URL
  const tweetId = tweetUrl?.match(/status\/(\d+)/)?.[1];

  useEffect(() => {
    if (!tweetId || !containerRef.current || !inView) return;

    // Try to embed the real tweet using Twitter's widget API
    const timeout = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 5000); // 5 second timeout

    const tryEmbed = () => {
      if (window.twttr?.widgets) {
        window.twttr.widgets.createTweet(tweetId, containerRef.current, {
          theme: 'dark',
          cards: 'hidden',
          conversation: 'none',
          width: 350,
          dnt: true,
        }).then((el) => {
          if (el) {
            setLoaded(true);
            clearTimeout(timeout);
          } else {
            setFailed(true);
          }
        }).catch(() => setFailed(true));
      } else {
        // Wait for Twitter script to load
        const check = setInterval(() => {
          if (window.twttr?.widgets) {
            clearInterval(check);
            tryEmbed();
          }
        }, 500);
        setTimeout(() => clearInterval(check), 5000);
      }
    };

    tryEmbed();
    return () => clearTimeout(timeout);
  }, [tweetId, inView, loaded]);

  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
    }}>
      {/* Real Twitter embed container */}
      <div ref={containerRef} style={{ display: loaded ? 'block' : 'none' }} />

      {/* Fallback styled tweet card (shows if embed fails or no tweet URL) */}
      {(!loaded || failed || !tweetId) && (
        <FallbackTweetCard {...fallback} tweetUrl={tweetUrl} />
      )}
    </div>
  );
}

function FallbackTweetCard({ author, role, content, twitter, tweetUrl }) {
  const initial = author?.charAt(0) || '?';
  const isRealTweet = tweetUrl?.includes('x.com/') || tweetUrl?.includes('twitter.com/');

  return (
    <a
      href={tweetUrl || `https://x.com/${twitter}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        padding: 20,
        borderRadius: 16,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.3s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(29,155,240,0.3)';
        e.currentTarget.style.background = 'rgba(29,155,240,0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
      }}
    >
      {/* Header: Avatar + Name + Handle + X logo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(29,155,240,0.3), rgba(153,69,255,0.2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: '#1DA1F2',
          }}>{initial}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
              {author}
              {['solana', 'solanafm', 'soon_svm'].includes(twitter) && (
                <svg width="14" height="14" viewBox="0 0 22 22" fill="#1DA1F2"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.853-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.897.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/></svg>
              )}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
              @{twitter} {role ? `· ${role}` : ''}
            </div>
          </div>
        </div>
        {/* X/Twitter logo */}
        <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.2)' }}>𝕏</span>
      </div>

      {/* Tweet content */}
      <p style={{
        fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: '0 0 12px',
      }}>
        {content}
      </p>

      {/* Footer */}
      <div style={{
        paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 12, color: 'rgba(255,255,255,0.25)',
      }}>
        {isRealTweet ? (
          <span>View on 𝕏 ↗</span>
        ) : (
          <span>Read full testimonial ↗</span>
        )}
      </div>
    </a>
  );
}

export default function WallOfLove({ testimonials = [] }) {
  const [ref, inView] = useInView();

  return (
    <section id="wall-of-love" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 48,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s',
        }}>
          <span style={{
            fontSize: 12, fontWeight: 700, color: '#FF6B9D',
            letterSpacing: 2, textTransform: 'uppercase',
            display: 'block', marginBottom: 16,
          }}>Community</span>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#fff', margin: '0 0 12px',
          }}>Wall of Love</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 440, margin: '0 auto' }}>
            Real voices from our community and ecosystem partners.
          </p>
        </div>

        {/* Masonry-style tweet grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
          alignItems: 'start',
        }}>
          {testimonials.map((t, i) => (
            <TweetEmbed
              key={t.id}
              tweetUrl={t.tweet_url}
              fallback={{
                author: t.author,
                role: t.role,
                content: t.content,
                twitter: t.twitter,
              }}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
