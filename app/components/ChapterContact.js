import KitInlineForm from './KitInlineForm';
import { BOOKING_EMAIL, KIT_FORM_UID } from './site-data';

// One block: the free chapter signup and a way to book Jen to speak.
// Colors are the cream palette even when a parent page is in the dark register.
export default function ChapterContact() {
  return (
    <section id="letter" className="capture chapter-contact">
      <div className="wrap text-wrap">
        <div className="eyebrow">Stay close</div>
        <h2>Read the first chapter — free.</h2>
        <p className="lead">Before the velvet ropes. Before the headlines. The real story. I’ll send the opening pages straight to your inbox — and if it sounds like something you’ve lived too, you’re exactly who I wrote it for.</p>
        <KitInlineForm uid={KIT_FORM_UID} />
        <div className="chapter-speak">
          <h3>Book me to speak</h3>
          <p>
            For events, interviews, and speaking, write me. Tell me your name, the date, and what you have in mind. I read every message.
          </p>
          <p>
            <a href="/contact#speaking" className="btn btn-ghost">Contact me</a>
            {' '}
            <a href={`mailto:${BOOKING_EMAIL}`} className="btn btn-ghost">Email {BOOKING_EMAIL}</a>
          </p>
        </div>
      </div>
      <div className="signup-banner">
        <picture>
          <source media="(max-width: 700px)" srcSet="/assets/first-chapter-banner-mobile.jpg?v=8" />
          <img
            src="/assets/first-chapter-banner.jpg?v=7"
            alt="Jen as a girl, beside her black-and-white glamour portrait"
            width="2048"
            height="633"
          />
        </picture>
      </div>
    </section>
  );
}
