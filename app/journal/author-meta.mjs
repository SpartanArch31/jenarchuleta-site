// Journal titles, descriptions, and the visible byline.
// The root layout already turns a plain title into "Title, Jen Archuleta".
// Social titles do not use that template, so they get the same ending here.
// Her post text is never rewritten.

export const AUTHOR_NAME = 'Jen Archuleta';

const AUTHOR_RE = /\b(?:jen(?:nifer)?(?:\s+walcott)?\s+archuleta|jennifer\s+walcott)\b/i;
const BYLINE_RE = /^by\s+(?:jen(?:nifer)?(?:\s+walcott)?\s+archuleta|jennifer\s+walcott)\b/i;
const DESC_LIMIT = 155;

export function mentionsAuthor(text) {
  return AUTHOR_RE.test(String(text || ''));
}

function clean(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

export function socialTitle(raw) {
  const title = clean(raw);
  if (!title) return `Journal, ${AUTHOR_NAME}`;
  if (mentionsAuthor(title)) return title;
  return `${title}, ${AUTHOR_NAME}`;
}

// A string is filled in by the site title template. An absolute title is used
// when her name is already in the post title, so it is not added twice.
export function documentTitle(raw) {
  const title = clean(raw);
  if (!title || mentionsAuthor(title)) return { absolute: socialTitle(title) };
  return title;
}

function clip(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.lastIndexOf('. ');
  const space = cut.lastIndexOf(' ');
  const end = sentence > 40 ? sentence : space > 20 ? space : max;
  return cut.slice(0, end).replace(/[.,;:\s]+$/, '');
}

export function withAuthor(raw) {
  const text = clean(raw);
  if (!text) return `A journal note by ${AUTHOR_NAME}.`;
  // Leave a description that already names her. Only trim when the credit
  // has to fit, so an existing sentence is not cut just to repeat her name.
  if (mentionsAuthor(text)) return text;
  const credit = ` By ${AUTHOR_NAME}.`;
  let base = text;
  if (base.length + credit.length > DESC_LIMIT) base = clip(text, DESC_LIMIT - credit.length);
  if (!base) return `A journal note by ${AUTHOR_NAME}.`;
  if (!/[.!?…]$/.test(base)) base += '.';
  return `${base}${credit}`;
}

function openingText(body) {
  if (!Array.isArray(body) || body.length === 0) return '';
  const first = body[0];
  if (typeof first === 'string') return first;
  if (first && first._type === 'block' && Array.isArray(first.children)) {
    return first.children.map((child) => child?.text || '').join('');
  }
  return '';
}

export function hasOpeningByline(body) {
  return BYLINE_RE.test(clean(openingText(body)));
}
