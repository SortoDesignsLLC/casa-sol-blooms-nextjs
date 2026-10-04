import { getTranslations } from "@/lib/i18n/server";
import Link from "@/components/site-link";
import { ArrowRight } from "lucide-react";
import { seasonal } from "@/data/menu";
import { DrinkIllustration } from "@/components/sol-illustrations";
import styles from "./seasonal-feature.module.css";

/** A ribbed heirloom pumpkin, curling vine, and veined leaf in the Casa Sol linework. */
function Pumpkin({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 280 245" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M127 70 Q115 42 130 22 L145 19 Q129 49 147 70" fill="currentColor" fillOpacity=".08" />
    <path d="M132 61 Q126 44 135 28 M141 67 Q154 34 181 40 C206 45 191 68 179 56 C168 40 203 21 232 35 C255 47 233 61 225 48" />
    <path d="M173 43 C172 17 200 4 215 11 L209 23 L220 29 L202 36 L204 45 Q186 41 173 43Z" fill="currentColor" fillOpacity=".07" /><path d="M174 41 L207 17 M184 31 L185 19 M185 31 L204 31" strokeWidth=".7" />
    <path className={styles.pumpkinBody} d="M138 77 C99 43 49 62 32 99 C-1 146 35 211 88 215 Q116 233 141 220 Q168 234 194 214 C252 215 273 150 251 106 C236 68 189 46 151 77Z" fill="currentColor" fillOpacity=".035" />
    <path d="M136 78 C102 53 63 88 59 141 C56 186 84 216 108 222 M139 79 C123 53 92 101 93 157 C94 203 115 224 136 222 M147 78 C181 53 219 88 224 141 C227 186 201 216 178 222 M145 79 C162 53 190 101 189 157 C188 203 168 224 147 222 M142 79 C123 119 122 185 141 221 M145 80 C165 120 164 186 146 222" />
    <path d="M40 118 Q27 151 46 180 M47 125 Q35 151 49 170 M73 104 Q65 121 65 139 M81 102 Q74 118 73 130 M107 172 Q110 193 120 203 M112 171 Q116 190 122 194 M207 96 Q219 109 224 123 M210 104 L216 117 M205 181 Q200 199 190 205 M199 179 Q194 194 188 198" strokeWidth=".65" strokeOpacity=".7" />
    <path d="M63 228 Q141 245 216 224 M92 235 Q141 244 184 236" strokeOpacity=".5" />
  </svg>;
}

function AutumnLeaf({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true"><g className={styles.leafMotion}>
    <path d="M45 103 L47 80 L20 90 L25 74 L5 62 L23 57 L15 30 L34 39 L46 9 L55 32 L73 19 L70 45 L91 40 L82 60 L96 68 L72 76 L76 89 L51 81" fill="currentColor" fillOpacity=".045" />
    <path d="M47 94 L48 28 M48 78 L27 70 M48 63 L29 46 M49 74 L74 65 M48 53 L63 37 M34 72 L32 62 M63 69 L67 57" strokeWidth=".8" />
  </g></svg>;
}

function AutumnBackground() {
  return <div className={styles.art} aria-hidden="true"><Pumpkin className={styles.pumpkinLeft} /><Pumpkin className={styles.pumpkinRight} /><AutumnLeaf className={styles.leafLeft} /><AutumnLeaf className={styles.leafRight} /></div>;
}

export async function SeasonalFeature({ preview = false }: { preview?: boolean }) {
  const t = await getTranslations();
  if (!seasonal.length) return null;
  if (preview) return <section id="fall-at-casa-sol" className={`${styles.season} ${styles.preview}`} aria-labelledby="fall-preview-title">
    <div className={`sol-wrap ${styles.previewLayout}`}>
      <Pumpkin className={styles.stripPumpkin} />
      <div className={styles.previewCopy}><p className={styles.eyebrow}>{t("The seasonal collection")}</p><h2 id="fall-preview-title" className={styles.stripTitle}>{t("Fall favorites are here.")}</h2><p className={styles.stripDescription}>{t("Pumpkin, panela & warm spice. Only for fall.")}</p></div>
      <Link href="/menu#seasonal" className={styles.stripLink}>{t("Explore the fall menu ")}<ArrowRight size={17} /></Link>
    </div>
  </section>;

  return <section id="seasonal" className={`${styles.season} ${styles.full}`} aria-labelledby="fall-menu-title">
    <AutumnBackground />
    <div className="sol-wrap">
      <div className={styles.menuHeading}>
        <div><p className={styles.eyebrow}>{t("The Casa Sol menu · Fall edition")}</p><h1 id="fall-menu-title" className={styles.title}>{t("Fall is here.")}<br /><em>{t("Let’s sip it in.")}</em></h1></div>
        <div className={styles.menuIntro}><span className={styles.seasonStamp}>{t("Only for")}<br /><em>{t("the season")}</em><span aria-hidden="true">✦</span></span><p>{t("Four cozy pours. Pumpkin, warm spice, and the homemade touches you love — here for a little while.")}</p></div>
      </div>
      <div className={styles.drinks}>{seasonal.map((item) => <article className={styles.drink} key={item.name}><div className={styles.drinkArt}><DrinkIllustration name={item.name} context="fall-menu" /></div><p className={styles.drinkCategory}>{t(item.category || "")}</p><h2>{item.name}</h2><p className={styles.description}>{t(item.description)}</p></article>)}</div>
      <div className={styles.menuFooter}><p>{t("Here for fall. Savor it while it’s here.")}<small>{t("Seasonal availability is confirmed with your inquiry.")}</small></p><Link href="/book" className={styles.button}>{t("Ask about fall flavors ")}<ArrowRight size={17} /></Link></div>
    </div>
  </section>;
}
