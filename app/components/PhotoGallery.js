'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import captions from '../velvet/captions.json';
import sizes from '../velvet/slide-sizes.json';

// One slideshow, on About. The Hollywood set is first, together, so those
// slides lead. Then portraits that are not already on the homepage or About
// (the About portrait is presskit-headshot-floral, so it is not a slide), then
// Velvet Circle photos, then gallery-new. A file stays in the repo when
// its slide is left out.
//
// HOW THE PHOTOS SHOW (Jen, October 27): big, clear, whole. Every slide is
// the whole file at its real ratio, sized as large as the stage allows
// (about 900px wide for a landscape photo on a laptop, nearly the full
// screen width on a phone). The white mat hugs the photo. Nothing is
// cover-cropped into a shared frame and nothing is stretched. A small file
// is never blown up more than 1.6x, so it cannot go blurry. Faces are
// unretouched. Only the current slide and its two neighbors are mounted.
//
// Per-photo fixes, October 27 (crops only, no retouching; see
// docs/photo-changes-2026-10-27.md for every file):
// - Old slide 46 (gallery-new/new_03, a tight crop with phone controls at
//   the top) is now the full black-and-white portrait, jen-headshot-bw.
// - Old slide 69 (gallery-picks/131, a 234px thumbnail) is now the full
//   Spartan photo Jen sent (gallery-picks/spartan-course). The gray band
//   and the TikTok/Spartan marks were cropped off, nothing painted over.
// - Old slide 70 (gallery-picks/132) is removed, file and all.
// - Old slides 43, 44, 45 (the beach walk, the white rompers, and the
//   resort pool) are still the small files. Jen's larger originals replace
//   them when Adam drops them in.
// - Phone buttons, tag icons, and white or black edge bands were cropped
//   off hw_01, hw_03, hw_05, hw_07, hw_09, velvet 32, new_19, new_23,
//   new_24, new_34, new_35, family-beach-hands, pajamas, hangar,
//   dog-tortoise, 123, jet-seats, and the childhood portrait.
// - velvet-carousel 13, 16, 18, 19, and 31 were 4:5 crops that cut people
//   off at the edges. They are now the full photos from the book.
//
// November 3 (Jen's list):
// - Slides 46, 48, 55, 62, and 74 are out (jen-headshot-bw, new_05,
//   new_16, new_28, gallery-picks/160). See HIDDEN_SLIDE_SRC.
//
// November 5 (Jen): the full gallery is back. The 19-photo shortlist is
// gone. The set is the 92-slide gallery from November 3 (commit baa5258),
// then these are out. See OUT_OF_GALLERY.
// - Old #1, hw_01, the Playboy Rock the Rabbit stage photo.
// - Old #42, the blurred kids-and-dogs bed photo. That file stays deleted.
// - Old #61, new_04, the glamour headshot with long highlighted hair. It
//   stays on the About Me red carpet row. It is not added again here.
// - gallery-new/new_14.jpg, the beach bodyboard photo. A
//   "JENNIFER WALCOTT.COM" banner sits over her leg, so it cannot be
//   cropped off an edge. Left out and flagged.
// new_16 (TikTok handle over the birthday cake) was already out and stays out.
// Old #51 is the new rappelling photo. Old #66 is the new camel photo.
// - Every photo of her children is out, and those files are deleted from the
//   site: velvet 35, family-beach-hands, girls-beach-walk,
//   girls-beach-rompers, ski, pajamas, hug, lawn, hangar, jet-seats, beach,
//   cliff, tree, driveway, ozarks-canoe, and muskoka-boat. (Velvet 24, 25,
//   26, Quiet_Mornings.jpeg, and new_15 were never shown but sat in the
//   public folder with the kids' faces, so they are deleted too.)
// - In their place, Jen's 19 new photos (gallery-nov3, her numbering, the
//   kids' faces already blurred by her) follow the family photos. Never
//   add a photo of the children unless Jen supplied that exact file.
//
// Out of this slideshow:
// presskit-headshot-glam (the old home hero). jen-glam, jen-fitness, jen-sultry,
// and jen-fun2 (the photo row on About, above this slideshow). jen-fun
// (group of adults, not a dog photo). jen-bw-coat and velvet 07 (the coat
// is the photo beside "My twenties were something else" as jen-bw-coat2).
// 08 and 44 are already out of captions.json. 09 is left out. 24, 25, 26,
// and 35 (the children) were deleted on November 3. 27 and 45 are dog
// photos on /pups. 43 is the same Urban Axes outing
// as gallery-new new_24, so new_24 stays.
// gallery-new left out: new_02, new_10, new_11, new_12, new_15, new_17,
// new_20, new_21, new_26, new_27. new_27 stays out. It is not the same
// photo as velvet 34. new_17, new_20, and new_21 repeat the
// Childhelp luncheon in velvet 37, which stays. new_10, new_11, and
// new_12 are on /pups. new_01, new_29, new_30, new_32, and new_33 are not
// in the repo.
const BLANK_ALT = 'Photo from Jen’s personal collection';

