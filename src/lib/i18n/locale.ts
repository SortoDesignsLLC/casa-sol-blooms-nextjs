export type Locale = "en" | "es";
export const localeCookie = "casa-sol-language";
export const isLocale = (value: unknown): value is Locale => value === "en" || value === "es";

/** Honor an explicit choice first, then the browser's weighted language list. */
export function resolveLocale(saved: unknown, acceptLanguage: string | null): Locale {
  if (isLocale(saved)) return saved;
  const preferences = (acceptLanguage || "").split(",").map((entry, index) => {
    const [tag, ...params] = entry.trim().toLowerCase().split(";");
    const quality = params.find(param => param.trim().startsWith("q="));
    const weight = quality ? Number(quality.trim().slice(2)) : 1;
    return { language: tag.split("-")[0], weight, index };
  }).filter(({ weight }) => Number.isFinite(weight) && weight > 0 && weight <= 1)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  const preferred = preferences.find(({ language }) => isLocale(language))?.language;
  return isLocale(preferred) ? preferred : "en";
}
