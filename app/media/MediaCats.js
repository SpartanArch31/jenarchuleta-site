'use client';

import { useEffect, useState } from 'react';

const CATS = [
  { href: '#press', label: 'Press' },
  { href: '#film', label: 'Film' },
  { href: '#speaking', label: 'Speaking' },
  { href: '#social', label: 'Social and sign up' },
  { href: '#contact', label: 'Contact' },
  { href: '#forever-angels', label: 'Get involved' },
];

export default function MediaCats() {
  const [hash, setHash] = useState('#press');

  useEffect(() => {
    const read = () => setHash(window.location.hash || '#press');
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  return (
    <nav className="media-cats" aria-label="Press">
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
