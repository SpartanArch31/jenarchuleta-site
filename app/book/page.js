import './book.css';
import { KIT_FREE_CHAPTER_URL } from '../components/site-data';

export const metadata = {
  title: 'Beyond the Velvet Ropes',
  description:
    'Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love by Jennifer Walcott Archuleta. Out now. Read the first chapter free.',
};

export default function BookPage() {
  return (
    <div className="dark book-page">
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="brand">Jen Archuleta</a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href={KIT_FREE_CHAPTER_URL} className="btn btn-primary btn-sm">Free Chapter</a>
          </div>
        </div>
      </nav>

      {/* HERO (dark register, echoes the cover) */}
      <section className="hero-section dark" style={{ background: 'var(--bg)' }}>
        <div className="wrap hero">
          <div><img className="hero-cover" src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes book cover" width="1707" height="2560" /></div>
          <div>
            <div className="eyebrow">The Memoir — Out Now</div>
            <h1>Beyond the Velvet Ropes</h1>
            <p className="sub">My Story of Perseverance, Hope, and Love</p>
            <p style={{ color: 'var(--text)' }}>This isn’t the story you think it is. From the outside it looked like everything most people dream of — fame, beauty, a life behind the velvet ropes. But the real story lives in the moments no one saw. Raw. Honest. Real.</p>
            <div className="buy-row">
              <a href="https://www.amazon.com/dp/B0H6YZWDT3" target="_blank" rel="noopener" className="btn btn-primary">Paperback (Amazon)</a>
              <a href="https://www.barnesandnoble.com/w/beyond-the-velvet-ropes-jennifer-walcott-archuleta/1150495088?ean=9798182506885" target="_blank" rel="noopener" className="btn btn-ghost">Barnes &amp; Noble</a>
              <a href="https://www.amazon.com/dp/B0H6YK1KTL" target="_blank" rel="noopener" className="btn btn-ghost">Kindle (Amazon)</a>
              <a href="https://open.spotify.com/show/153EBrZVIkJY1xaY703km4" target="_blank" rel="noopener" className="btn btn-ghost">Audiobook (Spotify)</a>
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

      {/* EXCERPTS */}
      <section className="wrap text-wrap">
        <div className="center"><div className="eyebrow">From the pages</div></div>
        <p className="pull">“I’ve lost people by being myself, but I would have lost myself by being who they wanted.”</p>
        <p className="pull">“You didn’t need rescuing. You needed time. Time to find your voice. Time to believe it mattered.”</p>
        <p className="pull">“To those who doubted me — you didn’t break me. You made me fight harder. And still, I forgive you.”</p>
      </section>

      {/* FILM NOTE */}
      <section className="who center">
        <div className="wrap text-wrap">
          <h2>A film adaptation is in development.</h2>
          <p className="lead" style={{ maxWidth: '54ch', marginInline: 'auto' }}>The story is being adapted for the screen. More to come.</p>
        </div>
      </section>

      {/* CAPTURE */}
      <section className="capture">
        <div className="wrap text-wrap">
          <div className="eyebrow">Start reading</div>
          <h2>Read the first chapter — free.</h2>
          <p className="lead">I’ll send the opening pages straight to your inbox. If it sounds like something you’ve lived too, you’re exactly who I wrote it for.</p>
          <a href={KIT_FREE_CHAPTER_URL} className="btn btn-primary">Send me the first chapter</a>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p className="foot-meta">© 2026 Jen Archuleta — Jennifer Walcott Archuleta. <a href="/">Home</a></p>
        </div>
      </footer>
    </div>
  );
}
