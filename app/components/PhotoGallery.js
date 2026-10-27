'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import captions from '../velvet/captions.json';
import sizes from '../velvet/slide-sizes.json';

// One slideshow. The Hollywood set is first, together, so those slides
// lead. Then portraits that are not already on the homepage or About
// (the About portrait is presskit-headshot-floral, so it is not a slide), then
// Velvet Circle photos, then gallery-new. A file stays in the repo when
// its slide is left out. /velvet still reads captions.json.
// Out of this slideshow:
// presskit-headshot-glam (home hero). jen-glam, jen-fitness, jen-sultry,
// and jen-fun2 (the homepage photo row; the row itself stays). jen-fun
// (group of adults, not a dog photo). jen-bw-coat and velvet 07 (the coat
// already in the story section as jen-bw-coat2). 08 and 44 are already
// out of captions.json. 09 stays on /velvet. 24, 25, and 26 show the kids
// and stay on /velvet only. 27 and 45 are dog photos on /pups. 43 is the
// same Urban Axes outing as gallery-new new_24, so new_24 stays.
// gallery-new left out: new_02, new_10, new_11, new_12, new_15, new_17,
// new_20, new_21, new_26, new_27. new_27 stays out. It is not the same
// photo as velvet 34. new_17, new_20, and new_21 repeat the
// Childhelp luncheon in velvet 37, which stays. new_10, new_11, and
// new_12 are on /pups. new_01, new_29, new_30, new_32, and new_33 are not
// in the repo. Faces are unretouched. Each slide is the whole file at its
// real ratio. Do not cover-crop these into a shared frame. Only the
// current slide and its two neighbors are mounted.
const BLANK_ALT = 'Photo from Jen’s personal collection';

// Long edge already at or under 1600. Stored at the original size.
const HOLLYWOOD = [
  {
    src: '/assets/gallery-hw/hw_01.jpg',
    alt: 'On stage at Playboy’s Rock the Rabbit party, SXSW',
    caption: 'On stage at Playboy’s Rock the Rabbit party, SXSW',
    width: 1242,
    height: 781,
  },
  {
    src: '/assets/gallery-hw/hw_02.jpg',
    alt: 'Jen Walcott Archuleta on a red carpet',
    width: 1320,
    height: 1067,
  },
  {
    src: '/assets/gallery-hw/hw_03.jpg',
    alt: 'With Tommy Lee',
    caption: 'With Tommy Lee',
    width: 960,
    height: 998,
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
    width: 1320,
    height: 1290,
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
    height: 817,
  },
  {
    src: '/assets/gallery-hw/hw_09.jpg',
    alt: 'Jen Walcott Archuleta',
    width: 786,
    height: 1577,
  },
];

