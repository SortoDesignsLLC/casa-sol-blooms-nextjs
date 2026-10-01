import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SolMotion } from "@/components/sol-motion";
import { SolBackground, SolWave } from "@/components/sol-background";
import { BookingTerms } from "@/components/booking-terms";
import { ExperienceArtwork } from "@/components/sol-illustrations";
import { packages, enhancements } from "@/data/experiences";
import { sharedOpenGraph } from "@/lib/metadata";

const description = "Explore Mini Sol, Sol Social, and Casa Sol Celebration beverage catering packages, starting at $500. Signature setup included; wooden cart available as a premium upgrade.";
export const metadata: Metadata = { title: "Our Experiences — Casa Sol Matcha & Coffee", description, openGraph: { ...sharedOpenGraph, title: "Our Experiences — Casa Sol Matcha & Coffee", description } };

export default function PackagesPage() {
  return <SolMotion className="sol-subpage sol-packages-page">
    <section className="sol-page-header relative isolate text-center"><SolBackground /><div className="sol-wrap"><p className="eyebrow">A gathering with your name on it</p><h1 className="mt-4">Your people.<br /><em>Your Casa Sol.</em></h1><p className="sol-page-intro">Beverage catering for celebrations, brands &amp; gatherings. Pick a starting point. We’ll make it personal.</p><a href="#experiences" className="sol-text-link">Find your experience <ArrowRight size={16} /></a></div></section>
    <section id="experiences" className="sol-experiences sol-page-panel"><SolWave /><SolBackground variant="garden" /><div className="sol-wrap">
      <div className="sol-section-heading"><p className="sol-label">Three sunny starting points</p><p>Every experience includes <strong>2 hours of active beverage service.</strong></p></div>
      <div className="sol-package-grid">{packages.map((item, i) => <article key={item.id} className={`sol-package sol-package-${item.id}`}>
        <div className="sol-package-mark"><span className="sol-label">{["Intimate gatherings", "Good company", "Big celebrations"][i]}</span><ExperienceArtwork tier={i} /></div>
        <h2>{item.name}</h2><p className="sol-package-description">{item.description}</p>
        <div className="sol-package-summary"><p className="sol-package-guests">{item.guests}</p><p className="sol-price"><span>Starting at</span><strong>${item.price}</strong></p></div>
        <ul aria-label={`${item.name} includes`}><li><Check size={14} aria-hidden="true" /><span>{item.flavors} matcha flavor{item.flavors > 1 ? "s" : ""}</span></li><li><Check size={14} aria-hidden="true" />Signature cold brew</li><li><Check size={14} aria-hidden="true" />2 hours of beverage service</li></ul>
        <Link href={`/book?package=${item.id}#inquiry`} className="sol-package-cta">Choose {item.name} <ArrowRight size={15} /></Link>
      </article>)}</div>
      <div className="sol-package-included"><p className="sol-label">Included in every package</p><p>Signature Casa Sol branded table setup, menu display, cups and serving supplies, plus setup &amp; breakdown.</p></div>
      <div className="sol-pricing-notes"><p><strong>31+ guests:</strong> a required event assistant adds <strong>$120</strong>. Mileage applies to every event.</p><p>Guest ranges refer to event attendance, not a set number of drinks or unlimited refills. Exact serving quantities are confirmed in your custom quote. Service time covers active beverage service; setup and breakdown are separate.</p></div>
      <div className="sol-custom-quote"><div><p className="eyebrow">Planning something a little bigger?</p><p>More than 50 guests, large celebrations, corporate activations, and custom experiences are available by personalized quote.</p></div><Link href="/book#inquiry" className="sol-text-link">Let’s dream it up <ArrowRight size={16} /></Link></div>
    </div></section>
    <section className="sol-setup sol-page-panel"><SolBackground variant="coffee" /><div className="sol-wrap sol-setup-grid"><figure><img src="/images/IMG_3549.jpg" alt="Drinks prepared by hand at the Casa Sol beverage station" width={1000} height={1400} loading="lazy" /><figcaption className="font-script">set with care, served with love</figcaption></figure><div><p className="sol-label">The setup, made yours</p><h2>Our signature warmth.<br /><em>A little extra sunshine.</em></h2><div className="sol-setup-option"><p className="sol-label">Included</p><h3>Signature Casa Sol Setup</h3><p>Our branded table and drink station, menu display, and serving essentials. A thoughtful home for every handcrafted sip.</p></div><div className="sol-setup-option"><p className="sol-label">Premium add-on</p><h3>The Casa Sol Cart Experience</h3><p>Want the full Casa Sol experience? Upgrade with our handcrafted wooden Casa Sol cart — a beautiful, photo-ready addition to your celebration.</p><p className="sol-small-note">Pricing varies with event location and transportation requirements. Ask about the cart when you inquire.</p></div><Link href="/book?setup=cart#inquiry" className="sol-text-link">Tell me about the cart <ArrowRight size={16} /></Link></div></div></section>
    <section className="sol-enhancements sol-wrap"><div className="sol-section-heading"><div><p className="eyebrow">A few personal touches</p><h2>Enhance your experience.</h2></div><p>Little details that make the gathering feel like you.</p></div><div className="sol-enhancement-list">{enhancements.map((item) => <article key={item.title}><div><h3>{item.title}</h3><p>{item.description}</p></div><span>{item.price}</span></article>)}</div><BookingTerms /></section>
    <section className="sol-quiet-cta sol-wrap"><div><p className="eyebrow">Let’s make it yours</p><h2>A little sunshine<br /><em>starts here.</em></h2></div><div><p>Share your date and a little about your gathering. We’ll be in touch within 2–3 business days with availability and next steps.</p><Link href="/book" className="sol-button mt-6">Let’s plan your event <ArrowRight size={16} /></Link></div></section>
  </SolMotion>;
}
