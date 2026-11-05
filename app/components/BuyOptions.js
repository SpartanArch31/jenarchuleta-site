import { BOOK_BUY_URL, BOOK_FORMATS, READER_REVIEWS, SHOP } from './site-data';

// How to buy the book, in one place (homepage and Book page, Nov 2026):
// "Get the Paperback" stays the main button, then every other store grouped by
// format: Paperback, Ebook, Audiobook, Signed copy. Then up to three real
// reader reviews, once Jen has chosen them (READER_REVIEWS in site-data.js).
export default function BuyOptions({ signedLink = true }) {
  const signed = Boolean(SHOP.signedBook) && !SHOP.signedBookSoldOut;
  const reviews = READER_REVIEWS.slice(0, 3);

  return (
    <div className="buy-options">
      <p className="buy-main">
        <a href={BOOK_BUY_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Get the Paperback</a>
      </p>
      <dl className="buy-formats">
        {BOOK_FORMATS.map((group) => (
          <div className="buy-format" key={group.format}>
            <dt>{group.format}</dt>
            <dd>
              {group.links.map((store) => (
                <a key={store.href} className="buy-pill" href={store.href} target="_blank" rel="noopener noreferrer">
                  {store.label}
                </a>
              ))}
            </dd>
          </div>
        ))}
        {signedLink ? (
          <div className="buy-format">
            <dt>Signed copy</dt>
            <dd>
              {signed ? (
                <a className="buy-pill" href="/shop#signed-copy">Signed by Jen, {SHOP.signedBookTotal} with shipping</a>
              ) : (
                <span className="buy-note">Sold out for now</span>
              )}
            </dd>
          </div>
        ) : null}
      </dl>
      {reviews.length ? (
        <div className="reader-reviews">
          <div className="eyebrow">What readers are saying</div>
          {reviews.map((review) => (
            <figure key={review.quote}>
              <blockquote>“{review.quote}”</blockquote>
              {review.source ? <figcaption>{review.source}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
