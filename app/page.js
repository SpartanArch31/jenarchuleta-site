import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import VelvetInvite from './components/VelvetInvite';
import HomeCarousel from './components/HomeCarousel';
import { BOOK_BUY_URL, BOOK_STORES, KIT_FREE_CHAPTER_URL, SHOP, PODCAST } from './components/site-data';
import { PRESS_HIGHLIGHTS, cardMeta } from '../lib/press';
import { getFeaturedPup } from '../lib/pup-photos';

// Homepage, in Jen's order (October 27, 2026; November 2026 additions):
// 1 intro + Get the Book · 2 Story, Voice, Heart · 2b featured photos
// (HomeCarousel) · 3 the book, trailer, buy · 4 Velvet Letter invitation
// · 5 podcast + Pup of the Podcast · 6 journal · 7 media and press
// · 8 free first chapter (Stay close, in SiteFooter). Wording is the
// September site's unless Jen changed it.
// November 3 (Jen): everything about her lives on the About Me page, so the
// hero no longer repeats it (no "these days I'm happiest..." paragraph here).
// The hero photo is her candid floral portrait. No bundle on the homepage.
// November 3 (Jen): nothing repeated. The film news lives on Media (#film) and
// is only linked from here; the podcast and pup lines live on the Podcast and
// Pups pages. No em dashes anywhere.
export const revalidate = 3600;

