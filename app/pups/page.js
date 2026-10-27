import './pups.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { PUPS } from '../../lib/pups';
import { pupPhotoUrls } from '../../lib/pup-photos';

export const metadata = {
  title: 'Pups of the Podcast',
  description:
    'Every episode of Unfiltered with Jen Archuleta features a rescue pup looking for a home. The Archuleta family donates toward adoption fees.',
};

function PupCard({ pup, photo }) {
  return (
    <article className="pup-card">
      <div className="pup-media">
        <img src={photo} alt={pup.alt || pup.name} />
        {pup.adopted ? <span className="pup-badge">Adopted</span> : null}
      </div>
      <div className="pup-body">
        <h2>{pup.name}</h2>
        {pup.breedAge ? <p className="pup-breed">{pup.breedAge}</p> : null}
        {pup.rescue ? (
          <p className="pup-rescue">
            <span className="pup-k">Rescue </span>
            {pup.rescueHref ? (
              <a href={pup.rescueHref} target="_blank" rel="noopener noreferrer">{pup.rescue}</a>
            ) : pup.rescue}
          </p>
        ) : null}
        {pup.guest ? (
          <p className="pup-guest"><span className="pup-k">With </span>{pup.guest}</p>
        ) : null}
        {pup.note ? <p className="pup-note">{pup.note}</p> : null}
        {pup.watch ? (
          <a className="pup-more" href={pup.watch} target="_blank" rel="noopener noreferrer">Watch the episode</a>
        ) : null}
        {pup.post ? <a className="pup-more" href={`/journal/${pup.post}`}>Read more</a> : null}
      </div>
    </article>
  );
}

export default async function PupsPage() {
  const pups = [...PUPS].sort((a, b) => a.date.localeCompare(b.date));
  const photos = await pupPhotoUrls([...new Set(pups.map((p) => p.imageSlug).filter(Boolean))]);
  const featured = pups.find((p) => p.featured) || null;
  const featuredPhoto = featured ? featured.src || (featured.imageSlug ? photos[featured.imageSlug] : null) : null;

  return (
    <div className="pups-page">
      <SiteNav />

      <section className="wrap pups-head">
        <div className="eyebrow">Unfiltered with Jen Archuleta</div>
        <h1>Pups of the Podcast</h1>
        <p className="lead">
          Every episode of Unfiltered with Jen Archuleta features a rescue pup looking for a home.
          The Archuleta family donates toward each pup’s adoption fees.
        </p>
      </section>

      {featured && featuredPhoto ? (
        <section className="wrap pups-featured" aria-labelledby="featured-pup">
          <div className="pups-featured-card">
            <img src={featuredPhoto} alt={featured.alt || featured.name} />
            <div>
              <div className="eyebrow">Featured pup</div>
              <h2 id="featured-pup">{featured.name}</h2>
              {featured.breedAge ? <p className="pup-breed">{featured.breedAge}</p> : null}
              {featured.rescue ? <p className="pup-rescue"><span className="pup-k">Rescue </span>{featured.rescue}</p> : null}
              {featured.guest ? <p className="pup-guest"><span className="pup-k">With </span>{featured.guest}</p> : null}
              <p className="pups-featured-links">
                {featured.watch ? <a className="btn btn-primary btn-sm" href={featured.watch} target="_blank" rel="noopener noreferrer">Watch the episode</a> : null}
                {featured.post ? <a className="btn btn-ghost btn-sm" href={`/journal/${featured.post}`}>Read more</a> : null}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="wrap" style={{ paddingTop: 0 }}>
        <div className="eyebrow center" style={{ marginBottom: '18px' }}>The full collection</div>
        <div className="pups-grid">
          {pups.map((pup) => {
            const photo = pup.src || (pup.imageSlug ? photos[pup.imageSlug] : null);
            if (!photo) return null;
            return <PupCard key={pup.name} pup={pup} photo={photo} />;
          })}
        </div>
        <p className="foot-meta center" style={{ marginTop: '28px' }}>
          <a href="/podcast">The podcast</a>
          {' · '}
          <a href="/sponsors">Sponsors</a>
          {' · '}
          <a href="/about#me">The dogs at home</a>
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
