# ⚡ Superteam Malaysia — Official Website

> The digital HQ for Solana builders in Malaysia. Built with Next.js 14, Supabase CMS, and the Solana design language.

🌐 **Live Site**: [superteam-malaysia-yzu5.vercel.app](https://superteam-malaysia-yzu5.vercel.app)
🔧 **Admin CMS**: [superteam-malaysia-yzu5.vercel.app/admin](https://superteam-malaysia-yzu5.vercel.app/admin)

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-CMS-3ECF8E?logo=supabase)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss)
![Solana](https://img.shields.io/badge/Solana-Ecosystem-9945FF)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  VISITOR (Public)                                            │
│  Next.js SSG + ISR (60s revalidation)                       │
│  ┌──────────┬──────────┬───────────┬─────────────┐          │
│  │   Hero   │  Events  │  Members  │  Partners   │  ...     │
│  └──────────┴──────────┴───────────┴─────────────┘          │
│              ↓ lib/cms.js data fetchers                      │
├─────────────────────────────────────────────────────────────┤
│  ADMIN DASHBOARD (/admin)                                    │
│  Protected by Supabase Auth + middleware                     │
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

### Landing Page (15 Sections)
| # | Section | Features |
|---|---------|----------|
| 1 | **NavBar** | Fixed, glass blur on scroll, full-screen overlay menu, SUPERTEAM MY logo |
| 2 | **Hero** | Typing cursor animation on "in Malaysia", gradient heading, dual CTAs with bounce |
| 3 | **Photo Marquee** | Dual-row auto-scroll (forward + reverse), pause on hover, edge fade masks |
| 4 | **Stats** | 5 animated counters (scroll-triggered), colored border glow, CMS-editable |
| 5 | **Events** | 2x2 grid, Luma API integration, type badges (Hackathon/Call/Party), location pins |
| 6 | **We Deliver Results** | 3-card grid, play button overlay, stat badges, 4:3 poster images |
| 7 | **Members Spotlight** | Horizontal auto-scroll marquee, badges (Core/Builder/Winner), skill tags, Twitter links |
| 8 | **We Help You Cook** | 2x2 perk grid (Builders/Creators/Founders/Everyone), accent-colored tag pills |
| 9 | **Partners Marquee** | Dual-row scrolling logos (15 partners), scale(1.15) hover, brightness filter |
| 10 | **How to Become a Member** | 4 numbered steps (colored 01-04), CTA button |
| 11 | **Wall of Love** | Bento grid (8+4, 4+8), glass-effect tweet cards, UAE-style static cards |
| 12 | **Latest by Superteam MY** | Bento grid (8+4, 12), tweet-style cards |
| 13 | **FAQ** | Animated accordion, + rotating to x on open, smooth expand/collapse |
| 14 | **Join CTA** | Gradient border card, social buttons, email subscribe |
| 15 | **Footer** | 4-column grid, giant "SUPERTEAM" stroke text at bottom |

### Dedicated Pages
- **`/members`** — Full directory with search + skill-based filter pills (All, Core Team, Rust, Frontend, Design, Content, Growth, Product, Community)
- **`/admin`** — Protected admin dashboard with sidebar navigation
- **`/admin/[section]`** — CRUD pages for Members, Events, Partners, Testimonials, Stats, FAQs, Site Content, Announcements

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

### Typography (Inter — all weights)
| Role | Weight | Size | Line-Height | Letter-Spacing |
|------|--------|------|-------------|----------------|
| Hero Heading | 800 | clamp(36px-88px) | 1.08 | — |
| Section Heading | 800 | clamp(28px-56px) | 1.15 | — |
| Body | 400 | 15-16px | 1.6-1.7 | — |
| Label/Tag | 600-700 | 11-13px | — | 0.12-0.15em |
| Card Title | 700 | 17-20px | — | — |
| Card Body | 400 | 13-14px | 1.6 | — |

### Color Palette (Solana Brand Kit)
| Token | Value | Usage |
|-------|-------|-------|
| `bg/primary` | `#08080e` | Page background |
| `bg/card` | `rgba(255,255,255,0.02)` | Card surfaces |
| `bg/card-hover` | `rgba(255,255,255,0.04)` | Card hover state |
| `bg/glass` | `rgba(18,18,18,0.80)` + blur(12px) | Tweet cards, overlays |
| `accent/green` | `#14F195` | Primary CTAs, highlights |
| `accent/purple` | `#9945FF` | Secondary accent |
| `accent/cyan` | `#03E1FF` | Tertiary, links |
| `accent/yellow` | `#EAB308` | Badges, step 04 |
| `accent/orange` | `#F97316` | Stats |
| `accent/pink` | `#EC4899` | Stats, events |
| `accent/red` | `#FF6B6B` | Admin alerts |
| `text/primary` | `rgba(255,255,255,0.85)` | Headings, active text |
| `text/secondary` | `rgba(255,255,255,0.45)` | Body text, descriptions |
| `text/dimmed` | `rgba(255,255,255,0.35)` | Ghost text, inactive |
| `border/default` | `rgba(255,255,255,0.06)` | Card borders |
| `border/hover` | `rgba(20,241,149,0.3)` | Hover state borders |

### Spacing
| Token | Value |
|-------|-------|
| Section vertical padding | 100px |
| Section horizontal padding | 24px |
| Max content width | 1200px centered |
| Card border-radius | 20-24px |
| Button border-radius | 50px (pill) |
| Card gap | 16-20px |

### Animation System
| Animation | Trigger | Details |
|-----------|---------|---------|
| Typing cursor | Page load | Blinks on "in Malaysia" text, character-by-character |
| Stat counters | Scroll into view | Count up from 0 to target number |
| CTA bounce | Continuous 2.5s | macOS dock-style up-down, stops on hover |
| Card lift | Hover | translateY(-4px), border color shifts to accent |
| Marquee scroll | Continuous | Row 1 left, Row 2 right (reverse), pause on hover |
| FAQ accordion | Click | Smooth expand/collapse, + rotates to x |
| Partner logos | Hover | scale(1.15), opacity 0.9 to 1.0 |
| Tweet cards | Hover | scale(1.02), white glow shadow |
| Nav glass | Scroll | Transparent to rgba(8,8,14,0.92) + blur(20px) |

### Malaysian Cultural Elements
- Malaysian flag emoji in hero badge
- Malaysian slang — "geng", "pakat", "confirm solid la" in copy
- Multi-ethnic member names reflecting Malaysia's diversity
- Real Malaysian venues (Network School, Forest City Johor, AWS Office KL)

---

## 🚀 Installation & Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)

### Setup

```bash
# 1. Clone and install
git clone https://github.com/edison9733/superteam-malaysia.git
cd superteam-malaysia
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Set up database (run in Supabase SQL Editor)
# Copy and paste contents of supabase/schema.sql

# 4. Create admin user
# After creating a user via Supabase Auth:
# UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id';

# 5. Run dev server
npm run dev
# Open http://localhost:3000
```

> **Note:** Site works immediately without Supabase using fallback data in `lib/fallback-data.js`.

---

## 🔑 Environment Variables

```env
# Supabase (required for CMS)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Auth
ADMIN_PASSWORD=your-admin-password

# ISR Revalidation
REVALIDATION_SECRET=your-secret-token

# Luma API (optional — falls back to Supabase events table)
LUMA_API_KEY=your-luma-key
LUMA_CALENDAR_ID=your-calendar-id
```

---

## 📁 Project Structure

```
superteam-malaysia/
├── app/
│   ├── page.js                    # Landing page (ISR, 15 sections)
│   ├── layout.js                  # Root layout, SEO meta, Inter font
│   ├── members/page.js            # Member directory with filters
│   ├── admin/
│   │   ├── page.js                # Admin dashboard home
│   │   ├── layout.js              # Admin sidebar layout
│   │   ├── members/page.js        # Members CRUD
│   │   ├── events/page.js         # Events CRUD
│   │   ├── partners/page.js       # Partners CRUD
│   │   ├── testimonials/page.js   # Wall of Love CRUD
│   │   ├── stats/page.js          # Stats CRUD
│   │   ├── faqs/page.js           # FAQ CRUD
│   │   ├── content/page.js        # Site Content CRUD
│   │   └── announcements/page.js  # Announcements CRUD
│   └── api/
│       ├── admin/
│       │   ├── [table]/route.js   # Generic CRUD (all tables)
│       │   ├── [table]/[id]/      # Single item operations
│       │   ├── login/route.js     # Admin login
│       │   └── upload/route.js    # Media upload
│       ├── auth/
│       │   ├── login/route.js     # Email + password auth
│       │   └── session/route.js   # Session check
│       ├── events/route.js        # Luma API with Supabase fallback
│       └── revalidate/route.js    # On-demand ISR
├── components/                    # 19 section + utility components
├── hooks/                         # useInView, useScrollSpy, useAdminCrud
├── lib/                           # supabase, cms, fallback-data, admin-auth
├── public/
│   ├── logo.png                   # Superteam MY logo
│   ├── sp_background.jpg          # Hero background image
│   ├── events/                    # 10 event images
│   ├── gallery/                   # 8 photo marquee images
│   ├── members/                   # Member profile photos
│   ├── partners/                  # 15 partner logos (SVG + PNG)
│   ├── perks/                     # 4 perk card images
│   ├── results/                   # 3 results section images
│   ├── wall/                      # 8 testimonial images
│   └── figma-assets/              # 60 SVGs for Figma import
│       ├── icons/                 # 13 UI icons
│       ├── social/                # 6 social media icons
│       ├── badges/                # 6 badge components
│       ├── components/            # 21 component templates
│       └── decorative/            # 11 decorative elements
├── styles/globals.css             # Tailwind + custom animations
├── supabase/schema.sql            # Full schema + RLS + seed data
├── middleware.js                  # Admin route protection
├── tailwind.config.js             # Design tokens
├── next.config.js                 # Security headers
├── CMS-SETUP-GUIDE.md            # Detailed CMS setup instructions
├── FIGMA-IMPORT-GUIDE.md         # How to import SVGs into Figma
└── FIGMA-PROMPT-2.md             # Complete Figma AI design prompt
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
| GET | `/api/admin/[table]` | Public | List items with pagination and filters |
| POST | `/api/admin/[table]` | Admin | Create item |
| PUT | `/api/admin/[table]` | Admin | Update item |
| DELETE | `/api/admin/[table]?id=xxx` | Admin | Delete item |
| POST | `/api/admin/upload` | Admin | Upload media (FormData, 5MB) |
| GET | `/api/events` | Public | Luma API with Supabase fallback |
| POST | `/api/auth/login` | Public | Admin login |
| GET | `/api/auth/session` | Public | Check session |
| POST | `/api/revalidate?secret=xxx` | Secret | Trigger ISR |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, SSG, ISR) |
| Styling | Tailwind CSS 3.4 + CSS custom properties |
| Animation | CSS keyframes + IntersectionObserver |
| Database | Supabase PostgreSQL (RLS, Auth, Storage) |
| Events | Luma API integration |
| Icons | Lucide React |
| Deploy | Vercel |

---

## 🎭 Figma Assets

The `/public/figma-assets/` directory contains **60 SVG files** for direct Figma import:

| Folder | Count | Contents |
|--------|-------|----------|
| `icons/` | 13 | Menu, close, location pin, play, arrows, search, filter, trophy, mail, plus/minus |
| `social/` | 6 | Twitter/X, Telegram, Discord, GitHub, Luma, Linktree |
| `badges/` | 6 | Core Contributor, Solana Builder, Hackathon Winner, event type badges |
| `components/` | 21 | NavBar (2 states), buttons (4 states), card skeletons, admin UI, color tokens, typography, spacing |
| `decorative/` | 11 | Typing cursor, gradient orbs, marquee fade mask, gradient border, step numbers, footer text |

See **FIGMA-IMPORT-GUIDE.md** for detailed import and prototyping instructions.

---

## 📤 Deployment

```bash
# Vercel (recommended)
npm i -g vercel && vercel

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# SUPABASE_SERVICE_ROLE_KEY
# ADMIN_PASSWORD
# REVALIDATION_SECRET
```

---

## 🤝 Partners (15 Ecosystem Projects)

Solana Foundation, Jupiter, Wormhole, Helius, Sanctum, Magic Eden, Phantom, Backpack, Jito, Orca, Tensor, Pyth Network, Raydium, Marinade Finance, CUDIS

---

## 📞 Contact

- **Twitter/X**: [@SuperteamMY](https://x.com/SuperteamMY)
- **Telegram**: [t.me/SuperteamMY](https://t.me/SuperteamMY)
- **Linktree**: [linktr.ee/SuperteamMY](https://linktr.ee/SuperteamMY)

---

**Built with ⚡ for the Solana ecosystem in Malaysia 🇲🇾**
