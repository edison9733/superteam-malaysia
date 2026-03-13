// © 2026 edison9733. Members Directory with star bg, glass cards, neon filters, profile photos
'use client';
import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import DotBackground from '@/components/DotBackground';
import Footer from '@/components/Footer';
import { FALLBACK_MEMBERS, FALLBACK_CONTENT } from '@/lib/fallback-data';

const SKILL_FILTERS = ['All','Core Team','Rust','Frontend','Backend','Design','Content','Growth','Product','Community','Data','DevOps'];
const FILTER_COLORS = {'All':'#fff','Core Team':'#9945FF','Rust':'#FF6B6B','Frontend':'#03E1FF','Backend':'#14F195','Design':'#FFD700','Content':'#FF6B9D','Growth':'#14F195','Product':'#9945FF','Community':'#03E1FF','Data':'#FFD700','DevOps':'#FF6B6B'};
const BADGE_COLORS = {'Core Contributor':'#9945FF','Solana Builder':'#14F195','Hackathon Winner':'#03E1FF','Grant Recipient':'#FFD700','Bounty Hunter':'#FF6B6B'};

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [activeSkill, setActiveSkill] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch('/api/admin/members');
        const json = await res.json();
        if (json.data?.length > 0) setMembers(json.data);
        else setMembers(FALLBACK_MEMBERS);
      } catch { setMembers(FALLBACK_MEMBERS); }
    }
    fetchMembers();
  }, []);

  const filtered = members.filter(m => {
    const ms = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase()) || (m.company||'').toLowerCase().includes(search.toLowerCase());
    const msk = activeSkill==='All' || m.skills?.includes(activeSkill);
    return ms && msk;
  });

  return (
    <>
      <DotBackground />
      <NavBar />
      <div style={{ padding:'120px 24px 80px',maxWidth:1200,margin:'0 auto',minHeight:'100vh',position:'relative',zIndex:1 }}>
        <div style={{marginBottom:48}}>
          <a href="/" style={{color:'rgba(255,255,255,0.4)',fontSize:13,textDecoration:'none',marginBottom:20,display:'inline-block'}}>← Back to Home</a>
          <h1 style={{fontSize:'clamp(32px,5vw,52px)',fontWeight:800,color:'#fff',margin:'0 0 8px'}}>
            Member <span style={{fontStyle:'italic',background:'linear-gradient(135deg,#9945FF,#14F195)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Directory</span>
          </h1>
          <p style={{fontSize:16,color:'rgba(255,255,255,0.45)',margin:0}}>Discover talented builders in Malaysia&apos;s Solana ecosystem.</p>
        </div>

        <div style={{marginBottom:24}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, role, or company..."
            style={{width:'100%',maxWidth:480,padding:'14px 20px',borderRadius:14,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#fff',fontSize:15,outline:'none',boxSizing:'border-box',backdropFilter:'blur(10px)'}} />
        </div>

        {/* Skill Filters — standout with glow */}
        <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:32}}>
          {SKILL_FILTERS.map(s=>{
            const c=FILTER_COLORS[s]||'#fff';
            const active=activeSkill===s;
            return (
              <button key={s} onClick={()=>setActiveSkill(s)} style={{
                padding:'10px 22px',borderRadius:100,fontSize:13,fontWeight:700,cursor:'pointer',
                background:active?`${c}20`:'rgba(255,255,255,0.03)',
                color:active?c:'rgba(255,255,255,0.5)',
                border:active?`2px solid ${c}60`:'1px solid rgba(255,255,255,0.06)',
                boxShadow:active?`0 0 15px ${c}25`:'none',
                transform:active?'scale(1.05)':'scale(1)',
                transition:'all 0.2s',letterSpacing:0.5,
              }}>{s}</button>
            );
          })}
        </div>

        <div style={{fontSize:13,color:'rgba(255,255,255,0.3)',marginBottom:16}}>{filtered.length} member{filtered.length!==1?'s':''} found</div>

        {/* Member Grid with glass cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:16}}>
          {filtered.map(m => {
            const expanded=expandedId===m.id;
            const bc=BADGE_COLORS[m.badge]||'#9945FF';
            const a=m.achievements||{};
            return (
              <div key={m.id} onClick={()=>setExpandedId(expanded?null:m.id)} style={{
                padding:24,borderRadius:16,cursor:'pointer',
                background:expanded?'rgba(153,69,255,0.06)':'rgba(255,255,255,0.02)',
                backdropFilter:'blur(16px)',
                border:expanded?`1px solid ${bc}40`:'1px solid rgba(255,255,255,0.08)',
                boxShadow:expanded?`0 0 20px ${bc}15`:'none',
                transition:'all 0.3s',
              }}
                onMouseEnter={e=>{if(!expanded){e.currentTarget.style.borderColor=`${bc}30`;e.currentTarget.style.background='rgba(255,255,255,0.04)';}}}
                onMouseLeave={e=>{if(!expanded){e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';e.currentTarget.style.background='rgba(255,255,255,0.02)';}}}
              >
                <div style={{display:'flex',gap:14,marginBottom:14}}>
                  {/* Profile photo or initials */}
                  <div style={{width:52,height:52,borderRadius:14,flexShrink:0,overflow:'hidden',background:`linear-gradient(135deg,${bc}33,rgba(255,255,255,0.05))`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}} />
                    ) : null}
                    <div style={{display:m.photo?'none':'flex',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:800,color:bc}}>{m.name.charAt(0)}</div>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <h3 style={{fontSize:16,fontWeight:700,color:'#fff',margin:0}}>{m.name}</h3>
                      {m.featured && <span style={{fontSize:10,color:'#FFD700'}}>★</span>}
                    </div>
                    <p style={{fontSize:13,color:'rgba(255,255,255,0.45)',margin:'2px 0 0'}}>{m.role}{m.company?` @ ${m.company}`:''}</p>
                  </div>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:10}}>
                  {m.skills?.map(s=><span key={s} style={{padding:'3px 10px',borderRadius:100,fontSize:11,fontWeight:600,background:`${bc}12`,color:bc,border:`1px solid ${bc}20`}}>{s}</span>)}
                </div>
                {m.badge && <span style={{display:'inline-block',padding:'3px 10px',borderRadius:100,fontSize:10,fontWeight:700,background:bc+'15',color:bc,marginBottom:8}}>{m.badge}</span>}
                {expanded && (
                  <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                    <p style={{fontSize:13,color:'rgba(255,255,255,0.5)',lineHeight:1.6,margin:'0 0 14px'}}>{m.bio}</p>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:14}}>
                      {[{label:'Hackathons',val:a.hackathon_wins||0},{label:'Projects',val:a.projects_built||0},{label:'Grants',val:a.grants_received||0},{label:'Bounties',val:a.bounties_completed||0}].map(x=>(
                        <div key={x.label} style={{textAlign:'center',padding:'8px 0',borderRadius:8,background:'rgba(0,0,0,0.2)'}}>
                          <div style={{fontSize:18,fontWeight:800,color:'#fff'}}>{x.val}</div>
                          <div style={{fontSize:9,color:'rgba(255,255,255,0.35)',textTransform:'uppercase',letterSpacing:0.3}}>{x.label}</div>
                        </div>
                      ))}
                    </div>
                    {m.twitter && <a href={`https://x.com/${m.twitter}`} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:13,color:'#03E1FF',textDecoration:'none'}}>𝕏 @{m.twitter} ↗</a>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {filtered.length===0 && <div style={{textAlign:'center',padding:'60px 0',color:'rgba(255,255,255,0.3)'}}>No members found matching your search.</div>}
      </div>
      <Footer twitterUrl={FALLBACK_CONTENT.twitter_url} telegramUrl={FALLBACK_CONTENT.telegram_url} discordUrl={FALLBACK_CONTENT.discord_url} />
    </>
  );
}