const HOLLYWOOD = [
  {
    src: '/assets/gallery-hw/hw_01.jpg',
    alt: 'On stage at Playboy’s Rock the Rabbit party, SXSW',
    caption: 'On stage at Playboy’s Rock the Rabbit party, SXSW',
    width: 1242,
    height: 720,
  },
  {
    src: '/assets/gallery-hw/hw_02.jpg',
    alt: 'On a dark stage, seen from the crowd, wearing bunny ears',
    caption: 'On a dark stage, seen from the crowd, wearing bunny ears',
    width: 1320,
    height: 1067,
  },
  {
    src: '/assets/gallery-hw/hw_03.jpg',
    alt: 'With Tommy Lee',
    caption: 'With Tommy Lee',
    width: 960,
    height: 972,
  },
  {
    src: '/assets/gallery-hw/hw_04.jpg',
    alt: 'With Howard Stern',
    caption: 'With Howard Stern',
    width: 1242,
    height: 950,
  },
  {
    src: '/assets/gallery-hw/hw_05.jpg',
    alt: 'With Shaggy in Los Angeles',
    caption: 'With Shaggy in Los Angeles',
    width: 1210,
    height: 1287,
  },
  {
    src: '/assets/gallery-hw/hw_06.jpg',
    alt: 'My name on the Palms marquee in Las Vegas',
    caption: 'My name on the Palms marquee in Las Vegas',
    width: 640,
    height: 480,
  },
  {
    src: '/assets/gallery-hw/hw_07.jpg',
    alt: 'Swimming with a dolphin',
    caption: 'Swimming with a dolphin',
    width: 1179,
    height: 721,
  },
  {
    src: '/assets/gallery-hw/hw_09.jpg',
    alt: 'Jen in a denim skirt beside a man in a dark coat, at a Playboy sign',
    caption: 'Jen in a denim skirt beside a man in a dark coat, at a Playboy sign',
    width: 786,
    height: 1570,
  },
];

const PORTRAITS = [
  {
    src: '/assets/jen-joy.jpg',
    alt: 'Smiling, with a small monkey on her shoulder',
    caption: 'Smiling, with a small monkey on her shoulder',
    width: 841,
    height: 1960,
  },
  {
    src: '/assets/jen-beauty.jpg',
    alt: 'Jen Walcott Archuleta',
    width: 900,
    height: 1520,
  },
];

// Left out of the slideshow; they stay in captions.json.
const HOME_ONLY_SKIP = new Set([
  '07.jpg',
  '09.jpg',
  '27.jpg',
  '33.jpg',
  '34.jpg',
  '36.jpg',
  '43.jpg',
  '45.jpg',
]);

const FAMILY = captions.filter((item) => !HOME_ONLY_SKIP.has(item.file)).map((item) => {
  const caption = typeof item.caption === 'string' ? item.caption.trim() : '';
  const [width, height] = sizes[item.file];
  return {
    src: `/velvet-carousel/${item.file}`,
    alt: caption || BLANK_ALT,
    caption,
    width,
    height,
  };
});

// October 27, after the velvet family slides. pool-sombreros is a small
// file waiting on Jen's larger original.
const FAMILY_OCT27 = [
  { src: '/assets/gallery/pool-sombreros.jpg', alt: 'Four friends in sombreros beside a pool', caption: 'Four friends in sombreros beside a pool', width: 295, height: 391 },
];

