import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import KitInlineForm from '../components/KitInlineForm';
import CopyTextButton from '../components/CopyTextButton';
import MediaCats from './MediaCats';
import { BOOKING_EMAIL, CONNECT_LINKS, KIT_FORM_UID } from '../components/site-data';
import { APPEARANCES, FILM, PRESS, cardMeta } from '../../lib/press';
import './media.css';

export const metadata = {
  title: { absolute: 'Media & Contact, Jen Archuleta' },
  description:
    'Press, television, the author bio, social links, the newsletter, and how to reach Jen Archuleta.',
};

// FilmFreeway sits with Leone and Mark. Never publish a representative's
// phone number or email. The newsletter form is the only signup on the site.
// /contact redirects here (#contact).

const PRESS_BIO = 'Jen Archuleta is the author of Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love, and the host of the podcast Unfiltered with Jen Archuleta. She grew up in a small town, worked as a makeup artist, and became Playboy’s Miss August 2001. A feature film based on her memoir is in development with Leone Marucci and Steelyard Pictures, and a feature documentary is in development with Mark Andrew Hamer of Crash Cat Media Group. She lives on the West Coast with her husband, former NFL safety Adam Archuleta, their three children, and a houseful of rescue animals.';

const HEADSHOTS = [
  {
    src: '/assets/jen-headshot-bw.jpg',
    download: '/assets/jen-headshot-bw.jpg',
    fileName: 'Jen-Archuleta-Glamorous.jpg',
    label: 'Glamorous',
    alt: 'Black-and-white portrait of Jen Archuleta',
    width: 1320,
    height: 1946,
  },
  {
    src: '/assets/presskit-headshot-floral.jpg',
    download: '/assets/presskit-headshot-floral.jpg',
    fileName: 'Jen-Archuleta-Candid.jpg',
    label: 'Candid',
    note: 'Primary photo',
    alt: 'Jen Archuleta smiling in a floral top',
    width: 1100,
    height: 1370,
  },
  {
    src: '/assets/jen-headshot-signature.jpg',
    download: '/assets/jen-headshot-signature.jpg',
    fileName: 'Jen-Archuleta-Signature.jpg',
    label: 'Signature',
    alt: 'Jen Archuleta smiling in a black top',
    width: 1162,
    height: 1597,
  },
];

const SPEAKING_TOPICS = [
  '1) Small-town roots and big dreams',
  '2) Work ethic and grit',
  '3) Finding your voice after childhood fear',
  '4) Healing from assault, trauma, and grief',
  '5) Bullying, gossip, and self-worth',
  '6) Drugs and the wake-up call',
  '7) Body image and feeling ugly',
  '8) Surviving domestic violence',
  '9) Rebuilding alone after abuse',
  '10) Faith, prayer, and second chances',
  '11) Playboy and the power of sisterhood',
  '12) Choosing real love and marriage',
  '13) Pregnancy loss, natural childbirth, and motherhood',
  '14) Moving from fame to purpose and peace',
  '15) Giving back through advocacy and adoption',
  '16) The hidden cost of fame',
  '17) Finding light, grace, and gratitude',
  '18) From humble beginnings to financially stable',
  '19) Barely finishing school, still writing a book',
  '20) Advocating for kids with CASA and Childhelp',
  '21) Founding The Forever Angels',
  '22) Helping animals and rescues',
];

function publicFileExists(rel) {
  return fs.existsSync(path.join(process.cwd(), 'public', rel));
}

function Cards({ items }) {
  return (
    <div className="media-grid">
      {items.map((item) => (
        <article className="media-card" key={item.href}>
          <p className="eyebrow">{item.outlet}</p>
          <h3>{item.headline}</h3>
          <p className="media-meta">{cardMeta(item)}</p>
          <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">{item.linkLabel || 'Read'}</a>
        </article>
      ))}
    </div>
  );
}

