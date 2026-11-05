import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import CopyTextButton from '../components/CopyTextButton';
import MediaCats from './MediaCats';
import { APPEARANCES, FILM, PRESS, cardMeta } from '../../lib/press';
import './media.css';

export const metadata = {
  title: { absolute: 'Press, Jen Archuleta' },
  description:
    'Press, television, film, and speaking.',
};

// FilmFreeway sits with Leone and Mark. Never publish a representative's
// phone number or email. Signup and contact live on Thank You.

const PRESS_BIO = 'Jen Archuleta is the author of Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love, and the host of the podcast Unfiltered with Jen Archuleta. She grew up in a small town, worked as a makeup artist, and became Playboy’s Miss August 2001. She lives on the West Coast with her husband, former NFL safety Adam Archuleta, their three children, and a houseful of rescue animals.';

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
  '23) Hospice work with my TDI therapy dog',
  '24) Being the best mom you can: traditions, morals, values, and putting God in your kids’ hearts',
  '25) Marriage, discipline, and losing weight',
  '26) Forgiveness and letting go of the burdens you carry',
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
          <h1>Press</h1>
          <p className="media-lead">Articles, television, film, speaking, and how to reach me.</p>
          <MediaCats />
        </div>
      </section>

      <section id="press" className="wrap">
        <h2>Press</h2>

        <div>
          <h3>Articles</h3>
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
            I speak about faith, resilience, and starting over, and about surviving hard things and rebuilding. I came from humble beginnings, barely finished school, and thought I was ugly, yet I became a Playboy Playmate, wrote a book, and built a stable life. Today I give back as a former CASA volunteer, a Childhelp volunteer, a hospice volunteer with my TDI therapy dog, founder of The Forever Angels, and a helper to animals and rescues, and I share my story to show people they can rise too.
          </p>
          <p><a className="btn btn-primary" href="/thank-you#contact">Invite me to speak</a></p>
          <ol className="speak-topics">
            {SPEAKING_TOPICS.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ol>
        </div>
      </section>

      <section id="forever-angels" className="wrap">
        <div className="text-wrap">
          <h2>Want to get involved with me?</h2>
          <p>
            I co-founded The Forever Angels with Allison Kiefer. We help families through referrals and trusted community partners, with fairness and dignity. A family may receive support once a year.
          </p>
        </div>
        <div className="give-back">
          <figure>
            <img src="/assets/forever-angels-tree.jpg" alt="Jen and her Forever Angels co-founder at an angel tree event" width="1200" height="1852" />
            <figcaption>The Forever Angels angel tree</figcaption>
          </figure>
          <figure>
            <img src="/assets/casa-sworn-in.jpg" alt="Jen Archuleta raising her hand while being sworn in" width="933" height="745" />
            <figcaption>Getting sworn in as a CASA volunteer</figcaption>
          </figure>
          <figure>
            <img src="/assets/turbo-ronald-mcdonald.jpg" alt="Jen with her therapy dog Turbo at a group visit" width="1158" height="1164" />
            <figcaption>Turbo doing TDI therapy dog work for Ronald McDonald House</figcaption>
          </figure>
          <figure>
            <img src="/assets/childhelp-wings.jpg" alt="Jen and Adam Archuleta on stage at Childhelp WINGS" width="1200" height="1563" />
            <figcaption>Childhelp WINGS</figcaption>
          </figure>
        </div>
        <p className="text-wrap">
          I have worked with Childhelp for more than eight years. I have chaired the annual fashion show fundraiser three times, including the 2022 A Day in Wonderland event, which raised nearly $325,000 for Childhelp’s programs.
        </p>
        <p className="text-wrap">
          <a href="https://theforeverangels.com/our-founders/" target="_blank" rel="noopener noreferrer">The Forever Angels</a>
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
