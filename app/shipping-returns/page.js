import '../legal-pages.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

export const metadata = {
  title: 'Shipping & Returns',
  description: 'Shipping timelines, returns, and membership cancellation terms for jenarchuleta.com orders.',
};

const EFFECTIVE_DATE = 'July 23, 2026';
const CONTACT_EMAIL = 'jen@jenarchuleta.com';
const MEMBER_PORTAL_URL = 'https://billing.stripe.com/p/login/14A8wO3l70et2YHco2ds400';

export default function ShippingReturnsPage() {
  return (
    <div className="legal-page">
      <SiteNav />

      <a href="#main-content" className="skip-link">Skip to content</a>

      <article id="main-content" className="wrap text-wrap">
        <div className="legal-head">
          <div className="eyebrow">Legal</div>
          <h1>Shipping &amp; Returns</h1>
          <p className="legal-updated">Effective {EFFECTIVE_DATE}</p>
        </div>

        <div className="legal-body">
          <h2>Signed copies of the book</h2>
          <p>
            Each signed copy is personalized and signed by hand by Jen, one at a time — please allow
            2&ndash;3 weeks for your order to ship. Orders currently ship within the United States only.
            Because each book is personalized to your order, we&rsquo;re unable to accept returns for a
            change of mind — but if your book arrives damaged or defective, contact us within 14 days at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with a photo, and we&rsquo;ll make it
            right with a replacement or refund.
          </p>

          <h2>The Signature Velvet Bookmark</h2>
          <p>
            Each bookmark is handmade in small batches, and no two are exactly alike. Once a batch is
            available for purchase, the same damaged/defective policy above applies. Because these are
            handmade, one-of-a-kind pieces, all other sales are final.
          </p>

          <h2>Founding Box (Season 1)</h2>
          <p>
            The Founding Box is a one-time purchase. All sales are final except for items that arrive
            damaged or defective — contact us within 14 days for a replacement or refund.
          </p>

          <h2>Velvet Circle Membership</h2>
          <p>
            The Velvet Circle Membership is a recurring monthly subscription billed at $9.99/month until
            you cancel. You can cancel anytime before your next billing date to avoid being charged for
            the following month; charges already processed for the current billing period are
            non-refundable. Your membership stays active through the end of the billing period
            you&rsquo;ve already paid for — we don&rsquo;t offer refunds for time already used, but
            you&rsquo;ll never be charged again after you cancel. You can manage or cancel your
            membership anytime through the link in your subscription receipt email, or by visiting our
            member portal directly{' '}
            <a href={MEMBER_PORTAL_URL} target="_blank" rel="noopener">here</a>.
          </p>

          <h2>Questions about your order</h2>
          <p>
            Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your order confirmation
            and we&rsquo;ll help sort it out.
          </p>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
