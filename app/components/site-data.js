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
// SIGNED BOOKS: recommended path is a Stripe Payment Link (lowest fees, stays
// on-brand, and can collect the shipping address + a "Personalize to" field).
// To turn it on: Stripe → Products → add "Signed copy — Beyond the Velvet
// Ropes" → create a Payment Link (enable "Collect shipping address" + a custom
// field "Who should Jen sign it to?") → paste the buy.stripe.com URL below.
// While signedBook is empty, the shop shows a "coming soon" card instead of a
// broken button.
export const SHOP = {
  etsyTee: 'https://www.etsy.com/listing/4320791333/be-the-bumblebee-fly-away-t-shirt',
  foreverAngels: 'https://theforeverangels.com',
  signedBook: 'https://buy.stripe.com/4gMaEW0vVaT70Qz9bQds402',
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
