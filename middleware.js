import { NextResponse } from 'next/server';

// Password-protect ONLY the private dashboards (/hq Brand HQ and /hub Studio
// hub) with HTTP Basic Auth. Username "jen", password from process.env
// .HQ_PASSWORD (set in Vercel). Everything else — including /studio, the
// Sanity CMS — stays public. Never hardcode the password.
//
// SECURITY: we must NOT gate by the matcher alone. Next compiles the matcher
// case-SENSITIVELY, but the bare-path rewrites in next.config.js
// (/hub -> /hub/index.html) match case-INSENSITIVELY — so a matcher-only gate
// is bypassable: GET /HUB skips the middleware yet still serves the file.
// Instead we run middleware on all non-asset paths and decide protection from
// the LOWER-CASED pathname, which can't drift from the rewrite's casing.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

function isProtected(pathname) {
  const p = pathname.toLowerCase();
  return p === '/hq' || p.startsWith('/hq/') || p === '/hub' || p.startsWith('/hub/');
}

export function middleware(req) {
  // Public route — pass straight through, no auth.
  if (!isProtected(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const expected = process.env.HQ_PASSWORD;
  const auth = req.headers.get('authorization');

  if (expected && auth) {
    const [scheme, encoded] = auth.split(' ');
    // RFC 7617: the auth-scheme token is case-insensitive.
    if (scheme && scheme.toLowerCase() === 'basic' && encoded) {
      let decoded = '';
      try {
        decoded = atob(encoded);
      } catch {
        decoded = '';
      }
      const idx = decoded.indexOf(':');
      const user = decoded.slice(0, idx);
      const pass = decoded.slice(idx + 1);
      if (user === 'jen' && pass === expected) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Jen Archuleta private", charset="UTF-8"' },
  });
}
