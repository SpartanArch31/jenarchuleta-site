// Per-post redirects from the old Squarespace /blog/<slug> URLs, generated
// during the content migration (see blog-redirects.json).
const blogRedirects = require('./blog-redirects.json');

// Old Squarespace top-level pages still in search engines → closest new home.
const pageRedirects = [
  { source: '/the-book', destination: '/book', permanent: true },
  { source: '/velvetropes', destination: '/book', permanent: true },
  // NOTE: /about is a real page (app/about) — do not redirect it.
  { source: '/about-me', destination: '/about', permanent: true },
  { source: '/about-1', destination: '/about', permanent: true },
  { source: '/bio', destination: '/about', permanent: true },
  { source: '/story', destination: '/#story', permanent: true },
  { source: '/my-story', destination: '/#story', permanent: true },
  { source: '/speaking', destination: '/#speaking', permanent: true },
  { source: '/shop', destination: '/#shop', permanent: true },
  { source: '/store', destination: '/#shop', permanent: true },
  { source: '/the-forever-angels', destination: '/#movement', permanent: true },
  { source: '/forever-angels', destination: '/#movement', permanent: true },
  { source: '/newsletter', destination: '/#speaking', permanent: true },
  { source: '/contact', destination: '/', permanent: true },
  { source: '/press', destination: '/', permanent: true },
  { source: '/media', destination: '/', permanent: true },
  { source: '/events', destination: '/', permanent: true },
  { source: '/home', destination: '/', permanent: true },
  { source: '/work-with-me', destination: '/', permanent: true },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve old Squarespace/static URLs and SEO.
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/book.html', destination: '/book', permanent: true },
      ...pageRedirects,
      ...blogRedirects,
      // Any other old /blog/* link → the Journal index (no 404s).
      { source: '/blog/:path*', destination: '/journal', permanent: true },
    ];
  },
  // Serve the static Brand HQ dashboard at bare /hq (next start doesn't
  // auto-resolve the directory index). Auth is enforced by middleware.js.
  async rewrites() {
    return [{ source: '/hq', destination: '/hq/index.html' }];
  },
};

module.exports = nextConfig;
