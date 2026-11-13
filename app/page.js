import Image from 'next/image';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import HomeCarousel from './components/HomeCarousel';
import FirstChapterSignup from './components/FirstChapterSignup';
import { KIT_FREE_CHAPTER_URL, SHOP } from './components/site-data';
import { pageMeta } from '../lib/page-meta';

export const metadata = pageMeta({
  path: '/',
  title: 'Jen Archuleta',
  absolute: true,
  description:
    'Jen Archuleta, author, speaker, and advocate. Beyond the Velvet Ropes by Jennifer Walcott Archuleta. Read the first chapter free.',
});

// Home sells the book first, then points to speaking. One next step: buy the book.
export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />

      <main id="main-content">
        <section className="wrap hero hero--home">
          <div className="hero-copy">
            <div className="eyebrow">Author and speaker</div>
            <div className="hero-script">this isn’t the story<br />you think it is</div>
            <h1>Faith, family, and a bunch of rescues.</h1>
            <div className="eyebrow">Jen Archuleta, author of <em>Beyond the Velvet Ropes</em></div>
            {/* Jen, Nov 13: four clear buttons. */}
            <div className="hero-ctas hero-ctas--four">
              <a className="btn btn-primary" href="/book#buy">Buy the book</a>
              <a className="btn btn-ghost" href={KIT_FREE_CHAPTER_URL} target="_blank" rel="noopener">Read the first chapter free</a>
              <a className="btn btn-ghost" href="/podcast">Listen to Unfiltered with Jen Archuleta</a>
              <a className="btn btn-ghost" href="/book#shop">Shop</a>
            </div>
          </div>
          <div className="hero-media">
            <div className="portrait hero-frame">
              <Image
                src="/assets/presskit-headshot-floral.jpg"
                alt="Jen Archuleta smiling in a floral top"
                width={1100}
                height={1370}
                priority
                sizes="(max-width: 860px) min(90vw, 420px), 470px"
              />
            </div>
          </div>
        </section>

        <section className="wrap home-book" id="book">
          <img src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes book cover" width="1000" height="1500" />
          <div>
            <p className="eyebrow">The book, out now</p>
            <h2>Beyond the Velvet Ropes by Jennifer Walcott Archuleta</h2>
            <p>
              The signed copy is available now. {SHOP.signedBookTotal} total ({SHOP.signedBookPrice} + {SHOP.signedBookShipping} shipping, US only).
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="/book#buy">Buy the book</a>
            </div>
          </div>
        </section>

        <section className="wrap home-speak" id="speaking">
          <p className="eyebrow">Speaking</p>
          <h2>Invite Jen to speak</h2>
          <p>
            When I speak, I tell the hard parts honestly, and then I tell you about the good life that came after, so you know you can rise too.
          </p>
          <p><a href="/about#speaking">See the talks</a></p>
        </section>

        <HomeCarousel />

        <FirstChapterSignup />
      </main>

      <SiteFooter />
    </>
  );
}
