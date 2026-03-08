# Superteam Malaysia — Complete Upgrade Guide

## What Changed (Summary)

### New Components Added
| Component | File | Description |
|-----------|------|-------------|
| `DotBackground` | `components/DotBackground.js` | Fixed dot-pattern background across entire page |
| `PhotoMarquee` | `components/PhotoMarquee.js` | Auto-scrolling activity photos (R→L), pauses on hover, 2 rows |
| `DeliverResults` | `components/DeliverResults.js` | "We Deliver Results" cards — hover to play video |
| `MemberPerks` | `components/MemberPerks.js` | "We Help You Achieve Your Goals in the Solana Ecosystem" |
| `HowToJoin` | `components/HowToJoin.js` | 4-step "How to Become a Member" |
| `LatestSection` | `components/LatestSection.js` | Twitter timeline embed + quote "Driven by creators, loved by the community" |

### Updated Components
| Component | What Changed |
|-----------|-------------|
| `NavBar` | Fullscreen menu overlay with MENU/CLOSE button + vertical "SUPERTEAM MALAYSIA" text on left edge |
| `Hero` | Globe/earth radial background + Malaysian skyline SVG (Petronas Towers, KL Tower, Merdeka 118) + new motto |
| `Events` | Added embedded Luma calendar iframe |
| `MembersSpotlight` | "Our Members Are Industry Leaders..." header + profile photo support from `/public/members/[twitter].jpg` |
| `Partners` | Updated header text to "Trusted by Solana's Top Projects" |
| `Footer` | Giant partially-clipped "SUPERTEAM" text at the very bottom |

### Updated Files
| File | What Changed |
|------|-------------|
| `app/page.js` | New section order with all new components |
| `app/layout.js` | Added Twitter widget `<Script>` tag for tweet embeds |
| `styles/globals.css` | New photo marquee animations, menu hover styles, globe pulse animation |
| `next.config.js` | Changed X-Frame-Options from DENY to SAMEORIGIN (for Luma iframe) |

### Removed
| Component | Replaced By |
|-----------|-------------|
| `Mission` | `MemberPerks` (same content, better design) + `DeliverResults` |

---

## New Section Order (top to bottom)

1. **DotBackground** — Fixed subtle dot pattern
2. **NavBar** — Logo + MENU button → fullscreen overlay
3. **Hero** — Globe BG + Malaysian skyline + "We Lead Solana Growth in Malaysia"
4. **PhotoMarquee** — Auto-scrolling activity photos
5. **Stats** — Animated counters
6. **Events** — Event cards + Luma calendar embed
7. **DeliverResults** — Video-on-hover cards
8. **MembersSpotlight** — Flip cards with profile photos
9. **MemberPerks** — 6 perks grid
10. **Partners** — Dual marquee
11. **HowToJoin** — 4-step process
12. **WallOfLove** — Testimonials
13. **LatestSection** — Twitter timeline + quote
14. **FAQ** — Accordion
15. **JoinCta** — Email signup + socials
16. **Footer** — Links + giant clipped SUPERTEAM

---

## Step-by-Step Setup

### 1. Upload Activity Photos (Photo Marquee)

Place your event/activity photos in `/public/gallery/`:

```
public/gallery/
  event-1.jpg
  event-2.jpg
  event-3.jpg
  event-4.jpg
  event-5.jpg
  event-6.jpg
  event-7.jpg
  event-8.jpg
```

**Recommended size:** 680×440px (or any 16:10 ratio). JPG or WebP format.

**To add more photos:**
1. Add the image file to `public/gallery/`
2. Open `components/PhotoMarquee.js`
3. Add a new entry to the `GALLERY_IMAGES` array:
```js
{ src: '/gallery/event-9.jpg', alt: 'Your Event Name' },
```

**To remove a photo:**
Delete the entry from the `GALLERY_IMAGES` array and optionally delete the file from `public/gallery/`.

---

### 2. Member Profile Photos

