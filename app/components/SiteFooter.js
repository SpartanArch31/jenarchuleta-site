import KitInlineForm from './KitInlineForm';
import { KIT_FORM_UID, SOCIALS } from './site-data';

// The one home for social links: the "Stay close" section (free first
// chapter + socials), then the footer with the remaining links.
// Every page uses this. The private Velvet Letter page passes
// stayClose={false} (its readers already have the book).
const SOCIAL_LINKS = [
  { label: 'Instagram', href: SOCIALS.instagram },
  { label: 'TikTok', href: SOCIALS.tiktok },
  { label: 'X', href: SOCIALS.x },
  { label: 'Facebook', href: SOCIALS.facebook },
  { label: 'LinkedIn', href: SOCIALS.linkedin },
];

function StayClose() {
  return (
    <section id="letter" className="capture chapter-contact stay-close">
      <span id="stay-close" className="anchor" aria-hidden="true" />
      <div className="wrap text-wrap">
        <div className="eyebrow">Stay close</div>
        <h2>Read the first chapter — free.</h2>
        <p className="lead">Before the velvet ropes. Before the headlines. The real story. I’ll send the opening pages straight to your inbox — and if it sounds like something you’ve lived too, you’re exactly who I wrote it for.</p>
        <KitInlineForm uid={KIT_FORM_UID} />
        <ul className="stay-socials" aria-label="Follow Jen">
          {SOCIAL_LINKS.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="signup-banner">
        <picture>
          <source media="(max-width: 700px)" srcSet="/assets/first-chapter-banner-mobile.jpg?v=8" />
          <img
            src="/assets/first-chapter-banner.jpg?v=7"
            alt="Jen as a girl, beside her black-and-white glamour portrait"
            width="2048"
            height="633"
            loading="lazy"
          />
        </picture>
      </div>
    </section>
  );
}

export default function SiteFooter({ stayClose = true, homeHref = '/' }) {
  const home = homeHref.replace(/\/$/, '');
  return (
    <>
      {stayClose ? <StayClose /> : null}
      <footer>
        <div className="wrap">
          <div className="foot-mono">JA</div>
          <nav className="foot-links" aria-label="More">
            <a href={`${home}/media#speaking`}>Speaking</a>
            <a href={`${home}/quotes`}>Quotes</a>
            <a href={`${home}/sponsors`}>Sponsors</a>
            <a href={`${home}/contact`}>Contact</a>
            <a href={stayClose ? '#letter' : `${home}/#letter`}>Free First Chapter</a>
            <a href={`${home}/about#forever-angels`}>The Forever Angels</a>
          </nav>
          <p className="foot-meta">
            © 2026 Jen Archuleta. Author of <em>Beyond the Velvet Ropes</em>.<br />
            Jennifer Walcott Archuleta.
          </p>
          <p className="foot-meta">
            <a href={`${home}/privacy`}>Privacy Policy</a> · <a href={`${home}/terms`}>Terms of Service</a> ·{' '}
            <a href={`${home}/shipping-returns`}>Shipping &amp; Returns</a>
          </p>
        </div>
      </footer>
    </>
  );
}
