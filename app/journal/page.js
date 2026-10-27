import './journal.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import CategorySelect from './CategorySelect';
import { urlFor } from '../sanity/image';
import { getAllPosts } from '../sanity/queries';
import { POSTS as FALLBACK_POSTS } from './_posts';
import { CATEGORY_ORDER, curatePosts } from './curation';

// Categories show in Jen's order (curation.js). Empty ones stay off the row.
// Promotional posts are archived (curation.js): out of the feed, listed
// under Archive, and still live at their own URLs. The public Journal never
// shows anything from the private Velvet Letter.

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
  const all = curatePosts(live && live.length > 0 ? live : FALLBACK_POSTS);
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
    { label: 'All', href: '/journal' },
    ...presentCategories.map((c) => ({ label: c, href: `/journal?category=${encodeURIComponent(c)}` })),
  ];

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
            <a key={o.label} className={`chip ${active === o.label ? 'is-active' : ''}`} href={o.href}>
              {o.label}
            </a>
          ))}
        </nav>
        <CategorySelect options={options} active={active} />
        {active === 'Pup of the Podcast' && (
          <p className="center" style={{ marginTop: '18px' }}>
            <a href="/pups">Meet the Pups of the Podcast</a>
          </p>
        )}
        {showArchive && (
          <p className="center lead" style={{ marginTop: '18px' }}>
            Earlier announcements and promotions, kept here for the record. <a href="/journal">Back to the Journal</a>
          </p>
        )}
      </section>

      <section className="wrap" style={{ paddingTop: 0 }}>
        {visible.length === 0 ? (
          <p className="center lead">No posts in “{active}” yet. Check back soon.</p>
        ) : (
          <div className="feed">
            {visible.map((p) => {
              const img = heroUrl(p.heroImage);
              return (
                <a key={p.slug} className="post-card" href={`/journal/${p.slug}`}>
                  {img && <img src={img} alt="" />}
                  <div className="body">
                    <div className="k">{p.category} · {formatDate(p.publishedAt)}</div>
                    <h3>{p.title}</h3>
                    <p>{cardExcerpt(p.excerpt)}</p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
        {!showArchive && archived.length > 0 ? (
          <p className="foot-meta center" style={{ marginTop: '32px' }}>
            <a href="/journal?view=archive">Archive: earlier announcements ({archived.length})</a>
          </p>
        ) : null}
      </section>

      <SiteFooter />
    </>
  );
}
