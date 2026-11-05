'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
// ONE navigation for the whole site, every page, light or dark.
// Main: Home | About Me | Book | Podcast | My Journals | Media & Contact | Shop
// The Velvet Letter is not in the menu. /velvet stays unlisted.
// Media, social signup, and contact are one page (/media). /contact redirects there.
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
      { href: '/about#gallery', label: 'Gallery' },
      { href: '/forever-angels', label: 'Giving back' },
    ],
  },
  {
    id: 'book',
    href: '/book',
    label: 'Book',
    items: [
      { href: '/book', label: 'Get the book' },
      { href: '/media#social', label: 'Get the first chapter free' },
      { href: '/book#trailer', label: 'Watch the trailer' },
      { href: '/book#who', label: 'Who this book is for' },
      { href: '/book#reviews', label: 'Leave a review' },
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
    label: 'Media & Contact',
    also: ['/contact'],
    alignEnd: true,
    items: [
      { href: '/media#media', label: 'Media' },
      { href: '/media#social', label: 'Social media and sign up' },
      { href: '/media#contact', label: 'Contact me' },
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
                      <a href={item.href} onClick={close}>
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
          <a href="/media#social" className="btn btn-primary nav-chapter" onClick={close}>
            Get the first chapter free
          </a>
        </div>
      </div>
    </nav>
  );
}
