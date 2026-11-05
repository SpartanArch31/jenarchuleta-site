# Jen Archuleta — Website (jenarchuleta.com)

> **Read this first.** It's the operating guide for the whole site: what it is,
> where every file lives, how to change things, and how it deploys. A new
> session should be able to act on this without any prior context.
>
> **Other AIs (Cursor, Grok, and the like):** `AGENTS.md` has the rules that must never
> break; Cursor also loads `.cursor/rules/jen-site.mdc`. Jen makes her own changes with
> Cursor: branch, pull request, check the preview, merge (Nov 2026).

_Last updated: 2026-11-03, night (Shop: every offer says what you get, the total price, and when it ships or starts). Before that, same evening: About Me in Jen's words, About the Author page, gallery of 19, nothing repeated, no em dashes._

## ⭐ Jen's standing rules from November 3 (evening). Read before writing any copy.

- **No em dashes anywhere** on the site: body copy, headings, buttons, captions, alt text,
  and page titles (the title template is "%s, Jen Archuleta"). Use a period or a comma.
  Journal and Velvet Letter text is cleaned at render time (`repair-body.mjs`,
  `VelvetInside.js`).
- **Nothing repeated.** The film and documentary news has ONE home: Media `#film`, with Jen's
  FilmFreeway link right under Leone and Mark. The Book page, homepage, and About the Author
  link there. The podcast's "Honest conversations..." line lives on the Podcast page only. The
  "every episode features a rescue pup" line lives on /pups only. The passcode note ("Your
  passcode is in the back of the book, under the QR code.") lives on /velvet only.
- **About Me is Jen's own words**, one page, exactly as she wrote them (Nov 3). Don't add,
  trim, or reword. Say "rescues", not "rescue dogs". **About the Author** (`/about-the-author`)
  is the separate formal page.
- **Gallery:** 19 photos, Jen's "best 15 to 20" (`GALLERY_PICKS` in `PhotoGallery.js`).
- **Menu:** "Get the first chapter free" is in the Book drop-down and is a button at the bottom
  of the phone menu.
- **Footer:** the book credit reads "Beyond the Velvet Ropes by Jennifer Walcott Archuleta."
  The person is "Jen Archuleta." YouTube (the podcast channel) is in the "Stay close" links.
- **Book credit (Jen, Nov 5, 2026):** "Beyond the Velvet Ropes by Jennifer Walcott Archuleta"
  wherever the book is credited, including the book page browser tab. Everywhere else the
  person is "Jen Archuleta." Don't change Walcott inside URLs, handles, or press article titles.

---

## ⭐ How the site is organized (Jen's final instructions, 2026-10-27) — don't undo this

Jen asked for the September 2026 site's wording, layout, colors, and feel, kept clean, with
the newer features she likes. Before changing structure, re-read this section.

- **One navigation, every page** (`app/components/SiteNav.js`):
  Home | About Me | Book | Podcast | Journal | Media | Shop.
  Each main page has a drop-down of its sections (Jen, Nov 3, 2026) so people can jump straight
  to them; the links point at section ids on those pages (`/about#then`, `/shop#bookmark`...).
  The Book page is the book. Signed copies, the bookmark, and the book club live on `/shop`.
  Simplified (Nov 2026): The Velvet Letter is not in the menu. /velvet is reached by the
  book’s QR code. About the Author is under Media next to the press kit, Film and documentary is only under
  Media, the Journal's "Podcast" category is labeled "Podcast Posts" (the category name in
  Sanity is unchanged; see `CATEGORY_LABELS` in `app/journal/curation.js`), and the Shop's
  FAQ link says "Book Club FAQs". Each link appears once.
  Rename or remove a section → update its link in `SiteNav.js`.
  Gallery, Pups of the Podcast, Speaking, Quotes, Sponsors, Contact, Free First Chapter, and
  The Forever Angels also live in the footer (`SiteFooter.js`). No page has its own nav or footer — the Book page and the private
  Velvet Letter page use the same components.
- **"Stay close"** (top of `SiteFooter.js`) is the ONE home for the free first chapter signup
  and the social links (Instagram, TikTok, X, Facebook, LinkedIn). Don't add "Follow me"
  blocks or social buttons anywhere else. Buzzsprout/YouTube links live on the Podcast page
  (players side by side) plus one "Listen on Buzzsprout • Watch on YouTube" line on the
  homepage. "Watch on YouTube" opens the channel's Full Episodes playlist (`PODCAST.youtubeEpisodes`).
