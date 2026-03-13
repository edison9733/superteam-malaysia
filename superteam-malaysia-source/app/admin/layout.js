// app/admin/layout.js — Admin layout with Superteam logo
'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_ITEMS = [
  {href:'/admin',label:'Dashboard',icon:'📊'},
  {href:'/admin/members',label:'Members',icon:'👥'},
  {href:'/admin/events',label:'Events',icon:'📅'},
  {href:'/admin/partners',label:'Partners',icon:'🤝'},
  {href:'/admin/testimonials',label:'Wall of Love',icon:'💬'},
  {href:'/admin/stats',label:'Stats',icon:'📈'},
  {href:'/admin/faqs',label:'FAQs',icon:'❓'},
  {href:'/admin/content',label:'Site Content',icon:'📝'},
  {href:'/admin/announcements',label:'Announcements',icon:'📢'},
];

export default function AdminLayout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(()=>{checkAuth();},[]);

  async function checkAuth() {
    try { const res=await fetch('/api/admin/members'); if(res.ok) setIsAuth(true); } catch{}
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault(); setError('');
    try {
      const res=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
      if(res.ok) setIsAuth(true); else setError('Wrong password.');
    } catch { setError('Connection error.'); }
  }

  function handleLogout() { document.cookie='admin_session=; path=/; max-age=0'; setIsAuth(false); setPassword(''); }

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0a0a0f',color:'#fff'}}>Loading admin panel...</div>;

  if (!isAuth) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0a0a0f'}}>
      <div style={{width:380,padding:40,borderRadius:20,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center'}}>
        <img src="/logo.png" alt="Superteam Malaysia" style={{width:56,height:56,borderRadius:14,margin:'0 auto 16px',display:'block'}} />
        <h1 style={{fontSize:22,fontWeight:800,color:'#fff',margin:'0 0 4px'}}>Superteam Malaysia</h1>
        <p style={{fontSize:14,color:'rgba(255,255,255,0.4)',margin:'0 0 24px'}}>Admin Dashboard</p>
        <form onSubmit={handleLogin}>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter admin password"
            style={{width:'100%',padding:'12px 16px',borderRadius:12,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',fontSize:14,outline:'none',boxSizing:'border-box',marginBottom:12}} autoFocus />
          {error && <p style={{color:'#FF6B6B',fontSize:13,margin:'0 0 12px'}}>{error}</p>}
          <button type="submit" style={{width:'100%',padding:'12px',borderRadius:12,background:'#14F195',color:'#0D0D0D',fontSize:14,fontWeight:700,border:'none',cursor:'pointer'}}>Sign In →</button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#0a0a0f'}}>
      <aside style={{width:sidebarOpen?260:72,background:'rgba(255,255,255,0.02)',borderRight:'1px solid rgba(255,255,255,0.06)',padding:'16px 0',transition:'width 0.3s',overflow:'hidden',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:10,padding:'0 16px',marginBottom:24}}>
          <img src="/logo.png" alt="ST" style={{width:36,height:36,borderRadius:10}} />
          {sidebarOpen && <span style={{fontSize:15,fontWeight:800,color:'#fff'}}>STMY <span style={{color:'#14F195'}}>Admin</span></span>}
          <button onClick={()=>setSidebarOpen(!sidebarOpen)} style={{marginLeft:'auto',background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:14}}>{sidebarOpen?'◀':'▶'}</button>
        </div>
        <nav>
          {NAV_ITEMS.map(item=>{
            const active=pathname===item.href;
            return (
              <Link key={item.href} href={item.href} style={{
                display:'flex',alignItems:'center',gap:12,padding:'10px 16px',margin:'2px 8px',borderRadius:10,
                textDecoration:'none',fontSize:13,fontWeight:active?700:500,
                background:active?'rgba(20,241,149,0.1)':'transparent',
                color:active?'#14F195':'rgba(255,255,255,0.5)',
                border:active?'1px solid rgba(20,241,149,0.2)':'1px solid transparent',
                transition:'all 0.2s',
              }}>
                <span style={{fontSize:16}}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div style={{padding:'16px',marginTop:'auto'}}>
          <button onClick={handleLogout} style={{width:'100%',padding:'8px',borderRadius:8,background:'rgba(255,107,107,0.1)',border:'1px solid rgba(255,107,107,0.2)',color:'#FF6B6B',fontSize:12,fontWeight:600,cursor:'pointer'}}>
            {sidebarOpen?'Logout':'↩'}
          </button>
          <a href="/" target="_blank" style={{display:'block',textAlign:'center',marginTop:8,fontSize:11,color:'rgba(255,255,255,0.3)',textDecoration:'none'}}>
            {sidebarOpen?'View Live Site ↗':'🌐'}
          </a>
        </div>
      </aside>
      <main style={{flex:1,padding:24,overflowY:'auto',maxHeight:'100vh'}}>
        {children}
      </main>
    </div>
  );
}
