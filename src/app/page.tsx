import { localizeMetadata } from "@/lib/i18n/metadata";
import { getTranslations } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import { sharedOpenGraph } from "@/lib/metadata";
import { BotanicalBranch, DrinkIllustration, SunMedallion as Sun } from "@/components/sol-illustrations";
import { menu, seasonal } from "@/data/menu";
import { SolBackground, SolWave } from "@/components/sol-background";
import { SolMotion } from "@/components/sol-motion";
import { SeasonalFeature } from "@/components/seasonal-feature";
import { DeliverySection } from "@/components/delivery-section";

const pageMetadata: Metadata = {
  title: "Casa Sol — Matcha & Coffee for Moments Together",
  description: "Casa Sol brings handcrafted matcha, cold brew, mocktails, and warm hospitality to celebrations across the DMV. Explore beverage catering and fresh drink delivery.",
  openGraph: { ...sharedOpenGraph, title: "Casa Sol — Matcha & Coffee for Moments Together" },
};

const faqs = [
  ["Where do you travel?", "All across the DMV — Maryland, DC and Northern Virginia. Ask us about anything a little further out."],
  ["How far ahead should I book?", "Two to four weeks is ideal. Requests made 14 calendar days or fewer before the event are subject to a $150 rush fee and availability. Requests within 7 days require payment in full to confirm."],
  ["Is the wooden cart included?", "Our Signature Casa Sol Setup — a branded table/drink station, menu display, and serving essentials — is included. The handcrafted wooden cart is a premium add-on, quoted for your location and transportation needs."],
  ["How do I secure my date?", "An inquiry does not reserve a date. Once your booking is confirmed, a 50% deposit secures it. The balance is due 7 days before your event; bookings within 7 days require full payment."],
];

