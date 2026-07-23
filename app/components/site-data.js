// Central place for the handful of external links the site reuses.
// When Jen's Kit *form ID* arrives (Phase 2), wire KitForm.js; this
// URL is the existing hosted free-chapter landing page and stays valid.
export const KIT_FREE_CHAPTER_URL = 'https://jennifer-archuleta.kit.com/ea44cdb33a';

// Kit (ConvertKit) INLINE form uid — the embeddable email-capture form.
export const KIT_FORM_UID = 'ab5cfa4752';

export const SOCIALS = {
  instagram: 'https://www.instagram.com/jenniferwalcott/',
  x: 'https://x.com/Jenniferwalcott',
  foreverAngels: 'https://www.theforeverangels.com',
};

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
export const SHOP = {
  etsyTee: 'https://www.etsy.com/listing/4320791333/be-the-bumblebee-fly-away-t-shirt',
  foreverAngels: 'https://theforeverangels.com',

  signedBook: 'https://buy.stripe.com/00w6oG1zZd1f6aTbjYds404',
  signedBookPrice: '$35',
  signedBookLeadTime: 'Signed by hand, one at a time — please allow 2–3 weeks.',

  bookmark: '',
  bookmarkWaitlist: '',
  bookmarkPrice: '$24.99',

  // VELVET CIRCLE MEMBERSHIP — not yet live on the site. Kit product is
  // ready at https://jennifer-archuleta.kit.com/products/velvet-circle-membership
  // — paste that URL into `velvetCircleMembership` below to launch it.
  velvetCircleMembership: '',
  velvetCircleMembershipPrice: '$19/mo',

  // FOUNDING BOX (Season 1) — not yet live on the site. Kit product is
  // ready at https://jennifer-archuleta.kit.com/products/founding-box-season-1
  // — paste that URL into `foundingBox` below to launch it.
  foundingBox: '',
  foundingBoxPrice: '$59',
};

// Podcast (Buzzsprout). The numeric podcast ID powers the official
// all-episodes player; until confirmed we embed the hosted site.
export const PODCAST = {
  name: 'Unfiltered with Jen Archuleta',
  buzzsproutSite: 'https://unfilteredwithjenarchuleta.buzzsprout.com',
  // Numeric show id (powers the native large player) — sourced from the show.
  buzzsproutId: '2467154',
  subscribe: {
    spotify: 'https://open.spotify.com/show/2HmclW6k1CEjTJmp0wpy7Z',
    apple: 'https://podcasts.apple.com/podcast/id1806868424',
    youtube: 'https://www.youtube.com/channel/UCAcb9IhD-4BgqoZ5ycBNdBw',
  },
};
