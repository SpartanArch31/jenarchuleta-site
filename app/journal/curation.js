// Journal curation, set in code so it ships with a preview and is easy to undo.
// Nothing here deletes or edits a post in Sanity. Archived posts stay live at
// their own URL and are listed under "Archive" on /journal.
//
// Jen's categories, in her order (October 27, 2026).
export const CATEGORY_ORDER = [
  'Faith',
  'Family',
  'Cooking',
  'Advocacy',
  'Health & Wellness',
  'Behind the Book',
  'Podcast',
  'Pup of the Podcast',
];

// Repetitive promotional posts: "coming soon" teasers, duplicate "now live"
// announcements, review and sponsor asks, giveaways, contests, event ticket
// posts, and product drops. Kept, but out of the main Journal feed.
export const ARCHIVED_SLUGS = new Set([
  // Podcast "coming soon" teasers (each episode has its own post)
  'coming-soon-my-very-own-podcast',
  'coming-soon',
  'next-podcast',
  'sean-lauren-flanery',
  'lauren-flanery',
  'coming-this-july-on-the-podcast',
  'coming-soon-4',
  'august',
  'amy-palmiero-winters',
  'national-security-expert',
  'coming-soon-2',
  'this-month',
  'coming-soon-3',
  'coming-soon-on-unfiltered-with-jen-archuleta',
  'brett-tippie',
  // Duplicate "now live" / "airs tomorrow" announcements
  'my-podcast-is-live',
  'live',
  'live-now',
  'oklahoma-fires',
  'live-3',
  // Asks and promotions
  'please-review',
  'they-didn-t-know-our-story-until-they-listened',
  'would-you-like-to-be-a-sponsor',
  'what-did-they-say',
  'Review',
  'audiobook-giveaway',
  'now-available-at-barnes-and-noble',
  'book-marks',
  'Thevelvetcircle',
  'bonus-content',
  'my-memoir',
  'it-s-live',
  'nft-contest',
  'thank-you',
  'what-is-an-influencer',
  'keep-in-touch',
  'forever-angels-charity-event-raffle-items',
  'the-forever-angels',
]);

// Category fixes by slug, if any post needs one. (None right now: the only
// uncategorized "Journal" posts are archived above.)
export const CATEGORY_OVERRIDES = {};

export function curatePosts(posts) {
  return (posts || []).map((p) => {
    const category = CATEGORY_OVERRIDES[p.slug] || p.category;
    return { ...p, category, archived: ARCHIVED_SLUGS.has(p.slug) };
  });
}
