import type { Metadata } from "next";

// Set SITE_URL for a custom domain; Vercel supplies its deployment URLs automatically.
const configuredUrl = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const metadataBase = new URL(configuredUrl ? (configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`) : "http://localhost:3100");
export const shareImage = {
  url: "/social/casa-sol-preview.jpg",
  width: 1200,
  height: 630,
  alt: "Casa Sol Matcha & Coffee — a little sunshine in every sip. Blush and sage logo with a handcrafted drink in a botanical arch.",
};
export const sharedOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: "Casa Sol",
  locale: "en_US",
  images: [shareImage],
};
export const sharedTwitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  images: [shareImage],
};
