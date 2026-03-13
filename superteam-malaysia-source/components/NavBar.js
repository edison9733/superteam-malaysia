// © 2026 edison9733. NavBar with fixed menu visibility
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h=()=>setScrolled(window.scrollY>50);
    window.addEventListener('scroll',h,{passive:true});
    return()=>window.removeEventListener('scroll',h);
  }, []);
  useEffect(() => {
    document.body.style.overflow=menuOpen?'hidden':'';
    return()=>{document.body.style.overflow='';};
  }, [menuOpen]);
  const scrollTo=(id)=>{setMenuOpen(false);setTimeout(()=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});},300);};
  const navLinks = [
    {label:'Events',id:'events'},{label:'Results',id:'results'},{label:'Members',id:'members-section'},
    {label:'Perks',id:'perks'},{label:'Join',id:'how-to-join'},{label:'Latest',id:'latest'},
    {label:'Directory',href:'/members'},
  ];
  return (
    <>
      <div className="desktop-only" style={{position:'fixed',left:0,top:0,bottom:0,width:48,zIndex:101,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
        <span style={{writingMode:'vertical-rl',textOrientation:'mixed',transform:'rotate(180deg)',fontSize:10,fontWeight:700,letterSpacing:4,textTransform:'uppercase',color:'rgba(255,255,255,0.12)'}}>Superteam Malaysia</span>
      </div>
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,padding:scrolled?'14px 0':'22px 0',background:scrolled?'rgba(8,8,14,0.92)':'transparent',backdropFilter:scrolled?'blur(20px) saturate(180%)':'none',borderBottom:scrolled?'1px solid rgba(255,255,255,0.06)':'none',transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)'}}>
        <div className="nav-inner" style={{maxWidth:1400,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
            <img src="/logo.png" alt="Superteam Malaysia" style={{width:36,height:36,borderRadius:10,objectFit:'contain'}} />
            <span style={{fontSize:17,fontWeight:800,letterSpacing:-0.5,color:'#fff'}}>SUPERTEAM<span style={{color:'#14F195'}}> MY</span></span>
          </Link>
          <button onClick={()=>setMenuOpen(!menuOpen)} style={{padding:'10px 28px',borderRadius:100,fontSize:12,fontWeight:800,letterSpacing:3,textTransform:'uppercase',cursor:'pointer',background:menuOpen?'#fff':'rgba(255,255,255,0.06)',color:menuOpen?'#08080e':'#fff',border:'1px solid rgba(255,255,255,0.12)',transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)'}}>
            {menuOpen?'CLOSE':'MENU'}
          </button>
        </div>
      </nav>
      {/* Full-screen menu */}
      {menuOpen && (
        <div style={{position:'fixed',inset:0,zIndex:99,background:'rgba(8,8,14,0.98)',backdropFilter:'blur(40px)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:0,paddingTop:80}} onClick={()=>setMenuOpen(false)}>
          {navLinks.map((link,i)=>(
            link.href ? (
              <Link key={link.label} href={link.href} style={{fontSize:'clamp(28px,5vw,48px)',fontWeight:800,color:'#fff',textDecoration:'none',padding:'12px 20px',opacity:0.8,transition:'all 0.3s',display:'block'}}
                onMouseEnter={e=>e.currentTarget.style.color='#14F195'}
                onMouseLeave={e=>e.currentTarget.style.color='#fff'}>
                {link.label}
              </Link>
            ) : (
              <button key={link.label} onClick={(e)=>{e.stopPropagation();scrollTo(link.id);}} style={{fontSize:'clamp(28px,5vw,48px)',fontWeight:800,color:'#fff',background:'none',border:'none',cursor:'pointer',padding:'12px 20px',opacity:0.8,transition:'all 0.3s',display:'block',fontFamily:'inherit'}}
                onMouseEnter={e=>e.currentTarget.style.color='#14F195'}
                onMouseLeave={e=>e.currentTarget.style.color='#fff'}>
                {link.label}
              </button>
            )
          ))}
          <div style={{display:'flex',gap:16,marginTop:32}}>
            <a href="https://x.com/SuperteamMY" target="_blank" rel="noopener noreferrer" style={{color:'rgba(255,255,255,0.5)',textDecoration:'none',fontSize:14}}>𝕏 Twitter</a>
            <a href="https://linktr.ee/SuperteamMY" target="_blank" rel="noopener noreferrer" style={{color:'rgba(255,255,255,0.5)',textDecoration:'none',fontSize:14}}>🔗 Linktree</a>
            <a href="https://discord.gg/rrUMX92p" target="_blank" rel="noopener noreferrer" style={{color:'rgba(255,255,255,0.5)',textDecoration:'none',fontSize:14}}>💬 Discord</a>
          </div>
        </div>
      )}
    </>
  );
}
