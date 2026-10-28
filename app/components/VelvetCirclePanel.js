import './velvet-circle-panel.css';
import { SHOP, STRIPE_CUSTOMER_PORTAL_URL } from './site-data';

// What the $9.99 membership is, said plainly BEFORE anyone subscribes.
// Jen's rules (October 28, 2026): the Velvet Circle is the MONTHLY BOOK CLUB.
// It includes the one-page discussion guide and up to three questions a month
// that Jen answers personally in writing. Monthly group Zooms begin once 13
// active paying members have joined. It never includes a signed book, the
// bookmark, bunny ears, or any other physical item; those are only in The
// Backstage Bundle (the one-time gift). Never promise Zooms as an immediate
// benefit. The bunny-ears photo belongs with the bundle, not here, so nobody
// thinks the membership includes the ears.
export const VELVET_CIRCLE_PERKS = [
  'A one-page discussion guide for the book',
  'Up to three questions a month about the book and my experiences, answered personally by me in writing',
  'Monthly group Zooms begin once 13 active paying members have joined',
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
          alt="The Velvet Circle"
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
            The Velvet Circle: my private book club for readers of Beyond the Velvet Ropes.
          </h2>
          <p className="vc-announce-line">
            Real conversations. Untold stories. A place to connect, ask questions, and grow together.
          </p>
          <ul className="vc-announce-perks">
            {VELVET_CIRCLE_PERKS.map((perk) => <li key={perk}>{perk}</li>)}
          </ul>
          <p className="vc-announce-box">
            Looking for the signed book, bookmark, and bunny ears? That’s{' '}
            <a href="/shop#backstage-bundle">The Backstage Bundle</a>, a one-time gift. It doesn’t
            sign you up for the Velvet Circle.
          </p>
          {join ? (
            <a className="btn btn-primary" href={join} target="_blank" rel="noopener noreferrer">
              Join the Velvet Circle
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
