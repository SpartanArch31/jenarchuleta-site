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

// The products for sale. Rendered on /shop (its own page since Nov 2026).
export default function BookOffers() {
  const bookmarkFacts = [
    ['Size', SHOP.bookmarkSize],
    ['Packaging', SHOP.bookmarkPackaging],
  ].filter(([, value]) => value);

  return (
    <div className="shop-products">
      <section className="wrap">
        <div className="product-grid">
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
                About 6 inches long. I make each one by hand from black velvet with a gold key charm and a durable, flexible wax-style seal that won’t crack. Shipped via USPS.
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
              {/* BOOK-10: perks are a set, not steps, so bullets instead of numbers. */}
              <ul className="club-gets">
                <li>The full discussion sheet</li>
                <li>Up to three questions a month, answered by Jen</li>
                <li>A monthly group Zoom once 13 members join</li>
              </ul>
              {/* Jen, Nov 5: a fun nudge toward the 13. */}
              <p className="club-note club-nudge">
                Already in a book club? Bring the whole group. Once there are 13 of us, the monthly Zoom starts, so the more friends you bring, the sooner we get to talk.
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
              <p className="club-note">
                Cancel anytime.{' '}
                <a href={STRIPE_CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">Manage or cancel</a>.
                {' '}Email questions to <QuestionsEmail />.
              </p>
              <div className="book-club-peek" id="book-club-guide">
                <h4 id="book-club-guide-title">From the discussion sheet</h4>
                <ol>
                  {BOOK_CLUB_SNEAK_PEEK.questions.map((question, index) => (
                    <li key={question} value={index === 0 ? 6 : 11}>{question}</li>
                  ))}
                </ol>
              </div>
            </div>
          </article>
          {/* Jen, Nov 9: the shop only shows what can be bought today. The bundle
              card comes back on its own once SHOP.bundle holds a Stripe link. */}
          {SHOP.bundle ? (
          <article className="product-card" id="bundle">
            <span id="backstage-bundle" />
            <span id="backstage-box" />
            <div className="product-media product-media--contain">
              <img
                src="/assets/backstage-bundle.jpg"
                alt="A gift box with a black ribbon, bunny ears, the book, and the velvet bookmark"
                width="1268"
                height="1586"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">The Bundle</div>
              <h3>Signed book, bookmark, and bunny ears</h3>
              <p className="price">{SHOP.bundlePrice}</p>
              <p className="product-desc">
                A signed copy of the book, the Signature Velvet Bookmark, and bunny ears.
              </p>
              <div className="product-cta">
                {SHOP.bundle ? (
                  <>
                    <a href={SHOP.bundle} target="_blank" rel="noopener" className="btn btn-primary">
                      Buy the bundle
                    </a>
                    <TrustLine />
                  </>
                ) : null}
              </div>
            </div>
          </article>
          ) : null}
        </div>

        {/* Jen, Nov 10: her apparel line. Each item has an Etsy link and a
            signed option she ships herself (Stripe Payment Link). Replaces the
            "Coming soon" merchandise note. */}
        <div className="shop-apparel" id="apparel">
          <span id="merchandise" />
          <h2>Unfiltered, featuring <em>Beyond the Velvet Ropes</em> Apparel</h2>
          <p className="shop-apparel-note">
            Every piece comes two ways: on Etsy, or signed and shipped by me, with shipping included (US only). Signed pieces come with a Velvet Letters gift card.
          </p>
          <div className="apparel-grid">
            {SHOP.apparel.map((item) => (
              <article className="apparel-card" id={item.id} key={item.id}>
                <img src={item.image} alt={`Beyond the Velvet Ropes ${item.name.toLowerCase()}`} width="900" height="900" loading="lazy" />
                <div className="apparel-body">
                  <h3>{item.name}</h3>
                  <p className="apparel-detail">{item.detail}</p>
                  <p className="apparel-price">
                    Signed {item.signedPrice} <span>shipping included</span>
                  </p>
                  <div className="apparel-cta">
                    <a href={item.signed} target="_blank" rel="noopener" className="btn btn-primary">
                      Buy signed
                    </a>
                    <a href={item.etsy} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                      Shop on Etsy
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <TrustLine />
        </div>

        {/* Jen, Nov 11: podcast collections, each with her words about the
            episode it comes from. Replaces the old "Podcast Apparel" card. */}
        {SHOP.collections.map((col) => (
          <div className="shop-apparel shop-collection" id={col.id} key={col.id}>
            <h2>{col.title}</h2>
            <p className="collection-episode">
              Inspired by{' '}
              <a href={col.episodeUrl} target="_blank" rel="noopener noreferrer">{col.episode}</a>
            </p>
            <p className="collection-story">{col.story}</p>
            <div className="apparel-grid">
              {col.items.map((item) => (
                <article className="apparel-card" id={item.id} key={item.id}>
                  <img src={item.image} alt={`${col.title} ${item.name.toLowerCase()}`} width="900" height="900" loading="lazy" />
                  <div className="apparel-body">
                    <h3>{item.name}</h3>
                    {item.detail ? <p className="apparel-detail">{item.detail}</p> : null}
                    {item.signed ? (
                      <p className="apparel-price">
                        Signed {item.signedPrice} <span>shipping included</span>
                      </p>
                    ) : null}
                    <div className="apparel-cta">
                      {item.signed ? (
                        <a href={item.signed} target="_blank" rel="noopener" className="btn btn-primary">
                          Buy signed
                        </a>
                      ) : null}
                      <a href={item.etsy} target="_blank" rel="noopener noreferrer" className={item.signed ? 'btn btn-ghost' : 'btn btn-primary'}>
                        Shop on Etsy
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {col.items.some((item) => item.signed) ? (
              <p className="shop-apparel-note collection-signed-note">
                Signed pieces are shipped by me, with shipping included (US only), and come with a Velvet Letters gift card.
              </p>
            ) : null}
          </div>
        ))}

        {/* Jen, Nov 10: one small text link, her exact words. */}
        <p className="shop-ebay">
          <a href={SHOP.ebayWardrobe} target="_blank" rel="noopener noreferrer">
            Shop My Playmate promotions some one of a kind Wardrobe
          </a>
        </p>
        <p className="shop-ebay shop-more-links">
          <a href={SHOP.ltk} target="_blank" rel="noopener noreferrer">Shop my LTK</a>
          <span aria-hidden="true"> · </span>
          <a href={SHOP.amazonStorefront} target="_blank" rel="noopener noreferrer">My Amazon storefront</a>
        </p>
      </section>
    </div>
  );
}
