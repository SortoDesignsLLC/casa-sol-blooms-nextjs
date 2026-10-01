"use client";
import { ArrowUpRight, Sun } from "lucide-react";
import type { InquiryLanguage } from "@/lib/inquiry";

export function InquiryClouds({ onChoose }: { onChoose: (language: InquiryLanguage) => void }) {
  return <div className="sol-inquiry-clouds">
    {(["en", "es"] as const).map((language) => <article className="sol-inquiry-cloud" lang={language} key={language}>
      <svg className="sol-inquiry-cloud-shape" viewBox="0 0 600 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M76 101 C42 56 116 17 170 49 C200 2 270 6 300 36 C344 1 407 16 426 49 C487 19 549 58 531 102 C590 98 613 157 579 191 C618 235 603 294 568 309 C603 361 564 411 518 408 C503 463 449 484 410 454 C373 496 319 494 291 472 C247 504 188 482 176 455 C113 483 65 450 66 412 C15 414 -6 361 28 318 C-13 280 1 223 31 202 C-6 156 23 100 76 101Z" />
      </svg>
      <div className="sol-inquiry-cloud-copy">
        <Sun size={29} strokeWidth={1.1} aria-hidden="true" />
        <p className="sol-label">{language === "en" ? "Hello, sunshine" : "Hola, un poquito de sol"}</p>
        <h2>{language === "en" ? "Ready to bring a little sunshine to your event?" : "¿Listo/a para llevar un poquito de sol a tu próximo evento?"}</h2>
        <p>{language === "en" ? "Planning something special? Explore our packages and menu, then tell us a little about your event. Complete our quick inquiry form and we’ll be in touch within 2–3 business days with availability and next steps." : "¿Estás planeando algo especial? Explora nuestros paquetes y menú, y cuéntanos un poquito sobre tu evento. Completa nuestro formulario de consulta y nos pondremos en contacto contigo dentro de 2–3 días hábiles para confirmar disponibilidad y los próximos pasos."}</p>
        <a href="#inquiry" className="sol-text-link" onClick={() => onChoose(language)}>{language === "en" ? "Let’s plan your event" : "Planea tu evento"}<ArrowUpRight size={17} /></a>
      </div>
    </article>)}
  </div>;
}
