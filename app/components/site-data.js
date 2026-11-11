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
  x: 'https://x.com/jenniferwalcott',
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
  alt: 'Jen Archuleta smiling in a floral top',
};

// Live Stripe Customer Portal login link. Capital I after wO3.
// The lookalike with a lowercase L in that spot returns 404.
export const STRIPE_CUSTOMER_PORTAL_URL = 'https://billing.stripe.com/p/login/14A8wO3I70et2YHco2ds400';

// The Shop. Apparel lives on Jen's Etsy; the charity is The Forever Angels.
//
// SIGNED BOOKS — live. Sold via a Stripe Payment Link (lowest fees, collects
// shipping address + a "Who should Jen sign it to?" field).
//
// BOOKMARK — three states, checked in this order by the shop (app/book/BookOffers.js):
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

// Every other place to buy the book, grouped by format (Nov 2026) so the
// choices are easy to follow. "Get the Paperback" (BOOK_BUY_URL) stays the main
// button; the signed copy row comes from SHOP below. Shown by BuyOptions.js on
// the homepage and the Book page.
// Every store below was opened and confirmed to be this book (Nov 5, 2026).
// Left off on purpose: the Google Play ebook (its public description still
// shows setup instructions; fix that in Play Books Partner Center first) and
// the older July Nook ebook edition.
export const BOOK_FORMATS = [
  {
    format: 'Paperback',
    links: [
      { label: 'Amazon', href: 'https://www.amazon.com/dp/B0H6YZWDT3' },
      { label: 'Barnes & Noble', href: 'https://www.barnesandnoble.com/w/beyond-the-velvet-ropes-jennifer-walcott-archuleta/1150495088?ean=9798182506885' },
    ],
  },
  {
    format: 'Ebook',
    links: [
      { label: 'Kindle', href: 'https://www.amazon.com/dp/B0H6YK1KTL' },
      { label: 'Apple Books', href: 'https://books.apple.com/us/book/beyond-the-velvet-ropes/id6827586731' },
      { label: 'Kobo', href: 'https://www.kobo.com/us/en/ebook/beyond-the-velvet-ropes-1' },
      { label: 'Bookshop.org', href: 'https://bookshop.org/p/books/beyond-the-velvet-ropes-jennifer-walcott-archuleta/c2771ee0fe66b8c8?ean=9798237615234' },
      { label: 'Everand', href: 'https://www.everand.com/book/1090960388/Beyond-the-Velvet-Ropes' },
    ],
  },
  {
    format: 'Audiobook',
    links: [
      { label: 'Audible', href: 'https://www.audible.com/pd/Beyond-the-Velvet-Ropes-My-Story-of-Perseverance-Hope-and-Love-Audiobook/B0HP8SPHGT' },
      { label: 'Apple Books', href: 'https://books.apple.com/us/audiobook/beyond-the-velvet-ropes-my-story-of-perseverance/id6789345549' },
      { label: 'Spotify', href: 'https://open.spotify.com/show/153EBrZVIkJY1xaY703km4' },
      { label: 'Google Play', href: 'https://play.google.com/store/audiobooks/details?id=AQAAAEB6kybTTM' },
      { label: 'Kobo', href: 'https://www.kobo.com/us/en/audiobook/beyond-the-velvet-ropes' },
      { label: 'Libro.fm', href: 'https://libro.fm/audiobooks/9780466913731-beyond-the-velvet-ropes' },
      { label: 'Audiobooks.com', href: 'https://www.audiobooks.com/audiobook/beyond-the-velvet-ropes-my-story-of-perseverance-hope-and-love/1088666' },
      { label: 'Chirp', href: 'https://www.chirpbooks.com/audiobooks/beyond-the-velvet-ropes-by-jennifer-walcott-archuleta' },
      { label: 'Barnes & Noble', href: 'https://www.barnesandnoble.com/w/beyond-the-velvet-ropes-jennifer-walcott-archuleta/1150495088?ean=2940201495183' },
      { label: 'Everand', href: 'https://www.everand.com/audiobook/1060379158/Beyond-the-Velvet-Ropes-My-Story-of-Perseverance-Hope-and-Love' },
    ],
  },
  {
    format: 'Library',
    links: [
      { label: 'Hoopla', href: 'https://www.hoopladigital.com/audiobook/beyond-the-velvet-ropes-jennifer-walcott-archuleta/20045190' },
    ],
  },
];

