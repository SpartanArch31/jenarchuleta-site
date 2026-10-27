import { OG_IMAGE } from '../components/site-data';
import { isUnlocked } from './passcode';
import VelvetLocked from './VelvetLocked';

// One entrance, one private journal. The QR code in the back of the book
// lands here through /velvetropes (next.config.js). /velvet-letter redirects
// here too.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'The Velvet Letter',
  description: 'Some things only live inside the book. A private collection for readers of Beyond the Velvet Ropes.',
  robots: { index: false, follow: false },
  openGraph: { images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
};

export default async function VelvetPage() {
  // Locked: render the public invitation and stop. The private journal and
  // its entries are never fetched, so nothing private is in this response.
  if (!isUnlocked()) return <VelvetLocked />;

  const { getVelvetLetters } = await import('../sanity/queries');
  const { default: VelvetInside } = await import('./VelvetInside');
  let letters = [];
  try {
    letters = await getVelvetLetters();
  } catch {
    console.error('Velvet Letter fetch failed');
    letters = [];
  }
  return <VelvetInside letters={Array.isArray(letters) ? letters : []} />;
}
