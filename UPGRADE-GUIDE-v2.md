# Superteam Malaysia — Upgrade Guide v2

## ✅ What's Done
- [x] NavBar with fullscreen MENU overlay + vertical side text
- [x] Hero with globe BG + Malaysian skyline SVG + motto
- [x] PhotoMarquee auto-scrolling (2 rows)
- [x] Stats animated counters
- [x] Events section with card list
- [x] DeliverResults (hover = video, click = opens Twitter/X link)
- [x] MembersSpotlight with flip cards + profile photo support
- [x] MemberPerks section
- [x] Partners dual-marquee
- [x] HowToJoin 4-step section
- [x] WallOfLove testimonials
- [x] LatestSection with Twitter timeline + quote
- [x] FAQ accordion
- [x] JoinCta with email signup
- [x] Footer with giant clipped SUPERTEAM text
- [x] Dot pattern background
- [x] Luma calendar embed (FIXED — now uses direct lu.ma URL)
- [x] Video cards link to original Twitter source on click

---

## 🔲 What YOU Still Need To Do

### 1. Upload Activity Photos (Photo Marquee)

All your photos are in your Mac Downloads folder. Run this:

```bash
cd ~/Desktop/superteam-malaysia-final-2

# Copy ALL jpg/png photos from Downloads to the gallery folder
cp ~/Downloads/*.jpg public/gallery/ 2>/dev/null
cp ~/Downloads/*.png public/gallery/ 2>/dev/null
cp ~/Downloads/*.jpeg public/gallery/ 2>/dev/null

# Or copy SPECIFIC photos:
cp ~/Downloads/photo-name-1.jpg public/gallery/event-1.jpg
cp ~/Downloads/photo-name-2.jpg public/gallery/event-2.jpg
cp ~/Downloads/photo-name-3.jpg public/gallery/event-3.jpg
cp ~/Downloads/photo-name-4.jpg public/gallery/event-4.jpg
cp ~/Downloads/photo-name-5.jpg public/gallery/event-5.jpg
cp ~/Downloads/photo-name-6.jpg public/gallery/event-6.jpg
cp ~/Downloads/photo-name-7.jpg public/gallery/event-7.jpg
cp ~/Downloads/photo-name-8.jpg public/gallery/event-8.jpg
```

**The filenames MUST match** what's in `components/PhotoMarquee.js`:
- `event-1.jpg`, `event-2.jpg`, `event-3.jpg`, ... `event-8.jpg`

**To add MORE photos**, edit `components/PhotoMarquee.js` and add entries:
```js
const GALLERY_IMAGES = [
  { src: '/gallery/event-1.jpg', alt: 'Solana Hacker House KL' },
  { src: '/gallery/event-2.jpg', alt: 'Web3 Builder Meetup' },
  // ... add more here:
  { src: '/gallery/event-9.jpg', alt: 'Your New Event' },
];
```

**Recommended photo size:** 680×440px. To resize on Mac:
```bash
# Install ImageMagick (one time)
brew install imagemagick

# Resize all gallery images
for f in public/gallery/*.jpg; do
  convert "$f" -resize 680x440^ -gravity center -extent 680x440 "$f"
done
```

---

### 2. Member Profile Photos + Twitter Handles

Here are all the members from your current data and their Twitter/X handles:

| # | Name | Twitter/X Handle | Photo Filename |
|---|------|-----------------|----------------|
| 1 | Ahmad Rizal | @ahmadrizal | `ahmadrizal.jpg` |
| 2 | Siti Nurhaliza W. | @sitindesign | `sitindesign.jpg` |
| 3 | James Tan | @jamestan_sol | `jamestan_sol.jpg` |
| 4 | Priya Sharma | @priyasol | `priyasol.jpg` |
| 5 | Wei Lin | @weilin_sol | `weilin_sol.jpg` |
| 6 | Amir Hassan | @amirdev | `amirdev.jpg` |
| 7 | Nurul Ain | @nurulain_web3 | `nurulain_web3.jpg` |
| 8 | Raj Patel | @rajpatel_data | `rajpatel_data.jpg` |
| 9 | Farah Izzati | @farahux | `farahux.jpg` |
| 10 | Daniel Lim | @daniellim_ops | `daniellim_ops.jpg` |
| 11 | Aisyah Rahman | @aisyah_web3 | `aisyah_web3.jpg` |
| 12 | Kevin Ng | @kevinng_phd | `kevinng_phd.jpg` |

