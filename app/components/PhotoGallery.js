'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import captions from '../velvet/captions.json';
import sizes from '../velvet/slide-sizes.json';

// One slideshow, on About. The Hollywood set is first, together, so those
// slides lead. Then portraits that are not already on the homepage or About
// (the About portrait is presskit-headshot-floral, so it is not a slide), then
// Velvet Circle photos, then gallery-new. A file stays in the repo when
// its slide is left out.
//
// HOW THE PHOTOS SHOW (Jen, October 27): big, clear, whole. Every slide is
// the whole file at its real ratio, sized as large as the stage allows
// (about 900px wide for a landscape photo on a laptop, nearly the full
// screen width on a phone). The white mat hugs the photo. Nothing is
// cover-cropped into a shared frame and nothing is stretched. A small file
// is never blown up more than 1.6x, so it cannot go blurry. Faces are
// unretouched. Only the current slide and its two neighbors are mounted.
//
// Per-photo fixes, October 27 (crops only, no retouching; see
// docs/photo-changes-2026-10-27.md for every file):
// - Old slide 46 (gallery-new/new_03, a tight crop with phone controls at
//   the top) is now the full black-and-white portrait, jen-headshot-bw.
// - Old slide 69 (gallery-picks/131, a 234px thumbnail) is now the full
//   Spartan photo Jen sent (gallery-picks/spartan-course). The gray band
//   and the TikTok/Spartan marks were cropped off, nothing painted over.
// - Old slide 70 (gallery-picks/132) is removed, file and all.
// - Old slides 43, 44, 45 (the beach walk, the white rompers, and the
//   resort pool) are still the small files. Jen's larger originals replace
//   them when Adam drops them in.
// - Phone buttons, tag icons, and white or black edge bands were cropped
//   off hw_01, hw_03, hw_05, hw_07, hw_09, velvet 32, new_19, new_23,
//   new_24, new_34, new_35, family-beach-hands, pajamas, hangar,
//   dog-tortoise, 123, jet-seats, and the childhood portrait.
// - velvet-carousel 13, 16, 18, 19, and 31 were 4:5 crops that cut people
//   off at the edges. They are now the full photos from the book.
//
// November 3 (Jen's list):
// - Slides 46, 48, 55, 62, and 74 are out (jen-headshot-bw, new_05,
//   new_16, new_28, gallery-picks/160). See HIDDEN_SLIDE_SRC.
//
// November 5 (Jen): the full gallery is back. The 19-photo shortlist is
// gone. The set is the 92-slide gallery from November 3 (commit baa5258),
// then these are out. See OUT_OF_GALLERY.
// - Old #1, hw_01, the Playboy Rock the Rabbit stage photo.
// - Old #42, the blurred kids-and-dogs bed photo. That file stays deleted.
// - The two glamour portraits (jen-glam and new_04) are slides here, not
//   beside the 20s line. The black coat is not repeated in this slideshow.
// - gallery-new/new_14.jpg, the beach bodyboard photo. A
//   "JENNIFER WALCOTT.COM" banner sits over her leg, so it cannot be
//   cropped off an edge. Left out and flagged.
// new_16 (TikTok handle over the birthday cake) was already out and stays out.
// Old #51 is the new rappelling photo. Old #66 is the new camel photo.
// - Every photo of her children is out, and those files are deleted from the
//   site: velvet 35, family-beach-hands, girls-beach-walk,
//   girls-beach-rompers, ski, pajamas, hug, lawn, hangar, jet-seats, beach,
//   cliff, tree, driveway, ozarks-canoe, and muskoka-boat. (Velvet 24, 25,
//   26, Quiet_Mornings.jpeg, and new_15 were never shown but sat in the
//   public folder with the kids' faces, so they are deleted too.)
// - In their place, Jen's 19 new photos (gallery-nov3, her numbering, the
//   kids' faces already blurred by her) follow the family photos. Never
//   add a photo of the children unless Jen supplied that exact file.
//
// Out of this slideshow:
// presskit-headshot-glam (the old home hero). jen-fitness and jen-fun2 stay
// on the About photo row, above this slideshow. jen-fun (group of adults,
// not a dog photo). jen-bw-coat and velvet 07 (the coat is the photo above
// the 20s line, as jen-bw-coat2). That coat is not a slide.
// 08 and 44 are already out of captions.json. 09 is left out. 24, 25, 26,
// and 35 (the children) were deleted on November 3. 27 and 45 are dog
// photos on /pups. 43 is the same Urban Axes outing
// as gallery-new new_24, so new_24 stays.
// gallery-new left out: new_02, new_10, new_11, new_12, new_15, new_17,
// new_20, new_21, new_26, new_27. new_27 stays out. It is not the same
// photo as velvet 34. new_17, new_20, and new_21 repeat the
// Childhelp luncheon in velvet 37, which stays. new_10, new_11, and
// new_12 are on /pups. new_01, new_29, new_30, new_32, and new_33 are not
// in the repo.
const BLANK_ALT = 'Photo from Jen’s personal collection';

