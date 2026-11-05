'use client';

import { useEffect, useState } from 'react';

const CATS = [
  { href: '#media', label: 'Media' },
  { href: '#social', label: 'Social media and sign up' },
  { href: '#contact', label: 'Contact me' },
];

// Three buttons at the top of /media. Each one jumps to that part of the page.
export default function MediaCats() {
  const [hash, setHash] = useState('#media');

  useEffect(() => {
    const read = () => setHash(window.location.hash || '#media');
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  return (
    <nav className="media-cats" aria-label="Media and contact">
      {CATS.map((cat) => {
        const current = hash === cat.href;
        return (
          <a key={cat.href} href={cat.href} className={current ? 'is-active' : ''} aria-current={current ? 'true' : undefined}>
            {cat.label}
          </a>
        );
      })}
    </nav>
  );
}
