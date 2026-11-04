import './velvet-invite.css';

// The Velvet Letter, as the public site shows it: Jen's mystery line and
// nothing more (Jen's site notes, November 4, 2026: "Would you like to see the
// Velvet Letter? Buy my book, and you'll find out how." No QR code, no
// passcode, no passcode box, and no link to /velvet anywhere on the public
// site). The QR code printed in the book still opens /velvet.
export const VELVET_MYSTERY = 'Would you like to see the Velvet Letter? Buy my book, and you’ll find out how.';

export default function VelvetInvite({ compact = false, buyHref = '/book#buy' }) {
  return (
    <section id="velvet-letter" className={`velvet-invite dark${compact ? ' is-compact' : ''}`} aria-labelledby="velvet-invite-title">
      <div className="wrap velvet-invite-inner">
        <svg className="velvet-invite-key" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="8.2" cy="8.2" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11.6 11.2 L20 19.2 M15.6 16.4 L18.4 19.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="velvet-invite-hook" id="velvet-invite-title">
          Would you like to see the Velvet Letter? <a href={buyHref}>Buy my book</a>, and you’ll find out how.
        </p>
      </div>
    </section>
  );
}
