import './velvet-invite.css';

// A short invitation to The Velvet Letter. The full invitation (and the
// passcode field) is on /velvet. Wording is Jen's.
export default function VelvetInvite({ compact = false }) {
  return (
    <section className={`velvet-invite dark${compact ? ' is-compact' : ''}`} aria-labelledby="velvet-invite-title">
      <div className="wrap velvet-invite-inner">
        <svg className="velvet-invite-key" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="8.2" cy="8.2" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11.6 11.2 L20 19.2 M15.6 16.4 L18.4 19.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="velvet-invite-eyebrow" id="velvet-invite-title">The Velvet Letter</p>
        <p className="velvet-invite-hook">Some things only live inside the book.</p>
        <p className="velvet-invite-script">Your invitation is waiting inside the book.</p>
        <div className="velvet-invite-actions">
          <a className="btn btn-primary" href="/book">Get the Book</a>
          <a className="btn btn-ghost" href="/velvet">Enter Your Passcode</a>
        </div>
      </div>
    </section>
  );
}
