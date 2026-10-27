import './about.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import KitInlineForm from '../components/KitInlineForm';
import { KIT_FORM_UID } from '../components/site-data';

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
            <a href="#hi" className="btn btn-primary">Come say hi</a>
            <a href="#then" className="btn btn-ghost">My story →</a>
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
          {/* Photo drop-zones.
              Swap each placeholder for <img className="tim-img tall|short" src="/assets/<name>.jpg" .../> */}
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
              The people who are mine.
            </h2>
            <p className="tim-lead" style={{ margin: 0 }}>
              My husband, my kids, my family, friends, the handful of people I’d do anything for, and a houseful of animals
              I love like family. I love hard and I show up. That hasn’t changed.
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

      {/* FAITH & GIVING — the one dark band */}
      <section id="faith" className="tim-faith dark">
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
            I co-founded The Forever Angels, for the families, veterans, hospice patients, and animals who get passed over.
          </p>
          <div style={{ marginTop: '14px' }}>
            <a href="/forever-angels" className="btn btn-primary">What I support</a>
          </div>
        </div>
      </section>

      <section id="hi" className="tim-wrap tim-hi">
        <div className="tim-card">
          <div>
            <p className="eyebrow">Say hi</p>
            <h2 className="tim-h2" style={{ fontSize: '44px' }}>Come hang out. No agenda.</h2>
            <p className="tim-lead" style={{ marginTop: '24px' }}>
              A little note from me every now and then — whatever I’m actually thinking about that
              week, the good and the hard. No pitch, I promise.
            </p>
          </div>
          <div>
            <span className="tim-label">Join the letter</span>
            <KitInlineForm uid={KIT_FORM_UID} />
            <p className="tim-note">A few times a month. Unsubscribe whenever, no hard feelings.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
