'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { unlockVelvetLetter } from './actions';

function OpenButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? 'Opening…' : 'Open'}
    </button>
  );
}

// The two invitation buttons, and the passcode field that opens from the
// second one. "Enter Your Passcode" is a real link to the form (CSS :target
// reveals it), so it works even before the page's JavaScript loads; the form
// posts to a server action the same way. The passcode is checked on the
// server (actions.js) — never in the browser.
export default function VelvetGate() {
  const [state, formAction] = useFormState(unlockVelvetLetter, { error: false, tries: 0 });
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (state?.error) {
      setOpen(true);
      inputRef.current?.select();
    }
  }, [state]);

  return (
    <div className="vl-gate-actions">
      <div className="vl-buttons">
        <a className="btn btn-primary" href="/book">Get the Book</a>
        <a
          className="btn btn-ghost"
          href="#velvet-passcode-form"
          aria-controls="velvet-passcode-form"
          aria-expanded={open}
          onClick={(event) => {
            event.preventDefault();
            setOpen(true);
          }}
        >
          Enter Your Passcode
        </a>
      </div>

      <form
        id="velvet-passcode-form"
        className={`vl-form${open ? ' is-open' : ''}`}
        action={formAction}
      >
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
            required
          />
          <OpenButton />
        </div>
        {state?.error ? (
          <p className="vl-error" role="alert" key={state.tries}>
            That’s not quite it. Your secret passcode is beside the QR code inside the back cover.
          </p>
        ) : null}
      </form>
    </div>
  );
}
