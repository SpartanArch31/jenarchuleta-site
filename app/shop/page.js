import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BookOffers from '../book/BookOffers';
import { OG_IMAGE } from '../components/site-data';

export const metadata = {
  title: 'Shop',
  description: 'Signed copies, the bookmark, and The Velvet Circle Book Club.',
  openGraph: { images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
};

export default function ShopPage() {
  return (
    <div className="shop-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <BookOffers />
      <SiteFooter />
    </div>
  );
}
