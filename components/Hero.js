'use client';
import { useState, useEffect, useRef } from 'react';

export default function Hero({ content }) {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [startTyping, setStartTyping] = useState(false);
  const fullText = 'in Malaysia';
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
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      overflow: 'hidden', padding: '0 24px', paddingBottom: 40,
    }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/sp_background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.94) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 900, width: '100%' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
          Solana Ecosystem · Malaysia
        </p>

        <h1 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontWeight: 800, lineHeight: 1.08, margin: 0, fontSize: 'clamp(36px, 7vw, 88px)', textAlign: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>We Lead Solana</span>
          <br />
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>Growth </span>
          <span style={{ color: '#14F195', fontStyle: 'italic' }}>{typedText}</span>
          {showCursor && (
            <span style={{
              display: 'inline-block', width: 3, height: 'clamp(28px, 6vw, 72px)',
              backgroundColor: '#14F195', marginLeft: 4, verticalAlign: 'text-bottom',
              animation: 'cursorBlink 0.8s infinite',
            }} />
          )}
        </h1>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px, 2vw, 18px)', color: 'rgba(255,255,255,0.45)', marginTop: 28, lineHeight: 1.7, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
          {content?.hero_subtitle || 'The home for Solana builders, creators, and innovators in Malaysia. Join the movement shaping Web3 in Southeast Asia.'}
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' }}>
          <a href="https://linktr.ee/SuperteamMY" target="_blank" rel="noopener noreferrer" className="cta-bounce" style={{
            padding: '14px 32px', background: 'linear-gradient(135deg, #14F195, #0fcc7d)', color: '#000', borderRadius: 50,
            fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block',
            boxShadow: '0 0 24px rgba(20,241,149,0.35)',
          }}>Join Community</a>
          <a href="https://superteam.fun" target="_blank" rel="noopener noreferrer" style={{
            padding: '14px 32px', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', borderRadius: 50,
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, textDecoration: 'none',
          }}>Explore Opportunities</a>
        </div>
      </div>

      <style jsx>{`
        @keyframes cursorBlink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
      `}</style>
    </section>
  );
}
