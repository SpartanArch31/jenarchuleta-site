import './book.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import VelvetInvite from '../components/VelvetInvite';
import { BOOK_BUY_URL, BOOK_STORES, KIT_FREE_CHAPTER_URL, SHOP } from '../components/site-data';
import { FILM } from '../../lib/press';

export const metadata = {
  // Matches the retail listings exactly (Amazon / B&N / Spotify use the full name).
  title: { absolute: 'Beyond the Velvet Ropes by Jennifer Walcott Archuleta' },
  description:
    'Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love by Jennifer Walcott Archuleta. Out now. Read the first chapter free.',
};

const bookJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love',
  author: {
    '@type': 'Person',
    name: 'Jennifer Walcott Archuleta',
    alternateName: 'Jen Archuleta',
    url: 'https://jenarchuleta.com/about',
  },
  image: 'https://jenarchuleta.com/assets/book-cover.jpg',
  url: 'https://jenarchuleta.com/book',
  datePublished: '2026-07-04',
  sameAs: [
    'https://www.amazon.com/dp/B0H6YZWDT3',
    'https://www.barnesandnoble.com/w/beyond-the-velvet-ropes-jennifer-walcott-archuleta/1150495088?ean=9798182506885',
  ],
};

export default function BookPage() {
  return (
    <div className="dark book-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }} />
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* HERO (dark register, echoes the cover) */}
      <section id="main-content" className="hero-section dark" style={{ background: 'var(--bg)' }}>
        <div className="wrap hero">
          <div><img className="hero-cover" src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes book cover" width="1000" height="1500" /></div>
          <div>
            <div className="eyebrow">The Memoir — Out Now</div>
            <h1>Beyond the Velvet Ropes</h1>
            <p className="sub">My Story of Perseverance, Hope, and Love</p>
            <p style={{ color: 'var(--text)' }}>This isn’t the story you think it is. From the outside it looked like everything most people dream of — fame, beauty, a life behind the velvet ropes. But the real story lives in the moments no one saw. Raw. Honest. Real.</p>
            <div className="buy-row">
              <a href={BOOK_BUY_URL} target="_blank" rel="noopener" className="btn btn-primary">Get the Paperback</a>
              {SHOP.signedBook && !SHOP.signedBookSoldOut ? (
                <a href="/shop#signed-copy" className="btn btn-ghost">Signed copy</a>
              ) : null}
              {BOOK_STORES.map((store) => (
                <a key={store.href} href={store.href} target="_blank" rel="noopener" className="btn btn-ghost">{store.label}</a>
              ))}
            </div>
            <p><a href={KIT_FREE_CHAPTER_URL} style={{ color: 'var(--accent)' }}>Or read the first chapter free →</a></p>
          </div>
        </div>
      </section>

      {/* THE HOOK */}
      <section className="wrap text-wrap center">
        <div className="threshold-rule" style={{ maxWidth: '220px', margin: '0 auto 24px' }}><span className="diamond" /></div>
        <p className="lead" style={{ fontSize: 'var(--text-body-l)' }}>Before the spotlight, there was pain. Behind the image, there was fear. And beneath it all, there was a girl trying to hold on to who she was while everything around her tried to define her. <em>Beyond the Velvet Ropes</em> is the story of survival, resilience, and the quiet strength it takes to become who you were always meant to be.</p>
      </section>

      {/* TRAILER */}
      <section className="wrap trailer-feature book-trailer">
        <div className="tf-copy">
          <div className="eyebrow">Watch the Trailer</div>
          <p className="tf-logline">“Everyone knew the headlines. No one knew the story.”</p>
          <p className="tf-cap">The official trailer for <em>Beyond the Velvet Ropes</em> — about ninety seconds.</p>
        </div>
        <figure className="tf-video">
          <video
            src="/trailer.mp4"
            poster="/trailer-poster.jpg"
            controls
            playsInline
            preload="none"
            className="book-trailer-video"
          />
        </figure>
      </section>

      {/* WHO IT'S FOR */}
      <section className="who">
        <div className="wrap text-wrap center">
          <div className="eyebrow">Who this book is for</div>
          <h2>If your past has ever tried to define you.</h2>
          <ul style={{ textAlign: 'left' }}>
            <li>The woman who’s holding it all together with both hands and no one knows.</li>
            <li>Anyone who’s survived something and is learning that survival isn’t the same as healing.</li>
            <li>Anyone rebuilding — after loss, reinvention, a crisis of faith, or starting over.</li>
            <li>Anyone who’s ever felt judged, underestimated, or counted out.</li>
          </ul>
        </div>
      </section>

      {/* FILM AND DOCUMENTARY (in development — see lib/press.js) */}
      <section className="wrap text-wrap book-screen">
        <div className="eyebrow">On screen</div>
        <h2>In development for film and documentary.</h2>
        <p>{FILM.film}</p>
        <p>{FILM.documentary}</p>
        <p className="foot-meta">
          {FILM.partners.map((partner, i) => (
            <span key={partner.href}>
              {i > 0 ? ' · ' : ''}
              <a href={partner.href} target="_blank" rel="noopener noreferrer">{partner.label}</a>
            </span>
          ))}
        </p>
      </section>

      {/* THE VELVET LETTER */}
      <div className="wrap">
        <VelvetInvite compact />
      </div>

      {/* BUNDLE + REVIEWS */}
      <section className="wrap text-wrap center book-more">
        <p className="lead">
          Want the signed book, my handmade velvet bookmark, and black velvet bunny ears together?{' '}
          <a href="/shop#backstage-bundle">See The Backstage Bundle</a>.
        </p>
        <div className="threshold-rule" style={{ maxWidth: '220px', margin: '34px auto' }}><span className="diamond" /></div>
        <div className="eyebrow">Already read it?</div>
        <p className="lead">A short review helps this book find the next reader who needs it. I’d be honored.</p>
        <div className="buy-row" style={{ justifyContent: 'center' }}>
          <a href="https://www.amazon.com/review/create-review?asin=B0H6YZWDT3" target="_blank" rel="noopener" className="btn btn-ghost">Review on Amazon</a>
          <a href="https://www.barnesandnoble.com/w/beyond-the-velvet-ropes-jennifer-walcott-archuleta/1150495088?ean=9798182506885" target="_blank" rel="noopener" className="btn btn-ghost">Review on Barnes &amp; Noble</a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
