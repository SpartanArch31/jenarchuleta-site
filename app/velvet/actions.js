'use server';

import { redirect } from 'next/navigation';
import { gateConfigured, passcodeMatches, setUnlockCookie } from './passcode';

// Server-side check. The passcode never reaches the browser, and the private
// journal is only rendered by the server after this sets the signed cookie.
// Shaped for useFormState so the form also works before JavaScript loads.
export async function unlockVelvetLetter(prevState, formData) {
  const pass = String(formData.get('passcode') || '');
  if (!gateConfigured()) {
    console.error('VELVET_LETTER_PASSCODE is not set. The Velvet Letter stays locked.');
  }
  if (!passcodeMatches(pass)) {
    // A short pause makes guessing slow without bothering a real reader.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: true, tries: (prevState?.tries || 0) + 1 };
  }
  setUnlockCookie();
  redirect('/velvet');
}
