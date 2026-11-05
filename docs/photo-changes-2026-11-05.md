# Photo changes — November 5, 2026 (gallery restored)

Gallery only. Nothing was retouched or painted over. Crops below are straight edge crops.
Originals of replaced files stay in git history.

## Where the full gallery was

The live gallery had been trimmed to 19 photos (`GALLERY_PICKS`). The full set is the
slideshow in `app/components/PhotoGallery.js` at commit `baa5258` (November 3, before
that trim): **92 slides**. Files are in `public/assets/gallery-hw`, `gallery-new`,
`gallery-nov3`, `gallery-picks`, `gallery-oct26`, `gallery`, `gallery-childhood`,
`public/velvet-carousel`, plus `jen-joy.jpg`. Velvet captions and sizes come from
`app/velvet/captions.json` and `app/velvet/slide-sizes.json`. Nothing gallery-sized
was stored in Sanity.

The commit before that, `847e69a`, had **94** slides. Sixteen of those showed the
children's faces and were deleted from `public/` on November 3. They are not back.
94 minus those 16, plus the 19 replacement photos Jen sent that day, is 97. The same
day she had already taken out five more slides (old 46, 48, 55, 62, and 74), which
is the 92. Those five stay out. `new_16.jpg` (old 55) also has a TikTok handle
across the cake, so it stays out.

Numbers below are that 92-slide order (`1 / 92` on About Me that day).

## Matched by the description, not only by the number

| Asked for | 92-slide # | File | How it matched |
|---|---|---|---|
| Playboy SXSW stage photo | 1 | `gallery-hw/hw_01.jpg` | First slide. Stage, Playboy logo, caption already said Rock the Rabbit, SXSW. |
| Blurred kids-and-dogs photo | 42 | `gallery-nov3/01-sleeping-dogs.jpg` | Bed, two blurred faces, two dogs. Same picture as `full-house-kids-dogs.jpg` on About Me. File was already deleted. Not restored. About Me was not changed. |
| Rappelling through the jungle, chat-bubble logo | 51 | `gallery-nov3/11-rappelling.jpg` | Blue helmet, jungle, small chat bubble at the bottom of the old file. |
| Glamour shot, long highlighted hair | 61 | `gallery-new/new_04.jpg` | Studio glamour portrait, long highlighted hair. Already on the About Me red carpet row. Left there. Not added again. |
| Camel | 66 | `gallery-new/new_13.jpg` | Jen beside a camel. The old file showed a child's face, so that file is replaced, not left in `public/`. |

## This change

| What | Detail |
|---|---|
| Restored | The 92-slide set, then the removals below. |
| Removed from the carousel | #1 `hw_01.jpg` (file kept, not linked). #42 not restored. #61 `new_04.jpg` stays on About Me only. |
| Replaced #51 | `11-rappelling.jpg` is Jen's new file (`new-rappel-photo-51.jpg`). No chat bubble. A 1px near-white line on the top edge was cropped off. Now 1320×737. |
| Replaced #66 | `new_13.jpg` is `camel-replacement-nov4.jpg`. The thin beige bar and gold line at the top (32px) were cropped off. The rest of her crop is unchanged, including the blur she made. Now 599×1137. Shown whole, never enlarged past 1.6×. |
| Watermarks | See the list below. |

## TikTok logos and other watermarks

