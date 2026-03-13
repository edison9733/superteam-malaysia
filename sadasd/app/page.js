import { Suspense } from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import DotBackground from '../components/DotBackground';
import Stats from '../components/Stats';
import Events from '../components/Events';
import DeliverResults from '../components/DeliverResults';
import MembersSpotlight from '../components/MembersSpotlight';
import MemberPerks from '../components/MemberPerks';
import Partners from '../components/Partners';
import HowToJoin from '../components/HowToJoin';
import WallOfLove from '../components/WallOfLove';
import LatestSection from '../components/LatestSection';
import ScrollSpyProvider from '../components/ScrollSpyProvider';
import SectionNav from '../components/SectionNav';
import PhotoMarquee from '../components/PhotoMarquee';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import {
  FALLBACK_MEMBERS,
  FALLBACK_EVENTS,
  FALLBACK_PARTNERS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_FAQS,
  FALLBACK_CONTENT,
} from '../lib/fallback-data';

async function getData() {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) return null;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const [members, events, partners, testimonials, stats, faqs, content] = await Promise.all([
      supabase.from('members').select('*').eq('is_active', true).order('display_order'),
      supabase.from('events').select('*').eq('is_active', true).order('date', { ascending: false }),
      supabase.from('partners').select('*').eq('is_active', true).order('tier').order('display_order'),
      supabase.from('testimonials').select('*').eq('is_active', true).order('display_order'),
      supabase.from('stats').select('*').eq('is_active', true).order('display_order'),
      supabase.from('faqs').select('*').eq('is_active', true).order('display_order'),
      supabase.from('site_content').select('*'),
    ]);
    const contentMap = {};
    content.data?.forEach((item) => {
      contentMap[item.key || item.section_key] = item.value || item.title;
    });
    return {
      members: members.data?.length ? members.data : null,
      events: events.data?.length ? events.data : null,
      partners: partners.data?.length ? partners.data : null,
      testimonials: testimonials.data?.length ? testimonials.data : null,
      stats: stats.data?.length ? stats.data : null,
      faqs: faqs.data?.length ? faqs.data : null,
      content: Object.keys(contentMap).length ? contentMap : null,
    };
  } catch (e) {
    return null;
  }
}

export default async function Home() {
  const data = await getData();
  const members = data?.members || FALLBACK_MEMBERS;
  const events = data?.events || FALLBACK_EVENTS;
  const partners = data?.partners || FALLBACK_PARTNERS;
  const testimonials = data?.testimonials || FALLBACK_TESTIMONIALS;
  const faqs = data?.faqs || FALLBACK_FAQS;
  const content = data?.content || FALLBACK_CONTENT;
  const stats = data?.stats || null;

  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#000', color: '#fff' }}>
      <DotBackground />
      <NavBar />
      <ScrollSpyProvider />
      <SectionNav />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero content={content} />
        <Suspense fallback={null}><PhotoMarquee /></Suspense>
        <Stats stats={stats} content={content} />
        <Events events={events} />
        <DeliverResults />
        <MembersSpotlight members={members} />
        <MemberPerks />
        <Partners partners={partners} />
        <HowToJoin />
        <WallOfLove testimonials={testimonials} />
        <LatestSection />
        <FAQ faqs={faqs} />
        <CTA content={content} />
        <Footer />
      </div>
    </main>
  );
}
