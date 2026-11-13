import { KIT_FREE_CHAPTER_URL } from './site-data';
import './first-chapter.css';

// Jen, Nov 13: the free first chapter signup on Home and Book. It opens
// Jen's Kit landing page (KIT_FREE_CHAPTER_URL), where readers sign up.
export default function FirstChapterSignup({ id = 'first-chapter', dark = false }) {
  return (
    <section id={id} className={`wrap first-chapter-signup${dark ? ' first-chapter-signup--dark' : ''}`}>
      <p className="eyebrow">Free</p>
      <h2>Read the first chapter free.</h2>
      <img
        className="first-chapter-signup-art"
        src="/assets/first-chapter-then-now.jpg"
        alt="Jen Archuleta as a little girl and today, in black and white"
        width="1168"
        height="368"
        loading="lazy"
      />
      <p>Tell me where to send it, and the first chapter of <em>Beyond the Velvet Ropes</em> is yours.</p>
      <a className="btn btn-primary" href={KIT_FREE_CHAPTER_URL} target="_blank" rel="noopener">
        Read the first chapter free
      </a>
    </section>
  );
}
