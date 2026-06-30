import { NextResponse } from 'next/server';

// Password-protect ONLY /hq (the private Brand HQ dashboard) with HTTP Basic
// Auth. Username "jen", password from process.env.HQ_PASSWORD (set in Vercel).
// The rest of the site stays public. Never hardcode the password.
export const config = {
  matcher: ['/hq', '/hq/:path*'],
};

export function middleware(req) {
  const expected = process.env.HQ_PASSWORD;
  const auth = req.headers.get('authorization');

  if (expected && auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
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
    headers: { 'WWW-Authenticate': 'Basic realm="Brand HQ", charset="UTF-8"' },
  });
}
