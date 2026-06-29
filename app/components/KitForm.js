import { KIT_FREE_CHAPTER_URL, KIT_FORM_UID } from './site-data';
import KitInlineForm from './KitInlineForm';

/*
 * Email capture (Kit / ConvertKit).
 * Renders Kit's embeddable INLINE form (uid from site-data). If the uid is
 * ever cleared, it falls back to the on-brand button → hosted landing page,
 * so capture never breaks.
 */

export default function KitForm({
  heading = 'Read the first chapter — free.',
  blurb = "I'll send the opening pages straight to your inbox. Come as you are.",
  cta = 'Send me the first chapter',
}) {
  return (
    <section className="capture">
      <div className="wrap text-wrap">
        <div className="eyebrow">Stay close</div>
        <h2>{heading}</h2>
        <p className="lead">{blurb}</p>
        {KIT_FORM_UID ? (
          <KitInlineForm uid={KIT_FORM_UID} />
        ) : (
          <>
            <a href={KIT_FREE_CHAPTER_URL} className="btn btn-primary">{cta}</a>
            <p className="foot-meta" style={{ marginTop: '14px' }}>
              You’ll also get my newsletter. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
