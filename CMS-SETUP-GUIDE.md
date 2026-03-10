# Superteam Malaysia CMS — Complete Setup Guide

## Overview

This CMS gives Superteam Malaysia admins the ability to manage all website content without touching code. Built with **Supabase** (PostgreSQL backend) and a custom **Next.js admin dashboard**.

### What admins can manage:
- **Members** — Add/edit/delete member profiles, skills, badges, achievements
- **Events** — Create events with Luma links, mark upcoming/past, set prize pools
- **Partners** — Manage ecosystem partner logos by tier (Foundation/Ecosystem/Community/University)
- **Wall of Love** — Real testimonials with tweet URLs for social proof
- **Stats** — Update community impact numbers (members, events, bounties, etc.)
- **Site Content** — Edit hero text, mission section, CTAs, and landing page copy
- **FAQs** — Manage expandable Q&A section
- **Announcements** — Time-limited banners at the top of the site

### Role-Based Access:
- **Admin** — Full access to all content management features
- **Editor** — Can add and edit content (extensible via `admin_users` table)

---

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** → Sign in with GitHub
3. Click **"New Project"**
4. Fill in:
   - **Project name:** `superteam-malaysia`
   - **Database password:** (save this somewhere safe!)
   - **Region:** Southeast Asia (Singapore) — `ap-southeast-1`
5. Click **"Create new project"** → Wait ~2 minutes for setup

---

## Step 2: Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open the file `supabase/001_initial_schema.sql` from this package
4. **Copy the ENTIRE contents** and paste into the SQL Editor
5. Click **"Run"** (or press Ctrl+Enter)
6. You should see: `Success. No rows returned` — this is correct!

**What this creates:**
- 9 database tables (members, events, partners, testimonials, site_content, stats, faqs, announcements, admin_users)
- Row Level Security (RLS) policies for public read access
- Auto-updating `updated_at` timestamps
- Seed data with real verified Superteam Malaysia members, events, partners, and testimonials

---

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these three values:

| Key | Where to find it | What it does |
|-----|-------------------|-------------|
| **Project URL** | Under "Project URL" | Public endpoint for your database |
| **anon / public key** | Under "Project API keys" | Used by the website frontend (respects RLS) |
| **service_role key** | Under "Project API keys" (click "Reveal") | Used by admin API routes (bypasses RLS) |

**⚠️ NEVER expose the service_role key in frontend code or commit it to GitHub!**

---

## Step 4: Configure Environment Variables

### For Local Development:

1. In your project root, create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key
ADMIN_PASSWORD=your-secure-password-here
ADMIN_SESSION_SECRET=any-random-string-here
```

2. Replace the values with your actual Supabase keys from Step 3.

### For Vercel Deployment:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add each variable above (all 5)
3. Click **Save** → **Redeploy**

---

## Step 5: Install the Supabase Client

In your project directory, run:

```bash
npm install @supabase/supabase-js
```

---

## Step 6: Add the CMS Files to Your Project

Copy these files from the CMS package into your existing Next.js project:

```
YOUR PROJECT/
├── lib/
│   ├── supabase.js          ← Supabase client + data fetchers
│   └── admin-auth.js        ← Admin authentication
├── components/
│   └── admin/
│       └── AdminTable.js    ← Reusable CRUD table component
├── app/
│   ├── admin/
│   │   ├── layout.js        ← Admin sidebar + login gate
│   │   ├── page.js          ← Dashboard overview
│   │   ├── members/page.js  ← Members management
│   │   ├── events/page.js   ← Events management
│   │   ├── partners/page.js ← Partners management
│   │   ├── testimonials/page.js ← Wall of Love
│   │   ├── stats/page.js    ← Stats management
│   │   ├── faqs/page.js     ← FAQ management
│   │   ├── content/page.js  ← Site content editor
│   │   └── announcements/page.js ← Announcements
│   └── api/
│       └── admin/
│           ├── login/route.js        ← Login endpoint
│           ├── [table]/route.js      ← List + Create
│           └── [table]/[id]/route.js ← Get + Update + Delete
└── .env.local               ← Your environment variables
```

---

## Step 7: Using the Admin Dashboard

### How to Log In:

1. Navigate to `https://your-site.vercel.app/admin`
2. Enter the password you set in `ADMIN_PASSWORD`
3. You're in! The session lasts 7 days.

### How to Add a New Member:

1. Go to **Members** in the sidebar
2. Click **"+ Add New"**
3. Fill in the fields:
   - **Name:** Full real name (e.g. "Henry Lee Min Rong")
   - **Role:** Their role (e.g. "Country Lead & Founder")
   - **Company:** Affiliation (e.g. "Superteam Malaysia / Kite")
   - **Twitter Handle:** Without @ (e.g. "Henryleemr")
   - **Skills:** Comma-separated (e.g. "Rust, ML, Leadership")
   - **Badges:** Comma-separated (e.g. "Core Contributor, Country Lead")
   - **Core Team / Featured / Visible:** Toggle as needed
