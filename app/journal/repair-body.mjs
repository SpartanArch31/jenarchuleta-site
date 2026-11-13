// Render-time journal fixes. Sanity has no write token, so posts stay as
// published and these repairs run when a post is drawn.
import { fixPublishedCopy } from './published-copy.mjs';

const FOREVER_ANGELS = 'https://theforeverangels.com/';
const WESTON_FORMULA = 'https://www.westonaprice.org/health-topics/formula-homemade-baby-formula/';
const ETSY_SHOP = 'https://www.etsy.com/shop/UnfilteredByJen';
const FLORA_TODDLER_PROBIOTIC = 'https://www.florahealth.com/products/toddlers-probiotic';

const RETIRED_URLS = [
  'http://www.phpure.com/nutrition_products/pdfs/Nutritional_Flakes.pdf',
  'https://www.phpure.com/nutrition_products/pdfs/Nutritional_Flakes.pdf',
  'http://www.udoerasmus.com/products/pdf_files/Probiotics.pdf',
  'https://www.udoerasmus.com/products/pdf_files/Probiotics.pdf',
  'http://www.cocoonnutrition.org/catalog/pdf_docs/Nutritional_Flakes.pdf',
  'https://www.cocoonnutrition.org/catalog/pdf_docs/Nutritional_Flakes.pdf',
  'http://www.tdi-dog.org/HowToJoin.aspx?Page=New+TDI+Test',
  'https://www.tdi-dog.org/HowToJoin.aspx?Page=New+TDI+Test',
];

const RETIRED_SET = new Set(RETIRED_URLS);

export function isRetiredHref(href) {
  const value = href || '';
  if (RETIRED_SET.has(value)) return true;
  if (/tdi-dog\.org/i.test(value)) return true;
  return false;
}

