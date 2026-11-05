import Image from 'next/image';

// A still collage. Every photo is on the page at once, at its own ratio.
// Wide shots span two columns. No dark mat, so nothing reads as a black bar.
const PHOTOS = [
  { src: '/assets/twenties/07-ferrari.jpg', width: 1320, height: 907, alt: 'Jen Archuleta with a red Ferrari', wide: true },
  { src: '/assets/twenties/02-mansion-group.jpg', width: 1277, height: 728, alt: 'A group in front of the mansion', wide: true },
  { src: '/assets/twenties/04-hef-party.jpg', width: 1320, height: 1264, alt: 'A party with Hugh Hefner' },
  { src: '/assets/twenties/08-race-car.jpg', width: 1084, height: 858, alt: 'A Playboy race car', wide: true },
  { src: '/assets/twenties/06-mansion-crowd.jpg', width: 909, height: 605, alt: 'A crowd in front of the mansion', wide: true },
  { src: '/assets/twenties/03-sombreros.jpg', width: 1320, height: 1737, alt: 'Jen Archuleta on the beach in a sombrero' },
  { src: '/assets/twenties/10-fox-pool.jpg', width: 1320, height: 1334, alt: 'Jen Archuleta at a pool during a FOX interview' },
  { src: '/assets/twenties/01-ski.jpg', width: 853, height: 2007, alt: 'Jen Archuleta in a ski snowsuit' },
  { src: '/assets/twenties/09-crowd-surf.jpg', width: 1320, height: 1309, alt: 'Jen Archuleta crowd surfing' },
  { src: '/assets/twenties/05-air-bali.jpg', width: 1552, height: 1280, alt: 'Jen Archuleta beside an Air Bali helicopter', wide: true },
  { src: '/assets/twenties/11-makeup.jpg', width: 1025, height: 1459, alt: 'Jen Archuleta in a makeup chair' },
  { src: '/assets/twenties/12-turtleneck.jpg', width: 944, height: 1880, alt: 'Jen Archuleta in a black turtleneck' },
];

export default function TwentiesCollage() {
  return (
    <div className="twenties-collage" aria-label="My 20s">
      {PHOTOS.map((photo) => (
        <figure key={photo.src} className={photo.wide ? 'is-wide' : undefined}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={photo.wide ? '(max-width: 700px) 92vw, 560px' : '(max-width: 700px) 46vw, 280px'}
            quality={85}
          />
        </figure>
      ))}
    </div>
  );
}
