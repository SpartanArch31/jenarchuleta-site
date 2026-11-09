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
  title: { absolute: 'Book Press & Interviews, Jen Archuleta' },
  description:
    'Media and press for Beyond the Velvet Ropes: the book, the feature film, and the documentary.',
};

// FilmFreeway sits with Leone and Mark. Never publish a representative's
// phone number or email. Signup and contact live on Thank You.

// Jen, Nov 6 email: her new press-kit bio, word for word, in her four paragraphs.
const PRESS_BIO_PARAGRAPHS = [
  'Jen Archuleta, formerly known as Jennifer Walcott, is the author of Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love and host of Unfiltered with Jen Archuleta.',
  'Originally from a small town in Ohio, she moved to Los Angeles to pursue her dreams, working as a makeup artist in Hollywood before becoming Playboy’s Miss August 2001.',
  'Throughout her life, Jen has dedicated much of her time to volunteering and helping others. She co-founded The Forever Angels, a nonprofit focused on supporting children and families, and has been actively involved with organizations including Childhelp.',
  'Today, she is a wife, mother of three, animal rescue advocate, author, and storyteller. She shares her life with her husband, former NFL player Adam Archuleta, their children, and a houseful of rescue animals.',
];
const PRESS_BIO = PRESS_BIO_PARAGRAPHS.join('\n\n');

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

// Speaking (Jen, Nov 5; four talk descriptions rewritten by Jen Nov 6 so none repeat): her 26 topics, gathered into five talks so the section
// flows for an event planner. Every one of the 26 is still covered.
const SPEAKING_INTRO = "I’m a wife, a mom of three, and a woman of faith, with a house full of rescues. Giving back is a big part of my life. I co-founded The Forever Angels, I volunteer with Childhelp and in hospice with my TDI therapy dog, and I’ve been a CASA volunteer. Getting here took a lot. I came from humble beginnings, barely finished school, and thought I was ugly. I became a Playboy Playmate, came through some very hard years, and wrote a book about all of it. When I speak, I tell the hard parts honestly, and then I tell you about the good life that came after, so you know you can rise too. I’d be honored to share it with your group.";

const SPEAKING_TALKS = [
  {
    title: "Real Love, Real Family",
    text: "Choosing real love changed everything for me. This talk is about marriage, discipline, and losing weight. It’s about pregnancy loss, natural childbirth, and becoming a mom. And it’s about trying to be the best mom I can: traditions, morals, values, and putting God in my kids’ hearts.",
  },
  {
    title: "Roots Through Concrete",
    text: "I grew up in a small town with big dreams. I was bullied, surrounded by gossip, and convinced I wasn’t enough. I barely finished school, but hard work and grit carried me farther than I ever imagined. This talk is about knowing your worth, no matter where you begin.",
  },
  {
    title: "What Fame Couldn’t Give Me",
    text: "Playboy gave me lifelong friendships and opened the door to a world I never expected to enter. It also taught me that attention and success cannot give you peace. This talk is about what remains after the spotlight fades: faith, family, purpose, and gratitude.",
  },
  {
    title: "You Can Rewrite Your Life",
    text: "I gently share the hardest parts of my story, including childhood assault, grief, drugs, my wake-up call, and surviving domestic violence. Faith, second chances, and forgiveness helped me rebuild. This talk is about reclaiming your voice and creating a life your past does not control.",
  },
  {
    title: "Giving Back Is the Good Part",
    text: "Giving back is where my story finds purpose. I share how service helped me turn difficult experiences into action through CASA, Childhelp, hospice work, animal rescue, and co-founding The Forever Angels. This talk is about using what you have lived through to help someone else.",
  },
];