4. Click **"Create"**

### How to Edit Content:

1. Go to **Site Content** in the sidebar
2. Find the section you want to edit (e.g. "hero")
3. Click **"Edit"**
4. Modify the title, subtitle, CTA text, etc.
5. Click **"Save Changes"**

### How to Add an Event:

1. Go to **Events** in the sidebar
2. Click **"+ Add New"**
3. Fill in title, date, venue, Luma URL
4. Set **"Upcoming"** to Yes for future events
5. Click **"Create"**

---

## Step 8: Connect Your Frontend Components to Supabase

Replace hardcoded data in your components with Supabase queries. Example for the Members section:

```jsx
// In any component or page.js
import { getMembers, getFeaturedMembers } from '@/lib/supabase';

// In a Server Component:
export default async function MembersSpotlight() {
  const members = await getFeaturedMembers();
  // ... render members
}

// In a Client Component:
'use client';
import { useEffect, useState } from 'react';
import { getFeaturedMembers } from '@/lib/supabase';

export default function MembersSpotlight() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    getFeaturedMembers().then(setMembers);
  }, []);
  // ... render members
}
```

### Available Data Fetchers:

| Function | Returns |
|----------|---------|
| `getMembers()` | All visible members |
| `getFeaturedMembers()` | Featured members only |
| `getCoreTeam()` | Core team members only |
| `getEvents()` | All visible events (newest first) |
| `getUpcomingEvents()` | Upcoming events only |
| `getPartners()` | All visible partners |
| `getTestimonials()` | All visible testimonials |
| `getStats()` | Community stats |
| `getFaqs()` | FAQ items |
| `getSiteContent('hero')` | Specific section content |
| `getAllSiteContent()` | All site content sections |
| `getActiveAnnouncements()` | Currently active announcements |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL (Next.js)                      │
│                                                         │
│  ┌──────────────┐    ┌──────────────────┐               │
│  │  PUBLIC SITE  │    │  ADMIN DASHBOARD  │               │
│  │  (SSR/SSG)   │    │  /admin/*         │               │
│  │              │    │                  │               │
│  │  - Hero      │    │  - Login         │               │
│  │  - Members   │    │  - Members CRUD  │               │
│  │  - Events    │    │  - Events CRUD   │               │
│  │  - Partners  │    │  - Partners CRUD │               │
│  │  - Wall/Love │    │  - Content Edit  │               │
│  │  - Stats     │    │  - Stats Edit    │               │
│  │  - FAQ       │    │  - FAQ CRUD      │               │
│  └──────┬───────┘    └────────┬─────────┘               │
│         │                     │                          │
│         │  anon key           │  service_role key        │
│         │  (RLS enforced)     │  (RLS bypassed)          │
│         └─────────┬───────────┘                          │
│                   │                                      │
│           ┌───────▼────────┐                             │
│           │  API Routes    │                             │
│           │  /api/admin/*  │                             │
│           └───────┬────────┘                             │
└───────────────────┼──────────────────────────────────────┘
                    │
          ┌─────────▼──────────┐
          │    SUPABASE        │
          │                    │
          │  ┌──────────────┐  │
          │  │  PostgreSQL   │  │
          │  │              │  │
          │  │  members     │  │
          │  │  events      │  │
          │  │  partners    │  │
          │  │  testimonials│  │
          │  │  site_content│  │
          │  │  stats       │  │
          │  │  faqs        │  │
          │  │  announce..  │  │
          │  │  admin_users │  │
          │  └──────────────┘  │
          │                    │
          │  Row Level Security│
          │  (Public: read)    │
          │  (Admin: full)     │
          └────────────────────┘
```

---

## Security Notes

- The **anon key** is safe to expose in the browser — RLS policies restrict it to read-only on visible items.
- The **service_role key** must NEVER be in client-side code. It's only used in `/api/admin/*` routes (server-side).
- Admin authentication uses a password stored in `ADMIN_PASSWORD` env var with httpOnly session cookies.
- For production, change `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` to strong random strings.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Unauthorized" on admin pages | Check that `ADMIN_PASSWORD` env var matches what you're entering |
| Empty tables after running SQL | Run the schema SQL again; check for errors in Supabase SQL Editor |
| Members not showing on site | Ensure `is_visible = true` in the admin panel |
| API returns 500 errors | Check `SUPABASE_SERVICE_ROLE_KEY` is set correctly in Vercel env vars |
| Vercel deployment fails | Make sure `@supabase/supabase-js` is in your `package.json` dependencies |
