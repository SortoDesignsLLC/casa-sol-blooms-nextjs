import type { Metadata } from "next";
import { localizeMetadata } from "@/lib/i18n/metadata";
import { getTranslations } from "@/lib/i18n/server";
import { sharedOpenGraph } from "@/lib/metadata";
import { SolMotion } from "@/components/sol-motion";
import { SolBackground } from "@/components/sol-background";
import { DeliverySection } from "@/components/delivery-section";
import Link from "@/components/site-link";
import { ArrowRight } from "lucide-react";

const description = "Fresh Casa Sol matcha, cold brew, and mocktails delivered across the DMV. Explore delivery details and request your favorite drinks.";
const pageMetadata: Metadata = { title: "Fresh Drink Delivery — Casa Sol", description, openGraph: { ...sharedOpenGraph, title: "Fresh Drink Delivery — Casa Sol", description } };

export default async function DeliveryPage() {
  const t = await getTranslations();
  return <SolMotion className="sol-subpage">
    <section className="sol-page-header relative isolate text-center" aria-labelledby="delivery-title">
      <SolBackground /><div className="sol-wrap"><p className="eyebrow">{t("From our casa to yours")}</p><h1 id="delivery-title" className="mt-4">{t("Fresh Drink Delivery")}</h1></div>
    </section>
    <DeliverySection />
    <section className="sol-quiet-cta sol-wrap"><div><p className="eyebrow">{t("Your favorites, your way")}</p><h2>{t("Freshly poured.")}<br /><em>{t("Wholeheartedly yours.")}</em></h2></div><div><p>{t("Bright matcha, Salvadoran cold brew, and fruit-forward mocktails. House-made purées and cold foams make every sip our own.")}</p><Link href="/menu" className="sol-text-link mt-4">{t("Meet the full menu")}<ArrowRight size={16} aria-hidden="true" /></Link></div></section>
  </SolMotion>;
}

export async function generateMetadata(): Promise<Metadata> {
  return localizeMetadata(pageMetadata);
}
