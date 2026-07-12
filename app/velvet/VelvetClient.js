'use client';

import { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import './velvet.css';
import KitInlineForm from '../components/KitInlineForm';
import { KIT_FORM_UID } from '../components/site-data';
import { urlFor } from '../sanity/image';

function formatLetterDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Portable Text renderers for the letter body (links + any inline images).
const letterComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(1100).url()}
        alt={value?.alt || ''}
        style={{ width: '100%', borderRadius: 'var(--radius, 10px)', margin: '18px 0' }}
      />
    ),
  },
  marks: {
    link: ({ value, children }) => <a href={value?.href}>{children}</a>,
  },
};

/*
 * The Velvet Pages — the password-protected reader page behind the QR
 * code printed in the back of Beyond the Velvet Ropes.
 * Password: "velvet" (printed in the book — a courtesy gate, not security).
 */

const PASSWORD = 'velvet';
const KEY = 'velvet_ok';

const PHOTOS = [
  { src: '/velvet/young-jen.jpg', alt: 'Jen as a young girl' },
  { src: '/velvet/kitchen-1981.jpg', alt: 'The kitchen, February 1981' },
  { src: '/velvet/cowgirl.jpg', alt: 'Little cowgirl' },
  { src: '/velvet/horseback.jpg', alt: 'On horseback' },
  { src: '/velvet/her-parents.jpg', alt: 'Her parents, back then' },
  { src: '/velvet/girls.jpg', alt: 'The girls' },
  { src: '/velvet/photo-booth.jpg', alt: 'The photo booth' },
  { src: '/velvet/glam.jpg', alt: 'The glamour years' },
  { src: '/velvet/bunny-era.jpg', alt: 'The velvet-rope world' },
  { src: '/velvet/mansion-group.jpg', alt: 'Inside the world of velvet ropes' },
  { src: '/velvet/flying.jpg', alt: 'At the controls' },
  { src: '/velvet/mom-dad-kiss.jpg', alt: 'Mom and Dad' },
  { src: '/velvet/wedding.jpg', alt: 'The wedding' },
  { src: '/velvet/the-dip.jpg', alt: 'Still us' },
  { src: '/velvet/the-dogs.jpg', alt: 'The whole pack' },
];