- **Homepage, in Jen's order (Nov 2026):** intro + Get the Book / About me · Story/Voice/Heart ·
  featured photos (`HomeCarousel.js`, a short row: family, the dogs, the book; no children's
  faces) · the book with trailer and buy links · a short Velvet Letter invitation · podcast +
  featured Pup of the Podcast · the three newest Journal posts · media & press highlights · free
  first chapter (Stay close). The full photo gallery stays on **About Me** (`#gallery`). No bundle or offer
  block on the homepage (Jen, Nov 3).
- **About Me, one page (Jen, Nov 3, 2026):** everything about Jen lives on `/about` (menu label
  "About Me"), in the exact text Jen sent that evening, from "Faith, family, and a bunch of
  rescues." to "Thanks for being here. Jen". The homepage hero does NOT repeat it (no "these
  days I'm happiest..." paragraph); it keeps the headline, "Author of Beyond the Velvet
  Ropes," and the buttons. The formal bio is `/about-the-author`.
- **Buying the book** (`app/components/BuyOptions.js`, homepage and Book page, Nov 2026):
  "Get the Paperback" is the main button, then every store grouped by format (Paperback,
  Ebook, Audiobook, Signed copy) from `BOOK_FORMATS` in `site-data.js`. Up to three reader
  reviews show under it from `READER_REVIEWS`: real reviews only, chosen by Jen, word for word
  with the reader's OK. Never write or paraphrase a review.
- **Journal** (`/journal`, Nov 2026): a search box, 12 posts at a time with "Load more"
  (`app/journal/JournalBrowser.js`), and the Archive as the last chip in the filter row.
- **Hero photo:** the candid floral portrait (`presskit-headshot-floral.jpg`), Jen's pick
  (Nov 3, 2026). It is not repeated in the homepage photo row.
- **The Velvet Letter entrance** (`/velvet`, locked) is Jen's short version: title, "Some things
  only live inside the book.", Get the Book, the passcode field (always visible) with Enter,
  and "Access comes with the book. Your passcode is in the back of the book, under the QR code."
- **Journal podcast links:** `app/journal/repair-body.mjs` points old posts' episode links at
  the episode each post is about (`CORRECT_EPISODE`, audited Nov 2, 2026). Add a post there if
  it links the wrong guest; never edit Sanity from code.
- **Privacy: Jen's home location is never on the site.** The bio says "She lives on the West
  Coast" (Jen, Nov 3, 2026). Never name the city, state, or neighborhood in any bio, page, or
  photo caption.
- **The Forever Angels** (her 501(c)(3)) has ONE section: About `#forever-angels`. The footer
  links there; `/forever-angels` redirects there.
- **Film and documentary** are IN DEVELOPMENT. One source of wording: `lib/press.js` (`FILM`).
  Never say released, acquired, or optioned.
- **Podcast:** "Explore all 13 episodes of Unfiltered with Jen Archuleta." (Season 1 is
  complete.) Buzzsprout and YouTube sit together. Never say the show is on hold or that new
  episodes are coming. Use guests' full names.
- **Shop:** three products in this order (Jen, 2026-10-28; Nov 3): Signed copy, The Velvet
  Circle Book Club, Velvet Bookmark. The Velvet Circle is one membership on its card.
  - **Velvet Circle = "Monthly Book Club"** (Jen, Nov 5, 2026): one membership, $9.99/month on
    the existing Stripe membership link. Do not create a second Stripe product or invent a price.
    It includes a sneak peek of the discussion guide (not the full guide), The Velvet Letter with
    the gold key, the velvet bookmark, up to three questions a month answered promptly and in
    detail, and cancel anytime. Once 13 paying members have joined, the monthly group Zoom begins.
    The full guide is `lib/book-club-guide.js` for
    emailing to new members. The shop shows only the title, the intro, and questions 6 and 11.
  - **One name:** "The Velvet Circle Book Club" everywhere (cards, FAQ, Shipping & Returns,
    buttons). The Backstage Bundle is not a separate shop product. Don't add the word
    "backstage". Old `#backstage-bundle` / `#backstage-box` anchors land on the book club card.
    The passcode note still lives only on `/velvet`.
  The Be the Bumblebee T-shirt (Etsy, `SHOP.etsyTee`) sits in a
  separate "And a little more" spot below the products, never among them.
  - **Every card says what you get, the real price, and when it ships or starts (Adam, Nov 3,
    2026).** The Shop, the Stripe checkouts, and Shipping & Returns say the same thing:
    - **Signed copy:** shown as the TOTAL, "$41.99 total" with "$35 book + $6.99 shipping, US
      only" under it (`signedBookTotal`, `signedBookPrice`, `signedBookShipping`). The line is
      exactly "Signed and shipped by regular mail." (`signedBookLeadTime`). No day or week
      count. The Book page's buy box
      says "Signed by Jen, $41.99 with shipping".
    - **Book club:** one membership at `velvetCircleMembershipPrice` ($9.99/month) on the existing
      Payment Link. The card has the fun line, the five items, and the line that the monthly
      group Zoom begins once 13 paying members have joined. Questions go to
      `SHOP.velvetCircleQuestionsEmail`. Shipping & Returns says the same thing. Cancel anytime
      via `STRIPE_CUSTOMER_PORTAL_URL`.
    - **Bookmark:** $24.99, free shipping, US only (`bookmarkShipping`). Size, packaging, and
      when it ships come from `bookmarkSize`, `bookmarkPackaging`, `bookmarkShips` in
      `site-data.js`; each line shows only once it's filled in. Use Jen's real answers, never a
      guess.
