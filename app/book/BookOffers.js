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

function QuestionsEmail() {
  const email = SHOP.velvetCircleQuestionsEmail;
  return <a href={`mailto:${email}?subject=Velvet%20Circle%20question`}>{email}</a>;
}

// The shop lives on the book page, under #shop.
export default function BookOffers() {
  const bookmarkFacts = [
    ['Size', SHOP.bookmarkSize],
    ['Packaging', SHOP.bookmarkPackaging],
  ].filter(([, value]) => value);

  return (
    <div className="shop-page" id="shop">
      <section className="wrap">
        <div className="center">
          <h2>Buy the book here, and find a few other things you might love.</h2>
        </div>
        <div className="product-grid">
          <article className="product-card" id="velvet-circle">
            <span id="velvet-circle-faq" />
            <span id="velvet-circle-details" />
            <div className="product-media">
              <img
                src="/assets/velvet-circle-group.jpg"
                alt="The Velvet Circle book club, readers in bunny ears with the book"
                width="1152"
                height="864"
              />
              <img className="vc-card-mark" src="/assets/velvet-circle-mark.png" alt="The Velvet Circle logo, a gold ring of lights" width="436" height="436" />
            </div>
            <div className="product-body">
              <div className="eyebrow">Monthly Book Club</div>
              <h3>The Velvet Circle Book Club</h3>
              <p className="price">{SHOP.velvetCircleMembershipPrice}</p>
              <ol className="club-gets">
                <li>The full discussion sheet</li>
                <li>Up to three questions a month, answered by Jen</li>
                <li>A monthly group Zoom once 13 members join</li>
              </ol>
              <div className="book-club-peek" id="book-club-guide">
                <h4 id="book-club-guide-title">From the discussion sheet</h4>
                <ol>
                  {BOOK_CLUB_SNEAK_PEEK.questions.map((question, index) => (
                    <li key={question} value={index === 0 ? 6 : 11}>{question}</li>
                  ))}
                </ol>
              </div>
              <p className="club-note">
                Cancel anytime.{' '}
                <a href={STRIPE_CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">Manage or cancel</a>.
                {' '}Email questions to <QuestionsEmail />.
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

          <article className="product-card" id="bundle">
            <span id="backstage-bundle" />
            <span id="backstage-box" />
            <div className="product-media product-media--contain">
              <img
                src="/assets/backstage-bundle.jpg"
                alt="A gift box with a black ribbon, bunny ears, the book, and the velvet bookmark"
                width="1268"
                height="1600"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">The Bundle</div>
              <h3>Signed book, bookmark, and bunny ears</h3>
              <p className="product-desc">
                A signed copy of the book, the Signature Velvet Bookmark, and bunny ears, packaged together in a padded gift case. Shipped by regular mail.
              </p>
              <div className="product-cta">
                <span className="btn btn-disabled">Coming soon</span>
              </div>
            </div>
          </article>

          <article className="product-card" id="bookmark">
            <div className="product-media product-media--contain">
              <img
                src="/assets/bookmark.jpg"
                alt="The Signature Velvet Bookmark, black velvet with a gold key charm and a wax-style seal, on an open book"
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
                ) : (
                  <span className="btn btn-disabled">Coming soon</span>
                )}
              </div>
            </div>
          </article>

          <article className="product-card" id="signed-copy">
            <div className="product-media product-media--contain">
              {SHOP.signedBookSoldOut && <span className="badge">Sold out. Restocking soon.</span>}
              <img src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes book cover" />
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
                For you, or for someone who needs to hear that their story isn’t over. At checkout, tell me who to make it out to.
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
        </div>

        <p className="center foot-meta" style={{ marginTop: '28px' }}>
          <a href={SHOP.etsyTee} target="_blank" rel="noopener noreferrer">The Be the Bumblebee shirt, on Etsy</a>
        </p>
      </section>
    </div>
  );
}
