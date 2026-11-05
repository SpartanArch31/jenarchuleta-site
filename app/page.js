import Image from 'next/image';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import HomeCarousel from './components/HomeCarousel';

// Home is a short welcome and photos. The other pages are in the header.
export default function Home() {
  return (
    <>
      {/* Skip link comes first so it is the first Tab stop (audit skip-link). */}
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />

      <main id="main-content">
        {/* hero--home: page-scoped spacing (audit HOME-04, HOME-06), see home-carousel.css */}
        <section className="wrap hero hero--home">
          <div className="hero-copy">
            <div className="eyebrow">Author · Speaker · Advocate</div>
            <div className="hero-script">this isn’t the story<br />you think it is</div>
            <h1>Faith, family, and a bunch of rescues.</h1>
            <div className="eyebrow">Author of <em>Beyond the Velvet Ropes</em></div>
          </div>
          <div className="hero-media">
            <div className="portrait hero-frame">
              {/* HOME-12: LCP image, so next/image with priority and a sized srcset */}
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

        <HomeCarousel />
      </main>

      <SiteFooter />
    </>
  );
}
