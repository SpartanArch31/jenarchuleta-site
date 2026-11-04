import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { BOOKING_EMAIL } from '../components/site-data';
import './contact.css';

export const metadata = {
  title: 'Contact',
  description:
    'Press, interviews, speaking, events, and questions. Email Jen Archuleta.',
};

// One clear contact destination. Jen's site notes (November 4, 2026): a single
// email for everything (BOOKING_EMAIL, the podcast Gmail), and "Jen Archuleta"
// everywhere outside the book itself. Contact is its own link in the menu.
// Social links live on Media (#follow).
export default function ContactPage() {
  const mailto = `mailto:${BOOKING_EMAIL}`;

  return (
    <div className="contact-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap contact-hero">
        {/* A professional headshot, not the puppy photo (Jen, October 27). One of her three
            approved photos; the floral portrait leads on /media. */}
        <img
          className="contact-cover"
          src="/assets/jen-headshot-signature.jpg"
          alt="Jen Archuleta"
          width="1162"
          height="1597"
        />
        <p className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>Let’s connect</p>
        <h1>Jen Archuleta</h1>
        <p className="contact-role">
          Author of Beyond the Velvet Ropes. Host of Unfiltered with Jen Archuleta.
        </p>
      </section>

      <section id="speaking" className="wrap contact-body" style={{ paddingTop: 0 }}>
        <h2>Press, interviews, speaking, and events</h2>
        <p>
          Thank you for reaching out. Whether you are a reporter, an event planner looking for a speaker, or a podcast host who would like to have me on, I would love to hear from you.
        </p>
        <p className="contact-email"><a href={mailto}>{BOOKING_EMAIL}</a></p>
        <p>
          Please include your name, your outlet or event, the date, and a little about what you have in mind. I read every message.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
