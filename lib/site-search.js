// Public pages and the 13 Buzzsprout episodes. /velvet, Studio, and the
// private dashboards are not listed. Episode lines are the opening of each
// Buzzsprout description, not the shelter closing.

export const SEARCH_PAGES = [
  {
    href: '/',
    title: 'Home',
    excerpt: 'Jen Archuleta. Faith, family, and a bunch of rescues. Author of Beyond the Velvet Ropes.',
  },
  {
    href: '/about',
    title: 'About Me',
    excerpt: 'Faith, family, and a bunch of rescues. God comes first.',
  },
  {
    href: '/book',
    title: 'Beyond the Velvet Ropes',
    excerpt: 'Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love by Jennifer Walcott Archuleta.',
  },
  {
    href: '/media',
    title: 'Beyond the Velvet Ropes: Media & Press',
    excerpt: 'Press, television, the feature film and documentary, and speaking.',
  },
  {
    href: '/journal',
    title: 'Journal',
    excerpt: 'Short, honest writing on faith, family, healing, and starting over.',
  },
  {
    href: '/podcast',
    title: 'Podcast',
    excerpt: 'Unfiltered with Jen Archuleta. 13 episodes. Listen on Buzzsprout or watch on YouTube.',
  },
  {
    href: '/pups',
    title: 'Pups of the Podcast',
    excerpt: 'Every episode of Unfiltered with Jen Archuleta features a rescue pup looking for a home.',
  },
  {
    href: '/sponsors',
    title: 'Sponsors and partners',
    excerpt: 'Sponsors and partners of Unfiltered with Jen Archuleta.',
  },
  {
    href: '/behind-the-velvet-ropes',
    title: 'Velvet Letters',
    excerpt: 'The story doesn’t end on the last page. Find the QR code in the back of the book.',
  },
  {
    href: '/thank-you',
    title: 'Thank You',
    excerpt: 'Thank you for supporting Jen Archuleta and Beyond the Velvet Ropes.',
  },
  {
    href: '/privacy',
    title: 'Privacy Policy',
    excerpt: 'How jenarchuleta.com collects, uses, and protects your personal information.',
  },
  {
    href: '/terms',
    title: 'Terms of Service',
    excerpt: 'The terms that govern your use of jenarchuleta.com.',
  },
  {
    href: '/shipping-returns',
    title: 'Shipping and Returns',
    excerpt: 'Shipping timelines, returns, and membership cancellation terms for jenarchuleta.com orders.',
  },
];

export const SEARCH_EPISODES = [
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/16926602',
    title: 'Ep. 1: Adam Archuleta, Former NFL Safety and CBS Sports Analyst',
    excerpt: 'In the first episode, Jen sits down with her husband, Adam Archuleta, a former NFL safety and now a CBS Sports analyst.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/17244807',
    title: 'Ep. 2: Anne Fundner, Mother and Fentanyl Awareness Advocate',
    excerpt: 'Jen sits down with Anne Fundner, a mother sharing her story after losing her 15-year-old son, Weston, to a single counterfeit pill laced with fentanyl.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/17373784',
    title: 'Ep. 3: Sean Patrick Flanery and Lauren Flanery on Faith and Family',
    excerpt: 'Jen sits down with actor Sean Patrick Flanery and his wife, Lauren Flanery. They talk about faith, discipline, marriage, and raising boys.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/17491948',
    title: 'Ep. 4: Brande Roderick, Actress and Former Baywatch Star',
    excerpt: 'Jen sits down with actress Brande Roderick. They talk about life in Hollywood, parenting in the public eye, and her role in the film Wineville.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/17731108',
    title: 'Ep. 5: Amy Palmiero-Winters, Amputee Endurance Athlete',
    excerpt: 'Jen sits down with Amy Palmiero-Winters, an endurance athlete and mother who competes as an amputee.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/17849563',
    title: 'Ep. 6: Spencer Coursen, Founder of Coursen Security Group',
    excerpt: 'Jen sits down with Spencer Coursen, founder of Coursen Security Group, who protects public officials, families, and public figures.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/18045199',
    title: 'Ep. 7: Father Tim, Priest',
    excerpt: 'Jen sits down with Father Tim for an honest conversation about holding onto faith in a divided world.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/18288950',
    title: 'Ep. 8: Chris Dorris, Mental Toughness Coach',
    excerpt: 'Jen sits down with mental toughness coach Chris Dorris. They talk about emotional mastery and daily habits that build resilience.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/18435236',
    title: 'Ep. 9: Dr. Eloise Nelson, Holistic Health and Nutrition Expert',
    excerpt: 'Jen sits down with Dr. Eloise Nelson, a holistic health expert who has spent more than 40 years studying nutrition.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/18692660',
    title: 'Ep. 10: Nick Lowery, Chiefs All-Time Leading Scorer',
    excerpt: 'Jen sits down with former NFL kicker Nick Lowery, the Kansas City Chiefs’ all-time leading scorer.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/18785141',
    title: 'Ep. 11: Jessica Jordaan, Mrs. USA 2022',
    excerpt: 'Jen sits down with Jessica Jordaan, Mrs. USA 2022. Jessica talks about the setbacks and defining moments in her life.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/18983736',
    title: 'Ep. 12: Brett Tippie, Mountain Bike Pioneer',
    excerpt: 'Jen sits down with pro mountain biker, entrepreneur, and storyteller Brett Tippie.',
  },
  {
    href: 'https://www.buzzsprout.com/2467154/episodes/19243689',
    title: 'Ep. 13: Jen Archuleta, Season 1 Finale',
    excerpt: 'In the season finale, Adam Archuleta turns the tables and interviews Jen.',
  },
];

function fold(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘]/g, "'")
    .toLowerCase();
}

export function snippet(text, limit = 180) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit);
  const space = cut.lastIndexOf(' ');
  return `${(space > 80 ? cut.slice(0, space) : cut).trim()}...`;
}

function score(item, words) {
  const title = fold(item.title);
  const excerpt = fold(item.excerpt);
  let points = 0;
  for (const word of words) {
    if (title.includes(word)) points += 3;
    else if (excerpt.includes(word)) points += 2;
    else points += 1;
  }
  return points;
}

export function searchRecords(records, query) {
  const words = fold(query).split(/\s+/).filter((word) => word.length > 1);
  if (!words.length) return [];
  return records
    .map((item) => {
      const haystack = fold(`${item.title} ${item.excerpt} ${item.text || ''}`);
      if (!words.every((word) => haystack.includes(word))) return null;
      return { ...item, points: score(item, words) };
    })
    .filter(Boolean)
    .sort((a, b) => b.points - a.points || a.title.localeCompare(b.title))
    .slice(0, 40);
}
