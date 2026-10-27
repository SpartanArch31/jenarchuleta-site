import './about.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PhotoGallery from '../components/PhotoGallery';
import { SOCIALS } from '../components/site-data';
import { FILM } from '../../lib/press';

export const metadata = {
  title: 'About',
  description:
    'Hi, I’m Jen — a mom, a wife, and the human behind a houseful of five rescue dogs and two tortoises. Faith, family, and giving back. This is me.',
};

export default function AboutPage() {
  return (
    <>
      <SiteNav />

      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* HERO */}
      <section id="main-content" className="tim-wrap tim-hero">
        <div>
          <p className="eyebrow">All of me</p>
          <h1 className="tim-display">Hi — I’m&nbsp;Jen.</h1>
          <p className="tim-script">and this is me</p>
          <p className="tim-lead">
            I don’t really do labels. I’m just me — a mom, a wife, and yes, the human behind a houseful of five rescue dogs and two tortoises.
            I had a whole lot of incredible experiences in my twenties… but honestly? These days it’s the
            small stuff that gets me. Kids everywhere, rescue dogs on the couch they’re not allowed on. My
            faith, my family, and giving back. That’s pretty much it.
          </p>
          <div className="tim-chips">
            <span className="tim-chip">Mom</span>
            <span className="tim-chip">Wife</span>
            <span className="tim-chip">Faith</span>
            <span className="tim-chip">Five rescue dogs</span>
            <span className="tim-chip">Two tortoises</span>
            <span className="tim-chip">Giving back</span>
            <span className="tim-chip">Just me</span>
          </div>
          <div className="tim-ctas">
            <a href="#then" className="btn btn-primary">My story</a>
            <a href="#gallery" className="btn btn-ghost">Photos →</a>
          </div>
        </div>
        <div>
          <img className="tim-portrait" src="/assets/presskit-headshot-floral.jpg" alt="Jen Walcott Archuleta" width="1100" height="1370" />
          <p className="tim-cap">Caught mid-laugh, which is most of the time</p>
        </div>
      </section>

      {/* THRESHOLD */}
      <div className="tim-wrap">
        <div className="threshold-rule"><span className="diamond" /></div>
      </div>

      {/* THE EVERYDAY */}
      <section id="me" className="tim-wrap tim-everyday">
        <div className="tim-sticky">
          <p className="eyebrow">The everyday</p>
          <h2 className="tim-h2" style={{ fontSize: '46px' }}>The good stuff is the small stuff.</h2>
          <p className="tim-lead" style={{ marginTop: '28px' }}>
            I’ve seen a lot of the big, shiny version of life. Turns out my favorite parts are the
            ones nobody’s photographing.
          </p>
          <div className="tim-joys">
            <div className="tim-joy"><span className="dot" />Coffee before anyone else is up</div>
            <div className="tim-joy"><span className="dot" />Surrounded by animals</div>
            <div className="tim-joy"><span className="dot" />A loud house and a full table</div>
            <div className="tim-joy"><span className="dot" />Sunday, and a little quiet for my faith</div>
            <div className="tim-joy"><span className="dot" />Finding ways to give back</div>
          </div>
        </div>
        <div>
          {/* Everyday photos. Swap a file in place to change one. */}
          <p className="tim-hint">A few true things · rescue dogs, animals, the everyday</p>
          <div className="tim-grid2">
            <div className="tim-slot-wrap tim-span">
              <img className="tim-img" src="/assets/dogs.jpg" alt="Jen’s five rescue dogs together in the garden" width="1400" height="786" loading="lazy" decoding="async" />
              <span className="tim-slot-cap">All five of them</span>
            </div>
            <div className="tim-slot-wrap">
              <img className="tim-img" src="/assets/wandered-in.jpg" alt="The family tortoise wandering through the house" width="600" height="1067" loading="lazy" decoding="async" />
              <span className="tim-slot-cap">Whoever else wandered in</span>
            </div>
            <div className="tim-slot-wrap">
              <img className="tim-img" src="/assets/coffee.jpg" alt="A quiet morning coffee before the house wakes up" width="700" height="700" loading="lazy" decoding="async" />
              <span className="tim-slot-cap">Before the house wakes up</span>
            </div>
            <div className="tim-slot-wrap tim-span">
              <img className="tim-img" src="/assets/dogs-on-the-bed.jpg" alt="Two of the rescue dogs curled up on the bed" width="660" height="520" loading="lazy" decoding="async" />
              <span className="tim-slot-cap">A full, happy house</span>
            </div>
          </div>
        </div>
      </section>

      {/* MY PEOPLE */}
      <section id="life" className="tim-band">
        <div className="tim-wrap tim-band-inner is-solo">
          <div>
            <p className="eyebrow">My people</p>
            <h2 className="tim-h2" style={{ fontSize: '46px', marginBottom: '24px' }}>
              Fiercely loyal to the few who are mine.
            </h2>
            <p className="tim-lead" style={{ margin: 0 }}>
              I love my husband, my children, my family, and my friends fiercely — and a houseful of
              rescue animals I love like family. I love hard and I show up — that part of me has never changed.
            </p>
          </div>
        </div>
      </section>

      {/* THEN & NOW */}
      <section id="then" className="tim-wrap tim-then">
        <div>
          <img className="tim-gray" src="/assets/jen-headshot-blazer.jpg" alt="Jen Walcott Archuleta" width="1000" height="1249" loading="lazy" decoding="async" />
        </div>
        <div>
          <p className="eyebrow">Then &amp; now</p>
          <h2 className="tim-h2" style={{ fontSize: '50px' }}>My twenties were something else.</h2>
          <p className="tim-lead" style={{ marginTop: '28px' }}>
            Incredible experiences, rooms most people never get to see, a version of my life that
            looked like a highlight reel. I’m grateful for all of it. I also walked through some
            genuinely hard things to get here — but that’s not the headline. The headline is the
            ordinary, beautiful life I get to wake up to now. I wouldn’t trade a single regular
            morning for any of it.
          </p>
          <div className="threshold-rule" style={{ marginTop: '30px', maxWidth: '320px' }}>
            <span className="diamond" />
          </div>
        </div>
      </section>

      {/* THE FUN PART + PHOTOS (the carousel moved here from the homepage) */}
      <section className="tim-wrap tim-fun">
        <div className="center">
          <div className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>the fun part…</div>
          <h2 className="tim-h2" style={{ fontSize: '46px' }}>Beautiful, a little bit of trouble, and not done yet.</h2>
          <p className="tim-lead" style={{ maxWidth: '62ch', marginInline: 'auto' }}>
            Let’s be honest — I’ve never minded the camera. Magazine covers, red carpets, getting dressed
            up, a good laugh. I’ve always had a soft spot for animals, and plenty of rescues at home to
            prove it. Faith, family, and fun, all at once — and I wouldn’t have it any other way.
          </p>
        </div>
        <div className="photo-row">
          <img src="/assets/jen-glam.jpg" alt="Jen Archuleta — glamour portrait" width="941" height="1123" loading="lazy" />
          <img src="/assets/jen-sultry.jpg" alt="Jen Archuleta" width="599" height="1111" loading="lazy" />
          <img src="/assets/jen-fun2.jpeg" alt="Jen Archuleta with a rescue puppy" width="510" height="512" loading="lazy" />
          <img src="/assets/jen-fitness.jpg" alt="Jen Archuleta — fit at 50" width="1077" height="887" loading="lazy" />
        </div>
      </section>
      <PhotoGallery showTitle={false} />

      {/* THE PROFESSIONAL BIO */}
      <section id="work" className="tim-wrap tim-work">
        <div className="tim-work-inner">
          <p className="eyebrow">What I do</p>
          <h2 className="tim-h2" style={{ fontSize: '44px' }}>Author, host, speaker, advocate.</h2>
          <p className="tim-lead">
            I’m the author of <em>Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love</em>, and
            the host of the podcast <em>Unfiltered with Jen Archuleta</em>. I speak about faith, resilience,
            and starting over.
          </p>
          <p className="tim-lead">{FILM.film}</p>
          <p className="tim-lead">{FILM.documentary}</p>
          <p className="tim-work-links">
            <a href="/book" className="btn btn-ghost btn-sm">The book</a>
            <a href="/podcast" className="btn btn-ghost btn-sm">The podcast</a>
            <a href="/media" className="btn btn-ghost btn-sm">Media &amp; press kit</a>
          </p>
        </div>
      </section>

      {/* FAITH, GIVING BACK, AND THE FOREVER ANGELS — the one dark band,
          and the one home on the site for The Forever Angels. */}
      <section id="forever-angels" className="tim-faith dark">
        <span id="faith" className="anchor" aria-hidden="true" />
        <div className="tim-faith-inner">
          <p className="eyebrow" style={{ color: 'var(--accent)' }}>Faith &amp; giving back</p>
          <h2 className="tim-h2" style={{ fontSize: 'clamp(40px, 5vw, 60px)', color: 'var(--accent-ink)', maxWidth: '820px' }}>
            Grounded by faith, happiest when I’m giving some of it back.
          </h2>
          <p className="tim-lead" style={{ margin: 0, maxWidth: '660px' }}>
            My faith keeps me steady and it keeps me humble. So does remembering how lucky I am.
            Whatever I’ve got — time, a story, a hand to lend — I’d rather use it for somebody else
            than keep it for myself.
          </p>
          <p className="tim-lead" style={{ margin: '16px 0 0', maxWidth: '660px' }}>
            That’s why The Forever Angels is so close to my heart. It’s my 501(c)(3) nonprofit, for the
            families, veterans, hospice patients, and animals who get passed over.
          </p>
          <div style={{ marginTop: '14px' }}>
            <a href={SOCIALS.foreverAngels} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Visit The Forever Angels</a>
          </div>
        </div>
      </section>

      {/* THE MOVEMENT (September homepage creed, moved here) */}
      <section id="movement" className="wrap creed" style={{ background: 'var(--surface)' }}>
        <div className="threshold-rule" style={{ marginBottom: '20px' }}><span className="diamond" /></div>
        <h2>Everyone belongs beyond the ropes.</h2>
        <p className="lead" style={{ maxWidth: '60ch', marginInline: 'auto' }}>A velvet rope decides who gets in and who stays out. This is the opposite of that — a quiet practice of choosing the overlooked, and reminding each other that no one’s story is over.</p>
        <ul>
          <li>Everyone belongs — so we choose the overlooked.</li>
          <li>No one’s story is over — it’s still being written.</li>
          <li>We forgive — even without the apology.</li>
          <li>We fall, we learn, and we rise anyway.</li>
          <li>We turn our pain into someone else’s lifeline.</li>
        </ul>
      </section>

      <SiteFooter />
    </>
  );
}
