import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BookOffers from '../book/BookOffers';
import './shop.css';

// The Shop: its own page (Adam, Nov 5, 2026). Product cards, prices and
// Stripe links all come from BookOffers + SHOP in site-data.js, unchanged.
export const metadata = {
  title: 'Shop',
  description:
    'Signed copies of Beyond the Velvet Ropes, the Signature Velvet Bookmark, the Velvet Circle Book Club, and Beyond the Velvet Ropes apparel.',
};

const JUMP = [
  { href: '#signed-copy', label: 'Signed copy' },
  { href: '#bookmark', label: 'Bookmark' },
  { href: '#velvet-circle', label: 'Book club' },
  { href: '#apparel', label: 'Apparel' },
];

export default function ShopPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />
      <main id="main-content" tabIndex={-1} className="shop-page shop-page--standalone">
        <header className="wrap shop-head">
          <div className="eyebrow">The Shop</div>
          <h1>Buy the book here, and find a few other things you might love.</h1>
          <nav className="shop-jump" aria-label="Shop sections">
            {JUMP.map((item) => (
              <a key={item.href} href={item.href} className="shop-chip">
                {item.label}
              </a>
            ))}
          </nav>
          <p className="shop-head-note">
            Looking for the paperback, ebook or audiobook? <a href="/book#buy">Every store is on the Book page</a>.
          </p>
        </header>
        <BookOffers />
      </main>
      <SiteFooter />
    </>
  );
}
