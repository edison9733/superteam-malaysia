// app/admin/announcements/page.js
'use client';
import AdminTable from '@/components/admin/AdminTable';

const columns = [
  { key: 'title', label: 'Title', type: 'text', placeholder: 'Announcement headline' },
  { key: 'content', label: 'Content', type: 'textarea', wide: true },
  { key: 'link_url', label: 'Link URL', type: 'text', hideInTable: true, placeholder: 'https://...' },
  { key: 'link_text', label: 'Link Text', type: 'text', hideInTable: true, placeholder: 'Learn More' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
  { key: 'starts_at', label: 'Starts At', type: 'date', hideInTable: true },
  { key: 'ends_at', label: 'Ends At', type: 'date', hideInTable: true },
];

const defaults = { is_active: true };

export default function AnnouncementsAdmin() {
  return (
    <AdminTable
      table="announcements"
      columns={columns}
      defaults={defaults}
      title="Announcements"
      subtitle="Create time-limited banners shown at the top of the website."
    />
  );
}
