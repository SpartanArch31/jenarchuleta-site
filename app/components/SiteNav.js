'use client';

import { useState } from 'react';
import { KIT_FREE_CHAPTER_URL } from './site-data';

// Light-register site nav used on the homepage, /podcast and /journal.
// (The book page keeps its own minimal dark nav.)
// Desktop: inline links. Mobile (<=760px): hamburger toggles a dropdown.
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="nav nav--collapsible">
      <div className="nav-inner">
        <a href="/" className="brand" onClick={close}>Jen Archuleta</a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links${open ? ' open' : ''}`}>
          <a href="/about" onClick={close}>About</a>
          <a href="/book" onClick={close}>Book</a>
          <a href="/podcast" onClick={close}>Podcast</a>
          <a href="/journal" onClick={close}>Journal</a>
          <a href="/#speaking" onClick={close}>Speaking</a>
          <a href="/#shop" onClick={close}>Shop</a>
          <a href={KIT_FREE_CHAPTER_URL} className="btn btn-primary btn-sm" onClick={close}>Free Chapter</a>
        </div>
      </div>
    </nav>
  );
}
