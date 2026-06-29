import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';

export const metadata = { title: 'Page not found' };

// Branded 404 — any unmapped (often old/indexed) URL lands here with a way forward,
// instead of a dead-end "404 | This page could not be found."
export default function NotFound() {
  return (
    <>
      <SiteNav />
      <section className="wrap text-wrap center" style={{ paddingBlock: 'var(--space-10)' }}>
        <div className="threshold-rule" style={{ maxWidth: '220px', margin: '0 auto 24px' }}>
          <span className="diamond" />
        </div>
        <div className="eyebrow">This page has moved</div>
        <h1>The site has a new home.</h1>
        <p className="lead" style={{ maxWidth: '54ch', marginInline: 'auto' }}>
          That link is from the old site and didn’t make the trip. Everything’s still
          here — just in a new place. Where would you like to go?
        </p>
        <div className="hero-ctas" style={{ justifyContent: 'center', marginTop: '8px' }}>
          <a href="/" className="btn btn-primary">Home</a>
          <a href="/book" className="btn btn-ghost">The Book</a>
          <a href="/journal" className="btn btn-ghost">Journal</a>
          <a href="/podcast" className="btn btn-ghost">Podcast</a>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
