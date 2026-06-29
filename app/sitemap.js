import { getAllSlugs } from './sanity/queries';

const BASE = 'https://jenarchuleta.com';

// Tells search engines the real, current URLs so they reindex away from the
// old Squarespace links.
export default async function sitemap() {
  const slugs = await getAllSlugs().catch(() => []);
  const posts = (slugs || []).map((s) => ({
    url: `${BASE}/journal/${s}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  const pages = [
    { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/book`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/podcast`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/journal`, changeFrequency: 'daily', priority: 0.8 },
  ];
  return [...pages, ...posts];
}
