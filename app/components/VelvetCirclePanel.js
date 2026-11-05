import './velvet-circle-panel.css';
import { SHOP, STRIPE_CUSTOMER_PORTAL_URL } from './site-data';

// Kept in step with the Shop card. Not mounted on a page right now.
// One membership, the existing $9.99/month Payment Link.
export const VELVET_CIRCLE_PERKS = [
  'A sneak peek of the book club discussion guide (not the full guide)',
  'The Velvet Letters with the gold key',
  'The velvet bookmark',
  'Up to three questions a month, answered promptly and in detail',
  'Cancel anytime',
];

export default function VelvetCirclePanel() {
  const join = SHOP.velvetCircleMembership;

  return (
    <section className="vc-announce" aria-labelledby="vc-announce-title">
      {/* The circular Velvet Circle logo, whole (Jen: keep the logo). */}
      <div className="vc-announce-photo">
        <img
          className="vc-logo"
          src="/assets/velvet-circle-mark.png"
          alt="The Velvet Circle Book Club"
          width="436"
          height="436"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="vc-announce-copy">
        <div className="vc-announce-text">
          <p className="vc-announce-eyebrow">MONTHLY BOOK CLUB</p>
          <h2 id="vc-announce-title">
            The Velvet Circle Book Club
          </h2>
          <p className="vc-announce-line">
            Grab 13 of your favorite people, a bottle of something bubbly (sparkling water counts), and start a book club. Hit 13 and I'll see you on Zoom every month.
          </p>
          <p className="vc-announce-line">{SHOP.velvetCircleMembershipPrice}</p>
          <ul className="vc-announce-perks">
            {VELVET_CIRCLE_PERKS.map((perk) => <li key={perk}>{perk}</li>)}
          </ul>
          <p className="vc-announce-line">Once 13 paying members have joined, we’ll begin my monthly group Zoom.</p>
          {join ? (
            <a className="btn btn-primary" href={join} target="_blank" rel="noopener noreferrer">
              Join the Velvet Circle Book Club
            </a>
          ) : (
            <span className="btn btn-disabled">Coming soon</span>
          )}
          <p className="vc-announce-cancel">
            <a href={STRIPE_CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">Manage or cancel your membership</a>
          </p>
        </div>
      </div>
    </section>
  );
}
