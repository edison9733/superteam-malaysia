// app/admin/content/page.js
'use client';
import AdminTable from '@/components/admin/AdminTable';

const columns = [
  { key: 'section_key', label: 'Section Key', type: 'text', placeholder: 'e.g. hero_title, hero_subtitle, join_title' },
  { key: 'title', label: 'Content Value', type: 'textarea', wide: true, placeholder: 'The content value for this key' },
  { key: 'subtitle', label: 'Notes', type: 'text', placeholder: 'Optional description of this content field' },
  { key: 'cta_text', label: 'CTA Button Text', type: 'text', hideInTable: true, placeholder: 'Join Community' },
  { key: 'cta_url', label: 'CTA URL', type: 'text', hideInTable: true, placeholder: 'https://linktr.ee/SuperteamMY' },
  { key: 'image_url', label: 'Image URL', type: 'text', hideInTable: true },
];

const defaults = {};

export default function ContentAdmin() {
  return (
    <div>
      <AdminTable
        table="site_content"
        columns={columns}
        defaults={defaults}
        title="Site Content"
        subtitle="Edit landing page sections: hero text, CTA copy, social links, and more. Each row is a key-value pair used by the website."
      />
      <div style={{ padding: '24px', marginTop: 16, background: '#111118', borderRadius: 12, border: '1px solid #1e1e2a' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginTop: 0 }}>Available Content Keys</h3>
        <p style={{ color: '#a1a1aa', fontSize: 13, lineHeight: 1.8 }}>
          <strong>hero_title</strong> — Main hero heading<br/>
          <strong>hero_subtitle</strong> — Hero subtext<br/>
          <strong>join_title</strong> — CTA section heading<br/>
          <strong>join_subtitle</strong> — CTA section subtext<br/>
          <strong>telegram_url</strong> — Community/Telegram link<br/>
          <strong>discord_url</strong> — Discord invite link<br/>
          <strong>twitter_url</strong> — Twitter/X profile link<br/>
          <strong>luma_url</strong> — Luma events page link<br/>
          <strong>stats_members</strong> — Community member count display<br/>
          <strong>stats_events</strong> — Events hosted count display<br/>
          <strong>stats_projects</strong> — Projects built count display<br/>
          <strong>stats_bounties</strong> — Bounties completed count display<br/>
          <strong>stats_reach</strong> — Community reach count display
        </p>
      </div>
    </div>
  );
}