| File | What | What we did |
|---|---|---|
| `gallery-nov3/11-rappelling.jpg` (old #51) | Small chat-bubble logo near the bottom | Gone, because the photo was replaced. |
| `gallery-new/new_16.jpg` | TikTok logo and `@jenarchuleta578` over the cake | Already out of the gallery (November 3). Cropping it would cut the cake. Still out. Flagged for Jen. |
| `gallery-new/new_14.jpg` | Pink "JENNIFER WALCOTT.COM" banner across the bottom, over her leg | Cannot crop the edge without cutting her. Left out of the gallery. File kept. Flagged for Jen. |
| `gallery-picks/spartan-course.jpg` | TikTok and Spartan marks | Already cropped off on October 27. No new mark. Stays in. |

No other TikTok logo turned up on the restored slides (edges and bottoms of the phone photos were checked). Nothing was repainted.

## Captions

Vague or wrong lines such as "Jen Walcott Archuleta", "on a red carpet" (that file is the stage seen from the crowd), "Childhelp", "With Adam", "With friends", and "Photo from Jen's personal collection" now say what is in the picture. Specific lines that were already clear (Tommy Lee, the magazine credits, the Playboy Mansion, Celebrity Fight Night, the Childhelp luncheon) were left as they were. No children's names, no school, no home city or state, no em dashes.

## Loose About Me photos, into the carousel

Three photos that were sitting on their own now show once, in the About Me carousel, whole, with no crop. The black coat (`jen-bw-coat2.jpg`) stays once, directly above "My 20s were amazing. I saw and did things most people dream about." It is not a slide.

| Photo | File | Where it went |
|---|---|---|
| Dark green sequin dress on the beach | `velvet-carousel/10.jpg` | Back into the carousel, with the other velvet slides. It is not under the 20s line. |
| Braids, sunglasses, kissing a puppy | `jen-fun2.jpeg` | Last slides in the carousel. Removed from the page row. |
| White sports top, studio | `jen-fitness.jpg` | Last slides in the carousel. Removed from the page row. |

## Childhelp WINGS photo

The phone black bars and the home-indicator line were cropped off `childhelp-stage-full.png`. Heads and feet stay. Saved as `childhelp-wings.jpg`, 1200 pixels wide. It is the fourth photo under "Want to get involved with me?" No video was added.

## My 20s carousel

Twelve photos sit in a still collage under Jen's two 20s paragraphs. The black coat stays once, above that text, and is not a slide. The dark carousel frame is gone. The phone Crop button was cropped off the black turtleneck. The empty black area was cropped off the bottom of the Playboy race car. Heads were not cropped. No other photo was changed. The archive had no 08 or 10.

The MuscleMag swimsuit cover and the Holistic Health cover are in the main gallery, full and uncropped.

## Brown portrait, fewer flower photos

`brown-dress-portrait.jpg` is in the About Me carousel, whole, with the alt text "Jen Archuleta portrait". Nothing was cropped or retouched.

The floral portrait on About Me (`presskit-headshot-floral.jpg`) stays. These left the carousel so the page is not flower-heavy. The files stay in the repo.

| File | Why it left the carousel |
|---|---|
| `gallery-nov3/07-dressing-room.jpg` | A full floral gown |
| `gallery-new/new_09.jpg` | A large floral dress |
| `gallery-new/new_22.jpg` | A group in floral dresses |
| `gallery-nov4/nov4-04-dogs-and-tortoises.jpg` | The same flower wall as the rescues photo already on the page |

## Soft blur on the children's faces

Eight photos. Where a child's face had a hard square or a tight block, that block is now a soft oval: a Gaussian blur that feathers into the surrounding skin. The blur still hides who the child is. Adults are unchanged. Dogs, clothes, and the rest of each photo are unchanged. Git has no unblurred original of these files, so the oval replaces the block that was already in the file. Nothing was generated or painted.

| File | Where it shows | Whose face |
|---|---|---|
| `full-house-kids-dogs.jpg` | About Me, the family asleep with the rescues | Three faces |
| `gallery-nov3/09-rafting.jpg` | Gallery | Two children in green helmets |
| `gallery-nov3/16-ocean-overlook.jpg` | Gallery | The toddler, and the boy in the cap. The boy in the blue shirt is turned away, so his hair is unchanged. |
| `gallery-nov3/21-rv-family.jpg` | Gallery | Two faces |
| `gallery-nov4/nov4-05-ski-gondola.jpg` | Gallery | The child in the gondola |
| `gallery-nov4/nov4-06-beach-bodyboard.jpg` | Gallery | Three children |
| `gallery-nov4/nov4-07-private-jet.jpg` | Gallery | The child by the window. The girl with the bow is turned away. |
| `gallery-nov4/nov4-13-family-ocean.jpg` | Gallery | Three children |

Left as they were: `gallery-nov3/19-private-jet.jpg` (the baby already had a soft oval), backs of heads with no face (the volcano, the ivy fountain, the mansion lawn, the camel photo), and the pajama photo (those blocks cover names on the shirts). `jen-childhood.jpg` is Jen. The asleep-with-the-rescues photo is not on the homepage. The Journal photos live in Sanity, not in these files, so they were not edited.
