import './journal.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import JournalBrowser from './JournalBrowser';
import { urlFor } from '../sanity/image';
import { getAllPosts } from '../sanity/queries';
import { POSTS as FALLBACK_POSTS } from './_posts';
import { CATEGORY_ORDER, categoryLabel, curatePosts } from './curation';
import { heroAlt } from './hero-alt';

// Categories show in Jen's order (curation.js). The page opens on album
// tiles. A tile opens that category's posts. Promotional posts stay under
// the Archive tile, still live at their own URLs. Pup of the Podcast posts
// live on /pups. Nothing is deleted, and no post body is edited here.

export const metadata = {
  title: 'My Journals',
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

// Album covers stay whole. No crop, no stretch.
function coverUrl(img) {
  if (!img) return null;
  if (typeof img === 'string') return img;
  return urlFor(img).width(900).fit('max').url();
}

function byNewest(a, b) {
  return String(b.publishedAt || '').localeCompare(String(a.publishedAt || ''));
}

function newestCover(list) {
  const sorted = [...list].sort(byNewest);
  const withImage = sorted.find((p) => p.heroImage);
  return withImage ? coverUrl(withImage.heroImage) : null;
}

export default async function JournalPage({ searchParams }) {
  const live = await getAllPosts().catch(() => []);
  const all = curatePosts(live && live.length > 0 ? live : FALLBACK_POSTS).filter((p) => !p.offJournal);
  const posts = all.filter((p) => !p.archived);
  const archived = all.filter((p) => p.archived);

  const showArchive = searchParams?.view === 'archive';
  const active = showArchive ? 'Archive' : searchParams?.category || 'All';
  const opened = showArchive || active !== 'All';
  const visible = showArchive
    ? archived
    : active === 'All' ? posts : posts.filter((p) => p.category === active);

  const counts = posts.reduce((m, p) => {
    if (p.category) m[p.category] = (m[p.category] || 0) + 1;
    return m;
  }, {});
  const albums = CATEGORY_ORDER.filter((c) => counts[c]).map((category) => ({
    key: category,
    label: categoryLabel(category),
    href: `/journal?category=${encodeURIComponent(category)}`,
    img: newestCover(posts.filter((p) => p.category === category)),
  }));
  if (archived.length > 0) {
    albums.push({
      key: 'Archive',
      label: 'Archive',
      href: '/journal?view=archive',
      img: newestCover(archived),
    });
  }

  // Only what a card needs goes to the browser.
  const cards = visible.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: cardExcerpt(p.excerpt) || '',
    category: p.category || '',
    kicker: `${p.category} · ${formatDate(p.publishedAt)}`,
    img: heroUrl(p.heroImage),
    imgAlt: heroAlt(p.heroImage, p.slug),
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
        <h1>My Journals</h1>
        <p className="lead" style={{ maxWidth: '56ch', marginInline: 'auto' }}>
          Notes from the road back to myself.
        </p>
        <p className="lead" style={{ maxWidth: '56ch', marginInline: 'auto' }}>
          Short, honest writing on faith, family, healing, and starting over.
        </p>

        {opened ? (
          <p className="journal-back">
            <a href="/journal">My Journals</a>
            <span aria-hidden="true"> · </span>
            {showArchive ? 'Archive' : categoryLabel(active)}
          </p>
        ) : (
          <nav className="journal-albums" aria-label="Journal categories">
            {albums.map((album) => (
              <a key={album.key} className="journal-album" href={album.href}>
                {album.img ? <img src={album.img} alt="" /> : <span className="journal-album-blank" aria-hidden="true" />}
                <span className="journal-album-name">{album.label}</span>
              </a>
            ))}
          </nav>
        )}
        {showArchive && (
          <p className="center lead" style={{ marginTop: '18px' }}>
            Earlier announcements and promotions, kept here for the record.
          </p>
        )}
      </section>

      <section className="wrap journal-feed" style={{ paddingTop: 0 }}>
        {opened && visible.length === 0 ? (
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
            collapsedUntilSearch={!opened}
          />
        )}
      </section>

      <SiteFooter />
    </>
  );
}
