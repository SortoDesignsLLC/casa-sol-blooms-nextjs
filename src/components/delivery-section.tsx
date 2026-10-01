import Link from "next/link";
import { ArrowRight, Sun } from "lucide-react";
import { SolBackground } from "@/components/sol-background";

export function DeliverySection() {
  return <section id="delivery" className="sol-delivery sol-page-panel">
    <SolBackground variant="garden" />
    <div className="sol-wrap sol-delivery-grid">
      <figure><img src="/images/IMG_3544.jpg" alt="Fresh matcha poured over a fruit drink at Casa Sol" width={1000} height={1400} loading="lazy" /><figcaption className="font-script">a little sunshine, at your door</figcaption></figure>
      <div><p className="sol-label">Fresh Drink Delivery</p><h2>Your everyday,<br /><em>a little sunnier.</em></h2><p>Fresh Casa Sol drinks, delivered to you. Every order is prepared fresh, carefully packed, and made with our house-made fruit purées, cold foams, and signature drink components.</p><div className="sol-delivery-facts"><span><strong>20 oz</strong>Every drink</span><span><strong>5 drinks</strong>Minimum order</span><span><strong>$15</strong>Within 12 miles</span></div><p className="sol-small-note">Beyond 12 miles? We’ll share your delivery fee before confirmation. Your full total, including drinks, applicable fees, and tax, is shared upfront.</p><Link href="/book?type=delivery#inquiry" className="sol-button">Bring a little sunshine home <ArrowRight size={16} /></Link></div>
    </div><Sun className="sol-delivery-sun" size={78} strokeWidth={1} aria-hidden="true" />
  </section>;
}
