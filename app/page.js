import { Suspense } from 'react';
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

// Try to import Supabase data, fall back gracefully
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

    return {
      members: members.data,
      events: events.data,
      partners: partners.data,
      testimonials: testimonials.data,
      stats: stats.data,
      faqs: faqs.data,
      content: content.data,
    };
  } catch (e) {
    return null;
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#000', color: '#fff' }}>
      <DotBackground />
      <ScrollSpyProvider />
      <SectionNav />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Suspense fallback={null}><PhotoMarquee /></Suspense>
        <Stats stats={data?.stats} />
        <Events events={data?.events} />
        <DeliverResults />
        <MembersSpotlight members={data?.members} />
        <MemberPerks />
        <Partners partners={data?.partners} />
        <HowToJoin />
        <WallOfLove testimonials={data?.testimonials} />
        <LatestSection />
        <FAQ faqs={data?.faqs} />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
