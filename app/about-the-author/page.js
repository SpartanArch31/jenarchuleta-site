import '../about/about.css';
import Image from 'next/image';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

export const metadata = {
  title: 'About the Author',
  description:
    'Jen Archuleta, author of Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love, and host of the podcast Unfiltered with Jen Archuleta.',
};

// About the Author (Jen, November 3, 2026): the formal page, kept apart from
// her personal About Me page. The wording is the professional bio that used
// to sit at the bottom of About. Film and documentary news has ONE home, the
// Media page (#film); link to it, never copy it here. Speaking lives on Media
// too (#speaking).
export default function AboutTheAuthorPage() {
  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="tim-wrap tim-author">
        <div>
          <Image
            className="tim-portrait"
            src="/assets/jen-headshot-signature.jpg"
            alt="Jen Archuleta smiling in a black top"
            width={1162}
            height={1597}
            sizes="(max-width: 860px) 88vw, 420px"
            quality={88}
            priority
          />
        </div>
        <div>
          <p className="eyebrow">About the Author</p>
          <h1 className="tim-h2 tim-author-title">Author, host, speaker, advocate.</h1>
          <p className="tim-lead">
            I’m the author of <em>Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love</em>,
            and the host of the podcast <em>Unfiltered with Jen Archuleta</em>.
          </p>
          <p className="tim-work-links">
            <a href="/book" className="btn btn-ghost btn-sm">The book</a>
            <a href="/podcast" className="btn btn-ghost btn-sm">The podcast</a>
            <a href="/media#film" className="btn btn-ghost btn-sm">Film and documentary</a>
            <a href="/media#speaking" className="btn btn-ghost btn-sm">Speaking</a>
            <a href="/media#press-kit" className="btn btn-ghost btn-sm">Press kit</a>
          </p>
          <p className="tim-author-back"><a href="/about">About me</a></p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
