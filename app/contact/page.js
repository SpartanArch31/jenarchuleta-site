import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { BOOKING_EMAIL } from '../components/site-data';
import './contact.css';

export const metadata = {
  title: { absolute: 'Contact | Jen Walcott Archuleta' },
  description:
    'Press, interviews, speaking, and events. Email Jen Walcott Archuleta.',
};

// One clear contact destination for press, interviews, speaking, and events.
// Social links live in the "Stay close" section at the bottom of every page.
export default function ContactPage() {
  const mailto = `mailto:${BOOKING_EMAIL}`;

  return (
    <div className="contact-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap contact-hero">
        <img
          className="contact-cover"
          src="/assets/jen-fun.jpg"
          alt="Jen Walcott Archuleta with friends"
          width="1320"
          height="1756"
        />
        <p className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>Let’s connect</p>
        <h1>Jen Walcott Archuleta</h1>
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
