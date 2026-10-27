import { client } from '../app/sanity/client';
import { urlFor } from '../app/sanity/image';
import { PUPS } from './pups';

// Server-only helpers for Pups of the Podcast photos. Pups with a Journal
// post use that post's hero image; the rest have a local file (pup.src).
export async function pupPhotoUrls(slugs, width = 900) {
  if (!slugs.length) return {};
  try {
    const rows = await client.fetch(
      `*[_type == "post" && slug.current in $slugs]{ "slug": slug.current, heroImage }`,
      { slugs },
      { next: { revalidate: 3600 } },
    );
    const urls = {};
    for (const row of rows || []) {
      if (!row?.heroImage) continue;
      urls[row.slug] = urlFor(row.heroImage).width(width).fit('max').auto('format').url();
    }
    return urls;
  } catch {
    return {};
  }
}

// The featured pup (the one marked featured: true in lib/pups.js), with its
// photo URL resolved. Returns null if it has no photo.
export async function getFeaturedPup() {
  const pup = PUPS.find((p) => p.featured) || PUPS[PUPS.length - 1];
  if (!pup) return null;
  if (pup.src) return { ...pup, photo: pup.src };
  const urls = pup.imageSlug ? await pupPhotoUrls([pup.imageSlug], 700) : {};
  const photo = urls[pup.imageSlug];
  return photo ? { ...pup, photo } : null;
}
