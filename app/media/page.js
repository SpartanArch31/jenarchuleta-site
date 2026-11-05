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
  title: { absolute: 'Press: Beyond the Velvet Ropes, Jen Archuleta' },
  description:
    'Articles, TV and appearances for Beyond the Velvet Ropes.',
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
    width: 1151,
    height: 1597,
  },
];

// Speaking (Jen, Nov 5): her 26 topics, gathered into five talks so the section
// flows for an event planner. Every one of the 26 is still covered.
const SPEAKING_INTRO = "I’m a wife, a mom of three, and a woman of faith, with a house full of rescues. Giving back is a big part of my life. I co-founded The Forever Angels, I volunteer with Childhelp and in hospice with my TDI therapy dog, and I’ve been a CASA volunteer. Getting here took a lot. I came from humble beginnings, barely finished school, and thought I was ugly. I became a Playboy Playmate, came through some very hard years, and wrote a book about all of it. When I speak, I tell the hard parts honestly, and then I tell you about the good life that came after, so you know you can rise too. I’d be honored to share it with your group.";

const SPEAKING_TALKS = [
  {
    title: "Real Love, Real Family",
    text: "Choosing real love changed everything for me. This talk is about marriage, discipline, and losing weight. It’s about pregnancy loss, natural childbirth, and becoming a mom. And it’s about trying to be the best mom I can: traditions, morals, values, and putting God in my kids’ hearts.",
  },
  {
    title: "Roots Through Concrete",
    text: "I grew up in a small town with big dreams. I got bullied, people gossiped, and I thought I was ugly. I barely finished school. Hard work and plain grit carried me from humble beginnings to a financially stable life and a book with my name on it. This one is about knowing your worth, wherever you start.",
  },
  {
    title: "What Fame Couldn’t Give Me",
    text: "Playboy gave me a sisterhood I still treasure. It also showed me what fame really costs. This talk is about trading the spotlight for purpose and peace, and finding light, grace, and gratitude in ordinary days.",
  },
  {
    title: "You Can Rewrite Your Life",
    text: "This is the hardest part of my story, and I tell it gently. I was a scared kid who had to find her voice. I talk about assault and grief, about drugs and my wake-up call, and about surviving domestic violence and rebuilding on my own. Prayer and second chances got me through. Forgiveness let me finally set those burdens down.",
  },
  {
    title: "Giving Back Is the Good Part",
    text: "Some of my favorite days are spent helping someone else. I talk about advocating for kids with CASA and Childhelp, about advocacy and adoption, and about co-founding The Forever Angels. I talk about helping animals and rescues, and about hospice work with my TDI therapy dog. This is where my story lands, and it’s the best part.",
  },
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
          {/* MEDIA-10: the link stretches over the whole card (see media.css). */}
          <a
            className="text-link"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.linkLabel || 'Read'} on ${item.outlet} (opens in new tab)`}
          >
            {item.linkLabel || 'Read'}<span aria-hidden="true"> ↗</span>
          </a>
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
          <h1>Press: Beyond the Velvet Ropes</h1>
          <p className="media-lead">Articles, TV and appearances for Beyond the Velvet Ropes</p>
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

        <div id="film" className="media-block">
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
          <p>{SPEAKING_INTRO}</p>
          <p><a className="btn btn-primary" href="/thank-you#contact">Invite me to speak</a></p>
          <div className="speak-talks">
            {SPEAKING_TALKS.map((talk) => (
              <div key={talk.title} className="speak-talk">
                <h4>{talk.title}</h4>
                <p>{talk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="forever-angels" className="wrap">
        <div>
          <h2>Want to get involved with me?</h2>
          <p>
            I co-founded The Forever Angels with Allison Kiefer. We help people through social workers and our trusted community partners. We help veterans, families in need, the elderly in hospice, and animals. Turbo has worked with Ronald McDonald Children’s Hospitals and veterans hospitals, and he has also worked in hospice.
          </p>
        </div>
        <div className="give-back">
          <figure>
            <img src="/assets/forever-angels-tree.jpg" alt="Jen and her Forever Angels co-founder at an angel tree event" width="1200" height="1852" />
            <figcaption>The Forever Angels</figcaption>
          </figure>
          <figure>
            <img src="/assets/casa-sworn-in.jpg" alt="Jen Archuleta raising her hand while being sworn in as a CASA volunteer" width="933" height="960" />
            <figcaption>Getting sworn in as a CASA volunteer</figcaption>
          </figure>
          <figure>
            <img src="/assets/turbo-ronald-mcdonald.jpg" alt="Jen with her therapy dog Turbo at a group visit" width="1158" height="1164" />
            <figcaption>Turbo doing TDI therapy dog work for Ronald McDonald House</figcaption>
          </figure>
          <figure>
            <img src="/assets/childhelp-wings-podium.jpg" alt="Jen Archuleta speaking at the Childhelp WINGS podium" width="1179" height="1343" />
            <figcaption>Speaking at Childhelp WINGS</figcaption>
          </figure>
        </div>
        <p>
          I have worked with Childhelp for more than eight years. I have chaired the annual fashion show fundraiser three times, including the 2022 A Day in Wonderland event, which raised nearly $325,000 for Childhelp’s programs.
        </p>
        <p>
          <a href="https://theforeverangels.com/our-founders/" target="_blank" rel="noopener noreferrer">The Forever Angels</a>
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
