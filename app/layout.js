import './globals.css';
import ScrollReveal from './components/ScrollReveal';

export const metadata = {
  metadataBase: new URL('https://jenarchuleta.com'),
  title: {
    default: 'Jen Archuleta — Author of Beyond the Velvet Ropes',
    template: '%s — Jen Archuleta',
  },
  description:
    'Jen Archuleta (Jennifer Walcott) — author, speaker, and advocate. Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love. Read the first chapter free.',
  icons: {
    icon: '/assets/favicon.svg',
    apple: '/assets/app-icon-512.png',
  },
  openGraph: {
    title: 'Jen Archuleta — Beyond the Velvet Ropes',
    description: "This isn't the story you think it is. Read the first chapter free.",
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Allura&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
