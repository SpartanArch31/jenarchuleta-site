import { SHOP, STRIPE_CUSTOMER_PORTAL_URL } from '../components/site-data';
import { BOOK_CLUB_SNEAK_PEEK } from '../../lib/book-club-guide';
import '../shop/shop.css';

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

function GoldKey() {
  return (
    <svg className="gold-key" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8.2" cy="8.2" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M11.6 11.2 L20 19.2 M15.6 16.4 L18.4 19.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function QuestionsEmail() {
  const email = SHOP.velvetCircleQuestionsEmail;
  return <a href={`mailto:${email}?subject=Velvet%20Circle%20question`}>{email}</a>;
}

// Signed copy, Velvet Circle tiers, bookmark, and book club questions.
// The paperback chooser stays in BuyOptions. /shop redirects here.
export default function BookOffers() {
  const bookmarkFacts = [
    ['Size', SHOP.bookmarkSize],
    ['Packaging', SHOP.bookmarkPackaging],
  ].filter(([, value]) => value);

  return (
    <div className="shop-page" id="shop">
      <section className="wrap">
        <div className="product-grid">
          <article className="product-card" id="signed-copy">
            <div className="product-media product-media--contain">
              {SHOP.signedBookSoldOut && <span className="badge">Sold out. Restocking soon.</span>}
              <img
                src="/assets/book-cover.jpg"
                alt="Beyond the Velvet Ropes book cover"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">The Book</div>
              <h3>Signed copy, <em>Beyond the Velvet Ropes</em> by Jennifer Walcott Archuleta</h3>
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

          <article className="product-card product-card--club" id="velvet-circle">
            <span id="backstage-bundle" />
            <span id="backstage-box" />
            <div className="product-media">
              <img
                src="/assets/velvet-circle-group.jpg"
                alt="Readers gathered with copies of Beyond the Velvet Ropes by Jennifer Walcott Archuleta"
                width="1152"
                height="864"
              />
              <img className="vc-card-mark" src="/assets/velvet-circle-mark.png" alt="" width="436" height="436" />
            </div>
            <div className="product-body" id="velvet-circle-tiers">
              <div className="eyebrow">Monthly Book Club</div>
              <h3>The Velvet Circle Book Club</h3>
              <p className="club-nudge">
                Grab 13 of your favorite people, a bottle of something bubbly (sparkling water counts), and start a book club. Hit 13 and I'll see you on Zoom every month.
              </p>
              <div className="tier-grid">
                <div className="tier">
                  <h4 className="tier-name">Tier 1, groups of 12 or fewer members</h4>
                  <p className="price">{SHOP.velvetCircleMembershipPrice}</p>
                  <ul className="product-list">
                    <li>A sneak peek of the book club discussion guide (not the full guide)</li>
                    <li><GoldKey /> The Velvet Letter with the gold key</li>
                    <li>The velvet bookmark</li>
                    <li>Three questions a month. Jen answers them promptly and in detail every month.</li>
                    <li>Cancel anytime</li>
                  </ul>
                </div>
                <div className="tier">
                  <h4 className="tier-name">Tier 2, groups of 13 or more members</h4>
                  <p className="price">{SHOP.velvetCircleMembershipPrice}</p>
                  <ul className="product-list">
                    <li>Everything in Tier 1</li>
                    <li>A signed copy of the book</li>
                    <li>A live monthly Zoom with Jen</li>
                  </ul>
                </div>
              </div>
              <p className="club-note">
                Live monthly Zoom with Jen only happens when the group has 13 or more members. If the group is under 13, the membership is the three questions a month, plus the Tier 1 extras.
              </p>
              <div className="product-cta">
                {SHOP.velvetCircleMembership ? (
                  <a href={SHOP.velvetCircleMembership} target="_blank" rel="noopener" className="btn btn-primary">
                    Join the Velvet Circle Book Club
                  </a>
                ) : (
                  <span className="btn btn-disabled">Coming soon</span>
                )}
              </div>
            </div>
          </article>

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
                About 6 inches long. Handmade from black velvet with a gold key charm and a durable, flexible wax-style seal that won’t crack. Packaged in a padded gift case and shipped by regular mail.
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

        <section id="book-club-guide" className="book-club-peek" aria-labelledby="book-club-guide-title">
          <h2 id="book-club-guide-title">{BOOK_CLUB_SNEAK_PEEK.title}</h2>
          <p>{BOOK_CLUB_SNEAK_PEEK.intro}</p>
          <ol>
            {BOOK_CLUB_SNEAK_PEEK.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </section>
      </section>

      <section className="wrap shop-more">
        <div className="center">
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

      <div id="velvet-circle-details" aria-hidden="true" />
      <section id="velvet-circle-faq" className="wrap text-wrap vc-faq">
        <div className="center">
          <div className="eyebrow">The Velvet Circle Book Club</div>
          <h2>Questions, answered.</h2>
        </div>
        <details>
          <summary>Where do I send my questions?</summary>
          <p>
            Email them to <QuestionsEmail />. Three a month. Jen answers them promptly and in detail every month.
          </p>
        </details>
        <details>
          <summary>How do I cancel?</summary>
          <p>
            Anytime, from your Stripe account page:{' '}
            <a href={STRIPE_CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">manage or cancel your membership</a>.
          </p>
        </details>
      </section>
    </div>
  );
}