const HOLLYWOOD = [
  {
    src: '/assets/gallery-hw/hw_01.jpg',
    alt: 'On stage at Playboy’s Rock the Rabbit party, SXSW',
    caption: 'On stage at Playboy’s Rock the Rabbit party, SXSW',
    width: 1242,
    height: 720,
  },
  {
    src: '/assets/gallery-hw/hw_02.jpg',
    alt: 'On a dark stage, seen from the crowd, wearing bunny ears',
    caption: 'On a dark stage, seen from the crowd, wearing bunny ears',
    width: 1320,
    height: 1067,
  },
  {
    src: '/assets/gallery-hw/hw_03.jpg',
    alt: 'With Tommy Lee',
    caption: 'With Tommy Lee',
    width: 960,
    height: 812,
  },
  {
    src: '/assets/gallery-hw/hw_04.jpg',
    alt: 'With Howard Stern',
    caption: 'With Howard Stern',
    width: 1242,
    height: 950,
  },
  {
    src: '/assets/gallery-hw/hw_05.jpg',
    alt: 'With Shaggy in Los Angeles',
    caption: 'With Shaggy in Los Angeles',
    width: 1210,
    height: 1287,
  },
  {
    src: '/assets/gallery-hw/hw_06.jpg',
    alt: 'My name on the Palms marquee in Las Vegas',
    caption: 'My name on the Palms marquee in Las Vegas',
    width: 640,
    height: 480,
  },
  {
    src: '/assets/gallery-hw/hw_07.jpg',
    alt: 'Swimming with a dolphin',
    caption: 'Swimming with a dolphin',
    width: 1179,
    height: 721,
  },
  {
    src: '/assets/gallery-hw/hw_09.jpg',
    alt: 'Jen in a denim skirt beside a man in a dark coat, at a Playboy sign',
    caption: 'Jen in a denim skirt beside a man in a dark coat, at a Playboy sign',
    width: 786,
    height: 1570,
  },
];

const PORTRAITS = [
  {
    src: '/assets/jen-joy.jpg',
    alt: 'Smiling, with a small monkey on her shoulder',
    caption: 'Smiling, with a small monkey on her shoulder',
    width: 841,
    height: 1960,
  },
  {
    src: '/assets/jen-beauty.jpg',
    alt: 'Jen Archuleta smiling in a white top',
    width: 900,
    height: 1520,
  },
];

// Left out of the slideshow; they stay in captions.json.
const HOME_ONLY_SKIP = new Set([
  '07.jpg',
  '09.jpg',
  '27.jpg',
  '33.jpg',
  '34.jpg',
  '36.jpg',
  '43.jpg',
  '45.jpg',
]);

const FAMILY = captions.filter((item) => !HOME_ONLY_SKIP.has(item.file)).map((item) => {
  const caption = typeof item.caption === 'string' ? item.caption.trim() : '';
  const [width, height] = sizes[item.file];
  return {
    src: `/velvet-carousel/${item.file}`,
    alt: caption || BLANK_ALT,
    caption,
    width,
    height,
  };
});

// October 27, after the velvet family slides. pool-sombreros is a small
// file waiting on Jen's larger original.
const FAMILY_OCT27 = [
  { src: '/assets/gallery/pool-sombreros.jpg', alt: 'Four friends in sombreros beside a pool', caption: 'Four friends in sombreros beside a pool', width: 295, height: 391 },
];

// November 3: Jen's new photos, in her numbering (there is no 06 or 17).
// They replace the photos of her children; the kids' faces are blurred in
// her files. 13 is the Ozarks canoe, so it keeps that caption.
const NOV3 = [
  { src: '/assets/gallery-nov3/02-beach-kiss.jpg', alt: 'A kiss on the beach', width: 951, height: 1761 },
  { src: '/assets/gallery-nov3/03-wedding-beach.jpg', alt: 'Jen and Adam on their wedding day, on the beach at sunset', width: 1308, height: 1319 },
  { src: '/assets/gallery-nov3/04-bride-friend.jpg', alt: 'Jen as a bride, laughing with a friend', width: 1320, height: 1962 },
  { src: '/assets/gallery-nov3/05-fashion-show.jpg', alt: 'A fashion show luncheon', width: 1316, height: 1756 },
  { src: '/assets/gallery-nov3/07-dressing-room.jpg', alt: 'Jen peeking out of a dressing room with a friend', width: 1316, height: 1756 },
  { src: '/assets/gallery-nov3/08-volcano-railing.jpg', alt: 'The family looking out at the mountains', width: 1316, height: 739 },
  { src: '/assets/gallery-nov3/09-rafting.jpg', alt: 'White-water rafting', width: 1316, height: 883 },
  { src: '/assets/gallery-nov3/10-houseboat-couple.jpg', alt: 'Jen and Adam on a houseboat', width: 1316, height: 1756 },
  { src: '/assets/gallery-nov3/11-rappelling.jpg', alt: 'Rappelling through the jungle in a blue helmet', caption: 'Rappelling through the jungle in a blue helmet', width: 1320, height: 737 },
  { src: '/assets/gallery-nov3/12-boat.jpg', alt: 'A day on the boat', width: 1316, height: 1756 },
  { src: '/assets/gallery-nov3/13-canoe.jpg', alt: 'Ozarks', caption: 'Ozarks', width: 952, height: 1202 },
  { src: '/assets/gallery-nov3/14-grand-canyon.jpg', alt: 'Jen on a hiking trail', width: 1160, height: 1055 },
  { src: '/assets/gallery-nov3/15-lake-jump.jpg', alt: 'A leap into the lake', width: 1316, height: 1756 },
  { src: '/assets/gallery-nov3/16-ocean-overlook.jpg', alt: 'Above the ocean', width: 1792, height: 1008 },
  { src: '/assets/gallery-nov3/18-mansion-lawn.jpg', alt: 'On the lawn', width: 1792, height: 1008 },
  { src: '/assets/gallery-nov3/19-private-jet.jpg', alt: 'In front of a private jet', width: 1600, height: 1200 },
  { src: '/assets/gallery-nov3/20-spartan-race.jpg', alt: 'Jen and a friend after a Spartan race', width: 1264, height: 1568 },
  { src: '/assets/gallery-nov3/21-rv-family.jpg', alt: 'The family in front of the RV', width: 1600, height: 1200 },
];

