// app/admin/page.js
'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCounts();
  }, []);

  async function loadCounts() {
    const tables = ['members', 'events', 'partners', 'testimonials', 'faqs', 'announcements'];
    const results = {};
    for (const table of tables) {
      try {
        const res = await fetch(`/api/admin/${table}`);
        if (res.ok) {
          const json = await res.json();
          results[table] = json.data?.length || 0;
        }
      } catch (e) {
        results[table] = '—';
      }
    }
    setCounts(results);
    setLoading(false);
  }

  const cards = [
    { key: 'members', label: 'Members', icon: '👥', color: '#14F195', href: '/admin/members' },
    { key: 'events', label: 'Events', icon: '📅', color: '#9945FF', href: '/admin/events' },
    { key: 'partners', label: 'Partners', icon: '🤝', color: '#00C2FF', href: '/admin/partners' },
    { key: 'testimonials', label: 'Testimonials', icon: '💬', color: '#FF6B6B', href: '/admin/testimonials' },
    { key: 'faqs', label: 'FAQs', icon: '❓', color: '#FFD93D', href: '/admin/faqs' },
    { key: 'announcements', label: 'Announcements', icon: '📢', color: '#FF8C42', href: '/admin/announcements' },
  ];

  return (
    <div>
      <h1 style={styles.pageTitle}>Dashboard</h1>
      <p style={styles.pageSubtitle}>Superteam Malaysia Content Management System</p>

      <div style={styles.grid}>
        {cards.map((card) => (
          <a key={card.key} href={card.href} style={styles.card}>
            <div style={{ ...styles.cardIcon, background: card.color + '15', color: card.color }}>
              {card.icon}
            </div>
            <div style={styles.cardInfo}>
              <span style={styles.cardCount}>
                {loading ? '...' : counts[card.key] ?? '—'}
              </span>
              <span style={styles.cardLabel}>{card.label}</span>
            </div>
          </a>
        ))}
      </div>

      <div style={styles.quickActions}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionGrid}>
          <a href="/admin/members" style={styles.actionBtn}>
            <span>➕</span> Add New Member
          </a>
          <a href="/admin/events" style={styles.actionBtn}>
            <span>📅</span> Create Event
          </a>
          <a href="/admin/content" style={styles.actionBtn}>
            <span>📝</span> Edit Hero Section
          </a>
          <a href="/admin/stats" style={styles.actionBtn}>
            <span>📈</span> Update Stats
          </a>
        </div>
      </div>

      <div style={styles.helpSection}>
        <h2 style={styles.sectionTitle}>CMS Guide</h2>
        <div style={styles.helpCard}>
          <h3 style={styles.helpTitle}>How to manage your website content</h3>
          <ol style={styles.helpList}>
            <li><strong>Members:</strong> Add/edit real Superteam MY members with their Twitter handles, skills, and achievements.</li>
            <li><strong>Events:</strong> Add upcoming events with Luma links. Mark past events as not upcoming.</li>
            <li><strong>Partners:</strong> Manage ecosystem partner logos organized by tier (Foundation, Ecosystem, Community, University).</li>
            <li><strong>Wall of Love:</strong> Add real tweet URLs and testimonials. These appear as social proof on the landing page.</li>
            <li><strong>Stats:</strong> Update community metrics (members, events hosted, bounties, etc.)</li>
            <li><strong>Site Content:</strong> Edit hero text, mission section, CTA buttons, and other landing page copy.</li>
            <li><strong>FAQs:</strong> Manage frequently asked questions shown on the landing page.</li>
            <li><strong>Announcements:</strong> Create time-limited banners that appear at the top of the site.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageTitle: { fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 },
  pageSubtitle: { fontSize: 14, color: '#71717a', marginTop: 8, marginBottom: 32 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 16,
  },
  card: {
    background: '#111118',
    border: '1px solid #1e1e2a',
    borderRadius: 12,
    padding: '24px 20px',
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    transition: 'border-color 0.15s',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    flexShrink: 0,
  },
  cardInfo: { display: 'flex', flexDirection: 'column' },
  cardCount: { fontSize: 24, fontWeight: 700, color: '#fff' },
  cardLabel: { fontSize: 13, color: '#71717a' },
  quickActions: { marginTop: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 16 },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 12,
  },
  actionBtn: {
    padding: '14px 20px',
    background: '#111118',
    border: '1px solid #1e1e2a',
    borderRadius: 10,
    color: '#e4e4e7',
    textDecoration: 'none',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    transition: 'border-color 0.15s',
  },
  helpSection: { marginTop: 40 },
  helpCard: {
    background: '#111118',
    border: '1px solid #1e1e2a',
    borderRadius: 12,
    padding: '24px',
  },
  helpTitle: { fontSize: 16, fontWeight: 600, color: '#fff', marginTop: 0 },
  helpList: { color: '#a1a1aa', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 },
};
