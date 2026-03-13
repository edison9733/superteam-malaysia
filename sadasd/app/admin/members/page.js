// app/admin/members/page.js
'use client';
import AdminTable from '@/components/admin/AdminTable';

const columns = [
  { key: 'name', label: 'Name', type: 'text', placeholder: 'Full name' },
  { key: 'role', label: 'Role', type: 'text', placeholder: 'e.g. Country Lead, Guild Lead' },
  { key: 'company', label: 'Company', type: 'text', placeholder: 'e.g. Superteam Malaysia' },
  { key: 'bio', label: 'Bio', type: 'textarea', wide: true, hideInTable: true, placeholder: 'Short bio about this member...' },
  { key: 'twitter_handle', label: 'Twitter/X Handle', type: 'text', placeholder: 'Without @ (e.g. Henryleemr)' },
  { key: 'linkedin_url', label: 'LinkedIn URL', type: 'text', hideInTable: true, placeholder: 'https://linkedin.com/in/...' },
  { key: 'photo_url', label: 'Photo URL', type: 'text', hideInTable: true, placeholder: '/members/handle.jpg or full URL' },
  { key: 'skills', label: 'Skills', type: 'tags', placeholder: 'Rust, Frontend, Design, Content, Growth' },
  { key: 'badges', label: 'Badges', type: 'tags', hideInTable: true, placeholder: 'Core Contributor, Hackathon Winner, Guild Lead' },
  { key: 'hackathon_wins', label: 'Hackathon Wins', type: 'number', hideInTable: true },
  { key: 'projects_built', label: 'Projects Built', type: 'number', hideInTable: true },
  { key: 'bounties_completed', label: 'Bounties', type: 'number', hideInTable: true },
  { key: 'is_core_team', label: 'Core Team', type: 'boolean' },
  { key: 'is_featured', label: 'Featured', type: 'boolean' },
  { key: 'is_visible', label: 'Visible', type: 'boolean' },
  { key: 'display_order', label: 'Order', type: 'number', width: 70 },
];

const defaults = {
  is_visible: true,
  is_core_team: false,
  is_featured: false,
  display_order: 99,
  hackathon_wins: 0,
  projects_built: 0,
  bounties_completed: 0,
};

export default function MembersAdmin() {
  return (
    <AdminTable
      table="members"
      columns={columns}
      defaults={defaults}
      title="Members"
      subtitle="Manage Superteam Malaysia member profiles. All members must be real, verified people."
    />
  );
}
