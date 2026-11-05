import '../legal-pages.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { SHOP, STRIPE_CUSTOMER_PORTAL_URL } from '../components/site-data';

export const metadata = {
  title: 'Shipping & Returns',
  description: 'Shipping timelines, returns, and membership cancellation terms for jenarchuleta.com orders.',
};

const EFFECTIVE_DATE = 'July 23, 2026';
// Shipping costs, ship times, and how members send questions spelled out (Nov 3).
const UPDATED_DATE = 'November 5, 2026';
const CONTACT_EMAIL = 'therealunfilteredpod@gmail.com';

export default function ShippingReturnsPage() {
  return (
    <div className="legal-page">
      {/* LEGAL-07: skip link first in tab order, target is a real <main> landmark. */}
      <a href="#main-content" className="skip-link">Skip to content</a>

      <SiteNav />

      <main id="main-content" tabIndex={-1} className="wrap text-wrap">
        <article>
        <div className="legal-head">
          <div className="eyebrow">Legal</div>
          <h1>Shipping &amp; Returns</h1>
          <p className="legal-updated">Effective {EFFECTIVE_DATE}. Updated {UPDATED_DATE}.</p>
        </div>

        <div className="legal-body">
          <h2>Signed copies of the book</h2>
          <p>
            Each signed copy is personalized and signed by hand by Jen, one at a time. A signed copy
            is {SHOP.signedBookPrice} plus {SHOP.signedBookShipping} shipping, {SHOP.signedBookTotal} total.
            Signed and shipped by regular mail. Orders currently ship within the
            United States only.
            Because each book is personalized to your order, we&rsquo;re unable to accept returns for a
            change of mind, but if your book arrives damaged or defective, contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with a photo, and we&rsquo;ll make it
            right with a replacement or refund.
          </p>

          <h2>The Signature Velvet Bookmark</h2>
          <p>
            About 6 inches long. Handmade from black velvet with a gold key charm and a durable, flexible wax-style seal that won’t crack. Packaged in a padded gift case and shipped by regular mail. The{' '}
            {SHOP.bookmarkPrice} price includes shipping, and we ship to US addresses only.
            If your bookmark arrives damaged or defective, the same policy above applies. Because these are handmade,
            one-of-a-kind pieces, all other sales are final.
          </p>

          <h2>The Bundle</h2>
          <p>
            The Bundle is {SHOP.bundlePrice}. It is a signed copy of the book, the Signature Velvet Bookmark,
            and bunny ears, shipped by regular mail.
          </p>

          <h2>The Velvet Circle Book Club</h2>
          <p>
            The Velvet Circle Book Club is {SHOP.velvetCircleMembershipPrice} until you cancel.
            Members get the full discussion sheet, up to three questions a month answered by Jen,
            and a monthly group Zoom once 13 members join.
            Email questions to{' '}
            <a href={`mailto:${SHOP.velvetCircleQuestionsEmail}`}>{SHOP.velvetCircleQuestionsEmail}</a>.
            You can cancel anytime before your next billing date to avoid being charged for
            the following month; charges already processed for the current billing period are
            non-refundable. Your membership stays active through the end of the billing period
            you&rsquo;ve already paid for. We don&rsquo;t offer refunds for time already used, but
            you&rsquo;ll never be charged again after you cancel. You can manage or cancel your
            membership anytime through the link in your subscription receipt email
            {STRIPE_CUSTOMER_PORTAL_URL ? (
              <>
                , or by visiting our member portal directly{' '}
                <a href={STRIPE_CUSTOMER_PORTAL_URL} target="_blank" rel="noopener">here</a>.
              </>
            ) : (
              '.'
            )}
          </p>

          <h2>Questions about your order</h2>
          <p>
            Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your order confirmation
            and we&rsquo;ll help sort it out.
          </p>
        </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
