// Per-post redirects from the old Squarespace /blog/<slug> URLs, generated
// during the content migration (see blog-redirects.json).
const blogRedirects = require('./blog-redirects.json');

// Old Squarespace top-level pages still in search engines → closest new home.
const pageRedirects = [
  { source: '/the-book', destination: '/book', permanent: true },
  // The QR code printed in the back of the book encodes /velvetropes —
  // it must land on the password-gated reader page, NOT /book.
  { source: '/velvetropes', destination: '/velvet', permanent: true },
  { source: '/velvet-letter', destination: '/velvet', permanent: true },
  { source: '/velvet-letter/:path*', destination: '/velvet', permanent: true },
  // NOTE: /about is a real page (app/about) — do not redirect it.
  { source: '/about-me', destination: '/about', permanent: true },
  { source: '/about-1', destination: '/about', permanent: true },
  { source: '/bio', destination: '/about', permanent: true },
  { source: '/story', destination: '/about#then', permanent: true },
  { source: '/gallery', destination: '/about#gallery', permanent: true },
  { source: '/my-story', destination: '/about#then', permanent: true },
  { source: '/speaking', destination: '/media#speaking', permanent: true },
  // Old Squarespace store, product, and cart URLs → the shop.
  { source: '/store/:path*', destination: '/book#shop', permanent: true },
  { source: '/shop/p/:path*', destination: '/book#shop', permanent: true },
  { source: '/cart', destination: '/book#shop', permanent: true },
  { source: '/checkout', destination: '/book#shop', permanent: true },
  { source: '/shop', destination: '/book#shop', permanent: false },
  // Old newsletter / Mailchimp-era signup paths → the free-chapter signup.
  // Temporary (307) so a real page can take these paths later without cached redirects.
  { source: '/subscribe', destination: '/media#social', permanent: false },
  { source: '/signup', destination: '/media#social', permanent: false },
  { source: '/sign-up', destination: '/media#social', permanent: false },
  { source: '/mailing-list', destination: '/media#social', permanent: false },
  // The Forever Angels page is /forever-angels. The older spelled-out path lands there.
  { source: '/the-forever-angels', destination: '/media#forever-angels', permanent: false },
  { source: '/forever-angels', destination: '/media#forever-angels', permanent: false },
  { source: '/about-the-author', destination: '/book#author', permanent: false },
  { source: '/newsletter', destination: '/media#social', permanent: false },
  // Quotes live on Thank You.
  { source: '/quotes', destination: '/thank-you', permanent: false },
  // /contact lands on the contact section of the combined Media page.
  { source: '/contact', destination: '/media#contact', permanent: false },
  { source: '/press', destination: '/media', permanent: true },
  { source: '/events', destination: '/', permanent: true },
  { source: '/home', destination: '/', permanent: true },
  { source: '/work-with-me', destination: '/', permanent: true },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The Velvet Letter's private photos live in /private (never /public) and are
  // read from disk by the gated route, so they must ship with these functions.
  experimental: {
    outputFileTracingIncludes: {
      '/velvet': ['./private/velvet/**/*'],
      '/velvet/photo/[name]': ['./private/velvet/**/*'],
    },
  },
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
  // Serve the static private dashboards at their bare paths (next start
  // doesn't auto-resolve a directory index). Auth is enforced by middleware.js.
  async rewrites() {
    return [
      { source: '/hq', destination: '/hq/index.html' },
      { source: '/hub', destination: '/hub/index.html' },
    ];
  },
};

module.exports = nextConfig;
