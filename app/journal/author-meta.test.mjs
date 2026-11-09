import assert from 'node:assert/strict';
import test from 'node:test';
import { documentTitle, hasOpeningByline, mentionsAuthor, socialTitle, withAuthor } from './author-meta.mjs';

test('social title uses the site pattern, once', () => {
  assert.equal(socialTitle('Bookmarks'), 'Bookmarks, Jen Archuleta');
  assert.equal(socialTitle('  All Around the World '), 'All Around the World, Jen Archuleta');
  assert.equal(
    socialTitle('Jen Archuleta Interview | The Mr. Sports Show'),
    'Jen Archuleta Interview | The Mr. Sports Show',
  );
  assert.equal(documentTitle('Bookmarks'), 'Bookmarks');
  assert.deepEqual(documentTitle('Jen Archuleta on The Mr. Sports Show'), {
    absolute: 'Jen Archuleta on The Mr. Sports Show',
  });
});

test('Adam Archuleta is not treated as Jen', () => {
  assert.equal(mentionsAuthor('Adam Archuleta, Former NFL Safety'), false);
  assert.equal(socialTitle('Adam Archuleta'), 'Adam Archuleta, Jen Archuleta');
  assert.equal(
    withAuthor('For anyone who ever called Adam Archuleta a bust, please read this.'),
    'For anyone who ever called Adam Archuleta a bust, please read this. By Jen Archuleta.',
  );
});

test('descriptions gain her name once and stay short', () => {
  assert.equal(
    withAuthor('On faith, patience, and becoming who you’re meant to be.'),
    'On faith, patience, and becoming who you’re meant to be. By Jen Archuleta.',
  );
  assert.equal(
    withAuthor('This month on Unfiltered with Jen Archuleta, I sit down with a guest.'),
    'This month on Unfiltered with Jen Archuleta, I sit down with a guest.',
  );
  const long = 'Word '.repeat(80).trim();
  const described = withAuthor(long);
  assert.ok(described.length <= 155);
  assert.match(described, /By Jen Archuleta\.$/);
  assert.equal(described.includes('\u2014'), false);
  const named = `Listen to Jen Archuleta discuss her book. ${'More '.repeat(40)}`.trim();
  assert.equal(withAuthor(named), named);
});

test('an opening byline is not added again', () => {
  assert.equal(hasOpeningByline(['By Jen Archuleta. The rest of the note.']), true);
  assert.equal(
    hasOpeningByline([{ _type: 'block', children: [{ text: 'By Jennifer Walcott Archuleta' }] }]),
    true,
  );
  assert.equal(hasOpeningByline(['She wrote this without a byline.']), false);
});