**How to get each photo:**
1. Go to `https://x.com/[handle]` (e.g., `https://x.com/ahmadrizal`)
2. Right-click their profile photo → "Save Image As"
3. Save as `[handle].jpg` (e.g., `ahmadrizal.jpg`)
4. Move to the project:

```bash
# Copy all member photos from Downloads
cp ~/Downloads/ahmadrizal.jpg public/members/
cp ~/Downloads/sitindesign.jpg public/members/
cp ~/Downloads/jamestan_sol.jpg public/members/
cp ~/Downloads/priyasol.jpg public/members/
cp ~/Downloads/weilin_sol.jpg public/members/
cp ~/Downloads/amirdev.jpg public/members/
cp ~/Downloads/nurulain_web3.jpg public/members/
cp ~/Downloads/rajpatel_data.jpg public/members/
cp ~/Downloads/farahux.jpg public/members/
cp ~/Downloads/daniellim_ops.jpg public/members/
cp ~/Downloads/aisyah_web3.jpg public/members/
cp ~/Downloads/kevinng_phd.jpg public/members/
```

**Resize all member photos to 200×200px:**
```bash
for f in public/members/*.jpg; do
  convert "$f" -resize 200x200^ -gravity center -extent 200x200 "$f"
done
```

**If no photo exists for a member**, the card will show their first initial (A, S, J, etc.) — so missing photos are fine!

---

### 3. Video on Hover → Click Links to Twitter

The "We Deliver Results" cards now work like this:
- **Hover** → video plays (muted, looping)
- **Click** → opens the original Twitter/X post

**To set up videos:**
1. Record or download short clips (5-15 seconds, MP4)
2. Place them in `public/videos/`:
```bash
cp ~/Downloads/hackathon-clip.mp4 public/videos/hackathon.mp4
cp ~/Downloads/events-clip.mp4 public/videos/events.mp4
cp ~/Downloads/builders-clip.mp4 public/videos/builders.mp4
```

**To change the Twitter/X links**, edit `components/DeliverResults.js`:
```js
const RESULTS = [
  {
    title: 'Hackathon Highlights',
    stat: '10+ Hackathons',
    desc: 'World-class hackathons bringing the best Solana builders together.',
    video: '/videos/hackathon.mp4',
    poster: '/gallery/event-1.jpg',
    link: 'https://x.com/SuperteamMY/status/2017135281745322427',  // ← CHANGE THIS
    gradient: 'linear-gradient(135deg, #9945FF33, #14F19522)',
  },
  // ... edit the other cards the same way
];
```

**Note:** Even without videos, the cards work fine — they'll show the poster image and still link to Twitter on click.

---

### 4. Luma Calendar (FIXED)

The Luma embed is now fixed. It embeds `https://lu.ma/mysuperteam` directly as an iframe, which shows all your upcoming events with the calendar, tags, and RSVP buttons.

**If you need to change the Luma URL:**
- Edit `lib/fallback-data.js` → change `luma_url: 'https://lu.ma/mysuperteam'`
- Or update it in your Supabase `site_content` table

---

### 5. Twitter/X Timeline Embed (Latest Section)

The LatestSection embeds your `@SuperteamMY` Twitter timeline automatically. It uses Twitter's official widget script.

**If it doesn't load:** Twitter embeds require the visitor's browser to not be blocking third-party scripts. This is normal behavior.

**To embed specific tweets instead:**
Edit `components/LatestSection.js` and replace the timeline `<a>` tag with individual tweet embeds using tweet IDs from your posts.

---

### 6. Admin Panel — Edit Without Touching Code

Your project already has a full admin panel at `/admin`. Here's how it works:

**Option A: Use the Built-In Admin (needs Supabase)**
1. Set up Supabase (free tier) — see `supabase/schema.sql` for the database schema
2. Add env variables to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
ADMIN_PASSWORD=your-admin-password
```
3. Run `npm run dev` → go to `localhost:3000/admin`
4. You can add/edit/delete: events, members, partners, testimonials, FAQs, and site content

**Option B: Edit Fallback Data (no Supabase needed)**
For quick edits without a database, just edit `lib/fallback-data.js`:

**Add a new member:**
```js
{
  id: '13',
  name: 'New Person',
  role: 'Developer',
  company: 'Company',
  skills: ['Rust', 'Frontend'],
  twitter: 'their_handle',
  badge: 'Solana Builder',
  bio: 'Short bio here.',
  achievements: { hackathon_wins: 0, projects_built: 1, grants_received: 0, bounties_completed: 3 },
  featured: true,
},
```

**Add a new event:**
```js
{
  id: '6',
  title: 'New Event Name',
  date: '2026-04-15',
  time: '19:00',
  location: 'Venue, KL',
  type: 'meetup',
  status: 'upcoming',
  description: 'Event description here.',
  luma_url: 'https://lu.ma/your-event-slug',
  featured: false,
},
```

**Add/remove photo marquee images:** Edit `components/PhotoMarquee.js` → `GALLERY_IMAGES` array
**Add/remove result cards:** Edit `components/DeliverResults.js` → `RESULTS` array
**Add/remove perks:** Edit `components/MemberPerks.js` → `PERKS` array
**Change hero text:** Edit `lib/fallback-data.js` → `FALLBACK_CONTENT.hero_title`

---

### 7. Deploy to GitHub

```bash
cd ~/Desktop/superteam-malaysia-final-2

git add .
git commit -m "feat: v2 upgrade — fixed Luma embed, video click-to-source, profile photos"
git push origin main
```

---

## Quick Command Reference

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Copy photos from Downloads
cp ~/Downloads/photo.jpg public/gallery/event-1.jpg
cp ~/Downloads/profile.jpg public/members/username.jpg

# Resize gallery photos (needs ImageMagick)
for f in public/gallery/*.jpg; do convert "$f" -resize 680x440^ -gravity center -extent 680x440 "$f"; done

# Resize member photos
for f in public/members/*.jpg; do convert "$f" -resize 200x200^ -gravity center -extent 200x200 "$f"; done

# Deploy
git add . && git commit -m "update" && git push origin main
```

---

## File Structure

```
superteam-malaysia-final-2/
├── app/
│   ├── page.js              ← Main page (section order)
│   ├── layout.js            ← Fonts + Twitter script
│   ├── members/page.js      ← Member directory
│   ├── admin/               ← Admin dashboard
│   └── api/                 ← API routes
├── components/
│   ├── DotBackground.js     ← Dot pattern
│   ├── NavBar.js            ← Fullscreen menu
│   ├── Hero.js              ← Globe + skyline
│   ├── PhotoMarquee.js      ← ← EDIT: Add your photos here
│   ├── Stats.js             ← Counters
│   ├── Events.js            ← Cards + Luma embed (FIXED)
│   ├── DeliverResults.js    ← ← EDIT: Video + Twitter links
│   ├── MembersSpotlight.js  ← Flip cards + profile photos
│   ├── MemberPerks.js       ← 6 perks
│   ├── Partners.js          ← Dual marquee
│   ├── HowToJoin.js         ← 4 steps
│   ├── WallOfLove.js        ← Testimonials
│   ├── LatestSection.js     ← Twitter timeline + quote
│   ├── Faq.js               ← Accordion
│   ├── JoinCta.js           ← CTA + email
│   └── Footer.js            ← Giant SUPERTEAM text
├── lib/
│   └── fallback-data.js     ← ← EDIT: Members, events, content
├── public/
│   ├── gallery/             ← ← PUT: Activity photos here
│   ├── members/             ← ← PUT: Member photos here ([twitter].jpg)
│   └── videos/              ← ← PUT: Short video clips here
└── UPGRADE-GUIDE-v2.md      ← This file
```
