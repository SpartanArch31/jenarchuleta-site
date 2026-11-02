import { Cinzel, Cormorant_Garamond, Allura, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import ScrollReveal from './components/ScrollReveal';
import { SOCIALS, PODCAST, OG_IMAGE } from './components/site-data';

// Self-hosted via next/font (built at compile time — no runtime request to
// Google, so no visitor IP is ever sent to fonts.googleapis.com/gstatic.com).
// Same families, weights, and styles as before — no design change.
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cinzel',
  display: 'swap',
});
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});
const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-allura',
  display: 'swap',
});
const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://jenarchuleta.com'),
  title: {
    default: 'Jen Archuleta — Author of Beyond the Velvet Ropes',
    template: '%s — Jen Archuleta',
  },
  description:
    'Jen Archuleta (Jennifer Walcott Archuleta) — author, speaker, and advocate. Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love. Read the first chapter free.',
  icons: {
    icon: '/assets/favicon.svg',
    apple: '/assets/app-icon-512.png',
  },
  openGraph: {
    title: 'Jen Archuleta — Beyond the Velvet Ropes',
    description: "This isn't the story you think it is. Read the first chapter free.",
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE.url],
  },
};

// The site brand is "Jen Archuleta"; the book listings (Amazon, B&N, Spotify)
// say "Jennifer Walcott Archuleta." This structured data tells search engines
// they're the same person without changing what visitors see.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jen Archuleta',
  alternateName: ['Jennifer Walcott Archuleta', 'Jennifer Walcott', 'Jennifer Archuleta'],
  url: 'https://jenarchuleta.com',
  image: 'https://jenarchuleta.com/assets/presskit-headshot-floral.jpg',
  jobTitle: 'Author',
  sameAs: [SOCIALS.instagram, SOCIALS.tiktok, SOCIALS.x, SOCIALS.facebook, SOCIALS.linkedin, PODCAST.subscribe.spotify, PODCAST.subscribe.apple, PODCAST.subscribe.youtube],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorantGaramond.variable} ${allura.variable} ${hankenGrotesk.variable}`}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
