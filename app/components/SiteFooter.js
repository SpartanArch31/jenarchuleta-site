import { BOOKING_EMAIL, CONNECT_LINKS } from './site-data';

// Small footer on every page: page links, socials, and the one email.
// The newsletter form lives only on /media#social.
const PAGE_LINKS = [
  { href: '/about', label: 'About Me' },
  { href: '/about#gallery', label: 'Gallery' },
  { href: '/about-the-author', label: 'About the Author' },
  { href: '/book', label: 'Book' },
  { href: '/shop', label: 'Shop' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/pups', label: 'Pups' },
  { href: '/journal', label: 'My Journals' },
  { href: '/media', label: 'Media & Contact' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/forever-angels', label: 'The Forever Angels' },
];

export default function SiteFooter({ homeHref = '/' }) {
  const home = homeHref.replace(/\/$/, '');
  const link = (href) => (href.startsWith('http') ? href : `${home}${href}`);

  return (
    <footer>
      <div className="wrap">
        <div className="foot-mono">JA</div>
        <nav className="foot-links" aria-label="Pages">
          {PAGE_LINKS.map((item) => (
            <a key={item.href} href={link(item.href)}>{item.label}</a>
          ))}
        </nav>
        <ul className="stay-socials" aria-label="Social">
          {CONNECT_LINKS.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
            </li>
          ))}
        </ul>
        <p className="foot-meta">
          <a href={`mailto:${BOOKING_EMAIL}`}>{BOOKING_EMAIL}</a>
        </p>
        <p className="foot-meta">
          © 2026 Jen Archuleta. Author of <em>Beyond the Velvet Ropes</em> by Jennifer Walcott Archuleta.
        </p>
        <p className="foot-meta">
          <a href={link('/privacy')}>Privacy Policy</a>
          {' · '}
          <a href={link('/terms')}>Terms of Service</a>
          {' · '}
          <a href={link('/shipping-returns')}>Shipping &amp; Returns</a>
        </p>
      </div>
    </footer>
  );
}
