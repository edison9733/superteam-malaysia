// app/admin/events/page.js
'use client';
import AdminTable from '@/components/admin/AdminTable';

const columns = [
  { key: 'title', label: 'Event Title', type: 'text', placeholder: 'e.g. CYPHERthon 2025' },
  { key: 'description', label: 'Description', type: 'textarea', wide: true, hideInTable: true },
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'venue', label: 'Venue', type: 'text', placeholder: 'e.g. APU, KL' },
  { key: 'luma_url', label: 'Luma URL', type: 'text', hideInTable: true, placeholder: 'https://lu.ma/...' },
  { key: 'image_url', label: 'Image URL', type: 'text', hideInTable: true },
  { key: 'event_type', label: 'Type', type: 'select', options: [
    { value: 'meetup', label: 'Meetup' },
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'bootcamp', label: 'Bootcamp' },
    { value: 'demo_day', label: 'Demo Day' },
    { value: 'networking', label: 'Networking' },
    { value: 'other', label: 'Other' },
  ]},
  { key: 'is_upcoming', label: 'Upcoming', type: 'boolean' },
  { key: 'attendee_count', label: 'Attendees', type: 'number' },
  { key: 'prize_pool', label: 'Prize Pool', type: 'text', hideInTable: true, placeholder: '$15,000' },
  { key: 'tags', label: 'Tags', type: 'tags', hideInTable: true },
  { key: 'is_featured', label: 'Featured', type: 'boolean' },
  { key: 'is_visible', label: 'Visible', type: 'boolean' },
];

const defaults = {
  is_visible: true,
  is_upcoming: true,
  is_featured: false,
  event_type: 'meetup',
  attendee_count: 0,
  luma_url: 'https://lu.ma/mysuperteam',
};

export default function EventsAdmin() {
  return (
    <AdminTable
      table="events"
      columns={columns}
      defaults={defaults}
      title="Events"
      subtitle="Manage events with Luma integration. Mark past events as not upcoming."
    />
  );
}
