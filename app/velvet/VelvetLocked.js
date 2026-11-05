import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import VelvetGate from './Gate';
import './teaser.css';

function KeyIcon() {
  return (
    <svg className="vl-key" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8.2" cy="8.2" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.6 11.2 L20 19.2 M15.6 16.4 L18.4 19.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// The public invitation. Nothing private is fetched or rendered here.
// Jen's short entrance (November 2026): the title, one line, Get the Book,
// and the passcode field. Access comes with the book. The Velvet Letter is
// never sold separately and never part of the Velvet Circle.
export default function VelvetLocked() {
  return (
    <div className="dark vl-page">
      {/* VL-M1: skip link first in tab order, target is the <main> landmark */}
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />

      <main id="main-content">
      <section className="vl-invite">
        <div className="vl-inner">
          <KeyIcon />
          <h1 className="vl-title">The Velvet Letters</h1>
          <p className="vl-hook">Some things only live inside the book.</p>
          <div className="vl-buttons">
            <a className="btn btn-primary" href="/book">Get the Book</a>
          </div>
          <VelvetGate />
          <p className="vl-small" id="velvet-passcode-note">
            Access comes with the book. Your passcode is in the back of the book, under the QR code.
          </p>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  );
}
