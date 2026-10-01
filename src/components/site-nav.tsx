"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Heart, ArrowUpRight, ArrowRight, CalendarDays, Coffee, House, Truck, Flower2, Phone, Mail } from "lucide-react";
import { BotanicalBranch } from "@/components/sol-illustrations";
import styles from "./site-nav.module.css";
const logo = "/images/casa-sol-logo-transparent.png";

const links = [
  { to: "/", label: "Home", detail: "A little sunshine starts here", icon: House },
  { to: "/menu", label: "Menu", detail: "Matcha, coffee & something special", icon: Coffee },
  { to: "/packages", label: "Experiences", detail: "Find your celebration’s perfect fit", icon: Flower2 },
  { to: "/#delivery", label: "Delivery", detail: "Your favorite sips, brought to you", icon: Truck },
  { to: "/book", label: "Book Us", detail: "Let’s plan something lovely", icon: CalendarDays },
  { to: "/about", label: "Our story", detail: "Meet the heart behind Casa Sol", icon: Heart },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  function closeDrawer() { drawer.current?.close(); }
  function openDrawer() {
    drawer.current?.showModal();
    setOpen(true);
    closeButton.current?.focus();
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) drawer.current?.close(); };
    desktop.addEventListener("change", closeOnDesktop);
    // Browser history can change the route without a navigation link click.
    const closeOnHistory = () => drawer.current?.close();
    window.addEventListener("popstate", closeOnHistory);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("popstate", closeOnHistory);
    };
  }, []);

  return <>
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 md:flex md:justify-between">
        <Link href="/" className="min-w-0">
          <img src={logo} alt="Casa Sol Matcha & Coffee" className="h-14 w-auto sm:h-16" width={220} height={60} />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {links.map(l => <Link key={l.to} href={l.to} aria-current={pathname === l.to ? "page" : undefined} className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary">{l.to === "/about" ? "About" : l.label}</Link>)}
        </nav>
        <button ref={trigger} type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog" aria-label="Open menu" onClick={openDrawer} className={styles.menuButton}>
          <span>Explore</span><Menu size={19} aria-hidden="true" />
        </button>
      </div>
    </header>

    <dialog ref={drawer} id="mobile-navigation" aria-label="Explore Casa Sol" className={styles.drawer}
      onClose={() => { setOpen(false); if (window.matchMedia("(max-width: 767px)").matches) trigger.current?.focus({ preventScroll: true }); }}
      onKeyDown={event => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDrawer();
      }}>
      <div className={styles.drawerTop}>
        <Link href="/" onClick={closeDrawer}><img src={logo} alt="Casa Sol home" width={110} height={85} /></Link>
        <button ref={closeButton} type="button" onClick={closeDrawer} aria-label="Close menu" className={styles.closeButton}><X size={21} aria-hidden="true" /></button>
      </div>
      <div className={styles.welcome}>
        <p>A little sunshine,<br /><em>wherever you gather.</em></p>
        <BotanicalBranch className={styles.sprig} />
      </div>
      <nav aria-label="Mobile navigation" className={styles.drawerLinks}>
        {links.filter(l => l.to !== "/book").map(({ to, label, detail, icon: Icon }) => <Link key={to} href={to} onClick={closeDrawer} aria-current={pathname === to ? "page" : undefined}>
          <Icon className={styles.linkIcon} size={19} strokeWidth={1.4} aria-hidden="true" />
          <span><strong>{label}</strong><small>{detail}</small></span>
          <ArrowUpRight className={styles.linkArrow} size={17} strokeWidth={1.3} aria-hidden="true" />
        </Link>)}
      </nav>
      <div className={styles.drawerBottom}>
        <p className={styles.invitation}>Something worth celebrating?</p>
        <Link href="/book" onClick={closeDrawer} className={styles.bookingLink}><CalendarDays size={18} aria-hidden="true" /> Plan your event <ArrowRight size={18} aria-hidden="true" /></Link>
        <div className={styles.contactLinks}>
          <a href="tel:3018353714"><Phone size={15} aria-hidden="true" />Call us</a>
          <span aria-hidden="true" />
          <a href="mailto:casasolmatchacoffee@gmail.com"><Mail size={15} aria-hidden="true" />Say hello</a>
        </div>
      </div>
    </dialog>

    {pathname !== "/book" && <nav aria-label="Quick actions" className={styles.actionBar}>
      <Link href="/book" className={styles.actionPrimary}><CalendarDays size={19} strokeWidth={1.6} aria-hidden="true" /><span>Plan your event</span><ArrowRight size={17} aria-hidden="true" /></Link>
      <a href="tel:3018353714" className={styles.actionSecondary}><Phone size={18} strokeWidth={1.6} aria-hidden="true" /><span>Call us</span></a>
    </nav>}
  </>;
}
