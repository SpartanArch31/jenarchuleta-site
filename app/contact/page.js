import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import KitInlineForm from '../components/KitInlineForm';
import { BOOKING_EMAIL, CONNECT_LINKS, KIT_FORM_UID } from '../components/site-data';
import '../thank-you/thank-you.css';

export const metadata = {
  title: 'Contact',
  description: 'Email Jen Archuleta about the book, speaking, and press. One address, one form.',
};

export default function ContactPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />
      <main id="main-content">
        <section className="wrap text-wrap thank-contact">
          <p className="eyebrow">Contact</p>
          <h1>Contact Jen Archuleta</h1>
          <p>
            For the book, speaking, press, and interviews, email{' '}
            <a href={`mailto:${BOOKING_EMAIL}`}>{BOOKING_EMAIL}</a>.
          </p>
          <p>Please include your name, your outlet or event, the date, and a little about what you have in mind.</p>
        </section>
        <section id="form" className="wrap thank-stay">
          <h2>Read the first chapter free.</h2>
          <div className="thank-signup">
            <KitInlineForm uid={KIT_FORM_UID} />
          </div>
        </section>
        <section id="social" className="wrap thank-stay">
          <h2>Socials</h2>
          <ul className="stay-socials">
            {CONNECT_LINKS.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
