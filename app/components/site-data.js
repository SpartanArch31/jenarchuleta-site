// Central place for the handful of external links the site reuses.
// When Jen's Kit *form ID* arrives (Phase 2), wire KitForm.js; this
// URL is the existing hosted free-chapter landing page and stays valid.
export const KIT_FREE_CHAPTER_URL = 'https://jennifer-archuleta.kit.com/ea44cdb33a';

// Kit (ConvertKit) INLINE form uid — the embeddable email-capture form.
export const KIT_FORM_UID = 'ab5cfa4752';

// Press, interviews, speaking, podcast guests, and the contact page.
export const BOOKING_EMAIL = 'therealunfilteredpod@gmail.com';

export const SOCIALS = {
  instagram: 'https://www.instagram.com/jenniferwalcott/',
  x: 'https://x.com/Jenniferwalcott',
  facebook: 'https://facebook.com/therealjenniferwalcott',
  linkedin: 'https://www.linkedin.com/in/jennifer-archuleta-633805115',
  tiktok: 'https://www.tiktok.com/@jenarchuleta578',
  foreverAngels: 'https://theforeverangels.com/',
};

// Site-wide social share image (open graph and Twitter). Wide floral frame.
export const OG_IMAGE = {
  url: 'https://jenarchuleta.com/assets/og-floral-1200x630.jpg',
  width: 1200,
  height: 630,
  alt: 'Jen Walcott Archuleta',
};

// Live Stripe Customer Portal login link. Capital I after wO3.
// The lookalike with a lowercase L in that spot returns 404.
export const STRIPE_CUSTOMER_PORTAL_URL = 'https://billing.stripe.com/p/login/14A8wO3I70et2YHco2ds400';

// The Shop. Apparel lives on Jen's Etsy; the charity is The Forever Angels.
//
// SIGNED BOOKS — live. Sold via a Stripe Payment Link (lowest fees, collects
// shipping address + a "Who should Jen sign it to?" field).
//
// BOOKMARK — three states, checked in this order by app/shop/page.js:
//   1. `bookmark` has a buy.stripe.com URL  → live "Buy" button.
//      Only set this when a finished batch exists. Create the Payment Link in
//      Stripe (Products → Signature Velvet Bookmark → Payment Link, enable
//      "Collect shipping address" AND "Limit the number of payments" = the
//      batch size, so it can never oversell) and paste the URL here.
//   2. else `bookmarkWaitlist` has a Kit landing-page URL → "Join the
//      first-drop list" button. Create the landing page in Kit (Grow →
//      Landing Pages & Forms) with the tag "Bookmark Waitlist" and paste
//      its URL here.
//   3. else both empty → the card shows a quiet "Coming soon" state with no
//      dead links.
//
// Prices and the fulfillment promise live here too, so copy changes never
// require touching page code.
// Paperback purchase page. books.by sends readers to the live BookSpace listing.
export const BOOK_BUY_URL = 'https://books.by/beyond-the-velvet-ropes';

// Product pages only. Search pages and stores without a confirmed listing stay off.
// Confirmed product pages only. Google Play, Audible, Bookshop, and an Apple
// Books ebook do not have a confirmed page, so they stay off this list.
export const BOOK_STORES = [
  { label: 'Also on Amazon', href: 'https://www.amazon.com/dp/B0H6YZWDT3' },
  { label: 'Kindle (Amazon)', href: 'https://www.amazon.com/dp/B0H6YK1KTL' },
  { label: 'Barnes & Noble', href: 'https://www.barnesandnoble.com/w/beyond-the-velvet-ropes-jennifer-walcott-archuleta/1150495088?ean=9798182506885' },
  { label: 'Audiobook (Spotify)', href: 'https://open.spotify.com/show/153EBrZVIkJY1xaY703km4' },
  { label: 'Audiobook (Apple)', href: 'https://books.apple.com/us/audiobook/beyond-the-velvet-ropes-my-story-of-perseverance/id6789345549?uo=4' },
  { label: 'Audiobook (Kobo)', href: 'https://www.kobo.com/us/en/audiobook/beyond-the-velvet-ropes' },
  { label: 'Audiobook (Audiobooks.com)', href: 'https://www.audiobooks.com/audiobook/beyond-the-velvet-ropes-my-story-of-perseverance-hope-and-love/1088666' },
  { label: 'Audiobook (Chirp)', href: 'https://www.chirpbooks.com/audiobooks/beyond-the-velvet-ropes-by-jennifer-walcott-archuleta' },
];

export const SHOP = {
  etsyTee: 'https://www.etsy.com/listing/4320791333/be-the-bumblebee-fly-away-t-shirt',
  foreverAngels: 'https://theforeverangels.com/',

  signedBook: 'https://buy.stripe.com/3cI5kC0vVf9n1UDewads405',
  signedBookPrice: '$35',
  signedBookLeadTime: 'Signed by hand, one at a time. Please allow 2–3 weeks.',

  // SOLD OUT SWITCH — flip to false to put signed copies back on sale.
  // NOTE: `signedBook` above is deliberately left populated. The printed
  // Barnes & Noble poster QR (Aug 23 Youngstown signing) points straight at
  // that Stripe link, so it must stay alive even while the site says sold out.
  signedBookSoldOut: false,
  signedBookSoldOutNote: 'Sold out for now. I sign these by hand, a few at a time. The next batch is coming soon.',

  bookmark: 'https://buy.stripe.com/4gM4gyfqP1ixbvdewads407',
  bookmarkWaitlist: '',
  bookmarkPrice: '$24.99',

  // VELVET CIRCLE MEMBERSHIP. LIVE as of 2026-08-19. Recurring Stripe Payment
  // Link, $9.99/mo. Self-service cancel uses STRIPE_CUSTOMER_PORTAL_URL.
  // That portal is what keeps this FTC click-to-cancel / ROSCA compliant.
  // Do not take the membership live through any checkout that lacks that portal.
  velvetCircleMembership: 'https://buy.stripe.com/6oU3cuemL2mB1UD73Ids406',
  velvetCircleMembershipPrice: '$9.99/month',

  // THE BACKSTAGE BOX. No $69 Stripe Payment Link exists in this repo or its
  // history. The old checkout was a Kit product URL, which cannot collect a
  // shipping address, so it stays empty. Empty renders a Coming soon button
  // that does not go to checkout.
  foundingBox: '',
  foundingBoxPrice: '$69',
};

// Podcast (Buzzsprout). The numeric podcast ID powers the official
// all-episodes player; until confirmed we embed the hosted site.
// TODO: confirm with Jen which Spotify show ID is the podcast and which is the audiobook.
// Podcast subscribe button: 2HmclW6k1CEjTJmp0wpy7Z
// Audiobook buy-row on the homepage and /book: 153EBrZVIkJY1xaY703km4
// Do not swap these until Jen confirms.
export const PODCAST = {
  name: 'Unfiltered with Jen Archuleta',
  buzzsproutSite: 'https://unfilteredwithjenarchuleta.buzzsprout.com',
  // Public show page (nav, footer, media, contact).
  buzzsprout: 'https://www.buzzsprout.com/2467154',
  // Numeric show id (powers the native large player). Sourced from the show.
  buzzsproutId: '2467154',
  youtube: 'https://www.youtube.com/@jenarchuletaunfiltered',
  subscribe: {
    spotify: 'https://open.spotify.com/show/2HmclW6k1CEjTJmp0wpy7Z',
    apple: 'https://podcasts.apple.com/podcast/id1806868424',
    youtube: 'https://www.youtube.com/@jenarchuletaunfiltered',
  },
};
