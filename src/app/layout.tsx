import type { Metadata, Viewport } from "next";
import { metadataBase, sharedOpenGraph, sharedTwitter } from "@/lib/metadata";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/toaster";
import "@/styles.css";
export const viewport: Viewport = { themeColor: "#fbf6eb" };
export const metadata: Metadata = {
  metadataBase,
  applicationName: "Casa Sol",
  openGraph: sharedOpenGraph,
  title: "Casa Sol — Matcha & Coffee Cart",
  description: "Handcrafted matcha and cold brew for celebrations across the DMV.",
  authors: [{ name: "Casa Sol" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  twitter: sharedTwitter,
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Karla:wght@300;400;500&family=Style+Script&display=swap" rel="stylesheet" />
  </head><body>
    <div className="flex min-h-screen flex-col"><SiteNav /><main className="flex-1">{children}</main><SiteFooter /></div>
    <Toaster position="top-center" />
  </body></html>;
}
