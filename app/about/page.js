import './about.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import KitInlineForm from '../components/KitInlineForm';
import { KIT_FORM_UID, SOCIALS } from '../components/site-data';

export const metadata = {
  title: 'About',
  description:
    'Hi, I’m Jen — a mom, a wife, and a houseful of rescue dogs. Faith, family, and giving back. This is me.',
};

export default function AboutPage() {
  return (
    <>
      <SiteNav />

      <a id="top" />

      {/* HERO */}
      <section className="tim-wrap tim-hero">
        <div>
          <p className="eyebrow">All of me</p>
          <h1 className="tim-display">Hi — I’m&nbsp;Jen.</h1>
          <p className="tim-script">and this is me</p>
          <p className="tim-lead">
            I don’t really do labels. I’m just me — a mom, a wife, and yes, a houseful of rescue dogs.
            I had a whole lot of incredible experiences in my twenties… but honestly? These days it’s the
            small stuff that gets me. Kids everywhere, dogs on the couch they’re not allowed on. My
            faith, my family, and giving back. That’s pretty much it.
          </p>
          <div className="tim-chips">
            <span className="tim-chip">Mom</span>
            <span className="tim-chip">Wife</span>
            <span className="tim-chip">Faith</span>
            <span className="tim-chip">Five dogs</span>
            <span className="tim-chip">Giving back</span>
            <span className="tim-chip">Just me</span>
          </div>
          <div className="tim-ctas">
            <a href="#hi" className="btn btn-primary">Come say hi</a>
            <a href="#then" className="btn btn-ghost">My story →</a>
          </div>
        </div>
        <div>
          <img className="tim-portrait" src="/assets/jen-beauty.jpg" alt="Jen Archuleta" />
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
          {/* Photo drop-zones. Privacy: dogs/animals/everyday — no kids' faces.
              Swap each placeholder for <img className="tim-img tall|short" src="/assets/<name>.jpg" .../> */}
          <p className="tim-hint">A few true things · dogs, animals, the everyday</p>
          <div className="tim-grid2">
            <div className="tim-slot-wrap" style={{ gridColumn: '1 / -1' }}>
              <img className="tim-img" src="/assets/dogs.jpg" alt="Jen’s five rescue dogs together in the garden" />
              <span className="tim-slot-cap">All five of them</span>
            </div>
            <div className="tim-slot-wrap">
              <img className="tim-img tall" src="/assets/wandered-in.jpg" alt="The family tortoise wandering through the house" />
              <span className="tim-slot-cap">Whoever else wandered in</span>
            </div>
            <div className="tim-slot-wrap">
              <img className="tim-img tall" src="/assets/coffee.jpg" alt="A quiet morning coffee before the house wakes up" />
              <span className="tim-slot-cap">Before the house wakes up</span>
            </div>
            <div className="tim-slot-wrap" style={{ gridColumn: '1 / -1' }}>
              <img className="tim-img" src="/assets/kids.jpg" alt="Jen’s kids asleep with one of the dogs" />
              <span className="tim-slot-cap">A full, happy house</span>
            </div>
          </div>
        </div>
      </section>

      {/* MY PEOPLE */}
      <section id="life" className="tim-band">
        <div className="tim-wrap tim-band-inner">
          <div>
            <p className="eyebrow">My people</p>
            <h2 className="tim-h2" style={{ fontSize: '46px', marginBottom: '24px' }}>
              Fiercely loyal to the few who are mine.
            </h2>
            <p className="tim-lead" style={{ margin: 0 }}>
              My husband, my kids, a handful of people I’d do anything for, and a houseful of animals
              I love like family. I love hard and I show up — that part of me has never changed.
            </p>
          </div>
          <div className="tim-quote">
            <p>“I’m not trying to be anybody. I’m just really happy being who I am.”</p>
            <div className="by">Jen</div>
          </div>
        </div>
      </section>

      {/* THEN & NOW */}
      <section id="then" className="tim-wrap tim-then">
        <div>
          <img className="tim-gray" src="/assets/jen-bw-coat2.jpg" alt="Jen Archuleta, earlier years" />
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
          <div style={{ marginTop: '14px' }}>
            <a href={SOCIALS.foreverAngels} className="btn btn-primary">What I support</a>
          </div>
        </div>
      </section>

      {/* SAY HI */}
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
