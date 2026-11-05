import './about.css';
import SiteNav from '../components/SiteNav';
import Image from 'next/image';
import SiteFooter from '../components/SiteFooter';
import PhotoGallery from '../components/PhotoGallery';
import TwentiesSlideshow from './TwentiesSlideshow';

export const metadata = {
  title: 'About Me',
  description:
    'Faith, family, and a bunch of rescues. I love fiercely and I protect my peace. I love my husband, my kids and my family with everything I have.',
};

// About Me, in Jen's own words (November 3, 2026), plus the two 20s paragraphs
// she sent November 5. Don't add, trim, or reword her sentences, and never use
// an em dash. The formal bio is its own page, /about-the-author. Photos are
// shown whole. The kids appear only in Jen's own blurred file
// (full-house-kids-dogs.jpg).
// November 5 (Jen): the brown-top portrait is the main photo. The 20s are the
// coat, her two paragraphs, then one square photo that opens a 13-photo
// slideshow (TwentiesSlideshow.js). The puppy and white sports top photos
// moved to the Gallery.
// Old links still land: #life and #me (the everyday), #then (the twenties
// photo), #gallery, #forever-angels and #faith (giving back), #work (the
// About the Author link at the end).
export default function AboutPage() {
  return (
    <>
      <SiteNav />

      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* OPENING */}
      <section id="main-content" className="tim-wrap tim-hero">
        <div>
          <p className="eyebrow">About me</p>
          <h1 className="tim-display tim-display--wrap">Faith, family, and a bunch of rescues.</h1>
          <p className="tim-lead">
            I love fiercely and I protect my peace. I love my husband, my kids and my family with
            everything I have.
          </p>
        </div>
        <div>
          <img className="tim-portrait" src="/assets/brown-dress-portrait.jpg" alt="Jen Archuleta in a brown top" width="941" height="883" />
        </div>
      </section>

      <div className="tim-wrap">
        <div className="threshold-rule"><span className="diamond" /></div>
      </div>

      {/* EVERYDAY */}
      <section id="me" className="tim-wrap tim-everyday">
        <span id="life" className="anchor" aria-hidden="true" />
        <div className="tim-sticky tim-words">
          <p className="tim-lead">
            I don’t really do labels. I’m a mom, a wife, and the one who lets the rescues on the
            couch they’re not allowed on. Our house is loud, the table is full, and that is exactly
            how I like it.
          </p>
          <p className="tim-lead">
            My favorite part of the day is coffee before anyone else is up. Sundays, I keep a little
            quiet for my faith. It keeps me steady and it keeps me humble.
          </p>
        </div>
        <div>
          {/* The September photos (the dogs, the tortoise, the coffee cup) plus Jen's
              full house photo (November 3), which replaced the dogs-only crop. */}
          <div className="tim-grid2">
            <div className="tim-slot-wrap tim-span">
              <Image className="tim-img" src="/assets/dogs.jpg" alt="Jen’s five rescues together in the garden" width={1400} height={786} sizes="(max-width: 860px) 92vw, 640px" quality={85} />
              <span className="tim-slot-cap">All five of them</span>
            </div>
            <div className="tim-slot-wrap">
              <Image className="tim-img" src="/assets/wandered-in.jpg" alt="The family tortoise wandering through the house" width={787} height={1400} sizes="(max-width: 860px) 92vw, 300px" quality={85} />
              <span className="tim-slot-cap">Whoever else wandered in</span>
            </div>
            <div className="tim-slot-wrap">
              <Image className="tim-img" src="/assets/coffee.jpg" alt="A quiet morning coffee before the house wakes up" width={1400} height={1400} sizes="(max-width: 860px) 92vw, 360px" quality={85} />
              <span className="tim-slot-cap">Before the house wakes up</span>
            </div>
            <div className="tim-slot-wrap tim-span">
              <Image className="tim-img" src="/assets/full-house-kids-dogs.jpg" alt="The kids asleep in a big bed with two of the rescues" width={1320} height={943} sizes="(max-width: 860px) 92vw, 640px" quality={85} />
              <span className="tim-slot-cap">A full, happy house</span>
            </div>
          </div>
        </div>
      </section>

      {/* Coat first, then Jen's two paragraphs, then the square that opens the slideshow. */}
      <section id="then" className="tim-wrap tim-then">
        <Image className="tim-gray" src="/assets/jen-bw-coat2.jpg" alt="Jen Archuleta in a long black trench coat" width={1026} height={1532} sizes="(max-width: 860px) 92vw, 460px" quality={85} />
        <p className="tim-lead">My 20s were loud. I got into rooms most people never see, stood next to people you only know from a screen, and went places I didn’t grow up thinking I’d ever go. Some of it was exactly as fun as it looked. Some of it wasn’t.</p>
        <p className="tim-lead">A lot of it looked like the dream from the outside. Inside it was survival. I learned who I was while everything around me tried to tell me who to be. I wouldn’t trade it. It made me. But it cost something, and I know that now.</p>
        <TwentiesSlideshow />
      </section>

      <PhotoGallery />

      <section className="tim-wrap tim-close">
        <p className="tim-lead">Thanks for being here.</p>
        <p className="tim-sign">Jen</p>
      </section>

      <SiteFooter />
    </>
  );
}
