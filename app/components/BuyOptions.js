import { BOOK_BUY_URL, BOOK_FORMATS, BOOK_WORLDWIDE, READER_REVIEWS, SHOP } from './site-data';

function FormatRow({ group }) {
  return (
    <div className="buy-format">
      <dt>{group.format}</dt>
      <dd>
        {group.links.map((store) => (
          <a key={store.href} className="buy-pill" href={store.href} target="_blank" rel="noopener noreferrer">
            {store.label}
          </a>
        ))}
      </dd>
    </div>
  );
}

// How to buy the book, in one place (homepage and Book page, Nov 2026):
// "Get the Paperback" stays the main button, then every other store grouped by
// format: Paperback, Ebook, Audiobook, Signed copy. Then up to three real
// reader reviews, once Jen has chosen them (READER_REVIEWS in site-data.js).
// compact (Book page): Paperback and Signed copy show; the other formats
// fold under one 'Ebook, audiobook and library' toggle. Same stores, same links.
export default function BuyOptions({ signedLink = true, compact = false }) {
  const signed = Boolean(SHOP.signedBook) && !SHOP.signedBookSoldOut;
  const reviews = READER_REVIEWS.slice(0, 3);

  return (
    <div className="buy-options">
      <p className="buy-main">
        <a href={BOOK_BUY_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Get the Paperback</a>
      </p>
      <dl className="buy-formats">
        {(compact ? BOOK_FORMATS.slice(0, 1) : BOOK_FORMATS).map((group) => (
          <FormatRow key={group.format} group={group} />
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
      {compact && BOOK_FORMATS.length > 1 ? (
        <details className="buy-more">
          <summary>Ebook, audiobook and library</summary>
          <dl className="buy-formats">
            {BOOK_FORMATS.slice(1).map((group) => (
              <FormatRow key={group.format} group={group} />
            ))}
          </dl>
        </details>
      ) : null}
      {/* Jen, Nov 5: show that the book is sold around the world. */}
      <details className="buy-world">
        <summary>Buy in your country</summary>
        <ul>
          {BOOK_WORLDWIDE.map((row) => (
            <li key={row.country}>
              <span className="buy-world-country">{row.country}</span>
              {row.links.map(([label, href]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
              ))}
            </li>
          ))}
        </ul>
      </details>
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
