import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from './env';

const builder = imageUrlBuilder({ projectId, dataset });

// urlFor(post.heroImage).width(1200).url()
export function urlFor(source) {
  return builder.image(source);
}
