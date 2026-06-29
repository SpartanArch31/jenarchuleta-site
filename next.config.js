/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve old Squarespace/static URLs and SEO.
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/book.html', destination: '/book', permanent: true },
    ];
  },
};

module.exports = nextConfig;
