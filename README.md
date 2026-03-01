# ⚡ Superteam Malaysia — Official Website

> The digital HQ for Solana builders in Malaysia. Built with Next.js 14, Supabase CMS, and the Solana design language.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-CMS-3ECF8E?logo=supabase)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss)
![Solana](https://img.shields.io/badge/Solana-Ecosystem-9945FF)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  VISITOR                                                     │
│  Next.js SSG + ISR (60s revalidation)                       │
│  ┌──────────┬──────────┬───────────┬─────────────┐          │
│  │   Hero   │  Events  │  Members  │  Partners   │  ...     │
│  └──────────┴──────────┴───────────┴─────────────┘          │
│              ↓ lib/cms.js data fetchers                      │
├─────────────────────────────────────────────────────────────┤
│  ADMIN DASHBOARD                                             │
│  /admin (protected by Supabase Auth + middleware)            │
│  ┌──────────┬──────────┬───────────┬─────────────┐          │
│  │  Events  │ Members  │    FAQ    │ Site Content │  ...     │
│  └──────────┴──────────┴───────────┴─────────────┘          │
│              ↓ /api/admin/[table] CRUD routes                │
├─────────────────────────────────────────────────────────────┤
│  SUPABASE                                                    │
│  ┌──────────────┬──────────────┬──────────────────┐          │
│  │  PostgreSQL   │  Auth (RLS)  │  Storage (media) │          │
│  │  9 tables     │  Role-based  │  5MB limit       │          │
│  └──────────────┴──────────────┴──────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

**Key design decisions:**
- **ISR (60s)** — CMS changes go live within ~1 minute, zero manual deploys
- **Fallback data** — Site works out-of-the-box before Supabase is connected
- **RLS + API auth** — Database-level security, not just middleware
- **Generic CRUD API** — One route (`/api/admin/[table]`) handles all 7 tables

---

## 📋 Feature Checklist

### Landing Page (10 Sections)
| # | Section | Features |
|---|---------|----------|
| 1 | **Hero** | Gradient headline, animated orbs, Malaysian flag badge, dual CTA |
| 2 | **Mission** | 6 numbered pillars (01–06), ghost numbers, glass-card hover effects |
| 3 | **Stats** | Animated counters (scroll-triggered), 5 key metrics, CMS-editable |
| 4 | **Events** | Luma API integration, upcoming/past tabs, type badges, featured flag |
| 5 | **Members Spotlight** | Flip cards (front: profile, back: achievements), badge system |
| 6 | **Partners** | Dual marquee (forward + reverse), tier-based coloring |
| 7 | **Wall of Love** | Testimonials with Twitter links, masonry-style grid |
| 8 | **FAQ** | Animated accordion, smooth expand/collapse |
| 9 | **Join CTA** | Social links, newsletter signup, batik background pattern |
| 10 | **Footer** | 4-column layout, navigation, social links, global network |

### Dedicated Pages
- **`/members`** — Full directory with search + 11 skill filters
- **`/admin`** — Protected admin dashboard (Supabase Auth)
- **`/admin/login`** — Branded login page

### CMS (Supabase)
- **9 database tables** with Row Level Security
- **Site Content** table — key-value store for all editable text
- **Media uploads** to Supabase Storage (5MB, image validation)
- **On-demand revalidation** — instant updates via API
- **Generic CRUD** — GET/POST/PUT/DELETE for all tables

### Luma Integration
- Primary: Direct Luma API fetch with calendar mapping
- Fallback: Supabase `events` table for manual management
- All event cards link to Luma for RSVP

---

## 🎨 Design System

### Typography
| Role | Font | Usage |
|------|------|-------|
| Display | **Instrument Serif** (italic) | Section titles, hero text |
| Labels | **Space Mono** | Tags, badges, code-style |
| Body | **Outfit** | Paragraphs, buttons, navigation |

### Color Palette (Solana Brand Kit)
| Color | Hex | Usage |
|-------|-----|-------|
| Purple | `#9945FF` | Primary accent, CTAs |
| Green | `#14F195` | Success, active highlights |
| Cyan | `#03E1FF` | Links, secondary accent |
| Dark | `#08080e` | Background |
| Gold | `#FFD700` | Featured badges |

### Malaysian Cultural Elements
- **Batik pattern** — SVG geometric background in Hero & CTA
- **Malaysian flag** (🇲🇾) in hero badge
- **Multi-ethnic names** — Reflecting Malaysia's diversity
- **KL venue locations** — Real Malaysian venues

### Animation System
- Scroll-triggered fade-in via shared `useInView` hook
- Staggered grid item delays (0.08s per item)
- Animated counters on stats
- Floating gradient orbs (CSS keyframes)
- Dual-direction marquee on partners
- 3D card flip on member spotlight

---

## 🚀 Installation & Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)

### Setup

```bash
# 1. Clone & install
git clone https://github.com/your-repo/superteam-malaysia.git
cd superteam-malaysia
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Set up database (run in Supabase SQL Editor)
# → supabase/schema.sql

# 4. Create admin user
# After creating a user via Supabase Auth:
# UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id';

# 5. Run dev server
npm run dev
# → http://localhost:3000
```

> **Note:** Site works immediately without Supabase using fallback data.

---

## 📁 Project Structure

```
superteam-malaysia/
├── app/
│   ├── page.js                    # Landing page (ISR, 10 sections)
│   ├── layout.js                  # Root layout, SEO meta, fonts
│   ├── members/page.js            # Member directory
│   ├── admin/
│   │   ├── page.js                # Admin dashboard
│   │   └── login/page.js          # Admin login
│   └── api/
│       ├── admin/
│       │   ├── [table]/route.js   # Generic CRUD (all tables)
│       │   └── upload/route.js    # Media upload
│       ├── auth/
│       │   ├── login/route.js     # Email + password auth
│       │   └── session/route.js   # Session management
│       ├── events/route.js        # Luma API → Supabase fallback
│       └── revalidate/route.js    # On-demand ISR
├── components/                    # 11 section components
├── hooks/
│   ├── useInView.js               # Shared IntersectionObserver
│   └── useAdminCrud.js            # Admin CRUD operations
├── lib/
│   ├── supabase.js                # Client config (public + admin)
│   ├── cms.js                     # Data fetching layer
│   └── fallback-data.js           # Supabase-free sample data
├── styles/globals.css             # Tailwind + custom utilities
├── supabase/schema.sql            # Full schema + RLS + seed data
├── middleware.js                  # Admin route protection
├── tailwind.config.js             # Design tokens
└── next.config.js                 # Security headers
```

---

## 🗄️ Database Schema

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `profiles` | Admin/editor users | role, full_name |
| `events` | Community events | title, date, luma_url, status, type |
| `members` | Community members | name, skills[], achievements{}, badge |
| `partners` | Ecosystem partners | name, tier, logo_url, website |
| `testimonials` | Wall of Love | author, content, twitter |
| `faqs` | FAQ section | question, answer, display_order |
| `announcements` | Banner alerts | title, content, pinned |
| `site_content` | All editable text | key, value, section |
| `media` | Uploaded files | url, filename, mime_type |

**RLS:** Public SELECT on all tables. Admin/Editor INSERT/UPDATE/DELETE via `is_admin_or_editor()` helper function.

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/[table]` | Public | List items with pagination & filters |
| POST | `/api/admin/[table]` | Admin | Create item |
| PUT | `/api/admin/[table]` | Admin | Update item |
| DELETE | `/api/admin/[table]?id=xxx` | Admin | Delete item |
| POST | `/api/admin/upload` | Admin | Upload media (FormData, 5MB) |
| GET | `/api/events` | Public | Luma API → Supabase fallback |
| POST | `/api/auth/login` | Public | Admin login |
| GET | `/api/auth/session` | Public | Check session |
| POST | `/api/revalidate?secret=xxx` | Secret | Trigger ISR |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, SSG, ISR) |
| Styling | Tailwind CSS 3.4 + CSS custom properties |
| Animation | Framer Motion + CSS keyframes + IntersectionObserver |
| Database | Supabase PostgreSQL (RLS, Auth, Storage) |
| Events | Luma API integration |
| Icons | Lucide React |
| Deploy | Vercel (recommended) |

---

## 📤 Deployment

```bash
# Vercel (recommended)
npm i -g vercel && vercel
# Set env variables in Vercel dashboard
```

---

**Built with ⚡ for the Solana ecosystem in Malaysia 🇲🇾**
