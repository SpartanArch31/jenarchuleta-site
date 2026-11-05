import './podcast.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BuzzsproutPlayer from '../components/BuzzsproutPlayer';
import { PODCAST } from '../components/site-data';
import { EPISODE_CREDITS } from '../../lib/episode-credits';
import { PUPS } from '../../lib/pups';
import { pupPhotoUrls } from '../../lib/pup-photos';
import { PODCAST_REVIEWS } from '../../lib/public-reviews';
import PublicReviews from '../components/PublicReviews';

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

// Episode number from lib/pups.js ('Ep. 10, with Nick Lowery' -> 10).
const pupEpisode = (pup) => Number((pup.episode || '').match(/Ep\. (\d+)/)?.[1] || 0);

export default async function PodcastPage() {
  // Adam, Nov 5: each pup with its photo and shelter ID, the same photos and
  // IDs as /pups. Pups with no photo show the paw.
  const pups = [...PUPS].sort((a, b) => pupEpisode(a) - pupEpisode(b));
  const pupPhotos = await pupPhotoUrls([...new Set(pups.map((p) => p.imageSlug).filter(Boolean))], 500);
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
        <div className="pod-subscribe">
          <a className="btn btn-primary" href={PODCAST.subscribe.apple} target="_blank" rel="noopener noreferrer">Subscribe on Apple Podcasts</a>
          <a className="btn btn-primary" href={PODCAST.subscribe.spotify} target="_blank" rel="noopener noreferrer">Subscribe on Spotify</a>
          <a className="btn btn-ghost" href={PODCAST.buzzsprout} target="_blank" rel="noopener noreferrer">Buzzsprout</a>
        </div>
        <nav className="pod-boxes" aria-label="Podcast">
          <a href="#pups">Pups of the Podcast</a>
          <a href="#episodes">Buzzsprout episodes</a>
          <a href="#sponsors">Sponsors</a>
        </nav>
      </section>

      <section id="pups" className="wrap pod-panel center">
        <div className="eyebrow">Pups of the Podcast</div>
        <h2>Meet the pups</h2>
        <ol className="pod-pups">
          {pups.map((pup) => {
            const photo = pup.src || (pup.imageSlug ? pupPhotos[pup.imageSlug] : null);
            return (
              <li key={pup.name} className="pod-pup">
                <div className="pod-pup-media">
                  {photo ? (
                    <img src={photo} alt={pup.alt || `${pup.name}, a Pup of the Podcast`} loading="lazy" />
                  ) : (
                    <svg className="pod-pup-paw" viewBox="0 0 64 64" aria-hidden="true">
                      <ellipse cx="32" cy="40" rx="12" ry="10" fill="currentColor" />
                      <ellipse cx="16" cy="26" rx="6" ry="8" fill="currentColor" />
                      <ellipse cx="26" cy="18" rx="6" ry="8" fill="currentColor" />
                      <ellipse cx="38" cy="18" rx="6" ry="8" fill="currentColor" />
                      <ellipse cx="48" cy="26" rx="6" ry="8" fill="currentColor" />
                    </svg>
                  )}
                </div>
                <div className="pod-pup-ep">Ep. {pupEpisode(pup)}</div>
                <div className="pod-pup-name">{pup.name}{pup.adopted ? ' (Adopted)' : ''}</div>
                <div className="pod-pup-id">{pup.animalId || 'ID not verified'}</div>
              </li>
            );
          })}
        </ol>
        <p><a href="/pups" className="btn btn-primary">See the pups</a></p>
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

      <section id="sponsors" className="wrap pod-panel center">
        <div className="eyebrow">Sponsors</div>
        <h2>Thank you.</h2>
        <p className="lead" style={{ maxWidth: '46ch', marginInline: 'auto' }}>
          Thank you to the sponsors who have supported the show.
        </p>
        <ol className="pod-credits">
          {EPISODE_CREDITS.filter((row) => row.sponsor).map((row) => (
            <li key={row.episode}>
              Ep. {row.episode}.{' '}
              {row.sponsorHref ? (
                <a href={row.sponsorHref} target="_blank" rel="noopener noreferrer">{row.sponsor}</a>
              ) : row.sponsor}
            </li>
          ))}
        </ol>
        <p><a href="/sponsors" className="btn btn-ghost">See the sponsors</a></p>
      </section>

      <section id="reviews" className="wrap center" style={{ paddingTop: 0 }}>
        <h2>Love the show?</h2>
        <PublicReviews reviews={PODCAST_REVIEWS} />
        <p className="lead" style={{ maxWidth: '42ch', marginInline: 'auto' }}>A short review helps the next listener find it.</p>
        <div className="hero-ctas" style={{ justifyContent: 'center' }}>
          <a className="btn btn-ghost" href={PODCAST.subscribe.apple} target="_blank" rel="noopener noreferrer">Review on Apple Podcasts</a>
          <a className="btn btn-ghost" href={PODCAST.subscribe.spotify} target="_blank" rel="noopener noreferrer">Review on Spotify</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