export default async function Home() {
  const pup = await getFeaturedPup().catch(() => null);

  return (
    <>
      <SiteNav />

      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* 1. HERO */}
      <section id="main-content" className="wrap hero">
        <div className="hero-copy">
          <div className="eyebrow">Author · Speaker · Advocate</div>
          <div className="hero-script">this isn’t the story<br />you think it is</div>
          <h1>Faith, family, and a bunch of dogs.</h1>
          <div className="eyebrow" style={{ marginTop: '16px', marginBottom: '30px' }}>Author of <em>Beyond the Velvet Ropes</em></div>
          <div className="hero-ctas">
            <a href="/book" className="btn btn-primary">Get the book</a>
            <a href="/about" className="btn btn-ghost">About me</a>
          </div>
        </div>
        <div className="hero-media">
          <div className="portrait hero-frame">
            <img src="/assets/presskit-headshot-floral.jpg" alt="Jen Walcott Archuleta smiling in a floral top" width="1100" height="1370" />
          </div>
        </div>
      </section>

      <section className="wrap tagline" style={{ paddingBlock: 'var(--space-9)' }}>
        <div className="threshold-rule"><span className="diamond" /></div>
        <p className="q">“Your story isn’t what happened to you. It’s what you do with it.”</p>
        <div className="threshold-rule"><span className="diamond" /></div>
      </section>

      {/* 2. STORY · VOICE · HEART */}
      <section className="wrap pillars">
        <div className="p">
          <div className="eyebrow">Story</div>
          <h3>The Author</h3>
          <p>Her memoir, <em>Beyond the Velvet Ropes</em>, and the writing that turns hard chapters into hope.</p>
          <p><a href="/book" className="btn btn-ghost btn-sm">The book</a></p>
        </div>
        <div className="p">
          <div className="eyebrow">Voice</div>
          <h3>The Speaker</h3>
          <p>Faith, resilience, and reinvention, on stages and wherever women are rebuilding.</p>
          <p><a href="/media#speaking" className="btn btn-ghost btn-sm">Speaking</a></p>
        </div>
        <div className="p">
          <div className="eyebrow">Heart</div>
          <h3>The Advocate</h3>
          <p>Beyond the Ropes and The Forever Angels, choosing the overlooked, one act at a time.</p>
          <p><a href="/about#forever-angels" className="btn btn-ghost btn-sm">The movement</a></p>
        </div>
      </section>

      {/* 2b. FEATURED PHOTOS */}
      <HomeCarousel />

      {/* 3. THE BOOK (dark register) + TRAILER */}
      <section id="book" className="book dark">
        <div className="wrap inner">
          <div><img className="book-cover" src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes book cover" width="1000" height="1500" loading="lazy" /></div>
          <div>
            <div className="eyebrow">The Memoir. Out Now.</div>
            <h2>Beyond the Velvet Ropes</h2>
            <p className="sub">My Story of Perseverance, Hope, and Love</p>
            <p style={{ color: 'var(--text)' }}>From the outside, my twenties looked like the dream. Covers, cameras, a life behind the velvet ropes. But the real story was never the part people saw. It’s in the moments I never talked about, and the long road back to the ordinary, happy life I have now. I wrote all of it down. The hard, the funny, and the faith that carried me through. If you’ve ever come through something and made it to the other side, I wrote this for you.</p>
            <p className="buy-row">
              <a href={BOOK_BUY_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Get the Paperback</a>
              {SHOP.signedBook && !SHOP.signedBookSoldOut ? (
                <a href="/shop#signed-copy" className="btn btn-ghost">Signed copy</a>
              ) : null}
              {BOOK_STORES.map((store) => (
                <a key={store.href} href={store.href} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">{store.label}</a>
              ))}
            </p>
            <p style={{ marginTop: '6px' }}><a href={KIT_FREE_CHAPTER_URL} style={{ color: 'var(--accent)' }}>Or read the first chapter free →</a></p>
          </div>
        </div>
        <div className="wrap trailer-feature">
          <div className="tf-copy">
            <div className="eyebrow">Watch the Trailer</div>
            <p className="tf-logline">“Everyone knew the headlines. No one knew the story.”</p>
            <p className="tf-cap">The official trailer for <em>Beyond the Velvet Ropes</em>, about ninety seconds.</p>
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
        </div>
      </section>

      {/* 4. THE VELVET LETTER */}
      <VelvetInvite />

      {/* 5. PODCAST + PUP OF THE PODCAST */}
      <section id="podcast" className="wrap home-podcast" style={{ background: 'var(--surface)' }}>
        <div className="center">
          <div className="eyebrow">The Podcast</div>
          <h2>{PODCAST.name}</h2>
          <div className="hero-ctas" style={{ justifyContent: 'center', marginTop: '8px' }}>
            <a href="/podcast" className="btn btn-primary">Listen to all 13 episodes</a>
          </div>
          <p className="home-pod-cross">
            <a href={PODCAST.buzzsprout} target="_blank" rel="noopener noreferrer">Listen on Buzzsprout</a>
            <span aria-hidden="true"> • </span>
            <a href={PODCAST.youtubeEpisodes || PODCAST.youtube} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
          </p>
        </div>
        {pup ? (
          <div className="home-pup">
            <img src={pup.photo} alt={pup.alt || pup.name} loading="lazy" />
            <div>
              <div className="eyebrow">Pup of the Podcast</div>
              <h3>Meet {pup.name}</h3>
              {pup.homeLine || pup.guest ? (
                <p>{pup.homeLine || `${pup.name} joined my conversation with ${pup.guest}.`}</p>
              ) : null}
              <p><a href="/pups" className="btn btn-ghost btn-sm">Meet all the pups</a></p>
            </div>
          </div>
        ) : (
          <p className="center" style={{ marginTop: '22px' }}><a href="/pups">Meet the Pups of the Podcast →</a></p>
        )}
      </section>

      {/* 6. JOURNAL */}
      <section id="journal" className="wrap">
        <div className="center"><h2>Notes from the road back to myself.</h2>
          <p className="lead" style={{ maxWidth: '56ch', marginInline: 'auto' }}>Short, honest writing on faith, family, healing, and starting over.</p></div>
        <div className="cards-3 feature-first">
          <a className="mini" href="/journal?category=Faith"><div className="body"><div className="k">Faith</div><h3>It is in the waiting that we become who we’re meant to be.</h3></div></a>
          <a className="mini" href="/journal?category=Health%20%26%20Wellness"><div className="body"><div className="k">Healing</div><h3>Survival isn’t the same thing as healing.</h3></div></a>
          <a className="mini" href="/journal?category=Family"><div className="body"><div className="k">Family</div><h3>What I want my kids to know about getting back up.</h3></div></a>
        </div>
        <div className="center" style={{ marginTop: '28px' }}><a href="/journal" className="btn btn-ghost">Read the journal</a></div>
      </section>

      {/* 7. MEDIA AND PRESS */}
      <section id="press" className="wrap home-press" style={{ background: 'var(--surface)' }}>
        <div className="center">
          <div className="eyebrow">Media &amp; Press</div>
          <h2>In the press.</h2>
        </div>
        <div className="cards-3">
          {PRESS_HIGHLIGHTS.map((item) => (
            <a key={item.href} className="mini" href={item.href} target="_blank" rel="noopener noreferrer">
              <div className="body">
                <div className="k">{item.outlet}</div>
                <h3>{item.headline}</h3>
                <p className="foot-meta">{cardMeta(item)}</p>
              </div>
            </a>
          ))}
        </div>
        <p className="home-press-film">
          <strong>On screen:</strong> <a href="/media#film">in development for film and documentary</a>.
        </p>
        <div className="center" style={{ marginTop: '18px' }}><a href="/media" className="btn btn-ghost">All press and media</a></div>
      </section>

      {/* 8. FREE FIRST CHAPTER (Stay close) is the top of SiteFooter. */}
      <SiteFooter />
    </>
  );
}
