"use server";

import { cookies } from "next/headers";
import { isLocale, localeCookie, type Locale } from "./locale";

export async function saveLanguage(locale: Locale) {
  if (!isLocale(locale)) throw new Error("Unsupported language");
  // Cookie mutations refresh the server tree and invalidate prefetched routes.
  (await cookies()).set(localeCookie, locale, {
    path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax", httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}
