import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { KIT_FREE_CHAPTER_URL, SHOP } from '../components/site-data';

export const metadata = {
  title: 'Shop',
  description:
    'Signed copies of Beyond the Velvet Ropes, the Be the Bumblebee tee, and a way to give back through The Forever Angels.',
};

export default function ShopPage() {
  return (
    <>
      <SiteNav />

      <a id="top" />

      {/* HERO */}
      <section className="wrap">
        <div className="center">
          <div className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>the good stuff…</div>
          <div className="eyebrow">The Shop</div>
          <h2>A few things worth sharing.</h2>
          <p className="lead" style={{ maxWidth: '58ch', marginInline: 'auto' }}>
            A signed copy of the book, a tee with a message I love, and a rescue close to my heart.
            A little of everything I care about — story, a good reminder, and giving back.
          </p>
        </div>

        <div className="cards-3" style={{ marginTop: '40px' }}>
          {/* SIGNED BOOK */}
          <div className="mini">
            <div className="body">
              <div className="k">Book</div>
              <h4>Signed copy — <em>Beyond the Velvet Ropes</em></h4>
              {SHOP.signedBook ? (
                <>
                  <p className="foot-meta">Signed by me, with a note to whoever you’d like.</p>
                  <p style={{ marginTop: '14px' }}>
                    <a href={SHOP.signedBook} target="_blank" rel="noopener" className="btn btn-primary btn-sm">
                      Order a signed copy
                    </a>
                  </p>
                </>
              ) : (
                <>
                  <p className="foot-meta">Signed copies are coming soon.</p>
                  <p style={{ marginTop: '14px' }}>
                    <a href={KIT_FREE_CHAPTER_URL} className="btn btn-ghost btn-sm">
                      Read the first chapter free
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* APPAREL — Etsy */}
          <div className="mini">
            <div className="body">
              <div className="k">Apparel</div>
              <h4>Be the Bumblebee tee</h4>
              <p className="foot-meta">A little reminder to fly your own way — over on my Etsy.</p>
              <p style={{ marginTop: '14px' }}>
                <a href={SHOP.etsyTee} target="_blank" rel="noopener" className="btn btn-primary btn-sm">
                  Shop on Etsy →
                </a>
              </p>
            </div>
          </div>

          {/* GIVE BACK — Forever Angels */}
          <div className="mini">
            <div className="body">
              <div className="k">Give back</div>
              <h4>The Forever Angels</h4>
              <p className="foot-meta">The rescue closest to my heart. Every bit helps.</p>
              <p style={{ marginTop: '14px' }}>
                <a href={SHOP.foreverAngels} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">
                  Support the rescue →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
