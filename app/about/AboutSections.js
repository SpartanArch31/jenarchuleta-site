import Image from 'next/image';
import { APPEARANCES, PRESS, cardMeta } from '../../lib/press';
import '../media/media.css';

const SPEAKING_INTRO = "I’m a wife, a mom of three, and a woman of faith, with a house full of rescues. Giving back is a big part of my life. I co-founded The Forever Angels, I volunteer with Childhelp and in hospice with my TDI therapy dog, and I’ve been a CASA volunteer. Getting here took a lot. I came from humble beginnings, barely finished school, and thought I was ugly. I became a Playboy Playmate, came through some very hard years, and wrote a book about all of it. When I speak, I tell the hard parts honestly, and then I tell you about the good life that came after, so you know you can rise too. I’d be honored to share it with your group.";

const SPEAKING_TALKS = [
  {
    title: 'Real Love, Real Family',
    text: 'Choosing real love changed everything for me. This talk is about marriage, discipline, and losing weight. It’s about pregnancy loss, natural childbirth, and becoming a mom. And it’s about trying to be the best mom I can: traditions, morals, values, and putting God in my kids’ hearts.',
  },
  {
    title: 'Roots Through Concrete',
    text: 'I grew up in a small town with big dreams. I was bullied, surrounded by gossip, and convinced I wasn’t enough. I barely finished school, but hard work and grit carried me farther than I ever imagined. This talk is about knowing your worth, no matter where you begin.',
  },
  {
    title: 'What Fame Couldn’t Give Me',
    text: 'Playboy gave me lifelong friendships and opened the door to a world I never expected to enter. It also taught me that attention and success cannot give you peace. This talk is about what remains after the spotlight fades: faith, family, purpose, and gratitude.',
  },
  {
    title: 'You Can Rewrite Your Life',
    text: 'I gently share the hardest parts of my story, including childhood assault, grief, drugs, my wake-up call, and surviving domestic violence. Faith, second chances, and forgiveness helped me rebuild. This talk is about reclaiming your voice and creating a life your past does not control.',
  },
  {
    title: 'Giving Back Is the Good Part',
    text: 'Giving back is where my story finds purpose. I share how service helped me turn difficult experiences into action through CASA, Childhelp, hospice work, animal rescue, and co-founding The Forever Angels. This talk is about using what you have lived through to help someone else.',
  },
];

const GIVE_BACK = [
  {
    src: '/assets/forever-angels-tree.jpg',
    alt: 'Jen and her Forever Angels co-founder at an angel tree event',
    caption: 'The Forever Angels',
    width: 1200,
    height: 1852,
  },
  {
    src: '/assets/turbo-ronald-mcdonald.jpg',
    alt: 'Jen with her therapy dog Turbo at a group visit',
    caption: 'Turbo doing TDI therapy dog work for Ronald McDonald House',
    width: 1158,
    height: 1164,
  },
  {
    src: '/assets/childhelp-wings-podium.jpg',
    alt: 'Jen Archuleta speaking at the Childhelp WINGS podium',
    caption: 'Speaking at Childhelp WINGS',
    width: 1179,
    height: 1343,
  },
];

function Cards({ items }) {
  return (
    <div className="media-grid">
      {items.map((item) => (
        <article className="media-card" key={item.href}>
          <p className="eyebrow">{item.outlet}</p>
          <h3>{item.headline}</h3>
          <p className="media-meta">{cardMeta(item)}</p>
          <a
            className="text-link"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.linkLabel || 'Read'} on ${item.outlet} (opens in new tab)`}
          >
            {item.linkLabel || 'Read'}<span aria-hidden="true"> ↗</span>
          </a>
        </article>
      ))}
    </div>
  );
}

export function SpeakingSection() {
  return (
    <section id="speaking" className="wrap">
      <h2>Speaking</h2>
      <p>{SPEAKING_INTRO}</p>
      <div className="speak-talks">
        {SPEAKING_TALKS.map((talk) => (
          <div key={talk.title} className="speak-talk">
            <h3>{talk.title}</h3>
            <p>{talk.text}</p>
          </div>
        ))}
      </div>
      <p className="media-actions">
        <a className="btn btn-primary" href="/contact">Invite me to speak</a>
      </p>
    </section>
  );
}

export function PressSection() {
  return (
    <section id="press" className="wrap">
      <h2>Press</h2>
      <Cards items={PRESS} />
      <div className="media-block">
        <h3>TV and appearances</h3>
        <Cards items={APPEARANCES} />
      </div>
      <p><a href="/media#press-kit">Press photos and kit</a></p>
    </section>
  );
}

export function GivingSection() {
  return (
    <section id="giving" className="wrap">
      <h2>CASA and Childhelp</h2>
      <p>
        I have been a CASA volunteer, and I have volunteered with Childhelp for more than eight years. I have chaired the annual fashion show fundraiser three times, including the 2022 A Day in Wonderland event, which raised nearly $325,000 for Childhelp’s programs.
      </p>
      <h3>The Forever Angels, my nonprofit</h3>
      <p>
        I co-founded The Forever Angels with Allison Kiefer. Families in need come first, and we also help veterans, older adults, and animals. We receive referrals from social workers and case managers, then work with trusted community partners to verify each need and make sure support reaches the people who truly need it.
      </p>
      <p className="media-actions">
        <a className="btn btn-ghost" href="https://theforeverangels.com/our-founders/" target="_blank" rel="noopener noreferrer">
          The Forever Angels
        </a>
      </p>
      <div className="give-back">
        {GIVE_BACK.map((photo) => (
          <figure key={photo.src}>
            <div className="headshot-frame">
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 1000px) 45vw, 340px" quality={82} />
            </div>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <p>Turbo has worked with Ronald McDonald House Charities, VA hospitals, and hospice.</p>
    </section>
  );
}
