'use client';

import { useEffect } from 'react';

/*
  ScrollReveal — drives the site's scroll-in reveals and the "threshold" draw.

  Why JS (IntersectionObserver) instead of pure-CSS `animation-timeline: view()`:
  the CSS scroll-timeline path proved unreliable across browsers, so we use the
  universally-supported IntersectionObserver + CSS transitions instead.

  Contract with motion.css:
    - Nothing is hidden until this adds `reveal-ready` to <html>. If JS never
      runs (or is disabled), the page stays fully visible and static — no risk
      of stranded, invisible content.
    - Reveal targets get `.jr` (fade+rise) or `.jr .jr-img` (fade+scale).
    - Hero copy children get `.jr-hero` for a staggered transition-delay.
    - Each `.threshold-rule` gets `.jr-threshold` (its gold lines draw in).
    - When an element scrolls into view we add `.is-in`, which the CSS animates
      to, then we stop observing it (reveal once).
    - Respects prefers-reduced-motion: if reduce is set we do nothing at all.
*/

const REVEAL = [
  // home
  '.tagline .q',
  '.pillars .p',
  '#book .inner > div:nth-child(2)',
  '.trailer-feature .tf-copy',
  '#story .story-grid > div:first-child',
  '.creed .lead',
  '.creed li',
  '#journal > .center',
  '#shop > .center',
  '.cards-3 .mini',
  '.capture .text-wrap',
  '.pull',
  // book
  '.who .text-wrap',
  '.who li',
  // about
  '.tim-band-inner > div',
  '.tim-then > div:last-child',
  '.tim-faith-inner > *',
  '.tim-hi .tim-card > div',
  '.tim-joy',
].join(',');

// NOTE: the heroes (copy + portrait/cover) are intentionally NOT reveal
// targets — they animate on load via pure-CSS keyframes in motion.css.
// Tagging them here too would double-animate them (keyframe vs transition).
const REVEAL_IMG = [
  '.book-cover',
  '.trailer-feature .tf-video',
  '#story .story-grid .ph img',
  '.tim-then .tim-gray',
  '.tim-slot-wrap',
].join(',');

const THRESHOLD = '.threshold-rule';

export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Respect the user's OS setting — no motion, keep everything visible.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const root = document.documentElement;
    const targets = new Set();

    const mark = (selector, ...classes) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add(...classes);
        targets.add(el);
      });
    };

    mark(REVEAL, 'jr');
    mark(REVEAL_IMG, 'jr', 'jr-img');
    mark(THRESHOLD, 'jr-threshold');

    // Flip the switch that lets motion.css apply the hidden start states.
    root.classList.add('reveal-ready');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    targets.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
