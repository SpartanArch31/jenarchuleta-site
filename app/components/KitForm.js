import { KIT_FREE_CHAPTER_URL } from './site-data';

/*
 * Email capture (Kit / ConvertKit).
 *
 * Phase 1: renders an on-brand capture block that links to Jen's live
 * hosted free-chapter form, so it works everywhere today.
 *
 * Phase 2 (needs Jen's Kit FORM ID): replace the CTA below with Kit's
 * embeddable inline form. Kit gives a script like:
 *   <script async data-uid="XXImXXXXXX"
 *           src="https://jennifer-archuleta.kit.com/XXImXXXXXX/index.js"></script>
 * Drop that uid into KIT_FORM_UID and render the <script> (or use the
 * HTML-snippet embed) here.
 */
const KIT_FORM_UID = ''; // <-- TODO: paste Kit inline-form uid

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
        <a href={KIT_FREE_CHAPTER_URL} className="btn btn-primary">{cta}</a>
        <p className="foot-meta" style={{ marginTop: '14px' }}>
          You’ll also get my newsletter. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

export { KIT_FORM_UID };