// Buy in your country (each link opened and confirmed Nov 5, 2026).
const AMZ = (tld) => `https://www.amazon.${tld}/dp/B0H6YZWDT3`;
const KDL = (tld) => `https://www.amazon.${tld}/dp/B0H6YK1KTL`;
const AUD = 'Beyond-the-Velvet-Ropes-My-Story-of-Perseverance-Hope-and-Love';
export const BOOK_WORLDWIDE = [
  { country: 'United Kingdom', links: [['Paperback', AMZ('co.uk')], ['Kindle', KDL('co.uk')], ['Audible', `https://www.audible.co.uk/pd/${AUD}-Audiobook/B0HP8K4FYJ`]] },
  { country: 'Canada', links: [['Paperback', AMZ('ca')], ['Kindle', KDL('ca')], ['Audible', `https://www.audible.ca/pd/${AUD}-Audiobook/B0HP8P2T8H`]] },
  { country: 'Australia', links: [['Paperback', AMZ('com.au')], ['Kindle', KDL('com.au')], ['Audible', `https://www.audible.com.au/pd/${AUD}-Audiobook/B0HP8TTKNK`], ['Booktopia audiobook', 'https://www.booktopia.com.au/beyond-the-velvet-ropes-jennifer-walcott-archuleta/audiobook/9780466913731.html']] },
  { country: 'Germany', links: [['Paperback', AMZ('de')], ['Kindle', KDL('de')], ['Audible', `https://www.audible.de/pd/${AUD}-Hoerbuch/B0HP8RBKSS`]] },
  { country: 'France', links: [['Paperback', AMZ('fr')], ['Kindle', KDL('fr')], ['Audible', `https://www.audible.fr/pd/${AUD}-Livre-Audio/B0HP8S4R23`]] },
  { country: 'Spain', links: [['Paperback', AMZ('es')], ['Kindle', KDL('es')], ['Audible', `https://www.audible.es/pd/${AUD}-Audiolibro/B0HP8Q9YW3`]] },
  { country: 'Italy', links: [['Paperback', AMZ('it')], ['Kindle', KDL('it')]] },
  { country: 'Netherlands', links: [['Paperback', AMZ('nl')], ['Kindle', KDL('nl')]] },
  { country: 'Japan', links: [['Paperback', AMZ('co.jp')], ['Kindle', KDL('co.jp')], ['Audible', 'https://www.audible.co.jp/pd/B0HP8Y4RDB']] },
  { country: 'India', links: [['Kindle', KDL('in')], ['Audible', `https://www.audible.in/pd/${AUD}-Audiobook/B0HP8ZWV1Z`]] },
  { country: 'Mexico', links: [['Paperback', AMZ('com.mx')], ['Kindle', KDL('com.mx')]] },
  { country: 'Brazil', links: [['Paperback', AMZ('com.br')], ['Kindle', KDL('com.br')]] },
  { country: 'Singapore', links: [['Paperback', AMZ('sg')], ['Storytel audiobook', 'https://www.storytel.com/sg/books/beyond-the-velvet-ropes-my-story-of-perseverance-hope-and-love-14763861']] },
  { country: 'Sweden', links: [['Paperback', AMZ('se')], ['Nextory audiobook', 'https://nextory.com/se/book/beyond-the-velvet-ropes-my-story-of-perseverance-hope-and-love-6924607']] },
  { country: 'Poland', links: [['Paperback', AMZ('pl')]] },
];

