/**
 * Embedded Sanity Studio at /studio.
 * Jen logs in here (with her Sanity account) and publishes — no code.
 * The actual Studio lives in the client component to keep `sanity`
 * out of the server graph.
 */
import Studio from './Studio';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <Studio />;
}
