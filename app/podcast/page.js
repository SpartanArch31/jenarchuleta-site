import './podcast.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BuzzsproutPlayer from '../components/BuzzsproutPlayer';
import { PODCAST } from '../components/site-data';
import { getFeaturedPup } from '../../lib/pup-photos';

// The sharing preview for this page (Jen, November 2026): its own card, not
// the site-wide floral image, so a shared Podcast link looks like the show.
const PODCAST_OG = {
  url: 'https://jenarchuleta.com/assets/og-podcast-1200x630.jpg',
  width: 1200,
  height: 630,
  alt: 'Unfiltered with Jen Archuleta. 13 episodes on Buzzsprout and YouTube.',
};

const DESCRIPTION =
  'Unfiltered with Jen Archuleta features 13 episodes of honest conversations on faith, family, resilience, and starting over. Listen on Buzzsprout or watch on YouTube.';

export const metadata = {
  title: { absolute: 'Podcast, Unfiltered with Jen Archuleta' },
  description: DESCRIPTION,
  openGraph: {
    title: 'Unfiltered with Jen Archuleta',
    description: DESCRIPTION,
    url: 'https://jenarchuleta.com/podcast',
    images: [PODCAST_OG],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unfiltered with Jen Archuleta',
    description: DESCRIPTION,
    images: [PODCAST_OG.url],
  },
};

// Jen's rules for this page (October 27–28, 2026, and November 2026): say
// simply "Explore all 13 episodes of Unfiltered with Jen Archuleta."; Buzzsprout
// and YouTube sit together (side by side on a laptop, stacked on a phone),
// each with a plain link as a backup; never say the show is on hold or that
// new episodes are coming out. Use guests' full names.
export const revalidate = 3600;

export default async function PodcastPage() {
  const { name, buzzsproutSite, buzzsproutId, subscribe } = PODCAST;
  const watchHref = PODCAST.youtubeEpisodes || PODCAST.youtube;
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
          Honest conversations on faith, family, resilience, and starting over. The same honest voice as the book.
        </p>
        <p className="pod-count">Explore all 13 episodes of {name}.</p>
        <div className="subscribe-row">
          <a href={PODCAST.buzzsprout} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Listen on Buzzsprout</a>
          <a href={watchHref} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </div>
        <p className="foot-meta" style={{ marginTop: '14px' }}>
          Also on <a href={subscribe.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>
          {' · '}
          <a href={subscribe.apple} target="_blank" rel="noopener noreferrer">Apple Podcasts</a>
        </p>
      </section>

      {/* EPISODES — listen (Buzzsprout's player lists every episode) beside
          watch (the YouTube "Full Episodes" playlist, Ep. 1 first). */}
      <section id="episodes" className="wrap pod-players" style={{ paddingTop: 0 }} aria-label="All 13 episodes">
        <div className="pod-player">
          <div className="pod-player-head">
            <div className="eyebrow">Listen</div>
            <a href={PODCAST.buzzsprout} target="_blank" rel="noopener noreferrer">Open on Buzzsprout →</a>
          </div>
          {buzzsproutId ? (
            <BuzzsproutPlayer showId={buzzsproutId} />
          ) : (
            <div className="pod-embed">
              <iframe src={buzzsproutSite} title={`${name}, episodes`} loading="lazy" allow="autoplay" />
            </div>
          )}
        </div>
        <div className="pod-player">
          <div className="pod-player-head">
            <div className="eyebrow">Watch</div>
            <a href={watchHref} target="_blank" rel="noopener noreferrer">Open on YouTube →</a>
          </div>
          {PODCAST.youtubeEmbed ? (
            <div className="pod-video">
              <iframe
                src={PODCAST.youtubeEmbed}
                title={`${name}, full episodes on YouTube`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          ) : null}
          <p className="pod-video-note">All 13 full episodes, starting with Episode 1.</p>
        </div>
      </section>

      {/* PUPS OF THE PODCAST: the featured pup + a link to the full collection.
          The "every episode features a rescue pup" line lives on /pups only
          (Jen, November 3: nothing repeated). */}
      <section id="pups" className="wrap pod-pups" style={{ background: 'var(--surface)' }}>
        <div className="center">
          <div className="eyebrow">Pups of the Podcast</div>
        </div>
        {pup ? (
          <div className="home-pup">
            <img src={pup.photo} alt={pup.alt || pup.name} loading="lazy" />
            <div>
              <div className="eyebrow">Featured pup</div>
              <h3>{pup.name}</h3>
              {pup.breedAge ? <p>{pup.breedAge}</p> : null}
              {pup.episode ? <p>{pup.episode}</p> : pup.guest ? <p>With {pup.guest}</p> : null}
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
      <section id="sponsors" className="wrap center">
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
