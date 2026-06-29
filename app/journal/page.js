import './journal.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import KitForm from '../components/KitForm';
import { urlFor } from '../sanity/image';
import { getAllPosts } from '../sanity/queries';
import { POSTS as FALLBACK_POSTS } from './_posts';

// Preferred chip order; only categories that actually have posts are shown.
const CATEGORY_ORDER = ['Podcast', 'Faith', 'Family', 'Advocacy', 'Health & Wellness', 'Behind the Book', 'Journal'];

export const metadata = {
  title: 'Journal',
  description:
    'Short, honest writing on faith, family, healing, and starting over — from Jen Archuleta.',
};

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
  const posts = live && live.length > 0 ? live : FALLBACK_POSTS;

  const active = searchParams?.category || 'All';
  const visible = active === 'All' ? posts : posts.filter((p) => p.category === active);

  // Only show category chips that actually have posts.
  const counts = posts.reduce((m, p) => {
    if (p.category) m[p.category] = (m[p.category] || 0) + 1;
    return m;
  }, {});
  const presentCategories = [
    ...CATEGORY_ORDER.filter((c) => counts[c]),
    ...Object.keys(counts).filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
  ];

  return (
    <>
      <SiteNav />

      <section className="wrap journal-head">
        <div className="eyebrow">The Journal</div>
        <h1>Notes from the road back to myself.</h1>
        <p className="lead" style={{ maxWidth: '56ch', marginInline: 'auto' }}>
          Short, honest writing on faith, family, healing, and starting over.
        </p>

        <div className="filter-row">
          <a className={`chip ${active === 'All' ? 'is-active' : ''}`} href="/journal">All</a>
          {presentCategories.map((c) => (
            <a
              key={c}
              className={`chip ${active === c ? 'is-active' : ''}`}
              href={`/journal?category=${encodeURIComponent(c)}`}
            >
              {c}
            </a>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 0 }}>
        {visible.length === 0 ? (
          <p className="center lead">No posts in “{active}” yet — check back soon.</p>
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
                    <p>{p.excerpt}</p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      <KitForm
        heading="Get the journal in your inbox."
        blurb="New essays, plus the first chapter of the book. No spam, ever."
        cta="Subscribe"
      />

      <SiteFooter />
    </>
  );
}
