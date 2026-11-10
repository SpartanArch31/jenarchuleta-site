// Published Sanity text still has these. There is no write token in this
// project, so the public site corrects them when it reads. Nothing here
// writes back to Sanity, and URL slugs stay as published.

const OLD_PODCAST_EMAIL = /unfilteredpod100@gmail\.com/gi;
const CURRENT_EMAIL = 'therealunfilteredpod@gmail.com';

export function fixPublishedCopy(text, slug) {
  if (typeof text !== 'string' || !text) return text;
  let next = text
    .replace(/\bFelling the Love\b/g, 'Feeling the Love')
    .replace(/\bShawn Patrick Flanery\b/g, 'Sean Patrick Flanery')
    // The book title. A quoted headline that only says "Velvet Rope"
    // (the newspaper's own title, or a reader's review) is left alone.
    .replace(/\bBeyond the Velvet Rope\b/g, 'Beyond the Velvet Ropes')
    .replace(OLD_PODCAST_EMAIL, CURRENT_EMAIL);

  if (slug === 'bio') {
    next = next.replace(/\bfive dogs\b/g, 'five rescues');
  }
  if (slug === 'my-memoir') {
    // The book is out. Drop only the "coming soon" opener.
    next = next.replace(/Coming\s*🔜\uFE0F?/g, 'Available now.');
  }
  if (slug === 'coming-this-july-on-the-podcast') {
    next = next.replace(/^Coming in July:\s*/, '');
  }
  return next;
}
