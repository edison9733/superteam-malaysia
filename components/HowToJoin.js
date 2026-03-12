'use client';

const STEPS = [
  { num: '01', title: 'Join the Community', desc: 'Connect with us on Telegram, Discord, or Twitter. Follow @SuperteamMY for the latest updates.' },
  { num: '02', title: 'Attend an Event', desc: 'Come to a meetup, hackathon, or workshop. Meet fellow builders and find your tribe.' },
  { num: '03', title: 'Start Contributing', desc: 'Complete bounties on Superteam Earn, build a project, or help with community initiatives.' },
  { num: '04', title: 'Become a Member', desc: 'Active contributors are invited to become official members with full access to perks and the global network.' },
];

export default function HowToJoin() {
  return (
    <section id="how-to-join" className="scroll-spy-section" style={{ padding: '100px 24px', maxWidth: 700, margin: '0 auto' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#14F195', textAlign: 'center', marginBottom: 12 }}>Get Started</p>
      <h2 className="section-title" style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 800,
        fontSize: 'clamp(28px, 5vw, 48px)', textAlign: 'center',
        marginBottom: 56,
        transition: 'opacity 0.5s ease, text-shadow 0.5s ease',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>How to Become a </span>
        <span style={{ color: '#14F195', fontStyle: 'italic' }}>Member</span>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}> aka </span>
        <span style={{ color: '#14F195', fontStyle: 'italic' }}>Chef</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 800,
              fontSize: 28, color: ['#14F195', '#9945FF', '#00C2FF', '#EAB308'][i],
              minWidth: 48,
            }}>{s.num}</span>
            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff', margin: '0 0 8px' }}>{s.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <a href="https://linktr.ee/SuperteamMY" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block', padding: '14px 32px',
          backgroundColor: '#14F195', color: '#000',
          borderRadius: 50, fontFamily: "'Inter', sans-serif",
          fontWeight: 700, fontSize: 15, textDecoration: 'none',
          boxShadow: '0 0 20px rgba(20,241,149,0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(20,241,149,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 20px rgba(20,241,149,0.3)'; }}
        >Join Community Now →</a>
      </div>
    </section>
  );
}
