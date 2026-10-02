"use client";
import { useLanguage } from "@/components/language-provider";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useLanguage(); return <div className="px-5 py-24 text-center"><h1 className="text-3xl">{t("This page didn't load")}</h1><p className="mt-4">{t("Please try again.")}</p><button onClick={reset} className="mt-6 rounded-full bg-primary px-6 py-3 text-primary-foreground">{t("Try again")}</button></div>; }
