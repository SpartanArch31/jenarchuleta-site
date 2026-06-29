/*
 * PLACEHOLDER journal data for Phase 1.
 *
 * Phase 2: this module gets replaced by Sanity. The post shape below
 * mirrors the planned Sanity schema 1:1 so the page components don't
 * change when the data source swaps:
 *   title, slug, publishedAt, category, excerpt, heroImage,
 *   body[] (portable text -> here just paragraphs), affiliateLinks[],
 *   sponsor {name,url,disclosure}, seoTitle, seoDescription
 */

export const CATEGORIES = [
  'Journal',
  'Faith',
  'Family',
  'Advocacy',
  'Behind the Book',
  'Health & Wellness',
  'Turbo',
];

export const POSTS = [
  {
    title: 'It is in the waiting that we become who we’re meant to be.',
    slug: 'in-the-waiting',
    publishedAt: '2026-06-20',
    category: 'Faith',
    heroImage: '/assets/jen-bw-coat.jpg',
    excerpt:
      'The hardest seasons weren’t the ones that broke me. They were the ones that taught me how to wait without losing myself.',
    body: [
      'For a long time I thought faith meant the rescue would come quickly. That if I prayed hard enough, the waiting would be short.',
      'It wasn’t. And in the waiting — the long, quiet, unglamorous waiting — I found the version of myself I’d been looking for the whole time.',
      'This is the part no one photographs. But it’s the part that mattered most.',
    ],
    affiliateLinks: [],
    sponsor: null,
    seoTitle: 'In the Waiting — Jen Archuleta',
    seoDescription: 'On faith, patience, and becoming who you’re meant to be.',
  },
  {
    title: 'Survival isn’t the same thing as healing.',
    slug: 'survival-vs-healing',
    publishedAt: '2026-06-12',
    category: 'Health & Wellness',
    heroImage: '/assets/jen-fitness.jpg',
    excerpt:
      'I survived for years. Healing was a different, braver choice — and it started in the gym as much as anywhere.',
    body: [
      'Survival is holding it together. Healing is finally letting yourself fall apart in a safe place and rebuilding on purpose.',
      'For me, movement became part of that. Not punishment — proof that this body carried me through everything and is still here.',
    ],
    affiliateLinks: [
      { label: 'The trainers I actually use', url: 'https://example.com/affiliate' },
    ],
    sponsor: null,
    seoTitle: 'Survival Isn’t Healing — Jen Archuleta',
    seoDescription: 'Why surviving and healing are not the same thing.',
  },
  {
    title: 'What I want my kids to know about getting back up.',
    slug: 'getting-back-up',
    publishedAt: '2026-06-04',
    category: 'Family',
    heroImage: '/assets/jen-headshot-blazer.jpg',
    excerpt:
      'If they remember one thing about their mother, let it be this: we fall, we learn, and we rise anyway.',
    body: [
      'My kids have seen me at my strongest and my most broken. I used to want to hide the broken parts. Now I think those are the lessons.',
      'Getting back up isn’t pretty. It’s puffy eyes and a made bed and showing up one more time. That’s the whole secret.',
    ],
    affiliateLinks: [],
    sponsor: null,
    seoTitle: 'Getting Back Up — Jen Archuleta',
    seoDescription: 'A letter to my kids about resilience.',
  },
];

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug) || null;
}
