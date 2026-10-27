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
  { source: '/story', destination: '/#story', permanent: true },
  { source: '/gallery', destination: '/#gallery', permanent: true },
  { source: '/my-story', destination: '/#story', permanent: true },
  { source: '/speaking', destination: '/media#speaking', permanent: true },
  // Old Squarespace store, product, and cart URLs → the shop.
  { source: '/store/:path*', destination: '/shop', permanent: true },
  { source: '/shop/p/:path*', destination: '/shop', permanent: true },
  { source: '/cart', destination: '/shop', permanent: true },
  { source: '/checkout', destination: '/shop', permanent: true },
  // Old newsletter / Mailchimp-era signup paths → the free-chapter signup.
  // Temporary (307) so a real page can take these paths later without cached redirects.
  { source: '/subscribe', destination: '/#letter', permanent: false },
  { source: '/signup', destination: '/#letter', permanent: false },
  { source: '/sign-up', destination: '/#letter', permanent: false },
  { source: '/mailing-list', destination: '/#letter', permanent: false },
  { source: '/the-forever-angels', destination: '/forever-angels', permanent: true },
  { source: '/newsletter', destination: '/#letter', permanent: true },
  // /contact and /media are real pages. /press stays a permanent alias.
  { source: '/press', destination: '/media', permanent: true },
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
