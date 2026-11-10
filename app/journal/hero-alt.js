// Alt text for a Journal hero when the site draws the image.
// Most heroes already have alt text in Sanity. That text passes through.
// The two slugs below have none in Sanity. The descriptions are from looking
// at the photos (Nov 5, 2026). This file does not write anything back to Sanity.
// The file paths are the local fallback posts, used only if Sanity is empty.

const BY_SLUG = {
  'now-available-at-barnes-and-noble':
    'A New Release graphic for Beyond the Velvet Ropes at Barnes & Noble',
  'the-jennifer-effect':
    'Jen Archuleta smiling outdoors, holding sunflowers',
};

const BY_FILE = {
  '/assets/jen-bw-coat.jpg': 'Jen Archuleta in a long black coat, standing under trees',
  '/assets/jen-fitness.jpg': 'Jen Archuleta smiling in a white sports top, hands on her hips',
  '/assets/jen-headshot-bw.jpg': 'Black and white portrait of Jen Archuleta in a black top',
};

// Sanity still describes the bookmark photo as a Coming Soon graphic.
// The bookmarks are for sale, so the site supplies this description instead.
const OVERRIDE_BY_SLUG = {
  'book-marks': 'Beyond the Velvet Ropes bookmarks',
};

export function heroAlt(img, slug) {
  if (slug && OVERRIDE_BY_SLUG[slug]) return OVERRIDE_BY_SLUG[slug];
  if (img && typeof img === 'object') {
    const alt = typeof img.alt === 'string' ? img.alt.trim() : '';
    if (alt) return alt;
  }
  if (typeof img === 'string' && BY_FILE[img]) return BY_FILE[img];
  return (slug && BY_SLUG[slug]) || '';
}
