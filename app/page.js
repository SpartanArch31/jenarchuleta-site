import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import { KIT_FREE_CHAPTER_URL, SOCIALS } from './components/site-data';

export default function Home() {
  return (
    <>
      <SiteNav />

      <a id="top" />

      {/* HERO */}
      <section className="wrap hero">
        <div className="hero-copy">
          <div className="eyebrow">Author · Speaker · Advocate</div>
          <div className="hero-script">this isn’t the story<br />you think it is</div>
          <h1>From the velvet ropes to the unfiltered truth.</h1>
          <p className="lead">I’ve lived a big, beautiful, complicated life — magazine covers and velvet ropes, heartbreak and healing, deep faith and a whole lot of laughter. I’m done hiding the hard parts, and I’m sure not hiding the fun ones either. Come as you are. So will I.</p>
          <div className="hero-ctas">
            <a href={KIT_FREE_CHAPTER_URL} className="btn btn-primary">Read the first chapter free</a>
            <a href="/book" className="btn btn-ghost">Get the book</a>
          </div>
        </div>
        <div className="hero-media">
          <img className="portrait" src="/assets/jen-headshot-blazer.jpg" alt="Jen Archuleta" />
        </div>
      </section>

      {/* TAGLINE */}
      <section className="wrap tagline" style={{ paddingBlock: 'var(--space-9)' }}>
        <div className="threshold-rule"><span className="diamond" /></div>
        <p className="q">“Your story isn’t what happened to you. It’s what you do with it.”</p>
        <div className="threshold-rule"><span className="diamond" /></div>
      </section>

      {/* PILLARS */}
      <section className="wrap pillars">
        <div className="p">
          <div className="eyebrow">Story</div>
          <h4>The Author</h4>
          <p>Her memoir, <em>Beyond the Velvet Ropes</em> — and the writing that turns hard chapters into hope.</p>
          <p><a href="/book" className="btn btn-ghost btn-sm">The book</a></p>
        </div>
        <div className="p">
          <div className="eyebrow">Voice</div>
          <h4>The Speaker</h4>
          <p>Faith, resilience, and reinvention — on stages and wherever women are rebuilding.</p>
          <p><a href="#speaking" className="btn btn-ghost btn-sm">Speaking</a></p>
        </div>
        <div className="p">
          <div className="eyebrow">Heart</div>
          <h4>The Advocate</h4>
          <p>Beyond the Ropes and The Forever Angels — choosing the overlooked, one act at a time.</p>
          <p><a href="#movement" className="btn btn-ghost btn-sm">The movement</a></p>
        </div>
      </section>

      {/* BOOK (dark register) */}
      <section id="book" className="book dark">
        <div className="wrap inner">
          <div><img className="book-cover" src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes book cover" /></div>
          <div>
            <div className="eyebrow">The Memoir — Out Now</div>
            <h2>Beyond the Velvet Ropes</h2>
            <p className="sub">My Story of Perseverance, Hope, and Love</p>
            <p>From the outside, it looked like everything most people dream of — fame, beauty, opportunity, a life behind the velvet ropes. But that’s not where this story lives. It lives in the moments no one saw. The ones you don’t talk about. The ones you carry.</p>
            <p>Raw. Honest. Real. A story of survival, resilience, and the quiet strength it takes to become who you were always meant to be.</p>
            <div className="buy-row">
              {/* TODO: replace # with live retailer links on launch day */}
              <a href="#" className="btn btn-primary">Amazon</a>
              <a href="#" className="btn btn-ghost">Barnes &amp; Noble</a>
              <a href="#" className="btn btn-ghost">Audiobook</a>
            </div>
            <p style={{ marginTop: '6px' }}><a href={KIT_FREE_CHAPTER_URL}>Or read the first chapter free →</a></p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="wrap">
        <div className="story-grid">
          <div>
            <div className="eyebrow">The Story</div>
            <h2>The girl they underestimated.</h2>
            <p>I grew up in a small Ohio town being told what I couldn’t do. I’ve been the quiet one, the fighter, the survivor — and the woman on the magazine cover, smiling while she was breaking inside.</p>
            <p>I’ve lived through things I was never supposed to survive. For a long time I stayed silent about all of it. Then I stopped surviving long enough to actually heal — and I learned that your worst chapters can become your purpose.</p>
            <p className="pull">“You didn’t need rescuing. You needed time. Time to find your voice. Time to believe it mattered.”</p>
            <a href={KIT_FREE_CHAPTER_URL} className="btn btn-ghost">Start with the first chapter</a>
          </div>
          <div className="ph"><img src="/assets/jen-bw-coat.jpg" alt="Jen Archuleta portrait" /></div>
        </div>
      </section>

      {/* MEET JEN (beauty + personality) */}
      <section className="wrap">
        <div className="center">
          <div className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>the fun part…</div>
          <div className="eyebrow">Meet Jen</div>
          <h2>Beautiful, a little bit of trouble, and not done yet.</h2>
          <p className="lead" style={{ maxWidth: '62ch', marginInline: 'auto' }}>Let’s be honest — I’ve never minded the camera. Magazine covers, red carpets, and still sweating it out in the gym at 50. I love getting dressed up, I love a good laugh, and I love my rescue dogs almost as much as my kids. Faith, family, and fun — all at once. The smile is real, and so is the rest of me.</p>
        </div>
        {/* TODO photo-row hidden until hi-res jen-glam.jpg + jen-fun.jpg are added to /assets.
            To restore: uncomment the photo-row below. */}
        {/*
        <div className="photo-row">
          <img src="/assets/jen-glam.jpg" alt="Jen Archuleta" />
          <img src="/assets/jen-fun.jpg" alt="Jen Archuleta" />
          <img src="/assets/jen-fitness.jpg" alt="Jen Archuleta — fit at 50" />
        </div>
        */}
        <div className="center" style={{ marginTop: '26px' }}>
          <a href={SOCIALS.instagram} className="btn btn-ghost">Follow along on Instagram</a>
        </div>
      </section>

      {/* MOVEMENT */}
      <section id="movement" className="wrap creed" style={{ background: 'var(--surface)' }}>
        <div className="eyebrow">Beyond the Ropes</div>
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

      {/* JOURNAL */}
      <section id="journal" className="wrap">
        <div className="center"><div className="eyebrow">The Journal</div><h2>Notes from the road back to myself.</h2>
          <p className="lead" style={{ maxWidth: '56ch', marginInline: 'auto' }}>Short, honest writing on faith, family, healing, and starting over.</p></div>
        <div className="cards-3">
          <a className="mini" href="/journal"><div className="body"><div className="k">Faith</div><h4>It is in the waiting that we become who we’re meant to be.</h4></div></a>
          <a className="mini" href="/journal"><div className="body"><div className="k">Healing</div><h4>Survival isn’t the same thing as healing.</h4></div></a>
          <a className="mini" href="/journal"><div className="body"><div className="k">Family</div><h4>What I want my kids to know about getting back up.</h4></div></a>
        </div>
        <div className="center" style={{ marginTop: '28px' }}><a href="/journal" className="btn btn-ghost">Read the journal</a></div>
      </section>

      {/* SHOP */}
      <section id="shop" className="wrap" style={{ background: 'var(--surface)' }}>
        <div className="center"><div className="eyebrow">The Shop</div><h2>Wear the story.</h2>
          <p className="lead" style={{ maxWidth: '58ch', marginInline: 'auto' }}>Signed copies and the Unfiltered collection — message-driven pieces that remind you of your worth. A portion gives back through The Forever Angels.</p></div>
        <div className="cards-3">
          <div className="mini"><div className="body"><div className="k">Book</div><h4>Signed copy — <em>Beyond the Velvet Ropes</em></h4><p className="foot-meta">Coming soon</p></div></div>
          <div className="mini"><div className="body"><div className="k">Apparel</div><h4>The Unfiltered Collection</h4><p className="foot-meta">Coming soon</p></div></div>
          <div className="mini"><div className="body"><div className="k">Give back</div><h4>The Forever Angels</h4><p className="foot-meta">Learn more →</p></div></div>
        </div>
      </section>

      {/* CAPTURE */}
      <section id="speaking" className="capture">
        <div className="wrap text-wrap">
          <div className="eyebrow">Stay close</div>
          <h2>Read the first chapter — free.</h2>
          <p className="lead">Before the velvet ropes. Before the headlines. The real story. I’ll send the opening pages straight to your inbox — and if it sounds like something you’ve lived too, you’re exactly who I wrote it for.</p>
          <a href={KIT_FREE_CHAPTER_URL} className="btn btn-primary">Send me the first chapter</a>
          <p className="foot-meta" style={{ marginTop: '14px' }}>You’ll also get my newsletter. Unsubscribe anytime.</p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
