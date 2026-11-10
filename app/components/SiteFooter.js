import Link from 'next/link';

// Footer is only the legal pages. Signup and contact live on Thank You.
// G-09: next/link for client navigation (an absolute homeHref still works as a plain link).
export default function SiteFooter({ homeHref = '/' }) {
  const home = homeHref.replace(/\/$/, '');
  const link = (href) => `${home}${href}`;

  return (
    <footer>
      <div className="wrap">
        <p className="foot-meta">
          © 2026 Jen Archuleta. Author of <em>Beyond the Velvet Ropes</em> by Jennifer Walcott Archuleta.
        </p>
        {/* G-07: a real list, so the links wrap and each one is a full tap target. */}
        <ul className="foot-meta foot-legal" aria-label="Legal">
          <li><Link href={link('/journal')}>Journal</Link></li>
          <li><Link href={link('/privacy')}>Privacy Policy</Link></li>
          <li><Link href={link('/terms')}>Terms of Service</Link></li>
          <li><Link href={link('/shipping-returns')}>Shipping &amp; Returns</Link></li>
        </ul>
      </div>
    </footer>
  );
}
