# Jen Archuleta — Website (jenarchuleta.com)

> **Read this first.** It's the operating guide for the whole site: what it is,
> where every file lives, how to change things, and how it deploys. A new
> session should be able to act on this without any prior context.

_Last updated: 2026-06-29 (launch day)._

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

**Local project folder:** `~/Downloads/Jennifer/Website`

---

## 2. URLs & accounts (all IDs you need)

| Thing | Value |
|---|---|
| Live site | https://jenarchuleta.com (apex 301→ `www.jenarchuleta.com`) |
| Vercel preview/prod URL | https://jenarchuleta-site.vercel.app |
| **GitHub repo** | https://github.com/SpartanArch31/jenarchuleta-site (branch `main` auto-deploys; owner GitHub acct `SpartanArch31`) |
| **Vercel** | project `jenarchuleta-site`, team "spartanarch31's projects" (Hobby). Git-integrated → push to `main` = production deploy. |
| **Sanity (CMS)** | project ID **`ac1ruwaz`**, dataset **`production`** (PUBLIC). Studio embedded at `/studio`. Manage: sanity.io/manage/project/ac1ruwaz |
| **Buzzsprout (podcast)** | show id **`2467154`**, feed `unfilteredwithjenarchuleta.buzzsprout.com` |
| **Kit (email)** | inline form uid **`ab5cfa4752`** (form 9625768); free-chapter landing slug `ea44cdb33a` |
| **Domain registrar / DNS** | **Network Solutions** (nameservers `ns85/ns86.worldnic.com`) |

No secrets live in this repo. Sanity projectId, Buzzsprout id, and Kit uid are all
public by design (they ship in the client bundle).

---

## 3. Repository map — where everything is

```
~/Downloads/Jennifer/Website/
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
│   │   ├── page.js                ← BOOK page (dark register)
│   │   └── book.css               ← book-only styles, scoped under .book-page
│   ├── podcast/
│   │   ├── page.js                ← PODCAST page
│   │   └── podcast.css
│   ├── journal/
│   │   ├── page.js                ← JOURNAL feed (live Sanity, category chips)
│   │   ├── journal.css            ← feed + article styles
│   │   ├── _posts.js              ← placeholder fallback posts (used only if Sanity empty)
│   │   └── [slug]/page.js         ← single JOURNAL POST (Portable Text + funnel)
│   ├── studio/[[...tool]]/        ← embedded Sanity Studio (/studio)
│   │   ├── page.jsx
│   │   └── Studio.jsx             ← 'use client' wrapper (REQUIRED, see §10)
│   ├── components/
│   │   ├── SiteNav.js             ← light-register nav (home/podcast/journal)
│   │   ├── SiteFooter.js          ← footer + social links
│   │   ├── KitForm.js             ← email-capture section (uses inline form)
│   │   ├── KitInlineForm.jsx      ← injects Kit inline form
│   │   ├── BuzzsproutPlayer.jsx   ← injects Buzzsprout native player
│   │   └── site-data.js           ← ⭐ central config: Kit ids, socials, podcast id + subscribe links
│   └── sanity/
│       ├── env.js                 ← projectId / dataset / apiVersion
│       ├── client.js              ← next-sanity client
│       ├── image.js               ← urlFor() image helper
│       └── queries.js             ← GROQ queries (ISR revalidate 60s)
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
cd ~/Downloads/Jennifer/Website
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
- **Data flow:** site reads PUBLISHED posts via the public dataset (no token), with ISR
  (`app/sanity/queries.js`, revalidate 60s) — new/edited posts go live without a redeploy.
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

There is **no inbox** at the domain (no MX records) — `jen@jenarchuleta.com` does not
receive mail. Setting up a real mailbox would be a separate task (Google Workspace etc.).

---

## 9. Open post-launch TODOs

1. **Photos** — add real hi-res `jen-glam.jpg` + `jen-fun.jpg` to `public/assets/`, un-hide
   the homepage photo row (§5). (Pasted/chat images are too low-res — need original files.)
2. **Book retailer links** — replace the `#` placeholders with real Amazon/B&N/Audiobook URLs.
3. **Kit form button color** — optional: set it to brand gold `#BE9543` inside Kit.
4. **Invite Jen** as a Sanity member so she can publish herself.
5. **Spot-check categories** — auto-classification is keyword-based; a few posts may want a
   manual category tweak in `/studio`.

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

---

## 11. Safety

- **Never commit or paste passwords/API tokens.** This repo is public on GitHub.
- The site owner manages GitHub, Vercel, Sanity, Kit, Buzzsprout, and Network Solutions
  accounts — automated sign-ins on their behalf are off-limits; hand account-level login
  steps back to them.
