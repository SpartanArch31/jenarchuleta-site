// The Shop moved into the Book page (Jen's site notes, November 4, 2026). This
// page only forwards, so every old link still lands in the right place:
//   /shop                      -> /book#shop
//   /shop#signed-copy          -> /book#signed-copy  (also #velvet-circle,
//   /shop#velvet-circle-faq    -> /book#velvet-circle-faq   #bookmark, ...)
// A server redirect can't do this: browsers never send the #part to the server.
// The product cards themselves live in app/components/ShopOffers.js.
export const metadata = {
  title: 'Shop',
  robots: { index: false, follow: true },
  alternates: { canonical: '/book' },
};

const FORWARD = "location.replace('/book' + (location.hash && location.hash.length > 1 ? location.hash : '#shop'));";

export default function ShopForward() {
  return (
    <main className="wrap center" style={{ paddingBlock: '20vh' }}>
      <script dangerouslySetInnerHTML={{ __html: FORWARD }} />
      <p>
        The shop is on the Book page now. <a href="/book#shop">Go to the shop</a>.
      </p>
    </main>
  );
}
