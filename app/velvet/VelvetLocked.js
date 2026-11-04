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
// Jen's site notes (November 4, 2026): the only public words about the Velvet
// Letter are her mystery line. Nothing here says where the passcode is or
// shows a QR code. The passcode field stays, for readers who came here from
// the QR code in their book. The Velvet Letter is never sold separately and
// never part of the Velvet Circle.
export default function VelvetLocked() {
  return (
    <div className="dark vl-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="vl-invite">
        <div className="vl-inner">
          <KeyIcon />
          <h1 className="vl-title">The Velvet Letter</h1>
          <p className="vl-hook">
            Would you like to see the Velvet Letter? <a href="/book#buy">Buy my book</a>, and you’ll find out how.
          </p>
          <VelvetGate />
        </div>
      </section>

      <SiteFooter stayClose={false} />
    </div>
  );
}