const GALLERY_NEW = [
  { src: '/assets/jen-headshot-bw.jpg', alt: 'Jen Archuleta in a black and white portrait', width: 1320, height: 1946 },
  { src: '/assets/jen-glam.jpg', alt: 'Jen Archuleta, glamour portrait', width: 700, height: 835 },
  { src: '/assets/gallery-new/new_04.jpg', alt: 'Jen Archuleta, glamour headshot', width: 1320, height: 1537 },
  { src: '/assets/gallery-new/new_05.jpg', alt: 'Jen Archuleta with a friend', width: 1280, height: 1600 },
  { src: '/assets/gallery-new/new_06.jpg', alt: 'Selfie with a friend, both in sunglasses and backward caps', caption: 'Selfie with a friend, both in sunglasses and backward caps', width: 1065, height: 1600 },
  { src: '/assets/gallery-new/new_07.jpg', alt: 'Close-up with a friend making a face, outdoors', caption: 'Close-up with a friend making a face, outdoors', width: 1266, height: 1600 },
  { src: '/assets/gallery-new/new_08.jpg', alt: 'Jen Archuleta with a black sports car', width: 869, height: 1232 },
  { src: '/assets/gallery-new/new_09.jpg', alt: 'Jen Archuleta greeting friends at a party', width: 1320, height: 837 },
  { src: '/assets/gallery-new/new_13.jpg', alt: 'Jen in an orange dress and a flowered hat, holding a camel lead', caption: 'Jen in an orange dress and a flowered hat, holding a camel lead', width: 599, height: 1137 },
  { src: '/assets/gallery-new/new_14.jpg', alt: 'Jen Archuleta on the beach with a bodyboard', width: 1097, height: 1600 },
  { src: '/assets/gallery-new/new_16.jpg', alt: 'Jen Archuleta celebrating her birthday', width: 1168, height: 1460 },
  { src: '/assets/gallery-new/new_18.jpg', alt: 'Jen Archuleta with a birthday cake', width: 827, height: 1002 },
  { src: '/assets/gallery-new/new_19.jpg', alt: 'Six friends lined up indoors, several in cowboy boots', caption: 'Six friends lined up indoors, several in cowboy boots', width: 1200, height: 1591 },
  { src: '/assets/gallery-new/new_22.jpg', alt: 'Jen Archuleta with friends by a pool', width: 1224, height: 917 },
  { src: '/assets/gallery-new/new_23.jpg', alt: 'Jen Archuleta with her team at a race', width: 828, height: 876 },
  { src: '/assets/gallery-new/new_24.jpg', alt: 'Jen Archuleta with friends at Urban Axes', width: 828, height: 818 },
  { src: '/assets/gallery-new/new_25.jpg', alt: 'Jen Archuleta at a group dinner', width: 1600, height: 1200 },
  { src: '/assets/gallery-new/new_28.jpg', alt: 'Jen Archuleta with a friend', width: 829, height: 1600 },
  { src: '/assets/gallery-new/new_34.jpg', alt: 'Jen Archuleta with her husband', width: 1179, height: 1097 },
  { src: '/assets/gallery-new/new_35.jpg', alt: 'Jen Archuleta on the beach', width: 1320, height: 1281 },
  { src: '/assets/gallery-new/new_36.jpg', alt: 'A magazine page about Jen Archuleta', width: 1320, height: 1607 },
  // Nov 10 (Jen): the Calgary Sun clipping replaces the scrapbook page (new_38).
  { src: '/assets/gallery-nov10/calgary-sun-playmates.jpg', alt: 'Calgary Sun photo of Jen Archuleta with another Playmate', credit: 'Robin Kuniski, Calgary Sun', width: 1070, height: 986 },
];

