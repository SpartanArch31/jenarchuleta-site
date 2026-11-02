'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { unlockVelvetLetter } from './actions';

function EnterButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? 'Opening…' : 'Enter'}
    </button>
  );
}

// The passcode field, always visible (Jen, November 2026: no extra click to
// reveal it). The form posts to a server action, so it works even before the
// page's JavaScript loads. The passcode is checked on the server (actions.js),
// never in the browser.
export default function VelvetGate() {
  const [state, formAction] = useFormState(unlockVelvetLetter, { error: false, tries: 0 });
  const inputRef = useRef(null);

  useEffect(() => {
    if (state?.error) inputRef.current?.select();
  }, [state]);

  return (
    <form id="velvet-passcode-form" className="vl-form" action={formAction}>
      <label htmlFor="velvet-passcode" className="vl-label">Your passcode</label>
      <div className="vl-field">
        <input
          ref={inputRef}
          id="velvet-passcode"
          name="passcode"
          type="password"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-describedby="velvet-passcode-note"
          required
        />
        <EnterButton />
      </div>
      {state?.error ? (
        <p className="vl-error" role="alert" key={state.tries}>
          That’s not quite it. Your passcode is in the back of the book, under the QR code.
        </p>
      ) : null}
    </form>
  );
}
