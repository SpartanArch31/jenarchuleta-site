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
      </div>
    </footer>
  );
}
