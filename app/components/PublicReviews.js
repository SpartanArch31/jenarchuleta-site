export default function PublicReviews({ reviews, variant }) {
  return (
    <div className={variant === 'cards' ? 'public-reviews public-reviews--cards' : 'public-reviews'}>
      {reviews.map((review) => (
        <figure key={`${review.source}-${review.name}`}>
          <blockquote>
            {/* Skip a title that only repeats the review's first words. */}
            {review.title && !review.paragraphs[0]?.startsWith(review.title) ? <p className="public-review-title">{review.title}</p> : null}
            {review.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
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
