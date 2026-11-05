import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import '../journal.css';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { OG_IMAGE } from '../../components/site-data';
import { urlFor } from '../../sanity/image';
import { getPostBySlug, getAllSlugs } from '../../sanity/queries';
import { POSTS as FALLBACK_POSTS, getPost as getFallbackPost } from '../_posts';
import { isRetiredHref, prepareJournalBody } from '../repair-body.mjs';
import { heroAlt } from '../hero-alt';

// Render each post from the published Sanity document on the request.
// These routes were static ISR. The first view after a publish still received
// the previous HTML, so an edited handle stayed wrong while /journal (dynamic)
// already showed other new posts.
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = await getAllSlugs().catch(() => []);
  const all = slugs && slugs.length > 0 ? slugs : FALLBACK_POSTS.map((p) => p.slug);
  return all.map((slug) => ({ slug }));
}

async function resolvePost(slug) {
  const live = await getPostBySlug(slug).catch(() => null);
  return live || getFallbackPost(slug);
}

function descriptionFromBody(body) {
  if (!Array.isArray(body)) return '';
  const text = body
    .filter((block) => block && block._type === 'block' && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child?.text || '').join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return '';
  const cut = text.slice(0, 180);
  const end = cut.lastIndexOf('. ');
  const sentence = end > 40 ? cut.slice(0, end + 1) : cut;
  return sentence.length > 160 ? `${sentence.slice(0, 157).trim()}…` : sentence;
}

export async function generateMetadata({ params }) {
  const post = await resolvePost(params.slug);
  if (!post) return {};
  const description = post.seoDescription || post.excerpt || descriptionFromBody(post.body);
  return {
    title: post.seoTitle || post.title,
    description,
    openGraph: {
      title: post.seoTitle || post.title,
      description,
      type: 'article',
      images: [OG_IMAGE],
    },
  };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function heroUrl(img) {
  if (!img) return null;
  if (typeof img === 'string') return img;
  return urlFor(img).width(1200).url();
}

// ---------------------------------------------------------------------------
// Auto-link bare URLs (added 2026-10-24).
// URLs pasted into a post in /studio arrive as plain text, and every link in the
// migrated Squarespace posts came across as plain text too — so readers couldn't
// click them. This turns bare http(s) URLs into real links at render time.
// Nothing in Sanity changes; text that's already a link is left alone.
// ---------------------------------------------------------------------------
const isExternal = (href) =>
  /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?jenarchuleta\.com(\/|$)/i.test(href);

// J-11: some posts are long hand-numbered lists, one paragraph per line
// ("1. Love really does win."). A run of 3 or more such paragraphs gets the
// 'numbered' style so it renders with a hanging indent. The words and the
// typed numbers stay exactly as Jen wrote them.
const NUMBERED_LINE = /^\s*\d{1,2}\.\s/;
const MIN_NUMBERED_RUN = 3;

function blockText(block) {
  if (typeof block === 'string') return block;
  if (!block || block._type !== 'block' || block.listItem || (block.style && block.style !== 'normal')) return null;
  if (!Array.isArray(block.children)) return null;
  return block.children.map((child) => child?.text || '').join('');
}

// Returns a Set of indexes that sit in a run of numbered lines.
function numberedRuns(blocks) {
  const marked = new Set();
  let run = [];
  const flush = () => {
    if (run.length >= MIN_NUMBERED_RUN) run.forEach((i) => marked.add(i));
    run = [];
  };
  blocks.forEach((block, i) => {
    const text = blockText(block);
    if (text !== null && NUMBERED_LINE.test(text)) run.push(i);
    else flush();
  });
  flush();
  return marked;
}

function markNumbered(blocks) {
  if (!Array.isArray(blocks)) return blocks;
  const marked = numberedRuns(blocks);
  if (marked.size === 0) return blocks;
  return blocks.map((block, i) => (marked.has(i) ? { ...block, style: 'numbered' } : block));
}

// Portable Text renderers for links + inline images.
const ptComponents = {
  block: {
    numbered: ({ children }) => <p className="num-item">{children}</p>,
  },
  types: {
    image: ({ value }) => (
      <img src={urlFor(value).width(1100).url()} alt={value?.alt || ''} style={{ width: '100%', borderRadius: 'var(--radius-lg)', margin: '20px 0' }} />
    ),
  },
  marks: {
    link: ({ value, children }) =>
      !value?.href || isRetiredHref(value.href) ? null : isExternal(value?.href || '') ? (
        <a href={value.href} target="_blank" rel="noopener noreferrer">{children}</a>
      ) : (
        <a href={value?.href}>{children}</a>
      ),
  },
};

export default async function JournalPost({ params }) {
  const post = await resolvePost(params.slug);
  if (!post) notFound();

  const url = `https://jenarchuleta.com/journal/${post.slug}`;
  const shareText = encodeURIComponent(post.title);
  const hero = heroUrl(post.heroImage);
  const heroDescription = heroAlt(post.heroImage, post.slug);
  const bodyIsStrings = Array.isArray(post.body) && typeof post.body[0] === 'string';
  const numberedStrings = bodyIsStrings ? numberedRuns(post.body) : null;

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />

      <main id="main-content">
      <article className="wrap text-wrap journal-article">
        <div className="article-head">
          <div className="k">{post.category}</div>
          <h1>{post.title}</h1>
          <div className="meta">{formatDate(post.publishedAt)}</div>
        </div>

        {hero && <img className="article-hero" src={hero} alt={heroDescription} />}

        <div className="article-body">
          {bodyIsStrings
            ? post.body.map((para, i) => <p key={i} className={numberedStrings.has(i) ? 'num-item' : undefined}>{para}</p>)
            : post.body && <PortableText value={markNumbered(prepareJournalBody(post.body, post.slug))} components={ptComponents} />}
        </div>

        {/* Sponsor block — renders only when a sponsor is set */}
        {post.sponsor && post.sponsor.name && (
          <div className="sponsor-block">
            <div className="k">Sponsored by {post.sponsor.name}</div>
            {post.sponsor.url && (
              <p style={{ margin: '6px 0 0' }}><a href={post.sponsor.url}>{post.sponsor.url}</a></p>
            )}
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

      </article>
      </main>

      <SiteFooter />
    </>
  );
}
