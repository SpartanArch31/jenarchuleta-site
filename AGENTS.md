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
3. **Children.** Never add a photo that shows a child's face unless Jen supplied that
   exact file. Never remove or weaken an existing blur.
4. **The Velvet Letter is private.** The passcode lives only in the Vercel setting
   `VELVET_LETTER_PASSCODE`. Never put the passcode, a hint, or a hash of it in the code.
   Private entries and photos only appear after the passcode is entered. Never show
   Velvet Letter content on a public page.
5. **One menu, one footer.** Every page uses `app/components/SiteNav.js` and
   `app/components/SiteFooter.js`. Social links live only in the footer's "Stay close".
6. **Photos are shown whole.** No cropping into frames, no stretching, no enlarging a
   small file past 1.6x. Don't paint over or rebuild part of a photo.
7. **Facts.** The film and documentary are in development (wording in `lib/press.js`).
   The podcast has 13 episodes; never say new episodes are coming. The shop has four
   products in Jen's order (see `CLAUDE.md`).
8. **Nothing gets deleted from the Journal.** Posts are archived in
   `app/journal/curation.js`. Wrong podcast links are corrected in
   `app/journal/repair-body.mjs`.

## When you're done
- Check the Vercel preview on a phone and a laptop before merging.
- If something looks wrong after it goes live, use GitHub's "Revert" button on the
  pull request. That puts the site back the way it was.
