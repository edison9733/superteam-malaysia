-- © 2026 edison9733. All rights reserved. Unauthorized copying prohibited.
-- ============================================================
-- Superteam Malaysia — Complete Supabase CMS Schema
-- Run this in your Supabase SQL Editor to set up the database
-- ============================================================

-- ── Enable required extensions ─────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ENUM Types ─────────────────────────────────────────────
CREATE TYPE event_status AS ENUM ('upcoming', 'past', 'cancelled');
CREATE TYPE event_type AS ENUM ('hackathon', 'meetup', 'workshop', 'demo', 'talk');
CREATE TYPE partner_tier AS ENUM ('platinum', 'gold', 'silver', 'community');
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');

-- ── Profiles (extends Supabase Auth) ───────────────────────
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'viewer',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Events ─────────────────────────────────────────────────
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  location TEXT,
  type event_type DEFAULT 'meetup',
  status event_status DEFAULT 'upcoming',
  luma_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Members ────────────────────────────────────────────────
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  badge TEXT,
  twitter TEXT,
  avatar_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  achievements JSONB DEFAULT '{}',
  -- achievements schema: { hackathon_wins: 0, projects_built: 0, grants_received: 0, bounties_completed: 0 }
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Partners ───────────────────────────────────────────────
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  tier partner_tier DEFAULT 'silver',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Testimonials (Wall of Love) ────────────────────────────
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  avatar_url TEXT,
  twitter TEXT,
  tweet_url TEXT,
  featured BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── FAQs ───────────────────────────────────────────────────
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Announcements ──────────────────────────────────────────
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  pinned BOOLEAN DEFAULT FALSE,
  date DATE DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Site Content (Key-Value CMS) ───────────────────────────
-- This table stores all editable text on the website.
-- Admins edit values in the dashboard; the frontend reads them.
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  section TEXT NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Media Assets ───────────────────────────────────────────
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Public: read-only | Admins/Editors: full CRUD
-- ============================================================

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Helper function: check if current user is admin or editor
CREATE OR REPLACE FUNCTION is_admin_or_editor()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'editor')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ── Public read policies (anyone can view published content) ──
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read members" ON members FOR SELECT USING (true);
CREATE POLICY "Public read partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (published = true);
CREATE POLICY "Public read announcements" ON announcements FOR SELECT USING (published = true);
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);

-- ── Admin/Editor write policies ─────────────────────────────
CREATE POLICY "Admin insert events" ON events FOR INSERT WITH CHECK (is_admin_or_editor());
CREATE POLICY "Admin update events" ON events FOR UPDATE USING (is_admin_or_editor());
CREATE POLICY "Admin delete events" ON events FOR DELETE USING (is_admin_or_editor());

CREATE POLICY "Admin insert members" ON members FOR INSERT WITH CHECK (is_admin_or_editor());
CREATE POLICY "Admin update members" ON members FOR UPDATE USING (is_admin_or_editor());
CREATE POLICY "Admin delete members" ON members FOR DELETE USING (is_admin_or_editor());

CREATE POLICY "Admin insert partners" ON partners FOR INSERT WITH CHECK (is_admin_or_editor());
CREATE POLICY "Admin update partners" ON partners FOR UPDATE USING (is_admin_or_editor());
CREATE POLICY "Admin delete partners" ON partners FOR DELETE USING (is_admin_or_editor());

CREATE POLICY "Admin insert testimonials" ON testimonials FOR INSERT WITH CHECK (is_admin_or_editor());
CREATE POLICY "Admin update testimonials" ON testimonials FOR UPDATE USING (is_admin_or_editor());
CREATE POLICY "Admin delete testimonials" ON testimonials FOR DELETE USING (is_admin_or_editor());

CREATE POLICY "Admin insert faqs" ON faqs FOR INSERT WITH CHECK (is_admin_or_editor());
CREATE POLICY "Admin update faqs" ON faqs FOR UPDATE USING (is_admin_or_editor());
CREATE POLICY "Admin delete faqs" ON faqs FOR DELETE USING (is_admin_or_editor());

CREATE POLICY "Admin insert announcements" ON announcements FOR INSERT WITH CHECK (is_admin_or_editor());
CREATE POLICY "Admin update announcements" ON announcements FOR UPDATE USING (is_admin_or_editor());
CREATE POLICY "Admin delete announcements" ON announcements FOR DELETE USING (is_admin_or_editor());

CREATE POLICY "Admin update site_content" ON site_content FOR UPDATE USING (is_admin_or_editor());
CREATE POLICY "Admin insert site_content" ON site_content FOR INSERT WITH CHECK (is_admin_or_editor());

CREATE POLICY "Admin manage media" ON media FOR ALL USING (is_admin_or_editor());

-- Users can update their own profile
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);


-- ============================================================
-- AUTO-UPDATE TIMESTAMPS
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- SEED DATA (default site content)
-- ============================================================
INSERT INTO site_content (key, value, section, description) VALUES
  ('hero_title', 'Building Solana''s Future in Malaysia', 'hero', 'Main hero headline'),
  ('hero_subtitle', 'The home for Solana builders, creators, and innovators in Malaysia. Join the movement shaping Web3 in Southeast Asia.', 'hero', 'Hero subheadline'),
  ('stats_members', '150+', 'stats', 'Total community members'),
  ('stats_events', '30+', 'stats', 'Events hosted'),
  ('stats_projects', '45+', 'stats', 'Projects built'),
  ('stats_bounties', '80+', 'stats', 'Bounties completed'),
  ('stats_reach', '5,000+', 'stats', 'Community reach'),
  ('join_title', 'Ready to Build the Future?', 'join', 'CTA section title'),
  ('join_subtitle', 'Join Superteam Malaysia and connect with the most ambitious builders in the Solana ecosystem.', 'join', 'CTA section subtitle'),
  ('telegram_url', 'https://t.me/SuperteamMY', 'social', 'Telegram group link'),
  ('discord_url', 'https://discord.gg/superteammy', 'social', 'Discord server link'),
  ('twitter_url', 'https://x.com/SuperteamMY', 'social', 'Twitter/X profile link'),
  ('luma_url', 'https://lu.ma/superteammy', 'social', 'Luma events page');


-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(date DESC);
CREATE INDEX idx_events_featured ON events(featured) WHERE featured = true;
CREATE INDEX idx_members_featured ON members(featured) WHERE featured = true;
CREATE INDEX idx_members_skills ON members USING GIN(skills);
CREATE INDEX idx_partners_tier ON partners(tier);
CREATE INDEX idx_partners_order ON partners(display_order);
CREATE INDEX idx_faqs_order ON faqs(display_order);
CREATE INDEX idx_site_content_key ON site_content(key);
CREATE INDEX idx_site_content_section ON site_content(section);
CREATE INDEX idx_announcements_published ON announcements(published) WHERE published = true;


-- ============================================================
-- STORAGE BUCKET for media uploads
-- ============================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT DO NOTHING;

-- Allow public read access to media bucket
CREATE POLICY "Public read media" ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- Allow admins to upload/delete media
CREATE POLICY "Admin upload media" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media' AND is_admin_or_editor());

CREATE POLICY "Admin delete media" ON storage.objects FOR DELETE
  USING (bucket_id = 'media' AND is_admin_or_editor());
