import './journal.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import CategorySelect from './CategorySelect';
import JournalBrowser from './JournalBrowser';
import { urlFor } from '../sanity/image';
import { photoAlt } from './photo-alt';
import { getAllPosts } from '../sanity/queries';
import { POSTS as FALLBACK_POSTS } from './_posts';
import { CATEGORY_ORDER, categoryLabel, curatePosts } from './curation';

// Categories show in Jen's order (curation.js). Empty ones stay off the row.
// Promotional posts are archived (curation.js): out of the feed, listed
// under Archive (its chip sits at the end of the row, Nov 2026), and still
// live at their own URLs. Pup of the Podcast posts live on /pups, not here
// (Jen, November 3). The public Journal never shows anything from the
// private Velvet Letter.
// The feed itself (search box, 12 posts at a time, Load more) is
// JournalBrowser.js.

export const metadata = {
  title: 'Journal',
  description:
    'Short, honest writing on faith, family, healing, and starting over, from Jen Archuleta.',
};

// Podcast cards often open with the show name as a stamp. Drop that
// leading label on the card. A sentence that actually says the name stays.
function cardExcerpt(excerpt) {
  if (typeof excerpt !== 'string') return excerpt;
  const text = excerpt.trim();
  const match = text.match(/^[\s\S]{0,90}?Unfiltered with Jen Archuleta\b[\s:.\-–—,…]*/i);
  if (!match) return text;
  const prefix = match[0];
  const promo = /^(?:[\s🎙🎙️🖤🥳❗️🚨🐾🔜📢]*)(?:coming|new episode|this month|welcome|season finale|live now|beyond the bombshell|in this powerful episode)/i;
  if (!promo.test(prefix)) return text;
  const rest = text.slice(prefix.length).trim();
  return rest || text;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Hero image is a string (fallback) or a Sanity image (live).
function heroUrl(img, w = 800, h = 533) {
  if (!img) return null;
  if (typeof img === 'string') return img;
  return urlFor(img).width(w).height(h).fit('crop').url();
}

export default async function JournalPage({ searchParams }) {
  const live = await getAllPosts().catch(() => []);
  const all = curatePosts(live && live.length > 0 ? live : FALLBACK_POSTS).filter((p) => !p.offJournal);
  const posts = all.filter((p) => !p.archived);
  const archived = all.filter((p) => p.archived);

  const showArchive = searchParams?.view === 'archive';
  const active = showArchive ? 'Archive' : searchParams?.category || 'All';
  const visible = showArchive
    ? archived
    : active === 'All' ? posts : posts.filter((p) => p.category === active);

  const counts = posts.reduce((m, p) => {
    if (p.category) m[p.category] = (m[p.category] || 0) + 1;
    return m;
  }, {});
  const presentCategories = CATEGORY_ORDER.filter((c) => counts[c]);
  const options = [
    { key: 'All', label: 'All', href: '/journal' },
    ...presentCategories.map((c) => ({ key: c, label: categoryLabel(c), href: `/journal?category=${encodeURIComponent(c)}` })),
    ...(archived.length > 0 ? [{ key: 'Archive', label: 'Archive', href: '/journal?view=archive' }] : []),
  ];

  // Only what a card needs goes to the browser.
  const cards = visible.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: cardExcerpt(p.excerpt) || '',
    category: p.category || '',
    kicker: `${p.category} · ${formatDate(p.publishedAt)}`,
    img: heroUrl(p.heroImage),
    imgAlt: p.heroImage ? photoAlt(p.heroImage, p.title) : '',
  }));
  const showAllParams = new URLSearchParams();
  if (showArchive) showAllParams.set('view', 'archive');
  else if (active !== 'All') showAllParams.set('category', active);
  showAllParams.set('show', 'all');

  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap journal-head">
        <div className="eyebrow">The Journal</div>
        <h1>Notes from the road back to myself.</h1>
        <p className="lead" style={{ maxWidth: '56ch', marginInline: 'auto' }}>
          Short, honest writing on faith, family, healing, and starting over.
        </p>

        <nav className="filter-row" aria-label="Journal categories">
          {options.map((o) => (
            <a key={o.key} className={`chip ${active === o.key ? 'is-active' : ''}`} href={o.href}>
              {o.label}
            </a>
          ))}
        </nav>
        <CategorySelect options={options} active={active} />
        {showArchive && (
          <p className="center lead" style={{ marginTop: '18px' }}>
            Earlier announcements and promotions, kept here for the record. <a href="/journal">Back to the Journal</a>
          </p>
        )}
      </section>

      <section className="wrap journal-feed" style={{ paddingTop: 0 }}>
        {visible.length === 0 ? (
          active === 'Pup of the Podcast' ? (
            <p className="center lead"><a href="/pups">Meet the Pups of the Podcast</a></p>
          ) : (
            <p className="center lead">No posts in “{categoryLabel(active)}” yet. Check back soon.</p>
          )
        ) : (
          <JournalBrowser
            key={active}
            posts={cards}
            initialQuery={typeof searchParams?.q === 'string' ? searchParams.q : ''}
            showAll={searchParams?.show === 'all'}
            showAllHref={`/journal?${showAllParams.toString()}`}
          />
        )}
      </section>

      <SiteFooter />
    </>
  );
}
