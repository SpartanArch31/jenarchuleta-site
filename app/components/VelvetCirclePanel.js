import './velvet-circle-panel.css';
import { SHOP, STRIPE_CUSTOMER_PORTAL_URL } from './site-data';

// What the $9.99 membership is, said plainly BEFORE anyone subscribes.
// Jen's rules (October 28, 2026): the Velvet Circle is the MONTHLY BOOK CLUB.
// It includes the one-page discussion guide and up to three questions a month
// that Jen answers personally in writing. Monthly group Zooms begin once 13
// active paying members have joined. It never includes a signed book, the
// bookmark, or any other physical item; the signed book and the bookmark are
// sold separately in the Shop. Never promise Zooms as an immediate benefit.
// November 3 (Jen): the book club is the one book-club offer; the old
// Backstage Bundle is gone.
// November 3 (Adam): say what members get NOW, how they send questions (email,
// SHOP.velvetCircleQuestionsEmail), and that Zooms start at 13 paying members.
// The Shop card (app/shop/page.js) carries the live copy; this panel isn't on
// any page right now, and its list is kept matching in case it comes back.
export const VELVET_CIRCLE_PERKS = [
  'A one-page discussion guide for the book, emailed to you after you join',
  `Up to three questions a month about the book and my experiences, answered personally by me in writing. Email them to ${SHOP.velvetCircleQuestionsEmail}.`,
  'Monthly group Zooms begin once 13 paying members join',
  '$9.99 a month. Cancel anytime.',
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
            The Velvet Circle Book Club: my private book club for readers of Beyond the Velvet Ropes.
          </h2>
          <p className="vc-announce-line">
            Real conversations. Untold stories. A place to connect, ask questions, and grow together.
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