- **Journal:** categories in Jen's order are in `app/journal/curation.js`. Repetitive
  promotional posts are ARCHIVED there (hidden from the feed, listed under Archive, still live
  at their URLs). Pup of the Podcast posts are off the Journal (`OFF_JOURNAL_CATEGORIES`, Jen,
  Nov 3): they live on `/pups`, whose "Read more" links still open them. Nothing is deleted.
  The public Journal never shows Velvet Letter content.
- **FilmFreeway:** Jen asked for her FilmFreeway link (Nov 3, 2026). It sits with the film
  partners in `lib/press.js` (Book "On screen" and Media), and journal posts show their
  FilmFreeway lines as she wrote them. Don't copy details from that profile onto the site.
- **Pups:** a pup with a `bio` in `lib/pups.js` shows Jen's words exactly (Charlie, Nov 3).
- **Quotes** have their own page; don't repeat them around the site.

## ⭐ Photos — Jen's rules (2026-10-27 final corrections) — don't undo this

- **Gallery (About `#gallery`, `app/components/PhotoGallery.js`):** every photo is shown whole,
  at its own ratio, as big as the stage allows (about 900px wide for a landscape photo on a
  laptop, nearly full width on a phone), on a thin white mat that hugs the photo. Never put the
  slides in a shared cover-crop frame, never stretch, never enlarge a file more than 1.6x
  (small files go blurry; get the larger original instead). Review photos one by one: crop off
  phone buttons, status bars, TikTok marks, and white/black edge bands with a simple crop, but
  never paint over or rebuild part of a photo. If a mark can't be cropped off cleanly, ask Jen
  for the original. Link straight to a slide with `/about?photo=46#gallery`.
- **The twenties paragraph** on About Me ("I'll be honest, I've never minded the camera...")
  sits beside the black-and-white long black trench coat photo (`jen-bw-coat2.jpg`), Jen's pick
  since July. Never swap in a headshot.
- **About wording** is Jen's own text from November 3 (see above); it replaced the September
  wording. Her dogs are "rescues". Keep the September photos (dogs, tortoise, coffee cup) and
  her full house photo (`full-house-kids-dogs.jpg`) where they are.
- **Media & Speaking:** Jen's three headshots for press downloads, in her order and her names
  (Nov 3, 2026): **Glamorous** (black and white, `jen-headshot-bw.jpg`), **Candid** (floral top,
  `presskit-headshot-floral.jpg`, the primary Media image and the homepage hero), and
  **Signature** (black top, smiling, `jen-headshot-signature.jpg`). Each downloadable. No
  retouching. The Contact page uses a headshot, not the puppy photo. None of the three is a
  gallery slide.
- **Velvet Circle:** the Book Club card shows the group photo (`velvet-circle-group.jpg`) with
  the round logo in the corner. The first version of that picture showed a made-up cover; on
  Nov 3 Jen's real cover was put on every book in it. Never use a picture of the book that
  isn't Jen's real cover (`book-cover.jpg`).
- **Children (Jen, Nov 3, 2026):** no photo of Jen's children anywhere on the site, except
  Jen's own files with the kids' faces blurred (`public/assets/gallery-nov3/`). The old photos
  of the kids were deleted from `public/`, not just hidden, because anything in `public/` can
  be opened by its URL. Never add one back.
- Every photo change is logged in `docs/photo-changes-2026-10-27.md` (originals stay in git
  history and in the pre-change backup tag).

## ⭐ The Velvet Letter — private, and it must stay that way

- **One entrance:** `/velvet`. The QR code in the back of the book encodes `/velvetropes`,
  which redirects to `/velvet` — never change that redirect. `/velvet-letter` redirects too.
