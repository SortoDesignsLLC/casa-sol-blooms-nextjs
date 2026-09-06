import { SolMotion } from "@/components/sol-motion";
import { SolBackground } from "@/components/sol-background";
import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/metadata";
export const metadata: Metadata = {
  "title": "About — Casa Sol Matcha & Coffee",
  "description": "The story behind Casa Sol: a small, family-run matcha and coffee cart with Salvadoran roots, serving the DMV area.",
  "openGraph": {
    ...sharedOpenGraph,
    "title": "About — Casa Sol Matcha & Coffee",
    "description": "The story behind Casa Sol: a small, family-run matcha and coffee cart with Salvadoran roots, serving the DMV area."
  }
};
import Link from "next/link";
import { Heart } from "lucide-react";
const founderPhoto = "/images/casa-sol-founder.png";




export default function AboutPage() {
  return (
    <SolMotion className="sol-subpage">
      <section className="sol-page-header relative isolate bg-surface-cream py-16 text-center"><SolBackground />
        <p className="eyebrow">Nuestra Casa</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">About Casa Sol</h1>
        <div className="gold-rule mx-auto mt-5" />
      </section>

      <div className="sol-page-panel sol-page-about bg-surface-sand py-16"><SolBackground variant="garden" />
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 md:grid-cols-2">
        <img
          src={founderPhoto}
          alt="The Casa Sol founder holding a handcrafted matcha drink"
          loading="lazy"
          width={1200}
          height={1408}
          className="sol-founder-frame w-full max-h-[36rem] rounded-[1.75rem] object-contain bg-surface-cream shadow-luxe"
        />
        <div className="space-y-5 text-muted-foreground">
          <p>
            Casa Sol started with a simple idea: bring the warmth of home to the moments people
            celebrate. Everything we serve is made by hand, in small batches, with the same care
            you&apos;d get in a family kitchen.
          </p>
          <p>
            Our name means &ldquo;house of the sun.&rdquo; It&apos;s a nod to our Salvadoran roots —
            the sunshine, the sweetness, the way there&apos;s always something warm to drink and
            room for one more at the table.
          </p>
          <p>
            We&apos;re a small, personal brand based in the DMV, and we love being part of weddings,
            showers, birthdays, pop-ups and everything in between. When you book Casa Sol,
            you&apos;re getting us — not a big company.
          </p>
          <p className="font-script text-3xl text-primary">Gracias for being here</p>
          <Link
            href="/book"
            className="sol-button"
          >
            <Heart size={14} fill="currentColor" /> Book Casa Sol
          </Link>
        </div>
      </div>

      </div>
    </SolMotion>
  );
}
