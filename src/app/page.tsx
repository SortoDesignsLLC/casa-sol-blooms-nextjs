import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/metadata";
export const metadata: Metadata = {
  "title": "Casa Sol — Luxury Matcha & Coffee Cart for DMV Events",
  "description": "Casa Sol is a boutique matcha and cold brew cart serving weddings, showers, birthdays and pop-ups across the DMV. Request your date today.",
  "openGraph": {
    ...sharedOpenGraph,
    "title": "Casa Sol — Luxury Matcha & Coffee Cart for DMV Events",
    "description": "Casa Sol is a boutique matcha and cold brew cart serving weddings, showers, birthdays and pop-ups across the DMV. Request your date today."
  }
};
import Link from "next/link";
import {
  Heart,
  ArrowRight,
  Leaf,
  Star,
  Users,
  CalendarCheck,
  Quote,
  CupSoda,
  Store,
  Cherry,
  Citrus,
  Flower2,
  IceCreamCone,
} from "lucide-react";
const logo = "/images/casa-sol-logo-transparent.png";
const hero = "/images/hero.jpg";
const photoPour = "/images/IMG_3549.jpg";
const photoSunshine = "/images/IMG_3550.jpg";
const photoMatcha = "/images/IMG_3547.jpg";
const photoFoam = "/images/IMG_3545.jpg";
const photoShake = "/images/IMG_3544.jpg";
const founderPhoto = "/images/casa-sol-founder.png";
import { SectionDecor } from "@/components/section-decor";
import { menu } from "@/data/menu";



const steps = [
  {
    icon: CupSoda,
    title: "Choose your vibe",
    text: "Tell us your date, drinks and the little details you love.",
  },
  {
    icon: Store,
    title: "We come to you",
    text: "We arrive early, set up and style the cart for your space.",
  },
  {
    icon: Heart,
    title: "Sip & celebrate",
    text: "Fresh matcha and cold brew, poured all event long.",
  },
];

const menuIcons = [Cherry, Citrus, Flower2, IceCreamCone, CupSoda];

const services = [
  {
    icon: Heart,
    photo: photoSunshine,
    title: "Weddings & Showers",
    text: "A soft, floral cart moment your guests will photograph all day.",
    points: ["Styled cart + florals", "Custom drink names", "Signature couple's sip"],
  },
  {
    icon: Users,
    photo: photoMatcha,
    title: "Birthdays & Private Parties",
    text: "Cozy, colorful and made for the people you love most.",
    points: ["Matcha + cold brew bar", "Kid-friendly options", "Flexible hours"],
  },
  {
    icon: Leaf,
    photo: photoPour,
    title: "Corporate & Pop-Ups",
    text: "An easy way to treat your team, clients or shoppers.",
    points: ["Branded cups & signage", "Fast-moving service", "Indoor or outdoor"],
  },
];

const testimonials = [
  {
    quote:
      "The cart was the prettiest thing at our wedding and the strawberry matcha was gone in an hour. Our guests are still talking about it.",
    name: "Ana & Miguel",
    event: "Wedding · Silver Spring, MD",
  },
  {
    quote:
      "So warm, so professional. She set up early, styled everything beautifully and made my baby shower feel special.",
    name: "Jasmine R.",
    event: "Baby Shower · Arlington, VA",
  },
  {
    quote:
      "We booked Casa Sol for a client pop-up and it was the best decision. Gorgeous setup and honestly the best cold brew in the DMV.",
    name: "Danielle P.",
    event: "Brand Pop-Up · Washington, DC",
  },
];