- **Locked:** the public invitation (Jen's exact wording in `app/velvet/VelvetLocked.js`).
  Nothing private is fetched or rendered for a visitor without the passcode.
- **Unlocked:** the dark "You made it. You're in." page + every journal entry
  (`VelvetInside.js`), fetched server-side only after the passcode checks out.
- **The passcode lives ONLY in Vercel** as `VELVET_LETTER_PASSCODE` (Production + Preview).
  Never put the passcode, or a hash of it, in this public repo. If the variable is missing the
  gate fails CLOSED (nobody gets in). The unlock cookie is an HMAC keyed by that server-only
  value, so it can't be forged from this code. Bump `VERSION` in `passcode.js` to sign everyone out.
- **Private photos** live in `/private/velvet/` (NOT `/public`) and are served by
  `app/velvet/photo/[name]/route.js`, which checks the unlock cookie first. Jen's letter
  photo goes at `private/velvet/velvet-letter.jpg` (renders nothing until it exists).
  `next.config.js` `outputFileTracingIncludes` ships that folder with the functions.
- **Sanity:** the production dataset is meant to be **Private**, read server-side with
  `SANITY_API_READ_TOKEN` (Viewer token, set in Vercel). With a public dataset, anyone can
  read the letters straight from Sanity's API.


## 0. Related context — read these too if the task touches brand, book, or commerce

This file covers the **site's code and infrastructure**. It does NOT duplicate the book/brand
canon or the live commerce state — those live in their own maintained sources, and duplicating
them here would just create a second copy that goes stale (it already has, once). Check these
when relevant:

- **Book & brand canon (voice, positioning, launch status):** Google Drive **"JEN ARCHULETA —
  BRAND HQ"** → `STUDIO_LOG.md` at the root is the canonical, continuously-updated log. Also
  `~/Documents/Jennifer/00_PROJECT_INDEX.md` (local working index, read first for anything
  book/content/launch-related).
- **Live commerce + legal + automation state (Stripe products, prices, Payment Links, the
  Make.com automation, Kit tags, Google Sheet tracker):** `~/Documents/Jennifer/07_Legal/
  VELVET-CIRCLE-COMMERCE-STATUS.md` — this is the current source of truth for everything
  money-related on the site. **Update it, don't just this file, whenever you change a price,
  a Payment Link, or the site's commerce config** — the Cowork/Make session reads that file too.
- **Legal pages content (Privacy/Terms/Shipping & Returns full text, what an attorney needs to
  know):** `~/Documents/Jennifer/07_Legal/Legal-Pages-Handoff-2026-07-23.md`.

If you (Claude Code) change anything commerce-related — a price, a product, a Stripe link,
the shop page — **update `VELVET-CIRCLE-COMMERCE-STATUS.md` before finishing**, the same way
you'd update this file for a code change. That file is shared with a separate Cowork/Make.com
session that builds the Stripe→Kit→Google Sheets automation; if it goes stale, that session
will act on wrong prices/links.

---

## 1. What this is — current status: 🟢 LIVE

Jennifer (Walcott) Archuleta's author/speaker/podcast site — memoir *Beyond the
Velvet Ropes*. **Live in production at https://jenarchuleta.com** (replaced her
old Squarespace site).

It is a **Next.js 14 (App Router, plain JavaScript — no TypeScript)** app:
- Static editorial pages (home, book) reusing a hand-built design-token CSS system.
- A **Podcast** page (native Buzzsprout player).
- A **Journal** blog powered by **Sanity CMS** (Jen self-publishes at `/studio`, no code).
- Email capture via **Kit** (ConvertKit) inline form.
- A **Shop** page selling a signed book copy, a paid membership, and a
  keepsake bookmark — see §5a.
- **Legal pages**: Privacy Policy, Terms of Service, Shipping & Returns — see §5b.

**Local project folder:** `~/Documents/Jennifer/Website` (moved here from
`~/Downloads/Jennifer/Website` on 2026-07-24 — update any old notes/scripts that
still reference the Downloads path).

---

## 2. URLs & accounts (all IDs you need)

| Thing | Value |
|---|---|
| Live site | https://jenarchuleta.com (apex 301→ `www.jenarchuleta.com`) |
| Vercel preview/prod URL | https://jenarchuleta-site.vercel.app |
| **GitHub repo** | https://github.com/SpartanArch31/jenarchuleta-site (branch `main` auto-deploys; owner GitHub acct `SpartanArch31`) |
| **Vercel** | project `jenarchuleta-site`, team "spartanarch31's projects" (Hobby). Git-integrated → push to `main` = production deploy. **Access (checked 2026-10-24):** Hobby can't add team members (Pro = $20/mo platform incl. 1 deploying seat, +$20/mo per extra Owner/Member seat, Viewer seats free). Because this repo is **public**, a GitHub collaborator's pushes deploy on Hobby without a Vercel seat ("collaboration is free for public repositories"). Hobby is also non-commercial-only per Vercel's terms, and this site sells things — Pro fixes that. |
| **Sanity (CMS)** | project ID **`ac1ruwaz`**, dataset **`production`** (PUBLIC). Studio embedded at `/studio`. Manage: sanity.io/manage/project/ac1ruwaz |
| **Buzzsprout (podcast)** | show id **`2467154`**, feed `unfilteredwithjenarchuleta.buzzsprout.com` |
| **Kit (email)** | inline form uid **`ab5cfa4752`** (form 9625768); free-chapter landing slug `ea44cdb33a`. Kit also holds Commerce *product records* (cover art, tags) for all 4 shop products, but **Kit's own checkout is NOT used for real purchases** — see §5a. |
| **Stripe** | processes all real commerce checkout (Payment Links) — see §5a for current links. Merchant-of-record display name: "Archuleta Entertainment." |
| **Domain registrar / DNS** | **Network Solutions** (nameservers `ns85/ns86.worldnic.com`) |

