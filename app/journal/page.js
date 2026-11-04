import './journal.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import JournalBrowser from './JournalBrowser';
import { urlFor } from '../sanity/image';
import { photoAlt } from './photo-alt';
import { getAllPosts } from '../sanity/queries';
import { POSTS as FALLBACK_POSTS } from './_posts';
import { CATEGORY_ORDER, categoryLabel, curatePosts } from './curation';

// Jen's site notes (November 4, 2026): no category tabs across the top. The
// categories are clickable ALBUMS on this page, each with a cover photo (its
// newest post's photo) and a post count, in Jen's order (curation.js). Empty
// ones are left out. Every post is kept. Promotional posts are archived
// (curation.js): out of the main feed, in the Archive album, and still live at
// their own URLs. Pup of the Podcast posts live on /pups, not here
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
  // The albums: each category's cover is its newest post that has a photo.
  const coverFor = (list) => list.find((p) => p.heroImage);
  const album = (key, label, href, list) => {
    const cover = coverFor(list);
    return {
      key,
      label,
      href,
      count: list.length,
      cover: cover ? heroUrl(cover.heroImage, 480, 360) : null,
      coverAlt: cover ? photoAlt(cover.heroImage, cover.title) : '',
    };
  };
  const albums = [
    ...presentCategories.map((c) =>
      album(c, categoryLabel(c), `/journal?category=${encodeURIComponent(c)}`, posts.filter((p) => p.category === c))
    ),
    ...(archived.length > 0 ? [album('Archive', 'Archive', '/journal?view=archive', archived)] : []),
  ];
  const activeAlbum = albums.find((a) => a.key === active);

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

      </section>

      {/* ALBUMS: one per category, plus the Archive. */}
      <section className="wrap journal-albums-wrap" aria-labelledby="albums-title">
        <h2 id="albums-title" className="albums-title">Albums</h2>
        <nav className="albums" aria-label="Journal albums">
          {albums.map((a) => (
            <a
              key={a.key}
              className={`album${active === a.key ? ' is-active' : ''}`}
              href={a.href}
              aria-current={active === a.key ? 'page' : undefined}
            >
              <span className="album-cover">
                {a.cover ? <img src={a.cover} alt={a.coverAlt} loading="lazy" width="480" height="360" /> : null}
              </span>
              <span className="album-name">{a.label}</span>
              <span className="album-count">{a.count} {a.count === 1 ? 'post' : 'posts'}</span>
            </a>
          ))}
        </nav>
        {active !== 'All' ? (
          <div className="album-head">
            <h2>{activeAlbum ? activeAlbum.label : categoryLabel(active)}</h2>
            {showArchive ? (
              <p className="lead">Earlier announcements and promotions, kept here for the record.</p>
            ) : null}
            <p><a href="/journal">All posts</a></p>
          </div>
        ) : (
          <div className="album-head">
            <h2>All posts</h2>
          </div>
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
