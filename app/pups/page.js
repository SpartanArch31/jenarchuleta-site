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

function Paw() {
  return (
    <svg className="pup-paw" viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="32" cy="40" rx="12" ry="10" fill="currentColor" />
      <ellipse cx="16" cy="26" rx="6" ry="8" fill="currentColor" />
      <ellipse cx="26" cy="18" rx="6" ry="8" fill="currentColor" />
      <ellipse cx="38" cy="18" rx="6" ry="8" fill="currentColor" />
      <ellipse cx="48" cy="26" rx="6" ry="8" fill="currentColor" />
    </svg>
  );
}

function PupFacts({ pup }) {
  return (
    <>
      {pup.breedAge && !pup.bio ? <p className="pup-breed">{pup.breedAge}</p> : null}
      {pup.episode ? (
        <p className="pup-guest"><span className="pup-k">Episode </span>{pup.episode}</p>
      ) : null}
      {/* The ID values already start with "ID", so no separate label. */}
      <p className="pup-rescue">{pup.animalId || 'ID not verified'}</p>
      {pup.rescue ? (
        <p className="pup-rescue">
          <span className="pup-k">Shelter </span>
          {pup.rescueHref ? (
            <a href={pup.rescueHref} target="_blank" rel="noopener noreferrer">{pup.rescue}</a>
          ) : pup.rescue}
        </p>
      ) : null}
      {pup.status ? <p className="pup-note">{pup.status}</p> : null}
    </>
  );
}

function PupCard({ pup, photo }) {
  return (
    <article className="pup-card">
      <div className="pup-media">
        {photo ? <img src={photo} alt={pup.alt || pup.name} /> : <Paw />}
        {pup.adopted ? <span className="pup-badge">Adopted</span> : null}
      </div>
      <div className="pup-body">
        <h2>{pup.name}</h2>
        {pup.bio ? pup.bio.map((line) => <p key={line} className="pup-bio">{line}</p>) : null}
        {/* A pup with Jen's own bio (Charlie) shows her words, then only the ID.
            Her bio already gives the episode and adoption note. */}
        {pup.bio ? (
          <p className="pup-rescue">{pup.animalId || 'ID not verified'}</p>
        ) : (
          <PupFacts pup={pup} />
        )}
        {pup.adoptHref ? (
          <a className="pup-more" href={pup.adoptHref} target="_blank" rel="noopener noreferrer">{pup.adoptLabel || `Meet ${pup.name}`}</a>
        ) : null}
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

      <section className="wrap" style={{ paddingTop: 0 }}>
        <div className="pups-grid">
          {pups.map((pup) => {
            const photo = pup.src || (pup.imageSlug ? photos[pup.imageSlug] : null);
            return <PupCard key={pup.name} pup={pup} photo={photo} />;
          })}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
