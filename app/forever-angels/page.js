import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import './forever-angels.css';

export const metadata = {
  title: 'The Forever Angels',
  description:
    'Forever Angels is a charitable organization that holds a profound place in our hearts.',
};

// Jen's own explanation of the charity, from her journal post
// "What is a forever Angel" (August 6, 2023). Not rewritten.
const PARAGRAPHS = [
  'Forever Angels is a charitable organization that holds a profound place in our hearts. Our mission is driven by an unwavering desire to provide steadfast support to families facing hardships. By forging meaningful human connections, we bring together generous sponsors who continuously assist these families in various aspects of their lives. Our support transcends mere material provisions, encompassing the very essence of love, care, and empathy.',
  'At the core of “Forever Angels” lies the belief that even the smallest act of kindness can wield a powerful impact, far beyond our imagination. It’s not about the size of the gift; it’s the genuine compassion behind it that matters most. We cherish every act of kindness, no matter how seemingly humble, as we understand the profound effect these gestures of love can have on the lives of those in need. Whether it’s providing essential items like warm meals and clothes or simply lending a listening ear and offering support, these collective acts create an outpouring of love that envelops the beneficiaries like a warm embrace.',
  'For us, life is not a mere passage of days; it’s about cherishing and embracing those small moments that give life its true meaning. We are committed to bringing joy to the recipients of our help. From gifting festive Christmas trees, holiday wish lists, to providing school essentials and even organizing birthday parties, we strive to fill the hearts of the families we serve with happiness and create everlasting memories.',
  'Amid life’s adversities, “Forever Angels” stands as a symbol of hope and resilience. The contributions from compassionate souls are deeply appreciated and engraved in the gratitude of the families we serve. Your involvement holds the incredible power to ignite hope, healing, and transformation in their lives.',
  'We help families, veterans, hospice patients, and animals in need. Here’s how you can help. We pledge to keep the flame of compassion burning brightly in our hearts. As a charity, “Forever Angels” serves as a beacon of love, illuminating the lives of those in need, and wholeheartedly striving to make the world a better place, one heartwarming gesture at a time',
];

export default function ForeverAngelsPage() {
  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <article id="main-content" className="wrap text-wrap forever-page">
        <p className="eyebrow">The Forever Angels</p>
        <h1>What is a forever Angel</h1>
        {PARAGRAPHS.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
      <SiteFooter />
    </>
  );
}