No secrets live in this repo. Sanity projectId, Buzzsprout id, and Kit uid are all
public by design (they ship in the client bundle). Stripe Payment Link URLs are also
public by design (that's what a Payment Link is) — never commit a Stripe *secret* or
*restricted API key* here.

---

## 3. Repository map — where everything is

```
~/Documents/Jennifer/Website/
├── CLAUDE.md                      ← this guide
├── package.json                   ← Next.js + Sanity deps
├── next.config.js                 ← REDIRECTS (old /blog/* + /book.html etc.)
├── vercel.json                    ← pins framework=nextjs (REQUIRED, see §10)
├── blog-redirects.json            ← 149 generated /blog/<old> → /journal/<slug> redirects
├── sanity.config.js               ← Studio config (projectId, schema, plugins)
├── sanity.cli.js                  ← Sanity CLI config
│
├── app/                           ← Next.js App Router
│   ├── layout.js                  ← root layout + site metadata
│   ├── globals.css                ← imports tokens + ALL shared/home CSS (verbatim from old site)
│   ├── tokens/                    ← the design system (colors, fonts, typography, spacing, effects, base)
│   ├── page.js                    ← HOMEPAGE
│   ├── book/
│   │   ├── page.js                ← BOOK page (dark register, shared nav + footer)
│   │   └── book.css               ← book-only styles, scoped under .book-page
│   ├── podcast/
│   │   ├── page.js                ← PODCAST page
│   │   └── podcast.css
│   ├── journal/
│   │   ├── page.js                ← JOURNAL feed (live Sanity, category chips)
│   │   ├── journal.css            ← feed + article styles
│   │   ├── _posts.js              ← placeholder fallback posts (used only if Sanity empty)
│   │   └── [slug]/page.js         ← single JOURNAL POST (Portable Text + funnel)
│   ├── shop/
│   │   ├── page.js                ← SHOP page — product cards, see §5a for pricing/links
│   │   └── shop.css
│   ├── privacy/page.js            ← Privacy Policy (legal, see §5b)
│   ├── terms/page.js              ← Terms of Service (legal, see §5b)
│   ├── shipping-returns/page.js   ← Shipping & Returns incl. Membership cancellation copy (legal, see §5b)
│   ├── legal-pages.css            ← shared styling for the 3 legal pages (reuses site design tokens)
│   ├── velvet/                    ← THE VELVET LETTER (see the ⭐ section at the top)
│   │   ├── page.js                ← locked invitation OR the private journal (server decides)
│   │   ├── VelvetLocked.js / Gate.js / actions.js / passcode.js ← invitation + server-side gate
│   │   ├── VelvetInside.js        ← private journal ("You made it. You're in.")
│   │   └── photo/[name]/route.js  ← serves /private/velvet photos only when unlocked
│   ├── studio/[[...tool]]/        ← embedded Sanity Studio (/studio)
│   │   ├── page.jsx
│   │   └── Studio.jsx             ← 'use client' wrapper (REQUIRED, see §10)
│   ├── components/
│   │   ├── SiteNav.js             ← THE one nav (every page, light or dark)
│   │   ├── SiteFooter.js          ← "Stay close" (free chapter + socials) + footer links + legal
│   │   ├── VelvetInvite.js        ← short Velvet Letter invitation (homepage, Book page)
│   │   ├── VelvetCirclePanel.js   ← Velvet Circle explainer (Shop), perks list lives here
│   │   ├── PhotoGallery.js        ← the photo carousel (About page)
│   │   ├── KitInlineForm.jsx      ← injects Kit inline form ("Built with Kit" hidden in globals.css)
│   │   ├── BuzzsproutPlayer.jsx   ← injects Buzzsprout native player
│   │   └── site-data.js           ← ⭐ central config: Kit ids, socials, podcast id, SHOP product
│   │                                 links/prices (Stripe Payment Links — see §5a)
│   └── sanity/
│       ├── env.js                 ← projectId / dataset / apiVersion
│       ├── client.js              ← next-sanity client
│       ├── image.js               ← urlFor() image helper
│       └── queries.js             ← GROQ queries (journal reads are uncached)
│
├── sanity/schemaTypes/            ← CMS schema
│   ├── post.js                    ← post fields + CATEGORIES list
│   ├── blockContent.js            ← rich-text (Portable Text) config
│   └── index.js
│
├── public/assets/                 ← all images (served at /assets/...)
└── scripts/                       ← migration / maintenance scripts (see scripts/README.md)
```

---

## 4. Run / build / deploy

```bash
cd ~/Documents/Jennifer/Website
npm install          # first time
npm run dev          # local dev → http://localhost:3000 (or pass -- --port 3100)
npm run build        # production build (run this to catch errors before pushing)
```

**Deploy:** commit + push to `main`. Vercel auto-builds and deploys to production.
```bash
git add . && git commit -m "describe change" && git push
```
Every push to `main` → live in ~1–2 min. Pushes to other branches → private preview
deploys (behind Vercel login).

---

## 5. How to make common changes (the "where do I edit X" guide)

- **Add / edit a blog post** → no code. Go to **jenarchuleta.com/studio**, log in
  (GitHub), **Journal Post → Create**, Publish. Appears on `/journal` in ~60s (ISR).
- **Change a post's category** → in `/studio`, open the post → **Category** dropdown → Publish.
- **Add/rename/remove a category** → edit `CATEGORIES` in `sanity/schemaTypes/post.js`
  AND `CATEGORY_ORDER` in `app/journal/page.js` (the feed only shows categories that have posts).
- **Homepage / book copy** → `app/page.js` / `app/book/page.js` (plain JSX; use real
  Unicode punctuation — ’ “ ” — … → — not HTML entities).
- **The "Meet Jen" photo row** (currently hidden, needs hi-res photos) → in `app/page.js`
  search `TODO photo-row hidden`; drop `jen-glam.jpg` + `jen-fun.jpg` into
  `public/assets/`, uncomment the block.
- **Book retailer links** (Amazon/B&N/Audiobook are `#` placeholders) → `app/page.js`
  (BOOK section) and `app/book/page.js` (buy-row).
- **Podcast show id / subscribe links** → `app/components/site-data.js` (`PODCAST`).
- **Email form** → `app/components/site-data.js` (`KIT_FORM_UID`, `KIT_FREE_CHAPTER_URL`).
  To restyle the form (e.g. brand-gold button) do it inside Kit, not in code.
- **Nav / footer / social links** → `app/components/SiteNav.js`, `SiteFooter.js`, `site-data.js`.
- **Redirects** → `next.config.js` (per-post ones are in `blog-redirects.json`).
- **Design tokens (colors/fonts/spacing)** → `app/tokens/*.css`. Brand accent gold = `#BE9543`.
- **Shop products / prices / Payment Links** → `app/components/site-data.js` (`SHOP` object).
  **Always check `~/Documents/Jennifer/07_Legal/VELVET-CIRCLE-COMMERCE-STATUS.md` for the
  current correct prices and links before editing this** — don't hardcode a price you're not
  sure is current.

### 5a. Shop / commerce — architecture rule, read before touching anything here

**Kit Commerce's own checkout cannot collect a shipping address, a custom field (e.g. book
personalization), or give a subscriber a self-service cancel option — for ANY product.** So
the live "Buy"/"Join" button on the site must always point to a **Stripe Payment Link**,
never to a Kit product's own checkout URL. This has been broken once already (a site update
accidentally pointed a Buy button at Kit's checkout, which silently had no shipping/
personalization fields) — don't repeat it. Kit product records may still exist off the site
(cover art, price, tags) and are used by the Make.com automation, but a real customer should
never land on Kit's own checkout page.