Place member photos in `/public/members/` named by their Twitter handle:

```
public/members/
  ahmadrizal.jpg
  sitindesign.jpg
  jamestan_sol.jpg
  priyasol.jpg
  weilin_sol.jpg
  amirdev.jpg
  ...
```

**Recommended size:** 200×200px (square). JPG format.

**How to get profile photos from X/Twitter:**
1. Go to `https://x.com/[username]`
2. Right-click their profile photo → "Save Image As"
3. Resize to 200×200px using any tool:
   - Online: [squoosh.app](https://squoosh.app) or [birme.net](https://birme.net)
   - Terminal: `convert input.jpg -resize 200x200^ -gravity center -extent 200x200 output.jpg` (ImageMagick)
   - macOS: `sips -z 200 200 photo.jpg`
4. Save as `[twitter_handle].jpg` in `/public/members/`

If no photo is found, the component gracefully falls back to showing the member's first initial.

---

### 3. Video-on-Hover (Deliver Results)

Place videos in `/public/videos/`:

```
public/videos/
  hackathon.mp4
  events.mp4
  builders.mp4
```

**Recommended:** Short clips (5-15 seconds), 720p, MP4 format, under 5MB each.

**To change videos:** Edit the `RESULTS` array in `components/DeliverResults.js`:
```js
{
  title: 'Your Title',
  stat: 'Your Stat',
  desc: 'Description text',
  video: '/videos/your-video.mp4',
  poster: '/gallery/fallback-image.jpg',
  gradient: 'linear-gradient(135deg, #9945FF33, #14F19522)',
},
```

---

### 4. Luma Calendar Embed

The Events component embeds your Luma calendar via an iframe. The URL is derived from your `luma_url` in the CMS or fallback data.

**To change the Luma calendar:**
- Update `luma_url` in `lib/fallback-data.js` → `FALLBACK_CONTENT.luma_url`
- Or update it in your Supabase `site_content` table

**The embed URL format is:**
```
https://lu.ma/embed/calendar/cal-[YOUR-CALENDAR-ID]/events
```

To find your calendar ID:
1. Go to your Luma calendar page (e.g. `https://lu.ma/mysuperteam`)
2. The calendar ID is in the page source or you can contact Luma support

**Alternative (simpler) Luma embed:** Replace the `<iframe>` in `Events.js` with:
```jsx
<iframe
  src="https://lu.ma/embed/checkout/evt-XXXXX"
  style={{ width: '100%', height: 450, border: 'none' }}
/>
```

---

### 5. Twitter/X Embed (Latest Section)

The `LatestSection` component uses Twitter's embedded timeline widget to show your latest tweets.

**How it works:**
- The layout loads `https://platform.twitter.com/widgets.js` via Next.js `<Script>`
- The component has a `<a class="twitter-timeline">` tag pointing to `https://twitter.com/SuperteamMY`
- Twitter's script automatically renders it as an embedded timeline

**To embed specific tweets instead of the timeline:**
1. Open `components/LatestSection.js`
2. Replace the tweet IDs in the `TWEET_IDS` array with real ones
3. To find a tweet ID: open a tweet on X → the URL looks like `https://x.com/SuperteamMY/status/1234567890123456789` → the number at the end is the tweet ID

**To switch to individual tweet embeds:**
Uncomment the individual tweet rendering in `LatestSection.js` and comment out the timeline embed.

---

### 6. Adding/Removing Sections

**To remove a section:**
1. Open `app/page.js`
2. Delete the `<ComponentName ... />` line
3. Delete the corresponding `import` line at the top

**To add a new section:**
1. Create `components/YourSection.js`
2. Add `import YourSection from '@/components/YourSection';` in `app/page.js`
3. Add `<YourSection />` where you want it in the JSX

---

### 7. Adding/Removing Members

**In fallback data (no Supabase):**
Open `lib/fallback-data.js` → edit the `FALLBACK_MEMBERS` array.

Each member object:
```js
{
  id: '13',
  name: 'New Member',
  role: 'Developer',
  company: 'CompanyName',
  skills: ['Rust', 'Frontend'],
  twitter: 'their_twitter_handle',
  badge: 'Solana Builder',  // Options: Core Contributor, Solana Builder, Hackathon Winner, Grant Recipient, Bounty Hunter
  bio: 'Short bio here.',
  achievements: { hackathon_wins: 0, projects_built: 1, grants_received: 0, bounties_completed: 3 },
  featured: true,  // true = shows on homepage spotlight
},
```

---

### 8. Terminal Commands Quick Reference

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to GitHub
git add .
git commit -m "Upgrade: UAE-inspired redesign with new sections"
git push origin main

# Create optimized images (requires ImageMagick)
# Resize all gallery images to 680x440
for f in public/gallery/*.jpg; do
  convert "$f" -resize 680x440^ -gravity center -extent 680x440 "$f"
done

# Resize all member photos to 200x200
for f in public/members/*.jpg; do
  convert "$f" -resize 200x200^ -gravity center -extent 200x200 "$f"
done
```

---

### 9. Deploying to GitHub

```bash
cd superteam-malaysia

# Stage all changes
git add .

# Commit
git commit -m "feat: UAE-inspired redesign — new navbar, hero skyline, photo marquee, video hover, luma embed, member perks, how-to-join, tweet embed, giant footer"

# Push
git push origin main
```

If deploying to Vercel, it will automatically pick up the push and redeploy.

---

### 10. Customization Tips

**Change the Malaysian skyline:** Edit the SVG in `components/Hero.js` → `MalaysianSkyline` function. Adjust the `<rect>`, `<polygon>` elements to match different buildings.

**Change the dot pattern density:** Edit `components/DotBackground.js` → change `backgroundSize: '24px 24px'` to a larger value for sparser dots or smaller for denser.

**Change the hero motto:** Edit the `<h1>` in `components/Hero.js` or update `hero_title` in your CMS/fallback data.

**Change colors:** All Solana brand colors are defined as CSS variables in `styles/globals.css`:
```css
--solana-purple: #9945FF;
--solana-green: #14F195;
--solana-cyan: #03E1FF;
```

---

## File Structure After Upgrade

```
superteam-malaysia/
├── app/
│   ├── page.js              ← Updated (new section order)
│   ├── layout.js            ← Updated (Twitter script)
│   ├── members/page.js      ← Unchanged
│   ├── admin/               ← Unchanged
│   └── api/                 ← Unchanged
├── components/
│   ├── DotBackground.js     ← NEW
│   ├── NavBar.js            ← Updated (fullscreen menu)
│   ├── Hero.js              ← Updated (globe + skyline)
│   ├── PhotoMarquee.js      ← NEW
│   ├── Stats.js             ← Unchanged
│   ├── Events.js            ← Updated (Luma embed)
│   ├── DeliverResults.js    ← NEW
│   ├── MembersSpotlight.js  ← Updated (profile photos)
│   ├── MemberPerks.js       ← NEW
│   ├── Partners.js          ← Updated (header text)
│   ├── HowToJoin.js         ← NEW
│   ├── WallOfLove.js        ← Unchanged
│   ├── LatestSection.js     ← NEW
│   ├── Faq.js               ← Unchanged
│   ├── JoinCta.js           ← Unchanged
│   └── Footer.js            ← Updated (giant SUPERTEAM text)
├── hooks/                   ← Unchanged
├── lib/                     ← Unchanged
├── public/
│   ├── gallery/             ← NEW (add event photos here)
│   ├── members/             ← NEW (add member photos here)
│   ├── videos/              ← NEW (add hover videos here)
│   └── logo.png             ← Unchanged
├── styles/
│   └── globals.css          ← Updated (new animations)
├── next.config.js           ← Updated (iframe support)
├── package.json             ← Unchanged
└── UPGRADE-GUIDE.md         ← This file
```
