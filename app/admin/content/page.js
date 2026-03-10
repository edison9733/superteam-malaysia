// app/admin/content/page.js
'use client';
import AdminTable from '@/components/admin/AdminTable';

const columns = [
  { key: 'section_key', label: 'Section Key', type: 'text', placeholder: 'hero, mission, join_cta' },
  { key: 'title', label: 'Title', type: 'text', placeholder: 'Section heading' },
  { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Section subheading' },
  { key: 'body', label: 'Body Content', type: 'textarea', wide: true, hideInTable: true },
  { key: 'cta_text', label: 'CTA Button Text', type: 'text', hideInTable: true, placeholder: 'Join Community' },
  { key: 'cta_url', label: 'CTA URL', type: 'text', hideInTable: true, placeholder: 'https://linktr.ee/SuperteamMY' },
  { key: 'image_url', label: 'Image URL', type: 'text', hideInTable: true },
];

const defaults = {};

export default function ContentAdmin() {
  return (
    <AdminTable
      table="site_content"
      columns={columns}
      defaults={defaults}
      title="Site Content"
      subtitle="Edit landing page sections: hero, mission, CTAs, and more."
    />
  );
}
