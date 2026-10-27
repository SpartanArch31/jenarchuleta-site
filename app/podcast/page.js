import './podcast.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BuzzsproutPlayer from '../components/BuzzsproutPlayer';
import { PODCAST } from '../components/site-data';
import { getFeaturedPup } from '../../lib/pup-photos';

export const metadata = {
  title: { absolute: 'Podcast — Unfiltered with Jen Archuleta' },
  description:
    'Unfiltered with Jen Archuleta features 13 episodes of honest conversations on faith, family, resilience, and starting over. Listen on Buzzsprout or watch on YouTube.',
};

// Jen's rules for this page (October 27, 2026): say simply that the show
// features 13 episodes; Buzzsprout and YouTube live here; never say the show
// is on hold or that new episodes are coming out. Use guests' full names.
export const revalidate = 3600;

export default async function PodcastPage() {
  const { name, buzzsproutSite, buzzsproutId, subscribe } = PODCAST;
  const pup = await getFeaturedPup().catch(() => null);

  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* HERO */}
      <section id="main-content" className="wrap pod-hero">
        <div className="eyebrow">The Podcast</div>
        <div className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>unfiltered…</div>
        <h1>{name}</h1>
        <p className="lead" style={{ maxWidth: '60ch', marginInline: 'auto' }}>
          Honest conversations on faith, family, resilience, and starting over — the same honest voice as the book.
        </p>
        <p className="pod-count">{name} features 13 episodes.</p>
        <div className="subscribe-row">
          <a href={PODCAST.buzzsprout} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Listen on Buzzsprout</a>
          <a href={PODCAST.youtube} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </div>
        <p className="foot-meta" style={{ marginTop: '14px' }}>
          Also on <a href={subscribe.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>
          {' · '}
          <a href={subscribe.apple} target="_blank" rel="noopener noreferrer">Apple Podcasts</a>
        </p>
      </section>

      {/* EPISODES — Buzzsprout native player lists every episode */}
      <section className="wrap" style={{ paddingTop: 0 }}>
        {buzzsproutId ? (
          <BuzzsproutPlayer showId={buzzsproutId} />
        ) : (
          <div className="pod-embed">
            <iframe src={buzzsproutSite} title={`${name}, episodes`} loading="lazy" allow="autoplay" />
          </div>
        )}
      </section>

      {/* PUPS OF THE PODCAST — featured pup + the full collection */}
      <section className="wrap pod-pups" style={{ background: 'var(--surface)' }}>
        <div className="center">
          <div className="eyebrow">Pups of the Podcast</div>
          <h2>Every episode features a rescue pup looking for a home.</h2>
          <p className="lead" style={{ maxWidth: '54ch', marginInline: 'auto' }}>
            The Archuleta family donates toward each pup’s adoption fees.
          </p>
        </div>
        {pup ? (
          <div className="home-pup">
            <img src={pup.photo} alt={pup.alt || pup.name} loading="lazy" />
            <div>
              <div className="eyebrow">Featured pup</div>
              <h3>{pup.name}</h3>
              {pup.breedAge ? <p>{pup.breedAge}</p> : null}
              {pup.guest ? <p>With {pup.guest}</p> : null}
              <p className="pod-pup-links">
                {pup.watch ? <a href={pup.watch} className="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">Watch the episode</a> : null}
              </p>
            </div>
          </div>
        ) : null}
        <div className="center" style={{ marginTop: '26px' }}>
          <a href="/pups" className="btn btn-primary">See all the pups</a>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="wrap center">
        <div className="eyebrow">Sponsors</div>
        <h2>Thank you.</h2>
        <p className="lead" style={{ maxWidth: '46ch', marginInline: 'auto' }}>
          Thank you to the sponsors who have supported the show.
        </p>
        <div style={{ marginTop: '20px' }}>
          <a href="/sponsors" className="btn btn-ghost">See the sponsors</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
