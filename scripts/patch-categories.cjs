/*
 * One-off used during launch to apply auto-classified categories to the
 * migrated posts. Kept for reference / re-runs.
 *
 * Run from the repo root (needs the Sanity CLI logged in):
 *   npx sanity exec scripts/patch-categories.cjs --with-user-token
 *
 * Expects a JSON map { "<documentId>": "<Category>" } at CATS path
 * (produced by scripts/classify.py).
 */
const fs = require('fs');
const { getCliClient } = require('sanity/cli');
const client = getCliClient({ apiVersion: '2024-01-01' });
const CATS = process.env.CATS || './scripts/out/categories.json';

(async () => {
  const entries = Object.entries(JSON.parse(fs.readFileSync(CATS, 'utf8')));
  for (let i = 0; i < entries.length; i += 50) {
    const chunk = entries.slice(i, i + 50);
    let tx = client.transaction();
    for (const [id, category] of chunk) tx = tx.patch(id, (p) => p.set({ category }));
    await tx.commit({ visibility: 'async' });
    console.log('committed', Math.min(i + 50, entries.length), '/', entries.length);
  }
  console.log('done');
})().catch((e) => { console.error(e.message || e); process.exit(1); });
