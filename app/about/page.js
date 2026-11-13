import './about.css';
import SiteNav from '../components/SiteNav';
import Image from 'next/image';
import SiteFooter from '../components/SiteFooter';
import PhotoGallery from '../components/PhotoGallery';
import TwentiesSlideshow from './TwentiesSlideshow';
import { GivingSection, PressSection, SpeakingSection } from './AboutSections';
import { pageMeta } from '../../lib/page-meta';

export const metadata = pageMeta({
  path: '/about',
  title: 'About',
  description: 'Faith, family, and a bunch of rescues. God comes first. I love my husband, my children, and my family with everything I have. I love fiercely, protect my peace, and try to lead my life with faith, gratitude, and purpose.',
});

// About Me, in Jen's own words (November 3, 2026), plus the two 20s paragraphs
// she sent November 5. Don't add, trim, or reword her sentences, and never use
// an em dash. The formal bio is its own page, /about-the-author. Photos are
// shown whole. The kids appear only in Jen's own blurred file
// (full-house-kids-dogs.jpg).
// November 5 (Jen): the brown-top portrait is the main photo. The 20s are the
// coat, her two paragraphs, then one square photo that opens a 13-photo
// slideshow (TwentiesSlideshow.js). The puppy and white sports top photos
// moved to the Gallery.
// Anchors on this page: #me and #life (the everyday), #then (the twenties),
// #gallery. ABOUT-17: #faith, #work and #forever-angels no longer exist here
// (Forever Angels lives at /media#forever-angels).
export default function AboutPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <SiteNav />

      <main id="main-content">
      {/* OPENING */}
      <section className="tim-wrap tim-hero">
        <div>
          <p className="eyebrow">About me</p>
          <h1 className="tim-display tim-display--wrap">Faith, family, and a bunch of rescues.</h1>
          {/* Jen, Nov 6: her new opening. */}
          <p className="tim-lead">
            God comes first. I love my husband, my children, and my family with everything I have. I love fiercely, protect my peace, and try to lead my life with faith, gratitude, and purpose.
          </p>
          <p className="tim-lead">
            <a href="#speaking">Speaking</a>
            {' · '}
            <a href="#press">Press</a>
            {' · '}
            <a href="#giving">CASA, Childhelp &amp; My Therapy Dog, Turbo.</a>
          </p>
        </div>
        <div>
          {/* ABOUT-18: the LCP image, through next/image with priority. */}
          <Image className="tim-portrait" src="/assets/brown-dress-portrait.jpg" alt="Jen Archuleta in a brown top" width={941} height={883} sizes="(max-width: 860px) 92vw, 470px" quality={85} priority />
        </div>
      </section>

      <div className="media-page">
        <SpeakingSection />
      </div>

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
            {/* Jen, Nov 10: her final words, word for word. */}
            I love car rides with my kids. That’s when some of our best conversations happen, when
            we have time to really talk and, more importantly, listen. I still love adventure, and
            I’ll always enjoy the excitement of a red carpet, but I’m just as happy in sweats
            watching a movie with my family. I love being a wife and a mom, and I treasure those
            simple moments when we’re all together. If I could bottle up one sound and keep it
            forever, it would be my family laughing and talking around the dinner table.
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
              <Image className="tim-img" src="/assets/coffee.jpg" alt="A cup of coffee" width={1400} height={1400} sizes="(max-width: 860px) 92vw, 360px" quality={85} />
            </div>
            <div className="tim-slot-wrap tim-span">
              <Image className="tim-img" src="/assets/full-house-kids-dogs.jpg" alt="The kids asleep in a big bed with two of the rescues" width={1320} height={943} sizes="(max-width: 860px) 92vw, 640px" quality={85} />
              <span className="tim-slot-cap">A full, happy house</span>
            </div>
          </div>
        </div>
      </section>

      {/* Coat, then the square that opens the slideshow (with Jen's caption), then her two paragraphs (Nov 5). */}
      <section id="then" className="tim-wrap tim-then">
        <Image className="tim-gray" src="/assets/jen-bw-coat2.jpg" alt="Jen Archuleta in a long black trench coat" width={1026} height={1532} sizes="(max-width: 860px) 92vw, 460px" quality={85} />
        <TwentiesSlideshow />
        <p className="tim-lead">My 20s were loud. I got into rooms most people never see, stood next to people you only know from a screen, and went places I didn’t grow up thinking I’d ever go. Some of it was exactly as fun as it looked. Some of it wasn’t.</p>
        <p className="tim-lead">A lot of it looked like the dream from the outside. Inside it was survival. I learned who I was while everything around me tried to tell me who to be. I wouldn’t trade it. It made me. But it cost something, and I know that now.</p>
      </section>

      {/* ABOUT-10: one more threshold, from Jen's story into the archive. */}
      <div className="tim-wrap">
        <div className="threshold-rule"><span className="diamond" /></div>
      </div>

      <div className="media-page">
        <PressSection />
        <GivingSection />
      </div>

      <PhotoGallery />

      <section className="tim-wrap tim-close">
        <p className="tim-lead">Thanks for being here.</p>
        <p className="tim-sign">Jen</p>
      </section>
      </main>

      <SiteFooter />
    </>
  );
}
