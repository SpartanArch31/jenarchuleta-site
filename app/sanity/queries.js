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

// next: { revalidate } gives ISR — new/edited posts appear without a redeploy.
const REVALIDATE = { next: { revalidate: 60 } };

export async function getAllPosts() {
  return client.fetch(ALL_POSTS, {}, REVALIDATE);
}

export async function getPostBySlug(slug) {
  return client.fetch(ONE_POST, { slug }, REVALIDATE);
}

export async function getAllSlugs() {
  return client.fetch(ALL_SLUGS, {}, REVALIDATE);
}

// ---- Velvet Letters (reader-exclusive updates on /velvet) ----
const ALL_VELVET_LETTERS = groq`*[_type == "velvetLetter"] | order(publishedAt desc){
  _id, title, publishedAt, image, body
}`;

export async function getVelvetLetters() {
  return client.fetch(ALL_VELVET_LETTERS, {}, REVALIDATE);
}
