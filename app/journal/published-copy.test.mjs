import assert from 'node:assert/strict';
import test from 'node:test';
import { prepareJournalBody } from './repair-body.mjs';
import { fixPublishedCopy } from './published-copy.mjs';

function block(text) {
  return [{
    _type: 'block',
    _key: 'b',
    children: [{ _type: 'span', _key: 's', text, marks: [] }],
    markDefs: [],
  }];
}

function textOf(blocks) {
  return blocks.map((b) => (b.children || []).map((c) => c.text || '').join('')).join('\n');
}

test('bio says five rescues, and other posts keep five dogs', () => {
  const line = 'managing a household with five dogs and two tortoises.';
  assert.equal(
    fixPublishedCopy(line, 'bio'),
    'managing a household with five rescues and two tortoises.',
  );
  assert.equal(
    textOf(prepareJournalBody(block(line), 'bio')),
    'managing a household with five rescues and two tortoises.',
  );
  assert.equal(
    fixPublishedCopy('we had two cats, five dogs, and a duck.', 'everyone-has-a-story'),
    'we had two cats, five dogs, and a duck.',
  );
  assert.equal(
    fixPublishedCopy('three beautiful children, five dogs, and two tortoises.', 'childhelp-2'),
    'three beautiful children, five dogs, and two tortoises.',
  );
});

test('podcast post email and book title are corrected without touching handles', () => {
  const line = 'my book, Beyond the Velvet Rope, email me at unfilteredpod100@gmail.com Instagram: @unfilteredpod100';
  const fixed = fixPublishedCopy(line, 'coming-soon-my-very-own-podcast');
  assert.equal(
    fixed,
    'my book, Beyond the Velvet Ropes, email me at therealunfilteredpod@gmail.com Instagram: @unfilteredpod100',
  );
  assert.equal(textOf(prepareJournalBody(block(line), 'coming-soon-my-very-own-podcast')), fixed);
  assert.equal(
    fixPublishedCopy("Area Native Offers Peek Behind the 'Velvet Rope'", 'the-vindicator'),
    "Area Native Offers Peek Behind the 'Velvet Rope'",
  );
  assert.equal(
    fixPublishedCopy('Beyond the Velvet Ropes™ Signature Velvet', 'book-marks'),
    'Beyond the Velvet Ropes™ Signature Velvet',
  );
});

test('my-memoir says the book is available now, and the July title drops Coming', () => {
  const opener = 'Coming 🔜 📖 What does your book look like?';
  assert.equal(
    fixPublishedCopy(opener, 'my-memoir'),
    'Available now. 📖 What does your book look like?',
  );
  assert.equal(
    fixPublishedCopy(opener, 'coming-soon-my-very-own-podcast'),
    opener,
  );
  assert.equal(
    fixPublishedCopy('Coming in July: Brande Roderick, Actress, Baywatch Hawaii', 'coming-this-july-on-the-podcast'),
    'Brande Roderick, Actress, Baywatch Hawaii',
  );
  assert.equal(
    fixPublishedCopy('Beyond the Velvet Ropes: The Documentary Is Coming', 'beyond-the-velvet-ropes-the-documentary-is-coming'),
    'Beyond the Velvet Ropes: The Documentary Is Coming',
  );
});

test('bio wording, CASA, and Dr. Eloise years', () => {
  assert.equal(
    fixPublishedCopy('a successful makeup artist and Aesthetician', 'bio'),
    'a successful makeup artist and aesthetician',
  );
  assert.equal(
    fixPublishedCopy('Court Appointed Special Advocate (C.A.S.A), she', 'bio'),
    'Court Appointed Special Advocate (CASA), she',
  );
  assert.equal(
    fixPublishedCopy('including a recent record-breaking fashion show', 'bio'),
    'including the 2022 record-breaking fashion show',
  );
  assert.equal(
    fixPublishedCopy('seventeen years in marriage', 'bio'),
    'seventeen years in marriage',
  );
  assert.equal(
    fixPublishedCopy('Childhelp spans eight years', 'bio'),
    'Childhelp spans eight years',
  );
  assert.equal(
    fixPublishedCopy('With over 45 years of experience', 'dr-eloise-nelson'),
    'With more than 40 years of experience',
  );
  assert.equal(fixPublishedCopy('Why I became a C.A.S.A', 'why-i-became-a-c-a-s-a'), 'Why I became a CASA');
  assert.equal(fixPublishedCopy('C.A.S.A. She', 'bio'), 'CASA. She');
});

test('older name and spelling repairs still apply', () => {
  assert.equal(fixPublishedCopy('Felling the Love', 'live'), 'Feeling the Love');
  assert.equal(fixPublishedCopy('Shawn Patrick Flanery', 'live'), 'Sean Patrick Flanery');
});

test('replacements do not add an em dash', () => {
  const samples = [
    fixPublishedCopy('five dogs', 'bio'),
    fixPublishedCopy('Coming 🔜 📖 What does your book look like?', 'my-memoir'),
    fixPublishedCopy('Coming in July: Brande Roderick', 'coming-this-july-on-the-podcast'),
    fixPublishedCopy('Beyond the Velvet Rope', 'coming-soon-my-very-own-podcast'),
  ];
  for (const sample of samples) assert.equal(sample.includes('\u2014'), false);
});
