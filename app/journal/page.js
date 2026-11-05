import './journal.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import JournalBrowser from './JournalBrowser';
import { urlFor } from '../sanity/image';
import { getAllPosts } from '../sanity/queries';
import { POSTS as FALLBACK_POSTS } from './_posts';
import { CATEGORY_ORDER, FEATURED_SLUGS, categoryLabel, curatePosts } from './curation';
import { heroAlt } from './hero-alt';

// Categories show in Jen's order (curation.js). Behind the Book is the first
// album, and those posts lead the feed. The other posts follow. A tile opens
// that category's posts. Promotional posts stay under the Archive tile, still
// live at their own URLs. Pup of the Podcast posts live on /pups. Nothing is
// deleted, and no post body is edited here.

const JOURNAL_DESCRIPTION =
  'Short, honest writing on faith, family, healing, and starting over, from Jen Archuleta.';

// J-05: a category view gets its own title ("Faith, Journal, Jen Archuleta"),
// not the same "Journal" title on every category.
export function generateMetadata({ searchParams }) {
  if (searchParams?.view === 'archive') {
    return { title: 'Archive, Journal', description: JOURNAL_DESCRIPTION };
  }
  const category = typeof searchParams?.category === 'string' ? searchParams.category : '';
  if (category && category !== 'All') {
    return { title: `${categoryLabel(category)}, Journal`, description: JOURNAL_DESCRIPTION };
  }
  return { title: 'Journal', description: JOURNAL_DESCRIPTION };
}

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
  const featuredRank = new Map(FEATURED_SLUGS.map((slug, index) => [slug, index]));
  // Behind the Book first. Inside that group, the lead posts stay in their
  // order, then the newer posts. Every other post follows.
  const orderedPosts = [...posts].sort((a, b) => {
    const aBehind = a.category === 'Behind the Book' ? 0 : 1;
    const bBehind = b.category === 'Behind the Book' ? 0 : 1;
    if (aBehind !== bBehind) return aBehind - bBehind;
    const ar = featuredRank.has(a.slug) ? featuredRank.get(a.slug) : 1000;
    const br = featuredRank.has(b.slug) ? featuredRank.get(b.slug) : 1000;
    if (ar !== br) return ar - br;
    return byNewest(a, b);
  });

  const showArchive = searchParams?.view === 'archive';
  const active = showArchive ? 'Archive' : searchParams?.category || 'All';
  const opened = showArchive || active !== 'All';
  const visible = showArchive
    ? archived
    : active === 'All' ? orderedPosts : orderedPosts.filter((p) => p.category === active);

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

  function toCard(p) {
    return {
    slug: p.slug,
    title: p.title,
    excerpt: cardExcerpt(p.excerpt) || '',
    category: p.category || '',
    // J-M3: inside one category every card would repeat its name, so the
    // kicker is just the date there. The index search and the Archive keep
    // "Category · date".
    kicker: opened && !showArchive
      ? formatDate(p.publishedAt)
      : `${p.category} · ${formatDate(p.publishedAt)}`,
    img: heroUrl(p.heroImage),
    imgAlt: heroAlt(p.heroImage, p.slug),
    };
  }
  const cards = visible.map(toCard);
  const showAllParams = new URLSearchParams();
  if (showArchive) showAllParams.set('view', 'archive');
  else if (active !== 'All') showAllParams.set('category', active);
  showAllParams.set('show', 'all');

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />

      <main id="main-content">
      {opened ? (
        /* J-05 / J-M2: in a category the category name is the H1, "Journal"
           is a tappable eyebrow back to the index, and a row of category
           links moves between categories without the round trip. The two
           index lead lines are left out here so the posts come up sooner. */
        <section className="wrap journal-head journal-head--opened">
          <p className="journal-eyebrow"><a href="/journal">Journal</a></p>
          <h1>{showArchive ? 'Archive' : categoryLabel(active)}</h1>
          <nav className="journal-cats" aria-label="Journal categories">
            {albums.map((album) => (
              <a key={album.key} href={album.href} aria-current={album.key === active ? 'page' : undefined}>
                {album.label}
              </a>
            ))}
          </nav>
          {showArchive && (
            <p className="center lead journal-archive-note">
              Earlier announcements and promotions, kept here for the record.
            </p>
          )}
        </section>
      ) : (
        <section className="wrap journal-head">
          <h1>Journal</h1>
          {/* J-09: the dek and standfirst stay with the H1, then the search
              (Adam, Nov 5: search near the top). On the main Journal page the
              posts live in their category albums; a search shows its results here. */}
          <p className="journal-dek">Notes from the road back to myself.</p>
          <p className="journal-standfirst">
            Short, honest writing on faith, family, healing, and starting over.
          </p>
          <JournalBrowser
            key="all"
            posts={cards}
            initialQuery={typeof searchParams?.q === 'string' ? searchParams.q : ''}
            showAll={searchParams?.show === 'all'}
            showAllHref={`/journal?${showAllParams.toString()}`}
            collapsedUntilSearch
          />
          <nav className="journal-albums" aria-label="Journal categories">
            {albums.map((album) => (
              <a key={album.key} className="journal-album" href={album.href}>
                {album.img ? <img src={album.img} alt="" /> : <span className="journal-album-blank" aria-hidden="true" />}
                <span className="journal-album-name">{album.label}</span>
              </a>
            ))}
          </nav>
        </section>
      )}

      {opened ? (
      <section className="wrap journal-feed">
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
            collapsedUntilSearch={false}
          />
        )}
      </section>
      ) : null}
      </main>

      <SiteFooter />
    </>
  );
}