const PORTRAITS = [
  {
    src: '/assets/jen-joy.jpg',
    alt: 'Jen Walcott Archuleta',
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

// These stay in captions.json so /velvet still shows them.
const HOME_ONLY_SKIP = new Set([
  '07.jpg',
  '09.jpg',
  '24.jpg',
  '25.jpg',
  '26.jpg',
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

// October 27 family photos, after the velvet family slides. Full files, unedited.
const FAMILY_OCT27 = [
  { src: '/assets/gallery/family-beach-hands.jpg', alt: 'Jen and her daughter on the beach', width: 1320, height: 1217 },
  { src: '/assets/gallery/girls-beach-walk.jpg', alt: 'Walking on the beach', width: 283, height: 502 },
  { src: '/assets/gallery/girls-beach-rompers.jpg', alt: 'On the beach', width: 295, height: 407 },
  { src: '/assets/gallery/pool-sombreros.jpg', alt: 'At the pool', width: 295, height: 391 },
];

const GALLERY_NEW = [
  { src: '/assets/gallery-new/new_03.jpg', alt: 'Jen Walcott Archuleta holding her book', width: 1062, height: 1600 },
  { src: '/assets/gallery-new/new_04.jpg', alt: 'Jen Walcott Archuleta in a white dress', width: 1320, height: 1537 },
  { src: '/assets/gallery-new/new_05.jpg', alt: 'Jen Walcott Archuleta on a red carpet', width: 1280, height: 1600 },
  { src: '/assets/gallery-new/new_06.jpg', alt: 'Jen Walcott Archuleta in a black coat', width: 1065, height: 1600 },
  { src: '/assets/gallery-new/new_07.jpg', alt: 'Jen Walcott Archuleta in a black and white portrait', width: 1266, height: 1600 },
  { src: '/assets/gallery-new/new_08.jpg', alt: 'Jen Walcott Archuleta holding her book at a signing', width: 869, height: 1232 },
  { src: '/assets/gallery-new/new_09.jpg', alt: 'Jen Walcott Archuleta with her husband', width: 1320, height: 837 },
  { src: '/assets/gallery-new/new_13.jpg', alt: 'Jen Walcott Archuleta in a black dress', width: 845, height: 1600 },
  { src: '/assets/gallery-new/new_14.jpg', alt: 'Jen Walcott Archuleta in a car', width: 1097, height: 1600 },
  { src: '/assets/gallery-new/new_16.jpg', alt: 'Jen Walcott Archuleta laughing outdoors', width: 1168, height: 1460 },
  { src: '/assets/gallery-new/new_18.jpg', alt: 'Jen Walcott Archuleta in a black blazer', width: 827, height: 1002 },
  { src: '/assets/gallery-new/new_19.jpg', alt: 'Jen Walcott Archuleta on a red carpet', width: 1200, height: 1600 },
  { src: '/assets/gallery-new/new_22.jpg', alt: 'Jen Walcott Archuleta signing a copy of her book', width: 1224, height: 917 },
  { src: '/assets/gallery-new/new_23.jpg', alt: 'Jen Walcott Archuleta at an outdoor book signing', width: 828, height: 934 },
  { src: '/assets/gallery-new/new_24.jpg', alt: 'Jen Walcott Archuleta with her book', width: 828, height: 831 },
  { src: '/assets/gallery-new/new_25.jpg', alt: 'Jen Walcott Archuleta on a red carpet in a white dress', width: 1600, height: 1200 },
  { src: '/assets/gallery-new/new_28.jpg', alt: 'Jen Walcott Archuleta in a black dress', width: 829, height: 1600 },
  { src: '/assets/gallery-new/new_34.jpg', alt: 'Jen Walcott Archuleta with her husband', width: 1179, height: 1100 },
  { src: '/assets/gallery-new/new_35.jpg', alt: 'Jen Walcott Archuleta in a white dress', width: 1320, height: 1296 },
  { src: '/assets/gallery-new/new_36.jpg', alt: 'Jen Walcott Archuleta with her husband', width: 1320, height: 1607 },
  { src: '/assets/gallery-new/new_37.jpg', alt: 'Jen Walcott Archuleta on a red carpet', width: 790, height: 2000 },
  { src: '/assets/gallery-new/new_38.jpg', alt: 'Jen Walcott Archuleta in a black dress', width: 1500, height: 2000 },
];

// Added after the existing slides, in numeric order. 113 and 116 are
// the same pictures as hw_01 and hw_06, so they are not repeated here.
// 118 is the same photo as gallery-new/new_10.jpg, a pup photo on /pups.
// Jen removed nine of these (old slides 65, 68, 72, 77, 79, 82, 88, 92, 94).
// 65 and 68 are different photos, so both are gone. The files left the
// repo because nothing else referenced them.
// Later gallery numbers, before this cut: 66 (129.jpg), 69 (137.jpg),
// and 82 (169.jpg) are out. 75, 78, and 80 keep their captions.
const PICKS = [
  { src: '/assets/gallery-picks/123.jpg', alt: 'Jen Walcott Archuleta in a black blazer', width: 1320, height: 1320 },
  { src: '/assets/gallery-picks/131.jpg', alt: 'Jen Walcott Archuleta', width: 234, height: 292 },
  { src: '/assets/gallery-picks/132.jpg', alt: 'Jen Walcott Archuleta with friends on stage', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/141.jpg', alt: 'Jen Walcott Archuleta', width: 1066, height: 1332 },
  { src: '/assets/gallery-picks/142.jpg', alt: 'Jen Walcott Archuleta', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/146.jpg', alt: 'Jen Walcott Archuleta', width: 664, height: 830 },
  { src: '/assets/gallery-picks/151.jpg', alt: 'Jen Walcott Archuleta', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/154.jpg', alt: 'Jen Walcott Archuleta', width: 640, height: 800 },
  { src: '/assets/gallery-picks/155.jpg', alt: 'Jen in Bangkok', caption: 'Jen in Bangkok', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/157.jpg', alt: 'Jen Walcott Archuleta', width: 808, height: 1010 },
  { src: '/assets/gallery-picks/158.jpg', alt: 'Jen Walcott Archuleta', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/159.jpg', alt: 'Childhelp', caption: 'Childhelp', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/160.jpg', alt: 'Jen Walcott Archuleta', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/164.jpg', alt: 'Costa Rica', caption: 'Costa Rica', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/168.jpg', alt: 'Jen Walcott Archuleta', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/171.jpg', alt: 'Jen Walcott Archuleta', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/175.jpg', alt: 'Jen Walcott Archuleta', width: 960, height: 884 },
];

// October 26 batch, after the picks, in Jen's order. Two files from
// that batch are not here: the ivy-door family photo is already
// velvet-carousel/26.jpg, and the five dogs under the bougainvillea
// are already dogs.jpg (and velvet/the-dogs.jpg). Full frames, long
// edge at most 1600, no upscaling.
const OCT26 = [
  { src: '/assets/gallery-oct26/wedding.jpg', alt: 'A wedding at sunset', width: 1070, height: 1147 },
  { src: '/assets/gallery-oct26/snow.jpg', alt: 'Jen Walcott Archuleta in the snow', width: 1320, height: 1266 },
  { src: '/assets/gallery-oct26/ski.jpg', alt: 'On a ski lift', width: 1217, height: 1600 },
  { src: '/assets/gallery-oct26/pajamas.jpg', alt: 'Christmas pajamas', width: 1320, height: 1164 },
  { src: '/assets/gallery-oct26/hug.jpg', alt: 'A family hug', width: 851, height: 1527 },
  { src: '/assets/gallery-oct26/lawn.jpg', alt: 'On the lawn', width: 1320, height: 1461 },
  { src: '/assets/gallery-oct26/jet-cabin.jpg', alt: 'Inside a private jet', width: 1029, height: 845 },
  { src: '/assets/gallery-oct26/jet-stairs.jpg', alt: 'On the stairs of a private jet', width: 1320, height: 1271 },
  { src: '/assets/gallery-oct26/hangar.jpg', alt: 'A plane in the hangar', width: 922, height: 1263 },
  { src: '/assets/gallery-oct26/jet-seats.jpg', alt: 'Seated inside a private jet', width: 1320, height: 1454 },
  { src: '/assets/gallery-oct26/beach.jpg', alt: 'A beach with palm trees', width: 1320, height: 1165 },
  { src: '/assets/gallery-oct26/cliff.jpg', alt: 'Above the ocean', width: 1320, height: 1597 },
  { src: '/assets/gallery-oct26/tree.jpg', alt: 'A Christmas tree', width: 1320, height: 1216 },
  { src: '/assets/gallery-oct26/driveway.jpg', alt: 'On the driveway', width: 1320, height: 1301 },
  { src: '/assets/gallery-oct26/dog-tortoise.jpg', alt: 'A dog on a tortoise', width: 1320, height: 1327 },
  { src: '/assets/gallery-oct26/tortoise.jpg', alt: 'A tortoise with greens', width: 665, height: 940 },
];

// After every earlier slide. Place captions, same style as Costa Rica.
const PLACES = [
  { src: '/assets/gallery-places/ozarks-canoe.jpg', alt: 'Ozarks', caption: 'Ozarks', width: 940, height: 1140 },
  { src: '/assets/gallery-places/muskoka-boat.jpg', alt: 'Muskoka, Canada', caption: 'Muskoka, Canada', width: 842, height: 1075 },
];

// Childhood portrait. The Hollywood set stays first, so this follows every earlier slide.
const CHILDHOOD = [
  { src: '/assets/gallery-childhood/jen-childhood.jpg', alt: 'Jen as a girl', width: 600, height: 600 },
];

// Oct 27: current slides 68, 69, and 73 leave the slideshow. Files stay in the repo.
// 68 gallery-picks/141.jpg, 69 gallery-picks/142.jpg, 73 gallery-picks/155.jpg (Jen in Bangkok).
// Duplicate pairs: one copy stays, the sharper or higher-detail file.
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
]);

const SLIDES = [...HOLLYWOOD, ...PORTRAITS, ...FAMILY, ...FAMILY_OCT27, ...GALLERY_NEW, ...PICKS, ...OCT26, ...PLACES, ...CHILDHOOD]
  .filter((slide) => !HIDDEN_SLIDE_SRC.has(slide.src));

// Slides 19 and 27 of the 59-photo order (before the Hollywood set was
// added). Those two stay fully visible: native img, no max-height crop.
const UNCROPPED = new Set([
  '/velvet-carousel/20.jpg',
  '/velvet-carousel/32.jpg',
]);

const INTERVAL_MS = 4000;

function Chevron({ direction }) {
  const d = direction === 'prev' ? 'M14 5 L7 12 L14 19' : 'M10 5 L17 12 L10 19';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PhotoGallery() {
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
    const slide = new URLSearchParams(window.location.search).get('slide');
    if (slide) {
      const start = SLIDES.findIndex((item) => item.src === slide);
      if (start >= 0) {
        setIndex(start);
        setPaused(true);
      }
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
        <h2 id="gallery-heading">Gallery</h2>
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
            className="gallery-frame"
            role="group"
            aria-roledescription="carousel"
            aria-label={`Photo ${index + 1} of ${count}`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
          >
            <div className="gallery-viewport">
              {nearby.map(({ offset, slide: item }) => {
                const full = UNCROPPED.has(item.src);
                const portrait = item.height > item.width;
                return (
                  <div
                    key={item.src}
                    className={`gallery-slide${offset === 0 ? ' is-active' : ''}${full ? ' is-full' : ''}${portrait ? ' is-portrait' : ''}`}
                    aria-hidden={offset === 0 ? undefined : true}
                  >
                    {full ? (
                      <img
                        src={item.src}
                        alt={offset === 0 ? item.alt : ''}
                        width={item.width}
                        height={item.height}
                      />
                    ) : (
                      <Image
                        src={item.src}
                        alt={offset === 0 ? item.alt : ''}
                        width={item.width}
                        height={item.height}
                        sizes="(max-width: 760px) 86vw, 440px"
                        {...(offset === 0 && index === 0 ? { priority: true } : { loading: 'eager' })}
                      />
                    )}
                  </div>
                );
              })}
            </div>
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
