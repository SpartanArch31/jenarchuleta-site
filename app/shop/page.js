import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { VELVET_CIRCLE_PERKS } from '../components/VelvetCirclePanel';
import { OG_IMAGE, SHOP, STRIPE_CUSTOMER_PORTAL_URL } from '../components/site-data';
import './shop.css';

export const metadata = {
  title: 'Shop',
  description:
    'Signed copies of Beyond the Velvet Ropes, The Velvet Circle Book Club, and the handmade Signature Velvet Bookmark.',
  openGraph: { images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
};

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

export default function ShopPage() {
  return (
    <div className="shop-page">
      <SiteNav />

      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* HERO + FEATURED PRODUCTS */}
      <section id="main-content" className="wrap">
        <div className="center">
          <div className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>the good stuff…</div>
          <div className="eyebrow">The Shop</div>
          <h2>A few things worth sharing.</h2>
          <p className="lead" style={{ maxWidth: '58ch', marginInline: 'auto' }}>
            A signed copy of the book, my private book club, and a keepsake I make by hand.
          </p>
        </div>

        <div className="product-grid">
          {/* SIGNED BOOK */}
          <article className="product-card" id="signed-copy">
            <div className="product-media product-media--contain">
              {SHOP.signedBookSoldOut && <span className="badge">Sold out — restocking soon</span>}
              <img
                src="/assets/book-cover.jpg"
                alt="Beyond the Velvet Ropes book cover"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">The Book · Signed &amp; Personalized</div>
              <h3>Signed copy — <em>Beyond the Velvet Ropes</em></h3>
              <p className="price">{SHOP.signedBookPrice}</p>
              <p className="product-desc">
                Signed by me, with a note to whoever you’d like — you, or someone
                who needs to hear that their story isn’t over.
              </p>
              <p className="fulfill">
                {SHOP.signedBookSoldOut ? SHOP.signedBookSoldOutNote : SHOP.signedBookLeadTime}
              </p>
              <div className="product-cta">
                {SHOP.signedBookSoldOut ? (
                  <span className="btn btn-disabled">Sold out — restocking soon</span>
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

          {/* THE VELVET CIRCLE BOOK CLUB: the one book-club offer (Jen, November 3:
              the book club and the old Backstage Bundle are one offer, so the bundle
              card is gone). #backstage-bundle and #backstage-box stay here so older
              bundle links land on this card. */}
          <article className="product-card" id="velvet-circle">
            <span id="backstage-bundle" />
            <span id="backstage-box" />
            <div className="product-media product-media--circle">
              <img
                src="/assets/velvet-circle-membership.jpg"
                alt="The Velvet Circle Book Club, for readers of Beyond the Velvet Ropes"
                width="1000"
                height="667"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">Monthly Book Club</div>
              <h3>The Velvet Circle Book Club</h3>
              <p className="price">{SHOP.velvetCircleMembershipPrice}</p>
              <ul className="product-list">
                {VELVET_CIRCLE_PERKS.map((perk) => <li key={perk}>{perk}</li>)}
              </ul>
              <p className="product-desc">
                My private book club for readers of <em>Beyond the Velvet Ropes</em>.{' '}
                <a href="#velvet-circle-faq">How it works</a>
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

          {/* SIGNATURE VELVET BOOKMARK */}
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
              <p className="price">{SHOP.bookmarkPrice}</p>
              <p className="product-desc">
                Black velvet with gold detailing, a vintage-style key pressed into a
                burgundy wax seal, and a gold heart engraved with a reminder I believe
                in: <em>you matter, everyone belongs.</em> Handmade by me, one at a
                time. <strong>Every story is different. Every key is different, so no
                two are ever alike.</strong>
              </p>
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
                    <p className="fulfill">Small handmade batches — the list hears first.</p>
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

      {/* AND A LITTLE MORE: the Be the Bumblebee tee, kept apart from the four main
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

      {/* The Velvet Circle Book Club is explained once: its card above, then these questions, before
          anyone subscribes (Jen, Oct 28: no repeated description). #velvet-circle-details
          stays as an anchor so older links land here. */}
      <div id="velvet-circle-details" aria-hidden="true" />
      <section id="velvet-circle-faq" className="wrap text-wrap vc-faq">
        <div className="center">
          <div className="eyebrow">The Velvet Circle Book Club</div>
          <h2>Questions, answered.</h2>
        </div>
        <details>
          <summary>What do members receive?</summary>
          <p>
            The Velvet Circle Book Club is my private book club for readers of <em>Beyond the Velvet
            Ropes</em>. Members get a one-page discussion guide for the book, and you can send me your questions
            about the book and my experiences, up to three a month. I answer every one personally, in
            writing.
          </p>
        </details>
        <details>
          <summary>When do the Zoom conversations begin?</summary>
          <p>
            Once 13 active paying members have joined, I’ll begin monthly group Zoom conversations.
            Until then, membership is the discussion guide and my written answers.
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
            No. Access to The Velvet Letter comes with the book. Your passcode is in the back of the
            book, under the QR code. <a href="/velvet">Open The Velvet Letter</a>.
          </p>
        </details>
      </section>

      <SiteFooter />
    </div>
  );
}
