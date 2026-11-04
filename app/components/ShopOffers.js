import { SHOP, STRIPE_CUSTOMER_PORTAL_URL } from './site-data';
import '../shop/shop.css';

// THE SHOP, on the Book page (Jen's site notes, November 4, 2026: "fold Shop
// into Book: signed copy, Velvet Circle Book Club, bookmark, FAQs"). /shop now
// forwards here and keeps its old #signed-copy, #velvet-circle, #bookmark and
// #velvet-circle-faq links working. A light band on the dark Book page.
//
// Every card says what you get, the real price with shipping, and when it
// ships or starts (Adam, Nov 3). The Stripe checkouts say the same thing.

// Small reassurance line under each live buy button.
function TrustLine({ note = 'Secure checkout. Stripe, Apple Pay, Google Pay' }) {
  return (
    <>
      <p className="trust">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        {note}
      </p>
      <p className="foot-meta">
        By ordering, you agree to our <a href="/terms">Terms</a> and{' '}
        <a href="/shipping-returns">Shipping &amp; Returns</a> policy.
      </p>
    </>
  );
}

const capitalize = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : text);

// The one email for everything (Jen, Nov 4), with a subject line so member
// questions are easy to spot.
function QuestionsEmail() {
  const email = SHOP.velvetCircleQuestionsEmail;
  return <a href={`mailto:${email}?subject=Velvet%20Circle%20question`}>{email}</a>;
}

