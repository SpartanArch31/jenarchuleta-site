// Central place for the handful of external links the site reuses.
// When Jen's Kit *form ID* arrives (Phase 2), wire KitForm.js; this
// URL is the existing hosted free-chapter landing page and stays valid.
export const KIT_FREE_CHAPTER_URL = 'https://jennifer-archuleta.kit.com/ea44cdb33a';

export const SOCIALS = {
  instagram: 'https://www.instagram.com/jenniferwalcott/',
  x: 'https://x.com/Jenniferwalcott',
  foreverAngels: 'https://www.theforeverangels.com',
};

// Podcast (Buzzsprout). The numeric podcast ID powers the official
// all-episodes player; until confirmed we embed the hosted site.
export const PODCAST = {
  name: 'Unfiltered with Jen Archuleta',
  buzzsproutSite: 'https://unfilteredwithjenarchuleta.buzzsprout.com',
  // TODO(Phase 2): set BUZZSPROUT_ID to the numeric show id for the
  // native large player. Subscribe links: confirm/replace.
  buzzsproutId: '',
  subscribe: {
    spotify: '',
    apple: '',
    youtube: '',
  },
};
