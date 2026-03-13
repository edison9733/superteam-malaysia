// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Built for Superteam Earn Bounty
// Unauthorized copying or redistribution of this code is prohibited.
import '../styles/globals.css';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://superteam.my'),
  title: 'Superteam Malaysia — We Lead Solana Growth in Malaysia',
  description: 'The home for Solana builders, creators, and innovators in Malaysia. Join the movement shaping Web3 in Southeast Asia.',
  keywords: ['Superteam', 'Malaysia', 'Solana', 'Web3', 'Blockchain', 'Crypto', 'Builder', 'Community'],
  authors: [{ name: 'Superteam Malaysia' }],
  openGraph: {
    title: 'Superteam Malaysia — We Lead Solana Growth in Malaysia',
    description: 'The home for Solana builders, creators, and innovators in Malaysia.',
    url: 'https://superteam.my',
    siteName: 'Superteam Malaysia',
    locale: 'en_MY',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Superteam Malaysia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Superteam Malaysia',
    description: 'We Lead Solana Growth in Malaysia',
    creator: '@SuperteamMY',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Instrument+Serif:ital@1&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#08080e] text-white antialiased">
        {children}
        {/* Twitter/X Widget script for tweet embeds */}
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
