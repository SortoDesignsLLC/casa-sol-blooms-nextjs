import { localizeMetadata } from "@/lib/i18n/metadata";
import { getTranslations } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Link from "@/components/site-link";
import { ArrowRight } from "lucide-react";
import { SolMotion } from "@/components/sol-motion";
import { sharedOpenGraph } from "@/lib/metadata";
import { DrinkIllustration } from "@/components/sol-illustrations";
import { SeasonalFeature } from "@/components/seasonal-feature";
import { menu, seasonal } from "@/data/menu";

const description = "Explore Casa Sol’s handcrafted matcha, Salvadoran cold brew, fruit mocktails, and fall seasonal flavors. Made with house-made purées and cold foams.";
const pageMetadata: Metadata = {
  title: "Our Menu — Casa Sol Matcha & Coffee", description,
  openGraph: { ...sharedOpenGraph, title: "Our Menu — Casa Sol Matcha & Coffee", description },
};
const categoryNotes = ["Earthy, creamy, a little bright.", "Salvadoran roots. Cloud-soft finish.", "All the celebration. Zero alcohol."];

export default async function MenuPage() {
  const t = await getTranslations();
  return <SolMotion className="sol-subpage sol-menu-page">
    <nav aria-label={t("Menu categories")} className="sol-menu-navigation"><div className="sol-wrap"><p className="sol-label">{t("Made by hand. Picked by you.")}</p><div className="sol-menu-jump">
      {seasonal.length > 0 && <a href="#seasonal" className="sol-seasonal-jump">{t("Fall specials ")}<span>{t("Here now")}</span></a>}
      {menu.map((group) => <a key={group.title} href={`#${group.title.toLowerCase().replace(" ", "-")}`}>{t(group.title)}</a>)}
    </div></div></nav>
    <SeasonalFeature />
    {!seasonal.length && <header className="sol-page-header sol-wrap text-center"><h1>{t("Made by hand.")}<br /><em>{t("Picked by you.")}</em></h1></header>}
    <div className="sol-menu-collection">
      {menu.map((group, index) => <section id={group.title.toLowerCase().replace(" ", "-")} key={group.title} className={`sol-tasting-section sol-tasting-${group.title.toLowerCase().replace(" ", "-")}`}>
        <div className="sol-wrap sol-tasting-layout">
          <div className="sol-tasting-heading"><p className="sol-label">0{index + 1}{t(" / The Casa Sol menu")}</p><h2>{t(group.title)}</h2><p className="sol-tasting-mood">{t(categoryNotes[index])}</p><p className="sol-category-note">{t(group.note)}</p>{index === 1 && <figure className="sol-coffee-photo"><img src="/images/IMG_3545.jpg" alt={t("Cold foam poured by hand over a Casa Sol drink")} width={1000} height={1400} loading="lazy" /><figcaption>{t("made with a little extra love")}</figcaption></figure>}</div>
          <ul className="sol-tasting-drinks">{group.items.map((item) => <li className="sol-tasting-drink" key={item.name}><div className="sol-drink-portrait"><DrinkIllustration name={item.name} /></div><div className="sol-drink-copy"><h3>{item.name}</h3><p>{t(item.description)}</p></div></li>)}</ul>
        </div>
      </section>)}
    </div>
    <section className="sol-quiet-cta sol-wrap"><div><p className="eyebrow">{t("Your favorites, your way")}</p><h2>{t("For your gathering.")}<br /><em>{t("Or your everyday.")}</em></h2></div><div><p>{t("Explore beverage catering for your next celebration, or have freshly prepared 20-ounce drinks delivered to you.")}</p><div className="sol-actions"><Link href="/packages" className="sol-button">{t("Explore packages ")}<ArrowRight size={16} /></Link><Link href="/book?type=delivery" className="sol-text-link">{t("Ask about delivery ")}<ArrowRight size={16} /></Link></div></div></section>
  </SolMotion>;
}

export async function generateMetadata(): Promise<Metadata> {
  return localizeMetadata(pageMetadata);
}
