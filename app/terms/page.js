import '../legal-pages.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

export const metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern your use of jenarchuleta.com.',
};

const EFFECTIVE_DATE = 'July 23, 2026';
const CONTACT_EMAIL = 'jen@jenarchuleta.com';

export default function TermsPage() {
  return (
    <div className="legal-page">
      <SiteNav />

      <a href="#main-content" className="skip-link">Skip to content</a>

      <article id="main-content" className="wrap text-wrap">
        <div className="legal-head">
          <div className="eyebrow">Legal</div>
          <h1>Terms of Service</h1>
          <p className="legal-updated">Effective {EFFECTIVE_DATE}</p>
        </div>

        <p className="legal-notice">
          This page is a general template written to cover how this site actually works today —
          it is not legal advice and has not been reviewed by an attorney. Please have it reviewed
          by qualified legal counsel before relying on it.
        </p>

        <div className="legal-body">
          <h2>1. Acceptance of terms</h2>
          <p>
            By using jenarchuleta.com (the &ldquo;Site&rdquo;), operated by Archuleta Entertainment, you
            agree to these Terms of Service. If you don&rsquo;t agree, please don&rsquo;t use the Site.
          </p>

          <h2>2. About the content</h2>
          <p>
            This Site shares the personal story, opinions, and experiences of Jennifer Walcott
            Archuleta, including her memoir <em>Beyond the Velvet Ropes</em> and the Journal blog. This
            content reflects the author&rsquo;s personal recollections and perspective at the time of
            writing; names or identifying details of other people may be changed. Nothing on this Site
            is professional medical, legal, financial, or psychological advice — if you&rsquo;re
            struggling, please reach out to a qualified professional or a crisis line in your area.
          </p>

          <h2>3. Purchases</h2>
          <p>
            Some items — such as signed copies of the book, and in the future, memberships or specialty
            boxes — are available for direct purchase through third-party checkout providers (currently
            Stripe, and Kit for certain products). By placing an order, you agree to that provider&rsquo;s
            terms in addition to these. Prices, availability, and product details are subject to change
            without notice. Shipping, returns, and cancellation terms for physical and recurring products
            are set out in our{' '}
            <a href="/shipping-returns">Shipping &amp; Returns Policy</a>.
          </p>

          <h2>4. Intellectual property</h2>
          <p>
            All text, images, audio, and other content on this Site — including the book cover, photos,
            podcast episodes, and Journal posts — is owned by Archuleta Entertainment / Jennifer Walcott
            Archuleta or used with permission, unless stated otherwise, and may not be copied,
            republished, or used commercially without our written permission.
          </p>

          <h2>5. Third-party links</h2>
          <p>
            This Site links to third-party sites and services we don&rsquo;t control, including Etsy,
            The Forever Angels, podcast platforms (Spotify, Apple Podcasts, YouTube), and, occasionally,
            affiliate or sponsored links in Journal posts (each clearly disclosed on the post itself). We
            aren&rsquo;t responsible for the content, policies, or practices of any third-party site.
          </p>

          <h2>6. Acceptable use</h2>
          <p>
            You agree not to misuse the Site — including attempting to gain unauthorized access,
            scraping content for republication, or using the Site for any unlawful purpose.
          </p>

          <h2>7. Disclaimer of warranties</h2>
          <p>
            The Site and its content are provided &ldquo;as is,&rdquo; without warranties of any kind,
            express or implied, to the fullest extent permitted by law.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Archuleta Entertainment will not be liable for any
            indirect, incidental, or consequential damages arising from your use of the Site or any
            product purchased through it. Our total liability for any claim will not exceed the amount
            you paid us in the twelve months before the claim arose.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold Archuleta Entertainment harmless from any claim arising from
            your misuse of the Site or violation of these Terms.
          </p>

          <h2>10. Governing law</h2>
          <p>
            These Terms are governed by the laws of the State of Arizona, without regard to
            conflict-of-law principles. Any dispute will be resolved in the state or federal courts
            located in Arizona, and you consent to that jurisdiction.
          </p>

          <h2>11. Changes to these terms</h2>
          <p>
            We may update these Terms from time to time; continued use of the Site after a change means
            you accept the updated Terms.
          </p>

          <h2>12. Contact us</h2>
          <p>Questions about these Terms? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
