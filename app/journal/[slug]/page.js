import { notFound } from 'next/navigation';
import '../journal.css';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import KitForm from '../../components/KitForm';
import { KIT_FREE_CHAPTER_URL } from '../../components/site-data';
import { POSTS, getPost } from '../_posts';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.heroImage ? [post.heroImage] : [],
      type: 'article',
    },
  };
}

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function JournalPost({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const url = `https://jenarchuleta.com/journal/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      <SiteNav />

      <article className="wrap text-wrap">
        <div className="article-head">
          <div className="k">{post.category}</div>
          <h1>{post.title}</h1>
          <div className="meta">{formatDate(post.publishedAt)}</div>
        </div>

        {post.heroImage && <img className="article-hero" src={post.heroImage} alt="" />}

        <div className="article-body">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Sponsor block — renders only when a sponsor is set */}
        {post.sponsor && (
          <div className="sponsor-block">
            <div className="k">Sponsored by {post.sponsor.name}</div>
            <p style={{ margin: '6px 0 0' }}>
              <a href={post.sponsor.url}>{post.sponsor.url}</a>
            </p>
            {post.sponsor.disclosure && (
              <p className="foot-meta" style={{ margin: '8px 0 0' }}>{post.sponsor.disclosure}</p>
            )}
          </div>
        )}

        {/* Affiliate links + FTC disclosure — renders only when present */}
        {post.affiliateLinks && post.affiliateLinks.length > 0 && (
          <>
            <ul>
              {post.affiliateLinks.map((l, i) => (
                <li key={i}><a href={l.url}>{l.label}</a></li>
              ))}
            </ul>
            <p className="disclosure">
              This post contains affiliate links. If you buy through them I may earn a small
              commission, at no extra cost to you. I only share what I actually use.
            </p>
          </>
        )}

        {/* Share */}
        <div className="share-row">
          <span className="k">Share</span>
          <a className="btn btn-ghost btn-sm" href={`https://x.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(url)}`}>X</a>
          <a className="btn btn-ghost btn-sm" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}>Facebook</a>
          <a className="btn btn-ghost btn-sm" href={`mailto:?subject=${shareText}&body=${encodeURIComponent(url)}`}>Email</a>
        </div>

        {/* Book CTA */}
        <div className="book-cta">
          <img src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes" />
          <div>
            <div className="eyebrow">The Memoir — Out Now</div>
            <h3 style={{ margin: '.2em 0 .3em' }}>Beyond the Velvet Ropes</h3>
            <p className="foot-meta" style={{ margin: '0 0 14px' }}>My Story of Perseverance, Hope, and Love</p>
            <a href="/book" className="btn btn-primary btn-sm">Get the book</a>{' '}
            <a href={KIT_FREE_CHAPTER_URL} className="btn btn-ghost btn-sm">First chapter free</a>
          </div>
        </div>
      </article>

      <KitForm />

      <SiteFooter />
    </>
  );
}
