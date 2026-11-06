'use client';

import { useEffect, useId, useRef, useState } from 'react';

// Shows the opening of a review at a fixed height with a soft fade, and a
// "Read the full review" button that reveals the whole thing. The words are
// never cut: the full text is always in the page, only its height changes.
export default function ReviewBody({ children }) {
  const ref = useRef(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  const [long, setLong] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setLong(el.scrollHeight > el.clientHeight + 4);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      <blockquote
        id={id}
        ref={ref}
        className={`review-card-body${open ? ' is-open' : ''}${long ? ' is-long' : ''}`}
      >
        {children}
      </blockquote>
      {long || open ? (
        <button
          type="button"
          className="review-card-toggle"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Show less' : 'Read the full review'}
        </button>
      ) : null}
    </>
  );
}
