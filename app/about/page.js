import './about.css';
import SiteNav from '../components/SiteNav';
import Image from 'next/image';
import SiteFooter from '../components/SiteFooter';
import PhotoGallery from '../components/PhotoGallery';

export const metadata = {
  title: 'About Me',
  description:
    'Faith, family, and a bunch of rescues. I love fiercely and I protect my peace. I love my husband, my kids and my family with everything I have.',
};

// About Me, in Jen's own words (November 3, 2026). One page: her text replaced
// the old "Hi, I'm Jen", everyday, my people, then and now, fun part, faith,
// and creed sections. Every sentence below is hers, in her order. Don't add,
// trim, or reword it, and never use an em dash. The formal bio is its own
// page, /about-the-author. Photos are shown whole. The kids appear only in
// Jen's own blurred file (full-house-kids-dogs.jpg).
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
          <img className="tim-portrait" src="/assets/presskit-headshot-floral.jpg" alt="Jen Archuleta smiling in a floral top" width="1100" height="1370" />
          <p className="tim-cap">Caught mid-laugh, which is most of the time</p>
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

      {/* THE CAMERA, AND MY TWENTIES */}
      <section id="then" className="tim-wrap tim-then">
        <div>
          {/* Jen's pick since July: the black-and-white photo in the long black trench
              coat. Do not swap in a headshot. */}
          <Image className="tim-gray" src="/assets/jen-bw-coat2.jpg" alt="Jen Archuleta in a long black trench coat" width={1026} height={1532} sizes="(max-width: 860px) 92vw, 460px" quality={85} />
        </div>
        <div>
          <p className="tim-lead">My 20s were amazing. I saw and did things most people dream about.</p>
        </div>
      </section>

      {/* The red carpet photo row. Second photo: Jen's glamour headshot (gallery-new/new_04),
          which replaced the black corset photo (jen-sultry) on November 3. */}
      <section className="tim-wrap tim-fun">
        <div className="photo-row">
          <img src="/assets/jen-glam.jpg" alt="Jen Archuleta, glamour portrait" width="941" height="1123" loading="lazy" />
          <img src="/assets/gallery-new/new_04.jpg" alt="Jen Archuleta, glamour headshot" width="1320" height="1537" loading="lazy" />
          <img src="/assets/jen-fun2.jpeg" alt="Jen Archuleta with a rescue puppy" width="510" height="512" loading="lazy" />
          <img src="/assets/jen-fitness.jpg" alt="Jen Archuleta, fit at 50" width="1077" height="887" loading="lazy" />
        </div>
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
