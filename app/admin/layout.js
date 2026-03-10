// app/admin/layout.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/members', label: 'Members', icon: '👥' },
  { href: '/admin/events', label: 'Events', icon: '📅' },
  { href: '/admin/partners', label: 'Partners', icon: '🤝' },
  { href: '/admin/testimonials', label: 'Wall of Love', icon: '💬' },
  { href: '/admin/stats', label: 'Stats', icon: '📈' },
  { href: '/admin/faqs', label: 'FAQs', icon: '❓' },
  { href: '/admin/content', label: 'Site Content', icon: '📝' },
  { href: '/admin/announcements', label: 'Announcements', icon: '📢' },
];

export default function AdminLayout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch('/api/admin/members');
      if (res.ok) {
        setIsAuth(true);
      }
    } catch (e) {}
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuth(true);
      } else {
        setError('Wrong password. Please try again.');
      }
    } catch (e) {
      setError('Connection error. Check your network.');
    }
  }

  function handleLogout() {
    document.cookie = 'admin_session=; path=/; max-age=0';
    setIsAuth(false);
    setPassword('');
  }

  if (loading) {
    return (
      <div style={styles.loadingWrap}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading admin panel...</p>
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginCard}>
          <div style={styles.loginLogo}>🏠</div>
          <h1 style={styles.loginTitle}>Superteam Malaysia</h1>
          <p style={styles.loginSubtitle}>Admin Dashboard</p>
          <form onSubmit={handleLogin} style={styles.loginForm}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              style={styles.loginInput}
              autoFocus
            />
            {error && <p style={styles.loginError}>{error}</p>}
            <button type="submit" style={styles.loginBtn}>
              Sign In →
            </button>
          </form>
          <p style={styles.loginHint}>
            Default password is set in your <code>.env.local</code> file as <code>ADMIN_PASSWORD</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, width: sidebarOpen ? 260 : 72 }}>
        <div style={styles.sidebarHeader}>
          <span style={styles.sidebarLogo}>⚡</span>
          {sidebarOpen && <span style={styles.sidebarTitle}>STMY Admin</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={styles.toggleBtn}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav style={styles.nav}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {}),
                }}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                {sidebarOpen && <span style={styles.navLabel}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={styles.sidebarFooter}>
          {sidebarOpen && (
            <a href="/" target="_blank" rel="noopener" style={styles.viewSiteLink}>
              View Live Site ↗
            </a>
          )}
          <button onClick={handleLogout} style={styles.logoutBtn}>
            {sidebarOpen ? 'Sign Out' : '🚪'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ ...styles.main, marginLeft: sidebarOpen ? 260 : 72 }}>
        {children}
      </main>
    </div>
  );
}

// ============================================
// Inline styles (no external CSS dependency)
// ============================================
const styles = {
  layout: {
    minHeight: '100vh',
    background: '#0a0a0f',
    color: '#e4e4e7',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    background: '#111118',
    borderRight: '1px solid #1e1e2a',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.2s ease',
    zIndex: 100,
    overflow: 'hidden',
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '20px 16px',
    borderBottom: '1px solid #1e1e2a',
  },
  sidebarLogo: { fontSize: 24 },
  sidebarTitle: { fontSize: 16, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' },
  toggleBtn: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    color: '#71717a',
    cursor: 'pointer',
    fontSize: 12,
  },
  nav: {
    flex: 1,
    padding: '12px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    overflowY: 'auto',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 8,
    textDecoration: 'none',
    color: '#a1a1aa',
    fontSize: 14,
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  },
  navItemActive: {
    background: '#14F19520',
    color: '#14F195',
  },
  navIcon: { fontSize: 18, width: 24, textAlign: 'center', flexShrink: 0 },
  navLabel: {},
  sidebarFooter: {
    padding: '12px 8px',
    borderTop: '1px solid #1e1e2a',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  viewSiteLink: {
    textAlign: 'center',
    padding: '8px 12px',
    color: '#9945FF',
    fontSize: 13,
    textDecoration: 'none',
  },
  logoutBtn: {
    padding: '8px 12px',
    background: '#1e1e2a',
    border: 'none',
    borderRadius: 8,
    color: '#a1a1aa',
    cursor: 'pointer',
    fontSize: 13,
  },
  main: {
    minHeight: '100vh',
    transition: 'margin-left 0.2s ease',
    padding: '32px',
  },
  // Login page
  loginWrap: {
    minHeight: '100vh',
    background: '#0a0a0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  loginCard: {
    background: '#111118',
    border: '1px solid #1e1e2a',
    borderRadius: 16,
    padding: '48px 40px',
    maxWidth: 420,
    width: '100%',
    textAlign: 'center',
  },
  loginLogo: { fontSize: 48, marginBottom: 16 },
  loginTitle: { fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 },
  loginSubtitle: { fontSize: 14, color: '#71717a', marginTop: 8, marginBottom: 32 },
  loginForm: { display: 'flex', flexDirection: 'column', gap: 12 },
  loginInput: {
    padding: '14px 16px',
    background: '#0a0a0f',
    border: '1px solid #27272a',
    borderRadius: 10,
    color: '#fff',
    fontSize: 15,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  loginBtn: {
    padding: '14px',
    background: '#14F195',
    color: '#000',
    border: 'none',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
  loginError: { color: '#f43f5e', fontSize: 13, margin: 0 },
  loginHint: { fontSize: 12, color: '#52525b', marginTop: 24 },
  // Loading
  loadingWrap: {
    minHeight: '100vh',
    background: '#0a0a0f',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, sans-serif',
  },
  loadingText: { color: '#71717a', marginTop: 16 },
  spinner: {
    width: 32,
    height: 32,
    border: '3px solid #27272a',
    borderTopColor: '#14F195',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};
