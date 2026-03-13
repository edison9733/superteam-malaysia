// app/admin/stats/page.js
'use client';
import AdminTable from '@/components/admin/AdminTable';

const columns = [
  { key: 'stat_key', label: 'Key', type: 'text', placeholder: 'e.g. members, events' },
  { key: 'label', label: 'Display Label', type: 'text', placeholder: 'e.g. Community Members' },
  { key: 'value', label: 'Value', type: 'number' },
  { key: 'suffix', label: 'Suffix', type: 'text', width: 70, placeholder: '+' },
  { key: 'display_order', label: 'Order', type: 'number', width: 70 },
  { key: 'is_visible', label: 'Visible', type: 'boolean' },
];

const defaults = { is_visible: true, suffix: '+', display_order: 99, value: 0 };

export default function StatsAdmin() {
  return (
    <AdminTable
      table="stats"
      columns={columns}
      defaults={defaults}
      title="Stats"
      subtitle="Update community impact metrics shown on the landing page."
    />
  );
}
