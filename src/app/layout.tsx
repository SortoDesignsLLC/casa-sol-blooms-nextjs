import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/toaster";
import "@/styles.css";
export const metadata: Metadata = {
  title: "Casa Sol — Matcha & Coffee Cart",
  description: "Handcrafted matcha and cold brew for celebrations across the DMV.",
  authors: [{ name: "Casa Sol" }],
  icons: { icon: "/icon.svg" },
  twitter: { card: "summary_large_image" },
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
