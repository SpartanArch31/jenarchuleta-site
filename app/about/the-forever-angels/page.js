import '../about.css';
import './founder.css';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { SOCIALS } from '../../components/site-data';

export const metadata = {
  title: 'Founder of The Forever Angels',
  description:
    'Jen Archuleta and Allison Kiefer founded The Forever Angels, a 501(c)(3) charity that helps families, veterans, hospice patients, and animals in need.',
};

// Jen's founder page for The Forever Angels, under About Me (Jen's site notes,
// November 4, 2026). DRAFT FOR JEN TO APPROVE: every sentence is Jen's own,
// taken from her Journal posts "Who Are the Angels Behind This Amazing
// Organization?", "What is a forever Angel", and "Making A Difference", and
// from her About Me page, lightly trimmed (an en dash became a comma). Nothing
// here names where the family lives, and the children are never named. The
// menu's "The Forever Angels" link goes straight to theforeverangels.com.
export default function ForeverAngelsFounderPage() {
  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="tim-wrap founder-hero">
        <p className="eyebrow">About me · Founder</p>
        <h1 className="tim-display tim-display--wrap">The Forever Angels</h1>
        <p className="tim-lead">
          Giving back matters to me. If I have time, a story, or a hand to lend, I’d rather use it
          for someone else.
        </p>
      </section>

      <div className="tim-wrap">
        <div className="threshold-rule"><span className="diamond" /></div>
      </div>

      <article className="tim-wrap founder-body">
        <section>
          <h2>How it started</h2>
          <p className="tim-lead">
            Allison and I are on an incredible journey together, fueled by our shared passion for
            making a meaningful difference. Instead of glitzy red carpet events or casual donations
            and drives, we’ve founded Forever Angels, a platform connecting those who can help with
            families in need.
          </p>
          <p className="tim-lead">
            I want to express my heartfelt appreciation to Allison for conceiving this brilliant
            idea and inviting me to be a part of it, given my background in CASA (court appointed
            special advocate) and experience with foster care.
          </p>
        </section>

        <section>
          <h2>Why we started it</h2>
          <p className="tim-lead">
            After years of donating time, money, and items to various charities without a clear
            understanding of their ultimate impact, we decided to create an organization where our
            efforts could directly benefit families, schools, veterans, and hospice care recipients.
          </p>
          <p className="tim-lead">
            We are not alone in this endeavor; our children are actively involved, helping with
            events, shopping, and various charity activities.
          </p>
        </section>

        <section>
          <h2>What we do</h2>
          <p className="tim-lead">
            We help families, veterans, hospice patients, and animals in need. From gifting festive
            Christmas trees, holiday wish lists, to providing school essentials and even organizing
            birthday parties, we strive to fill the hearts of the families we serve with happiness
            and create everlasting memories.
          </p>
          <p className="tim-lead">
            It’s not about the size of the gift; it’s the genuine compassion behind it that matters
            most.
          </p>
        </section>

        <section>
          <h2>How you can help</h2>
          <p className="tim-lead">
            You can donate items or funds, attend our events, or volunteer your time. One unique way
            to contribute is by purchasing an “angel,” allowing you to direct your donation to a
            specific cause.
          </p>
          <p className="founder-facts">
            The Forever Angels is a 501(c)(3) not-for-profit charity, founded in August 2023 by
            Jen Archuleta and Allison Kiefer.
          </p>
          <div className="founder-actions">
            <a href={SOCIALS.foreverAngels} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Visit The Forever Angels
            </a>
            <a href="https://www.instagram.com/theforeverangels/" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              @theforeverangels
            </a>
          </div>
        </section>
      </article>

      <section className="tim-wrap tim-close">
        <p className="tim-lead">
          Personally, I am deeply moved by the impact we’re making through Forever Angels.
          Witnessing the radiant smiles on the faces of those we support is an indescribable
          experience.
        </p>
        <p className="tim-sign">Jen</p>
        <p className="founder-back"><a href="/about">About me</a></p>
      </section>

      <SiteFooter />
    </>
  );
}
