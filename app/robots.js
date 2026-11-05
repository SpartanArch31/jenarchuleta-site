export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/velvet', '/velvetropes', '/velvet-letter'] },
    sitemap: 'https://jenarchuleta.com/sitemap.xml',
  };
}
