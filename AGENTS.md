# Rules for any AI working on jenarchuleta.com (Cursor, Grok, Claude, others)

This is Jen Archuleta's live website. Every change merged into `main` goes live on
jenarchuleta.com about two minutes later. **Read `CLAUDE.md` before you change
anything.** It is the full rulebook. The rules below are the ones that must never break.

## Before you start
- Work from the latest `main` of `SpartanArch31/jenarchuleta-site`. If you are working
  in a fork, sync it with `main` first. Starting from an old copy drags old pages back.
- Make the change on a branch and open a pull request. Never push straight to `main`.
- Keep each pull request to one request from Jen, and describe it in plain English.

## Never break these
1. **Jen's words stay Jen's.** The site uses the September 2026 wording plus the lines
   Jen added since. Don't rewrite, shorten, or "improve" her copy unless she asks for
   that exact change.
2. **Privacy.** Never put Jen's home city, state, or neighborhood anywhere. Her bio says
   "She lives on the West Coast."
3. **Children.** No photo of Jen's children anywhere on the site, except Jen's own files with
   the kids' faces blurred (`public/assets/gallery-nov3/`). Never add one back, never remove or
   weaken a blur, and never leave such a photo sitting in `public/` (anything there can be
   opened by its URL).
4. **The Velvet Letter is private.** The passcode lives only in the Vercel setting
   `VELVET_LETTER_PASSCODE`. Never put the passcode, a hint, or a hash of it in the code.
   Private entries and photos only appear after the passcode is entered. Never show
   Velvet Letter content on a public page.
5. **One menu, one footer.** Every page uses `app/components/SiteNav.js` and
   `app/components/SiteFooter.js`. The menu says "About Me", and each main page has a
   drop-down of its sections; if you rename or remove a section, fix its link in `SiteNav.js`.
   Social links live only in the footer's "Stay close".
6. **Photos are shown whole.** No cropping into frames, no stretching, no enlarging a
   small file past 1.6x. Don't paint over or rebuild part of a photo.
7. **Facts.** The film and documentary are in development (wording in `lib/press.js`).
   The podcast has 13 episodes; never say new episodes are coming. The shop has three
   products in Jen's order (see `CLAUDE.md`). The Velvet Circle Book Club is the one
   book-club offer: no Backstage Bundle, and no "backstage" wording anywhere. Only Jen's real
   book cover (`book-cover.jpg`), never a picture with a made-up cover.
8. **Nothing gets deleted from the Journal.** Posts are archived in
   `app/journal/curation.js`; Pup of the Podcast posts live on `/pups`, not in the Journal.
   Wrong podcast links are corrected in `app/journal/repair-body.mjs`.
9. **About Me is one page, in Jen's exact words.** Everything about Jen lives on `/about`.
   Don't reword it or copy it onto other pages. The formal bio is `/about-the-author`.
10. **No em dashes, and nothing repeated.** Never write an em dash anywhere on the site,
   page titles included; use a period or a comma. Film and documentary news lives only on
   Media (`#film`); the passcode note only on `/velvet`; the podcast blurb only on `/podcast`;
   the rescue pup line only on `/pups`. Other pages link to those.

## When you're done
- Check the Vercel preview on a phone and a laptop before merging.
- If something looks wrong after it goes live, use GitHub's "Revert" button on the
  pull request. That puts the site back the way it was.
- Every version is already saved: each change is a commit in GitHub, and Vercel keeps every
  deploy (Vercel, Deployments, pick the last good one, "Instant Rollback"). Nothing has to be
  copied by hand before a change, and nothing removed is ever lost.
