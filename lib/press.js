// Press, appearances, and the film/documentary facts.
// The film and documentary news has ONE home on the site: the Media page
// (#film). Every other page links there instead of repeating it (Jen,
// November 3).
//
// FILM / DOCUMENTARY: both are IN DEVELOPMENT. Never write "released",
// "acquired", "optioned", or "coming to theaters". Keep this wording.

export const FILM = {
  // Jen, Nov 6: the Austin recognition stays here, never called an award.
  film:
    'Beyond the Velvet Ropes is being developed as a feature film with Leone Marucci and Steelyard Pictures. The screenplay advanced to the Second Round of the 2026 Austin Film Festival Script Competition.',
  // Jen, Nov 6 email (her final word): title, "Coming Soon", and her
  // one-line status with Crash Cat Media Group linked. Still in development.
  documentaryTitle: 'Beyond the Velvet Ropes: The Story of Jennifer Walcott Archuleta',
  documentaryStatus: 'Coming Soon',
  documentary: 'Currently in development with',
  documentaryPartner: { label: 'Crash Cat Media Group', href: 'https://www.crashcatmedia.com/' },
  documentaryPoster: {
    // Jen's Nov 9 artwork (the attached file, 640x360). Swap in the full-size
    // file when she sends it; keep the same name and update width/height.
    src: '/assets/documentary-concept-art.jpg',
    width: 640,
    height: 360,
    alt: 'Concept artwork for Beyond the Velvet Ropes: The Story of Jennifer Walcott Archuleta, with Jen reflected in a car mirror, a childhood photo, and a red carpet toward the Hollywood sign',
    note: 'Promotional concept artwork created to preview the documentary. This is not the official film poster. Final artwork and production details are subject to change.',
  },
  documentarySite: 'https://www.crashcatmedia.com/',
  partners: [
    { label: 'Steelyard Pictures', href: 'https://www.steelyardpictures.com/bio' },
    { label: 'Crash Cat Media Group', href: 'https://www.crashcatmedia.com/' },
  ],
  // Jen's FilmFreeway page, shown right with Leone and Mark (Jen, November 3).
  filmfreeway: { label: 'filmfreeway.com/JenniferArchuleta', href: 'https://filmfreeway.com/JenniferArchuleta' },
};

export const PRESS = [
  {
    outlet: 'Tribune Chronicle',
    headline: 'Area native offers peek behind the Velvet Rope',
    byline: 'Andy Gray',
    date: 'Aug 20, 2026',
    href: 'https://www.tribtoday.com/life/ticket/2026/08/area-native-offers-peak-behind-the-velvet-rope/',
  },
  {
    outlet: 'The Business Journal Daily',
    headline: 'Youngstown Native Jennifer Walcott Archuleta Returns Home for Book Signing',
    date: 'Aug 18, 2026',
    href: 'https://businessjournaldaily.com/youngstown-native-jennifer-walcott-archuleta-returns-home-for-book-signing/',
  },
  {
    outlet: 'Mahoning Matters',
    headline: 'Youngstown native Jen Archuleta releases book focusing on overcoming challenges',
    byline: 'Kelcey Norris',
    date: 'Aug 13, 2026',
    href: 'https://www.mahoningmatters.com/news/local/article316760975.html',
  },
  {
    // Jen, Nov 6: Barbara McIntyre's Book Talk column features the memoir.
    outlet: 'Akron Beacon Journal',
    headline: 'Book Talk: new releases from Ohio natives, including Beyond the Velvet Ropes',
    byline: 'Barbara McIntyre',
    date: 'Aug 23, 2026',
    href: 'https://www.beaconjournal.com/story/entertainment/books/2026/08/23/cleveland-author-vivien-chien-releases-and-then-there-were-bun-part-of-noodle-shop-series-book-talk/91354166007/',
  },
  {
    // The outlet's own site has an expired certificate, so this points at
    // its Facebook post of the article.
    outlet: 'Boardman News',
    headline: 'Former Playboy Playmate Will Hold Book Signing Aug. 23 at Barnes & Noble',
    href: 'https://www.facebook.com/boardmannews/posts/former-playboy-playmate-will-hold-book-signing-aug-23-at-barnes-nobleaug-6-12-20/1703665671629905/',
  },
];

export const APPEARANCES = [
  {
    outlet: 'WKBN 27 First News',
    kind: 'TV',
    headline: 'Former Playboy Bunny holds book signing in Boardman',
    byline: 'Sydney Brown',
    date: 'Aug 23, 2026',
    note: 'Video interview',
    href: 'https://www.wkbn.com/news/local-news/boardman-news/former-playboy-bunny-holds-book-signing-in-boardman/',
    linkLabel: 'Watch the interview',
  },
  {
    outlet: 'The Mr. Sports Show, Star 94.7 FM',
    kind: 'Radio',
    headline: 'Interview on the memoir',
    date: 'Aug 2026',
    href: 'https://riverside.com/shared/exported-clip/1d1e2c38397aa65200f6',
    linkLabel: 'Listen',
  },
  {
    outlet: 'Youngstown Studio',
    kind: 'TikTok',
    headline: 'Youngstown Studio on TikTok',
    href: 'https://www.tiktok.com/@youngstownstudio/video/7675077800914717966',
    linkLabel: 'Watch',
  },
  {
    outlet: 'Unfiltered with Jen Archuleta',
    kind: 'Podcast',
    headline: 'The episode where Adam interviews Jen',
    date: 'May 26, 2026',
    href: 'https://unfilteredwithjenarchuleta.buzzsprout.com/2467154/episodes/19243689-jennifer-archuleta-abuse-the-fbi-sting-beyond-the-velvet-ropes',
    linkLabel: 'Listen',
  },
];

// The three that lead on the homepage.
export const PRESS_HIGHLIGHTS = [PRESS[0], APPEARANCES[0], PRESS[2]];

// News outlets only. Film partners are named in the film section instead.
export const AS_SEEN_IN = [
  'The Vindicator',
  'Tribune Chronicle',
  'Akron Beacon Journal',
  'WKBN 27 First News',
  'The Business Journal Daily',
  'Mahoning Matters',
  'Boardman News',
  'Star 94.7 FM',
];

export function cardMeta(item) {
  return [item.kind, item.byline, item.date, item.note].filter(Boolean).join(' · ');
}
