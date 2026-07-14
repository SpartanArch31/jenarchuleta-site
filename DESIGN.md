---
name: Jen Archuleta
description: Author, speaker & podcast site for the memoir Beyond the Velvet Ropes — a warm-editorial light register with a cinematic dark register, sharing one gold-and-oxblood DNA.
colors:
  cream: "#F4EEE3"
  paper: "#FBF7EF"
  linen: "#EDE4D4"
  wheat: "#D8C7A8"
  taupe: "#B7A98C"
  ink: "#221C18"
  ink-soft: "#4A4339"
  ink-mute: "#7A6F5E"
  gold: "#BE9543"
  gold-deep: "#946F2B"
  gold-bright: "#D2A94F"
  candlelight: "#EBD9AC"
  clay: "#763028"
  clay-bright: "#9A4034"
  near-black: "#17120E"
  espresso: "#221B15"
  velvet: "#2C241C"
  border: "#E2D8C6"
  border-strong: "#CBB99B"
  on-accent: "#2A2008"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(3.25rem, 7.5vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.005em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.625rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Cormorant Garamond, Georgia, 'Times New Roman', serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.62
  script:
    fontFamily: "Allura, 'Pinyon Script', cursive"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1
  caps:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "1.05rem"
    fontWeight: 500
    letterSpacing: "0.16em"
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.28em"
  ui:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    letterSpacing: "0.02em"
rounded:
  sm: "3px"
  md: "6px"
  lg: "12px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "96px"
  gutter: "clamp(20px, 5vw, 64px)"
  section: "clamp(64px, 10vw, 144px)"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-accent}"
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.gold-deep}"
    textColor: "{colors.on-accent}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.gold-deep}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  chip-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
---

# Design System: Jen Archuleta

## 1. Overview

**Creative North Star: "The Velvet Threshold"**

Every surface is a doorway. The memoir is titled *Beyond the Velvet Ropes*, and the
whole system is built around the moment of passing through — from the public, curated
front-of-house into the private truth behind it. That idea is literal in the code: a
single gold hairline (the "threshold" motif) marks each passage, and the site runs in
two registers that are the same room under different lighting. The **light register**
is the master brand: warm, paper-toned, editorial, the voice of the reading. The
**dark register** is the cinematic mode: near-black grounds, candlelight gold, the
red-carpet hush. They share one DNA — warm **gold** as the recurring accent and a
whisper of **oxblood** as the emotional undertone.

The typographic thesis is "B's voice, A's backbone": **Cormorant Garamond** carries
both the display name and the long-form memoir reading (the warm, human voice), while
**Cinzel** provides the engraved caps backbone for the monogram, lockups and eyebrows
(the architecture). An **Allura** script signature appears rarely, as a hand-signed
grace note. This is a book brought to the web, not an app dressed in serif.

This system explicitly rejects the tech-author-site defaults: no cream-SaaS card grids,
no purple gradients or neon, no glassmorphism, no big-number hero-metric templates. It
also refuses the loud celebrity-glamour reflex — the glamour is present but hushed, held
in restraint. Warmth is carried by the ink, the gold, and the imagery, never by
gimmick. Elegance here means space and stillness.

**Key Characteristics:**
- Two registers, one DNA: warm editorial light (default) + cinematic dark, unified by gold + oxblood.
- Serif-forward: Cormorant Garamond reads as both display and body; Cinzel is the caps architecture.
- Editorial restraint: small radii, hairline rules, generous white space, low-and-soft warm shadows.
- One signature motif — the gold "velvet-rope threshold" line — used sparingly, never clustered.
- Calm motion: slow, ease-out, opacity/translate/scale only; never bouncy.

## 2. Colors

A warm, candlelit palette: paper-and-ink neutrals lit by a single gold accent, with
oxblood held back as the emotional undertone. The same roles resolve to darker,
cinematic values in the dark register.

### Primary
- **Brand Gold** (`#BE9543`): The recurring accent — fills, hairline rules, the threshold motif, primary buttons, active chips. In dark mode it brightens to **Gold-Bright** (`#D2A94F`). It fails as body text on light (2:1); when gold must be *text* on light it darkens to **Gold-Deep** (`#946F2B`, AA-large) for icons, eyebrows and small labels only.
- **Candlelight** (`#EBD9AC`): A bright warm gold reserved for display text and glints on dark grounds (11.4:1 on near-black). The dark register's accent-ink.

### Secondary
- **Oxblood / Clay** (`#763028` on light, `#9A4034` on dark): The whisper accent — script signature, inline links, the emotional undertone. Never a primary fill; it appears in small doses to warm the gold and signal something personal. Reads AAA as text on light (7.1:1).

