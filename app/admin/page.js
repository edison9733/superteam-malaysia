'use client';

// app/admin/page.js — Admin Dashboard
// Protected by middleware.js (redirects to /admin/login if not authenticated)
// See components/admin/Dashboard.js for the full CMS implementation

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check auth session
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          router.push('/admin/login');
        }
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white/50 text-sm">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-[Outfit,sans-serif]">
      <div className="max-w-[1200px] mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold mb-1">Admin Dashboard</h1>
            <p className="text-sm text-white/40">
              Manage Superteam Malaysia content. All changes reflect on the live site within 60 seconds.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">{user?.email}</span>
            <a href="/" className="px-4 py-2 rounded-lg bg-white/5 text-sm text-white/60 no-underline hover:bg-white/10 transition-colors">
              View Site →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Events', path: '/api/admin/events', icon: '📅' },
            { label: 'Members', path: '/api/admin/members', icon: '👥' },
            { label: 'Partners', path: '/api/admin/partners', icon: '🤝' },
            { label: 'FAQ', path: '/api/admin/faqs', icon: '❓' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#9945FF]/30 transition-colors"
            >
              <span className="text-2xl mb-3 block">{item.icon}</span>
              <h3 className="text-lg font-bold mb-1">{item.label}</h3>
              <p className="text-xs text-white/35">Manage {item.label.toLowerCase()}</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h3 className="text-lg font-bold mb-2">Full CMS Dashboard</h3>
          <p className="text-sm text-white/40 mb-4">
            For the complete admin experience with all CRUD operations, use the interactive CMS dashboard provided as a React artifact (superteam-cms-admin.jsx).
            In production, this would be integrated as the /admin route.
          </p>
          <p className="text-xs text-white/25">
            API endpoints: GET/POST/PUT/DELETE /api/admin/[events|members|partners|testimonials|faqs|announcements|site_content]
          </p>
        </div>
      </div>
    </div>
  );
}