const GIVE_BACK = [
  {
    src: '/assets/forever-angels-tree.jpg',
    alt: 'Jen and her Forever Angels co-founder at an angel tree event',
    caption: 'The Forever Angels',
    width: 1200,
    height: 1852,
  },
  {
    src: '/assets/turbo-ronald-mcdonald.jpg',
    alt: 'Jen with her therapy dog Turbo at a group visit',
    caption: 'Turbo doing TDI therapy dog work for Ronald McDonald House',
    width: 1158,
    height: 1164,
  },
  {
    src: '/assets/childhelp-wings-podium.jpg',
    alt: 'Jen Archuleta speaking at the Childhelp WINGS podium',
    caption: 'Speaking at Childhelp WINGS',
    width: 1179,
    height: 1343,
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

  return (
    <div className="media-page">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />

      <main id="main-content">
      <section className="wrap media-hero media-intro">
        <div>
          <h1>Book Press &amp; Interviews</h1>
          <p className="media-lead">This page features media and press specifically related to Beyond the Velvet Ropes, including the book, feature film, and documentary. It is not a complete archive of media from my earlier career.</p>
          <MediaCats />
        </div>
      </section>

      <section id="press" className="wrap">
        {/* MEDIA-15: the H2 covers the articles, so no extra 'Articles' H3 stacked under it. */}
        <h2>Press</h2>
        <Cards items={PRESS} />

        {/* MEDIA-08: TV and the other appearances in one block, so the grid fills whole rows. */}
        <div id="tv" className="media-block">
          <h3>TV and appearances</h3>
          <Cards items={APPEARANCES} />
        </div>

        <div id="press-kit" className="media-block">
          <div className="bio-block">
            <div className="bio-head">
              <h3>Author bio</h3>
              <CopyTextButton text={PRESS_BIO} label="Copy" />
            </div>
            {PRESS_BIO_PARAGRAPHS.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
          </div>
          <h3 className="headshot-title">Photos for press</h3>
          {/* MEDIA-14: each figure is a 3-row subgrid (frame, name, button) so tops,
              names and Download buttons all share one line. */}
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
      </section>

      {/* MEDIA-15: Film and Speaking are siblings of Press, in the outline too. */}
      <section id="film" className="wrap">
        <h2>Film and documentary</h2>
        <p>{FILM.film}</p>
        <div className="doc-feature">
          <figure className="doc-poster">
            <Image
              src={FILM.documentaryPoster.src}
              alt={FILM.documentaryPoster.alt}
              width={FILM.documentaryPoster.width}
              height={FILM.documentaryPoster.height}
              sizes="(max-width: 760px) calc(100vw - 40px), 640px"
              quality={88}
            />
            <figcaption>{FILM.documentaryPoster.note}</figcaption>
          </figure>
          <div className="doc-copy">
            <p className="doc-status">{FILM.documentaryStatus}</p>
            <h3>{FILM.documentaryTitle}</h3>
            <p>
              {FILM.documentary}{' '}
              <a href={FILM.documentaryPartner.href} target="_blank" rel="noopener noreferrer">
                {FILM.documentaryPartner.label}
              </a>
              .
            </p>
            <p>
              <a
                className="btn btn-primary"
                href={FILM.documentarySite}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow the documentary (opens in new tab)"
              >
                Follow the documentary
              </a>
            </p>
          </div>
        </div>
        {/* MEDIA-20: partner links share the page's ghost-button style. */}
        <p className="media-actions">
          {FILM.partners.map((partner) => (
            <a
              key={partner.href}
              className="btn btn-ghost btn-sm"
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${partner.label} (opens in new tab)`}
            >
              {partner.label}<span aria-hidden="true"> ↗</span>
            </a>
          ))}
          <a
            className="btn btn-ghost btn-sm"
            href={FILM.filmfreeway.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`FilmFreeway, ${FILM.filmfreeway.label} (opens in new tab)`}
          >
            FilmFreeway<span aria-hidden="true"> ↗</span>
          </a>
        </p>
      </section>

      <section id="speaking" className="wrap">
        <h2>Speaking</h2>
        <p>{SPEAKING_INTRO}</p>
        {/* MEDIA-22: a quiet invite up top; the primary one waits after the talks. */}
        <p><a className="btn btn-ghost" href="/thank-you#contact">Invite me to speak</a></p>
        {/* MEDIA-08: the talks read as a ruled list, not a card grid. */}
        <div className="speak-talks">
          {SPEAKING_TALKS.map((talk) => (
            <div key={talk.title} className="speak-talk">
              <h3>{talk.title}</h3>
              <p>{talk.text}</p>
            </div>
          ))}
        </div>
        <p className="media-actions">
          <a className="btn btn-primary" href="/thank-you#contact">Invite me to speak</a>
        </p>
      </section>

      <section id="forever-angels" className="wrap">
        <div>
          <h2>Want to Get Involved?</h2>
          {/* Jen, Nov 9: The Forever Angels is her own nonprofit, kept separate from Childhelp. */}
          <h3>The Forever Angels, my nonprofit</h3>
          <p>
            I co-founded The Forever Angels with Allison Kiefer. Families in need come first, and we also help veterans, older adults, and animals. We receive referrals from social workers and case managers, then work with trusted community partners to verify each need and make sure support reaches the people who truly need it.
          </p>
          <p className="media-actions">
            <a
              className="btn btn-ghost"
              href="https://theforeverangels.com/our-founders/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Forever Angels (opens in new tab)"
            >
              The Forever Angels<span aria-hidden="true"> ↗</span>
            </a>
          </p>
        </div>
        {/* MEDIA-11 / MEDIA-13: whole photos in the same gold mat as the headshots,
            bottoms and captions on one line, served through next/image (lazy, resized). */}
        <div className="give-back">
          {GIVE_BACK.map((photo) => (
            <figure key={photo.src}>
              <div className="headshot-frame">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 1000px) 45vw, 340px"
                  quality={82}
                />
              </div>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        <h3>Childhelp</h3>
        <p>
          I have volunteered with Childhelp for more than eight years. I have chaired the annual fashion show fundraiser three times, including the 2022 A Day in Wonderland event, which raised nearly $325,000 for Childhelp’s programs.
        </p>
        <p>Turbo has worked with Ronald McDonald House Charities, VA hospitals, and hospice.</p>
      </section>
      </main>

      <SiteFooter />
    </div>
  );
}
