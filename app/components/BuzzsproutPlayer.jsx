'use client';
import { useEffect, useRef } from 'react';

/*
 * Buzzsprout native "large" player — auto-lists every episode with a player.
 * The Buzzsprout script populates a container found by id, so we mount the
 * container first, then inject the script into it.
 */
export default function BuzzsproutPlayer({ showId }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.loaded === '1' || !showId) return;
    const s = document.createElement('script');
    s.src = `https://www.buzzsprout.com/${showId}.js?container_id=buzzsprout-large-player&player=large`;
    s.charset = 'utf-8';
    s.async = true;
    el.appendChild(s);
    el.dataset.loaded = '1';
  }, [showId]);

  return <div id="buzzsprout-large-player" ref={ref} />;
}
