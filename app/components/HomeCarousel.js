'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import './home-carousel.css';

// Homepage featured photos (Jen, November 2026): family and the rescues.
// The book cover stays on the Book page. The candid floral
// portrait is the hero photo now (November 3), so it is not repeated here.
// Every photo is shown whole at its own ratio, one height, with quiet arrows
// and dots; no autoplay. Children: only Jen's own files with the kids' faces
// blurred (gallery-nov3). Never add a photo that shows a child's face.
// November 3: the old blurred bed photo (01-sleeping-dogs) is gone for good.
// To change the photos, edit this list (width/height are the file's pixels).
export const HOME_SLIDES = [
  { src: '/assets/dogs.jpg', width: 1400, height: 786, alt: 'Jen’s five rescues together in the garden' },
  { src: '/assets/gallery-nov3/03-wedding-beach.jpg', width: 1308, height: 1319, alt: 'Jen and Adam on their wedding day, on the beach at sunset' },
  { src: '/assets/gallery-oct26/dog-tortoise.jpg', width: 1320, height: 1320, alt: 'A rescue on a tortoise' },
  { src: '/assets/gallery-nov3/02-beach-kiss.jpg', width: 951, height: 1761, alt: 'A kiss on the beach' },
  { src: '/assets/gallery-nov3/08-volcano-railing.jpg', width: 1316, height: 739, alt: 'The family looking out at the mountains' },
  { src: '/assets/quiet-mornings.jpg', width: 1248, height: 1400, alt: 'Jen resting with one of her rescues' },
];

export default function HomeCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = HOME_SLIDES.length;

  const goTo = useCallback((index, instant = false) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children);
    if (!slides.length) return;
    const next = (index + slides.length) % slides.length;
    const el = slides[next];
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    // Centered row (Adam, Nov 10): put the chosen photo in the middle.
    track.scrollTo({
      left: el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2,
      behavior: reduce || instant ? 'auto' : 'smooth',
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // The active slide is the one nearest the middle of the row.
        const middle = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDistance = Infinity;
        const slides = Array.from(track.children);
        slides.forEach((el, i) => {
          const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - middle);
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
    // Start with the first photo centered (the track's 50% padding would
    // otherwise leave it starting at the middle of the page).
    goTo(0, true);
    // Photos load after first paint and change the slide widths; re-center.
    const imgs = Array.from(track.querySelectorAll('img'));
    const recenter = () => { if (track.scrollLeft < track.clientWidth / 2) goTo(0, true); };
    imgs.forEach((img) => { if (!img.complete) img.addEventListener('load', recenter, { once: true }); });
    update();
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(frame);
    };
  }, [goTo]);

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
                sizes="(max-width: 760px) 88vw, 900px"
                quality={82}
              />
            );
            return (
              <li
                key={slide.src}
                className="hc-slide"
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