### Neutral — light register (warm paper & ink)
- **Cream** (`#F4EEE3`): The primary light body ground. Warm, low, restful.
- **Paper** (`#FBF7EF`): The lightest tone — elevated / card surfaces.
- **Linen** (`#EDE4D4`): Subtle alternate surface (capture bands, sponsor blocks).
- **Wheat / Taupe** (`#D8C7A8` / `#B7A98C`): Deeper warm neutrals for dividers over photography.
- **Ink** (`#221C18`): Near-black, warm — body text and headlines (13.1:1, AAA).
- **Ink-Soft** (`#4A4339`): Secondary text, leads (7.6:1, AAA).
- **Ink-Mute** (`#7A6F5E`): Metadata and captions only — this is AA-large (3.5:1), never small body copy.
- **Borders** (`#E2D8C6` hairline / `#CBB99B` strong): Warm dividers, never cold gray.

### Neutral — dark register (cinematic grounds)
- **Near-Black** (`#17120E`): The dark body ground.
- **Espresso / Velvet** (`#221B15` / `#2C241C`): Elevated and alternate dark surfaces.
- Dark-register text resolves to warm off-whites (`#F3ECDE` body, `#DCCFB5` secondary, `#AD9E82` muted).

### Named Rules
**The Gold-Is-A-Fill Rule.** Brand Gold (`#BE9543`) is for fills, rules and the threshold — never body text on light. It only becomes text as Gold-Deep (`#946F2B`) and only at large/label sizes. If you're typing a sentence in gold on cream, you're wrong.

**The Oxblood Whisper Rule.** Oxblood is a whisper, not a voice. Script signature, links, the occasional pull-quote rule — small doses only. It never carries a surface or a heading.

**The Two-Registers-One-DNA Rule.** Light and dark are never two brands. Every dark surface still resolves through the same semantic tokens (`--bg`, `--accent`, `--text`); gold and oxblood persist across both. Don't invent a dark-only accent.

## 3. Typography

**Display / Body Font:** Cormorant Garamond (with Georgia, serif)
**Backbone Caps Font:** Cinzel (with Georgia, serif)
**Script Accent Font:** Allura (with Pinyon Script, cursive)
**UI / Label Font:** Hanken Grotesk (with system-ui, sans-serif)

**Character:** The pairing is a contrast on the serif↔structure axis: Cormorant is a
high-contrast humanist serif set large (it reads small, so display sizes run generous),
tuned for warmth and reading; Cinzel is an engraved Roman capital used only in caps for
architecture and lockups. Hanken Grotesk is the quiet sans that handles everything
functional — nav, buttons, metadata — so the serif never has to do UI work. Allura is
the rare handwritten grace note.

### Hierarchy
- **Display XL** (Cormorant, 600, `clamp(3.25rem, 7.5vw, 6rem)`, line-height 1.04): The hero name lockup. The single loudest voice on the site.
- **Display L** (Cormorant, 600, `clamp(2.5rem, 5vw, 3.75rem)`): Section-opening headlines, book title, capture headings.
- **Headline / H1** (Cormorant, 600, `clamp(2.25rem, 4vw, 3rem)`, line-height 1.2): Page and article titles. `text-wrap: balance`.
- **Title / H3** (Cormorant, 600, `1.625rem`): Sub-section and card headings.
- **Body** (Cormorant, 400, `1.1875rem` / 19px, line-height 1.62): Default reading. Lead paragraphs step up to `1.375rem`. Reading column capped at `66ch` (`--measure`), article width `720px`.
- **Script** (Allura, 400, `clamp(2rem, 4vw, 3rem)`, line-height 1): The signature accent — hero flourish, rare grace notes, in oxblood.
- **Caps / Brand** (Cinzel, 500, `1.05rem`, letter-spacing `0.16em`, uppercase): Monogram, wordmark, footer mono.
- **Label / Eyebrow** (Hanken Grotesk, 600, `0.6875rem` / 11px, letter-spacing `0.28em`, uppercase): Section eyebrows and metadata kickers, in Gold-Deep.
- **UI** (Hanken Grotesk, 600, `0.9375rem` / 15px, letter-spacing `0.02em`): Buttons and nav.

### Named Rules
**The One-Voice-Per-Job Rule.** Cormorant reads and displays; Cinzel is caps-only architecture; Hanken Grotesk does all UI; Allura signs. Never set body copy in Cinzel, never set a button in Cormorant, never let the script carry more than a few words.

**The Set-It-Large Rule.** Cormorant Garamond reads small for its point size — that's why the scale runs generous (body at 19px, display up to 6rem). Don't shrink it to "normal" web sizes or the memoir voice goes thin.

## 4. Elevation

Flat and editorial by default. Depth is conveyed through warm tonal layering
(cream → paper → linen) and hairline rules far more than through shadows. Shadows exist,
but they are low, soft and warm-tinted — reserved for genuinely lifted objects
(portraits, the book cover, cards), never sprinkled on flat sections. On dark grounds
the shadow deepens toward true black, and a soft **gold glow** replaces it around
accent elements.

### Shadow Vocabulary
- **Shadow SM** (`0 1px 2px rgba(34,28,24,.05)`): Barely-there lift on small elevated chips.
- **Shadow** (`0 2px 6px rgba(34,28,24,.05), 0 14px 36px rgba(34,28,24,.08)`): Standard card / mini-card lift.
- **Shadow LG** (`0 4px 10px rgba(34,28,24,.06), 0 36px 80px rgba(34,28,24,.14)`): Hero portrait, book cover — the two hero objects.
- **Gold Glow** (`0 0 28px rgba(210,169,79,.28)`): Dark-register only — a warm halo under gold accents, in place of a drop shadow.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. A shadow is earned by a photographic or product object that genuinely sits above the page (portrait, cover, card) — not by a section, a button, or a text block.

