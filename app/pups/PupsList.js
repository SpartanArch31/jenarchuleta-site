import { PUPS, formatPupId } from '../../lib/pups';
import { pupPhotoUrls } from '../../lib/pup-photos';

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
      {pup.episode ? <p className="pup-guest">{pup.episode}</p> : null}
      <p className="pup-rescue">{formatPupId(pup.animalId)}</p>
      {pup.rescue ? (
        <p className="pup-rescue">
          <span className="pup-k">Shelter </span>
          {pup.rescueHref ? (
            <a href={pup.rescueHref} target="_blank" rel="noopener noreferrer">{pup.rescue}<span className="visually-hidden"> (opens in new tab)</span></a>
          ) : pup.rescue}
        </p>
      ) : null}
      {pup.status ? <p className="pup-note">{pup.status}</p> : null}
    </>
  );
}

function PupCard({ pup, photo, eager }) {
  return (
    <article className="pup-card" id={pup.name === 'Charlie' ? 'charlie' : undefined}>
      <div className={photo ? 'pup-media pup-media--photo' : 'pup-media'}>
        {photo ? (
          <img src={photo} alt={pup.alt || pup.name} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        ) : <Paw />}
        {pup.adopted ? <span className="pup-badge">Adopted</span> : null}
      </div>
      <div className="pup-body">
        <h2>{pup.name}</h2>
        {pup.bio ? pup.bio.map((line) => <p key={line} className="pup-bio">{line}</p>) : null}
        {pup.bio ? (
          <>
            <p className="pup-rescue">{formatPupId(pup.animalId)}</p>
            {pup.rescueHref ? (
              <p className="pup-rescue">
                <span className="pup-k">Shelter </span>
                <a href={pup.rescueHref} target="_blank" rel="noopener noreferrer">{pup.rescue || 'Shelter'}<span className="visually-hidden"> (opens in new tab)</span></a>
              </p>
            ) : null}
          </>
        ) : (
          <PupFacts pup={pup} />
        )}
        {pup.adoptHref || pup.watch || pup.post ? (
          <div className="pup-links">
            {pup.adoptHref ? (
              <a className="pup-more pup-adopt" href={pup.adoptHref} target="_blank" rel="noopener noreferrer">{pup.adoptLabel || `Meet ${pup.name}`}<span className="visually-hidden"> (opens in new tab)</span></a>
            ) : null}
            {pup.watch ? (
              <a className="pup-more" href={pup.watch} target="_blank" rel="noopener noreferrer">Watch the episode<span className="visually-hidden"> (opens in new tab)</span></a>
            ) : null}
            {pup.post ? <a className="pup-more" href={`/journal/${pup.post}`}>{pup.postLabel || 'Read more'}</a> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default async function PupsList() {
  const pups = [...PUPS].sort((a, b) => a.date.localeCompare(b.date));
  const photos = await pupPhotoUrls([...new Set(pups.map((p) => p.imageSlug).filter(Boolean))]);

  return (
    <div className="pups-grid">
      {pups.map((pup, i) => {
        const photo = pup.src || (pup.imageSlug ? photos[pup.imageSlug] : null);
        return <PupCard key={pup.name} pup={pup} photo={photo} eager={i < 3} />;
      })}
    </div>
  );
}
