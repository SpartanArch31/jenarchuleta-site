'use client';

import { useEffect, useMemo, useState } from 'react';

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

export default function JournalBrowser({ posts = [], initialQuery = '', showAll = false, showAllHref = '/journal?show=all' }) {
  const [query, setQuery] = useState(initialQuery);
  const [shown, setShown] = useState(showAll ? Number.MAX_SAFE_INTEGER : PAGE_SIZE);

  const index = useMemo(
    () => posts.map((p) => ({ post: p, haystack: fold(`${p.title} ${p.excerpt} ${p.category}`) })),
    [posts],
  );

  const words = fold(query).split(/\s+/).filter(Boolean);
  const matches = words.length
    ? index.filter(({ haystack }) => words.every((w) => haystack.includes(w))).map(({ post }) => post)
    : posts;
  const visible = matches.slice(0, shown);

  // Keep ?q= in the address bar (no reload), so a search can be shared.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set('q', query.trim());
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }, [query]);

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

      {visible.length ? (
        <div className="feed">
          {visible.map((p) => (
            <a key={p.slug} className="post-card" href={`/journal/${p.slug}`}>
              {p.img ? <img src={p.img} alt="" loading="lazy" /> : null}
              <div className="body">
                <div className="k">{p.kicker}</div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      ) : null}

      {matches.length > visible.length ? (
        <div className="journal-more center">
          <p className="foot-meta">Showing {visible.length} of {matches.length}</p>
          <button type="button" className="btn btn-ghost" onClick={() => setShown((n) => n + PAGE_SIZE)}>
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
