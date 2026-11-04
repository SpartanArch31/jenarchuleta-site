// The footer, the same on every page (Jen's site notes, November 4, 2026): the
// six main tabs, then the legal links. Nothing else.
// - The free first chapter signup lives on the Book page only
//   (FreeChapter.js, /book#free-chapter). It is no longer at the bottom of
//   every page.
// - The social links live on Media (#follow).
// - "Jen Archuleta" everywhere on the site, except the book itself, which
//   keeps its printed byline (so no "Walcott" line here).
// `stayClose` is still accepted (older pages pass it) but no longer changes
// anything. `homeHref` lets the private Velvet pages link back to the
// full site address.
const TABS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Me' },
  { href: '/book', label: 'Book' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/journal', label: 'Journal' },
  { href: '/media', label: 'Media' },
];

// eslint-disable-next-line no-unused-vars
export default function SiteFooter({ stayClose = true, homeHref = '/' }) {
  const home = homeHref.replace(/\/$/, '');
  return (
    <footer>
      <div className="wrap">
        <div className="foot-mono">JA</div>
        <nav className="foot-links" aria-label="Site">
          {TABS.map((tab) => (
            <a key={tab.href} href={tab.href === '/' ? `${home}/` : `${home}${tab.href}`}>{tab.label}</a>
          ))}
        </nav>
        <p className="foot-meta">
          © 2026 Jen Archuleta. Author of <em>Beyond the Velvet Ropes</em>.
        </p>
        <p className="foot-meta">
          <a href={`${home}/privacy`}>Privacy Policy</a> · <a href={`${home}/terms`}>Terms of Service</a> ·{' '}
          <a href={`${home}/shipping-returns`}>Shipping &amp; Returns</a>
        </p>
      </div>
    </footer>
  );
}
