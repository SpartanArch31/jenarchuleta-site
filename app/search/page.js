import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { getSearchPosts } from '../sanity/queries';
import { SEARCH_EPISODES, SEARCH_PAGES, searchRecords } from '../../lib/site-search';
import { EPISODE_CREDITS } from '../../lib/episode-credits';
import './search.css';

// SR-04: show the part of the text where the term matched, with a real
// ellipsis, and mark the matched words. Falls back to the opening lines.
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchSnippet(text, query, limit = 160) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return null;
  const words = query.toLowerCase().split(/\s+/).filter((word) => word.length > 1);
  const lower = clean.toLowerCase();
  let hit = -1;
  for (const word of words) {
    const at = lower.indexOf(word);
    if (at !== -1 && (hit === -1 || at < hit)) hit = at;
  }
  let start = 0;
  if (clean.length > limit && hit > limit / 3) {
    start = Math.min(hit - Math.floor(limit / 3), clean.length - limit);
    const space = clean.lastIndexOf(' ', start);
    if (space > start - 20 && space > 0) start = space + 1;
  }
  let end = Math.min(clean.length, start + limit);
  if (end < clean.length) {
    const space = clean.lastIndexOf(' ', end);
    if (space > start + 80) end = space;
  }
  const body = clean.slice(start, end).trim();
  const lead = start > 0 ? '\u2026' : '';
  const tail = end < clean.length ? '\u2026' : '';
  if (!words.length) return `${lead}${body}${tail}`;
  const pattern = new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'gi');
  const parts = body.split(pattern);
  return (
    <>
      {lead}
      {parts.map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part))}
      {tail}
    </>
  );
}

export const metadata = {
  title: 'Search',
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }) {
  const query = typeof searchParams?.q === 'string' ? searchParams.q.trim() : '';
  const posts = query ? await getSearchPosts().catch(() => []) : [];
  const records = [
    ...SEARCH_PAGES.map((page) => ({ ...page, kind: 'Page' })),
    ...SEARCH_EPISODES.map((episode) => {
      const credit = EPISODE_CREDITS.find((row) => episode.title.startsWith(`Ep. ${row.episode}:`));
      const text = credit
        ? `Pup ${credit.pup}${credit.id ? ` ${credit.id}` : ''}${credit.sponsor ? ` Sponsor ${credit.sponsor}` : ''}`
        : '';
      return { ...episode, text, kind: 'Episode' };
    }),
    ...(posts || []).filter((post) => post && post.slug && post.title).map((post) => ({
      href: `/journal/${post.slug}`,
      title: post.title,
      excerpt: post.excerpt || post.seoDescription || '',
      text: (post.text || '').slice(0, 1500),
      kind: 'Journal',
    })),
  ].filter((item) => {
    const href = item.href || '';
    return !href.startsWith('/velvet') && !href.startsWith('/studio') && !href.startsWith('/hq') && !href.startsWith('/hub');
  });
  const results = searchRecords(records, query);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />
      <main id="main-content" className="wrap search-page">
        <h1>Search</h1>
        <form className="search-form" action="/search" method="get" role="search">
          <label className="visually-hidden" htmlFor="site-search">Search</label>
          <input
            id="site-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search"
            autoComplete="off"
            enterKeyHint="search"
            /* SR-02: focus the field only on the empty page, so a results
               page starts at the heading and the result count. */
            autoFocus={!query}
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </form>
        {query ? (
          <p className="search-count" aria-live="polite">
            {results.length === 0
              ? `No results for “${query}”.`
              : `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${query}”.`}
          </p>
        ) : (
          <p className="search-count">Search the journal, the episodes, and the pages.</p>
        )}
        {results.length > 0 ? (
          <ul className="search-results">
            {results.map((item) => {
              // Prefer the excerpt; use the body text when only the body holds the term.
              const terms = query.toLowerCase().split(/\s+/).filter((word) => word.length > 1);
              const has = (value) => terms.some((word) => String(value || '').toLowerCase().includes(word));
              const source = item.excerpt && (has(item.excerpt) || !has(item.text)) ? item.excerpt : item.text || item.excerpt;
              const excerpt = matchSnippet(source, query);
              return (
                <li key={`${item.kind}-${item.href}`}>
                  <a href={item.href}>
                    <span className="search-kind">{item.kind}</span>
                    <span className="search-title">{item.title}</span>
                    {excerpt ? <span className="search-excerpt">{excerpt}</span> : null}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