export default function VelvetClient({ letters = [] }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [attempt, setAttempt] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === '1') setUnlocked(true);
    } catch (e) {}
    setReady(true);
  }, []);

  function tryUnlock(e) {
    e.preventDefault();
    if (attempt.trim().toLowerCase() === PASSWORD) {
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
      setUnlocked(true);
    } else {
      setError(true);
    }
  }

  if (!ready) return <div className="dark velvet-page" style={{ minHeight: '100vh' }} />;

  if (!unlocked) {
    return (
      <div className="dark velvet-page">
        <main className="gate">
          <div className="gate-card">
            <div className="eyebrow">For readers of Beyond the Velvet Ropes</div>
            <h1>This is where the story continues.</h1>
            <p className="gate-sub">
              Enter the password from the back of the book.
            </p>
            <form onSubmit={tryUnlock} className="gate-form">
              <input
                type="password"
                value={attempt}
                onChange={(e) => { setAttempt(e.target.value); setError(false); }}
                placeholder="Password"
                aria-label="Password"
                autoFocus
              />
              <button type="submit" className="btn btn-primary">Open the rope</button>
            </form>
            {error && <p className="gate-error">That&rsquo;s not it — check the last page of the book.</p>}
            <p className="gate-foot">
              Don&rsquo;t have the book yet? <a href="/book">Start here</a>.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dark velvet-page">
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="brand">Jen Archuleta</a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/book">The Book</a>
            <a href="/podcast">Podcast</a>
          </div>
        </div>
      </nav>

      {/* WELCOME LETTER */}
      <section className="wrap text-wrap letter">
        <div className="eyebrow">You made it</div>
        <h1>Welcome behind the ropes.</h1>
        <p>
          If you&rsquo;re reading this, you just finished my story — or you skipped
          to the back of the book, which honestly is very me of you.
        </p>
        <p>
          Either way, I&rsquo;m glad you&rsquo;re here. This page is my thank-you.
          It&rsquo;s where I&rsquo;ll keep adding the things that didn&rsquo;t fit
          between the covers — the photos up close, the stories behind them, the
          parts I read out loud, the scenes that almost made it in.
        </p>
        <p>
          But before any of that: if the book stirred something in you, I hope you
          heard the one thing I most wanted to say. Your story isn&rsquo;t what
          happened to you. It&rsquo;s what you do with it.
        </p>
        <p className="signoff">— Jen</p>
      </section>

      {/* VELVET LETTERS — reader-exclusive updates (Sanity, newest first) */}
      {letters && letters.length > 0 && (
        <section className="letters-band">
          <div className="wrap text-wrap">
            <div className="center">
              <div className="eyebrow">The Velvet Letters</div>
              <h2>Notes for readers.</h2>
              <p className="lead letters-note">
                The behind-the-scenes updates I share with the people who read the book first.
              </p>
            </div>
            <div className="letters-feed">
              {letters.map((l) => (
                <article className="vletter" key={l._id}>
                  <div className="vletter-date">{formatLetterDate(l.publishedAt)}</div>
                  <h3 className="vletter-title">{l.title}</h3>
                  {l.image && (
                    <img
                      className="vletter-img"
                      src={urlFor(l.image).width(1200).url()}
                      alt={l.image.alt || ''}
                      loading="lazy"
                    />
                  )}
                  {l.body && (
                    <div className="vletter-body">
                      <PortableText value={l.body} components={letterComponents} />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      <section className="gallery-band">
        <div className="wrap">
          <div className="center">
            <div className="eyebrow">From the book</div>
            <h2>The photos, up close.</h2>
            <p className="lead gallery-note">
              Every photo from the book, bigger than the printed page could show
              them. I&rsquo;m adding the story behind each one — check back.
            </p>
          </div>
          <div className="gallery">
            {PHOTOS.map((p) => (
              <figure key={p.src}>
                <img src={p.src} alt={p.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="wrap">
        <div className="center">
          <div className="eyebrow">Being added now</div>
          <h2>What&rsquo;s coming to this page.</h2>
        </div>
        <div className="soon-grid">
          <div className="soon-card">
            <h3>Me, reading to you</h3>
            <p>A chapter from the book, read out loud — the one that was hardest to write.</p>
          </div>
          <div className="soon-card">
            <h3>What didn&rsquo;t make the book</h3>
            <p>Stories and scenes that were cut — and why they almost stayed.</p>
          </div>
          <div className="soon-card">
            <h3>The film, first look</h3>
            <p>Beyond the Velvet Ropes is being adapted for the screen. Readers see it here first.</p>
          </div>
        </div>
      </section>

      {/* REVIEW ASK */}
      <section className="review-band">
        <div className="wrap text-wrap center">
          <div className="eyebrow">One small thing</div>
          <h2>If this story mattered to you.</h2>
          <p className="lead">
            A short review helps this book find the next woman who needs it —
            someone in the middle of her own hard chapter. I&rsquo;d be honored.
          </p>
          <div className="review-row">
            <a
              href="https://www.amazon.com/review/create-review?asin=B0H6YZWDT3"
              target="_blank" rel="noopener" className="btn btn-primary"
            >
              Review on Amazon
            </a>
            <a
              href="https://www.barnesandnoble.com/w/beyond-the-velvet-ropes-jennifer-walcott-archuleta/1150495088?ean=9798182506885"
              target="_blank" rel="noopener" className="btn btn-ghost"
            >
              Review on Barnes &amp; Noble
            </a>
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE — light band (Kit inline form is light-styled) */}
      <section className="capture-band">
        <div className="wrap text-wrap center">
          <div className="eyebrow">Stay close</div>
          <h2>Be first when something new lands here.</h2>
          <p className="lead">
            When I add the audio, the cut scenes, or news about the film,
            I&rsquo;ll tell my readers first — by email.
          </p>
          <KitInlineForm uid={KIT_FORM_UID} />
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p className="foot-meta">
            © 2026 Jen Archuleta — Jennifer Walcott Archuleta. <a href="/">Home</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
