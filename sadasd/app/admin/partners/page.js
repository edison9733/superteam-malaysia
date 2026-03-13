// app/admin/partners/page.js
'use client';
import AdminTable from '@/components/admin/AdminTable';

const columns = [
  { key: 'name', label: 'Partner Name', type: 'text', placeholder: 'e.g. Jupiter' },
  { key: 'logo_url', label: 'Logo URL', type: 'text', placeholder: '/partners/jupiter.svg' },
  { key: 'website_url', label: 'Website', type: 'text', placeholder: 'https://jup.ag' },
  { key: 'tier', label: 'Tier', type: 'select', options: [
    { value: 'foundation', label: 'Foundation' },
    { value: 'ecosystem', label: 'Ecosystem' },
    { value: 'community', label: 'Community' },
    { value: 'university', label: 'University' },
  ]},
  { key: 'description', label: 'Description', type: 'text', hideInTable: true },
  { key: 'display_order', label: 'Order', type: 'number', width: 70 },
  { key: 'is_visible', label: 'Visible', type: 'boolean' },
];

const defaults = { is_visible: true, tier: 'ecosystem', display_order: 99 };

export default function PartnersAdmin() {
  return (
    <AdminTable
      table="partners"
      columns={columns}
      defaults={defaults}
      title="Partners"
      subtitle="Manage ecosystem partners organized by tier."
    />
  );
}