// November 3: Jen's new photos, in her numbering (there is no 06 or 17).
// They replace the photos of her children; the kids' faces are blurred in
// her files. 13 is the Ozarks canoe, so it keeps that caption.
const NOV3 = [
  { src: '/assets/gallery-nov3/02-beach-kiss.jpg', alt: 'A kiss on the beach', width: 951, height: 1761 },
  { src: '/assets/gallery-nov3/03-wedding-beach.jpg', alt: 'Jen and Adam on their wedding day, on the beach at sunset', width: 1308, height: 1319 },
  { src: '/assets/gallery-nov3/04-bride-friend.jpg', alt: 'Jen as a bride, laughing with a friend', width: 1320, height: 1962 },
  { src: '/assets/gallery-nov3/05-fashion-show.jpg', alt: 'A fashion show luncheon', width: 1316, height: 1756 },
  { src: '/assets/gallery-nov3/07-dressing-room.jpg', alt: 'Jen peeking out of a dressing room with a friend', width: 1316, height: 1756 },
  { src: '/assets/gallery-nov3/08-volcano-railing.jpg', alt: 'The family looking out at the mountains', width: 1316, height: 739 },
  { src: '/assets/gallery-nov3/09-rafting.jpg', alt: 'White-water rafting', width: 1316, height: 883 },
  { src: '/assets/gallery-nov3/10-houseboat-couple.jpg', alt: 'Jen and Adam on a houseboat', width: 1316, height: 1756 },
  { src: '/assets/gallery-nov3/11-rappelling.jpg', alt: 'Rappelling through the jungle in a blue helmet', caption: 'Rappelling through the jungle in a blue helmet', width: 1320, height: 737 },
  { src: '/assets/gallery-nov3/12-boat.jpg', alt: 'A day on the boat', width: 1316, height: 1756 },
  { src: '/assets/gallery-nov3/13-canoe.jpg', alt: 'Ozarks', caption: 'Ozarks', width: 952, height: 1202 },
  { src: '/assets/gallery-nov3/14-grand-canyon.jpg', alt: 'Jen on a hiking trail', width: 1160, height: 1055 },
  { src: '/assets/gallery-nov3/15-lake-jump.jpg', alt: 'A leap into the lake', width: 1316, height: 1756 },
  { src: '/assets/gallery-nov3/16-ocean-overlook.jpg', alt: 'Above the ocean', width: 1792, height: 1008 },
  { src: '/assets/gallery-nov3/18-mansion-lawn.jpg', alt: 'On the lawn', width: 1792, height: 1008 },
  { src: '/assets/gallery-nov3/19-private-jet.jpg', alt: 'In front of a private jet', width: 1600, height: 1200 },
  { src: '/assets/gallery-nov3/20-spartan-race.jpg', alt: 'Jen and a friend after a Spartan race', width: 1264, height: 1568 },
  { src: '/assets/gallery-nov3/21-rv-family.jpg', alt: 'The family in front of the RV', width: 1600, height: 1200 },
];

