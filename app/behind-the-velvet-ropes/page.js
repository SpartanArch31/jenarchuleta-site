import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import VelvetKey from '../components/VelvetKey';

export const metadata = {
  title: 'Velvet Ropes',
  description: 'Buy the book. The last page holds a QR code and the passcode to a secret Velvet Letter.',
};

export default function VelvetRopesPage() {
  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <section id="main-content" className="wrap hero">
        <div className="hero-copy">
          <VelvetKey className="velvet-ropes-key" />
          <h1>Velvet Ropes</h1>
          <p>
            Want to get behind the velvet ropes? Buy the book, because it doesn’t stop there. The last page has a QR code with the passcode to a secret Velvet Letter.
          </p>
          <p style={{ marginTop: '22px' }}>
            <a className="btn btn-primary" href="/book#buy">Buy the book</a>
          </p>
        </div>
        <div className="hero-media">
          <img src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes book cover" width="1000" height="1500" />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
