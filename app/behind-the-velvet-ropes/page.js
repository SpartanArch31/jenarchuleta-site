import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import VelvetKey from '../components/VelvetKey';

export const metadata = {
  title: 'Velvet Ropes',
  description: 'The story doesn’t end on the last page. Find the QR code in the back of the book to unlock the secret Velvet Letters.',
};

export default function VelvetRopesPage() {
  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <section id="main-content" className="wrap hero">
        <div className="hero-copy">
          <h1>Velvet Ropes</h1>
          <VelvetKey className="velvet-ropes-key" />
          <h2>What are the Velvet Letters?</h2>
          <p>The story doesn’t end on the last page. Find the QR code in the back of the book to unlock the secret Velvet Letters.</p>
          <p style={{ marginTop: '22px' }}>
            <a className="btn btn-primary velvet-unlock" href="/velvet">
              <VelvetKey className="velvet-ropes-key" />
              Unlock the secret Velvet Letters
            </a>
          </p>
          <p className="foot-meta" style={{ marginTop: '16px' }}>No passcode yet? Buy the book to find it.</p>
          <p style={{ marginTop: '10px' }}>
            <a className="btn btn-ghost" href="/book#buy">Buy the book</a>
          </p>
          {/* Jen, Nov 5: one line for audiobook buyers. Never put the companion's password on the site. */}
          <p className="foot-meta" style={{ marginTop: '22px' }}>Audiobook listeners will find the way into the Velvet Letters in the photo companion that comes with the audiobook.</p>
        </div>
        <div className="hero-media">
          <img src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes book cover" width="1000" height="1500" />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