Current products (verify against `VELVET-CIRCLE-COMMERCE-STATUS.md` before trusting these —
that file is updated more frequently than this one):
- **Signed Copy** — $41.99 total ($35 + $6.99 shipping) — Stripe Payment Link, live.
- **The Velvet Circle Book Club** (Stripe product renamed from "Velvet Circle Membership" on
  Nov 3, 2026). One membership at $9.99/month on this Payment Link. No second
  Stripe product. Cancel link is `STRIPE_CUSTOMER_PORTAL_URL` (capital I in the Stripe login
  id). It is on the shop card and Shipping & Returns.
- **The Backstage Bundle** is not a separate shop product. It never had a Stripe link.
- **Signature Velvet Bookmark** — $24.99, shipping included, US only — Stripe Payment Link.

The Stripe→Kit→Google Sheets automation (tagging buyers in Kit, logging orders to a Google
Sheet fulfillment tracker) is built and maintained in a separate Make.com scenario, not in
this repo — full detail in `VELVET-CIRCLE-COMMERCE-STATUS.md`.

### 5b. Legal pages

`/privacy`, `/terms`, `/shipping-returns` were added 2026-07-23, drafted by an AI assistant
(not a licensed attorney) using "Archuleta Entertainment" as the business name. On Nov 5, 2026
the Terms governing-law and venue lines dropped Arizona. Do not name a state there. These
pages are **not verified against an actual business registration.** Full original text and the
attorney-review checklist: `~/Documents/Jennifer/07_Legal/Legal-Pages-Handoff-2026-07-23.md`.
These pages have NOT been reviewed by counsel yet — don't represent them as final/binding.

