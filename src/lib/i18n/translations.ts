import spanish from "./es.json";
import type { Locale } from "./locale";

/** English source copy is the key. Preserve intentional spacing around inline elements. */
export function translator(locale: Locale) {
  return (english: string, translation?: string): string => {
    if (locale === "en") return english;
    if (translation !== undefined) return translation;
    const value = (spanish as Record<string, string>)[english.trim()];
    return value === undefined ? english : english.replace(english.trim(), value);
  };
}

/** Validation may already have been rendered before the user changes language. */
export function translateValidation(message: string, locale: Locale) {
  const english = Object.entries(spanish).find(([, value]) => value === message)?.[0] || message;
  return translator(locale)(english);
}