const BARE_URL = /https?:\/\/[A-Za-z0-9\-._~:/?#[\]@!$&'*+,;=%]+/g;
const FOREVER_ANGELS_URL = /(?:https?:\/\/)?(?:www\.)?theforeverangels\.com(?:\/[A-Za-z0-9\-._~:/?#[\]@!$&'*+,;=%]*)?/gi;
const BARE_PODCAST = /(?<![\w@/])((?:www\.)?(?:unfilteredwithjenarchuleta\.buzzsprout\.com|buzzsprout\.com|youtube\.com|youtu\.be|podcasts\.apple\.com)(?:\/[A-Za-z0-9\-._~:/?#[\]@!$&'*+,;=%]*)?)/gi;

const YT = (id) => `https://www.youtube.com/watch?v=${id}`;
const APPLE = (id) => `https://podcasts.apple.com/us/podcast/unfiltered-with-jen-archuleta/id1806868424?i=${id}`;
const BUZZ = (slug) => `https://www.buzzsprout.com/2467154/episodes/${slug}`;

const SHOW = {
  youtube: 'https://www.youtube.com/playlist?list=PLQqx8LCwrxbY',
  buzz: 'https://www.buzzsprout.com/2467154',
  apple: 'https://podcasts.apple.com/us/podcast/unfiltered-with-jen-archuleta/id1806868424',
};

// Full-episode watch URLs are the ones on the channel playlist
// "Unfiltered with Jen Archuleta | Full Episodes".
const EPISODES = {
  1: {
    youtube: YT('V4m6pmYYX64'),
    buzz: BUZZ('16926602-ep-1-adam-archuleta-former-nfl-safety-and-cbs-sports-analyst-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000702405073'),
  },
  2: {
    youtube: YT('uufR5HaGOy4'),
    buzz: BUZZ('17244807-ep-2-anne-fundner-mother-and-fentanyl-awareness-advocate-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000710372242'),
  },
  3: {
    youtube: YT('duVA5Ft39Mg'),
    buzz: BUZZ('17373784-ep-3-sean-patrick-flanery-and-lauren-flanery-on-faith-and-family-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000713973661'),
  },
  4: {
    youtube: YT('pMZKglehV0o'),
    buzz: BUZZ('17491948-ep-4-brande-roderick-actress-and-former-baywatch-star-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000716889738'),
  },
  5: {
    youtube: YT('xpVgDQpPUjU'),
    buzz: BUZZ('17731108-ep-5-amy-palmiero-winters-amputee-endurance-athlete-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000723483061'),
  },
  6: {
    youtube: YT('HeATChefF4k'),
    buzz: BUZZ('17849563-ep-6-spencer-coursen-founder-of-coursen-security-group-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000726972071'),
  },
  7: {
    youtube: YT('Xqkv2TU4qAE'),
    buzz: BUZZ('18045199-ep-7-father-tim-catholic-priest-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000732713228'),
  },
  8: {
    youtube: YT('4ops3RINs9Y'),
    buzz: BUZZ('18288950-ep-8-chris-dorris-mental-toughness-coach-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000739391759'),
  },
  9: {
    youtube: YT('1abB8_pzqwE'),
    buzz: BUZZ('18435236-ep-9-dr-eloise-nelson-holistic-health-and-nutrition-expert-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000743288240'),
  },
  10: {
    youtube: YT('ZgfIKWnmnhA'),
    buzz: BUZZ('18692660-ep-10-nick-lowery-chiefs-all-time-leading-scorer-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000749983828'),
  },
  11: {
    youtube: YT('xmYOq9wEPzY'),
    buzz: BUZZ('18785141-ep-11-jessica-jordaan-mrs-usa-2022-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000752950365'),
  },
  12: {
    youtube: YT('DZ7tquu4lDQ'),
    buzz: BUZZ('18983736-ep-12-brett-tippie-mountain-bike-pioneer-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000760302646'),
  },
  13: {
    youtube: YT('YAcjg-4y3nM'),
    buzz: BUZZ('19243689-ep-13-jen-walcott-archuleta-season-1-finale-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000769706062'),
  },
};

const EPISODE_BY_SLUG = {
  'first-podcast-outtakes-perfection-chaos-one-very-bold-fly': 1,
  'football-was-his-whole-identity-until-washington-forced-him-to-face-the-man-in-the-mirror': 1,
  'my-first-podcast-episode-drops-monday-unfiltered-with-jen-archuleta-real-stories-no-filters': 1,
  'my-podcast-is-live': 1,
  'youtube-shorts': 1,
  unfiltered: 1,
  'they-say-the-bumblebee-s-not-built-to-fly': 1,
  'they-all-grieve-differently': 2,
  'next-podcast': 3,
  'now-streaming': 3,
  'lauren-flanery': 3,
  'oklahoma-fires': 3,
  'brande-roderick': 4,
  'coming-soon-4': 4,
  'coming-this-july-on-the-podcast': 4,
  filters: 4,
  'live-3': 4,
  'live-2': 6,
  'coming-soon-2': 7,
  'furever-home': 7,
  'dr-eloise-nelson': 9,
  'jessica-jordaan': 11,
  'brett-tippie-2': 12,
  'pup-of-the-podcast-3': 13,
  // Added November 2, 2026, from the audit of every post's podcast links.
  'coming-soon': 2,
  'weston-funder': 2,
  'pup-of-the-podcast-meet-tippy': 2,
  'unfiltered-with-jen-archuleta': 2,
  'the-small-interruptions-we-needed': 2,
  live: 2,
  'live-now': 2,
  'this-month-2': 2,
  'my-kids-had-so-much': 2,
  'fentanyl-is-very-addictive': 2,
  'graduation-day': 2,
  'sean-lauren-flanery': 3,
  'pup-of-the-podcast-meet-lexi': 3,
  'amy-palmiero-winters': 5,
  'amy-palmiero-winters-2': 5,
  august: 5,
  'pup-of-the-podcast': 5,
  'watch-now': 5,
  'national-security-expert': 6,
  'pup-of-the-podcast-2': 6,
  'live-4': 7,
  'father-tim': 7,
  'this-month': 9,
  'coming-soon-on-unfiltered-with-jen-archuleta': 10,
  'coming-soon-3': 11,
  'brett-tippie': 12,
  'season-finale': 13,
};

// Posts whose OWN links open a different guest's episode (Jen, November 2026:
// "old blog links open the wrong guest's episode"). Audited November 2, 2026
// against every post in Sanity: twelve posts about Anne Fundner linked Adam's
// Episode 1, the Flanery preview linked Episode 1, Amy Palmiero-Winters' post
// linked Brande Roderick's Episode 4, and Freddie's post linked Episode 5.
// Each link is pointed at the episode the post is about, on the same platform
// (YouTube stays YouTube, Apple stays Apple). Only these posts are touched.
const CORRECT_EPISODE = {
  'coming-soon': 2,
  'weston-funder': 2,
  'pup-of-the-podcast-meet-tippy': 2,
  'unfiltered-with-jen-archuleta': 2,
  'the-small-interruptions-we-needed': 2,
  live: 2,
  'live-now': 2,
  'this-month-2': 2,
  'my-kids-had-so-much': 2,
  'they-all-grieve-differently': 2,
  'fentanyl-is-very-addictive': 2,
  'graduation-day': 2,
  'sean-lauren-flanery': 3,
  'amy-palmiero-winters-2': 5,
  'pup-of-the-podcast-2': 6,
};

// A merch post ("It's Live", the Bumblebee Collection) that said "Subscribe to
// the podcast ... YouTube" but linked Episode 1. It goes to the channel.
const CHANNEL_INSTEAD = new Set(['it-s-live']);
const YOUTUBE_CHANNEL = 'https://www.youtube.com/@jenarchuletaunfiltered';

function episodeIdMaps() {
  const yt = {};
  const apple = {};
  const buzz = {};
  for (const [n, links] of Object.entries(EPISODES)) {
    const y = links.youtube.match(/v=([A-Za-z0-9_-]{11})/);
    const a = links.apple.match(/[?&]i=(\d+)/);
    const b = links.buzz.match(/episodes\/(\d+)/);
    if (y) yt[y[1]] = Number(n);
    if (a) apple[a[1]] = Number(n);
    if (b) buzz[b[1]] = Number(n);
  }
  return { yt, apple, buzz };
}
const EPISODE_IDS = episodeIdMaps();

const YT_EPISODE_URL = /https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&][A-Za-z0-9_=&%.-]*)?/g;
const APPLE_EPISODE_URL = /https?:\/\/podcasts\.apple\.com\/[A-Za-z0-9_/%.-]*\?(?:[A-Za-z0-9_=&%.-]*&)?i=(\d+)(?:&[A-Za-z0-9_=&%.-]*)?/g;
const BUZZ_EPISODE_URL = /https?:\/\/(?:www\.)?buzzsprout\.com\/2467154\/episodes\/(\d+)[A-Za-z0-9_\-]*/g;

function correctEpisodeText(text, slug) {
  if (typeof text !== 'string' || !text) return text;
  const target = CORRECT_EPISODE[slug];
  const channel = CHANNEL_INSTEAD.has(slug);
  if (!target && !channel) return text;
  return text
    .replace(YT_EPISODE_URL, (url, id) => {
      const ep = EPISODE_IDS.yt[id];
      if (!ep) return url;
      if (channel) return YOUTUBE_CHANNEL;
      return ep === target ? url : EPISODES[target].youtube;
    })
    .replace(APPLE_EPISODE_URL, (url, id) => {
      const ep = EPISODE_IDS.apple[id];
      if (!ep || channel || ep === target) return url;
      return EPISODES[target].apple;
    })
    .replace(BUZZ_EPISODE_URL, (url, id) => {
      const ep = EPISODE_IDS.buzz[id];
      if (!ep || channel || ep === target) return url;
      return EPISODES[target].buzz;
    });
}

function correctEpisodeLinks(blocks, slug) {
  if (!CORRECT_EPISODE[slug] && !CHANNEL_INSTEAD.has(slug)) return blocks;
  return blocks.map((block) => {
    if (!block || block._type !== 'block' || !Array.isArray(block.children)) return block;
    const markDefs = (block.markDefs || []).map((def) => (
      def && def._type === 'link' && def.href ? { ...def, href: correctEpisodeText(def.href, slug) } : def
    ));
    const children = block.children.map((span) => (
      span && typeof span.text === 'string' ? { ...span, text: correctEpisodeText(span.text, slug) } : span
    ));
    return { ...block, markDefs, children };
  });
}

// These posts name a platform and then stop, but they are not a podcast episode.
const REMOVE_ONLY = new Set([
  'turn-your-pain-into-purpose',
  'jennifer-walcott-archuleta-mr-sports-show',
]);

const SHOW_SLUGS = new Set([
  'all-right-it-s-that-time-again',
  'please-review',
  'they-didn-t-know-our-story-until-they-listened',
  'what-did-they-say',
]);

function linksFor(slug) {
  if (REMOVE_ONLY.has(slug)) return null;
  if (SHOW_SLUGS.has(slug)) return SHOW;
  const episode = EPISODE_BY_SLUG[slug];
  if (episode) return EPISODES[episode];
  return SHOW;
}

function cleanUrl(raw) {
  let url = raw.replace(/[.,;:!?'*\]]+$/, '');
  url = url.replace(/^(https?:\/\/[^/?#]*\.[a-z]{2,})[A-Z][A-Za-z]*$/, '$1');
  url = url.replace(/^(https?:\/\/youtu\.be\/[A-Za-z0-9_-]{11})[A-Z][A-Za-z]+$/, '$1');
  url = url.replace(/(=\d+)[A-Z][A-Za-z]+$/, '$1');
  return url;
}

function rewriteText(text, slug) {
  if (typeof text !== 'string' || !text) return text;
  let next = text;
  next = next.replace(/(?:--\s*|\*+)(?=https?:\/\/(?:www\.)?(?:phpure|udoerasmus|cocoonnutrition)\.)/gi, '');
  for (const url of RETIRED_URLS) next = next.split(url).join('');
  next = next.replace(FOREVER_ANGELS_URL, FOREVER_ANGELS);
  // Childhelp took down its 2023 WINGS event page (404, Nov 5, 2026).
  next = next.replace(/https?:\/\/(?:www\.)?childhelp\.org\/events\/wings23\/?/gi, 'https://www.childhelp.org/');
  next = next.replace(/http:\/\//gi, 'https://');
  next = next.replace(BARE_PODCAST, (full, host, offset, str) => {
    const before = str.slice(0, offset);
    if (/https?:\/\/(?:www\.)?$/i.test(before) || /[\w.]$/.test(before)) return full;
    return `https://${host}`;
  });
  next = fixPublishedCopy(next, slug);
  // No em dashes on the site (Jen, November 3): a dash before a signature
  // goes, and any other becomes a comma.
  next = next.replace(/^\s*—\s*/, '').replace(/\s*—\s*/g, ', ');
  return next;
}

function rewriteBlocks(blocks, slug) {
  return blocks.map((block) => {
    if (!block || block._type !== 'block' || !Array.isArray(block.children)) return block;
    const markDefs = (block.markDefs || []).map((def) => {
      if (!def || def._type !== 'link') return def;
      if (isRetiredHref(def.href)) return { ...def, href: '' };
      // Childhelp took down its 2023 WINGS event page (404, Nov 5, 2026).
      if (/childhelp\.org\/events\/wings23/i.test(def.href || '')) {
        return { ...def, href: 'https://www.childhelp.org/' };
      }
      if (/^(?:https?:\/\/)?(?:www\.)?theforeverangels\.com(?:\/|$)/i.test(def.href || '')) {
        return { ...def, href: FOREVER_ANGELS };
      }
      if (/^http:\/\//i.test(def.href || '')) {
        return { ...def, href: def.href.replace(/^http:\/\//i, 'https://') };
      }
      return def;
    });
    const children = block.children.map((span) => (
      span && typeof span.text === 'string' ? { ...span, text: rewriteText(span.text, slug) } : span
    ));
    return { ...block, markDefs, children };
  });
}

function linkifyBody(blocks) {
  return blocks.map((block) => {
    if (!block || block._type !== 'block' || !Array.isArray(block.children)) return block;
    const markDefs = Array.isArray(block.markDefs) ? [...block.markDefs] : [];
    const linkKeys = new Set(markDefs.filter((d) => d && d._type === 'link' && d.href).map((d) => d._key));
    let changed = false;
    const children = [];
    block.children.forEach((span, si) => {
      const marks = Array.isArray(span?.marks) ? span.marks : [];
      if (!span || span._type !== 'span' || typeof span.text !== 'string' || marks.some((m) => linkKeys.has(m))) {
        children.push(span);
        return;
      }
      const text = span.text;
      const base = span._key || `s${si}`;
      let last = 0;
      let n = 0;
      for (const match of text.matchAll(BARE_URL)) {
        const url = cleanUrl(match[0]);
        if (!/^https?:\/\/[^/?#]+\.[^/?#]+/.test(url)) continue;
        const start = match.index;
        if (start > last) children.push({ ...span, _key: `${base}-t${n}`, text: text.slice(last, start) });
        if (!isRetiredHref(url)) {
          const key = `autolink-${si}-${n}`;
          markDefs.push({ _type: 'link', _key: key, href: url });
          children.push({ ...span, _key: `${base}-u${n}`, text: url, marks: [...marks, key] });
        }
        last = start + url.length;
        n += 1;
      }
      if (n === 0) {
        children.push(span);
        return;
      }
      if (last < text.length) children.push({ ...span, _key: `${base}-t${n}`, text: text.slice(last) });
      changed = true;
    });
    return changed ? { ...block, markDefs, children } : block;
  });
}

function linkPhrase(blocks, phrase, href) {
  return blocks.map((block) => {
    if (!block || block._type !== 'block' || !Array.isArray(block.children)) return block;
    const markDefs = Array.isArray(block.markDefs) ? [...block.markDefs] : [];
    const linkKeys = new Set(markDefs.filter((d) => d && d._type === 'link').map((d) => d._key));
    let changed = false;
    const children = [];
    block.children.forEach((span, si) => {
      const marks = Array.isArray(span?.marks) ? span.marks : [];
      if (!span || span._type !== 'span' || typeof span.text !== 'string' || !span.text.includes(phrase) || marks.some((m) => linkKeys.has(m))) {
        children.push(span);
        return;
      }
      const parts = span.text.split(phrase);
      parts.forEach((part, pi) => {
        const base = span._key || `s${si}`;
        if (part) children.push({ ...span, _key: `${base}-a${pi}`, text: part, marks });
        if (pi < parts.length - 1) {
          const key = `phrase-${si}-${pi}`;
          markDefs.push({ _type: 'link', _key: key, href });
          linkKeys.add(key);
          children.push({ ...span, _key: `${base}-b${pi}`, text: phrase, marks: [...marks, key] });
        }
      });
      changed = true;
    });
    return changed ? { ...block, markDefs, children } : block;
  });
}

function blockText(block) {
  if (!block || block._type !== 'block' || !Array.isArray(block.children)) return '';
  return block.children.map((child) => child?.text || '').join('');
}

function splitLines(blocks) {
  const out = [];
  blocks.forEach((block) => {
    const text = blockText(block);
    const linked = (block.markDefs || []).some((def) => def && def._type === 'link' && def.href);
    if (!text.includes('\n') || linked || (block.children || []).length !== 1) {
      out.push(block);
      return;
    }
    text.split('\n').forEach((line, i) => {
      if (!line.trim()) return;
      const span = block.children[0];
      out.push({
        ...block,
        _key: `${block._key || 'b'}-ln${i}`,
        markDefs: [],
        children: [{ ...span, _key: `${span._key || 's'}-ln${i}`, text: line, marks: [] }],
      });
    });
  });
  return out;
}

function isDanglingLabel(text) {
  const line = text.replace(/\s+/g, ' ').trim();
  if (!line || line.length > 220 || /https?:\/\//i.test(line)) return false;
  if (/listen more|watch you bleed|won.?t listen|nobody is watching|little orphan|watching my kids/i.test(line)) return false;
  const words = line.split(/\s+/).length;
  const ctaStart = /^(?:[\p{Extended_Pictographic}\uFE0F\u200D\s▶🎧]*)?(watch\b|listen\b|subscribe\b|more information\b|see more on my youtube|follow on instagram\b|youtube\b|buzzsprout\b|apple podcasts\b|also available on buzzsprout|please subscribe\b|episode out now\b|full episode streaming soon)/iu
  if (!ctaStart.test(line)) return false;
  if (words > 18 && !/:\s*$/.test(line) && !/^watch the full episode/i.test(line) && !/listen (&|and) subscribe/i.test(line)) return false;
  return true;
}

function urlsForLabel(text, links) {
  if (/interview here/i.test(text) || /youtube shorts/i.test(text) || /^follow on instagram\b/i.test(text.trim())) return [];
  if (/more information/i.test(text)) return links?.more ? [links.more] : [];
  if (!links) return [];
  const urls = [];
  const watch = /\bwatch\b|youtube/i.test(text);
  const buzz = /buzzsprout/i.test(text);
  const apple = /\bapple\b/i.test(text);
  const listen = (/\blisten\b|subscribe|streaming soon/i.test(text))
    || (/full episode/i.test(text) && !watch);
  if (watch && links.youtube) urls.push(links.youtube);
  if (buzz && links.buzz) urls.push(links.buzz);
  if (apple && links.apple) urls.push(links.apple);
  if (watch && listen && links.buzz && !buzz) urls.push(links.buzz);
  if (!urls.length && listen && links.buzz) urls.push(links.buzz);
  return urls;
}

function hasLinkSoon(blocks, index) {
  for (let j = index + 1; j < blocks.length; j += 1) {
    const text = blockText(blocks[j]).trim();
    if (!text) continue;
    return /https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|buzzsprout\.com|podcasts\.apple\.com|unfilteredwithjenarchuleta\.buzzsprout\.com)/i.test(text);
  }
  return false;
}

function appendUrls(block, urls) {
  const markDefs = Array.isArray(block.markDefs) ? [...block.markDefs] : [];
  const children = [...block.children];
  urls.forEach((url, n) => {
    const key = `listenfix-${n}`;
    markDefs.push({ _type: 'link', _key: key, href: url });
    children.push({
      _type: 'span',
      _key: `listenfix-s${n}`,
      text: ` ${url}`,
      marks: [key],
    });
  });
  return { ...block, markDefs, children };
}

function repairLabels(blocks, slug) {
  const links = linksFor(slug);
  const flat = splitLines(blocks);
  return flat.flatMap((block, index) => {
    const text = blockText(block);
    if (!isDanglingLabel(text) || hasLinkSoon(flat, index)) return [block];
    const urls = urlsForLabel(text, links);
    if (!urls.length) return [];
    return [appendUrls(block, urls)];
  });
}

// Leftover lines Jen asked to drop from a post (the post's URL stays).
const DROP_LINES = {
  // Jen, Nov 13: the stray "Coming 🔜" line at the top.
  'coming-soon-my-very-own-podcast': [/^Coming\s*🔜\uFE0F?$/u],
};

export function prepareJournalBody(blocks, slug) {
  if (!Array.isArray(blocks)) return blocks;
  if (DROP_LINES[slug]) {
    blocks = blocks.filter((block) => !DROP_LINES[slug].some((re) => re.test(blockText(block).trim())));
  }
  // FilmFreeway links and Jen's "View Jennifer's press coverage... on FilmFreeway"
  // lines show as she wrote them (she asked for her FilmFreeway link, November 3).
  let next = linkifyBody(correctEpisodeLinks(rewriteBlocks(blocks, slug), slug));
  if (slug === 'homemade-formula') {
    next = linkPhrase(next, 'THE HOMEMADE FORMULA RECIPES', WESTON_FORMULA);
    next = linkPhrase(next, 'Weston A. Price Foundation', WESTON_FORMULA);
    next = linkPhrase(next, 'Udos Choice infant probiotic', FLORA_TODDLER_PROBIOTIC);
  }
  if (slug === 'baby-formula-shortage') {
    next = linkPhrase(next, 'formula homemade', WESTON_FORMULA);
  }
  next = repairLabels(next, slug);
  // Jen, Nov 13: the "I Did It!" post links the book, the Etsy shop and the podcast.
  if (slug === 'i-did-it') {
    next = linkPhrase(next, 'jenarchuleta.com/book', '/book');
    next = linkPhrase(next, 'self-published Beyond the Velvet Ropes', '/book');
    next = linkPhrase(next, 'Etsy, UnfilteredByJen', ETSY_SHOP);
    next = linkPhrase(next, 'Podcast: Unfiltered with Jen Archuleta', '/podcast');
  }
  if (slug === 'coming-soon-my-very-own-podcast') {
    next = linkPhrase(next, 'My memoir, Beyond the Velvet Ropes, is out now.', '/book');
  }
  return next;
}
