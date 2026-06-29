#!/usr/bin/env python3
import json, re

NDJSON = "/private/tmp/claude-501/-Users-adamarchuleta31-projects-hotboards/8379c897-c250-4d11-bb8f-8d1897601949/scratchpad/posts.ndjson"
OUT    = "/private/tmp/claude-501/-Users-adamarchuleta31-projects-hotboards/8379c897-c250-4d11-bb8f-8d1897601949/scratchpad/categories.json"

# keyword -> weight, per category. Order = tie-break priority (earlier wins).
CATS = {
  "Podcast": ["podcast","unfiltered","episode","now streaming","streaming","buzzsprout",
              "new ep","outtakes","tune in","watch + subscribe","pup of the podcast",
              "season finale","my guest","this episode","listen","spotify","apple podcast",
              "youtube short","drops monday","go live","we go beyond"],
  "Advocacy": ["forever angel","childhelp","c.a.s.a","casa","rescue","foster","hospice",
               "charity","give back","giveback","nonprofit","non-profit","donate","donation",
               "fundraiser","raffle","sponsor a","volunteer","abuse","awareness","fentanyl",
               "furever","shelter","adopt","cause","the great giveback"],
  "Behind the Book": ["memoir","velvet rope","my book","the book","my story of perseverance",
                      "playboy","centerfold","hef","hugh hefner","chapter","my memoir",
                      "writing my","author","wrote a book","behind the book"],
  "Faith": ["god","faith","blessed","blessing","pray","prayer","jesus","christ","lord",
            "scripture","church","grace","gospel","heaven","soul","spiritual","believe in",
            "his plan","c.s. lewis","cs lewis","love thy enem","pain into purpose"],
  "Health & Wellness": ["spartan","marathon","gym","fitness","workout","training","exercise",
                        "discipline","wellness","nutrition","run ","running","race","de sables",
                        "endurance","strength","my body","health","obstacle"],
  "Family": ["my kids","my son","my daughter","my boys","my children","husband","adam archuleta",
             "marriage","married","anniversary","birthday","grandma","grandmother","my mom",
             "my family","family tradition","parenting","graduation","our kids","mother",
             "my dog","my rescue","our dog","puppy","pup ","kitten"],
}
PRIORITY = list(CATS.keys())

def text_of(doc):
    parts = [doc.get("title","")]
    for b in doc.get("body",[]):
        if b.get("_type")=="block":
            for c in b.get("children",[]):
                parts.append(c.get("text",""))
    return " \n ".join(parts)

def title_of(doc):
    return doc.get("title","")

docs = [json.loads(l) for l in open(NDJSON)]
result = {}
dist = {c:0 for c in CATS}; dist["Journal"]=0
samples = {c:[] for c in list(CATS)+["Journal"]}

for d in docs:
    body = text_of(d).lower()
    title = title_of(d).lower()
    scores = {}
    for cat, kws in CATS.items():
        s = 0
        for kw in kws:
            n = body.count(kw)
            if n:
                s += n
                if kw in title:
                    s += 3   # title mentions weigh more
        scores[cat] = s
    best = max(PRIORITY, key=lambda c: (scores[c], -PRIORITY.index(c)))
    cat = best if scores[best] > 0 else "Journal"
    result[d["_id"]] = cat
    dist[cat]+=1
    if len(samples[cat])<4: samples[cat].append(d["title"][:48])

json.dump(result, open(OUT,"w"), indent=0)
print("distribution:")
for c in list(CATS)+["Journal"]:
    print(f"  {c:18s} {dist[c]:3d}   e.g. " + " | ".join(samples[c]))
print("\nwrote", OUT)
