'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

// Fun and travel first, with the mansion and party photos between them
// so the row is not all one kind of night. No on-screen captions.
const SLIDES = [
  { src: '/assets/twenties/01-ski.jpg', width: 853, height: 2007, alt: 'Jen Archuleta in a ski snowsuit' },
  { src: '/assets/twenties/02-mansion-group.jpg', width: 1277, height: 728, alt: 'A group in front of the mansion' },
  { src: '/assets/twenties/03-sombreros.jpg', width: 1320, height: 1737, alt: 'Jen Archuleta on the beach in a sombrero' },
  { src: '/assets/twenties/04-hef-party.jpg', width: 1320, height: 1264, alt: 'A party with Hugh Hefner' },
  { src: '/assets/twenties/05-air-bali.jpg', width: 1552, height: 1280, alt: 'Jen Archuleta beside an Air Bali helicopter' },
  { src: '/assets/twenties/06-mansion-crowd.jpg', width: 909, height: 605, alt: 'A crowd in front of the mansion' },
  { src: '/assets/twenties/07-ferrari.jpg', width: 1320, height: 907, alt: 'Jen Archuleta with a red Ferrari' },
  { src: '/assets/twenties/08-race-car.jpg', width: 1084, height: 858, alt: 'A Playboy race car' },
  { src: '/assets/twenties/09-crowd-surf.jpg', width: 1320, height: 1309, alt: 'Jen Archuleta crowd surfing' },
  { src: '/assets/twenties/10-fox-pool.jpg', width: 1320, height: 1334, alt: 'Jen Archuleta at a pool during a FOX interview' },
  { src: '/assets/twenties/11-makeup.jpg', width: 1025, height: 1459, alt: 'Jen Archuleta in a makeup chair' },
  { src: '/assets/twenties/12-turtleneck.jpg', width: 944, height: 1880, alt: 'Jen Archuleta in a black turtleneck' },
];

const INTERVAL_MS = 6000;

export default function TwentiesCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchRef = useRef(null);
  const count = SLIDES.length;
  const slide = SLIDES[index];

  const go = useCallback((step) => {
    setIndex((current) => (current + step + count) % count);
  }, [count]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(motion.matches);
    apply();
    motion.addEventListener('change', apply);
    return () => motion.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const id = window.setInterval(() => go(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, index, go]);

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

  return (
    <div
      className="twenties-carousel"
      aria-roledescription="carousel"
      aria-label="My 20s"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="twenties-stage">
        <button type="button" className="twenties-arrow twenties-prev" aria-label="Previous photo" onClick={() => go(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div
          className="twenties-frame"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            width={slide.width}
            height={slide.height}
            sizes="(max-width: 760px) 92vw, 1040px"
            quality={85}
            priority={index === 0}
          />
        </div>
        <button type="button" className="twenties-arrow twenties-next" aria-label="Next photo" onClick={() => go(1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      <div className="twenties-dots">
        {SLIDES.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className={`twenties-dot${i === index ? ' is-active' : ''}`}
            aria-label={`Show photo ${i + 1} of ${count}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => { setPaused(true); setIndex(i); }}
          />
        ))}
      </div>
    </div>
  );
}
