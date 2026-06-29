// Per-post redirects from the old Squarespace /blog/<slug> URLs, generated
// during the content migration (see blog-redirects.json).
const blogRedirects = require('./blog-redirects.json');

// Old Squarespace top-level pages still in search engines → closest new home.
const pageRedirects = [
  { source: '/the-book', destination: '/book', permanent: true },
  { source: '/about', destination: '/#story', permanent: true },
  { source: '/about-me', destination: '/#story', permanent: true },
  { source: '/about-1', destination: '/#story', permanent: true },
  { source: '/bio', destination: '/#story', permanent: true },
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
};

module.exports = nextConfig;