---

## 6. Sanity CMS (the blog)

- **Schema:** `sanity/schemaTypes/post.js` — fields: title, slug, publishedAt, category,
  heroImage, excerpt, body (Portable Text), affiliateLinks[], sponsor{name,url,disclosure},
  seoTitle, seoDescription. Affiliate links auto-render an FTC disclosure; sponsor block
  renders only when set.
- **Studio:** embedded at `/studio`. Owner logs in with GitHub.
- **Let Jen publish herself:** sanity.io/manage/project/ac1ruwaz → **Members** → invite her email.
- **CORS** (already configured): jenarchuleta.com, www, localhost:3100, the .vercel.app domain.
  Add new origins with: `npx sanity cors add <url> --credentials`.
- **Data flow:** site reads PUBLISHED posts via the public dataset (no token). Journal
  post pages and the feed fetch with `cache: 'no-store'` (`app/journal/[slug]/page.js`
  is `force-dynamic`) so a publish shows on the next view. A 60s ISR window was
  serving the previous HTML after publish.
- **Bare URLs auto-link (2026-10-24):** `linkifyBody()` in `app/journal/[slug]/page.js` turns
  plain-text http(s) URLs in a post into real links at render time (the Squarespace migration
  left ~90 links as plain text, and URLs pasted in /studio arrive as plain text). External
  links open in a new tab. Nothing in Sanity is changed by this. Still prefer real links
  (select text → link icon in /studio) for nice link text.
- **CLI:** the Sanity CLI is logged in on this Mac. `npx sanity ...` works. If not:
  `npx sanity login` (pick GitHub).

---

## 7. Content migration (already done — 149 posts)

Jen's old Squarespace "blog" was actually a **765-post Instagram-style feed**. We migrated
the **149 substantive posts** (600+ chars of real writing) and skipped the hashtag/caption
noise. All 149 have images, real slugs, and auto-assigned categories. Old `/blog/...` URLs
redirect (see `blog-redirects.json` + catch-all in `next.config.js`).

Scripts live in `scripts/` (`migrate.py`, `classify.py`, `patch-categories.cjs`) — see
`scripts/README.md` to migrate more posts or re-categorize. The source export was the
Squarespace **WordPress XML** (Settings → Import & Export → Export → WordPress).

---

## 8. Domain & DNS (Network Solutions)

Website records (point to Vercel):
- `A  @  76.76.21.21`
- `CNAME  www  cname.vercel-dns.com`

**⚠️ DO NOT DELETE these — they keep Jen's newsletter email authenticated (Kit/ConvertKit):**
- `CNAME cka._domainkey`, `cka2._domainkey`, `ckespa` (DKIM/SPF)
- `TXT _dmarc`

The site uses one email, `therealunfilteredpod@gmail.com`, on the legal pages and for book
club questions.

---

## 9. Open post-launch TODOs

1. **Photos** — add real hi-res `jen-glam.jpg` + `jen-fun.jpg` to `public/assets/`, un-hide
   the homepage photo row (§5). (Pasted/chat images are too low-res — need original files.)
2. **Book retailer links** — replace the `#` placeholders with real Amazon/B&N/Audiobook URLs.
3. **Kit form button color** — optional: set it to brand gold `#BE9543` inside Kit.
4. **Invite Jen** as a Sanity member so she can publish herself.
5. **Spot-check categories** — auto-classification is keyword-based; a few posts may want a
   manual category tweak in `/studio`.
6. **Commerce (check `VELVET-CIRCLE-COMMERCE-STATUS.md` for current detail):** confirm the
   Membership Payment Link and price are actually live in `site-data.js`; confirm the
   Shipping & Returns cancellation copy has been updated with the real Stripe portal link
   (both were instructed 2026-07-24, not yet confirmed shipped as of this writing).
7. **Legal pages** need a licensed attorney's review before being treated as final.

---

