"use client";

import { useLanguage } from "./language-provider";
import styles from "./language-toggle.module.css";

export function LanguageToggle({ compact = false, disabled = false }: { compact?: boolean; disabled?: boolean }) {
  const { locale, setLanguage, pending, error, t } = useLanguage();
  return <div className={`${styles.wrapper} ${compact ? styles.compact : ""}`}>
    <div className={styles.toggle} role="group" aria-label={t("Website language", "Idioma del sitio")} aria-busy={pending} data-language={locale}>
      <span className={styles.indicator} aria-hidden="true" />
      {(["en", "es"] as const).map(value => <button key={value} type="button" lang={value}
        aria-label={value === "en" ? "English" : "Español"} aria-pressed={locale === value}
        disabled={disabled || pending} onClick={() => setLanguage(value)}>
        <span className={styles.full}>{value === "en" ? "English" : "Español"}</span>
        <span className={styles.short} aria-hidden="true">{value.toUpperCase()}</span>
      </button>)}
    </div>
    <span className={error ? styles.error : "sr-only"} role="status">{error ? t("Couldn’t change language. Please try again.", "No pudimos cambiar el idioma. Inténtalo de nuevo.") : pending ? t("Changing language…", "Cambiando idioma…") : ""}</span>
  </div>;
}
