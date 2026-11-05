import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { getSearchPosts } from '../sanity/queries';
import { SEARCH_EPISODES, SEARCH_PAGES, searchRecords, snippet } from '../../lib/site-search';
import { EPISODE_CREDITS } from '../../lib/episode-credits';
import './search.css';

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
      text: post.text || '',
      kind: 'Journal',
    })),
  ].filter((item) => {
    const href = item.href || '';
    return !href.startsWith('/velvet') && !href.startsWith('/studio') && !href.startsWith('/hq') && !href.startsWith('/hub');
  });
  const results = searchRecords(records, query);

  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <section id="main-content" className="wrap search-page">
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
            autoFocus
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
            {results.map((item) => (
              <li key={`${item.kind}-${item.href}`}>
                <a href={item.href}>
                  <span className="search-kind">{item.kind}</span>
                  <span className="search-title">{item.title}</span>
                  {snippet(item.excerpt || item.text) ? <span className="search-excerpt">{snippet(item.excerpt || item.text)}</span> : null}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
      <SiteFooter />
    </>
  );
}
