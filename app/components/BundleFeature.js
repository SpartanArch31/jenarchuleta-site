import { SHOP } from './site-data';

// The Backstage Bundle, featured next to the book on the homepage and the
// Book page (Jen, November 2026). One wording, kept here so both pages match:
// a one-time gift with ONE COMPLIMENTARY MONTH of The Velvet Circle Book Club
// that does not renew automatically. "Get the Bundle" goes to the Shop card,
// which carries the checkout button once the $69 Stripe link exists
// (SHOP.foundingBox). The bunny-ears picture belongs with the bundle; there is
// no gift box, so the box photo is never used.
export default function BundleFeature({ showShopLink = true, id = 'bundle' }) {
  return (
    <section id={id} className="wrap home-bundle" aria-labelledby={`${id}-title`}>
      <div className="home-bundle-card">
        <img
          src="/assets/velvet-circle-group.jpg"
          alt="Readers on couches with copies of Beyond the Velvet Ropes, some wearing black bunny ears"
          width="1152"
          height="864"
          loading="lazy"
        />
        <div>
          <div className="eyebrow">One-Time Gift Bundle · {SHOP.foundingBoxPrice}</div>
          <h2 id={`${id}-title`}>The book, signed — and a few things from backstage.</h2>
          <p className="lead">
            A signed copy of <em>Beyond the Velvet Ropes</em>, my handmade velvet bookmark, black
            velvet bunny ears, and one complimentary month of The Velvet Circle Book Club. One
            payment. The month does not renew automatically.
          </p>
          <div className="hero-ctas">
            <a href="/shop#backstage-bundle" className="btn btn-primary">Get the Bundle</a>
            {showShopLink ? <a href="/shop" className="btn btn-ghost">Visit the shop</a> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
