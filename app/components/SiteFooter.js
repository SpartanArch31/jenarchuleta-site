import { KIT_FREE_CHAPTER_URL, SOCIALS } from './site-data';

// Light-register footer (homepage / podcast / journal).
export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-mono">JA</div>
        <div className="foot-links">
          <a href={SOCIALS.instagram}>Instagram</a>
          <a href={SOCIALS.x}>X</a>
          <a href={SOCIALS.foreverAngels}>The Forever Angels</a>
          <a href={KIT_FREE_CHAPTER_URL}>Newsletter</a>
        </div>
        <p className="foot-meta">
          © 2026 Jen Archuleta. Author of <em>Beyond the Velvet Ropes</em>.<br />
          Jennifer Walcott Archuleta.
        </p>
        <p className="foot-meta">
          <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a> ·{' '}
          <a href="/shipping-returns">Shipping &amp; Returns</a>
        </p>
      </div>
    </footer>
  );
}
