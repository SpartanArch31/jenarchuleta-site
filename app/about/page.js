import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { KIT_FREE_CHAPTER_URL } from '../components/site-data';

export const metadata = {
  title: 'About',
  description:
    'Jen Archuleta — wife, mom of three, podcast host, author of Beyond the Velvet Ropes, and founder of The Forever Angels.',
};

export default function AboutPage() {
  return (
    <>
      <SiteNav />

      <section className="wrap">
        <div className="story-grid">
          <div>
            <div className="eyebrow">About</div>
            <h1>Hi, I’m Jen.</h1>
            <p className="lead">
              I’m a wife, mom of three, podcast host, author, nonprofit founder, and a
              lifelong believer that our greatest struggles can become our greatest purpose.
            </p>
            <p>
              Over the years, I’ve worn many hats and lived through experiences that shaped
              who I am today. Those chapters inspired my memoir, <em>Beyond the Velvet Ropes</em>,
              my podcast <em>Unfiltered with Jen Archuleta</em>, and <em>The Forever Angels</em>,
              a nonprofit dedicated to making a difference in the lives of others.
            </p>
            <p>
              Whether I’m interviewing inspiring guests, writing, advocating for rescue animals,
              or spending time with my family, my goal is the same: to encourage people to
              embrace their own stories with honesty, courage, and hope.
            </p>
            <p>
              Thank you for being here. I hope something you find on this site reminds you that
              your story matters — and that even life’s most unexpected paths can lead to
              something meaningful.
            </p>
            <div className="hero-ctas" style={{ marginTop: '10px' }}>
              <a href="/book" className="btn btn-primary">The Book</a>
              <a href="/podcast" className="btn btn-ghost">The Podcast</a>
              <a href={KIT_FREE_CHAPTER_URL} className="btn btn-ghost">First chapter free</a>
            </div>
          </div>
          <div className="ph"><img src="/assets/jen-beauty.jpg" alt="Jen Archuleta" /></div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
