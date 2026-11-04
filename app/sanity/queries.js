import { groq } from 'next-sanity';
import { client } from './client';

// Shared projection so feed + post return the same shape.
const POST_FIELDS = groq`
  "slug": slug.current,
  title,
  publishedAt,
  category,
  excerpt,
  heroImage,
  seoTitle,
  seoDescription
`;

const ALL_POSTS = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){ ${POST_FIELDS} }`;

const ONE_POST = groq`*[_type == "post" && slug.current == $slug][0]{
  ${POST_FIELDS},
  body,
  affiliateLinks[]{ label, url },
  sponsor{ name, url, disclosure }
}`;

const ALL_SLUGS = groq`*[_type == "post" && defined(slug.current)].slug.current`;

// Journal HTML was prerendered and then kept (Vercel served it STALE well past
// the old 60s window). A publish showed up on the uncached /journal index, and
// stayed invisible on the post page until a later refresh. Read the published
// document on each request instead.
// Recipes Jen wrote under another category. The wording stays hers.
const CATEGORY_BY_SLUG = {
  'homemade-formula': 'Cooking',
};

// Published Sanity text still has these. There is no write token in this
// project, so the public site corrects them when it reads.
function fixPublishedCopy(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/\bFelling the Love\b/g, 'Feeling the Love')
    .replace(/\bShawn Patrick Flanery\b/g, 'Sean Patrick Flanery')
    // No Arizona on the site except Charlie's pup card (Jen, Nov 4, 2026).
    .replace(/^Back to School featured on Arizona family partnered with /, 'Back to School featured on local TV, partnered with ');
}

function fixTree(value) {
  if (typeof value === 'string') return fixPublishedCopy(value);
  if (Array.isArray(value)) return value.map(fixTree);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, child] of Object.entries(value)) out[key] = fixTree(child);
    return out;
  }
  return value;
}

function withFixes(post) {
  if (!post || typeof post !== 'object') return post;
  const category = CATEGORY_BY_SLUG[post.slug] || post.category;
  return {
    ...post,
    category,
    title: fixPublishedCopy(post.title),
    excerpt: fixPublishedCopy(post.excerpt),
    seoTitle: fixPublishedCopy(post.seoTitle),
    seoDescription: fixPublishedCopy(post.seoDescription),
  };
}

const FRESH = { cache: 'no-store' };

// Slug list can lag a minute. It is not the post body.
const REVALIDATE = { next: { revalidate: 60 } };

export async function getAllPosts() {
  const posts = await client.fetch(ALL_POSTS, {}, FRESH);
  return Array.isArray(posts) ? posts.map(withFixes) : posts;
}

export async function getPostBySlug(slug) {
  return withFixes(await client.fetch(ONE_POST, { slug }, FRESH));
}

export async function getAllSlugs() {
  return client.fetch(ALL_SLUGS, {}, REVALIDATE);
}

// The homepage's newest posts (Nov 2026). Cached for 10 minutes so the
// homepage stays fast; the caller drops archived and Pup of the Podcast posts,
// so it asks for more than it shows.
const RECENT_POSTS = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...40]{ ${POST_FIELDS} }`;

export async function getRecentPosts() {
  const posts = await client.fetch(RECENT_POSTS, {}, { next: { revalidate: 600 } });
  return Array.isArray(posts) ? posts.map(withFixes) : [];
}

// ---- Velvet Letters (reader-exclusive updates on /velvet) ----
// Published only, newest first. Read on each request so a Studio publish
// shows up on the next load. The public client is used unless
// SANITY_API_READ_TOKEN is set (see sanity/client.js).
const ALL_VELVET_LETTERS = groq`*[_type == "velvetLetter" && !(_id in path("drafts.**"))] | order(publishedAt desc){
  _id, title, publishedAt, image, body
}`;

export async function getVelvetLetters() {
  const letters = await client.fetch(ALL_VELVET_LETTERS, {}, FRESH);
  return Array.isArray(letters) ? letters.map(fixTree) : [];
}
