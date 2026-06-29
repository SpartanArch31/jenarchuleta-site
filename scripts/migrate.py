#!/usr/bin/env python3
"""Migrate substantive Squarespace 'blog' posts -> Sanity NDJSON + redirects."""
import re, html, json, sys
from xml.etree import ElementTree as ET

F = "/Users/adamarchuleta31/Downloads/Squarespace-Wordpress-Export-06-29-2026.xml"
OUT_NDJSON = "/private/tmp/claude-501/-Users-adamarchuleta31-projects-hotboards/8379c897-c250-4d11-bb8f-8d1897601949/scratchpad/posts.ndjson"
OUT_REDIRECTS = "/Users/adamarchuleta31/Downloads/Jennifer/Website/blog-redirects.json"

ns = {'wp': 'http://wordpress.org/export/1.2/',
      'content': 'http://purl.org/rss/1.0/modules/content/',
      'dc': 'http://purl.org/dc/elements/1.1/'}

RAW_MIN = 600      # only substantive posts
CLEAN_MIN = 250    # after cleanup, still has real writing

def slugify(s):
    s = s.strip().lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'-+', '-', s).strip('-')
    return s

def clean_title(t):
    t = html.unescape(t or '').strip()
    t = re.sub(r'(\s*[#@]\w+)+\s*$', '', t).strip()       # trailing #tags/@mentions
    t = re.sub(r'^[^0-9A-Za-zÀ-ÿ]+', '', t)               # leading emoji/symbols
    t = re.sub(r'[^0-9A-Za-zÀ-ÿ.!?\'")]+$', '', t).strip()  # trailing emoji/symbols
    return re.sub(r'\s+', ' ', t)

def is_bad_title(t):
    return len(re.sub(r'[^A-Za-z]', '', t)) < 3

def derive_title(body_paras):
    if not body_paras:
        return "Journal entry"
    first = re.split(r'(?<=[.!?])\s', body_paras[0])[0]
    first = re.sub(r'[#@]\w+', '', first).strip()
    first = re.sub(r'^[^0-9A-Za-zÀ-ÿ]+', '', first).strip(' ,;:-—')
    words = first.split()
    s = ' '.join(words[:10]).strip(' ,;:-—')
    if not s:
        return "Journal entry"
    return (s[0].upper() + s[1:])[:70].strip()

def is_noise_paragraph(t):
    """True if a paragraph is pure social noise (hashtags/mentions/CTA/url)."""
    if not t:
        return True
    # pure URL
    if re.fullmatch(r'(https?://\S+\s*)+', t):
        return True
    # 'Platform → url' or 'Follow → @handle' style CTA
    if '→' in t and ('http' in t or '@' in t):
        return True
    # strip hashtags + mentions; if almost nothing meaningful remains -> noise
    stripped = re.sub(r'[#@]\w+', '', t)
    letters = re.sub(r'[^A-Za-z]', '', stripped)
    if len(letters) < 3:
        return True
    return False

def paragraphs(content):
    # pull each <p>...</p> inner text
    ps = re.findall(r'<p\b[^>]*>(.*?)</p>', content, flags=re.S | re.I)
    out = []
    for p in ps:
        t = re.sub(r'<br\s*/?>', '\n', p, flags=re.I)
        t = re.sub(r'<[^>]+>', '', t)            # drop inline tags
        t = html.unescape(t).replace('\xa0', ' ').strip()
        t = re.sub(r'[ \t]+', ' ', t)
        out.append(t)
    return out

def images(content):
    return re.findall(r'<img[^>]+src="([^"]+)"', content, flags=re.I)

tree = ET.parse(F); root = tree.getroot()
docs, redirects, seen_slugs = [], [], set()
kept = 0

for it in root.findall('.//item'):
    if it.findtext('wp:post_type', '', ns) != 'post':
        continue
    if it.findtext('wp:status', '', ns) != 'publish':
        continue
    content = it.findtext('content:encoded', '', ns) or ''
    plain = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', content))).strip()
    if len(plain) < RAW_MIN:
        continue

    link = (it.findtext('link') or '').strip()          # /blog/<orig>
    post_name = (it.findtext('wp:post_name', '', ns) or '').strip()
    date = (it.findtext('wp:post_date_gmt', '', ns) or it.findtext('wp:post_date', '', ns) or '').strip()
    iso = date.replace(' ', 'T') + 'Z' if date else None

    # body: keep real paragraphs, drop social-noise ones
    body_paras = [p for p in paragraphs(content) if p and not is_noise_paragraph(p)]
    clean_text = ' '.join(body_paras)
    if len(clean_text) < CLEAN_MIN:
        continue

    # title: clean it; if it's hashtag/emoji junk, derive from the body
    title = clean_title(it.findtext('title', '') or '')
    if is_bad_title(title):
        title = derive_title(body_paras)

    # slug: from the (clean) title; fall back to a readable post_name
    new_slug = slugify(title)
    if len(new_slug) < 3:
        pn = slugify(post_name)
        new_slug = pn if (pn and not re.fullmatch(r'[a-z0-9]{18,}', pn)) else 'journal-entry'
    base = new_slug; n = 2
    while new_slug in seen_slugs:
        new_slug = f"{base}-{n}"; n += 1
    seen_slugs.add(new_slug)

    imgs = images(content)
    hero = imgs[0] if imgs else None

    # build portable text
    body = []
    for i, p in enumerate(body_paras):
        body.append({
            "_type": "block", "_key": f"b{i}", "style": "normal", "markDefs": [],
            "children": [{"_type": "span", "_key": f"b{i}s", "text": p, "marks": []}],
        })
    for j, src in enumerate(imgs[1:6]):   # extra inline images (cap a few)
        body.append({"_type": "image", "_key": f"img{j}", "_sanityAsset": f"image@{src}"})

    excerpt = (clean_text[:157] + '…') if len(clean_text) > 158 else clean_text

    doc = {
        "_id": f"post-{new_slug}",
        "_type": "post",
        "title": title or "Untitled",
        "slug": {"_type": "slug", "current": new_slug},
        "publishedAt": iso or "2025-01-01T00:00:00Z",
        "category": "Journal",
        "excerpt": excerpt,
        "body": body,
    }
    if hero:
        doc["heroImage"] = {"_type": "image", "_sanityAsset": f"image@{hero}"}
    docs.append(doc)
    kept += 1

    if link:
        redirects.append({"source": link, "destination": f"/journal/{new_slug}", "permanent": True})

with open(OUT_NDJSON, 'w') as f:
    for d in docs:
        f.write(json.dumps(d, ensure_ascii=False) + "\n")
with open(OUT_REDIRECTS, 'w') as f:
    json.dump(redirects, f, ensure_ascii=False, indent=0)

print(f"kept {kept} posts -> {OUT_NDJSON}")
print(f"{len(redirects)} redirects -> {OUT_REDIRECTS}")
print("sample titles:")
for d in docs[:10]:
    print("  -", d["title"][:60], "->", d["slug"]["current"][:40])
