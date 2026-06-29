export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/studio' },
    sitemap: 'https://jenarchuleta.com/sitemap.xml',
  };
}
