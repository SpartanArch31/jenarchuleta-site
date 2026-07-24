'use client';
import { useEffect, useRef } from 'react';

/*
 * Kit (ConvertKit) inline form. Kit's index.js injects the form relative to
 * its own <script> tag, so we mount a container and append the script into it.
 */
export default function KitInlineForm({ uid }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.loaded === '1' || !uid) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://jennifer-archuleta.kit.com/${uid}/index.js`;
    s.dataset.uid = uid;
    el.appendChild(s);
    el.dataset.loaded = '1';
  }, [uid]);

  return (
    <>
      <div ref={ref} className="kit-inline" />
      <p className="foot-meta" style={{ marginTop: '10px' }}>
        By subscribing, you agree to our <a href="/privacy">Privacy Policy</a>.
      </p>
    </>
  );
}
