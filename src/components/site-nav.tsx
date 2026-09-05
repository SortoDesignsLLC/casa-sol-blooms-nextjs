"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
const logo = "/images/casa-sol-logo-transparent.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/book", label: "Book Us" },
  { to: "/about", label: "About" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:flex sm:justify-between">
        <Link href="/" className="min-w-0" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Casa Sol Matcha & Coffee"
            className="h-14 w-auto sm:h-16"
            width={220}
            height={60}
          />
        </Link>

        <nav className="hidden items-center gap-7 sm:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              aria-current={pathname === l.to ? "page" : undefined}
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 rounded-full border border-border p-2 text-foreground sm:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="border-t border-border/60 bg-background px-5 pb-5 pt-2 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              aria-current={pathname === l.to ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 border-b border-border/50 py-3 text-base last:border-0"
            >
              <Heart size={13} className="text-primary" fill="currentColor" />
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
