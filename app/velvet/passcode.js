import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

// The Velvet Letter gate.
//
// The passcode printed in the back of the book lives ONLY in the Vercel
// environment variable VELVET_LETTER_PASSCODE (Production and Preview).
// Nothing in this public repo reveals it: no word, no digest.
//
// The unlock cookie is an HMAC keyed by that server-only passcode (plus the
// optional VELVET_COOKIE_SECRET), so it cannot be forged by anyone reading
// this code. If the env var is missing, the gate fails CLOSED: nobody gets in
// until it is set. That is deliberate: a missing setting must never open the
// private journal.
//
// Bump VERSION to sign everyone out (readers just re-enter the passcode).
const COOKIE = 'velvet_letter';
const VERSION = 'v2';

export function normalizePasscode(value) {
  return String(value || '')
    .normalize('NFKC')
    .replace(/[‘’‚‛′`´]/g, "'")
    .replace(/[“”„‟″]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/[​-‍﻿]/g, '')
    .replace(/ /g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/^['"]+|['"]+$/g, '');
}

function sha(value) {
  return createHash('sha256').update(String(value)).digest();
}

function configuredPasscode() {
  for (const value of [process.env.VELVET_LETTER_PASSCODE, process.env.VELVET_PAGES_PASSCODE]) {
    const normalized = normalizePasscode(value);
    if (normalized) return normalized;
  }
  return '';
}

export function gateConfigured() {
  return Boolean(configuredPasscode());
}

export function passcodeMatches(pass) {
  const attempt = normalizePasscode(pass);
  const secret = configuredPasscode();
  if (!attempt || !secret) return false;
  return timingSafeEqual(sha(attempt), sha(secret));
}

function unlockToken() {
  const secret = configuredPasscode();
  if (!secret) return '';
  const key = createHmac('sha256', `jen-velvet-letter-${VERSION}`)
    .update(`${secret}|${process.env.VELVET_COOKIE_SECRET || ''}`)
    .digest();
  return createHmac('sha256', key).update('unlocked').digest('hex');
}

export function isUnlocked() {
  const expected = unlockToken();
  if (!expected) return false;
  const got = cookies().get(COOKIE)?.value || '';
  const a = Buffer.from(got);
  const b = Buffer.from(expected);
  if (a.length !== b.length || a.length === 0) return false;
  return timingSafeEqual(a, b);
}

export function setUnlockCookie() {
  const token = unlockToken();
  if (!token) return;
  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/velvet',
    maxAge: 60 * 60 * 24 * 30,
  });
}
