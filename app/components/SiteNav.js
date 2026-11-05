'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import VelvetKey from './VelvetKey';
// Home, About Me, Book, Press, Journal, Podcast, Velvet Letter, Thank You.
// The Velvet Letter item opens /behind-the-velvet-ropes. /velvet stays unlisted.
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
    ],
  },
  {
    id: 'book',
    href: '/book',
    label: 'Book',
    items: [
      { href: '/book#buy', label: 'Buy the book' },
      { href: '/book#author', label: 'About the author' },
      { href: '/book#shop', label: 'Signed copies and more' },
    ],
  },
  {
    id: 'press',
    href: '/media',
    label: 'Press',
    also: ['/contact'],
    items: [
      { href: '/media#press', label: 'Press' },
      { href: '/media#film', label: 'Film and documentary' },
      { href: '/media#speaking', label: 'Speaking' },
      { href: '/media#social', label: 'Social and sign up' },
      { href: '/media#contact', label: 'Contact' },
      { href: '/media#forever-angels', label: 'Get involved' },
    ],
  },
  { href: '/journal', label: 'Journal' },
  {
    id: 'podcast',
    href: '/podcast',
    label: 'Podcast',
    also: ['/pups', '/sponsors'],
    items: [
      { href: '/podcast#episodes', label: 'Buzzsprout episodes' },
      { href: '/podcast#pups', label: 'Pups of the Podcast' },
      { href: '/pups', label: 'All the pups' },
      { href: '/podcast#sponsors', label: 'Sponsors' },
      { href: '/sponsors', label: 'All the sponsors' },
    ],
  },
  { href: '/behind-the-velvet-ropes', label: 'Velvet Letters', key: true },
  { href: '/thank-you', label: 'Thank You' },
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
                <a
                  key={link.href}
                  href={link.home ? homeHref : link.href}
                  className={link.key ? 'nav-with-key' : undefined}
                  aria-current={current}
                  onClick={close}
                >
                  {link.key ? <VelvetKey className="nav-key" /> : null}
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
        </div>
      </div>
    </nav>
  );
}
