import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import KitInlineForm from '../components/KitInlineForm';
import CopyTextButton from '../components/CopyTextButton';
import { KIT_FORM_UID, SOCIALS } from '../components/site-data';
import { APPEARANCES, AS_SEEN_IN, FILM, PRESS, cardMeta } from '../../lib/press';
import './media.css';

export const metadata = {
  title: { absolute: 'Media, Jen Archuleta' },
  description:
    'Interviews, articles, and conversations with Jen Archuleta, plus a short bio and headshots for press.',
};

// Film partners are Leone (Steelyard) and Mark (Crash Cat). No FilmFreeway
// link, and no phone number or email for Mark.
// Speaking reel and past events: render nothing until Jen supplies them.
// Boardman News links to the outlet's Facebook post. The article host's
// certificate is expired, so the card does not point at boardmannews.net.
// Direct WKBN video embed is omitted until a video URL exists. The article link stands in.
// Press kit PDF is shown only when public/press/jen-walcott-archuleta-press-kit.pdf exists.
// Book cover download is omitted. public/assets/book-cover.jpg is the compressed
// web image (1000x1500), not a press-resolution file.
// Outlet logos are names until files arrive in public/assets/logos/.

const PRESS_BIO = 'Jen Archuleta is the author of Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love, and the host of the podcast Unfiltered with Jen Archuleta. She grew up in a small town, worked as a makeup artist, and became Playboy’s Miss August 2001. A feature film based on her memoir is in development with Leone Marucci and Steelyard Pictures, and a feature documentary is in development with Mark Andrew Hamer of Crash Cat Media Group. She lives on the West Coast with her husband, former NFL safety Adam Archuleta, their three children, and a houseful of rescue animals.';



// Jen's three headshots for press downloads, in her order and her words
// (November 3): Glamorous (black and white), Candid (floral top), and
// Signature (black top, smiling). Candid is the floral portrait (IMG_5389),
// also the primary Media image at the top of the page and the homepage hero.
// Unretouched, uncropped. `download` is the largest clean file we have of
// each (the copies Jen attached were phone screenshots of these same files).
const HEADSHOTS = [
  {
    src: '/assets/jen-headshot-bw.jpg',
    download: '/assets/jen-headshot-bw.jpg',
    fileName: 'Jen-Walcott-Archuleta-Glamorous.jpg',
    label: 'Glamorous',
    alt: 'Black-and-white portrait of Jen Archuleta',
    width: 1320,
    height: 1946,
  },
  {
    src: '/assets/presskit-headshot-floral.jpg',
    download: '/assets/presskit-headshot-floral.jpg',
    fileName: 'Jen-Walcott-Archuleta-Candid.jpg',
    label: 'Candid',
    note: 'Primary photo',
    alt: 'Jen Archuleta smiling in a floral top',
    width: 1100,
    height: 1370,
  },
  {
    src: '/assets/jen-headshot-signature.jpg',
    download: '/assets/jen-headshot-signature.jpg',
    fileName: 'Jen-Walcott-Archuleta-Signature.jpg',
    label: 'Signature',
    alt: 'Jen Archuleta smiling in a black top',
    width: 1162,
    height: 1597,
  },
];
const PRIMARY = HEADSHOTS.find((shot) => shot.label === 'Candid');

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

const MEDIA_SOCIALS = [
  { label: 'LinkedIn', href: SOCIALS.linkedin },
  { label: 'X', href: 'https://x.com/jenniferwalcott' },
  { label: 'TikTok', href: SOCIALS.tiktok },
];


function publicFileExists(rel) {
  return fs.existsSync(path.join(process.cwd(), 'public', rel));
}


