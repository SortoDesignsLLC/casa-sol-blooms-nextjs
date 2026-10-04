"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/** Start ordinary page visits at the top, including links to the current page. */
export default function SiteLink({ href, scroll, ...props }: Omit<ComponentProps<typeof Link>, "onNavigate">) {
  const hash = typeof href === "string" ? href.includes("#") : Boolean(href.hash);

  return <Link {...props} href={href} scroll={scroll} onNavigate={() => {
    // Keep intentional section links and explicit scroll preservation intact.
    // onNavigate excludes modified clicks, downloads, and external URLs.
    if (!hash && scroll !== false) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }} />;
}
