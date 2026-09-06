import { SolMotion } from "@/components/sol-motion";
import { SolBackground, SolWave } from "@/components/sol-background";
import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/metadata";
export const metadata: Metadata = {
  "title": "Menu — Casa Sol Matcha & Coffee",
  "description": "Our matcha and cold brew menu: Fresa Fresca, Garden Glow, Tropical Bloom and Nube de Caramelo, plus seasonal flavors.",
  "openGraph": {
    ...sharedOpenGraph,
    "title": "Menu — Casa Sol Matcha & Coffee",
    "description": "Our matcha and cold brew menu: Fresa Fresca, Garden Glow, Tropical Bloom and Nube de Caramelo, plus seasonal flavors."
  }
};
import Link from "next/link";
import { Leaf, Coffee, Cherry, Citrus, Sun, CupSoda, Flower2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
const photoMatcha = "/images/IMG_3547.jpg";
const photoPour = "/images/IMG_3549.jpg";
const photoMenu = "/images/IMG_3546.jpg";
const photoFoam = "/images/IMG_3545.jpg";
import { menu, seasonal } from "@/data/menu";



// A different little icon for every drink.
const drinkIcons: Record<string, LucideIcon> = {
  "Fresa Fresca": Cherry,
  "Garden Glow": Citrus,
  "Tropical Bloom": Flower2,
  "Nube de Caramelo": CupSoda,
};

export default function MenuPage() {
  return (
    <SolMotion className="sol-subpage">
      <section className="sol-page-header relative isolate bg-surface-cream py-16 text-center">
        <SolBackground variant="coffee" />
        <div className="mx-auto max-w-5xl px-5">
          <p className="eyebrow">Sip Sip Hooray</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Our Menu</h1>
          <div className="gold-rule mx-auto mt-5" />
          <p className="mx-auto mt-5 max-w-md text-muted-foreground">
            Small batch, made fresh at your event. All matcha is made with oat milk.
          </p>
        </div>
      </section>

      <div className="sol-page-menu sol-page-panel bg-surface-sage py-16"><SolWave /><SolBackground variant="coffee" />
      <div className="mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-2">
        {menu.map((section) => (
          <section
            key={section.title}
            className="rounded-[1.75rem] border border-border/70 bg-card p-8 shadow-luxe"
          >
            <div className="flex items-center gap-3">
              {section.title === "Matcha" ? (
                <Leaf size={20} className="text-secondary-foreground" />
              ) : (
                <Coffee size={20} className="text-primary" />
              )}
              <h2 className="text-2xl">{section.title}</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{section.note}</p>

            <ul className="mt-6 space-y-5">
              {section.items.map((item) => {
                const Icon = drinkIcons[item.name] ?? Sun;
                return (
                  <li
                    key={item.name}
                    className="border-b border-border/60 pb-5 last:border-0 last:pb-0"
                  >
                    <p className="flex items-center gap-2.5">
                      <span className="glow-sage relative isolate grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent">
                        <Icon size={17} className="text-primary" />
                      </span>
                      <span className="font-display text-xl font-bold text-primary">
                        {item.name}
                      </span>
                    </p>
                    <p className="mt-1 pl-[3.1rem] text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      </div>

      <div className="sol-page-panel sol-page-gallery bg-surface-sand py-16"><SolBackground variant="garden" />
      <div className="mx-auto grid max-w-5xl gap-4 px-5 sm:grid-cols-2">
        <img
          src={photoMatcha}
          alt="A guest holding a Casa Sol strawberry matcha"
          loading="lazy"
          className="h-64 w-full rounded-[1.75rem] object-cover shadow-luxe"
        />
        <img
          src={photoFoam}
          alt="Cold foam poured over a Casa Sol iced drink"
          loading="lazy"
          className="h-64 w-full rounded-[1.75rem] object-cover shadow-luxe"
        />
        <img
          src={photoMenu}
          alt="Printed Casa Sol event menus"
          loading="lazy"
          className="h-64 w-full rounded-[1.75rem] object-cover shadow-luxe"
        />
        <img
          src={photoPour}
          alt="Pouring oat milk into iced matcha at a Casa Sol pop-up"
          loading="lazy"
          className="h-64 w-full rounded-[1.75rem] object-cover shadow-luxe"
        />
      </div>

      </div>

      <section className="sol-page-panel sol-page-special bg-surface-blush py-20 text-center"><SolWave /><SolBackground />
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="mt-3 text-2xl">Seasonal &amp; Specialty</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          We rotate limited flavors throughout the year — and we love creating a custom drink named
          just for your event.
        </p>
        {seasonal.length > 0 && (
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {seasonal.map((s) => (
              <li
                key={s.name}
                className="rounded-full bg-background px-4 py-2 text-sm text-foreground"
              >
                {s.name}
                <span className="text-muted-foreground"> · {s.description}</span>
              </li>
            ))}
          </ul>
        )}
        <Link
          href="/book"
          className="sol-button mt-7"
        >
          Book Casa Sol
        </Link>
      </div>
      </section>
    </SolMotion>
  );
}
