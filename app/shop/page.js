import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import VelvetCirclePanel, { VELVET_CIRCLE_PERKS } from '../components/VelvetCirclePanel';
import { OG_IMAGE, SHOP, STRIPE_CUSTOMER_PORTAL_URL } from '../components/site-data';
import './shop.css';

export const metadata = {
  title: 'Shop',
  description:
    'The handmade Signature Velvet Bookmark, signed copies of Beyond the Velvet Ropes, the Velvet Circle book club, and The Backstage Bundle.',
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
            A keepsake I make by hand, a signed copy of the book, my private book club,
            and a little bundle from backstage.
          </p>
        </div>

        <div className="product-grid">
          {/* SIGNATURE VELVET BOOKMARK */}
          <article className="product-card">
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

          {/* VELVET CIRCLE MEMBERSHIP */}
          <article className="product-card" id="velvet-circle">
            <div className="product-media product-media--circle">
              <img
                src="/assets/velvet-circle-membership.jpg"
                alt="The Velvet Circle, for readers of Beyond the Velvet Ropes"
                width="1000"
                height="667"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">Monthly Book Club</div>
              <h3>Velvet Circle Membership</h3>
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
                      Join the Velvet Circle
                    </a>
                    <TrustLine />
                  </>
                ) : (
                  <span className="btn btn-disabled">Coming soon</span>
                )}
              </div>
            </div>
          </article>

          {/* THE BACKSTAGE BUNDLE: the ONE-TIME GIFT BUNDLE, $69 once (Jen, October 28).
              Signed book, handmade bookmark, bunny ears, and one month to send Jen up to three
              questions for her written answers. Then it ends. It never starts a Velvet Circle
              membership; joining afterward is the customer's choice. No gift box, so the photo
              is the bunny-ears book club picture, not the box photo (backstage-bundle.jpg).
              No Stripe Payment Link exists yet, so the card says Coming soon. When it is
              created: one-time $69, collect shipping address, paste into SHOP.foundingBox.
              #backstage-box stays so older links still land on this card. */}
          <article className="product-card" id="backstage-bundle">
            <span id="backstage-box" />
            <div className="product-media">
              <img
                src="/assets/velvet-circle-group.jpg"
                alt="Readers on couches with copies of Beyond the Velvet Ropes, some wearing black bunny ears"
                width="1152"
                height="864"
                loading="lazy"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">One-Time Gift Bundle</div>
              <h3>The Backstage Bundle</h3>
              <p className="price">{SHOP.foundingBoxPrice} one time</p>
              <p className="product-desc">
                A gift from backstage: my signed book, the velvet bookmark I make by hand, black
                velvet bunny ears, and one month to send me your questions.
              </p>
              <ul className="product-list">
                <li>A signed copy of <em>Beyond the Velvet Ropes</em></li>
                <li>My handmade velvet bookmark</li>
                <li>Black velvet bunny ears</li>
                <li>One month to send me up to three questions, answered personally by me in writing</li>
              </ul>
              <p className="fulfill">
                One payment. After the month, it simply ends. Joining the Velvet Circle ($9.99 a month)
                afterward is up to you. You are never signed up automatically.
              </p>
              <div className="product-cta">
                {SHOP.foundingBox ? (
                  <>
                    <a href={SHOP.foundingBox} target="_blank" rel="noopener" className="btn btn-primary">
                      Get the Backstage Bundle
                    </a>
                    <TrustLine />
                  </>
                ) : (
                  <>
                    <span className="btn btn-disabled">Coming soon</span>
                    <a href="#letter" className="btn btn-ghost">Get updates</a>
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

      {/* THE VELVET CIRCLE — explained before anyone subscribes */}
      <div id="velvet-circle-details">
        <VelvetCirclePanel />
      </div>

      <section id="velvet-circle-faq" className="wrap text-wrap vc-faq">
        <div className="center">
          <div className="eyebrow">The Velvet Circle</div>
          <h2>Questions, answered.</h2>
        </div>
        <details>
          <summary>What’s the difference between the Velvet Circle and the Backstage Bundle?</summary>
          <p>
            The Velvet Circle is my monthly book club, $9.99 a month until you cancel. The Backstage
            Bundle is a one-time $69 gift: my signed book, my handmade bookmark, black velvet bunny
            ears, and one month to send me up to three questions. After that month, the bundle ends.
            Joining the Velvet Circle is always your choice.
          </p>
        </details>
        <details>
          <summary>What do members receive?</summary>
          <p>
            The Velvet Circle is my private book club for readers of <em>Beyond the Velvet Ropes</em>.
            Members get a one-page discussion guide for the book, and you can send me your questions
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
            answers. My signed book, the velvet bookmark, and bunny ears come in{' '}
            <a href="#backstage-bundle">The Backstage Bundle</a>, a one-time gift.
          </p>
        </details>
        <details>
          <summary>Is The Velvet Letter part of the membership?</summary>
          <p>
            The Velvet Letter is for readers of the book. Your secret passcode is beside the QR code
            inside the back cover. <a href="/velvet">Open The Velvet Letter</a>.
          </p>
        </details>
      </section>

      <SiteFooter />
    </div>
  );
}