// Reader reviews shown next to the buy buttons (homepage and Book page).
// REAL reviews only, chosen by Jen, quoted word for word with the reader's
// OK. Two or three short ones. Nothing shows while this list is empty.
// Example: { quote: 'Short line from the review.', source: 'Amazon review' }
export const READER_REVIEWS = [];

export const SHOP = {
  // Jen's corrected listing (Oct 28).
  etsyTee: 'https://www.etsy.com/listing/4321696666/be-the-bumblebee-unisex-classic-tee',
  // The UnfilteredByJen shop. The site had only the Be the Bumblebee listing.
  etsyShop: 'https://www.etsy.com/shop/UnfilteredByJen',
  foreverAngels: 'https://theforeverangels.com/',

  // SIGNED COPY. The Shop leads with the TOTAL (Adam, Nov 3): $35 book + $6.99
  // shipping = $41.99. These must match the Stripe Payment Link, and Make.com
  // routes signed-copy sales on the Stripe total (4199), so a price or shipping
  // change in Stripe needs the Make route and these three lines changed too.
  signedBook: 'https://buy.stripe.com/3cI5kC0vVf9n1UDewads405',
  signedBookPrice: '$35',
  signedBookShipping: '$6.99',
  signedBookTotal: '$41.99',
  // Jen, Nov 10: exactly "Shipped via USPS." No day or week count, no packaging.
  signedBookLeadTime: 'Shipped via USPS.',

  // SOLD OUT SWITCH — flip to false to put signed copies back on sale.
  // NOTE: `signedBook` above is deliberately left populated. The printed
  // Barnes & Noble poster QR (Aug 23 Youngstown signing) points straight at
  // that Stripe link, so it must stay alive even while the site says sold out.
  signedBookSoldOut: false,
  signedBookSoldOutNote: 'Sold out for now. I sign these by hand, a few at a time. The next batch is coming soon.',

  bookmark: 'https://buy.stripe.com/4gM4gyfqP1ixbvdewads407',
  bookmarkWaitlist: '',
  bookmarkPrice: '$24.99',
  // Shipping is included in the $24.99 (Sept 4 decision); Stripe takes US
  // addresses only.
  bookmarkShipping: 'Free shipping, US only',
  // The Shop card and Shipping & Returns use Jen's exact bookmark paragraph
  // (about 6 inches, made by hand by Jen, gold key charm, wax-style seal,
  // "Shipped via USPS.", Jen, Nov 10; no packaging materials). Leave these blank. Do not add a day-count such as "1 to 2 business
  // days", and do not describe a choker or say the bookmark folds.
  bookmarkSize: '',
  bookmarkPackaging: '',
  bookmarkShips: '',

  // VELVET CIRCLE. One membership, this $9.99/month Payment Link.
  // Do not create a second Stripe product or a second price.
  // Self-service cancel uses STRIPE_CUSTOMER_PORTAL_URL.
  velvetCircleMembership: 'https://buy.stripe.com/6oU3cuemL2mB1UD73Ids406',
  velvetCircleMembershipPrice: '$9.99/month',
  // Members email up to three questions a month here. Jen answers them promptly
  // and in detail every month.
  velvetCircleQuestionsEmail: 'therealunfilteredpod@gmail.com',

  // The Bundle, $69. Empty = the card shows "Coming soon" (Adam, Nov 5, 2026).
  // It was pointing at a Kit checkout, which can't collect a shipping address.
  // Paste a one-time $69 Stripe Payment Link here (shipping address ON).
  // Never a Kit checkout URL. Old #backstage-bundle anchors land on this card.
  bundle: '',
  bundlePrice: '$69',

  // Jen's eBay store (jenniferwalcottarchive). One small text link at the
  // bottom of the shop, nothing more (Jen, Nov 10, 2026).
  ebayWardrobe: 'https://ebay.io/m/FSMA6i',

  // Jen's LTK and Amazon storefronts, two small text links beside eBay
  // (Adam, Nov 10, 2026). The Amazon link is the clean storefront address:
  // the shared a.co link carried someone else's affiliate tag (jphhomes-20).
  ltk: 'https://www.shopltk.com/explore/jenwalcottarchuleta',
  amazonStorefront: 'https://www.amazon.com/shop/jenniferwalcott',

  // Podcast collections (Jen, Nov 11, 2026): each tied to an episode, with
  // Jen's own words, word for word. Items link to Etsy (UnfilteredByJen);
  // an item with `signed` also gets a signed option Jen ships herself
  // (Stripe Payment Link, shipping included, US only, Velvet Letters gift
  // card). Bumblebee has no signed prices yet, so Etsy only.
  collections: [
    {
      id: 'bumblebee',
      title: 'Be the Bumblebee',
      episode: 'Episode 10 with Nick Lowery',
      episodeUrl: 'https://www.youtube.com/watch?v=ZgfIKWnmnhA',
      story: 'They say a bumblebee’s wings are too small for its body, and by the numbers it should never fly. Nobody told the bee. Nick Lowery got cut 11 times. Eleven times someone looked at him and decided he wasn’t enough. He kept showing up anyway, and he became the Kansas City Chiefs’ all-time leading scorer. I chose Nick for this collection because he is the bumblebee. The world ran the numbers on him, and he flew anyway.',
      items: [
        { id: 'bee-unisex-tee', name: 'Unisex tee', image: '/assets/apparel/bee-unisex-tee.jpg', etsy: 'https://www.etsy.com/listing/4321696666' },
        { id: 'bee-womens-tee', name: 'Women’s tee', image: '/assets/apparel/bee-womens-tee.jpg', etsy: 'https://www.etsy.com/listing/4321690469' },
        { id: 'bee-hoodie', name: 'Hoodie', image: '/assets/apparel/bee-hoodie.jpg', etsy: 'https://www.etsy.com/listing/4320793739' },
        { id: 'bee-fly-away-hoodie', name: 'Fly Away hoodie', image: '/assets/apparel/bee-fly-away-hoodie.jpg', etsy: 'https://www.etsy.com/listing/4320791333' },
        { id: 'bee-hat', name: 'Hat', image: '/assets/apparel/bee-hat.jpg', etsy: 'https://www.etsy.com/listing/4320791993' },
      ],
    },
    {
      id: 'flawed-and-fierce',
      title: 'Flawed & Fierce',
      episode: 'Episode 5 with Amy Palmiero-Winters',
      episodeUrl: 'https://www.youtube.com/watch?v=xpVgDQpPUjU',
      story: 'Amy lost her leg in a motorcycle accident. Most people would have called that the end of the story. Amy called it the start. On a prosthetic, she set 11 world records and was the first to finish some of the hardest races on earth. She isn’t fierce in spite of what broke. She’s fierce because of what she rebuilt. I chose Amy for this collection because she is living proof of what this heart means: you’re not broken, you’re rebuilt.',
      items: [
        {
          id: 'ff-hoodie',
          name: 'Navy hoodie',
          detail: '“You’re not broken. You’re becoming.” on the back. Sizes S to 3X.',
          image: '/assets/apparel/ff-hoodie.jpg',
          etsy: 'https://www.etsy.com/listing/4614607497',
          signed: 'https://buy.stripe.com/8x24gy92r6CR56P4VAds40d',
          signedPrice: '$89.95',
        },
        {
          id: 'ff-hat',
          name: 'Navy dad hat',
          detail: 'Embroidered heart. One size.',
          image: '/assets/apparel/ff-hat.jpg',
          etsy: 'https://www.etsy.com/listing/4614638186',
          signed: 'https://buy.stripe.com/dRm7sKdiHf9n2YHfAeds40e',
          signedPrice: '$59.95',
        },
      ],
    },
  ],

  // "Unfiltered, featuring Beyond the Velvet Ropes Apparel" (Jen, Nov 10, 2026).
  // Each item: an Etsy listing (UnfilteredByJen) and a signed option that Jen
  // ships herself, shipping included, US only, with a Velvet Letters gift card.
  // signed = live Stripe Payment Link (Velvet Ropes account, created Nov 10).
  // A price change needs the Stripe price changed too, and Make.com routes.
  apparel: [
    {
      id: 'apparel-sweatshirt',
      name: 'Sweatshirt',
      detail: 'Black crewneck with the signature book cover. Sizes S to 3X.',
      image: '/assets/apparel/btvr-sweatshirt.jpg',
      etsy: 'https://www.etsy.com/listing/4614470762',
      signed: 'https://buy.stripe.com/4gM3cu6Uj3qFczh2Nsds408',
      signedPrice: '$89.95',
    },
    {
      id: 'apparel-unisex-tee',
      name: 'Unisex tee',
      detail: 'Black tee with the signature book cover. Sizes S to 3X.',
      image: '/assets/apparel/btvr-unisex-tee.jpg',
      etsy: 'https://www.etsy.com/listing/4614457539',
      signed: 'https://buy.stripe.com/7sY3cuguTbXb2YH1Jods409',
      signedPrice: '$64.95',
    },
    {
      id: 'apparel-womens-tee',
      name: 'Women’s tee',
      detail: 'Black relaxed tee with the signature book cover. Women’s sizes S to 3X.',
      image: '/assets/apparel/btvr-womens-tee.jpg',
      etsy: 'https://www.etsy.com/listing/4614457935',
      signed: 'https://buy.stripe.com/00w5kCemL4uJ8j1gEids40a',
      signedPrice: '$67.95',
    },
    {
      id: 'apparel-hat',
      name: 'Hat',
      detail: 'Black dad hat, embroidered in gold. One size.',
      image: '/assets/apparel/btvr-dad-hat.jpg',
      etsy: 'https://www.etsy.com/listing/4614514983',
      signed: 'https://buy.stripe.com/00w14m6Uj5yN7eX0Fkds40b',
      signedPrice: '$59.95',
    },
    {
      id: 'apparel-trucker-hat',
      name: 'Trucker hat',
      detail: 'Black snapback trucker hat, embroidered in gold. One size.',
      image: '/assets/apparel/btvr-trucker-hat.jpg',
      etsy: 'https://www.etsy.com/listing/4614576882',
      signed: 'https://buy.stripe.com/4gMeVcbaz9P30Qz9bQds40c',
      signedPrice: '$57.95',
    },
  ],
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
  // The channel's "Unfiltered with Jen Archuleta | Full Episodes" playlist:
  // all 13 episodes, Ep. 1 first (checked November 2, 2026). The Podcast page
  // embeds it beside the Buzzsprout player; "Watch on YouTube" opens it.
  youtubeEpisodes: 'https://www.youtube.com/playlist?list=PLQqx8LCwrxbY',
  youtubeEmbed: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLQqx8LCwrxbY',
  subscribe: {
    spotify: 'https://open.spotify.com/show/2HmclW6k1CEjTJmp0wpy7Z',
    apple: 'https://podcasts.apple.com/podcast/id1806868424',
    youtube: 'https://www.youtube.com/@jenarchuletaunfiltered',
  },
};

// Social accounts, in Jen's order. YouTube is the podcast channel.
// Buzzsprout sits beside it. The newsletter form is only on /thank-you#stay.
export const CONNECT_LINKS = [
  { label: 'LinkedIn', href: SOCIALS.linkedin },
  { label: 'X', href: SOCIALS.x },
  { label: 'TikTok', href: SOCIALS.tiktok },
  { label: 'Instagram', href: SOCIALS.instagram },
  { label: 'Facebook', href: SOCIALS.facebook },
  { label: 'YouTube', href: PODCAST.youtube },
  { label: 'Buzzsprout', href: PODCAST.buzzsproutSite },
];
