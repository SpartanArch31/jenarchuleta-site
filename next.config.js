// Per-post redirects from the old Squarespace /blog/<slug> URLs, generated
// during the content migration (see blog-redirects.json).
const blogRedirects = require('./blog-redirects.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve old Squarespace/static URLs and SEO.
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/book.html', destination: '/book', permanent: true },
      ...blogRedirects,
      // Any other old /blog/* link → the Journal index (no 404s).
      { source: '/blog/:path*', destination: '/journal', permanent: true },
    ];
  },
};

module.exports = nextConfig;
