import ReviewBody from './ReviewBody';

// Reviews are shown word for word. The 'excerpt' variant (Book page) only
// changes the layout: the opening shows at a set height, and "Read the full
// review" opens the rest. Nothing is cut or reworded.

// Reviewers sometimes type *word* for emphasis; show it as italics instead of
// raw asterisks. The words themselves are unchanged.
function withEmphasis(text) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.length > 2 && part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : part
  );
}

function showTitle(review) {
  return review.title && !review.paragraphs[0]?.startsWith(review.title);
}

function ExcerptReviews({ reviews }) {
  return (
    <div className="review-cards">
      {reviews.map((review) => (
          <figure className="review-card" key={`${review.source}-${review.name}`}>
            <span className="review-card-mark" aria-hidden="true">“</span>
            {showTitle(review) ? <h3 className="review-card-title">{review.title}</h3> : null}
            <ReviewBody>
              {review.paragraphs.map((p) => (
                <p key={p}>{withEmphasis(p)}</p>
              ))}
            </ReviewBody>
            <figcaption className="review-card-by">
              <span className="review-card-name">{review.name}</span>
              <span className="review-card-source">
                {review.href ? (
                  <a href={review.href} target="_blank" rel="noopener noreferrer">
                    {review.source} review
                  </a>
                ) : (
                  `${review.source} review`
                )}
              </span>
            </figcaption>
          </figure>
      ))}
    </div>
  );
}

export default function PublicReviews({ reviews, variant }) {
  if (variant === 'excerpt') return <ExcerptReviews reviews={reviews} />;
  return (
    <div className={variant === 'cards' ? 'public-reviews public-reviews--cards' : 'public-reviews'}>
      {reviews.map((review) => (
        <figure key={`${review.source}-${review.name}`}>
          <blockquote>
            {/* Skip a title that only repeats the review's first words. */}
            {showTitle(review) ? <p className="public-review-title">{review.title}</p> : null}
            {review.paragraphs.map((paragraph) => (
              <p key={paragraph}>{withEmphasis(paragraph)}</p>
            ))}
          </blockquote>
          <figcaption>
            {review.name}, {review.source}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
