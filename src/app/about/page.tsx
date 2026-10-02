import { localizeMetadata } from "@/lib/i18n/metadata";
import { getTranslations } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SolMotion } from "@/components/sol-motion";
import { SolBackground } from "@/components/sol-background";
import { sharedOpenGraph } from "@/lib/metadata";
import { story } from "@/data/story";

const description = "From café con pan in El Salvador to gatherings across the DMV. Discover the personal story, family traditions, and community at the heart of Casa Sol.";
const pageMetadata: Metadata = { title: "Our Story — Casa Sol Matcha & Coffee", description, openGraph: { ...sharedOpenGraph, title: "Our Story — Casa Sol Matcha & Coffee", description } };

export default async function AboutPage() {
  const t = await getTranslations();
  return <SolMotion className="sol-subpage">
    <section className="sol-page-header relative isolate text-center"><SolBackground /><div className="sol-wrap"><p className="eyebrow">{t("Nuestra casa, your Casa Sol")}</p><h1 className="mt-4">{t("Salvadoran roots.")}<br /><em>{t("A DMV heart.")}</em></h1><p className="sol-page-intro">{t("The warmth of home, carried into every cup.")}</p></div></section>
    <section className="sol-story-editorial sol-page-panel"><SolBackground variant="garden" /><div className="sol-wrap sol-story-editorial-grid">
      <figure><img src="/images/casa-sol-founder.png" alt={t("The Casa Sol founder holding a handcrafted matcha drink")} width={1200} height={1408} className="sol-founder-frame" /><figcaption className="font-script">{t("From my casa to your celebration.")}</figcaption></figure>
      <div className="sol-story-prose"><p className="sol-label">{t("Our story")}</p><h2>{t("More than a cup.")}<br /><em>{t("A little connection.")}</em></h2>{story.map((paragraph) => <p key={paragraph.slice(0, 24)}>{t(paragraph)}</p>)}<p className="font-script sol-story-signoff">{t("Gracias for being here ♡")}</p><Link href="/book" className="sol-text-link">{t("Bring Casa Sol to your gathering ")}<ArrowRight size={16} /></Link></div>
    </div></section>
  </SolMotion>;
}

export async function generateMetadata(): Promise<Metadata> {
  return localizeMetadata(pageMetadata);
}
