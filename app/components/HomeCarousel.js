'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import './home-carousel.css';

// Homepage featured photos (Jen, November 2026): her candid portrait, family
// and the rescue dogs, and the book. It sits below Story · Voice · Heart, away
// from the hero portrait. Every photo is shown whole at its own ratio, one
// height, with quiet arrows and dots; no autoplay. No children's faces: the
// pajamas photo shows the kids from behind and the beach photo keeps the blur.
// To change the photos, edit this list (width/height are the file's pixels).
export const HOME_SLIDES = [
  { src: '/assets/presskit-headshot-floral.jpg', width: 1100, height: 1370, alt: 'Jen Walcott Archuleta' },
  { src: '/assets/dogs.jpg', width: 1400, height: 786, alt: 'Jen’s five rescue dogs together in the garden' },
  { src: '/assets/gallery-oct26/pajamas.jpg', width: 1296, height: 1164, alt: 'The family in matching Christmas pajamas' },
  { src: '/assets/gallery-oct26/dog-tortoise.jpg', width: 1320, height: 1320, alt: 'A dog on a tortoise' },
  { src: '/assets/gallery/family-beach-hands.jpg', width: 954, height: 1217, alt: 'Jen and her daughter on the beach' },
  { src: '/assets/quiet-mornings.jpg', width: 1248, height: 1400, alt: 'Jen resting with one of her rescue dogs' },
  { src: '/assets/book-cover.jpg', width: 1000, height: 1500, alt: 'Beyond the Velvet Ropes book cover', href: '/book' },
];

export default function HomeCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = HOME_SLIDES.length;

  const goTo = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children);
    if (!slides.length) return;
    const next = (index + slides.length) % slides.length;
    const el = slides[next];
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({
      left: el.offsetLeft - (track.clientWidth - el.clientWidth) / 2,
      behavior: reduce ? 'auto' : 'smooth',
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDistance = Infinity;
        Array.from(track.children).forEach((el, i) => {
          const distance = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = i;
          }
        });
        setActive(best);
      });
    };
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="home-carousel" aria-roledescription="carousel" aria-label="Featured photos">
      <div className="hc-stage">
        <button type="button" className="hc-arrow hc-prev" aria-label="Previous photo" onClick={() => goTo(active - 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <ul className="hc-track" ref={trackRef}>
          {HOME_SLIDES.map((slide, i) => {
            const img = (
              <Image
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                sizes="(max-width: 760px) 80vw, 480px"
                quality={82}
              />
            );
            return (
              <li
                key={slide.src}
                className="hc-slide"
                style={{ aspectRatio: `${slide.width} / ${slide.height}` }}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
              >
                {slide.href ? <a href={slide.href}>{img}</a> : img}
              </li>
            );
          })}
        </ul>
        <button type="button" className="hc-arrow hc-next" aria-label="Next photo" onClick={() => goTo(active + 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      <div className="hc-dots">
        {HOME_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            className={`hc-dot${i === active ? ' is-active' : ''}`}
            aria-label={`Show photo ${i + 1} of ${count}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
      <p className="hc-more"><a href="/about#gallery">See the full gallery →</a></p>
    </section>
  );
}
