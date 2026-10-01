import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SolMotion } from "@/components/sol-motion";
import { SolBackground } from "@/components/sol-background";
import { sharedOpenGraph } from "@/lib/metadata";
import { story } from "@/data/story";

const description = "From café con pan in El Salvador to gatherings across the DMV. Discover the personal story, family traditions, and community at the heart of Casa Sol.";
export const metadata: Metadata = { title: "Our Story — Casa Sol Matcha & Coffee", description, openGraph: { ...sharedOpenGraph, title: "Our Story — Casa Sol Matcha & Coffee", description } };

export default function AboutPage() {
  return <SolMotion className="sol-subpage">
    <section className="sol-page-header relative isolate text-center"><SolBackground /><div className="sol-wrap"><p className="eyebrow">Nuestra casa, your Casa Sol</p><h1 className="mt-4">Salvadoran roots.<br /><em>A DMV heart.</em></h1><p className="sol-page-intro">The warmth of home, carried into every cup.</p></div></section>
    <section className="sol-story-editorial sol-page-panel"><SolBackground variant="garden" /><div className="sol-wrap sol-story-editorial-grid">
      <figure><img src="/images/casa-sol-founder.png" alt="The Casa Sol founder holding a handcrafted matcha drink" width={1200} height={1408} className="sol-founder-frame" /><figcaption className="font-script">From my casa to your celebration.</figcaption></figure>
      <div className="sol-story-prose"><p className="sol-label">Our story</p><h2>More than a cup.<br /><em>A little connection.</em></h2>{story.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}<p className="font-script sol-story-signoff">Gracias for being here ♡</p><Link href="/book" className="sol-text-link">Bring Casa Sol to your gathering <ArrowRight size={16} /></Link></div>
    </div></section>
  </SolMotion>;
}
