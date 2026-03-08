// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Built for Superteam Earn Bounty
// Unauthorized copying or redistribution of this code is prohibited.
// app/page.js — Landing Page (upgraded with UAE-inspired design)

import { getLandingPageData } from '@/lib/cms';
import {
  FALLBACK_CONTENT,
  FALLBACK_EVENTS,
  FALLBACK_MEMBERS,
  FALLBACK_PARTNERS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_FAQS,
} from '@/lib/fallback-data';

import DotBackground from '@/components/DotBackground';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import PhotoMarquee from '@/components/PhotoMarquee';
import Stats from '@/components/Stats';
import Events from '@/components/Events';
import DeliverResults from '@/components/DeliverResults';
import MembersSpotlight from '@/components/MembersSpotlight';
import MemberPerks from '@/components/MemberPerks';
import Partners from '@/components/Partners';
import HowToJoin from '@/components/HowToJoin';
import WallOfLove from '@/components/WallOfLove';
import LatestSection from '@/components/LatestSection';
import Faq from '@/components/Faq';
import JoinCta from '@/components/JoinCta';
import Footer from '@/components/Footer';

export const revalidate = 60;

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
    console.info('[Superteam] Using fallback data:', err.message);
    content = FALLBACK_CONTENT;
    events = FALLBACK_EVENTS;
    members = FALLBACK_MEMBERS;
    partners = FALLBACK_PARTNERS;
    testimonials = FALLBACK_TESTIMONIALS;
    faqs = FALLBACK_FAQS;
  }

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      {/* Global dot pattern background */}
      <DotBackground />

      {/* Navigation */}
      <NavBar />

      {/* Section 1: Hero — Globe BG + Malaysian Skyline + Motto */}
      <Hero
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        telegramUrl={content.telegram_url}
      />

      {/* Section 2: Auto-scrolling Photo Marquee */}
      <PhotoMarquee />

      {/* Section 3: Stats / Impact */}
      <Stats
        members={content.stats_members}
        events={content.stats_events}
        projects={content.stats_projects}
        bounties={content.stats_bounties}
        reach={content.stats_reach}
      />

      {/* Section 4: Events (with Luma Embed) */}
      <Events
        events={events}
        lumaUrl={content.luma_url || 'https://lu.ma/mysuperteam'}
      />

      {/* Section 5: We Deliver Results — Video on Hover */}
      <DeliverResults />

      {/* Section 6: Members Spotlight — Industry Leaders */}
      <MembersSpotlight members={members} />

      {/* Section 7: Member Perks — Solana Ecosystem Goals */}
      <MemberPerks />

      {/* Section 8: Partners / Ecosystem */}
      <Partners partners={partners} />

      {/* Section 9: How to Become a Member */}
      <HowToJoin />

      {/* Section 10: Wall of Love */}
      <WallOfLove testimonials={testimonials} />

      {/* Section 11: Latest by Superteam MY + Quote */}
      <LatestSection />

      {/* Section 12: FAQ */}
      <Faq faqs={faqs} />

      {/* Section 13: Join CTA */}
      <JoinCta
        title={content.join_title}
        subtitle={content.join_subtitle}
        telegramUrl={content.telegram_url}
        discordUrl={content.discord_url}
        twitterUrl={content.twitter_url}
      />

      {/* Section 14: Footer — Giant Clipped SUPERTEAM */}
      <Footer
        twitterUrl={content.twitter_url}
        telegramUrl={content.telegram_url}
        discordUrl={content.discord_url}
      />
    </main>
  );
}