**The Warm-Shadow Rule.** Light-mode shadows are tinted with ink (`rgba(34,28,24,…)`), never neutral black. A cold gray shadow on warm paper reads as a 2014 app.

## 5. Components

### Buttons
- **Shape:** Fully pill (`999px` radius). Uppercase Hanken Grotesk, letter-spacing `0.12em`, padding `14px 26px` (`.btn-sm`: `10px 18px`).
- **Primary:** Gold fill (`--accent`) with dark text (`--on-accent` `#2A2008`). Hover deepens the fill to Gold-Deep (`#946F2B`); active presses to `scale(0.98)`.
- **Ghost:** Transparent with a strong hairline border (`--border-strong`) and Gold-Deep text. Hover shifts the border to full gold.
- **Disabled:** Muted text on a hairline border, no pointer events.
- **Motion:** Color and transform transition on `--dur-fast` (160ms) with ease-out; never a background *size* animation.

### Chips (journal category filters)
- **Style:** Pill outline — transparent fill, strong hairline border, secondary-ink text.
- **State:** Hover shifts border to gold. Active/selected inverts to a solid gold fill with dark text and no border (mirrors the primary button), so the active filter reads as "lit."

### Cards / Containers (mini cards, post cards, sponsor & CTA blocks)
- **Corner Style:** Large radius (`12px`) — the softest corner in the system, and only on true content cards.
- **Background:** Paper (`--surface`) on light; the alternate-surface linen for capture/sponsor bands.
- **Shadow Strategy:** Mostly flat with a hairline border; standard **Shadow** only when the card is genuinely lifted (see Elevation).
- **Border:** Warm hairline (`--hairline`). `overflow: hidden` so hero images bleed to the card edge.
- **Internal Padding:** `20px` body padding; the CTA/sponsor blocks step up to `24px`.

### Navigation
- **Style:** Sticky top bar over a translucent, blurred body-tint (`color-mix(--bg 88%)` + `blur(8px)`) with a bottom hairline. Cinzel caps wordmark on the left; Hanken Grotesk uppercase links (`0.78rem`, `0.14em` tracking) on the right.
- **States:** Links rest in secondary ink; hover shifts to Gold-Deep and grows a 1px gold underline from the left (scaleX, `--dur-fast`).
- **Mobile:** Below 760px the links collapse behind a hamburger into a full-width dropdown panel with its own hairline and shadow.

### The Threshold (signature component)
The brand's one custom motif — a restrained "velvet-rope / doorway" line marking a
passage from surface to truth. Two forms: a **vertical gold post** (`.threshold-post`,
a 1px gradient bar that fades at both ends) and a **horizontal rule with a center
diamond** (`.threshold-rule`, gold hairlines flanking a 5px rotated square). On scroll,
the hairlines draw outward from the diamond (scaleX from the center) and the diamond
fades in first. Use exactly one per passage — never a cluster.

## 6. Do's and Don'ts

### Do:
- **Do** keep Brand Gold (`#BE9543`) as a fill / rule / motif color; when it must be text on light, use Gold-Deep (`#946F2B`) at label or large sizes only.
- **Do** set Cormorant Garamond generously — 19px body, display up to 6rem — because it reads small for its point size.
- **Do** carry both registers through the same semantic tokens (`--bg`, `--accent`, `--text`); gold and oxblood persist in light and dark alike.
- **Do** keep surfaces flat by default; reserve the warm, ink-tinted shadows for genuinely lifted objects (portrait, book cover, cards).
- **Do** use the threshold motif to mark a passage — one per section, and let it draw from the center diamond outward.
- **Do** keep motion calm: opacity / translate / scale only, slow ease-out durations (`--dur` 280ms, `--dur-slow` 520ms), with a `prefers-reduced-motion` fallback that zeroes durations.
- **Do** hold body reading to the `66ch` measure / `720px` article width.

### Don't:
- **Don't** set body text or sentences in Brand Gold on cream — it fails contrast (2:1). Gold is a fill, not a voice.
- **Don't** let oxblood carry a surface or a heading; it is a whisper — links, the script signature, the odd rule.
- **Don't** use cold, neutral-black shadows on the warm paper ground; tint every light-mode shadow with ink.
- **Don't** invent a dark-only accent or treat light and dark as two brands — one DNA, two lightings.
- **Don't** reach for the tech-author defaults this brand rejects: no purple gradients, neon, glassmorphism, or big-number hero-metric templates.
- **Don't** cluster the threshold motif or scatter it decoratively — one deliberate passage line, or none.
- **Don't** shrink Cormorant to "normal" web sizes or set UI/buttons in it; Hanken Grotesk does all functional UI work.
- **Don't** put Ink-Mute (`#7A6F5E`) on small body copy — it's AA-large, for metadata and captions only.
