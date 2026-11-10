import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import './sponsors.css';

export const metadata = {
  title: 'Sponsors and partners',
  description:
    'Sponsors and partners of Unfiltered with Jen Archuleta.',
};

// Jen's list, this order. A link is included only when the page loads.
// sunsetsandbonfires.com now redirects to the Etsy shop, so that shop is the link.
// Etsy answers a script with 403; the shop URL is the one she confirmed.
// Full names. A link is included only when that page itself loads.
// Nov 5: every sponsor's links looked up and confirmed (official site or shop,
// plus Instagram where the business has one); brands spelled their own way.
export const SPONSORS = [
  {
    name: 'Sunsets & Bonfires',
    links: [
      { label: 'etsy.com/shop/SunsetsBonfires', href: 'https://www.etsy.com/shop/SunsetsBonfires' },
      { label: 'Instagram @sunsetsbonfires', href: 'https://www.instagram.com/sunsetsbonfires/' },
    ],
  },
  {
    name: 'Thrive Media',
    note: 'Also produced the podcast.',
    links: [
      { label: 'thrivemedia.social', href: 'https://thrivemedia.social' },
    ],
  },
  {
    name: 'KJ Classic Creations',
    links: [
      { label: 'etsy.com/shop/kjclassiccreations', href: 'https://www.etsy.com/shop/kjclassiccreations' },
      { label: 'Instagram @kjclassiccreations', href: 'https://www.instagram.com/kjclassiccreations/' },
    ],
  },
  {
    name: 'Ring My Belle: Beauty, Delivered',
    links: [
      { label: 'ringmybelle.com', href: 'https://ringmybelle.com' },
      { label: 'Instagram @ringmybelleco', href: 'https://www.instagram.com/ringmybelleco/' },
    ],
  },
  {
    name: 'Ask Eloise',
    person: 'Dr. Eloise Nelson',
    note: 'Holistic nutrition.',
    links: [
      { label: 'askeloise.com', href: 'https://www.askeloise.com/' },
      { label: 'Instagram @ask.eloise', href: 'https://www.instagram.com/ask.eloise/' },
    ],
  },
  {
    name: 'MTJ Electric',
    links: [
      { label: 'mtjelectric.com', href: 'https://mtjelectric.com/' },
    ],
  },
  {
    name: 'SHREDmill',
    links: [
      { label: 'shredmill.com', href: 'https://www.shredmill.com/' },
      { label: 'Instagram @shredmillspeed', href: 'https://www.instagram.com/shredmillspeed/' },
    ],
  },
  {
    name: 'Coursen Security Group',
    links: [
      { label: 'coursensecuritygroup.com', href: 'https://www.coursensecuritygroup.com/' },
      { label: 'Instagram @coursensecurity', href: 'https://www.instagram.com/coursensecurity' },
    ],
  },
  {
    // The sponsor is Optimyze (with a y). optimizescottsdale.com is a different business.
    name: 'Optimyze Scottsdale',
    links: [
      { label: 'optimyze.me', href: 'https://optimyze.me/scottsdale-cold-plunge/' },
      { label: 'Instagram @optimyze.scottsdale', href: 'https://www.instagram.com/optimyze.scottsdale/' },
    ],
  },
  {
    // Jen, Nov 5: Totali EZ Balloons, the Ep. 8 sponsor (lib/episode-credits.js).
    name: 'Totali EZ Balloons',
    links: [
      { label: 'totaliezballoons.com', href: 'https://totaliezballoons.com/' },
      { label: 'Instagram @totaliezballoons', href: 'https://www.instagram.com/totaliezballoons/' },
    ],
  },
  {
    name: "LiL' DUDE Wipes",
    links: [
      { label: 'dudewipes.com', href: 'https://dudewipes.com/products/lil-dude-wipes' },
      { label: 'Instagram @dudewipes', href: 'https://www.instagram.com/dudewipes/' },
    ],
  },
  {
    name: 'The Classroom Elite Wellness Collective',
    links: [
      { label: 'theclassroomelitewellnesscollective.com', href: 'https://theclassroomelitewellnesscollective.com/' },
      { label: 'Instagram @classroom.elite', href: 'https://www.instagram.com/classroom.elite/' },
    ],
  },
];

export default function SponsorsPage() {
  return (
    <div className="sponsors-page">
      {/* PS-15: skip link first, before the nav, pointing at <main>. */}
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />

      <main id="main-content">
      <section className="wrap sponsors-head">
        <div className="eyebrow">The Podcast</div>
        <h1>Sponsors and partners</h1>
        <p className="lead">
          Thank you to the sponsors and partners who have supported Unfiltered with Jen Archuleta.
        </p>
        <ul className="sponsor-list">
          {SPONSORS.map((sponsor) => (
            <li key={sponsor.name}>
              <h2>{sponsor.name}</h2>
              {sponsor.person ? <p className="sponsor-person">{sponsor.person}</p> : null}
              {sponsor.note ? <p className="sponsor-note">{sponsor.note}</p> : null}
              {sponsor.links ? (
                <p className="sponsor-links">
                  {sponsor.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span className="visually-hidden"> (opens in new tab)</span></a>
                  ))}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="sponsors-close">
          Want to sponsor an episode? <a href="/thank-you#contact">Contact me</a>.
        </p>
      </section>
      </main>

      <SiteFooter />
    </div>
  );
}
