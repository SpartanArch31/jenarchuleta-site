import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
