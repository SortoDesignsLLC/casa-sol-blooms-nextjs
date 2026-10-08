import { getTranslations } from "@/lib/i18n/server";
import Link from "@/components/site-link";
import { Mail } from "lucide-react";
const logo = "/images/casa-sol-logo-transparent.png";

export async function SiteFooter() {
  const t = await getTranslations();
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/50">
      <div className="mx-auto max-w-5xl px-5 py-12 text-center">
        <Link href="/" aria-label={t("Casa Sol home")} className="inline-block">
        <img
          src={logo}
          alt="Casa Sol Matcha & Coffee"
          width={348}
          height={212}
          className="mx-auto h-28 w-auto sm:h-36"
        />
        </Link>
        <p className="eyebrow mt-3">{t("A mobile beverage experience · DMV")}</p>
        <p className="mt-3 text-sm text-muted-foreground" lang="es">{t("Se habla español. Un poquito de sol para todos.")}</p>

        <div className="mt-6 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-8">
          <a
            href="mailto:casasolmatchacoffee@gmail.com"
            className="inline-flex items-center gap-2 break-all transition-colors hover:text-primary"
          >
            <Mail size={15} className="text-primary" /> casasolmatchacoffee@gmail.com
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          <Link href="/packages" className="hover:text-primary">{t("Experiences")}</Link>
          <Link href="/delivery" className="hover:text-primary">{t("Delivery")}</Link>
          <Link href="/menu" className="hover:text-primary">{t(" Menu ")}</Link>
          <Link href="/book" className="hover:text-primary">{t(" Book Us ")}</Link>
          <Link href="/about" className="hover:text-primary">{t(" About ")}</Link>
        </div>

      </div>
    </footer>
  );
}
