// Footer is only the legal pages. Signup and contact live on Thank You.
export default function SiteFooter({ homeHref = '/' }) {
  const home = homeHref.replace(/\/$/, '');
  const link = (href) => `${home}${href}`;

  return (
    <footer>
      <div className="wrap">
        <p className="foot-meta">
          © 2026 Jen Archuleta. Author of <em>Beyond the Velvet Ropes</em> by Jennifer Walcott Archuleta.
        </p>
        <p className="foot-meta">
          <a href={link('/privacy')}>Privacy Policy</a>
          {' · '}
          <a href={link('/terms')}>Terms of Service</a>
          {' · '}
          <a href={link('/shipping-returns')}>Shipping &amp; Returns</a>
        </p>
      </div>
    </footer>
  );
}
