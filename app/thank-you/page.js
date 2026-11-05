import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

export const metadata = {
  title: 'Thank You',
  description: 'Thank you for supporting Jen Archuleta and Beyond the Velvet Ropes.',
};

export default function ThankYouPage() {
  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <section id="main-content" className="wrap hero">
        <div className="hero-copy">
          <h1>Thank you</h1>
          <p>
            Thank you for supporting me and this book. So many of you have reached out to tell me you could relate, that it changed you, or that it inspired you. Thank you for letting my honesty matter.
          </p>
          <p className="q" style={{ marginTop: '28px' }}>“Your story isn’t what happened to you. It’s what you do with it.”</p>
        </div>
        <div className="hero-media">
          <div className="portrait hero-frame">
            <img src="/assets/jen-joy.jpg" alt="Jen Archuleta smiling" width="841" height="1960" />
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
