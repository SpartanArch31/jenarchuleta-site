import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import HomeCarousel from './components/HomeCarousel';

// Home is a short welcome and photos. The other pages are in the header.
export default function Home() {
  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap hero">
        <div className="hero-copy">
          <div className="eyebrow">Author · Speaker · Advocate</div>
          <div className="hero-script">this isn’t the story<br />you think it is</div>
          <h1>Faith, family, and a bunch of rescues.</h1>
          <div className="eyebrow" style={{ marginTop: '16px' }}>Author of <em>Beyond the Velvet Ropes</em></div>
        </div>
        <div className="hero-media">
          <div className="portrait hero-frame">
            <img src="/assets/presskit-headshot-floral.jpg" alt="Jen Archuleta smiling in a floral top" width="1100" height="1370" />
          </div>
        </div>
      </section>

      <HomeCarousel />

      <SiteFooter />
    </>
  );
}
