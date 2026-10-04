import { localizeMetadata } from "@/lib/i18n/metadata";
import { getTranslations, getLocale } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Link from "@/components/site-link";
import { ArrowRight, Check } from "lucide-react";
import { SolMotion } from "@/components/sol-motion";
import { SolBackground, SolWave } from "@/components/sol-background";
import { EventFaqs } from "@/components/event-faqs";
import { BookingTerms } from "@/components/booking-terms";
import { ExperienceArtwork } from "@/components/sol-illustrations";
import { packages, enhancements } from "@/data/experiences";
import { sharedOpenGraph } from "@/lib/metadata";

const description = "Explore Mini Sol, Sol Social, and Casa Sol Celebration beverage catering packages, starting at $500. Signature setup included; wooden cart available as a premium upgrade.";
const pageMetadata: Metadata = { title: "Our Experiences — Casa Sol Matcha & Coffee", description, openGraph: { ...sharedOpenGraph, title: "Our Experiences — Casa Sol Matcha & Coffee", description } };

export default async function PackagesPage() {
  const t = await getTranslations();
  return <SolMotion className="sol-subpage sol-packages-page">
    <section className="sol-page-header relative isolate text-center"><SolBackground /><div className="sol-wrap"><p className="eyebrow">{t("A gathering with your name on it")}</p><h1 className="mt-4">{t("Your people.")}<br /><em>{t("Your Casa Sol.")}</em></h1><p className="sol-page-intro">{t("Beverage catering for celebrations, brands & gatherings. Pick a starting point. We’ll make it personal.")}</p><a href="#experiences" className="sol-text-link">{t("Find your experience ")}<ArrowRight size={16} /></a></div></section>
    <section id="experiences" className="sol-experiences sol-page-panel"><SolWave /><SolBackground variant="garden" /><div className="sol-wrap">
      <div className="sol-section-heading"><p className="sol-label">{t("Three sunny starting points")}</p><p>{t("Every experience includes ")}<strong>{t("2 hours of active beverage service.")}</strong></p></div>
      <div className="sol-package-grid">{packages.map((item, i) => <article key={item.id} className={`sol-package sol-package-${item.id}`}>
        <div className="sol-package-mark"><span className="sol-label">{t(["Intimate gatherings", "Good company", "Big celebrations"][i])}</span><ExperienceArtwork tier={i} /></div>
        <h2>{item.name}</h2><p className="sol-package-description">{t(item.description)}</p>
        <div className="sol-package-summary"><p className="sol-package-guests">{t(item.guests)}</p><p className="sol-price"><span>{t("Starting at")}</span><strong>${item.price}</strong></p></div>
        <ul aria-label={t(`${item.name} includes`, `${item.name} incluye`)}><li><Check size={14} aria-hidden="true" /><span>{item.flavors} {t(item.flavors === 1 ? "matcha flavor" : "matcha flavors", item.flavors === 1 ? "sabor de matcha" : "sabores de matcha")}</span></li><li><Check size={14} aria-hidden="true" />{t("Signature cold brew")}</li><li><Check size={14} aria-hidden="true" />{t("2 hours of beverage service")}</li></ul>
        <Link href={`/book?package=${item.id}`} className="sol-package-cta">{t("Choose ")}{item.name} <ArrowRight size={15} /></Link>
      </article>)}</div>
      <div className="sol-package-included"><p className="sol-label">{t("Included in every package")}</p><p>{t("Signature Casa Sol branded table setup, menu display, cups and serving supplies, plus setup & breakdown.")}</p></div>
      <div className="sol-pricing-notes"><p><strong>{t("31+ guests:")}</strong>{t(" a required event assistant adds ")}<strong>$120</strong>{t(". Mileage applies to every event.")}</p><p>{t("Guest ranges refer to event attendance, not a set number of drinks or unlimited refills. Exact serving quantities are confirmed in your custom quote. Service time covers active beverage service; setup and breakdown are separate.")}</p></div>
      <div className="sol-custom-quote"><div><p className="eyebrow">{t("Planning something a little bigger?")}</p><p>{t("More than 50 guests, large celebrations, corporate activations, and custom experiences are available by personalized quote.")}</p></div><Link href="/book" className="sol-text-link">{t("Let’s dream it up ")}<ArrowRight size={16} /></Link></div>
    </div></section>
    <section className="sol-setup sol-page-panel"><SolBackground variant="coffee" /><div className="sol-wrap sol-setup-grid"><figure><img src="/images/IMG_3549.jpg" alt={t("Drinks prepared by hand at the Casa Sol beverage station")} width={1000} height={1400} loading="lazy" /><figcaption className="font-script">{t("set with care, served with love")}</figcaption></figure><div><p className="sol-label">{t("The setup, made yours")}</p><h2>{t("Our signature warmth.")}<br /><em>{t("A little extra sunshine.")}</em></h2><div className="sol-setup-option"><p className="sol-label">{t("Included")}</p><h3>{t("Signature Casa Sol Setup")}</h3><p>{t("Our branded table and drink station, menu display, and serving essentials. A thoughtful home for every handcrafted sip.")}</p></div><div className="sol-setup-option"><p className="sol-label">{t("Premium add-on")}</p><h3>{t("The Casa Sol Cart Experience")}</h3><p>{t("Want the full Casa Sol experience? Upgrade with our handcrafted wooden Casa Sol cart — a beautiful, photo-ready addition to your celebration.")}</p><p className="sol-small-note">{t("Pricing varies with event location and transportation requirements. Ask about the cart when you inquire.")}</p></div><Link href="/book?setup=cart" className="sol-text-link">{t("Tell me about the cart ")}<ArrowRight size={16} /></Link></div></div></section>
    <section className="sol-enhancements sol-wrap"><div className="sol-section-heading"><div><p className="eyebrow">{t("A few personal touches")}</p><h2>{t("Enhance your experience.")}</h2></div><p>{t("Little details that make the gathering feel like you.")}</p></div><div className="sol-enhancement-list">{enhancements.map((item) => <article key={item.title}><div><h3>{t(item.title)}</h3><p>{t(item.description)}</p></div><span>{t(item.price)}</span></article>)}</div><BookingTerms language={await getLocale()} /></section>
    <EventFaqs />
    <section className="sol-quiet-cta sol-wrap"><div><p className="eyebrow">{t("Let’s make it yours")}</p><h2>{t("A little sunshine")}<br /><em>{t("starts here.")}</em></h2></div><div><p>{t("Share your date and a little about your gathering. We’ll be in touch within 2–3 business days with availability and next steps.")}</p><Link href="/book" className="sol-button mt-6">{t("Let’s plan your event ")}<ArrowRight size={16} /></Link></div></section>
  </SolMotion>;
}

export async function generateMetadata(): Promise<Metadata> {
  return localizeMetadata(pageMetadata);
}
