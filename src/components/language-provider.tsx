"use client";

import { createContext, useContext, useState, useTransition, type ReactNode } from "react";
import { saveLanguage } from "@/lib/i18n/actions";
import { translator } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/locale";

const LanguageContext = createContext<{
  locale: Locale; setLanguage: (locale: Locale) => void; pending: boolean; error: boolean;
} | null>(null);

export function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(false);
  function setLanguage(next: Locale) {
    if (next === locale || pending) return;
    setError(false);
    startTransition(async () => {
      try { await saveLanguage(next); } catch { setError(true); }
    });
  }
  return <LanguageContext.Provider value={{ locale, setLanguage, pending, error }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is required");
  return { ...context, t: translator(context.locale) };
}
