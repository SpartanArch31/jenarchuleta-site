import { PODCAST, SOCIALS } from './site-data';

// Light-register footer (homepage / podcast / journal).
export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-mono">JA</div>
        <div className="foot-links">
          <a href={SOCIALS.instagram}>Instagram</a>
          <a href={SOCIALS.x}>X</a>
          <a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="/forever-angels">The Forever Angels</a>
          <a href="/#letter">Newsletter</a>
          <a href="/quotes">Quotes</a>
          <a href="/velvet">The Velvet Letter</a>
          <a href={PODCAST.buzzsprout} target="_blank" rel="noopener noreferrer">Podcast on Buzzsprout</a>
          <a href={PODCAST.youtube} target="_blank" rel="noopener noreferrer">Podcast on YouTube</a>
          <a href="/media">Media</a>
          <a href="/contact">Contact</a>
        </div>
        <p className="foot-meta">
          © 2026 Jen Archuleta. Author of <em>Beyond the Velvet Ropes</em>.<br />
          Jennifer Walcott Archuleta.
        </p>
        <p className="foot-meta">
          The passcode printed in the back of the book, under the QR code, opens The Velvet Letter. Velvet Circle membership includes that passcode.
        </p>
        <p className="foot-meta">
          <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a> ·{' '}
          <a href="/shipping-returns">Shipping &amp; Returns</a>
        </p>
      </div>
    </footer>
  );
}
