import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import CopyTextButton from '../components/CopyTextButton';
import { APPEARANCES, AS_SEEN_IN, FILM, PRESS, cardMeta } from '../../lib/press';
import './media.css';

export const metadata = {
  title: { absolute: 'Media | Jen Walcott Archuleta' },
  description:
    'Interviews, articles, and conversations with Jen Walcott Archuleta, plus a short bio and headshots for press.',
};

// Do not publish FilmFreeway personal details (birth date, height, school, college)
// or a representative's phone number or street address.
// Speaking reel and past events: render nothing until Jen supplies them.
// Boardman News links to the outlet's Facebook post. The article host's
// certificate is expired, so the card does not point at boardmannews.net.
// Direct WKBN video embed is omitted until a video URL exists. The article link stands in.
// Press kit PDF is shown only when public/press/jen-walcott-archuleta-press-kit.pdf exists.
// Book cover download is omitted. public/assets/book-cover.jpg is the compressed
// web image (1000x1500), not a press-resolution file.
// Outlet logos are names until files arrive in public/assets/logos/.

const PRESS_BIO = 'Jennifer Walcott Archuleta is the author of Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love, and the host of the podcast Unfiltered with Jen Archuleta. She grew up in a small town, worked as a makeup artist, and became Playboy’s Miss August 2001. A feature film based on her memoir is in development with Leone Marucci and Steelyard Pictures, and a feature documentary is in development with Mark Andrew Hamer of Crash Cat Media Group. She lives on the West Coast with her husband, former NFL safety Adam Archuleta, their three children, and a houseful of rescue animals.';



// Jen's three approved photos for Media & Speaking (October 27). The floral
// portrait (IMG_5389) is the primary Media image. Unretouched, uncropped.
// `download` is the largest file we have of each; swap in her full-resolution
// originals at the same paths when they arrive.
const HEADSHOTS = [
  {
    src: '/assets/presskit-headshot-floral.jpg',
    download: '/assets/presskit-headshot-floral.jpg',
    fileName: 'Jen-Walcott-Archuleta-floral-portrait.jpg',
    label: 'Floral portrait',
    note: 'Primary photo',
    alt: 'Jen Walcott Archuleta smiling in a floral top',
    width: 1100,
    height: 1370,
  },
  {
    src: '/assets/jen-headshot-signature.jpg',
    download: '/assets/jen-headshot-signature.jpg',
    fileName: 'Jen-Walcott-Archuleta-glamour-portrait.jpg',
    label: 'Glamour portrait',
    alt: 'Jen Walcott Archuleta in a black top',
    width: 1162,
    height: 1597,
  },
  {
    src: '/assets/jen-headshot-bw.jpg',
    download: '/assets/jen-headshot-bw.jpg',
    fileName: 'Jen-Walcott-Archuleta-black-and-white-portrait.jpg',
    label: 'Black-and-white portrait',
    alt: 'Black-and-white editorial portrait of Jen Walcott Archuleta',
    width: 1320,
    height: 1946,
  },
];
const PRIMARY = HEADSHOTS[0];


function publicFileExists(rel) {
  return fs.existsSync(path.join(process.cwd(), 'public', rel));
}


export default function MediaPage() {
  const hasPressKit = publicFileExists('press/jen-walcott-archuleta-press-kit.pdf');

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

      {/* Film and documentary: both IN DEVELOPMENT. Wording lives in lib/press.js. */}
      <section className="wrap text-wrap">
        <h2>Film and documentary</h2>
        <p>{FILM.film}</p>
        <p>{FILM.documentary}</p>
        <p>
          {FILM.partners.map((partner, i) => (
            <span key={partner.href}>
              {i > 0 ? ' · ' : ''}
              <a href={partner.href} target="_blank" rel="noopener noreferrer">{partner.label}</a>
            </span>
          ))}
        </p>
      </section>

      <section className="wrap">
        <h2>Press coverage</h2>
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

      <section className="wrap">
        <h2>Interviews and appearances</h2>
        <div className="media-grid">
          {APPEARANCES.map((item) => (
            <article className="media-card" key={item.href}>
              <p className="eyebrow">{item.outlet}</p>
              <h3>{item.headline}</h3>
              <p className="media-meta">{cardMeta(item)}</p>
              <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">{item.linkLabel}</a>
            </article>
          ))}
        </div>
      </section>

      <section id="speaking" className="wrap text-wrap">
        <h2>Speaking</h2>
        <p>
          I speak about faith, resilience, and starting over. About surviving hard things and rebuilding.
        </p>
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

      <SiteFooter />
    </div>
  );
}
