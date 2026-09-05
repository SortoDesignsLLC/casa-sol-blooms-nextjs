import Link from "next/link";
import { Heart, Mail, Phone } from "lucide-react";
const logo = "/images/casa-sol-logo-full.jpg";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/50">
      <div className="mx-auto max-w-5xl px-5 py-12 text-center">
        <img
          src={logo}
          alt="Casa Sol Matcha & Coffee"
          width={348}
          height={212}
          className="mx-auto h-28 w-auto mix-blend-multiply sm:h-36"
        />
        <p className="eyebrow mt-3">Matcha &amp; Coffee · DMV Area</p>

        <div className="mt-6 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-8">
          <a
            href="tel:3018353714"
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Phone size={15} className="text-primary" /> 301-835-3714
          </a>
          <a
            href="mailto:casasolmatchacoffee@gmail.com"
            className="inline-flex items-center gap-2 break-all transition-colors hover:text-primary"
          >
            <Mail size={15} className="text-primary" /> casasolmatchacoffee@gmail.com
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <Link href="/menu" className="hover:text-primary">
            Menu
          </Link>
          <Link href="/book" className="hover:text-primary">
            Book Us
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground">
          Made with <Heart size={11} className="text-primary" fill="currentColor" /> in the DMV
        </p>
      </div>
    </footer>
  );
}
