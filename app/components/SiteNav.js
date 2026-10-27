'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

// ONE navigation for the whole site, every page, light or dark.
// Main: Home | About | Book | Podcast | Journal | Media | Shop | The Velvet Letter
// Everything else (Speaking, Quotes, Sponsors, Contact, Free First Chapter,
// The Forever Angels) lives in the footer. See SiteFooter.js.
// Desktop: inline links. Narrow screens: hamburger toggles a dropdown.
const LINKS = [
  { href: '/', label: 'Home', home: true },
  { href: '/about', label: 'About' },
  { href: '/book', label: 'Book' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/journal', label: 'Journal' },
  { href: '/media', label: 'Media' },
  { href: '/shop', label: 'Shop' },
];

function isCurrent(pathname, href) {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNav({ homeHref = '/' }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <nav className="nav nav--collapsible" aria-label="Main">
      <div className="nav-inner">
        <a href={homeHref} className="brand" onClick={close}>Jen Archuleta</a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="nav-links" className={`nav-links${open ? ' open' : ''}`}>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.home ? homeHref : link.href}
              aria-current={isCurrent(pathname, link.href) ? 'page' : undefined}
              onClick={close}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/velvet"
            className="nav-velvet"
            aria-current={isCurrent(pathname, '/velvet') ? 'page' : undefined}
            onClick={close}
          >
            <svg className="nav-key" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="8.2" cy="8.2" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
              <path d="M11.6 11.2 L20 19.2 M15.6 16.4 L18.4 19.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            The Velvet Letter
          </a>
        </div>
      </div>
    </nav>
  );
}
