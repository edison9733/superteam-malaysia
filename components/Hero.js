'use client';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [startTyping, setStartTyping] = useState(false);
  const fullText = ' in Malaysia';
  const typingRef = useRef(null);

  useEffect(() => {
    const delay = setTimeout(() => setStartTyping(true), 1200);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!startTyping) return;
    let i = 0;
    typingRef.current = setInterval(() => {
      i++;
      setTypedText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(typingRef.current);
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, 100 + Math.random() * 80);
    return () => clearInterval(typingRef.current);
  }, [startTyping]);

  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      padding: '0 24px',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/sp_background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />
      {/* Dark overlay for contrast */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.94) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 900 }}>
        {/* Subtitle */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: 32,
        }}>
          Solana Ecosystem · Malaysia
        </p>

        {/* Main heading — staggered */}
        <h1 style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 800,
          lineHeight: 1.05,
          margin: 0,
        }}>
          <span style={{
            display: 'block',
            fontSize: 'clamp(40px, 8vw, 96px)',
            color: 'rgba(255,255,255,0.35)',
            textAlign: 'left',
          }}>
            We Lead Solana
          </span>
          <span style={{
            display: 'block',
            fontSize: 'clamp(40px, 8vw, 96px)',
            textAlign: 'right',
            paddingLeft: '18%',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>Growth</span>
            <span style={{ color: '#14F195', fontStyle: 'italic' }}>{typedText}</span>
            {showCursor && (
              <span style={{
                display: 'inline-block',
                width: 3,
                height: 'clamp(36px, 7vw, 80px)',
                backgroundColor: '#14F195',
                marginLeft: 4,
                verticalAlign: 'text-bottom',
                animation: 'cursorBlink 0.8s infinite',
              }} />
            )}
          </span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(14px, 2vw, 18px)',
          color: 'rgba(255,255,255,0.45)',
          marginTop: 32,
          lineHeight: 1.7,
          maxWidth: 560,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          The home for Solana builders, creators, and innovators in Malaysia. Join the movement shaping Web3 in Southeast Asia.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
          <a href="https://linktr.ee/SuperteamMY" target="_blank" rel="noopener noreferrer" style={{
            padding: '14px 32px',
            backgroundColor: '#fff',
            color: '#000',
            borderRadius: 50,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            Join Community
          </a>
          <a href="https://superteam.fun" target="_blank" rel="noopener noreferrer" style={{
            padding: '14px 32px',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.7)',
            borderRadius: 50,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
            transition: 'border-color 0.2s',
          }}>
            Explore Opportunities
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes cursorBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @media (max-width: 768px) {
          h1 span { text-align: center !important; padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}