const faqs = [
  {
    q: "How far in advance should I book?",
    a: "Two to four weeks is ideal, but reach out anytime — we'll always check the date for you.",
  },
  {
    q: "Does an inquiry hold my date?",
    a: "Not yet. Your date is secured once we approve the event and receive the 50% deposit. The balance is due 7 days before.",
  },
  {
    q: "Where do you travel?",
    a: "All across the DMV — Maryland, DC and Northern Virginia. Ask us about anything a little further out.",
  },
  {
    q: "What do you need on site?",
    a: "A flat space for the cart and access to power. We bring everything else, including cups, ice and all the pretty details.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  sub,
  tone = "light",
  titleClass = "",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  tone?: "light" | "dark";
  titleClass?: string;
}) {
  return (
    <div className="text-center">
      <p className={tone === "dark" ? "eyebrow text-blush-soft" : "eyebrow"}>
        {eyebrow}
      </p>
      <h2 className={`display-title mt-2 text-[2.15rem] sm:text-[3.1rem] ${titleClass}`}>
        {title}
      </h2>
      <div className="gold-rule mx-auto mt-5" />
      {sub ? (
        <p
          className={`mx-auto mt-5 max-w-md text-sm leading-relaxed ${
            tone === "dark" ? "text-surface-deep-foreground/75" : "text-muted-foreground"
          }`}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-surface-cream">
        <img
          src={hero}
          alt="Casa Sol matcha cart styled with blush florals at an outdoor event"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-surface-cream/90 backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-cream via-surface-cream/70 to-surface-sand" />
        <SectionDecor variant="a" />

        <div className="home-hero-content relative mx-auto max-w-3xl px-5 pt-20 pb-6 text-center sm:pt-28 sm:pb-8">
          <img
            src={logo}
            alt="Casa Sol Matcha & Coffee"
            width={420}
            height={110}
            className="mx-auto h-40 w-auto sm:h-56"
          />
          <h1 className="mt-7 text-4xl leading-tight sm:text-6xl">
            A matcha &amp; coffee cart made for your celebration
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
            Handcrafted drinks with Salvadoran roots, served from a softly styled cart anywhere in
            the DMV.
          </p>
          <p className="font-script mt-4 text-4xl text-primary">love is brewing</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-sm tracking-wide text-primary-foreground shadow-luxe transition-transform hover:-translate-y-0.5"
            >
              Book Casa Sol <ArrowRight size={15} />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-8 py-4 text-sm tracking-wide transition-colors hover:bg-card"
            >
              See the menu
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <Star size={12} className="text-primary" fill="currentColor" /> Loved across the DMV
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Leaf size={12} className="text-primary" /> Made fresh with oat milk
            </li>
            <li className="inline-flex items-center gap-1.5">
              <CalendarCheck size={12} className="text-primary" /> Fully styled setup included
            </li>
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-surface-sand pt-0 pb-14 sm:pt-0 sm:pb-14">
        <div className="mx-auto grid max-w-5xl gap-4 px-5 sm:grid-cols-3">
          {[
            { src: photoPour, alt: "Pouring oat milk into an iced Casa Sol matcha at an event" },
            { src: photoMatcha, alt: "A guest holding a Casa Sol strawberry matcha" },
            { src: photoFoam, alt: "Cold foam poured over a Casa Sol iced drink" },
          ].map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="h-72 w-full rounded-[1.75rem] object-cover shadow-luxe transition-transform duration-500 hover:scale-[1.02] sm:h-80"
            />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative isolate bg-surface-sage py-20">
        <SectionDecor variant="b" />
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading eyebrow="How it works" title="Three easy sips" />
          <ol className="mt-10 grid gap-5 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="rounded-[1.75rem] border border-border/70 bg-card p-8 text-center shadow-luxe"
              >
                <div className="glow-sage relative isolate mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent">
                  <s.icon size={26} className="text-primary" />
                </div>
                <p className="eyebrow mt-4">Step {i + 1}</p>
                <h3 className="mt-1 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section className="relative isolate bg-surface-blush py-20">
        <SectionDecor variant="c" />
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading
            eyebrow="What we do"
            title="Every celebration, softly served"
            sub="Each event is quoted just for you, based on your guest count, hours and drink menu."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="flex flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-luxe"
              >
                <img
                  src={s.photo}
                  alt={s.title}
                  loading="lazy"
                  className="h-52 w-full object-cover"
                />
                <div className="flex flex-col p-8">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary">
                  <s.icon size={20} className="text-sage" />
                </div>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Heart
                        size={11}
                        className="mt-1.5 shrink-0 text-primary"
                        fill="currentColor"
                      />
                      <span className="text-muted-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Menu preview — deep luxe */}
      <section className="relative isolate overflow-hidden bg-surface-deep py-20 text-surface-deep-foreground">
        <SectionDecor variant="d" />
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading eyebrow="On the menu" title="Made fresh, poured with love" tone="dark" titleClass="text-foreground font-bold" />
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {menu.map((section) => (
                <div
                  key={section.title}
                  className="rounded-[1.75rem] border border-sage/20 bg-cream/70 p-7 shadow-luxe backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-soft/25">
                      <Leaf size={16} className="text-primary" />
                    </span>
                    <h3 className="text-2xl">{section.title}</h3>
                  </div>
                  <div className="gold-rule mt-4" />
                  <ul className="mt-5 space-y-5">
                    {section.items.map((item, i) => {
                      const ItemIcon = menuIcons[i % menuIcons.length]!;
                      return (
                        <li key={item.name} className="flex gap-3 text-sm">
                          <ItemIcon
                            size={18}
                            strokeWidth={1.5}
                            className="mt-1 shrink-0 text-primary/80"
                          />
                          <span>
                            <span className="font-display text-xl font-bold text-primary">
                              {item.name}
                            </span>
                            <span className="block text-surface-deep-foreground/75">
                              {item.description}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-24">
              <img
                src={photoSunshine}
                alt="Casa Sol iced matcha with a sunshine label"
                loading="lazy"
                className="col-span-2 h-56 w-full rounded-[1.75rem] object-cover shadow-luxe"
              />
              <img
                src={photoShake}
                alt="Matcha being poured over ice"
                loading="lazy"
                className="h-40 w-full rounded-[1.5rem] object-cover shadow-luxe"
              />
              <img
                src={photoFoam}
                alt="Cold foam poured into a Casa Sol drink"
                loading="lazy"
                className="h-40 w-full rounded-[1.5rem] object-cover shadow-luxe"
              />
              <p className="col-span-2 rounded-[1.5rem] border border-sage/20 bg-cream/70 px-5 py-4 text-center text-sm text-surface-deep-foreground/85">
                All matcha is made with oat milk · seasonal flavors all year long
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-blush-soft px-8 py-3.5 text-sm font-medium text-foreground shadow-luxe transition-transform hover:scale-[1.03]"
            >
              See the full menu <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="relative isolate bg-surface-sand py-20">
        <SectionDecor variant="a" />
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading eyebrow="Kind words" title="Loved by our clients" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex h-full flex-col rounded-[1.75rem] border border-border/70 bg-card p-8 shadow-luxe"
              >
                <Quote size={22} className="text-primary" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5">
                  <p className="font-display text-lg">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.event}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="relative isolate bg-surface-cream py-20">
        <SectionDecor variant="b" />
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid items-center gap-8 rounded-[2rem] border border-border/70 bg-card p-6 shadow-luxe sm:grid-cols-2 sm:p-10">
            <div className="grid grid-cols-2 gap-3">
              <img
                src={photoShake}
                alt="Shaking fresh matcha into an iced Casa Sol drink"
                loading="lazy"
                className="col-span-2 h-56 w-full rounded-[1.5rem] object-cover sm:h-64"
              />
              <img
                src={photoSunshine}
                alt="Casa Sol cup with a 'here's a little sunshine' label"
                loading="lazy"
                className="h-36 w-full rounded-2xl object-cover sm:h-40"
              />
              <img
                src={founderPhoto}
                alt="The Casa Sol founder holding a handcrafted matcha drink"
                loading="lazy"
                className="h-36 w-full rounded-2xl object-cover sm:h-40"
              />
            </div>

            <div>
              <p className="eyebrow">Our story</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">Hola, we're Casa Sol</h2>
              <div className="gold-rule mt-5" />
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Casa Sol started as a little dream: bring people together over something handmade
                and beautiful. Rooted in our Salvadoran family and raised in the DMV, we pour every
                drink the way we'd serve it at home — with care, color and a whole lot of love.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-primary"
              >
                Read our story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-sage py-20">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHeading eyebrow="Good to know" title="Questions, answered" />
          <dl className="mt-9 space-y-3">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-luxe"
              >
                <dt className="font-display text-xl">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface-blush py-20">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 className="text-3xl sm:text-4xl">Perfect for</h2>
          <div className="gold-rule mx-auto mt-5" />
          <ul className="mt-7 flex flex-wrap justify-center gap-2.5">
            {[
              "Weddings",
              "Corporate Events",
              "Birthdays",
              "Bridal & Baby Showers",
              "Pop-Ups",
              "Private Parties",
            ].map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-soft"
              >
                <Heart size={11} fill="currentColor" className="text-primary" /> {t}
              </li>
            ))}
          </ul>
          <Link
            href="/book"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-sm tracking-wide text-primary-foreground shadow-luxe transition-transform hover:-translate-y-0.5"
          >
            Book Casa Sol <ArrowRight size={15} />
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">
            Inquire 2–4 weeks ahead · dates are secured with a 50% deposit
          </p>
        </div>
      </section>
    </div>
  );
}
