export default function PublicReviews({ reviews }) {
  return (
    <div className="public-reviews">
      {reviews.map((review) => (
        <figure key={`${review.source}-${review.name}`}>
          <blockquote>
            {review.title ? <p className="public-review-title">{review.title}</p> : null}
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
