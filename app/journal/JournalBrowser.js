'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

// The Journal feed: a search box and 12 posts at a time with "Load more"
// (Nov 2026). The server sends the posts for the current view (All, a
// category, or the Archive); searching looks through their titles, excerpts,
// and categories. ?q= in the address keeps a search shareable.

const PAGE_SIZE = 12;

function fold(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘]/g, "'")
    .toLowerCase();
}

export default function JournalBrowser({ posts = [], initialQuery = '', showAll = false, showAllHref = '/journal?show=all', collapsedUntilSearch = false }) {
  const [query, setQuery] = useState(initialQuery);
  const [shown, setShown] = useState(showAll ? Number.MAX_SAFE_INTEGER : PAGE_SIZE);
  // J-M5: after "Load more", focus moves to the first new card so keyboard
  // and screen reader users land on what just appeared.
  const cardRefs = useRef([]);
  const focusFrom = useRef(null);

  const index = useMemo(
    () => posts.map((p) => ({ post: p, haystack: fold(`${p.title} ${p.excerpt} ${p.category}`) })),
    [posts],
  );

  const words = fold(query).split(/\s+/).filter(Boolean);
  const matches = words.length
    ? index.filter(({ haystack }) => words.every((w) => haystack.includes(w))).map(({ post }) => post)
    : posts;
  const visible = matches.slice(0, shown);
  const showResults = !collapsedUntilSearch || words.length > 0;

  // Keep ?q= in the address bar (no reload), so a search can be shared.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set('q', query.trim());
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }, [query]);

  useEffect(() => {
    if (focusFrom.current === null) return;
    const card = cardRefs.current[focusFrom.current];
    focusFrom.current = null;
    if (card) card.focus();
  }, [shown]);

  return (
    <>
      <form className="journal-search" role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="journal-search-input" className="visually-hidden">Search the Journal</label>
        <input
          id="journal-search-input"
          type="search"
          placeholder="Search the Journal"
          value={query}
          autoComplete="off"
          enterKeyHint="search"
          onChange={(event) => {
            setQuery(event.target.value);
            setShown(PAGE_SIZE);
          }}
        />
      </form>

      {words.length ? (
        <p className="journal-count center" aria-live="polite">
          {matches.length === 0
            ? `No posts match “${query.trim()}”. Try another word.`
            : `${matches.length} ${matches.length === 1 ? 'post matches' : 'posts match'} “${query.trim()}”.`}
        </p>
      ) : null}

      {showResults && visible.length ? (
        <div className="feed">
          {visible.map((p, i) => (
            <a key={p.slug} ref={(el) => { cardRefs.current[i] = el; }} className="post-card" href={`/journal/${p.slug}`}>
              {/* J-06: a post with no photo gets a quiet plate the same shape,
                  so its card lines up with the photo cards beside it. */}
              {p.img ? (
                <img src={p.img} alt={p.imgAlt || ''} loading="lazy" />
              ) : (
                <div className="post-card-plate" aria-hidden="true"><span>{p.category}</span></div>
              )}
              <div className="body">
                <div className="k">{p.kicker}</div>
                {/* J-05: H2 under the page H1 (was H3, skipping a level). */}
                <h2>{p.title}</h2>
                <p>{p.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      ) : null}

      {showResults && matches.length > visible.length ? (
        <div className="journal-more center">
          <p className="foot-meta" role="status" aria-live="polite">Showing {visible.length} of {matches.length}</p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              focusFrom.current = visible.length;
              setShown((n) => n + PAGE_SIZE);
            }}
          >
            Load more
          </button>
          <noscript>
            <a href={showAllHref}>Show all posts</a>
          </noscript>
        </div>
      ) : null}
    </>
  );
}
