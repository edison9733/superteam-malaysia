// app/admin/testimonials/page.js
'use client';
import AdminTable from '@/components/admin/AdminTable';

const columns = [
  { key: 'author_name', label: 'Author', type: 'text', placeholder: 'e.g. Benjamin Tan' },
  { key: 'author_role', label: 'Role', type: 'text', placeholder: 'Community Lead' },
  { key: 'author_company', label: 'Company', type: 'text', placeholder: 'APU Hackthletes' },
  { key: 'author_twitter', label: 'Twitter Handle', type: 'text', placeholder: 'Without @ symbol' },
  { key: 'content', label: 'Quote / Testimonial', type: 'textarea', wide: true },
  { key: 'tweet_url', label: 'Tweet URL', type: 'text', hideInTable: true, placeholder: 'https://x.com/...' },
  { key: 'is_featured', label: 'Featured', type: 'boolean' },
  { key: 'display_order', label: 'Order', type: 'number', width: 70 },
  { key: 'is_visible', label: 'Visible', type: 'boolean' },
];

const defaults = { is_visible: true, is_featured: false, display_order: 99, rating: 5 };

export default function TestimonialsAdmin() {
  return (
    <AdminTable
      table="testimonials"
      columns={columns}
      defaults={defaults}
      title="Wall of Love"
      subtitle="Manage testimonials and tweet embeds. Use real tweet URLs for authenticity."
    />
  );
}
