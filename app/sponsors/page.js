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
const SPONSORS = [
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
    ],
  },
  {
    name: 'MTJ Electric',
    links: [
      { label: 'mtjelectric.com', href: 'https://mtjelectric.com/' },
    ],
  },
  {
    name: 'Shred Mill Speed',
    links: [
      { label: 'shredmill.com', href: 'https://www.shredmill.com/' },
      { label: 'Instagram @shredmillspeed', href: 'https://www.instagram.com/shredmillspeed/' },
    ],
  },
  {
    name: 'Coursen Security Group',
    links: [
      { label: 'coursensecuritygroup.com', href: 'https://www.coursensecuritygroup.com/' },
    ],
  },
  {
    name: 'Optimize Scottsdale',
    links: [
      { label: 'optimizescottsdale.com', href: 'https://optimizescottsdale.com/' },
    ],
  },
  {
    name: "Lil' DUDE Wipes",
    links: [
      { label: 'dudewipes.com', href: 'https://dudewipes.com/' },
    ],
  },
];

export default function SponsorsPage() {
  return (
    <div className="sponsors-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap sponsors-head">
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
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                  ))}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="sponsors-close">
          Want to sponsor an episode? <a href="/media#contact">Contact me</a>.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
