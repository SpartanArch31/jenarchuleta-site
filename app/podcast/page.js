import './podcast.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BuzzsproutPlayer from '../components/BuzzsproutPlayer';
import { PODCAST } from '../components/site-data';

const PODCAST_OG = {
  url: 'https://jenarchuleta.com/assets/og-podcast-1200x630.jpg',
  width: 1200,
  height: 630,
  alt: 'Unfiltered with Jen Archuleta. 13 episodes on Buzzsprout and YouTube.',
};

const DESCRIPTION =
  'Unfiltered with Jen Archuleta. 13 episodes. Listen on Buzzsprout or watch on YouTube.';

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

export default function PodcastPage() {
  const { name, buzzsproutSite, buzzsproutId } = PODCAST;
  const watchHref = PODCAST.youtubeEpisodes || PODCAST.youtube;

  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap pod-hero">
        <img
          src="/assets/og-podcast-1200x630.jpg"
          alt="Unfiltered with Jen Archuleta"
          width="1200"
          height="630"
          style={{ width: 'min(720px, 100%)', height: 'auto', margin: '0 auto 22px', display: 'block' }}
        />
        <div className="eyebrow">The Podcast</div>
        <h1>{name}</h1>
        <p className="pod-count">Explore all 13 episodes of {name}.</p>
        <nav className="pod-boxes" aria-label="Podcast">
          <a href="/pups">Pups</a>
          <a href="#episodes">Buzzsprout</a>
          <a href="/sponsors">Sponsors</a>
        </nav>
      </section>

      <section id="episodes" className="wrap pod-players" aria-label="All 13 episodes">
        <p className="home-pod-cross center">
          Listen on <a href={PODCAST.buzzsprout} target="_blank" rel="noopener noreferrer">Buzzsprout</a>
          <span aria-hidden="true"> • </span>
          Watch on <a href={PODCAST.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
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

      <SiteFooter />
    </>
  );
}