const GALLERY_NEW = [
  { src: '/assets/jen-headshot-bw.jpg', alt: 'Jen Walcott Archuleta in a black and white portrait', width: 1320, height: 1946 },
  { src: '/assets/gallery-new/new_04.jpg', alt: 'Jen Walcott Archuleta, glamour portrait', width: 1320, height: 1537 },
  { src: '/assets/gallery-new/new_05.jpg', alt: 'Jen Walcott Archuleta with a friend', width: 1280, height: 1600 },
  { src: '/assets/gallery-new/new_06.jpg', alt: 'Selfie with a friend, both in sunglasses and backward caps', caption: 'Selfie with a friend, both in sunglasses and backward caps', width: 1065, height: 1600 },
  { src: '/assets/gallery-new/new_07.jpg', alt: 'Close-up with a friend making a face, outdoors', caption: 'Close-up with a friend making a face, outdoors', width: 1266, height: 1600 },
  { src: '/assets/gallery-new/new_08.jpg', alt: 'Jen Walcott Archuleta with a black sports car', width: 869, height: 1232 },
  { src: '/assets/gallery-new/new_09.jpg', alt: 'Jen Walcott Archuleta greeting friends at a party', width: 1320, height: 837 },
  { src: '/assets/gallery-new/new_13.jpg', alt: 'Jen in an orange dress and a flowered hat, holding a camel lead', caption: 'Jen in an orange dress and a flowered hat, holding a camel lead', width: 599, height: 1137 },
  { src: '/assets/gallery-new/new_14.jpg', alt: 'Jen Walcott Archuleta on the beach with a bodyboard', width: 1097, height: 1600 },
  { src: '/assets/gallery-new/new_16.jpg', alt: 'Jen Walcott Archuleta celebrating her birthday', width: 1168, height: 1460 },
  { src: '/assets/gallery-new/new_18.jpg', alt: 'Jen Walcott Archuleta with a birthday cake', width: 827, height: 1002 },
  { src: '/assets/gallery-new/new_19.jpg', alt: 'Six friends lined up indoors, several in cowboy boots', caption: 'Six friends lined up indoors, several in cowboy boots', width: 1200, height: 1591 },
  { src: '/assets/gallery-new/new_22.jpg', alt: 'Jen Walcott Archuleta with friends by a pool', width: 1224, height: 917 },
  { src: '/assets/gallery-new/new_23.jpg', alt: 'Jen Walcott Archuleta with her team at a race', width: 828, height: 914 },
  { src: '/assets/gallery-new/new_24.jpg', alt: 'Jen Walcott Archuleta with friends at Urban Axes', width: 828, height: 818 },
  { src: '/assets/gallery-new/new_25.jpg', alt: 'Jen Walcott Archuleta at a group dinner', width: 1600, height: 1200 },
  { src: '/assets/gallery-new/new_28.jpg', alt: 'Jen Walcott Archuleta with a friend', width: 829, height: 1600 },
  { src: '/assets/gallery-new/new_34.jpg', alt: 'Jen Walcott Archuleta with her husband', width: 1179, height: 1097 },
  { src: '/assets/gallery-new/new_35.jpg', alt: 'Jen Walcott Archuleta on the beach', width: 1320, height: 1281 },
  { src: '/assets/gallery-new/new_36.jpg', alt: 'A magazine page about Jen Walcott', width: 1320, height: 1607 },
  { src: '/assets/gallery-new/new_37.jpg', alt: 'A magazine news column featuring Jen Walcott', width: 790, height: 2000 },
  { src: '/assets/gallery-new/new_38.jpg', alt: 'A magazine photo of Jen Walcott with another Playmate', width: 1500, height: 2000 },
];