export default async function Home() {
  const t = await getTranslations();
  return <SolMotion>
    <section className="sol-hero" aria-labelledby="hero-title">
      <SolBackground />
      <div className="sol-hero-copy">
        <img className="sol-main-logo" src="/images/casa-sol-logo-transparent.png" alt="Casa Sol Matcha & Coffee" width={420} height={290} fetchPriority="high" />
        <h1 id="hero-title">{t("A little sunshine,")}<br />{t("served wherever you gather.")}</h1>
        <p className="sol-love">{t("love is brewing ")}<span aria-hidden="true">♡</span></p>
        <p className="sol-intro">{t("Matcha, cold brew & mocktails.")}<br />{t(" A mobile beverage experience, made personal.")}</p>
        <div className="sol-actions"><Link href="/packages" className="sol-button">{t("Explore experiences ")}<ArrowRight size={17} /></Link><Link href="/menu" className="sol-text-link">{t("Explore the menu")}</Link></div>
        <p className="sol-location">{t("Rooted in love. Pouring across the DMV.")}</p>
      </div>
      <div className="sol-hero-art">
        <div className="sol-orbit" aria-hidden="true" />
        <figure className="sol-hero-photo"><img src="/images/IMG_3550.jpg" alt={t("A Casa Sol iced drink held up with a little sunshine on the label")} width={1000} height={1400} fetchPriority="high" /></figure>
        <Sun className="sol-hero-sun" />
        <span className="sol-photo-note">{t("a cup full of good company")}</span>
      </div>
      <a href={seasonal.length ? "#fall-at-casa-sol" : "#gather"} className="sol-scroll"><ArrowDown size={15} />{t(seasonal.length ? "A taste of the season" : "Stay a little while")}</a>
    </section>

    <SeasonalFeature preview />

    <section id="gather" className="sol-gather sol-wrap">
      <SolBackground variant="garden" />
      <div className="sol-gather-heading"><div className="sol-gather-note"><p className="sol-label">{t("Good things happen together")}</p><BotanicalBranch className="sol-gather-sprig" /></div><h2>{t("Come for the sip.")}<br /><em>{t("Stay for the moment.")}</em></h2></div>
      <div className="sol-gather-grid">
        <figure className="sol-wide-photo"><img src="/images/IMG_3549.jpg" alt={t("Milk being poured into matcha drinks at the Casa Sol table")} width={1000} height={1400} loading="lazy" /><figcaption>{t("Made by hand. Shared with love.")}</figcaption></figure>
        <div className="sol-gather-aside"><p>{t("From the first hello to one last sip, we bring a little warmth to the days you want to remember.")}</p><figure><img src="/images/IMG_3547.jpg" alt={t("A smiling guest holding a freshly made Casa Sol matcha")} width={1000} height={1400} loading="lazy" /><figcaption>{t("The sweetest part? Your people.")}</figcaption></figure></div>
      </div>
    </section>

    <section className="sol-menu">
      <SolWave /><SolBackground variant="coffee" />
      <div className="sol-wrap sol-menu-grid">
        <div className="sol-menu-title"><p className="sol-label">{t("Something for your sunny side")}</p><h2>{t("Freshly poured.")}<br /><em>{t("Wholeheartedly yours.")}</em></h2><p>{t("Bright matcha, Salvadoran cold brew, and fruit-forward mocktails. House-made purées and cold foams make every sip our own.")}</p><Link href="/menu" className="sol-text-link">{t("Meet the full menu ")}<ArrowRight size={16} /></Link><Sun className="sol-menu-sun" /></div>
        <div className="sol-menu-list sol-menu-preview">{menu.map(group => { const drink = group.items[group.title === "Matcha" ? 1 : 0]; return <Link href={`/menu#${group.title.toLowerCase().replace(" ", "-")}`} className={`sol-preview-drink sol-preview-${group.title.toLowerCase().replace(" ", "-")}`} key={group.title}><DrinkIllustration name={drink.name} context="home" /><div><h3>{t(group.title)}</h3><div className="sol-drink"><h4>{drink.name}</h4><p>{t(drink.description)}</p></div></div><ArrowRight size={18} aria-hidden="true" /></Link>; })}</div>
      </div>
    </section>

    <section className="sol-events sol-wrap">
      <figure className="sol-cart-photo"><img src="/images/IMG_3546.jpg" alt={t("Casa Sol’s branded menu display at a beverage gathering")} width={1000} height={1400} loading="lazy" /></figure>
      <div className="sol-events-copy"><p className="sol-label">{t("So many reasons to gather")}</p><h2>{t("Wherever you gather,")}<br /><em>{t("we’ll meet you there.")}</em></h2><p>{t("Thoughtfully styled and made personal, with a menu that feels like you. Experiences starting at $500.")}</p>
        <ul className="sol-event-list"><li><span>01</span><div><h3>{t("For your love stories")}</h3><p>{t("Weddings, bridal showers & sweet beginnings.")}</p></div></li><li><span>02</span><div><h3>{t("For your favorite people")}</h3><p>{t("Birthdays, baby showers & just-because gatherings.")}</p></div></li><li><span>03</span><div><h3>{t("For your community")}</h3><p>{t("Corporate events, brand activations, wellness days, schools, pop-ups & collaborations.")}</p></div></li></ul>
        <Link href="/packages" className="sol-text-link">{t("Explore our experiences ")}<ArrowRight size={16} /></Link>
      </div>
    </section>

    <DeliverySection />

    <section className="sol-story">
      <SolWave /><SolBackground variant="garden" />
      <div className="sol-wrap"><div className="sol-story-top"><p className="sol-label">{t("Nuestra casa, your Casa Sol")}</p><Sun className="sol-story-sun" /></div><h2>{t("Hola, we’re Casa Sol.")}<br /><em>{t("There’s room for one more.")}</em></h2>
        <div className="sol-story-bottom"><figure><img src="/images/casa-sol-founder.png" alt={t("The Casa Sol founder sharing a matcha drink")} width={1200} height={1408} loading="lazy" /><figcaption>{t("From our casa to your celebration.")}</figcaption></figure><div><img className="sol-story-logo" src="/images/casa-sol-logo-transparent.png" alt="Casa Sol Matcha & Coffee" width={420} height={290} loading="lazy" /><p className="sol-label">{t("Salvadoran roots. A DMV heart.")}</p><p>{t("Before school in El Salvador, my aunt sent me off with warm milk, a splash of coffee, and a little sugar. Café con pan taught me that a cup can be a moment of connection.")}</p><p>{t("Casa Sol carries that warmth into the DMV — with drinks made by hand, love for our community, and a hope to give back as we grow.")}</p><Link href="/about" className="sol-text-link">{t("Read our story ")}<ArrowRight size={16} /></Link></div></div>
      </div>
    </section>

    <section className="sol-planning sol-wrap"><div><p className="sol-label">{t("We’ll take care of the pouring")}</p><h2>{t("Your day,")}<br /><em>{t("a little easier.")}</em></h2><p>{t("Share your date and your ideas. We’ll work out the menu and setup, then come ready to make your people feel at home.")}</p><Link href="/book" className="sol-text-link">{t("Tell us what you’re planning ")}<ArrowRight size={16} /></Link></div><div className="sol-faq">{faqs.map(([q, a]) => <details key={q}><summary>{t(q)}<Plus size={18} /></summary><p>{t(a)}</p></details>)}</div></section>

    <section className="sol-finale"><SolBackground /><Sun className="sol-finale-sun" /><p className="sol-label">{t("A good day starts with good company")}</p><h2>{t("Let’s make a little")}<br /><em>{t("sunshine together.")}</em></h2><Link href="/book" className="sol-button">{t("Let’s plan your event ")}<ArrowRight size={17} /></Link><p className="sol-finale-note">{t("Matcha, cold brew, mocktails & a warm welcome. Always.")}</p></section>
  </SolMotion>;
}

export async function generateMetadata(): Promise<Metadata> {
  return localizeMetadata(pageMetadata);
}
