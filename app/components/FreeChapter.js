import KitInlineForm from './KitInlineForm';
import { KIT_FORM_UID } from './site-data';

// The free first chapter signup. ONE place on the site: the Book page (Jen's
// site notes, November 4, 2026). Other pages link to /book#free-chapter; none
// of them carries its own form. (It used to sit at the bottom of every page as
// "Stay close"; the social links from that block now live on Media, #follow.)
export default function FreeChapter() {
  return (
    <section id="free-chapter" className="capture chapter-contact stay-close">
      <span id="letter" className="anchor" aria-hidden="true" />
      <div className="wrap text-wrap">
        <div className="eyebrow">Free first chapter</div>
        <h2>Read the first chapter free.</h2>
        <p className="lead">Before the velvet ropes. Before the headlines. The real story. I’ll send the opening pages straight to your inbox, and if it sounds like something you’ve lived too, you’re exactly who I wrote it for.</p>
        <KitInlineForm uid={KIT_FORM_UID} />
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
