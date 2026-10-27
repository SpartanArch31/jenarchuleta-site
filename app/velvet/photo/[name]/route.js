import { readFile } from 'fs/promises';
import path from 'path';
import { isUnlocked } from '../../passcode';

// Private photos for The Velvet Letter. They live in /private/velvet (never
// in /public), and this route only serves them to a reader whose signed
// unlock cookie checks out. Everyone else gets a plain 404, so a direct URL
// cannot get around the passcode.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const SAFE_NAME = /^[a-z0-9][a-z0-9-]*\.(jpe?g|png|webp)$/i;
const TYPES = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

function notFound() {
  return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
}

export async function GET(_request, { params }) {
  if (!isUnlocked()) return notFound();
  const name = String(params?.name || '');
  if (!SAFE_NAME.test(name)) return notFound();
  try {
    const file = await readFile(path.join(process.cwd(), 'private', 'velvet', name));
    const ext = name.split('.').pop().toLowerCase();
    return new Response(file, {
      headers: {
        'Content-Type': TYPES[ext] || 'application/octet-stream',
        'Cache-Control': 'private, max-age=3600',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch {
    return notFound();
  }
}