export default function MediaPage() {
  const hasPressKit = publicFileExists('press/jen-walcott-archuleta-press-kit.pdf');
  const tv = APPEARANCES.filter((item) => item.kind === 'TV');
  const more = APPEARANCES.filter((item) => item.kind !== 'TV');

  return (
    <div className="media-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap media-hero media-intro">
        <div>
          <h1>Media & Contact</h1>
          <p className="media-lead">Press, socials, and how to reach me.</p>
          <MediaCats />
        </div>
      </section>

      <section id="media" className="wrap">
        <h2>Media</h2>

        <div id="press">
          <h3>Press</h3>
          <Cards items={PRESS} />
        </div>

        <div id="tv" className="media-block">
          <h3>TV</h3>
          <Cards items={tv} />
        </div>

        {more.length ? (
          <div id="interviews" className="media-block">
            <h3>More appearances</h3>
            <Cards items={more} />
          </div>
        ) : null}

        <div id="press-kit" className="media-block">
          <div className="bio-block">
            <div className="bio-head">
              <h3>Author bio</h3>
              <CopyTextButton text={PRESS_BIO} label="Copy" />
            </div>
            <p>{PRESS_BIO}</p>
          </div>
          <h3 className="headshot-title">Photos for press</h3>
          <div className="headshot-grid">
            {HEADSHOTS.map((shot) => (
              <figure key={shot.src}>
                <div className="headshot-frame">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 760px) 88vw, 360px"
                    quality={88}
                  />
                </div>
                <figcaption>
                  {shot.label}
                  {shot.note ? <span className="headshot-tag">{shot.note}</span> : null}
                </figcaption>
                <a className="btn btn-ghost btn-sm" href={shot.download} download={shot.fileName}>
                  Download
                </a>
              </figure>
            ))}
          </div>
          {hasPressKit ? (
            <p>
              <a className="btn btn-ghost btn-sm" href="/press/jen-walcott-archuleta-press-kit.pdf" download>
                Press kit PDF
              </a>
            </p>
          ) : null}
        </div>

        <div id="film" className="media-block text-wrap" style={{ paddingInline: 0 }}>
          <h3>Film and documentary</h3>
          <p>{FILM.film}</p>
          <p>{FILM.documentary}</p>
          <p className="media-film-links">
            {FILM.partners.map((partner) => (
              <span key={partner.href}>
                <a href={partner.href} target="_blank" rel="noopener noreferrer">{partner.label}</a>
                {' · '}
              </span>
            ))}
            FilmFreeway:{' '}
            <a href={FILM.filmfreeway.href} target="_blank" rel="noopener noreferrer">{FILM.filmfreeway.label}</a>
          </p>
        </div>

        <div id="speaking" className="media-block">
          <h3>Speaking</h3>
          <p>
            I speak about faith, resilience, and starting over, and about surviving hard things and rebuilding. I came from humble beginnings, barely finished school, and thought I was ugly, yet I became a Playboy Playmate, wrote a book, and built a stable life. Today I give back as a former CASA volunteer, a Childhelp volunteer, founder of The Forever Angels, and a helper to animals and rescues, and I share my story to show people they can rise too.
          </p>
          <p><a className="btn btn-primary" href="#contact">Invite me to speak</a></p>
          <ol className="speak-topics">
            {SPEAKING_TOPICS.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ol>
        </div>
      </section>

      <section id="social" className="wrap">
        <span id="letter" className="anchor" aria-hidden="true" />
        <h2>Social media and sign up</h2>
        <ul className="media-socials">
          {CONNECT_LINKS.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="media-signup">
          <h3>Read the first chapter free.</h3>
          <KitInlineForm uid={KIT_FORM_UID} />
        </div>
      </section>

      <section id="contact" className="wrap text-wrap">
        <h2>Contact me</h2>
        <p>
          For press, interviews, speaking, and events, email{' '}
          <a href={`mailto:${BOOKING_EMAIL}`}>{BOOKING_EMAIL}</a>.
        </p>
        <p>Please include your name, your outlet or event, the date, and a little about what you have in mind.</p>
      </section>

      <SiteFooter />
    </div>
  );
}
