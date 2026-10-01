import Link from "next/link";
import { Mail, Phone } from "lucide-react";
const logo = "/images/casa-sol-logo-transparent.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/50">
      <div className="mx-auto max-w-5xl px-5 py-12 text-center">
        <img
          src={logo}
          alt="Casa Sol Matcha & Coffee"
          width={348}
          height={212}
          className="mx-auto h-28 w-auto sm:h-36"
        />
        <p className="eyebrow mt-3">A mobile beverage experience · DMV</p>
        <p className="mt-3 text-sm text-muted-foreground" lang="es">Se habla español. Un poquito de sol para todos.</p>

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

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          <Link href="/packages" className="hover:text-primary">Experiences</Link>
          <Link href="/#delivery" className="hover:text-primary">Delivery</Link>
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

      </div>
    </footer>
  );
}