export default function ShopOffers() {
  // Bookmark details (Adam, Nov 3: size, packaging, when it ships). A line only
  // shows once its value is filled in, in SHOP (site-data.js).
  const bookmarkFacts = [
    ['Size', SHOP.bookmarkSize],
    ['Packaging', SHOP.bookmarkPackaging],
    ['Ships', capitalize(SHOP.bookmarkShips)],
  ].filter(([, value]) => value);

  return (
    <div className="shop-page light">
      <section id="shop" className="wrap">
        <div className="center">
          <div className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>the good stuff…</div>
          <div className="eyebrow">The Shop</div>
          <h2>A few things worth sharing.</h2>
          <p className="lead" style={{ maxWidth: '58ch', marginInline: 'auto' }}>
            A signed copy of the book, my private book club, and a keepsake I make by hand.
          </p>
        </div>

        <div className="product-grid">
          {/* SIGNED BOOK: priced as the total, $35 + $6.99 shipping. */}
          <article className="product-card" id="signed-copy">
            <div className="product-media product-media--contain">
              {SHOP.signedBookSoldOut && <span className="badge">Sold out. Restocking soon.</span>}
              <img
                src="/assets/book-cover.jpg"
                alt="Beyond the Velvet Ropes book cover"
                loading="lazy"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">The Book</div>
              <h3>Signed copy, <em>Beyond the Velvet Ropes</em></h3>
              <div className="price-block">
                <p className="price">
                  {SHOP.signedBookTotal} <span className="price-unit">total</span>
                </p>
                <p className="price-note">
                  {SHOP.signedBookPrice} book + {SHOP.signedBookShipping} shipping, US only
                </p>
              </div>
              <p className="product-desc">
                For you, or for someone who needs to hear that their story isn’t over. At
                checkout, tell me who to make it out to.
              </p>
              <p className="fulfill fulfill--key">
                {SHOP.signedBookSoldOut ? SHOP.signedBookSoldOutNote : SHOP.signedBookLeadTime}
              </p>
              <div className="product-cta">
                {SHOP.signedBookSoldOut ? (
                  <span className="btn btn-disabled">Sold out. Restocking soon.</span>
                ) : SHOP.signedBook ? (
                  <>
                    <a href={SHOP.signedBook} target="_blank" rel="noopener" className="btn btn-primary">
                      Order a signed copy
                    </a>
                    <TrustLine />
                  </>
                ) : (
                  <span className="btn btn-disabled">Coming soon</span>
                )}
              </div>
            </div>
          </article>

          {/* THE VELVET CIRCLE BOOK CLUB: the one book-club offer (Jen, November 3).
              #backstage-bundle and #backstage-box stay so older bundle links land here.
              Never promise monthly live meetings or replays as current, here or in
              Stripe, until they are actually running. */}
          <article className="product-card" id="velvet-circle">
            <span id="backstage-bundle" />
            <span id="backstage-box" />
            <div className="product-media">
              <img
                src="/assets/velvet-circle-group.jpg"
                alt="Readers gathered with copies of Beyond the Velvet Ropes, some wearing black bunny ears"
                width="1152"
                height="864"
                loading="lazy"
              />
              <img className="vc-card-mark" src="/assets/velvet-circle-mark.png" alt="" width="436" height="436" loading="lazy" />
            </div>
            <div className="product-body">
              <div className="eyebrow">Monthly Book Club</div>
              <h3>The Velvet Circle Book Club</h3>
              <div className="price-block">
                <p className="price">{SHOP.velvetCircleMembershipPrice}</p>
                <p className="price-note">Billed monthly. Cancel anytime.</p>
              </div>
              <p className="product-desc">
                My private book club for readers of <em>Beyond the Velvet Ropes</em>.
              </p>
              <div className="offer-group">
                <p className="offer-label">What you get now</p>
                <ul className="product-list">
                  <li>A one-page discussion guide for the book, emailed to you after you join.</li>
                  <li>
                    Up to three questions a month about the book and my experiences, answered
                    personally by me, in writing. Email them to <QuestionsEmail />.
                  </li>
                </ul>
              </div>
              <div className="offer-group">
                {/* Jen's wording, November 4. */}
                <p className="offer-label">Zoom sessions start once 13 members join</p>
                <ul className="product-list">
                  <li>Monthly group Zoom conversations with me.</li>
                </ul>
              </div>
              <p className="fulfill">
                <a href="#velvet-circle-faq">Book Club FAQs</a>
              </p>
              <div className="product-cta">
                {SHOP.velvetCircleMembership ? (
                  <>
                    <a href={SHOP.velvetCircleMembership} target="_blank" rel="noopener" className="btn btn-primary">
                      Join the Velvet Circle Book Club
                    </a>
                    <TrustLine />
                  </>
                ) : (
                  <span className="btn btn-disabled">Coming soon</span>
                )}
              </div>
            </div>
          </article>

          {/* SIGNATURE VELVET BOOKMARK: $24.99, shipping included, US only. */}
          <article className="product-card" id="bookmark">
            <div className="product-media product-media--contain">
              {!SHOP.bookmark && <span className="badge">First drop, coming soon</span>}
              <img
                src="/assets/bookmark.jpg"
                alt="The Signature Velvet Bookmark, black velvet ribbon, a gold heart engraved “you matter. everyone belongs”, and a vintage key pressed in burgundy wax, resting on an open copy of the book"
                loading="lazy"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">Handmade Keepsake</div>
              <h3>The Signature Velvet Bookmark</h3>
              <div className="price-block">
                <p className="price">{SHOP.bookmarkPrice}</p>
                <p className="price-note">{SHOP.bookmarkShipping}</p>
              </div>
              <p className="product-desc">
                Black velvet with gold detailing, a vintage-style key pressed into a
                burgundy wax seal, and a gold heart engraved with a reminder I believe
                in: <em>you matter, everyone belongs.</em> Handmade by me, one at a
                time. <strong>Every story is different. Every key is different, so no
                two are ever alike.</strong>
              </p>
              {bookmarkFacts.length > 0 && (
                <dl className="offer-facts">
                  {bookmarkFacts.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <p className="fulfill">Made in small batches · every piece one of a kind</p>
              <div className="product-cta">
                {SHOP.bookmark ? (
                  <>
                    <a href={SHOP.bookmark} target="_blank" rel="noopener" className="btn btn-primary">
                      Buy the bookmark
                    </a>
                    <TrustLine />
                  </>
                ) : SHOP.bookmarkWaitlist ? (
                  <>
                    <a href={SHOP.bookmarkWaitlist} target="_blank" rel="noopener" className="btn btn-primary">
                      Join the first-drop list
                    </a>
                    <p className="fulfill">Small handmade batches. The list hears first.</p>
                  </>
                ) : (
                  <>
                    <span className="btn btn-disabled">Coming soon</span>
                    <p className="fulfill">First batch is being made now.</p>
                  </>
                )}
              </div>
            </div>
          </article>
        </div>

        <p className="assurance">
          Every direct order checks out securely.
        </p>
      </section>

      {/* AND A LITTLE MORE: the Be the Bumblebee tee, kept apart from the main
          products (Jen, Oct 28). It sells on Etsy, so it links out. */}
      <section className="wrap shop-more" style={{ paddingTop: 0 }}>
        <div className="center">
          <div className="threshold-rule" style={{ maxWidth: '220px', margin: '0 auto 30px' }}><span className="diamond" /></div>
          <div className="eyebrow">And a little more</div>
        </div>
        <div className="more-grid more-grid--one">
          <a className="mini" href={SHOP.etsyTee} target="_blank" rel="noopener noreferrer">
            <div className="body">
              <div className="k">Apparel · On Etsy</div>
              <h3>Be the Bumblebee T-shirt</h3>
              <p className="foot-meta">A little reminder to fly your own way. Shop it on Etsy →</p>
            </div>
          </a>
        </div>
      </section>

      {/* The Velvet Circle Book Club is explained once: its card above, then these
          questions (Jen, Oct 28). #velvet-circle-details stays as an anchor. */}
      <div id="velvet-circle-details" aria-hidden="true" />
      <section id="velvet-circle-faq" className="wrap text-wrap vc-faq">
        <div className="center">
          <div className="eyebrow">The Velvet Circle Book Club</div>
          <h2>Questions, answered.</h2>
        </div>
        <details>
          <summary>What do members get right now?</summary>
          <p>
            Two things: a one-page discussion guide for <em>Beyond the Velvet Ropes</em>, which I
            email to you after you join, and my personal answers to your questions, in writing, up
            to three a month.
          </p>
        </details>
        <details>
          <summary>How do I send my questions?</summary>
          <p>
            Email them to <QuestionsEmail /> from the email address you joined with, so I know
            it’s you. Ask me about the book or my experiences, up to three questions a month. I
            answer every one personally, in writing.
          </p>
        </details>
        <details>
          <summary>When do the Zoom sessions begin?</summary>
          <p>
            Once 13 members have joined, I’ll begin monthly group Zoom conversations and email
            every member the details. Until then, membership is the discussion guide and my
            written answers.
          </p>
        </details>
        <details>
          <summary>How does billing work?</summary>
          <p>
            Membership is $9.99 a month, billed monthly through Stripe until you cancel.
          </p>
        </details>
        <details>
          <summary>How do I cancel?</summary>
          <p>
            Anytime, on your own, from your Stripe account page:{' '}
            <a href={STRIPE_CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">manage or cancel your membership</a>.
          </p>
        </details>
        <details>
          <summary>Does membership include a signed book or gifts?</summary>
          <p>
            No. The $9.99 membership is the book club itself: the discussion guide and my written
            answers. My <a href="#signed-copy">signed book</a> and the{' '}
            <a href="#bookmark">velvet bookmark</a> are sold separately, above.
          </p>
        </details>
        <details>
          <summary>Is The Velvet Letter part of the membership?</summary>
          <p>
            No. The Velvet Letter comes with the book.
          </p>
        </details>
      </section>
    </div>
  );
}