// Added after the existing slides, in numeric order. 113 and 116 are
// the same pictures as hw_01 and hw_06, so they are not repeated here.
// 118 is the same photo as gallery-new/new_10.jpg, a pup photo on /pups.
// Jen removed nine of these (old slides 65, 68, 72, 77, 79, 82, 88, 92, 94),
// then 66 (129.jpg), 69 (137.jpg), and 82 (169.jpg), then on October 27
// slide 70 (132.jpg). Those files left the repo because nothing else
// referenced them.
const PICKS = [
  { src: '/assets/gallery-picks/123.jpg', alt: 'With a friend in a red dress, at night', caption: 'With a friend in a red dress, at night', width: 1320, height: 1192 },
  { src: '/assets/gallery-picks/spartan-course.jpg', alt: 'Jen Walcott Archuleta crawling under the wire at a Spartan race', width: 1320, height: 764 },
  { src: '/assets/gallery-picks/141.jpg', alt: 'Jen Walcott Archuleta', width: 1066, height: 1332 },
  { src: '/assets/gallery-picks/142.jpg', alt: 'Jen Walcott Archuleta', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/146.jpg', alt: 'Jen Walcott Archuleta', width: 664, height: 830 },
  { src: '/assets/gallery-picks/151.jpg', alt: 'Jen Walcott Archuleta', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/154.jpg', alt: 'Jen Walcott Archuleta by the river', width: 640, height: 800 },
  { src: '/assets/gallery-picks/155.jpg', alt: 'Jen in Bangkok', caption: 'Jen in Bangkok', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/157.jpg', alt: 'Studio portrait in a white tank top', caption: 'Studio portrait in a white tank top', width: 808, height: 1010 },
  { src: '/assets/gallery-picks/158.jpg', alt: 'In a red dress on a step-and-repeat, beside a man in a suit', caption: 'In a red dress on a step-and-repeat, beside a man in a suit', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/159.jpg', alt: 'Indoors beside a man in a navy vest', caption: 'Indoors beside a man in a navy vest', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/160.jpg', alt: 'Jen Walcott Archuleta', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/164.jpg', alt: 'Costa Rica', caption: 'Costa Rica', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/168.jpg', alt: 'Jen Walcott Archuleta', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/171.jpg', alt: 'Jen Walcott Archuleta', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/175.jpg', alt: 'Three friends in knitted turkey hats', caption: 'Three friends in knitted turkey hats', width: 960, height: 884 },
];

// October 26 batch, after the picks, in Jen's order. The five dogs under
// the bougainvillea are already dogs.jpg. The photos of the children from
// this batch were removed on November 3 (see the top of this file).
// Full frames, no upscaling.
const OCT26 = [
  { src: '/assets/gallery-oct26/wedding.jpg', alt: 'A wedding at sunset', width: 1070, height: 1147 },
  { src: '/assets/gallery-oct26/snow.jpg', alt: 'Jen Walcott Archuleta in the snow', width: 1320, height: 1266 },
  { src: '/assets/gallery-oct26/jet-cabin.jpg', alt: 'Inside a private jet', width: 1029, height: 845 },
  { src: '/assets/gallery-oct26/jet-stairs.jpg', alt: 'On the stairs of a private jet', width: 1320, height: 1271 },
  { src: '/assets/gallery-oct26/dog-tortoise.jpg', alt: 'A dog on a tortoise', width: 1320, height: 1320 },
  { src: '/assets/gallery-oct26/tortoise.jpg', alt: 'A tortoise with greens', width: 665, height: 940 },
];

// Childhood portrait. The Hollywood set stays first, so this follows every earlier slide.
const CHILDHOOD = [
  { src: '/assets/gallery-childhood/jen-childhood.jpg', alt: 'Jen as a girl', width: 552, height: 552 },
];

// Oct 27: slides Jen took out, and duplicate pairs (one copy stays, the
// sharper or higher-detail file). Files stay in the repo.
// 141 and 142 (old slides 68 and 69), 155 (Jen in Bangkok, old 73).
// Nov 3: old slides 46, 48, 55, 62, and 74. jen-headshot-bw stays the
// Glamorous press headshot on Media; it is just not a gallery slide.
const HIDDEN_SLIDE_SRC = new Set([
  '/assets/gallery-picks/141.jpg',
  '/assets/gallery-picks/142.jpg',
  '/assets/gallery-picks/155.jpg',
  '/assets/gallery-picks/146.jpg',
  '/assets/gallery-picks/151.jpg',
  '/assets/gallery-picks/164.jpg',
  '/assets/gallery-picks/168.jpg',
  '/assets/gallery-picks/171.jpg',
  '/assets/jen-beauty.jpg',
  '/assets/jen-headshot-bw.jpg',
  '/assets/gallery-new/new_05.jpg',
  '/assets/gallery-new/new_16.jpg',
  '/assets/gallery-new/new_28.jpg',
  '/assets/gallery-picks/160.jpg',
]);

// Every photo defined above, in the November 3 order, minus slides Jen had
// already taken out (HIDDEN_SLIDE_SRC) and the November 5 removals.
const ALL_SLIDES = [...HOLLYWOOD, ...PORTRAITS, ...FAMILY, ...FAMILY_OCT27, ...NOV3, ...GALLERY_NEW, ...PICKS, ...OCT26, ...CHILDHOOD]
  .filter((slide) => !HIDDEN_SLIDE_SRC.has(slide.src));

// November 5. Old numbers are the 92-slide gallery (1 / 92 on About Me).
// #1 Playboy stage, #61 glamour headshot (it stays on the About red carpet
// row), and the bodyboard photo whose watermark cannot be cropped off.
// #42, the blurred kids-and-dogs bed photo, is not in NOV3. Its file is deleted.
const OUT_OF_GALLERY = new Set([
  '/assets/gallery-hw/hw_01.jpg',
  '/assets/gallery-new/new_04.jpg',
  '/assets/gallery-new/new_14.jpg',
]);

const SLIDES = ALL_SLIDES.filter((slide) => !OUT_OF_GALLERY.has(slide.src));

const INTERVAL_MS = 4000;
// Never enlarge a file more than this, so small photos stay sharp.
const MAX_UPSCALE = 1.6;

// The displayed width of a slide: as wide as the stage allows, as tall as
// the stage allows, never more than MAX_UPSCALE times the file's own width.
// --g-max-w and --g-max-h come from .gallery-stage in globals.css.
function slideStyle(item) {
  const ratio = item.width / item.height;
  return {
    '--g-w': `min(var(--g-max-w), calc(var(--g-max-h) * ${ratio.toFixed(4)}), ${Math.round(item.width * MAX_UPSCALE)}px)`,
  };
}

// Width hint for the image service, so a phone never downloads a desktop file.
function slideSizes(item) {
  const ratio = item.width / item.height;
  const desktop = Math.min(900, Math.round(860 * ratio), Math.round(item.width * MAX_UPSCALE));
  return `(max-width: 759px) calc(100vw - 34px), ${desktop}px`;
}

function Chevron({ direction }) {
  const d = direction === 'prev' ? 'M14 5 L7 12 L14 19' : 'M10 5 L17 12 L10 19';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PhotoGallery({ showTitle = true } = {}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const stageRef = useRef(null);
  const touchRef = useRef(null);

  const go = useCallback((step) => {
    setIndex((current) => (current + step + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slide = params.get('slide');
    const number = Number.parseInt(params.get('photo') || '', 10);
    let start = -1;
    if (slide) start = SLIDES.findIndex((item) => item.src === slide);
    else if (number >= 1 && number <= SLIDES.length) start = number - 1;
    if (start >= 0) {
      setIndex(start);
      setPaused(true);
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotion = () => setReduceMotion(motion.matches);
    applyMotion();
    motion.addEventListener('change', applyMotion);

    const stage = stageRef.current;
    const view = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 },
    );
    if (stage) view.observe(stage);

    return () => {
      motion.removeEventListener('change', applyMotion);
      view.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || !inView) return undefined;
    const id = window.setInterval(() => go(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, inView, index, go]);

  const onTouchStart = (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
    setPaused(true);
  };

  const onTouchEnd = (event) => {
    const start = touchRef.current;
    touchRef.current = null;
    setPaused(false);
    if (!start) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx > 0 ? -1 : 1);
  };

  const onTouchCancel = () => {
    touchRef.current = null;
    setPaused(false);
  };

  const onBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
  };

  const count = SLIDES.length;
  const slide = SLIDES[index];
  const nearby = [-1, 0, 1].map((offset) => {
    const i = (index + offset + count) % count;
    return { offset, slide: SLIDES[i] };
  });

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    }
  };

  return (
    <section id="gallery" className="gallery-band" aria-labelledby="gallery-heading">
      <div className="wrap">
        <h2 id="gallery-heading" className={showTitle ? undefined : 'visually-hidden'}>Gallery</h2>
        <div
          ref={stageRef}
          className="gallery-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        >
          <button
            type="button"
            className="gallery-arrow gallery-arrow--prev"
            aria-label="Previous photo"
            onClick={() => go(-1)}
          >
            <Chevron direction="prev" />
          </button>

          <div
            className="gallery-area"
            role="group"
            aria-roledescription="carousel"
            aria-label={`Photo ${index + 1} of ${count}`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
          >
            <div className="gallery-frame">
              <div className="gallery-viewport">
                {nearby.map(({ offset, slide: item }) => (
                  <div
                    key={item.src}
                    className={`gallery-slide${offset === 0 ? ' is-active' : ''}`}
                    aria-hidden={offset === 0 ? undefined : true}
                    style={slideStyle(item)}
                  >
                    <Image
                      src={item.src}
                      alt={offset === 0 ? item.alt : ''}
                      width={item.width}
                      height={item.height}
                      sizes={slideSizes(item)}
                      quality={85}
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="gallery-meta">
            {slide.caption ? <p className="gallery-caption">{slide.caption}</p> : null}
            <p className="gallery-count" aria-hidden="true">{index + 1} / {count}</p>
          </div>

          <button
            type="button"
            className="gallery-arrow gallery-arrow--next"
            aria-label="Next photo"
            onClick={() => go(1)}
          >
            <Chevron direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