## 10. Gotchas / lessons learned (don't re-discover these)

- **Vercel must be framework=nextjs.** The project was first imported as a *static* "Other"
  preset, so builds failed with `No Output Directory named "dist"`. Fixed by `vercel.json`
  `{ "framework": "nextjs" }`. Keep that file.
- **Embedded Studio needs a client boundary.** `app/studio/.../page.jsx` must render the
  Studio from a `'use client'` component (`Studio.jsx`); importing `sanity.config` directly
  into the server page breaks the build (`createContext is not a function`).
- **Two pages, one .hero class** — the home and book heroes have different layouts; book's
  styles are scoped under `.book-page` (in `app/book/book.css`) so they don't collide.
- **CSS is ported verbatim** from the original static site to stay pixel-identical — when
  editing layout, change the tokens or the relevant page CSS, don't re-architect.
- **Don't put the inline Kit form on the dark book page** — it's a light form; the book page
  keeps the landing-page button instead.
- **Never point a physical-goods "Buy" button at a Kit checkout URL** — Kit Commerce can't
  collect shipping addresses or custom fields for any product. Stripe Payment Links only for
  the signed copy and the bookmark. See §5a.
- **A Make.com scenario "looking done" isn't the same as it being saved/active.** The
  Stripe→Kit→Sheets automation ran for over a day with an empty, deactivated scenario before
  anyone caught it (fixed 2026-07-24) — if you're ever asked to verify that automation is
  working, don't trust a screenshot of the visual builder; check the scenario's actual saved
  state and active/inactive flag.

- **Compress media before adding it.** Phones were slow because of a 21.9 MB trailer and
  700 KB+ photos. Now: `trailer.mp4` = 720×1280 H.264 CRF 28 (~7 MB; the 196 MB master is
  `../03_Trailer_Reel/BTVR_Reel_FINAL_VO.mp4`), photos ≤1000–1400 px wide at JPEG q80.
  Originals of everything recompressed are in `../_ARCHIVE/site-media-originals-2026-10-24/`.
- **The buy-row "Audiobook (Spotify)" link is the AUDIOBOOK, not the podcast.** Podcast
  subscribe buttons live in the homepage `#podcast` section and read from `PODCAST` in
  `site-data.js` (same as /podcast).
- **Name:** the book credit is "Beyond the Velvet Ropes by Jennifer Walcott Archuleta"
  wherever the book is credited. Everywhere else the person is "Jen Archuleta." Don't change
  Walcott inside URLs, handles, or press article titles. JSON-LD in `app/layout.js` (Person,
  with alternateName) and `app/book/page.js` (Book) tells search engines they're the same
  person. /book's title matches the listings.

---

## 11. Safety

- **Never commit or paste passwords/API tokens.** This repo is public on GitHub.
- The site owner manages GitHub, Vercel, Sanity, Kit, Buzzsprout, Stripe, and Network
  Solutions accounts — automated sign-ins on their behalf are off-limits; hand account-level
  login steps back to them.

---

## 12. Automated safety net — commerce "Stop" hook (added 2026-07-24)

To stop the exact failure mode that happened today (a site-code instruction for the Membership
Payment Link + Shipping & Returns copy sat un-confirmed for hours, and separately a Make.com
automation ran broken for over a day, both only caught because a human happened to double-check),
this repo has a Claude Code **Stop hook**: `.claude/settings.local.json` registers
`.claude/hooks/check-commerce-log.sh` to run every time a session is about to finish.

**What it does:** if the session touched a commerce/legal-relevant path (`app/shop`,
`app/privacy`, `app/terms`, `app/shipping-returns`, `app/velvet`, or
`app/components/site-data.js`) and `../07_Legal/VELVET-CIRCLE-COMMERCE-STATUS.md` hasn't been
modified in the last 2 hours, the hook **blocks the session from stopping** and prints a message
telling Claude to go update that status file first. Exit code 2 = blocked; the session must act
before it's allowed to finish.

**What it does NOT cover:** anything outside this repo (Kit, Stripe, Make.com config changes made
directly in those dashboards, or Cowork-side brand/book/content work) — those rely on the Drive
BRAND HQ `STUDIO_LOG.md` + the standing "update before you finish" convention, not a hard gate.
This hook only closes the gap for site-code changes made through Claude Code in this repo.

**If you're troubleshooting it:** the hook script lives at `.claude/hooks/check-commerce-log.sh`
(bash, not tracked in git — local-only, see `.gitignore`). It checks `git status --porcelain` and
the last commit for relevant paths, then compares against the status file's mtime. If it's
misfiring (blocking when it shouldn't, or not blocking when it should), read the script — it's
short and heavily commented — before assuming something's broken elsewhere.
