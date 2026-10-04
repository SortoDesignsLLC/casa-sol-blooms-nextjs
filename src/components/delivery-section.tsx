import { getTranslations } from "@/lib/i18n/server";
import Link from "@/components/site-link";
import { ArrowRight, Sun } from "lucide-react";
import { SolBackground } from "@/components/sol-background";

export async function DeliverySection() {
  const t = await getTranslations();
  return <section id="delivery" className="sol-delivery sol-page-panel">
    <SolBackground variant="garden" />
    <div className="sol-wrap sol-delivery-grid">
      <figure><img src="/images/IMG_3544.jpg" alt={t("Fresh matcha poured over a fruit drink at Casa Sol")} width={1000} height={1400} loading="lazy" /><figcaption className="font-script">{t("a little sunshine, at your door")}</figcaption></figure>
      <div><p className="sol-label">{t("Fresh Drink Delivery")}</p><h2>{t("Your everyday,")}<br /><em>{t("a little sunnier.")}</em></h2><p>{t("Fresh Casa Sol drinks, delivered to you. Every order is prepared fresh, carefully packed, and made with our house-made fruit purées, cold foams, and signature drink components.")}</p><div className="sol-delivery-facts"><span><strong>{t("20 oz")}</strong>{t("Every drink")}</span><span><strong>{t("5 drinks")}</strong>{t("Minimum order")}</span><span><strong>$15</strong>{t("Within 12 miles")}</span></div><p className="sol-small-note">{t("Beyond 12 miles? We’ll share your delivery fee before confirmation. Your full total, including drinks, applicable fees, and tax, is shared upfront.")}</p><Link href="/book?type=delivery" className="sol-button">{t("Bring a little sunshine home ")}<ArrowRight size={16} /></Link></div>
    </div><Sun className="sol-delivery-sun" size={78} strokeWidth={1} aria-hidden="true" />
  </section>;
}
