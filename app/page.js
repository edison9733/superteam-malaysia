// app/page.js
// Landing Page — all content from Supabase CMS (falls back to sample data)
// Uses ISR with 60s revalidation — CMS edits go live within ~1 minute

import { getLandingPageData } from '@/lib/cms';
import {
  FALLBACK_CONTENT,
  FALLBACK_EVENTS,
  FALLBACK_MEMBERS,
  FALLBACK_PARTNERS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_FAQS,
} from '@/lib/fallback-data';

import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Stats from '@/components/Stats';
import Events from '@/components/Events';
import MembersSpotlight from '@/components/MembersSpotlight';
import Partners from '@/components/Partners';
import WallOfLove from '@/components/WallOfLove';
import Faq from '@/components/Faq';
import JoinCta from '@/components/JoinCta';
import Footer from '@/components/Footer';

export const revalidate = 60; // ISR: rebuild every 60 seconds

export default async function HomePage() {
  let content, events, members, partners, testimonials, faqs;

  try {
    const data = await getLandingPageData();
    content = data.content;
    events = data.events;
    members = data.members;
    partners = data.partners;
    testimonials = data.testimonials;
    faqs = data.faqs;
  } catch (err) {
    // Graceful fallback when Supabase isn't configured
    console.info('[Superteam] Using fallback data:', err.message);
    content = FALLBACK_CONTENT;
    events = FALLBACK_EVENTS;
    members = FALLBACK_MEMBERS;
    partners = FALLBACK_PARTNERS;
    testimonials = FALLBACK_TESTIMONIALS;
    faqs = FALLBACK_FAQS;
  }

  return (
    <main>
      <NavBar />

      {/* Section 1: Hero */}
      <Hero
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        telegramUrl={content.telegram_url}
      />

      {/* Section 2: Mission / What We Do */}
      <Mission />

      {/* Section 3: Stats / Impact */}
      <Stats
        members={content.stats_members}
        events={content.stats_events}
        projects={content.stats_projects}
        bounties={content.stats_bounties}
        reach={content.stats_reach}
      />

      {/* Section 4: Events (Luma Integration) */}
      <Events
        events={events}
        lumaUrl={content.luma_url || 'https://lu.ma/superteammy'}
      />

      {/* Section 5: Members Spotlight */}
      <MembersSpotlight members={members} />

      {/* Section 6: Partners / Ecosystem */}
      <Partners partners={partners} />

      {/* Section 7: Wall of Love */}
      <WallOfLove testimonials={testimonials} />

      {/* Section 8: FAQ */}
      <Faq faqs={faqs} />

      {/* Section 9: Join CTA */}
      <JoinCta
        title={content.join_title}
        subtitle={content.join_subtitle}
        telegramUrl={content.telegram_url}
        discordUrl={content.discord_url}
        twitterUrl={content.twitter_url}
      />

      {/* Section 10: Footer */}
      <Footer
        twitterUrl={content.twitter_url}
        telegramUrl={content.telegram_url}
        discordUrl={content.discord_url}
      />
    </main>
  );
}
