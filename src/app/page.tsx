import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import { sharedOpenGraph } from "@/lib/metadata";
import { menu } from "@/data/menu";
import { SolBackground, SolWave } from "@/components/sol-background";
import { SolMotion } from "@/components/sol-motion";

export const metadata: Metadata = {
  title: "Casa Sol — Matcha & Coffee for Moments Together",
  description: "A little sunshine for your gathering. Casa Sol brings handcrafted matcha, cold brew and warm hospitality to celebrations across the DMV.",
  openGraph: { ...sharedOpenGraph, title: "Casa Sol — Matcha & Coffee for Moments Together" },
};

function Sun({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <circle cx="50" cy="50" r="21" />
    {Array.from({ length: 16 }, (_, i) => <path key={i} d="M50 19 Q46 12 50 3" transform={`rotate(${i * 22.5} 50 50)`} />)}
  </svg>;
}

const faqs = [
  ["Where do you travel?", "All across the DMV — Maryland, DC and Northern Virginia. Ask us about anything a little further out."],
  ["How far ahead should I book?", "Two to four weeks is ideal, but reach out anytime — we'll always check the date for you."],
  ["What do you need at our event?", "A flat space for the cart and access to power. We bring cups, ice and all the pretty details."],
  ["How do I secure my date?", "Your date is secured once we approve the event and receive the 50% deposit. The balance is due 7 days before your event."],
];

export default function Home() {
  return <SolMotion>
    <section className="sol-hero" aria-labelledby="hero-title">
      <SolBackground />
      <div className="sol-hero-copy">
        <img className="sol-main-logo" src="/images/casa-sol-logo-transparent.png" alt="Casa Sol Matcha & Coffee" width={420} height={290} fetchPriority="high" />
        <h1 id="hero-title">A matcha & coffee cart<br />made for your celebration</h1>
        <p className="sol-love">love is brewing <span aria-hidden="true">♡</span></p>
        <p className="sol-intro">Your favorite people. Something lovely to sip.<br className="hidden sm:block" /> A matcha & coffee cart that brings it all together.</p>
        <div className="sol-actions"><Link href="/book" className="sol-button">Bring Casa Sol to you <ArrowRight size={17} /></Link><Link href="/menu" className="sol-text-link">Explore the menu</Link></div>
        <p className="sol-location">Rooted in love. Pouring across the DMV.</p>
      </div>
      <div className="sol-hero-art">
        <div className="sol-orbit" aria-hidden="true" />
        <figure className="sol-hero-photo"><img src="/images/IMG_3550.jpg" alt="A Casa Sol iced drink held up with a little sunshine on the label" width={1000} height={1400} fetchPriority="high" /></figure>
        <Sun className="sol-hero-sun" />
        <span className="sol-photo-note">a cup full of good company</span>
      </div>
      <a href="#gather" className="sol-scroll"><ArrowDown size={15} /> Stay a little while</a>
    </section>

    <section id="gather" className="sol-gather sol-wrap">
      <SolBackground variant="garden" />
      <div className="sol-gather-heading"><p className="sol-label">Good things happen around the cart</p><h2>Come for the matcha.<br /><em>Stay for the moment.</em></h2></div>
      <div className="sol-gather-grid">
        <figure className="sol-wide-photo"><img src="/images/IMG_3549.jpg" alt="Milk being poured into matcha drinks at the Casa Sol table" width={1000} height={1400} loading="lazy" /><figcaption>Made by hand. Shared with love.</figcaption></figure>
        <div className="sol-gather-aside"><p>From the first hello to one last sip, we bring a little warmth to the days you want to remember.</p><figure><img src="/images/IMG_3547.jpg" alt="A smiling guest holding a freshly made Casa Sol matcha" width={1000} height={1400} loading="lazy" /><figcaption>The sweetest part? Your people.</figcaption></figure></div>
      </div>
    </section>

    <section className="sol-menu">
      <SolWave /><SolBackground variant="coffee" />
      <div className="sol-wrap sol-menu-grid">
        <div className="sol-menu-title"><p className="sol-label">Something for your sunny side</p><h2>Freshly poured.<br /><em>Wholeheartedly yours.</em></h2><p>Bright matcha, smooth cold brew, and a little sweetness in every cup.</p><Link href="/menu" className="sol-text-link">Find your favorite <ArrowRight size={16} /></Link><Sun className="sol-menu-sun" /></div>
        <div className="sol-menu-list">{menu.map(group => <div key={group.title}><h3>{group.title}</h3>{group.items.map(item => <div className="sol-drink" key={item.name}><h4>{item.name}</h4><p>{item.description}</p></div>)}<p className="sol-menu-note">{group.note}</p></div>)}</div>
      </div>
    </section>

    <section className="sol-events sol-wrap">
      <figure className="sol-cart-photo"><img src="/images/cart.jpg" alt="A softly styled coffee and matcha cart with greenery and blush details" width={1000} height={1400} loading="lazy" /></figure>
      <div className="sol-events-copy"><p className="sol-label">A little cart. So many possibilities.</p><h2>Wherever you gather,<br /><em>we’ll meet you there.</em></h2><p>Thoughtfully styled and made personal, with a menu that feels like you.</p>
        <ul className="sol-event-list"><li><span>01</span><div><h3>For your love stories</h3><p>Weddings, bridal showers & sweet beginnings.</p></div></li><li><span>02</span><div><h3>For your favorite people</h3><p>Birthdays, baby showers & just-because gatherings.</p></div></li><li><span>03</span><div><h3>For your community</h3><p>Pop-ups, team days & moments to connect.</p></div></li></ul>
        <Link href="/book" className="sol-text-link">Let’s dream up your day <ArrowRight size={16} /></Link>
      </div>
    </section>

    <section className="sol-story">
      <SolWave /><SolBackground variant="garden" />
      <div className="sol-wrap"><div className="sol-story-top"><p className="sol-label">Nuestra casa, your Casa Sol</p><Sun className="sol-story-sun" /></div><h2>Hola, we’re Casa Sol.<br /><em>There’s room for one more.</em></h2>
        <div className="sol-story-bottom"><figure><img src="/images/casa-sol-founder.png" alt="The Casa Sol founder sharing a matcha drink" width={1200} height={1408} loading="lazy" /><figcaption>From our casa to your celebration.</figcaption></figure><div><img className="sol-story-logo" src="/images/casa-sol-logo-transparent.png" alt="Casa Sol Matcha & Coffee" width={420} height={290} loading="lazy" /><p className="sol-label">Salvadoran roots. A DMV heart.</p><p>In our family, there’s always room for one more. One more seat, one more story, one more cup poured with love.</p><p>Casa Sol grew from that same feeling: bringing the warmth of home to the moments we share. A little piece of our Salvadoran roots, served in our own way.</p><Link href="/about" className="sol-text-link">A little more about us <ArrowRight size={16} /></Link></div></div>
      </div>
    </section>

    <section className="sol-planning sol-wrap"><div><p className="sol-label">We’ll take care of the pouring</p><h2>Your day,<br /><em>a little easier.</em></h2><p>Share your date and your ideas. We’ll work out the menu and setup, then come ready to make your people feel at home.</p><Link href="/book" className="sol-text-link">Tell us what you’re planning <ArrowRight size={16} /></Link></div><div className="sol-faq">{faqs.map(([q, a]) => <details key={q}><summary>{q}<Plus size={18} /></summary><p>{a}</p></details>)}</div></section>

    <section className="sol-finale"><SolBackground /><Sun className="sol-finale-sun" /><p className="sol-label">A good day starts with good company</p><h2>Let’s make a little<br /><em>sunshine together.</em></h2><Link href="/book" className="sol-button">Save a spot for Casa Sol <ArrowRight size={17} /></Link><p className="sol-finale-note">Matcha, coffee & a warm welcome. Always.</p></section>
  </SolMotion>;
}
