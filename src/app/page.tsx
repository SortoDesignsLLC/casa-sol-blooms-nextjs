import { localizeMetadata } from "@/lib/i18n/metadata";
import { getTranslations } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Link from "@/components/site-link";
import Image from "next/image";
import { ArrowRight, Flower2, UsersRound, Truck, Instagram } from "lucide-react";
import { sharedOpenGraph } from "@/lib/metadata";
import { SunMedallion as Sun } from "@/components/sol-illustrations";
import { SolMotion } from "@/components/sol-motion";
import { contactEmail } from "@/data/experiences";
import styles from "./home.module.css";

const pageMetadata: Metadata = {
  title: "Casa Sol — Matcha & Coffee for Moments Together",
  description: "Casa Sol brings handcrafted matcha, cold brew, mocktails, and warm hospitality to celebrations across the DMV. Explore beverage catering and fresh drink delivery.",
  openGraph: { ...sharedOpenGraph, title: "Casa Sol — Matcha & Coffee for Moments Together" },
};

const services = [
  { title: "Private events", description: "Weddings, birthdays, showers, and your favorite reasons to celebrate.", href: "/packages", action: "Explore experiences", icon: Flower2 },
  { title: "Corporate & community", description: "Thoughtful sips for team gatherings, pop-ups, and bringing people together.", href: "/book", action: "Plan a gathering", icon: UsersRound },
  { title: "Delivery", description: "Your favorite Casa Sol drinks, freshly made and brought to your door.", href: "/delivery", action: "Explore delivery", id: "delivery", icon: Truck },
];

const moments = [
  { src: "/images/generated/casa-sol-sunny-sips.png", alt: "A styled Casa Sol strawberry matcha on blush linen", caption: "A little sunshine" },
  { src: "/images/IMG_3549.jpg", alt: "Milk being poured into matcha drinks at the Casa Sol table", caption: "Made with love" },
  { src: "/images/IMG_3547.jpg", alt: "A smiling guest holding a freshly made Casa Sol matcha", caption: "Good company" },
  { src: "/images/IMG_3546.jpg", alt: "Casa Sol’s branded menu display at a beverage gathering", caption: "Set with care" },
];

export default async function Home() {
  const t = await getTranslations();
  return <SolMotion className={styles.home}>
    <section id="home-hero" className={styles.hero} aria-labelledby="hero-title">
      <Image className={styles.heroBotanical} src="/images/generated/casa-sol-botanical.png" alt="" width={1218} height={1292} sizes="(max-width: 700px) 160px, 360px" aria-hidden="true" />
      <div className={styles.heroCopy}>
        <Link href="/" aria-label={t("Casa Sol home")} className={styles.logoLink}><img className={styles.logo} src="/images/casa-sol-logo-transparent.png" alt="Casa Sol Matcha & Coffee" width={420} height={290} /></Link>
        <h1 id="hero-title">{t("A little sunshine,")}<br /><em>{t("served wherever you gather.")}</em></h1>
        <p className={styles.intro}>{t("Handcrafted matcha, cold brew & mocktails. A mobile beverage experience for moments together across the DMV.")}</p>
        <div className={styles.actions}>
          <Link href="/book" className={styles.button}>{t("Book Us")}<ArrowRight size={17} aria-hidden="true" /></Link>
          <Link href="/menu" className={styles.menuLink}>{t("Explore the menu")}<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <figure className={styles.heroArt}>
        <span className={styles.sunHalo} aria-hidden="true" />
        <Image className={styles.drinkCutouts} src="/images/generated/casa-sol-drink-cutouts.png" alt={t("Strawberry and pineapple matcha with pink cold foam in Casa Sol cups")} width={1217} height={1293} sizes="(max-width: 700px) 280px, (max-width: 1100px) 48vw, 550px" loading="eager" fetchPriority="high" />
        <figcaption className={styles.heroNote}>{t("love is brewing")} <span aria-hidden="true">♡</span></figcaption>
      </figure>
      <p className={styles.heroFootnote} lang="es">Un poquito de sol para todos.</p>
    </section>

    <section className={`sol-wrap ${styles.introduction}`} aria-labelledby="hello-title">
      <figure className={styles.founderPhoto}>
        <Image src="/images/casa-sol-founder.png" alt={t("The Casa Sol founder sharing a matcha drink")} width={1200} height={1408} sizes="(max-width: 700px) 240px, 310px" />
        <figcaption lang="es">Con mucho amor, Kenia</figcaption>
      </figure>
      <div className={styles.introductionCopy}>
        <p className="sol-label">{t("Salvadoran roots. A DMV heart.")}</p>
        <h2 id="hello-title"><span className={styles.script}>Hola,</span><br />{t("we’re Casa Sol.")}</h2>
        <p>{t("Rooted in Salvadoran traditions and a love for our community, we bring people together over handcrafted drinks and a warm welcome. From our casa to your celebration.")}</p>
        <Link href="/about" className="sol-text-link">{t("Read our story")}<ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>

    <section className={styles.services} aria-labelledby="services-title">
      <div className="sol-wrap">
        <div className={styles.servicesHeading}><p className="sol-label">{t("So many reasons to gather")}</p>
        <h2 id="services-title">{t("What we do")}</h2></div>
        <div className={styles.serviceList}>{services.map(service => <article key={service.title} id={service.id}>
          <service.icon size={30} strokeWidth={1.2} className={styles.serviceIcon} aria-hidden="true" />
          <h3>{t(service.title)}</h3>
          <p>{t(service.description)}</p>
          <Link href={service.href} className="sol-text-link">{t(service.action)}<ArrowRight size={16} aria-hidden="true" /></Link>
        </article>)}</div>
      </div>
    </section>

    <section className={`sol-wrap ${styles.gallery}`} aria-labelledby="moments-title">
      <div className={styles.galleryHeading}><p className="sol-label">{t("A few Casa Sol moments")}</p><h2 id="moments-title">{t("Made to be shared.")}</h2></div>
      <div className={styles.photos}>{moments.map(moment => <figure key={moment.src}>
        <div className={styles.photoFrame}><Image src={moment.src} alt={t(moment.alt)} fill sizes="(max-width: 700px) 44vw, (max-width: 1300px) 22vw, 280px" /></div>
        <figcaption>{t(moment.caption)}</figcaption>
      </figure>)}</div>
    </section>

    <section className={styles.contact} aria-labelledby="contact-title">
      <Image className={styles.contactBotanical} src="/images/generated/casa-sol-botanical.png" alt="" width={1218} height={1292} sizes="(max-width: 700px) 160px, 320px" aria-hidden="true" />
      <Sun className={styles.contactSun} />
      <p className="sol-label">{t("Your people. Our little touch of sunshine.")}</p>
      <h2 id="contact-title">{t("Let’s make a little")}<br /><em>{t("sunshine together.")}</em></h2>
      <Link href="/book" className={styles.button}>{t("Book Us")}<ArrowRight size={17} aria-hidden="true" /></Link>
      <div className={styles.contactLinks}>
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        <a href="https://www.instagram.com/casasolmatcha/" target="_blank" rel="noopener noreferrer"><Instagram size={15} aria-hidden="true" />@casasolmatcha</a>
      </div>
      <p className={styles.welcome} lang="es">Un poquito de sol para todos.</p>
    </section>
  </SolMotion>;
}

export async function generateMetadata(): Promise<Metadata> {
  return localizeMetadata(pageMetadata);
}
