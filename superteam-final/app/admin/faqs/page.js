// app/admin/faqs/page.js
'use client';
import AdminTable from '@/components/admin/AdminTable';

const columns = [
  { key: 'question', label: 'Question', type: 'text', placeholder: 'What is Superteam Malaysia?' },
  { key: 'answer', label: 'Answer', type: 'textarea', wide: true },
  { key: 'display_order', label: 'Order', type: 'number', width: 70 },
  { key: 'is_visible', label: 'Visible', type: 'boolean' },
];

const defaults = { is_visible: true, display_order: 99 };

export default function FaqsAdmin() {
  return (
    <AdminTable
      table="faqs"
      columns={columns}
      defaults={defaults}
      title="FAQs"
      subtitle="Manage frequently asked questions on the landing page."
    />
  );
}
