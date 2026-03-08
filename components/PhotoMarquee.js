// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';
import { useInView } from '@/hooks/useInView';

// Placeholder gallery items — replace paths with your actual photos in /public/gallery/
const GALLERY_IMAGES = [
  { src: '/gallery/event-1.jpg', alt: 'Solana Hacker House KL' },
  { src: '/gallery/event-2.jpg', alt: 'Web3 Builder Meetup' },
  { src: '/gallery/event-3.jpg', alt: 'Superteam Demo Day' },
  { src: '/gallery/event-4.jpg', alt: 'Solana Workshop' },
  { src: '/gallery/event-5.jpg', alt: 'Community Gathering' },
  { src: '/gallery/event-6.jpg', alt: 'Hackathon Winners' },
  { src: '/gallery/event-7.jpg', alt: 'Builder Sprint' },
  { src: '/gallery/event-8.jpg', alt: 'Networking Night' },
];

export default function PhotoMarquee() {
  const [ref, inView] = useInView(0.05);

  // Double the images for seamless loop
  const images = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <section ref={ref} style={{
      padding: '40px 0', overflow: 'hidden',
      opacity: inView ? 1 : 0, transition: 'opacity 1s',
    }}>
      {/* Row 1 — scrolls left */}
      <div className="photo-marquee" style={{ marginBottom: 12 }}>
        <div className="photo-marquee-track">
          {images.map((img, i) => (
            <div key={`r1-${i}`} className="photo-marquee-item">
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: 340, height: 220, objectFit: 'cover', borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onError={(e) => {
                  // Show a gradient placeholder if image not found
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = `linear-gradient(135deg, rgba(153,69,255,0.15), rgba(20,241,149,0.1))`;
                  e.target.parentElement.style.display = 'flex';
                  e.target.parentElement.style.alignItems = 'center';
                  e.target.parentElement.style.justifyContent = 'center';
                  e.target.parentElement.innerHTML = `<span style="color:rgba(255,255,255,0.3);font-size:13px;font-weight:600">${img.alt}</span>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right (reverse) */}
      <div className="photo-marquee photo-marquee-reverse">
        <div className="photo-marquee-track photo-marquee-track-reverse">
          {images.map((img, i) => (
            <div key={`r2-${i}`} className="photo-marquee-item">
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: 340, height: 220, objectFit: 'cover', borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = `linear-gradient(135deg, rgba(3,225,255,0.12), rgba(153,69,255,0.08))`;
                  e.target.parentElement.style.display = 'flex';
                  e.target.parentElement.style.alignItems = 'center';
                  e.target.parentElement.style.justifyContent = 'center';
                  e.target.parentElement.innerHTML = `<span style="color:rgba(255,255,255,0.3);font-size:13px;font-weight:600">${img.alt}</span>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
