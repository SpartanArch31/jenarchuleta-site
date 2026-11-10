import './podcast.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BuzzsproutPlayer from '../components/BuzzsproutPlayer';
import { PODCAST } from '../components/site-data';
import { EPISODE_CREDITS } from '../../lib/episode-credits';
import { PODCAST_REVIEWS } from '../../lib/public-reviews';
import PublicReviews from '../components/PublicReviews';
import PupsList from '../pups/PupsList';
import '../pups/pups.css';
import { SEARCH_EPISODES } from '../../lib/site-search';

// POD-22: one episode count for the whole page. Reads PODCAST.episodeCount
// once site-data.js carries it; 13 until then. The hero JPG has '13 EPISODES'
// baked in, so it needs new art whenever this number changes.
const EPISODE_COUNT = PODCAST.episodeCount ?? 13;

const PODCAST_OG = {
  url: 'https://jenarchuleta.com/assets/og-podcast-1200x630.jpg',
  width: 1200,
  height: 630,
  alt: `Unfiltered with Jen Archuleta. ${EPISODE_COUNT} episodes on Buzzsprout and YouTube.`,
};

const DESCRIPTION =
  `Unfiltered with Jen Archuleta. Season 1 is complete, ${EPISODE_COUNT} episodes. The show is on a break right now.`;

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

export default async function PodcastPage() {
  const { name, buzzsproutSite, buzzsproutId } = PODCAST;
  const watchHref = PODCAST.youtube;

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />

      <main id="main-content">
      <section className="wrap pod-hero">
        {/* POD-M4: framed like the other media on the page; it is the LCP image. */}
        <img
          className="pod-hero-art"
          src="/assets/og-podcast-1200x630.jpg"
          alt="Unfiltered with Jen Archuleta"
          width="1200"
          height="630"
          fetchPriority="high"
        />
        <div className="eyebrow">The Podcast</div>
        <h1>{name}</h1>
        <p className="pod-status">Season 1 is complete, {EPISODE_COUNT} episodes. The show is on a break right now. Jen is focusing on her movie and documentary.</p>
        <div className="pod-subscribe">
          <a className="btn btn-primary" href={PODCAST.subscribe.apple} target="_blank" rel="noopener noreferrer">Subscribe on Apple Podcasts</a>
          {/* POD-12: one filled primary leads; Spotify sits beside it as a ghost. */}
          <a className="btn btn-ghost" href={PODCAST.subscribe.spotify} target="_blank" rel="noopener noreferrer">Subscribe on Spotify</a>
          <a className="btn btn-ghost" href={PODCAST.buzzsprout} target="_blank" rel="noopener noreferrer">Buzzsprout</a>
        </div>
        <nav className="pod-boxes" aria-label="Podcast">
          <a href="#pups">Pups of the Podcast</a>
          <a href="#episodes">Buzzsprout episodes</a>
          <a href="#sponsors">Sponsors</a>
        </nav>
      </section>

      {/* POD-16: the paper band runs full width; the content stays in .wrap. */}
      <section id="pups" className="pod-panel center">
        <div className="wrap">
        <div className="eyebrow">Pups of the Podcast</div>
        <h2>Meet the pups</h2>
        <PupsList />
        </div>
      </section>

      <section id="episodes" className="wrap pod-players" aria-label={`All ${EPISODE_COUNT} episodes`}>
        <p className="home-pod-cross center">
          <a href={PODCAST.buzzsprout} target="_blank" rel="noopener noreferrer">Listen on Buzzsprout</a>
          <span className="pod-listen-gap"> </span>
          <a href={watchHref} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </p>
        <div className="pod-player">
          <div className="pod-player-head">
            <div className="eyebrow">Listen</div>
            <a href={PODCAST.buzzsprout} target="_blank" rel="noopener noreferrer">Open on Buzzsprout</a>
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
            <a href={watchHref} target="_blank" rel="noopener noreferrer">Open on YouTube</a>
          </div>
          <p className="pod-video-note">All {EPISODE_COUNT} episodes are on the channel, starting with Ep. 1. The show is on a break right now.</p>
          <ol className="pod-episode-list">
            {SEARCH_EPISODES.map((episode) => (
              <li key={episode.href}>
                <a href={episode.href} target="_blank" rel="noopener noreferrer">{episode.title}</a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="sponsors" className="pod-panel center">
        <div className="wrap">
        <div className="eyebrow">Sponsors</div>
        <h2>Thank you.</h2>
        <p className="lead" style={{ maxWidth: '46ch', marginInline: 'auto' }}>
          Thank you to the sponsors who have supported the show.
        </p>
        <ol className="pod-credits">
          {EPISODE_CREDITS.filter((row) => row.sponsor).map((row) => (
            <li key={row.episode}>
              {/* POD-19: same label as the pup cards. */}
              <span className="pod-credit-ep">Ep. {row.episode}</span>{' '}
              {row.sponsorHref ? (
                <a href={row.sponsorHref} target="_blank" rel="noopener noreferrer">{row.sponsor}</a>
              ) : row.sponsor}
            </li>
          ))}
        </ol>
        <p className="pod-cta"><a href="/sponsors" className="btn btn-ghost">See the sponsors</a></p>
        </div>
      </section>

      <section id="reviews" className="wrap center">
        <div className="eyebrow">Listener reviews</div>
        <h2>Love the show?</h2>
        <p className="lead" style={{ maxWidth: '46ch', marginInline: 'auto' }}>Reviews listeners left on Apple Podcasts, typed out here in their own words.</p>
        <PublicReviews reviews={PODCAST_REVIEWS} variant="cards" />
        <p className="lead pod-review-cta">A short review helps the next listener find it.</p>
        <div className="hero-ctas pod-review-ctas">
          <a className="btn btn-ghost" href={PODCAST.subscribe.apple} target="_blank" rel="noopener noreferrer">Review on Apple Podcasts</a>
          <a className="btn btn-ghost" href={PODCAST.subscribe.spotify} target="_blank" rel="noopener noreferrer">Review on Spotify</a>
        </div>
      </section>
      </main>

      <SiteFooter />
    </>
  );
}
