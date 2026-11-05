'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// The 20s, Jen's final layout (November 5): one square photo on the page.
// Tapping it opens a slideshow of her 13 photos. The square is only the
// button; inside the slideshow every photo is the whole file at its own
// ratio, never cropped or stretched. The black coat photo sits above this on
// the page and is not repeated here. Order: the Ferrari first (Jen: coat,
// then the Ferrari), then the rest in Jen's numbering.
// 03 (race car) is the clean copy from earlier on November 5. Later Nov 5
// (Jen): the Air Bali helicopter photo is out; 10 and 11 are her closer
// crops of the FOX interview and turtleneck photos; 14 (bunnies) is new.
// Under the square: her caption, "A little glam, a lot of fun, and a life I love."
const PHOTOS = [
  { src: '/assets/twenties/12.jpg', width: 1320, height: 907, alt: 'Jen Archuleta with a red Ferrari' },
  { src: '/assets/twenties/01.jpg', width: 909, height: 605, alt: 'A crowd in front of the Playboy Mansion' },
  { src: '/assets/twenties/02.jpg', width: 1277, height: 728, alt: 'A group in front of the Playboy Mansion' },
  { src: '/assets/twenties/03.jpg', width: 1084, height: 858, alt: 'Jen Archuleta and friends with the Playboy race car' },
  { src: '/assets/twenties/04.jpg', width: 1320, height: 1264, alt: 'A party with Hugh Hefner' },
  { src: '/assets/twenties/05.jpg', width: 853, height: 2007, alt: 'Jen Archuleta in a ski snowsuit' },
  { src: '/assets/twenties/06.jpg', width: 1320, height: 1737, alt: 'Jen Archuleta on the beach in a sombrero' },
  { src: '/assets/twenties/07.jpg', width: 912, height: 1239, alt: 'Jen Archuleta at a golden temple in Bangkok' },
  { src: '/assets/twenties/09.jpg', width: 1025, height: 1459, alt: 'Jen Archuleta in a makeup chair' },
  { src: '/assets/twenties/10.jpg', width: 867, height: 1334, alt: 'Jen Archuleta giving an interview by a pool' },
  { src: '/assets/twenties/11.jpg', width: 944, height: 1274, alt: 'Jen Archuleta in a black turtleneck, close up' },
  { src: '/assets/twenties/13.jpg', width: 1320, height: 1309, alt: 'Jen Archuleta crowd surfing' },
  { src: '/assets/twenties/14.jpg', width: 604, height: 453, alt: 'A group of Playboy bunnies in white at a party' },
];

export default function TwentiesSlideshow() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const touchRef = useRef(null);
  const nextRef = useRef(null);
  const wasOpenRef = useRef(false);

  const go = useCallback((step) => {
    setIndex((current) => (current + step + PHOTOS.length) % PHOTOS.length);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // The page behind stays put while the slideshow is open.
      document.documentElement.classList.add('twenties-lock');
      nextRef.current?.focus();
    }
    if (!open) {
      if (dialog.open) dialog.close();
      document.documentElement.classList.remove('twenties-lock');
      if (wasOpenRef.current) openerRef.current?.focus();
    }
    wasOpenRef.current = open;
    return () => document.documentElement.classList.remove('twenties-lock');
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  const photo = PHOTOS[index];
  const next = PHOTOS[(index + 1) % PHOTOS.length];

  return (
    <div className="twenties-show">
      <button
        ref={openerRef}
        type="button"
        className="twenties-cover"
        onClick={() => { setIndex(0); setOpen(true); }}
        aria-label={`Open my 20s slideshow, ${PHOTOS.length} photos`}
      >
        <Image src={PHOTOS[0].src} alt="" fill sizes="(max-width: 600px) 86vw, 420px" quality={85} />
        {/* Adam, Nov 5: no "My 20s" label; a clear cue that the square opens. */}
        <span className="twenties-cover-cue" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <rect x="7" y="3" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 7v12a2 2 0 0 0 2 2h12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Tap to see the photos
        </span>
      </button>
      <p className="twenties-caption">A little glam, a lot of fun, and a life I love.</p>

      <dialog
        ref={dialogRef}
        className="twenties-dialog"
        aria-label="My 20s slideshow"
        onClose={close}
        onClick={(event) => {
          // A click on the dark area around the photo closes it.
          const t = event.target;
          if (t === event.currentTarget || t.classList?.contains('twenties-stage') || t.classList?.contains('twenties-figure')) close();
        }}
      >
        {open ? (
          <div
            className="twenties-stage"
            onTouchStart={(event) => {
              touchRef.current = event.touches.length === 1
                ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
                : null;
            }}
            onTouchCancel={() => { touchRef.current = null; }}
            onTouchEnd={(event) => {
              const start = touchRef.current;
              touchRef.current = null;
              if (!start) return;
              const dx = event.changedTouches[0].clientX - start.x;
              const dy = event.changedTouches[0].clientY - start.y;
              // Only a sideways swipe changes the photo.
              if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
            }}
          >
            <figure className="twenties-figure">
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 760px) 94vw, 900px"
                quality={85}
                priority
              />
            </figure>
            {/* Load the next photo early so the tap feels instant. */}
            <Image className="twenties-preload" src={next.src} alt="" width={next.width} height={next.height} sizes="(max-width: 760px) 94vw, 900px" quality={85} aria-hidden="true" />
            <div className="twenties-controls">
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
              <span aria-live="polite">{index + 1} / {PHOTOS.length}</span>
              <button ref={nextRef} type="button" onClick={() => go(1)} aria-label="Next photo">›</button>
            </div>
            <button type="button" className="twenties-close" onClick={close} aria-label="Close slideshow">×</button>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
