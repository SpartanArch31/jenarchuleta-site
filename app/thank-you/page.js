import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import KitInlineForm from '../components/KitInlineForm';
import { BOOKING_EMAIL, CONNECT_LINKS, KIT_FORM_UID } from '../components/site-data';
import { QUOTES } from '../quotes/quotes-data';
import './thank-you.css';

export const metadata = {
  title: 'Thank You',
  description: 'Thank you for supporting Jen Archuleta and Beyond the Velvet Ropes.',
};

export default function ThankYouPage() {
  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <section id="main-content" className="wrap hero">
        <div className="hero-copy">
          <h1>Thank you</h1>
          <p>
            Thank you for supporting me and this book. So many of you have reached out to tell me you could relate, that it changed you, or that it inspired you. Thank you for letting my honesty matter.
          </p>
        </div>
        <div className="hero-media">
          <div className="portrait hero-frame">
            <img src="/assets/jen-joy.jpg" alt="Jen Archuleta smiling" width="841" height="1960" />
          </div>
        </div>
      </section>
      <section id="quotes" className="wrap thank-quotes" aria-labelledby="thank-quotes-heading">
        <h2 id="thank-quotes-heading">Quotes</h2>
        <div className="thank-quotes-list">
          {QUOTES.map((quote) => (
            <figure key={quote.text}>
              <blockquote>
                <p>{quote.text}</p>
              </blockquote>
              {quote.source ? <figcaption>{quote.source}</figcaption> : null}
            </figure>
          ))}
        </div>
      </section>
      <section id="stay" className="wrap thank-stay">
        <span id="social" className="anchor" aria-hidden="true" />
        <span id="letter" className="anchor" aria-hidden="true" />
        <h2>Stay in touch</h2>
        <ul className="stay-socials">
          {CONNECT_LINKS.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="thank-signup">
          <h3>Read the first chapter free.</h3>
          <KitInlineForm uid={KIT_FORM_UID} />
        </div>
      </section>
      <section id="contact" className="wrap text-wrap thank-contact">
        <h2>Contact me</h2>
        <p>
          For press, interviews, speaking, and events, email{' '}
          <a href={`mailto:${BOOKING_EMAIL}`}>{BOOKING_EMAIL}</a>.
        </p>
        <p>Please include your name, your outlet or event, the date, and a little about what you have in mind.</p>
      </section>
      <SiteFooter />
    </>
  );
}
