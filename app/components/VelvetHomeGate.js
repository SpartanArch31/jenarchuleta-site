'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { unlockVelvetLetter } from '../velvet/actions';
import VelvetKey from './VelvetKey';
import './home-velvet.css';

function UnlockButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      Unlock
    </button>
  );
}

// Homepage teaser. The check is the same server action as /velvet
// (VELVET_LETTER_PASSCODE stays on the server). A match sets the unlock
// cookie and opens the letter. A miss stays on this page.
export default function VelvetHomeGate() {
  const [state, formAction] = useFormState(unlockVelvetLetter, { error: false, tries: 0 });

  return (
    <section className="home-velvet" aria-labelledby="home-velvet-title">
      <div className="home-velvet-card">
        <VelvetKey className="home-velvet-key" />
        <h2 id="home-velvet-title">Psst. There’s a secret Velvet Letter waiting at the end of the book.</h2>
        <form action={formAction}>
          <div className="home-velvet-form">
            <label className="visually-hidden" htmlFor="home-velvet-passcode">Your passcode</label>
            <input
              id="home-velvet-passcode"
              name="passcode"
              type="password"
              placeholder="Enter your passcode"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-invalid={state?.error ? 'true' : undefined}
              aria-describedby={state?.error ? 'home-velvet-error' : undefined}
              required
            />
            <UnlockButton />
          </div>
          {state?.error ? (
            <p className="home-velvet-error" id="home-velvet-error" role="alert" key={state.tries}>
              That’s not quite it. Check the back of your book and try again.
            </p>
          ) : null}
        </form>
        <p className="home-velvet-note">
          Your passcode is tucked inside the back of the book. Don’t have it yet?{' '}
          <a href="/book#buy">Get your copy</a>.
        </p>
      </div>
    </section>
  );
}
