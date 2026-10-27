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
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/book`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/quotes`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/podcast`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/sponsors`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/pups`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/journal`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/shop`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/media`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.5 },
  ];
  return [...pages, ...posts];
}
