import { OG_IMAGE } from '../app/components/site-data';

// Jen, Nov 13 (SEO basics): every public page gets a canonical tag pointing at
// its own address, and its og:title / og:description (and Twitter's) match the
// page's own title and description. Paths are resolved against metadataBase
// (https://jenarchuleta.com) in app/layout.js.
//
// title: the page's title as the site template fills it in ("About" becomes
// "About, Jen Archuleta"), or pass absolute: true for a full title.
export function pageMeta({ path, title, description, absolute = false, image = OG_IMAGE, ...rest }) {
  const fullTitle = absolute ? title : `${title}, Jen Archuleta`;
  const imageUrl = typeof image === 'string' ? image : image.url;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    ...rest,
  };
}
