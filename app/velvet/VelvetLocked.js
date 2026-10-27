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
// Wording is Jen's, exactly as she wrote it (October 27, 2026).
export default function VelvetLocked() {
  return (
    <div className="dark vl-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="vl-invite">
        <div className="vl-inner">
          <KeyIcon />
          <h1 className="vl-title">The Velvet Letter</h1>
          <p className="vl-hook">Some things only live inside the book.</p>
          <p className="vl-body">
            A private collection of stories, photographs, reflections, and behind-the-scenes moments reserved for readers of <em>Beyond the Velvet Ropes</em>.
          </p>
          <p className="vl-script">Your invitation is waiting inside the book.</p>
          <VelvetGate />
          <p className="vl-small">
            Already have the book? Find your secret passcode beside the QR code inside the back cover.
          </p>
        </div>
      </section>

      <SiteFooter stayClose={false} />
    </div>
  );
}
