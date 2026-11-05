'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { KIT_FREE_CHAPTER_URL } from './site-data';

// ONE navigation for the whole site, every page, light or dark.
// Main: Home | About Me | Book | Podcast | My Journals | Media | Shop
// Each main page has a drop-down of its sections (Jen, November 3: "so people
// can jump straight to the sections they want"). The section links point at
// ids on those pages; if you rename or remove a section, update its link here.
// Simplified (Nov 2026): The Velvet Letter lives in the Book drop-down (it comes
// with the book; the QR code in the book goes straight to /velvet), About the
// Author sits with Media and the press kit, Film and documentary is only under
// Media, and each link appears once.
// Everything else (Gallery, Pups of the Podcast, Speaking, Quotes, Sponsors,
// Contact, Free First Chapter, The Forever Angels) is also in the footer, the
// same on every page. See SiteFooter.js.
// Desktop: inline links; a drop-down opens on hover or with its arrow button.
// Narrow screens: the hamburger opens the menu, and each arrow opens that
// page's sections underneath it.
const MENU = [
  { href: '/', label: 'Home', home: true },
  {
    id: 'about',
    href: '/about',
    label: 'About Me',
    items: [
      { href: '/about', label: 'About me' },
      { href: '/about#gallery', label: 'Photos' },
      { href: '/about#forever-angels', label: 'Giving back' },
    ],
  },
  {
    id: 'book',
    href: '/book',
    label: 'Book',
    also: ['/velvet'],
    items: [
      { href: '/book', label: 'Get the book' },
      // Jen, November 3: the free first chapter belongs in the main menu.
      { href: KIT_FREE_CHAPTER_URL, label: 'Get the first chapter free' },
      { href: '/book#trailer', label: 'Watch the trailer' },
      { href: '/book#who', label: 'Who this book is for' },
      { href: '/book#reviews', label: 'Leave a review' },
      { href: '/velvet', label: 'The Velvet Letter', icon: 'key' },
    ],
  },
  {
    id: 'podcast',
    href: '/podcast',
    label: 'Podcast',
    items: [
      { href: '/podcast#episodes', label: 'All 13 episodes' },
      { href: '/pups', label: 'Pups of the Podcast' },
      { href: '/sponsors', label: 'Sponsors' },
    ],
  },
  { href: '/journal', label: 'My Journals' },
  {
    id: 'media',
    href: '/media',
    label: 'Media',
    also: ['/about-the-author', '/contact'],
    alignEnd: true,
    items: [
      { href: '/media#film', label: 'Film and documentary' },
      { href: '/media#press', label: 'Press coverage' },
      { href: '/media#interviews', label: 'Interviews and appearances' },
      { href: '/media#speaking', label: 'Speaking' },
      { href: '/media#press-kit', label: 'Press kit and photos' },
      { href: '/about-the-author', label: 'About the Author' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    id: 'shop',
    href: '/shop',
    label: 'Shop',
    alignEnd: true,
    items: [
      { href: '/shop#signed-copy', label: 'Signed copy' },
      { href: '/shop#velvet-circle', label: 'The Velvet Circle Book Club' },
      { href: '/shop#bookmark', label: 'The Signature Velvet Bookmark' },
      { href: '/shop#velvet-circle-faq', label: 'Book Club FAQs' },
    ],
  },
];

const DESKTOP = '(min-width: 1024px)';

function isCurrent(pathname, href) {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Caret() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The Velvet Letter's small gold key, kept on its menu link.
function Key() {
  return (
    <svg className="nav-key" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8.2" cy="8.2" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M11.6 11.2 L20 19.2 M15.6 16.4 L18.4 19.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function SiteNav({ homeHref = '/' }) {
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState(null);
  const pathname = usePathname();
  const navRef = useRef(null);
  const leaveTimer = useRef(0);
  // How the open drop-down was opened: 'hover' (mouse) or 'click' (arrow
  // button or keyboard). A hover-opened one closes when the mouse leaves; a
  // clicked one stays until a second click, Escape, or a click elsewhere.
  const openedBy = useRef(null);

  const close = () => {
    setOpen(false);
    setOpenId(null);
  };

  const onCaret = (id) => () => {
    clearTimeout(leaveTimer.current);
    if (openId === id && openedBy.current === 'hover') {
      // The mouse already opened it; the click keeps it open.
      openedBy.current = 'click';
      return;
    }
    openedBy.current = 'click';
    setOpenId(openId === id ? null : id);
  };

  // Close a drop-down on Escape or on a click anywhere outside the menu.
  useEffect(() => {
    if (!openId) return undefined;
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      const button = navRef.current?.querySelector(`[aria-controls="nav-sub-${openId}"]`);
      setOpenId(null);
      button?.focus();
    };
    const onPointer = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) setOpenId(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [openId]);

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  // Hover opens a drop-down only with a mouse on the desktop layout, so a tap
  // on a phone or tablet never opens and closes it in the same touch.
  const hoverable = (event) =>
    event.pointerType === 'mouse' && typeof window !== 'undefined' && window.matchMedia(DESKTOP).matches;

  const onEnter = (id) => (event) => {
    if (!hoverable(event)) return;
    clearTimeout(leaveTimer.current);
    if (openId === id) return;
    openedBy.current = 'hover';
    setOpenId(id);
  };
  const onLeave = (id) => (event) => {
    if (!hoverable(event) || openedBy.current !== 'hover') return;
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setOpenId((current) => (current === id ? null : current)), 180);
  };
  // Tabbing out of a drop-down closes it.
  const onBlur = (id) => (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setOpenId((current) => (current === id ? null : current));
  };

  return (
    <nav className="nav nav--collapsible" aria-label="Main" ref={navRef}>
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
          {MENU.map((link) => {
            const current =
              isCurrent(pathname, link.href) || (link.also || []).some((href) => isCurrent(pathname, href))
                ? 'page'
                : undefined;
            if (!link.items) {
              return (
                <a key={link.href} href={link.home ? homeHref : link.href} aria-current={current} onClick={close}>
                  {link.label}
                </a>
              );
            }
            const expanded = openId === link.id;
            return (
              <div
                key={link.href}
                className={`nav-item${expanded ? ' is-open' : ''}${link.alignEnd ? ' nav-item--end' : ''}`}
                onPointerEnter={onEnter(link.id)}
                onPointerLeave={onLeave(link.id)}
                onBlur={onBlur(link.id)}
              >
                <a href={link.href} aria-current={current} onClick={close}>
                  {link.label}
                </a>
                <button
                  type="button"
                  className="nav-caret"
                  aria-label={`${link.label} sections`}
                  aria-expanded={expanded}
                  aria-controls={`nav-sub-${link.id}`}
                  onClick={onCaret(link.id)}
                >
                  <Caret />
                </button>
                <ul id={`nav-sub-${link.id}`} className="nav-sub" hidden={!expanded}>
                  {link.items.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} onClick={close} className={item.icon === 'key' ? 'nav-velvet' : undefined}>
                        {item.icon === 'key' ? <Key /> : null}
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {/* Phones: the free first chapter sits at the bottom of the menu as a
              button. On a laptop it is in the Book drop-down. */}
          <a href={KIT_FREE_CHAPTER_URL} className="btn btn-primary nav-chapter" onClick={close}>
            Get the first chapter free
          </a>
        </div>
      </div>
    </nav>
  );
}
