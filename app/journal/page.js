import './journal.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import KitForm from '../components/KitForm';
import { POSTS, CATEGORIES } from './_posts';

export const metadata = {
  title: 'Journal',
  description:
    'Short, honest writing on faith, family, healing, and starting over — from Jen Archuleta.',
};

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function JournalPage({ searchParams }) {
  const active = searchParams?.category || 'All';
  const sorted = [...POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  const visible = active === 'All' ? sorted : sorted.filter((p) => p.category === active);

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
          {CATEGORIES.map((c) => (
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
            {visible.map((p) => (
              <a key={p.slug} className="post-card" href={`/journal/${p.slug}`}>
                {p.heroImage && <img src={p.heroImage} alt="" />}
                <div className="body">
                  <div className="k">{p.category} · {formatDate(p.publishedAt)}</div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </div>
              </a>
            ))}
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
