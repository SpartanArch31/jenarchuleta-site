import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import HomeCarousel from './components/HomeCarousel';

// Homepage (November 5, 2026): a short welcome, the photo row, and links
// to the other pages. The book, shop, podcast, journal, and signup each
// live on their own page.
const PAGES = [
  { href: '/about', label: 'About Me' },
  { href: '/book', label: 'Book' },
  { href: '/shop', label: 'Shop' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/pups', label: 'Pups' },
  { href: '/journal', label: 'My Journals' },
  { href: '/media', label: 'Media & Contact' },
  { href: '/forever-angels', label: 'The Forever Angels' },
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap hero">
        <div className="hero-copy">
          <div className="eyebrow">Author · Speaker · Advocate</div>
          <div className="hero-script">this isn’t the story<br />you think it is</div>
          <h1>Faith, family, and a bunch of rescues.</h1>
          <div className="eyebrow" style={{ marginTop: '16px' }}>Author of <em>Beyond the Velvet Ropes</em></div>
        </div>
        <div className="hero-media">
          <div className="portrait hero-frame">
            <img src="/assets/presskit-headshot-floral.jpg" alt="Jen Archuleta smiling in a floral top" width="1100" height="1370" />
          </div>
        </div>
      </section>

      <section className="wrap tagline" style={{ paddingBlock: 'var(--space-9)' }}>
        <div className="threshold-rule"><span className="diamond" /></div>
        <p className="q">“Your story isn’t what happened to you. It’s what you do with it.”</p>
        <div className="threshold-rule"><span className="diamond" /></div>
      </section>

      <HomeCarousel />

      <section className="wrap home-jumps" aria-label="Pages">
        <h2 className="center">Look around</h2>
        <div className="hero-ctas" style={{ justifyContent: 'center' }}>
          {PAGES.map((page) => (
            <a key={page.href} href={page.href} className="btn btn-ghost">{page.label}</a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
