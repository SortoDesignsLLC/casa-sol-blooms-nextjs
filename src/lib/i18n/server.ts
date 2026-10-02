import { cookies, headers } from "next/headers";
import { cache } from "react";
import { localeCookie, resolveLocale } from "./locale";
import { translator } from "./translations";

export const getLocale = cache(async () => {
  const [cookieStore, requestHeaders] = await Promise.all([cookies(), headers()]);
  return resolveLocale(cookieStore.get(localeCookie)?.value, requestHeaders.get("accept-language"));
});
export async function getTranslations() { return translator(await getLocale()); }
