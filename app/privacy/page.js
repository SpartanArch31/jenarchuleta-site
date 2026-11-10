import '../legal-pages.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How jenarchuleta.com collects, uses, and protects your personal information.',
};

const EFFECTIVE_DATE = 'July 23, 2026';
const CONTACT_EMAIL = 'therealunfilteredpod@gmail.com';

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      {/* LEGAL-07: skip link first in tab order, target is a real <main> landmark. */}
      <a href="#main-content" className="skip-link">Skip to content</a>

      <SiteNav />

      <main id="main-content" tabIndex={-1} className="wrap text-wrap">
        <article>
        <div className="legal-head">
          <div className="eyebrow">Legal</div>
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Effective {EFFECTIVE_DATE}</p>
          {/* LEGAL-04: gold threshold rule marks the passage from header to body. */}
          <div className="threshold-rule" aria-hidden="true"><span className="diamond" /></div>
        </div>

        <div className="legal-body">
          <h2 id="who-we-are">1. Who we are</h2>
          <p>
            This Privacy Policy explains how Archuleta Entertainment (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
            or &ldquo;our&rdquo;), operator of jenarchuleta.com (the &ldquo;Site&rdquo;), collects, uses,
            and protects your personal information.
          </p>

          <h2 id="information-we-collect">2. Information we collect</h2>
          {/* LEGAL-05: real subheads, so they show in the outline. */}
          <h3>Information you give us directly:</h3>
          <ul>
            <li>Your name and email address when you sign up for the newsletter or request the free chapter.</li>
            <li>
              Your shipping address, phone number, and any personalization note (e.g., &ldquo;who should
              Jen sign it to?&rdquo;) when you order a signed book or other product.
            </li>
            <li>Your payment details when you check out, collected and processed directly by our payment processor (see below); we never see or store your full card number.</li>
            <li>Anything you tell us directly, such as an email you send us.</li>
          </ul>

          <h3>Information collected automatically:</h3>
          <ul>
            <li>
              Basic technical and server log information (such as IP address, browser type, and pages
              visited), collected by our hosting provider, Vercel, for security and performance purposes.
              We do not currently run our own analytics, advertising, or tracking cookies.
            </li>
          </ul>

          <h3>Third-party services embedded on the Site:</h3>
          <ul>
            <li>
              <strong>Kit (ConvertKit)</strong> powers our newsletter sign-up and free-chapter form, and
              may set its own cookies (<a href="https://www.kit.com/privacy-policy" target="_blank" rel="noopener" aria-label="Kit: their privacy policy (opens in a new tab)">their privacy policy</a>).
            </li>
            <li>
              <strong>Stripe</strong> powers checkout for direct purchases and processes your payment
              details directly (<a href="https://stripe.com/privacy" target="_blank" rel="noopener" aria-label="Stripe: their privacy policy (opens in a new tab)">their privacy policy</a>).
            </li>
            <li>
              <strong>Buzzsprout</strong> powers the embedded podcast player (<a href="https://www.buzzsprout.com/privacy" target="_blank" rel="noopener" aria-label="Buzzsprout: their privacy policy (opens in a new tab)">their privacy policy</a>).
            </li>
            <li>
              <strong>Sanity</strong> powers our Journal content management system; it does not collect
              visitor data from this Site.
            </li>
          </ul>

          <h2 id="how-we-use">3. How we use your information</h2>
          <ul>
            <li>To fulfill and ship your order.</li>
            <li>To send the newsletter or free chapter you requested, you can unsubscribe anytime via the link in any email.</li>
            <li>To respond to questions or requests you send us.</li>
            <li>To maintain and improve the Site.</li>
          </ul>
          <p>We do not sell your personal information, and we do not use it for <span className="nowrap">third-party</span> advertising.</p>

          <h2 id="cookies">4. Cookies</h2>
          <p>
            Some of the third-party services listed above may place cookies in your browser to make
            their features work (for example, completing checkout or remembering a form submission). We
            do not currently use our own tracking or advertising cookies.
          </p>

          <h2 id="childrens-privacy">5. Children&rsquo;s privacy</h2>
          <p>
            The Site is intended for adults and is not directed to children under 13. We do not
            knowingly collect personal information from children.
          </p>

          <h2 id="your-rights">6. Your privacy rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct, or delete the personal
            information we hold about you, or to opt out of certain uses. To make a request, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We do not sell personal information,
            but we will still honor a &ldquo;do not sell/share&rdquo; request as a matter of policy.
          </p>

          <h2 id="retention-security">7. Data retention &amp; security</h2>
          <p>
            We keep personal information only as long as reasonably needed for the purposes above, or
            as required by law. Payment information is handled entirely by Stripe, a <span className="nowrap">PCI-DSS-compliant</span>
            payment processor. We do not store card numbers on our own systems.
          </p>

          <h2 id="international">8. International visitors</h2>
          <p>
            The Site is operated from the United States. If you access the Site from outside the U.S.,
            your information will be processed in the U.S.
          </p>

          <h2 id="changes">9. Changes to this policy</h2>
          <p>We may update this Privacy Policy from time to time. The effective date above reflects the latest revision.</p>

          <h2 id="contact">10. Contact us</h2>
          <p>Questions about this policy? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