export default function MediaPage() {
  const hasPressKit = publicFileExists('press/jen-walcott-archuleta-press-kit.pdf');
  const tv = APPEARANCES.filter((item) => item.kind === 'TV');
  const otherAppearances = APPEARANCES.filter((item) => item.kind !== 'TV');

  return (
    <div className="media-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap media-hero">
        <div className="media-hero-text">
          <h1>Media</h1>
          <p className="media-lead">
            Thank you for your interest in my story. Here you will find the interviews, articles, and conversations around Beyond the Velvet Ropes and my podcast. If you would like me on your show, at your event, or in your pages, I would love to hear from you.
          </p>
          <div className="media-actions">
            <a className="btn btn-primary" href="/contact">Contact for press and speaking</a>
            <a className="btn btn-ghost" href="#press-kit">Press kit and photos</a>
          </div>
        </div>
        <figure className="media-hero-photo">
          <Image
            src={PRIMARY.src}
            alt={PRIMARY.alt}
            width={PRIMARY.width}
            height={PRIMARY.height}
            sizes="(max-width: 860px) 88vw, 440px"
            quality={88}
            priority
          />
        </figure>
      </section>

      {/* Film and documentary: both IN DEVELOPMENT. Wording lives in lib/press.js.
          This is the ONE home for the film news; other pages link to /media#film.
          Leone and Mark only. No FilmFreeway, and no contact details for Mark. */}
      <section id="film" className="wrap text-wrap">
        <h2>Film and documentary</h2>
        <p>{FILM.film}</p>
        <p>{FILM.documentary}</p>
        <p className="media-film-links">
          {FILM.partners.map((partner, index) => (
            <span key={partner.href}>
              {index > 0 ? ' · ' : null}
              <a href={partner.href} target="_blank" rel="noopener noreferrer">{partner.label}</a>
            </span>
          ))}
        </p>
      </section>

      <section id="press" className="wrap">
        <h2>Press articles</h2>
        <div className="media-grid">
          {PRESS.map((item) => (
            <article className="media-card" key={item.href}>
              <p className="eyebrow">{item.outlet}</p>
              <h3>{item.headline}</h3>
              <p className="media-meta">{cardMeta(item)}</p>
              <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">Read</a>
            </article>
          ))}
        </div>
      </section>

      <section id="tv" className="wrap">
        <h2>TV appearances</h2>
        <div className="media-grid">
          {tv.map((item) => (
            <article className="media-card" key={item.href}>
              <p className="eyebrow">{item.outlet}</p>
              <h3>{item.headline}</h3>
              <p className="media-meta">{cardMeta(item)}</p>
              <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">{item.linkLabel}</a>
            </article>
          ))}
        </div>
      </section>

      {otherAppearances.length ? (
        <section id="interviews" className="wrap">
          <h2>Interviews and appearances</h2>
          <div className="media-grid">
            {otherAppearances.map((item) => (
              <article className="media-card" key={item.href}>
                <p className="eyebrow">{item.outlet}</p>
                <h3>{item.headline}</h3>
                <p className="media-meta">{cardMeta(item)}</p>
                <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">{item.linkLabel}</a>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section id="social" className="wrap">
        <h2>Social</h2>
        <ul className="media-socials">
          {MEDIA_SOCIALS.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
            </li>
          ))}
        </ul>
      </section>

      <section id="speaking" className="wrap text-wrap">
        <h2>Speaking</h2>
        <p>
          I speak about faith, resilience, and starting over, and about surviving hard things and rebuilding. I came from humble beginnings, barely finished school, and thought I was ugly, yet I became a Playboy Playmate, wrote a book, and built a stable life. Today I give back as a former CASA volunteer, a Childhelp volunteer, founder of The Forever Angels, and a helper to animals and rescues, and I share my story to show people they can rise too.
        </p>
        <h3 className="speak-topics-title">Topics</h3>
        <ol className="speak-topics">
          {SPEAKING_TOPICS.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ol>
        <p>
          <a className="btn btn-primary" href="/contact">Invite me to speak</a>
        </p>
      </section>

      <section id="press-kit" className="wrap">
        <h2>Press kit</h2>
        <div className="bio-block">
          <div className="bio-head">
            <h3>Short bio</h3>
            <CopyTextButton text={PRESS_BIO} label="Copy" />
          </div>
          <p>{PRESS_BIO}</p>
        </div>
        <h3 className="headshot-title">Photos for press and speaking</h3>
        <p className="headshot-note">Approved for media and event use. Please do not crop through the face or retouch.</p>
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
                Download ({shot.width} × {shot.height})
              </a>
            </figure>
          ))}
        </div>
        <div className="media-actions">
          {hasPressKit ? (
            <a className="btn btn-ghost btn-sm" href="/press/jen-walcott-archuleta-press-kit.pdf" download>
              Press kit PDF
            </a>
          ) : null}
        </div>
      </section>

      <section className="wrap center">
        <h2>As seen in</h2>
        <ul className="media-logos">
          {AS_SEEN_IN.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <p className="media-lead" style={{ marginTop: '28px' }}>
          For press, interviews, and speaking: <a href="/contact">contact me here</a>.
        </p>
      </section>

      <section id="letter" className="wrap text-wrap media-signup">
        <h2>Read the first chapter free.</h2>
        <KitInlineForm uid={KIT_FORM_UID} />
      </section>

      <SiteFooter stayClose={false} />
    </div>
  );
}
