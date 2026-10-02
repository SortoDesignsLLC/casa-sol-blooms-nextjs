import type { Metadata } from "next";
import { getLocale } from "./server";
import { translator } from "./translations";
import { shareImage } from "../metadata";

export async function localizeMetadata(metadata: Metadata): Promise<Metadata> {
  const locale = await getLocale();
  const t = translator(locale);
  const title = typeof metadata.title === "string" ? t(metadata.title) : metadata.title;
  const description = metadata.description ? t(metadata.description) : metadata.description;
  const image = { ...shareImage, alt: t(shareImage.alt, "Casa Sol Matcha & Coffee — un poquito de sol en cada sorbo. Logotipo en tonos rosa y verde salvia con una bebida artesanal en un arco botánico.") };
  return { ...metadata, title, description,
    openGraph: { ...metadata.openGraph, title: title || undefined, description: description || undefined, locale: locale === "es" ? "es_US" : "en_US", images: [image] },
    twitter: { ...metadata.twitter, card: "summary_large_image", title: typeof title === "string" ? title : undefined, description: description || undefined, images: [image] },
  };
}
