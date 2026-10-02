import { getTranslations } from "@/lib/i18n/server";
import Link from "next/link";
export default async function NotFound() {
  const t = await getTranslations(); return <div className="px-5 py-24 text-center"><h1 className="text-6xl">404</h1><p className="mt-4">{t("Page not found")}</p><Link href="/" className="mt-6 inline-block underline">{t("Go home")}</Link></div>; }