// Added after the existing slides, in numeric order. 113 and 116 are
// the same pictures as hw_01 and hw_06, so they are not repeated here.
// 118 is the same photo as gallery-new/new_10.jpg, a pup photo on /pups.
// Jen removed nine of these (old slides 65, 68, 72, 77, 79, 82, 88, 92, 94),
// then 66 (129.jpg), 69 (137.jpg), and 82 (169.jpg), then on October 27
// slide 70 (132.jpg). Those files left the repo because nothing else
// referenced them.
const PICKS = [
  { src: '/assets/gallery-picks/123.jpg', alt: 'With a friend in a red dress, at night', caption: 'With a friend in a red dress, at night', width: 1320, height: 1192 },
  { src: '/assets/gallery-picks/spartan-course.jpg', alt: 'Jen Archuleta crawling under the wire at a Spartan race', width: 1320, height: 764 },
  { src: '/assets/gallery-picks/141.jpg', alt: 'Jen Archuleta in a yellow bikini by the ocean', width: 1066, height: 1332 },
  { src: '/assets/gallery-picks/142.jpg', alt: 'Jen Archuleta in a black and white striped bikini, holding a whistle', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/146.jpg', alt: 'A casino marquee for Playboy’s Hollywood Comedy Tour, listing the 2006 Calendar Playmate', width: 664, height: 830 },
  { src: '/assets/gallery-picks/151.jpg', alt: 'Jen Archuleta with a man in sunglasses and a black jacket', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/154.jpg', alt: 'Jen Archuleta by the river', width: 640, height: 800 },
  { src: '/assets/gallery-picks/155.jpg', alt: 'Jen in Bangkok', caption: 'Jen in Bangkok', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/157.jpg', alt: 'Studio portrait in a white tank top', caption: 'Studio portrait in a white tank top', width: 808, height: 1010 },
  { src: '/assets/gallery-picks/158.jpg', alt: 'In a red dress on a step-and-repeat, beside a man in a suit', caption: 'In a red dress on a step-and-repeat, beside a man in a suit', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/159.jpg', alt: 'Indoors beside a man in a navy vest', caption: 'Indoors beside a man in a navy vest', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/160.jpg', alt: 'Jen Archuleta with Adam at an outdoor bar', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/164.jpg', alt: 'Costa Rica', caption: 'Costa Rica', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/168.jpg', alt: 'Jen Archuleta and a friend in knitted turkey hats', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/171.jpg', alt: 'Jen Archuleta with a group of friends in a restaurant', width: 1200, height: 1500 },
  { src: '/assets/gallery-picks/175.jpg', alt: 'Three friends in knitted turkey hats', caption: 'Three friends in knitted turkey hats', width: 960, height: 884 },
];

// October 26 batch, after the picks, in Jen's order. The five dogs under
// the bougainvillea are already dogs.jpg. The photos of the children from
// this batch were removed on November 3 (see the top of this file).
// Full frames, no upscaling.
const OCT26 = [
  { src: '/assets/gallery-oct26/wedding.jpg', alt: 'A wedding at sunset', width: 1070, height: 1147 },
  { src: '/assets/gallery-oct26/snow.jpg', alt: 'Jen Archuleta in the snow', width: 1320, height: 1266 },
  { src: '/assets/gallery-oct26/jet-cabin.jpg', alt: 'Inside a private jet', width: 1029, height: 845 },
  { src: '/assets/gallery-oct26/jet-stairs.jpg', alt: 'On the stairs of a private jet', width: 1320, height: 1271 },
  { src: '/assets/gallery-oct26/dog-tortoise.jpg', alt: 'A rescue on a tortoise', width: 1320, height: 1320 },
  { src: '/assets/gallery-oct26/tortoise.jpg', alt: 'A tortoise with greens', width: 665, height: 940 },
];

// November 4 batch, after OCT26. No captions (Jen). Children's faces and
// the names on the pajama shirts are blurred; screenshots cropped to the photo.
const NOV4 = [
  // Nov 5, 2026: nov4-01, nov4-03, nov4-06 and nov4-07 are Jen's own originals, shown with
  // NO blur, on Adam's explicit decision ("No blur at all", names on the pajama
  // shirts included). This is a deliberate exception to the kids rule in
  // AGENTS.md. Do not re-blur or swap these without asking Adam and Jen.
  { src: '/assets/gallery-nov4/nov4-01-christmas-tree.jpg', alt: 'Christmas tree with a ladder', caption: '', width: 1320, height: 1216 },
  { src: '/assets/gallery-nov4/nov4-02-ivy-fountain.jpg', alt: 'A little girl at an ivy-covered fountain', caption: '', width: 1320, height: 1274 },
  { src: '/assets/gallery-nov4/nov4-03-christmas-pajamas.jpg', alt: 'Jen Archuleta and her family in matching Christmas pajamas', caption: '', width: 1320, height: 1164 },
  { src: '/assets/gallery-nov4/nov4-04-dogs-and-tortoises.jpg', alt: 'Five rescues and two tortoises on the grass', caption: '', width: 1102, height: 863 },
  { src: '/assets/gallery-nov4/nov4-05-ski-gondola.jpg', alt: 'Jen Archuleta with a toddler on a ski gondola', caption: '', width: 1289, height: 1600 },
  { src: '/assets/gallery-nov4/nov4-06-beach-bodyboard.jpg', alt: 'A dad and kids walking to the beach with a yellow bodyboard', caption: '', width: 1320, height: 1165 },
  { src: '/assets/gallery-nov4/nov4-07-private-jet.jpg', alt: 'Two kids inside a private jet', caption: '', width: 922, height: 1259 },
  { src: '/assets/gallery-nov4/nov4-08-book-signing.jpg', alt: 'Jen Archuleta at her book signing', caption: '', width: 1155, height: 876 },
  { src: '/assets/gallery-nov4/nov4-09-playboy-collage.jpg', alt: 'Collage of Jen Archuleta from Playboy', caption: '', width: 1320, height: 1202 },
  { src: '/assets/gallery-nov4/nov4-10-white-bikini-studio.jpg', alt: 'Jen Archuleta in a white bikini, studio photo', caption: '', width: 400, height: 242 },
  { src: '/assets/gallery-nov4/nov4-11-beach-bikini.jpg', alt: 'Jen Archuleta on the beach in a coral top and blue bikini', caption: '', width: 365, height: 547 },
  { src: '/assets/gallery-nov4/nov4-12-bunny-costume.jpg', alt: 'Jen Archuleta in a bunny costume with her husband at a Playboy party', caption: '', width: 1259, height: 1600 },
  { src: '/assets/gallery-nov4/nov4-13-family-ocean.jpg', alt: 'Jen Archuleta and her family in the ocean', caption: '', width: 1063, height: 1600 },
  { src: '/assets/gallery-nov4/nov4-14-hawaii-beach.jpg', alt: 'Jen Archuleta with a friend on a Hawaii beach', caption: '', width: 1275, height: 1600 },
  { src: '/assets/gallery-nov4/nov4-15-red-leather-seat.jpg', alt: 'Jen Archuleta in a red leather seat', caption: '', width: 1360, height: 1450 },
  { src: '/assets/gallery-nov4/nov4-16-ballet-chair.jpg', alt: 'Jen Archuleta on a chair in ballet shoes', caption: '', width: 910, height: 1600 },
  { src: '/assets/gallery-nov4/nov4-17-pink-aprons.jpg', alt: 'Jen Archuleta and a friend in pink aprons', caption: '', width: 1320, height: 1287 },
  { src: '/assets/gallery-nov4/nov4-18-playboy-lite-red-carpet.jpg', alt: 'Jen Archuleta with Hugh Hefner and a group on the Playboy red carpet', caption: '', width: 612, height: 396 },
  { src: '/assets/gallery-nov4/nov4-19-magazine-spread-1.jpg', alt: 'Magazine spread of Jen Archuleta and her husband', caption: '', width: 1104, height: 1600 },
  { src: '/assets/gallery-nov4/nov4-20-magazine-spread-2.jpg', alt: 'Magazine spread of Jen Archuleta and her husband on a sofa', caption: '', width: 1200, height: 1600 },
];

// Childhood portrait. The Hollywood set stays first, so this follows every earlier slide.
const CHILDHOOD = [
  { src: '/assets/gallery-childhood/jen-childhood.jpg', alt: 'Jen as a girl', width: 552, height: 552 },
];

// November 4, second batch. No captions. Alt text names only Jen.
const NOV4B = [
  { src: '/assets/gallery-nov4b/nov4b-02-timberlake-nelly-robes.jpg', alt: 'Jen Archuleta in a robe', caption: '', width: 793, height: 655 },
  { src: '/assets/gallery-nov4b/nov4b-03-siren-song-magazine.jpg', alt: 'Jen Archuleta on a magazine page', caption: '', width: 917, height: 1243 },
  { src: '/assets/gallery-nov4b/nov4b-04-two-women-laughing.jpg', alt: 'Jen Archuleta laughing with a friend', caption: '', width: 1242, height: 1550 },
  { src: '/assets/gallery-nov4b/nov4b-05-beach-bikini-lookback.jpg', alt: 'Jen Archuleta on the beach', caption: '', width: 1242, height: 930 },
  { src: '/assets/gallery-nov4b/nov4b-06-couch-fishburne.jpg', alt: 'Jen Archuleta seated on a couch', caption: '', width: 1242, height: 1188 },
  { src: '/assets/gallery-nov4b/nov4b-07-purple-dress-magazine.jpg', alt: 'Jen Archuleta in a purple dress on a magazine page', caption: '', width: 900, height: 1135 },
  { src: '/assets/gallery-nov4b/nov4b-08-bunny-ears-party.jpg', alt: 'Jen Archuleta at a party in bunny ears', caption: '', width: 861, height: 940 },
  { src: '/assets/gallery-nov4b/nov4b-09-four-people-beads.jpg', alt: 'Jen Archuleta with friends', caption: '', width: 1040, height: 820 },
  { src: '/assets/gallery-nov4b/nov4b-10-green-top-white-shorts.jpg', alt: 'Jen Archuleta in a green top and white shorts', caption: '', width: 1150, height: 1480 },
  { src: '/assets/gallery-nov4b/nov4b-11-hefner-calendar-signing.jpg', alt: 'Jen Archuleta at a calendar signing', caption: '', width: 930, height: 700 },
  { src: '/assets/gallery-nov4b/nov4b-12-sunglasses-party.jpg', alt: 'Jen Archuleta at a party in sunglasses', caption: '', width: 980, height: 820 },
  { src: '/assets/gallery-nov4b/nov4b-13-award-podium.jpg', alt: 'Jen Archuleta at an awards podium', caption: '', width: 1040, height: 660 },
  // Jen, Nov 10: her eight new photos, right after the Key to the City, in her order.
  { src: '/assets/gallery-nov10/nov10-01-bali-helicopter.jpg', alt: 'Jen Archuleta walking from a helicopter in Bali', caption: '', width: 1122, height: 1062 },
  { src: '/assets/gallery-nov10/nov10-02-roberto-cavalli-milan.jpg', alt: 'Jen Archuleta with Roberto Cavalli and Playboy bunnies in Milan', caption: '', width: 1320, height: 1003 },
  { src: '/assets/gallery-nov10/nov10-03-bali-evening.jpg', alt: 'Jen Archuleta at sunset between Balinese shrines and gold umbrellas', caption: '', width: 1320, height: 956 },
  { src: '/assets/gallery-nov10/nov10-04-bali-musicians.jpg', alt: 'Jen Archuleta with Balinese musicians and their kendang drums', caption: '', width: 1236, height: 748 },
  { src: '/assets/gallery-nov10/nov10-05-bali-airport.jpg', alt: 'Jen Archuleta at the Bali airport at sunset, a plane behind her', caption: '', width: 1124, height: 820 },
  { src: '/assets/gallery-nov10/nov10-06-singapore-airlines.jpg', alt: 'Jen Archuleta in her seat on a Singapore Airlines flight', caption: '', width: 1320, height: 1090 },
  { src: '/assets/gallery-nov10/nov10-07-st-barts.jpg', alt: 'Jen Archuleta above the ocean in St. Barts', caption: '', width: 620, height: 622 },
  { src: '/assets/gallery-nov10/nov10-08-the-archuletas.jpg', alt: 'Jen Archuleta with Adam and family', caption: '', width: 834, height: 1050 },
  { src: '/assets/gallery-nov4b/nov4b-14-raising-stakes-poker-flyer.jpg', alt: 'Jen Archuleta on a poker flyer', caption: '', width: 1400, height: 1400 },
  { src: '/assets/gallery-nov4b/nov4b-15-featured-girl-magazine.jpg', alt: 'Jen Archuleta on a magazine cover', caption: '', width: 1242, height: 1231 },
  { src: '/assets/gallery-nov4b/nov4b-16-playboy-painting-imagecollect.jpg', alt: 'Jen Archuleta in a painted portrait', caption: '', width: 1157, height: 1600 },
  { src: '/assets/gallery-nov4b/nov4b-17-bishop-photo.jpg', alt: 'Jen Archuleta in a portrait', caption: '', width: 1110, height: 900 },
  { src: '/assets/gallery-nov4b/nov4b-18-thanksgiving-eve-tommy-lee.jpg', alt: 'Jen Archuleta at a gathering', caption: '', width: 1400, height: 1400 },
];

// Oct 27: slides Jen took out, and duplicate pairs (one copy stays, the
// sharper or higher-detail file). Files stay in the repo.
// 141 and 142 (old slides 68 and 69), 155 (Jen in Bangkok, old 73).
// Nov 3: old slides 46, 48, 55, 62, and 74. jen-headshot-bw stays the
// Glamorous press headshot on Media; it is just not a gallery slide.
const HIDDEN_SLIDE_SRC = new Set([
  '/assets/gallery-picks/141.jpg',
  '/assets/gallery-picks/142.jpg',
  '/assets/gallery-picks/155.jpg',
  '/assets/gallery-picks/146.jpg',
  '/assets/gallery-picks/151.jpg',
  '/assets/gallery-picks/164.jpg',
  '/assets/gallery-picks/168.jpg',
  '/assets/gallery-picks/171.jpg',
  '/assets/jen-beauty.jpg',
  '/assets/jen-headshot-bw.jpg',
  '/assets/gallery-new/new_05.jpg',
  '/assets/gallery-new/new_16.jpg',
  '/assets/gallery-new/new_28.jpg',
  '/assets/gallery-picks/160.jpg',
]);

// Photos that were a row on About Me (Jen, Nov 5: Gallery only). Whole files,
// at the end of the slideshow. The black top on the couch and the blonde
// portrait (jen-glam, new_04) were already slides. Edge bands cropped Nov 5.
const FROM_ABOUT = [
  { src: '/assets/jen-fun2.jpeg', alt: 'Jen Archuleta with a rescue puppy', caption: '', width: 501, height: 509 },
  { src: '/assets/jen-fitness.jpg', alt: 'Jen Archuleta, fit at 50', caption: '', width: 904, height: 833 },
];

// Jen's photos sent November 5 (evening), at the end of the slideshow, no
// captions. Phone bands cropped off 02 and 03; no other edits, no metadata.
const NOV5 = [
  { src: '/assets/gallery-nov5/nov5-01-airstream.jpg', alt: 'Jen Archuleta and a friend in beanies in front of a vintage Airstream trailer', caption: '', width: 960, height: 1706 },
  { src: '/assets/gallery-nov5/nov5-02-childhelp-wings-booth.jpg', alt: 'Jen Archuleta with friends at the Childhelp WINGS Fashion Show Luncheon photo booth', caption: '', width: 923, height: 919 },
  { src: '/assets/gallery-nov5/nov5-03-night-out.jpg', alt: 'Jen Archuleta and friends making playful faces on a night out', caption: '', width: 923, height: 688 },
  { src: '/assets/gallery-nov5/nov5-04-floral-dresses.jpg', alt: 'Jen Archuleta and four friends in floral dresses by a pool', caption: '', width: 1224, height: 1224 },
  { src: '/assets/gallery-nov5/nov5-05-spartan-team.jpg', alt: 'Jen Archuleta and her team with medals after a Spartan race', caption: '', width: 1320, height: 1650 },
];

// Every photo defined above, in the November 3 order, minus slides Jen had
// already taken out (HIDDEN_SLIDE_SRC) and the November 5 removals.
const ALL_SLIDES = [...HOLLYWOOD, ...PORTRAITS, ...FAMILY, ...FAMILY_OCT27, ...NOV3, ...GALLERY_NEW, ...PICKS, ...OCT26, ...NOV4, ...CHILDHOOD, ...NOV4B, ...FROM_ABOUT, ...NOV5]
  .filter((slide) => !HIDDEN_SLIDE_SRC.has(slide.src));

// November 5: gallery-new/new_37 (a news clipping) is removed, file and all.
// Its inset showed Jen's newborn's face unblurred and printed the child's name.
// Removals shift later ?photo=N numbers; ?slide=<src> links stay stable.
// November 5. Old numbers are the 92-slide gallery (1 / 92 on About Me).
// #1 Playboy stage, and the bodyboard photo whose watermark cannot be cropped off.
// The beach dress (velvet-carousel/10.jpg) is not a stand-in on About Me.
// #42, the blurred kids-and-dogs bed photo, is not in NOV3. Its file is deleted.
const OUT_OF_GALLERY = new Set([
  '/assets/gallery-hw/hw_01.jpg',
  '/assets/gallery-new/new_14.jpg',
  '/velvet-carousel/10.jpg',
  // Jen, Nov 5: one flower photo on About Me. The Childhelp dressing-room
  // photo (her caption) stays; these flower repeats come out.
  '/assets/gallery-new/new_09.jpg',
  '/assets/gallery-new/new_22.jpg',
  '/assets/gallery-nov4/nov4-04-dogs-and-tortoises.jpg',
  // Jen, Nov 5: out (preview slides 103, 104, 121). 39, 94 and 95 are too small
  // to show bigger and no larger original exists ("take it out or make it bigger").
  '/assets/gallery/pool-sombreros.jpg',
  '/assets/gallery-nov4/nov4-10-white-bikini-studio.jpg',
  '/assets/gallery-nov4/nov4-11-beach-bikini.jpg',
  // 119: Jen asked to keep only her name, but her age, vitals and "Arizona" sit
  // under it and no crop removes them without cutting her face. Out until she
  // sends a version without that text (the family's home state is never shown).
  '/assets/gallery-nov4b/nov4b-15-featured-girl-magazine.jpg',
  // Jen, Nov 5: out (preview slides 103, 104, 121).
  '/assets/gallery-nov4/nov4-19-magazine-spread-1.jpg',
  '/assets/gallery-nov4/nov4-20-magazine-spread-2.jpg',
  '/assets/gallery-nov4b/nov4b-18-thanksgiving-eve-tommy-lee.jpg',
  // ImageCollect watermark is tiled across the painting. It cannot be cropped off without cutting her.
  '/assets/gallery-nov4b/nov4b-16-playboy-painting-imagecollect.jpg',
  // Jen, Nov 10: the Key to the City is back in the carousel (it was featured
  // on its own on About Me from Nov 6 to Nov 10).
  // Jen, Nov 9: slide 98 (the pink aprons, "Easter bakers") is out.
  '/assets/gallery-nov4/nov4-17-pink-aprons.jpg',
]);

// Jen's captions (Nov 4; slides 1, 7, 8, and 9 reworded by her Nov 5), matched by file. Empty means no caption line.
// Photos after the first 88, and any she marked blank or not yet confirmed, stay blank.
const GALLERY_CAPTIONS = {
  // Jen, Nov 5 (preview slide numbers 16 to 106): her captions below, spelled
  // the way the names are spelled elsewhere (Childhelp, Rappelling, Mayakoba,
  // Singapore Airlines). 55 is "Jet setting": Jett is one of the kids' names.
  '/assets/gallery-hw/hw_02.jpg': 'SXSW Austin, on stage',
  '/assets/gallery-hw/hw_03.jpg': 'With Tommy Lee',
  '/assets/gallery-hw/hw_04.jpg': 'With Howard Stern',
  '/assets/gallery-hw/hw_05.jpg': 'With Shaggy',
  '/assets/gallery-hw/hw_06.jpg': 'My Name on the Palms Marquee in Las Vegas',
  '/assets/gallery-hw/hw_07.jpg': 'Swimming with a Dolphin',
  '/assets/gallery-hw/hw_09.jpg': 'My bodyguard. Who’s protecting who?',
  '/assets/jen-joy.jpg': 'Animals love me. Just call me Snow White.',
  '/velvet-carousel/01.jpg': 'Charity event',
  '/velvet-carousel/02.jpg': 'Modeling photo',
  '/velvet-carousel/03.jpg': 'Photo by Alex Ardenti',
  '/velvet-carousel/04.jpg': 'Modeling photo',
  '/velvet-carousel/05.jpg': 'A to Z magazine cover',
  '/velvet-carousel/06.jpg': 'A2Z Magazine cover',
  '/velvet-carousel/10.jpg': 'Modeling photo',
  '/velvet-carousel/11.jpg': 'Sponsored by PlayStation with Playmate friends / Playing video games all day',
  '/velvet-carousel/12.jpg': 'Bally slot machine',
  '/velvet-carousel/13.jpg': 'HEF',
  '/velvet-carousel/14.jpg': 'With Hef at the Suns game',
  '/velvet-carousel/16.jpg': 'The night I met Hef and my life changed',
  '/velvet-carousel/17.jpg': 'E! True Hollywood Story with Adam',
  '/velvet-carousel/18.jpg': 'Pursuing my private pilot license',
  '/velvet-carousel/19.jpg': 'Married the love of my life',
  '/velvet-carousel/20.jpg': 'Celebrity fight night with Adam',
  '/velvet-carousel/23.jpg': 'Costa Rica',
  '/velvet-carousel/37.jpg': 'Childhelp Wings Fashion Show Luncheon',
  '/velvet-carousel/41.jpg': 'Spa day for my friend Gwen',
  '/velvet-carousel/42.jpg': 'Halloween',
  '/assets/gallery-nov3/04-bride-friend.jpg': 'Married my best friend twice, in the same dress. The second time was in Las Vegas for our 10-year anniversary, with my childhood best friend and family there.',
  '/assets/gallery-nov3/07-dressing-room.jpg': 'Getting ready with my co-chair for the Childhelp fashion show',
  '/assets/gallery-nov3/09-rafting.jpg': 'My family loves adventure',
  '/assets/gallery-new/new_18.jpg': 'A birthday cake worth remembering',
  '/assets/gallery-picks/154.jpg': 'Bangkok, Thailand',
  '/assets/gallery-picks/175.jpg': 'Turkey trot, thankful for friends',
  '/assets/gallery-oct26/snow.jpg': 'Aspen',
  '/assets/gallery-oct26/jet-cabin.jpg': 'Jet setting',
  '/assets/gallery-oct26/jet-stairs.jpg': 'Jet setting',

  '/assets/gallery-nov3/05-fashion-show.jpg': 'Childhelp fashion show',
  '/assets/gallery-nov3/10-houseboat-couple.jpg': 'Lake Powell houseboat',
  '/assets/gallery-nov3/11-rappelling.jpg': 'Rappelling waterfalls',
  '/assets/gallery-nov3/12-boat.jpg': 'Mayakoba, Mexico',
  '/assets/gallery-nov3/13-canoe.jpg': 'Ozarks',
  '/assets/gallery-nov3/14-grand-canyon.jpg': 'Rim to Rim in 14 hours, Grand Canyon',
  '/assets/gallery-nov3/15-lake-jump.jpg': 'Houseboat',
  '/assets/gallery-nov3/18-mansion-lawn.jpg': 'Playboy Mansion',
  '/assets/gallery-nov3/19-private-jet.jpg': 'Jet setting',
  '/assets/gallery-nov3/20-spartan-race.jpg': 'I am Spartan',
  '/assets/gallery-nov3/21-rv-family.jpg': 'Your home is where you park it',
  '/assets/gallery-new/new_19.jpg': 'The OG’s',
  '/assets/gallery-picks/spartan-course.jpg': 'I am Spartan',
  '/assets/gallery-nov4/nov4-15-red-leather-seat.jpg': 'Singapore Airlines',
  '/assets/gallery-nov4/nov4-17-pink-aprons.jpg': 'Easter bakers',
  '/assets/gallery-nov4/nov4-18-playboy-lite-red-carpet.jpg': 'Super Bowl with Hef',
  '/assets/gallery-nov4b/nov4b-02-timberlake-nelly-robes.jpg': 'Justin Timberlake and Nelly music video',
  // Jen, Nov 10 (slide numbers 92, 95, 117 at the time), her exact words.
  '/assets/gallery-nov4/nov4-09-playboy-collage.jpg': 'Me trying to get out of something.',
  '/assets/gallery-nov4/nov4-14-hawaii-beach.jpg': 'In Hawaii with my mother-in-law.',
  '/assets/gallery-nov5/nov5-03-night-out.jpg': 'The OG’s.',
  '/assets/gallery-nov4b/nov4b-13-award-podium.jpg': 'Receiving the Key to the City.',
  // Jen, Nov 10: her captions for the eight new photos, word for word.
  '/assets/gallery-nov10/nov10-01-bali-helicopter.jpg': 'Arriving in Bali, I chose a helicopter transfer rather than traveling by road.',
  '/assets/gallery-nov10/nov10-02-roberto-cavalli-milan.jpg': 'At the Roberto Cavalli fashion show in Milan, Italy.',
  '/assets/gallery-nov10/nov10-03-bali-evening.jpg': 'An evening in Bali.',
  '/assets/gallery-nov10/nov10-04-bali-musicians.jpg': 'With Balinese musicians and their traditional kendang drums.',
  '/assets/gallery-nov10/nov10-05-bali-airport.jpg': 'At the airport in Bali.',
  '/assets/gallery-nov10/nov10-06-singapore-airlines.jpg': 'Singapore Airlines',
  '/assets/gallery-nov10/calgary-sun-playmates.jpg': 'Playmates the toast of The Drink',
  '/assets/gallery-nov10/nov10-07-st-barts.jpg': 'St. Barts.',
  '/assets/gallery-nov10/nov10-08-the-archuletas.jpg': 'The Archuletas.',
};

const SLIDES = ALL_SLIDES
  .filter((slide) => !OUT_OF_GALLERY.has(slide.src))
  .map((slide) => ({ ...slide, caption: GALLERY_CAPTIONS[slide.src] || '' }));

const INTERVAL_MS = 4000;
// Never enlarge a file more than this, so small photos stay sharp.
const MAX_UPSCALE = 1.6;

// The displayed width of a slide: as wide as the stage allows, as tall as
// the stage allows, never more than MAX_UPSCALE times the file's own width.
// --g-max-w and --g-max-h come from .gallery-stage in globals.css.
function slideStyle(item) {
  const ratio = item.width / item.height;
  return {
    '--g-w': `min(var(--g-max-w), calc(var(--g-max-h) * ${ratio.toFixed(4)}), ${Math.round(item.width * MAX_UPSCALE)}px)`,
    '--g-ratio': ratio.toFixed(4),
  };
}

// Width hint for the image service, so a phone never downloads a desktop file.
function slideSizes(item) {
  const ratio = item.width / item.height;
  const desktop = Math.min(900, Math.round(860 * ratio), Math.round(item.width * MAX_UPSCALE));
  return `(max-width: 759px) calc(100vw - 34px), ${desktop}px`;
}

function Chevron({ direction }) {
  const d = direction === 'prev' ? 'M14 5 L7 12 L14 19' : 'M10 5 L17 12 L10 19';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PhotoGallery({ showTitle = true } = {}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // ABOUT-05: a pause the visitor controls (WCAG 2.2.2). Hover, focus and touch
  // only pause for a moment; this one stays until they press Play.
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  // ABOUT-M3: true once the gallery is within about 600px of the viewport.
  const [near, setNear] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const stageRef = useRef(null);
  const touchRef = useRef(null);

  const go = useCallback((step) => {
    setIndex((current) => (current + step + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slide = params.get('slide');
    const number = Number.parseInt(params.get('photo') || '', 10);
    let start = -1;
    if (slide) start = SLIDES.findIndex((item) => item.src === slide);
    else if (number >= 1 && number <= SLIDES.length) start = number - 1;
    if (start >= 0) {
      setIndex(start);
      setPaused(true);
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotion = () => setReduceMotion(motion.matches);
    applyMotion();
    motion.addEventListener('change', applyMotion);

    const stage = stageRef.current;
    const view = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 },
    );
    if (stage) view.observe(stage);
    const approach = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          approach.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    if (stage) approach.observe(stage);

    return () => {
      motion.removeEventListener('change', applyMotion);
      view.disconnect();
      approach.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused || userPaused || reduceMotion || !inView) return undefined;
    const id = window.setInterval(() => go(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, userPaused, reduceMotion, inView, index, go]);

  // ABOUT-05: stepping by hand (arrow, key or swipe) stops the auto-advance.
  const step = useCallback((direction) => {
    setUserPaused(true);
    go(direction);
  }, [go]);

  const onTouchStart = (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
    setPaused(true);
  };

  const onTouchEnd = (event) => {
    const start = touchRef.current;
    touchRef.current = null;
    setPaused(false);
    if (!start) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    step(dx > 0 ? -1 : 1);
  };

  const onTouchCancel = () => {
    touchRef.current = null;
    setPaused(false);
  };

  const onBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
  };

  const count = SLIDES.length;
  const slide = SLIDES[index];
  const nearby = [-1, 0, 1].map((offset) => {
    const i = (index + offset + count) % count;
    return { offset, slide: SLIDES[i] };
  });

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
  };

  return (
    <section id="gallery" className="gallery-band" aria-labelledby="gallery-heading">
      <div className="wrap">
        <h2 id="gallery-heading" className={showTitle ? undefined : 'visually-hidden'}>Gallery</h2>
        <div
          ref={stageRef}
          className="gallery-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        >
          <button
            type="button"
            className="gallery-arrow gallery-arrow--prev"
            aria-label="Previous photo"
            onClick={() => step(-1)}
          >
            <Chevron direction="prev" />
          </button>

          <div
            className="gallery-area"
            role="group"
            aria-roledescription="carousel"
            aria-label={`Photo ${index + 1} of ${count}`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
          >
            <div className="gallery-frame">
              <div className="gallery-viewport">
                {nearby.map(({ offset, slide: item }) => (
                  <div
                    key={item.src}
                    className={`gallery-slide${offset === 0 ? ' is-active' : ''}`}
                    aria-hidden={offset === 0 ? undefined : true}
                    style={slideStyle(item)}
                  >
                    <Image
                      src={item.src}
                      alt={offset === 0 ? item.alt : ''}
                      width={item.width}
                      height={item.height}
                      sizes={slideSizes(item)}
                      quality={85}
                      loading={near || index !== 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ABOUT-M2: announce the new photo only while the visitor is in
              control, never on every auto-advance. */}
          <div className="gallery-meta" aria-live={userPaused || paused ? 'polite' : 'off'}>
            {slide.caption ? <p className="gallery-caption">{slide.caption}</p> : null}
            {slide.credit ? <p className="gallery-caption gallery-credit">{slide.credit}</p> : null}
            <p className="gallery-count"><span className="visually-hidden">Photo {index + 1} of {count}</span><span aria-hidden="true">{index + 1} / {count}</span></p>
            {reduceMotion ? null : (
              <button
                type="button"
                className="gallery-pause"
                onClick={() => setUserPaused((value) => !value)}
              >
                {userPaused ? 'Play' : 'Pause'}
              </button>
            )}
          </div>

          <button
            type="button"
            className="gallery-arrow gallery-arrow--next"
            aria-label="Next photo"
            onClick={() => step(1)}
          >
            <Chevron direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
