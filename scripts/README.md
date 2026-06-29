# scripts/

One-off / repeatable maintenance scripts. Not part of the Next.js build.

| Script | What it does | How to run |
|---|---|---|
| `migrate.py` | Parses a Squarespace **WordPress XML** export → Sanity NDJSON (`out/posts.ndjson`) + per-post redirects (`../blog-redirects.json`). Filters to substantive posts (600+ chars), strips social-feed noise, preserves dates/images/slugs. | Edit the `F` (export path) and output paths at the top, then `python3 scripts/migrate.py` |
| `classify.py` | Reads `out/posts.ndjson` → assigns each post a Category by keyword scoring → `out/categories.json`. | `python3 scripts/classify.py` |
| `patch-categories.cjs` | Applies `out/categories.json` to posts already in Sanity. | `CATS=./scripts/out/categories.json npx sanity exec scripts/patch-categories.cjs --with-user-token` |

**Import migrated posts into Sanity** (downloads + uploads images via `_sanityAsset` URLs):
```
npx sanity dataset import scripts/out/posts.ndjson production --replace
```

To migrate MORE posts (e.g. lower the length threshold or add categories),
adjust `RAW_MIN`/`CLEAN_MIN` in `migrate.py`, re-run the three steps, and import.
Posts use stable `_id`s (`post-<slug>`), so re-imports update in place.
