"use client";

import { translateValidation } from "@/lib/i18n/translations";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "./language-provider";
import { useRef, useState, type FormEvent, type ChangeEvent, type HTMLInputAutoCompleteAttribute } from "react";
import Link from "@/components/site-link";
import { ArrowLeft, ArrowRight, Check, Copy, Mail, Plus, Sun, Trash2, CupSoda } from "lucide-react";
import { SolMotion } from "@/components/sol-motion";
import { SunMedallion, DrinkIllustration } from "@/components/sol-illustrations";
import styles from "./booking-form.module.css";
import { inquiryStepErrors, inquiryFieldStep } from "@/lib/inquiry-steps";
import { BookingTerms } from "@/components/booking-terms";
import { packages, contactEmail } from "@/data/experiences";
import { drinkChoices } from "@/data/menu";
import { daysUntil, eventTypes, inquiryMailto, inquiryMessage, inquirySchema, todayISO, type Inquiry, type InquiryKind } from "@/lib/inquiry";

type Errors = Record<string, string>;
type DrinkRow = { id: number; flavor: string; quantity: string };
type Props = { initialKind: InquiryKind; initialPackage: string; initialSetup: "cart" | "unsure"; directSubmission: boolean };

export default function BookingForm({ initialKind, initialPackage, initialSetup, directSubmission }: Props) {
  const [step, setStep] = useState(0);
  const [packageId, setPackageId] = useState(initialPackage);
  const [review, setReview] = useState<Inquiry | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [kind, setKind] = useState<InquiryKind>(initialKind);
  const { locale: language, t: translate } = useLanguage();
  const [validation, setValidation] = useState<{ messages: Errors; language: typeof language }>({ messages: {}, language });
  const errors = validation.language === language ? validation.messages : Object.fromEntries(Object.entries(validation.messages).map(([key, message]) => [key, translateValidation(message, language)]));
  const setErrors = (messages: Errors) => setValidation({ messages, language });
  const [date, setDate] = useState("");
  const [drinks, setDrinks] = useState<DrinkRow[]>([{ id: 0, flavor: "", quantity: "5" }]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "draft" | "error">("idle");
  const [prepared, setPrepared] = useState<Inquiry | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef({ body: "", id: "" });
  const nextRowId = useRef(1);
  const es = language === "es";
  const t = (en: string, spanish: string) => es ? spanish : en;
  const totalDrinks = drinks.reduce((sum, row) => sum + (Number(row.quantity) || 0), 0);
  const leadDays = date ? daysUntil(date) : NaN;

  function resetFeedback() {
    if (status !== "sending") { setStatus("idle"); setPrepared(null); setCopied(false); }
  }

  function chooseKind(value: InquiryKind) {
    setKind(value); setErrors({}); resetFeedback();
  }

  function showResult() {
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "sent") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = { ...Object.fromEntries(data.entries()), kind, language, beverages: data.getAll("beverages"), drinks: drinks.map(({ flavor, quantity }) => ({ flavor, quantity })) };
    const parsed = inquirySchema(language).safeParse(payload);
    const next = inquiryStepErrors(parsed, step);
    if (Object.keys(next).length) {
      setErrors(next);
      if (step >= 3) setStep(Math.min(...Object.keys(next).map(inquiryFieldStep)));
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setErrors({});
    if (step < 4) {
      if (step === 3 && parsed.success) setReview(parsed.data);
      moveToStep(step + 1);
      return;
    }
    if (!parsed.success) return;
    setErrors({});
    setPrepared(parsed.data);
    if (!directSubmission) {
      setStatus("draft"); showResult(); return;
    }
    setStatus("sending");
    const body = JSON.stringify(parsed.data);
    if (requestRef.current.body !== body) requestRef.current = { body, id: crypto.randomUUID() };
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiry: parsed.data, requestId: requestRef.current.id }),
      });
      if (!response.ok) throw new Error("Inquiry could not be submitted");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
    showResult();
  }

  const localizedPrepared = prepared && status !== "sent" ? { ...prepared, language } : prepared;

  async function copyInquiry() {
    if (!localizedPrepared) return;
    try {
      await navigator.clipboard.writeText(inquiryMessage(localizedPrepared).text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const updateDrink = (id: number, field: "flavor" | "quantity", value: string) => {
    setDrinks((rows) => rows.map((row) => row.id === id ? { ...row, [field]: value } : row));
    resetFeedback();
  };

  function moveToStep(next: number) {
    setStep(next); setErrors({}); resetFeedback();
    requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      workspaceRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  }

  const locked = status === "sending" || status === "sent";
  const steps = [t("Experience", "Experiencia"), t("Details", "Detalles"), t("Drinks", "Bebidas"), t("About you", "Sobre ti"), t("Review", "Revisar")];
  const titles = [t("A little Casa Sol, your way.", "Un momento muy tuyo."), kind === "event" ? t("Tell us about the occasion.", "Cuéntanos sobre la ocasión.") : t("When & where?", "¿Cuándo y dónde?"), t("Make it yours.", "Hazlo tuyo."), t("And who’s joining us?", "¿Y quién nos acompaña?"), t("Looking lovely. Let’s review.", "Todo listo. Revisemos.")];
  const descriptions = [t("For a gathering, or a little everyday joy. Choose your experience.", "Elige cómo disfrutar Casa Sol."), t("Share your preferred date and exact address. We’ll check availability personally.", "Comparte tu fecha preferida y dirección exacta. Revisaremos la disponibilidad personalmente."), kind === "event" ? t("Find your package, choose your drinks, and add the little touches.", "Elige tu paquete, tus bebidas y los pequeños detalles.") : t("Mix your favorites. Five drinks minimum, each freshly made in a 20 oz cup.", "Combina tus favoritos. Mínimo cinco bebidas, recién preparadas en vasos de 20 oz."), t("So we can send your personalized quote and talk through the details.", "Para enviarte tu cotización personalizada y conversar sobre los detalles."), t("A quick look before your inquiry is on its way. You can still change anything.", "Una última mirada antes de enviar tu consulta. Todavía puedes cambiar cualquier detalle.")];
  const chosenPackage = packages.find(item => item.id === packageId);
  const reviewGroups = review ? [
    { step: review.kind === "event" ? 2 : 0, title: t("Your experience", "Tu experiencia"), lines: review.kind === "event" ? [t("Event or Pop-Up", "Evento o Pop-Up"), packages.find(item => item.id === review.package)?.name || t("Help me choose a package", "Ayúdame a elegir un paquete"), ({ signature: t("Signature Setup · included", "Montaje clásico · incluido"), cart: t("Wooden Cart · premium add-on", "Carrito de madera · adicional premium"), unsure: t("Setup: help me choose", "Montaje: ayúdame a elegir") })[review.setup]] : [t("Fresh Drink Delivery", "Entrega de bebidas frescas"), "20 oz"] },
    { step: 1, title: t("Date & place", "Fecha y lugar"), lines: [new Intl.DateTimeFormat(es ? "es-US" : "en-US", { dateStyle: "long" }).format(new Date(review.date + "T12:00:00")) + " · " + new Intl.DateTimeFormat(es ? "es-US" : "en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(review.date + "T" + review.time)), review.address + ", " + review.city + ", " + review.zip, ...(review.kind === "event" ? [eventTypes.find(item => item[0] === review.eventType)?.[es ? 2 : 1] || review.eventType, `${review.adults} ${t("adults", "adultos")} · ${review.children ?? t("No count provided for", "Sin cantidad de")} ${t("children", "niños")}`, review.hours === "extended" ? t("More than 3 hours", "Más de 3 horas") : review.hours + t(" hours of service", " horas de servicio"), ({ indoor: t("Indoor", "Interior"), outdoor: t("Outdoor", "Exterior"), unsure: t("Setting: not sure yet", "Lugar: aún no lo sé") })[review.setting]] : [review.business]).filter(Boolean)] },
    { step: 2, title: t("Drinks & little details", "Bebidas y pequeños detalles"), lines: review.kind === "event" ? [review.beverages.map(value => value === "Not sure" ? t("Not sure", "Aún no lo sé") : translate(value)).join(", "), review.flavors || t("Flavors: let’s discuss", "Sabores: por definir"), review.notes].filter(Boolean) : [...review.drinks.map(item => `${item.quantity} × ${item.flavor}`), `${review.drinks.reduce((sum, item) => sum + item.quantity, 0)} ${t("drinks total", "bebidas en total")}`, review.notes].filter(Boolean) },
    { step: 3, title: t("Your contact details", "Tus datos de contacto"), lines: [review.name, review.email, review.phone, t("Preferred language: ", "Idioma de preferencia: ") + (language === "en" ? "English" : "Español")] },
  ] : [];

  return <SolMotion className={`sol-subpage ${styles.page}`}>
    <header className={styles.welcome} lang={language}>
      <div className={styles.cloudLeft}><WelcomeCloud /></div>
      <div className={styles.welcomeCopy}><p className="sol-label">{t("A little sunshine, a lovely beginning", "Un poquito de sol, un bonito comienzo")}</p><h1>{t("Good things start", "Lo bonito empieza")} <em>{t("with hello.", "con un hola.")}</em></h1></div>
      <div className={styles.cloudRight}><SunMedallion /><WelcomeCloud /></div>
      <svg className={styles.cloudHem} viewBox="0 0 1440 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 18 Q45 -8 90 18 T270 18 T450 18 T630 18 T810 18 T990 18 T1170 18 T1350 18 Q1400 -8 1440 18 V30 H0Z" /></svg>
    </header>
    <section className={`sol-wrap ${styles.layout}`} lang={language}>
      <aside className={styles.aside}>
        <p className={styles.handwritten}>{t("A little joy, made yours.", "Un poquito de alegría, para ti.")}</p>
        <figure className={styles.photo}><img src="/images/IMG_3550.jpg" alt={t("A freshly made Casa Sol drink", "Una bebida de Casa Sol recién preparada")} width={1000} height={1400} /><figcaption>{t("Made with care. Shared with love.", "Hecho con cariño. Compartido con amor.")}</figcaption></figure>
        <div className={styles.asideNote}><Sun size={20} strokeWidth={1.2} /><span>{t("A personal reply in 2–3 business days.", "Una respuesta personal en 2–3 días hábiles.")}<small>{t("Serving the DMV · English & Español", "En el DMV · English y Español")}</small></span></div>
        <a className={styles.email} href={"mailto:" + contactEmail}>{t("Prefer to email us?", "¿Prefieres escribirnos?")} <ArrowRight size={13} /></a>
      </aside>
      <div id="inquiry" ref={workspaceRef} className={styles.workspace}>
        <div className={styles.toolbar}><span className="sol-label">{t("Your Casa Sol inquiry", "Tu consulta Casa Sol")}</span><LanguageToggle disabled={locked} /></div>
        <nav aria-label={t("Inquiry progress", "Progreso de tu consulta")} className={styles.progress}><ol>{steps.map((label, index) => <li key={index}><button type="button" aria-current={step === index ? "step" : undefined} data-complete={index < step} disabled={index > step || locked} onClick={() => moveToStep(index)}><span>{index < step ? <Check size={14} /> : String(index + 1).padStart(2, "0")}</span>{label}</button></li>)}</ol></nav>
        <div className={styles.heading}><p className="sol-label" aria-live="polite">{t("Step", "Paso")} {step + 1} {t("of", "de")} 5 {step > 0 && <>· {kind === "event" ? t("Event or Pop-Up", "Evento o Pop-Up") : t("Fresh Drink Delivery", "Entrega de bebidas")}</>}</p><h2 ref={headingRef} tabIndex={-1}>{titles[step]}</h2><p>{descriptions[step]}</p></div>
        <form onSubmit={handleSubmit} noValidate onChange={resetFeedback} className={`sol-inquiry-form ${styles.form}`}>
          <fieldset disabled={locked}>
            <div className="sol-honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <div hidden={step !== 0} className={styles.stage}>
              <div className={styles.choices} role="group" aria-label={t("Inquiry type", "Tipo de consulta")}>
                <button type="button" aria-pressed={kind === "event"} onClick={() => chooseKind("event")}><SunMedallion /><strong>{t("Event or Pop-Up", "Evento o Pop-Up")}</strong><span>{t("We bring the drinks & the warmth.", "Llevamos las bebidas y la calidez.")}</span><small>{t("2+ hours · Personalized setup", "2+ horas · Montaje personalizado")}</small><i aria-hidden="true">{kind === "event" && <Check size={13} />}</i></button>
                <button type="button" aria-pressed={kind === "delivery"} onClick={() => chooseKind("delivery")}><DrinkIllustration name="Fresa Fresca" context="booking" /><strong>{t("Fresh Drink Delivery", "Entrega de bebidas frescas")}</strong><span>{t("Your favorites, right at your door.", "Tus favoritos, directo a tu puerta.")}</span><small>{t("20 oz drinks · 5-drink minimum", "Bebidas de 20 oz · Mínimo 5")}</small><i aria-hidden="true">{kind === "delivery" && <Check size={13} />}</i></button>
              </div>
              <div hidden={kind !== "event"} className={styles.deliveryNote}><Sun size={25} strokeWidth={1.2} /><div><strong>{t("Your people. Our little touch of sunshine.", "Tu gente. Nuestro toque de sol.")}</strong><p>{t("Packages from $500. Two hours of service, a branded table, and all the essentials to sip & celebrate.", "Paquetes desde $500. Dos horas de servicio, mesa de marca y todo lo necesario para disfrutar y celebrar.")}</p></div></div>
              <div hidden={kind !== "delivery"} className={styles.deliveryNote}><CupSoda size={25} strokeWidth={1.2} /><div><strong>{t("Freshly made. Ready to share.", "Recién hechas. Listas para compartir.")}</strong><p>{t("Mix matcha, cold brew, mocktails, and seasonal favorites. Delivery is $15 within 12 miles of our service area; farther addresses receive a quote.", "Matcha, café frío, cócteles sin alcohol y sabores de temporada. Entrega: $15 dentro de 12 millas de nuestra área de servicio; más lejos, cotizamos.")}</p></div></div>
            </div>
            <div hidden={step !== 1} className={styles.stage}>
            <fieldset className="sol-form-group"><legend>{kind === "event" ? t("The occasion", "La ocasión") : t("When & where", "Cuándo y dónde")}</legend>
              <div className="sol-field-grid">
                <Field name="date" label={kind === "event" ? t("Event date", "Fecha del evento") : t("Preferred delivery date", "Fecha de entrega preferida")} type="date" min={todayISO()} errors={errors} onChange={(event) => setDate(event.target.value)} />
                <Field name="time" label={kind === "event" ? t("Event start time", "Hora de inicio") : t("Preferred delivery time", "Hora de entrega preferida")} type="time" errors={errors} />
              </div>
              <fieldset hidden={kind !== "event"} disabled={kind !== "event"} className="sol-event-fields">
                <div className="sol-field-grid">
                  <Field name="eventType" label={t("Event type", "Tipo de evento")} errors={errors} options={[["", t("Choose an occasion", "Elige una ocasión")], ...eventTypes.map((item) => [item[0], item[es ? 2 : 1]])]} />
                  <Field name="hours" label={t("Service duration", "Duración del servicio")} errors={errors} defaultValue="2" options={[["2", t("2 hours — included", "2 horas — incluidas")], ["3", t("3 hours — +$150", "3 horas — +$150")], ["extended", t("More than 3 hours", "Más de 3 horas")]]} />
                  <Field name="adults" label={t("Estimated adult guests", "Número estimado de adultos")} type="number" min="1" errors={errors} />
                  <Field name="children" label={t("Children, if any", "Niños, si los hay")} type="number" min="0" required={false} errors={errors} />
                  <Field name="setting" label={t("Event setting", "Lugar del evento")} errors={errors} defaultValue="unsure" options={[["indoor", t("Indoor", "Interior")], ["outdoor", t("Outdoor", "Exterior")], ["unsure", t("Not sure yet", "Aún no lo sé")]]} />
                </div>
                <p className="sol-field-hint">{t("Please list adults separately from children. Adult guest count is used for the initial drink estimate. Service time is active beverage service; setup and breakdown are separate.", "Indica los adultos por separado de los niños. Usamos el número de adultos para la estimación inicial de bebidas. El tiempo de servicio es para servir bebidas; el montaje y desmontaje son aparte.")}</p>
                {leadDays >= 0 && leadDays <= 14 && <p className="sol-date-note" role="status">{leadDays <= 7 ? t("Your date is within 7 days. A $150 rush fee and full payment apply, subject to availability.", "Tu fecha es dentro de 7 días. Se aplica un cargo de $150 por reserva de último momento y pago completo, sujeto a disponibilidad.") : t("Your date is within 14 days. A $150 rush fee applies, subject to availability.", "Tu fecha es dentro de 14 días. Se aplica un cargo de $150 por reserva de último momento, sujeto a disponibilidad.")}</p>}
              </fieldset>
            </fieldset>

            <fieldset className="sol-form-group"><legend>{t("The address", "La dirección")}</legend><p className="sol-field-hint">{kind === "event" ? t("The exact address helps us calculate your mileage fee.", "La dirección exacta nos ayuda a calcular el cargo por traslado.") : t("Include the business name, suite, or floor if applicable.", "Incluye el nombre del negocio, oficina o piso, si corresponde.")}</p><div className="sol-field-grid">
              <Field name="address" label={t("Street address", "Dirección")} errors={errors} autoComplete="street-address" wide />
              <Field name="city" label={t("City", "Ciudad")} errors={errors} autoComplete="address-level2" />
              <Field name="zip" label={t("ZIP code", "Código postal")} errors={errors} autoComplete="postal-code" />
              {kind === "delivery" && <Field name="business" label={t("Business / suite / floor", "Negocio / oficina / piso")} required={false} errors={errors} wide />}
            </div></fieldset>

            </div>
            <div hidden={step !== 2} className={styles.stage}>
              <fieldset hidden={kind !== "event"} disabled={kind !== "event"} className={styles.packageGroup}><legend>{t("A package to start with", "Un paquete para empezar")}</legend><div className={styles.packages}>{packages.map((item, index) => <label key={item.id} data-selected={packageId === item.id}><input type="radio" name="package" value={item.id} checked={packageId === item.id} onChange={() => setPackageId(item.id)} /><span><strong>{item.name}</strong><small>{[t("Up to 20 guests", "Hasta 20 invitados"), t("21–35 guests", "21–35 invitados"), t("36–50 guests", "36–50 invitados")][index]}</small></span><span className={styles.price}><small>{t("from", "desde")}</small>${item.price}</span></label>)}<label data-selected={packageId === "unsure"}><input type="radio" name="package" value="unsure" checked={packageId === "unsure"} onChange={() => setPackageId("unsure")} /><span><strong>{t("Help me choose", "Ayúdame a elegir")}</strong><small>{t("Still dreaming, or more than 50 guests?", "¿Aún planeando, o más de 50 invitados?")}</small></span><Sun size={18} strokeWidth={1} /></label></div>
                <p className={styles.packageHint}>{chosenPackage ? t(`${chosenPackage.flavors} matcha flavor${chosenPackage.flavors > 1 ? "s" : ""} + 1 cold brew flavor. `, `${chosenPackage.flavors} sabor${chosenPackage.flavors > 1 ? "es" : ""} de matcha + 1 sabor de café frío. `) : ""}{t("Packages include 2 hours, cups, supplies, and a branded table & menu. Travel and extras are quoted separately.", "Los paquetes incluyen 2 horas, vasos, insumos, mesa y menú de marca. Traslado y extras se cotizan por separado.")}</p>
                <Field name="setup" label={t("Setup preference", "Montaje de preferencia")} errors={errors} defaultValue={initialSetup} options={[["unsure", t("Help me choose", "Ayúdame a elegir")], ["signature", t("Signature Setup — included", "Montaje clásico — incluido")], ["cart", t("Wooden Cart — premium add-on", "Carrito de madera — adicional premium")]]} />
                <p className={styles.packageHint}>{t("The wooden cart is a premium add-on, quoted for your location and transport needs.", "El carrito de madera es un adicional premium, cotizado según tu ubicación y transporte.")}</p>
              </fieldset>

<fieldset hidden={kind !== "event"} disabled={kind !== "event"} className="sol-form-group">            <fieldset className="sol-beverage-options"><legend>{t("What would you love to sip? *", "¿Qué te gustaría tomar? *")}</legend><p className="sol-field-hint">{t("Choose one or more.", "Elige una o más opciones.")}</p><div className="sol-checkboxes">{["Matcha", "Cold Brew", "Mocktails", "Not sure"].map((value) => <label key={value}><input name="beverages" type="checkbox" value={value} aria-invalid={!!errors.beverages} aria-describedby={errors.beverages ? "beverages-error" : undefined} /><span>{value === "Not sure" ? t(value, "Aún no lo sé") : translate(value)}</span></label>)}</div>{errors.beverages && <p id="beverages-error" className="sol-field-error">{errors.beverages}</p>}</fieldset>
            <Field name="flavors" label={t("Preferred flavors", "Sabores preferidos")} type="textarea" required={false} errors={errors} placeholder={t("A favorite from our menu? Tell us here.", "¿Tienes un favorito de nuestro menú? Cuéntanos.")} />
            <Link href="/menu" className="sol-text-link" target="_blank" rel="noopener noreferrer">{t("Explore the menu", "Explora el menú")} <ArrowRight size={14} /></Link>
            </fieldset>

            <fieldset hidden={kind !== "delivery"} disabled={kind !== "delivery"} className="sol-form-group"><legend>{t("Your drink selection", "Tus bebidas")}</legend><p className="sol-field-hint">{t("Choose flavors and quantities. Seasonal selections are subject to availability.", "Elige sabores y cantidades. Los sabores de temporada están sujetos a disponibilidad.")}</p>
              <div className="sol-drink-rows">{drinks.map((row, index) => <div className="sol-drink-row" key={row.id}>
                <label className="sol-field"><span>{t("Flavor", "Sabor")} {index + 1} *</span><select aria-label={t("Flavor", "Sabor") + " " + (index + 1)} value={row.flavor} onChange={(event) => updateDrink(row.id, "flavor", event.target.value)} aria-invalid={!!errors["drinks." + index + ".flavor"]} aria-describedby={errors["drinks." + index + ".flavor"] ? "drink-flavor-error-" + row.id : undefined}><option value="">{t("Choose a flavor", "Elige un sabor")}</option>{drinkChoices.map((flavor) => <option value={flavor} key={flavor}>{flavor}</option>)}</select>{errors["drinks." + index + ".flavor"] && <span className="sol-field-error" id={"drink-flavor-error-" + row.id}>{errors["drinks." + index + ".flavor"]}</span>}</label>
                <label className="sol-field"><span>{t("Qty", "Cant.")} *</span><input aria-label={t("Quantity", "Cantidad") + " " + (index + 1)} type="number" min="1" max="10000" value={row.quantity} onChange={(event) => updateDrink(row.id, "quantity", event.target.value)} aria-invalid={!!errors["drinks." + index + ".quantity"] || (index === 0 && !!errors.drinks)} aria-describedby={errors["drinks." + index + ".quantity"] ? "drink-quantity-error-" + row.id : index === 0 && errors.drinks ? "drinks-error" : undefined} />{errors["drinks." + index + ".quantity"] && <span className="sol-field-error" id={"drink-quantity-error-" + row.id}>{errors["drinks." + index + ".quantity"]}</span>}</label>
                <button type="button" className="sol-remove-drink" disabled={drinks.length === 1} aria-label={t("Remove drink", "Quitar bebida") + " " + (index + 1)} onClick={() => { setDrinks((rows) => rows.filter((item) => item.id !== row.id)); resetFeedback(); }}><Trash2 size={17} /></button>
              </div>)}</div>
              <div className="sol-drink-tools"><button type="button" className="sol-text-link" disabled={drinks.length >= 20} onClick={() => { setDrinks((rows) => [...rows, { id: nextRowId.current++, flavor: "", quantity: "1" }]); resetFeedback(); }}><Plus size={16} />{t("Add another flavor", "Agrega otro sabor")}</button><span>{totalDrinks} {t("drinks", "bebidas")} · 20 oz</span></div>
              {errors.drinks && <p id="drinks-error" className="sol-field-error" role="alert">{errors.drinks}</p>}
              <p className="sol-field-hint">{t("Five-drink minimum. Delivery is $15 within 12 miles of our service area; farther addresses receive a delivery quote before confirmation.", "Mínimo de cinco bebidas. La entrega cuesta $15 dentro de 12 millas de nuestra área de servicio; para direcciones más lejanas, cotizamos la entrega antes de confirmar.")}</p>
            </fieldset>

            <fieldset className="sol-form-group"><legend>{t("The little details", "Los pequeños detalles")}</legend><Field name="notes" label={kind === "event" ? t("Tell us about your event", "Cuéntanos sobre tu evento") : t("Anything else we should know?", "¿Algo más que debamos saber?")} type="textarea" required={false} errors={errors} placeholder={t("Personal touches, questions, or anything you’re dreaming up.", "Personalización, preguntas o cualquier idea que tengas.")} /></fieldset>

            </div>
            <div hidden={step !== 3} className={styles.stage}>
            <fieldset className="sol-form-group"><legend>{t("A little about you", "Un poquito sobre ti")}</legend><div className="sol-field-grid">
              <Field name="name" label={t("Full name", "Nombre completo")} errors={errors} autoComplete="name" />
              <Field name="email" label={t("Email", "Correo electrónico")} type="email" errors={errors} autoComplete="email" />
              <Field name="phone" label={t("Phone number", "Número de teléfono")} type="tel" errors={errors} autoComplete="tel" />
            </div></fieldset>

<p className={styles.contactNote}>{t("We’ll reply in your selected language. Your details are used to respond to this inquiry.", "Responderemos en el idioma que seleccionaste. Tus datos se usan para responder a esta consulta.")}</p>
            </div>
            <div hidden={step !== 4} className={styles.stage}>
              <div className={styles.review}>{reviewGroups.map(group => <section key={group.title}><div><h3>{group.title}</h3><button type="button" onClick={() => moveToStep(group.step)} aria-label={t("Edit ", "Editar ") + group.title}>{t("Edit", "Editar")} <ArrowRight size={12} /></button></div>{group.lines.map((line, index) => <p key={index}>{line}</p>)}</section>)}</div>
              {review?.kind === "event" && <p className={styles.feeNote}>{t("Mileage applies to every event. An assistant is required for 31+ guests (+$120). Extra service is $150/hour; an additional standard matcha flavor is $50.", "Todos los eventos incluyen un cargo por traslado. Se requiere asistente para 31+ invitados (+$120). Servicio adicional: $150/hora; sabor de matcha estándar adicional: $50.")}</p>}
            <div className="sol-inquiry-promise"><Check size={19} aria-hidden="true" /><p>{t("Your full total, including applicable fees and tax, will be shared in your personalized quote before you confirm.", "Compartiremos el total completo, incluyendo los cargos e impuestos aplicables, en tu cotización personalizada antes de confirmar.")}</p></div>
            <p className="sol-submit-note">{kind === "event" ? t("Submitting an inquiry does not reserve your event date. Dates are secured once your booking is confirmed and the required deposit has been received.", "Enviar una consulta no reserva la fecha. Tu fecha queda asegurada cuando se confirma la reserva y recibimos el depósito requerido.") : t("This is a delivery inquiry. Your order is confirmed only after we review availability and you approve the full quote.", "Esta es una consulta de entrega. El pedido se confirma después de revisar la disponibilidad y de que apruebes la cotización completa.")}</p>
            {!directSubmission && <p className="sol-submit-note">{t("We’ll prepare your inquiry as an email draft. Open it and send from your email app to complete your request.", "Prepararemos tu consulta como un borrador de correo. Ábrelo y envíalo desde tu aplicación de correo para completar tu solicitud.")}</p>}

              {kind === "event" && <BookingTerms language={language} />}
            </div>
            {Object.keys(errors).length > 0 && <p className="sol-field-error" role="alert">{t("Please check the highlighted fields before continuing.", "Revisa los campos señalados antes de continuar.")}</p>}
            <div className={styles.actions}>{step > 0 ? <button type="button" className={styles.back} onClick={() => moveToStep(step - 1)}><ArrowLeft size={15} />{t("Back", "Atrás")}</button> : <span className={styles.noPayment}>{t("No payment today", "Sin pago hoy")}</span>}<button type="submit" className="sol-button" disabled={locked}>{step < 4 ? (step === 3 ? t("Review my inquiry", "Revisar mi consulta") : t("Continue", "Continuar")) : status === "sending" ? t("Sending…", "Enviando…") : status === "sent" ? t("Inquiry sent", "Consulta enviada") : directSubmission ? t("Send my inquiry", "Enviar mi consulta") : t("Prepare email draft", "Preparar borrador")}<ArrowRight size={16} /></button></div>
            {step < 4 && <p className={styles.bottomNote}>{kind === "event" ? t("A personal quote comes next. Your date is confirmed after booking and the required payment.", "Después recibirás una cotización personal. Tu fecha se confirma al reservar y recibir el pago requerido.") : t("We’ll confirm availability and share your full quote before you approve your order.", "Confirmaremos disponibilidad y compartiremos tu cotización completa antes de que apruebes el pedido.")}</p>}
          </fieldset>
        </form>
        <div ref={resultRef} tabIndex={-1} role="status" className={status === "sent" || status === "draft" || status === "error" ? "sol-inquiry-result" : "sr-only"}>
          {status === "sent" && <><Sun size={30} strokeWidth={1} /><h3>{t("Your inquiry is on its way!", "¡Tu consulta está en camino!")}</h3><p>{t("Thank you for thinking of Casa Sol. We’ll review your details and be in touch within 2–3 business days.", "Gracias por pensar en Casa Sol. Revisaremos tus detalles y te contactaremos dentro de 2–3 días hábiles.")}</p></>}
          {(status === "draft" || status === "error") && localizedPrepared && <><Mail size={27} strokeWidth={1} /><h3>{status === "draft" ? t("One last little step.", "Un último pasito.") : t("Let’s send it another way.", "Enviémoslo de otra manera.")}</h3><p>{status === "draft" ? t("Your inquiry is ready, but hasn’t been sent yet. Open your email draft below and press send.", "Tu consulta está lista, pero aún no se ha enviado. Abre el borrador abajo y presiona enviar.") : t("We couldn’t confirm your submission. Your details are still here. You can retry or send the prepared email instead.", "No pudimos confirmar el envío. Tus detalles siguen aquí. Puedes intentar otra vez o enviar el correo preparado.")}</p><div className="sol-actions"><a className="sol-button" href={inquiryMailto(localizedPrepared)}>{t("Open email draft", "Abrir borrador")}<ArrowRight size={16} /></a><button type="button" className="sol-text-link" onClick={copyInquiry}><Copy size={15} />{copied ? t("Copied", "Copiado") : t("Copy inquiry", "Copiar consulta")}</button></div><p className="sol-small-note">{t("Send to ", "Envía a ")}<a href={"mailto:" + contactEmail}>{contactEmail}</a>. {t("We reply within 2–3 business days.", "Respondemos dentro de 2–3 días hábiles.")}</p><details><summary>{t("View your prepared inquiry", "Ver tu consulta preparada")}</summary><textarea aria-label={t("Prepared inquiry", "Consulta preparada")} readOnly rows={10} value={inquiryMessage(localizedPrepared).text} /></details></>}
        </div>

      </div>
    </section>
  </SolMotion>;
}

type FieldProps = {
  name: string; label: string; errors: Errors; type?: string; required?: boolean; wide?: boolean;
  min?: string; placeholder?: string; defaultValue?: string; options?: string[][];
  autoComplete?: HTMLInputAutoCompleteAttribute;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

function Field({ name, label, errors, type = "text", required = true, wide = false, options, ...props }: FieldProps) {
  const error = errors[name];
  const common = { name, id: name, required, "aria-invalid": !!error, "aria-describedby": error ? name + "-error" : undefined };
  return <label className={"sol-field" + (wide ? " sol-field-wide" : "")} htmlFor={name}><span>{label}{required && " *"}</span>
    {options ? <select {...common} defaultValue={props.defaultValue}>{options.map(([value, text]) => <option value={value} key={value}>{text}</option>)}</select> : type === "textarea" ? <textarea {...common} rows={3} placeholder={props.placeholder} maxLength={name === "notes" ? 2000 : 1000} /> : <input {...common} {...props} type={type} maxLength={type === "email" ? 254 : 200} />}
    {error && <span id={name + "-error"} className="sol-field-error">{error}</span>}
  </label>;
}

function WelcomeCloud() {
  return <svg viewBox="0 0 330 150" fill="none" aria-hidden="true">
    <path d="M47 121 C15 121 10 86 35 74 C25 42 67 24 88 43 C100 9 151 8 167 37 C194 14 233 29 237 54 C269 40 294 61 289 86 C323 99 311 127 283 127 H53" fill="#fffaf0" stroke="#d9c7b7" strokeWidth="1.3" />
    <path d="M42 109 C28 103 27 88 42 82 M96 46 Q103 24 127 27 M245 64 Q269 55 277 73 M74 132 Q164 142 259 133" stroke="#e6d7c6" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M46 32 l3 -9 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3Z M276 28 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2Z" fill="#ead1a7" stroke="#b49669" strokeWidth=".8" />
    <path d="M202 78 C190 67 174 85 202 101 C230 85 213 67 202 78Z" fill="#efd7d8" stroke="#bb8b90" strokeWidth="1" />
    <path d="M137 92 Q145 98 153 92" stroke="#b7be9e" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="110" cy="65" r="2" fill="#d6bd95" /><circle cx="257" cy="106" r="1.5" fill="#b8c2a1" />
  </svg>;
}
