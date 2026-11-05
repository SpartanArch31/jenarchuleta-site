import './velvet-circle-panel.css';
import { SHOP, STRIPE_CUSTOMER_PORTAL_URL } from './site-data';

// Kept in step with the Shop card. Not mounted on a page right now.
// Both tiers are the existing $9.99/month Payment Link (Jen, November 5).
export const VELVET_CIRCLE_PERKS = [
  'Tier 1, groups of 12 or fewer: a sneak peek of the discussion guide, The Velvet Letter with the gold key, the velvet bookmark, three questions a month answered promptly and in detail, cancel anytime',
  'Tier 2, groups of 13 or more: everything in Tier 1, a signed copy of the book, and a live monthly Zoom with Jen',
  'Live monthly Zoom with Jen only happens when the group has 13 or more members. Under 13, membership is the three questions a month, plus the Tier 1 extras.',
  `${SHOP.velvetCircleMembershipPrice}. Cancel anytime.`,
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
          <ul className="vc-announce-perks">
            {VELVET_CIRCLE_PERKS.map((perk) => <li key={perk}>{perk}</li>)}
          </ul>
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
