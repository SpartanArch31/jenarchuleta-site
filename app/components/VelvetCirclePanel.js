import './velvet-circle-panel.css';
import { SHOP, STRIPE_CUSTOMER_PORTAL_URL } from './site-data';

// What the $9.99 membership is, said plainly BEFORE anyone subscribes.
// Jen's rules (October 27, 2026): members can email her questions about the
// book and her experiences; monthly group Zooms begin once 13 active members
// have joined. Never promise signed books, gifts, or monthly Zooms as
// immediate benefits of the $9.99 subscription.
export const VELVET_CIRCLE_PERKS = [
  'Email me your questions about the book and my experiences, and I’ll answer in writing (up to 3 a month)',
  'Monthly group Zoom conversations begin once 13 active members have joined',
  '$9.99 a month. Cancel anytime.',
];

export default function VelvetCirclePanel() {
  const join = SHOP.velvetCircleMembership;

  return (
    <section className="vc-announce" aria-labelledby="vc-announce-title">
      <div className="vc-announce-photo">
        <img
          className="vc-watermark"
          src="/assets/velvet-circle-watermark.png"
          alt=""
          width="436"
          height="436"
        />
        <div className="vc-announce-frame">
          <img
            src="/assets/velvet-circle-group.jpg"
            alt="A younger group together, three of them wearing black bunny ears, holding copies of Beyond the Velvet Ropes"
            width="1152"
            height="864"
          />
        </div>
      </div>

      <div className="vc-announce-copy">
        <div className="vc-announce-text">
          <p className="vc-announce-eyebrow">THE VELVET CIRCLE</p>
          <h2 id="vc-announce-title">
            My private book club for readers of Beyond the Velvet Ropes.
          </h2>
          <p className="vc-announce-line">
            Real conversations. Untold stories. A place to connect, ask questions, and grow together.
          </p>
          <ul className="vc-announce-perks">
            {VELVET_CIRCLE_PERKS.map((perk) => <li key={perk}>{perk}</li>)}
          </ul>
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
