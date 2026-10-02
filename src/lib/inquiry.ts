import { z } from "zod";
import { drinkChoices } from "../data/menu";
import { contactEmail, packages } from "../data/experiences";

export type InquiryLanguage = "en" | "es";
export type InquiryKind = "event" | "delivery";
export const eventTypes = [
  ["birthday", "Birthday", "Cumpleaños"],
  ["shower", "Bridal or baby shower", "Despedida de soltera o baby shower"],
  ["wedding", "Wedding", "Boda"],
  ["corporate", "Corporate or workplace event", "Evento corporativo o de trabajo"],
  ["community", "School or community event", "Evento escolar o comunitario"],
  ["popup", "Market / pop-up", "Mercado / pop-up"],
  ["other", "Other", "Otro"],
] as const;

export function todayISO(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  return ["year", "month", "day"].map((type) => parts.find((part) => part.type === type)?.value).join("-");
}

export function daysUntil(date: string, today = todayISO()) {
  return Math.round((Date.parse(date + "T00:00:00Z") - Date.parse(today + "T00:00:00Z")) / 86400000);
}

export function inquirySchema(language: InquiryLanguage = "en") {
  const es = language === "es";
  const required = es ? "Completa este campo." : "Please complete this field.";
  const text = (max: number) => z.string({ required_error: required }).trim().min(1, required).max(max, es ? "Acorta un poco este texto." : "Please shorten this text.");
  const count = (min: number) => z.preprocess((value) => value === "" || value === undefined ? undefined : Number(value), z.number({ required_error: required, invalid_type_error: required }).int(es ? "Usa un número entero." : "Use a whole number.").min(min, es ? "Revisa esta cantidad." : "Please check this quantity.").max(10000, es ? "Revisa esta cantidad." : "Please check this quantity."));
  const date = text(10).regex(/^\d{4}-\d{2}-\d{2}$/, es ? "Elige una fecha válida." : "Choose a valid date.").refine((value) => {
    const parsed = new Date(value + "T12:00:00Z");
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value && value >= todayISO();
  }, es ? "Elige hoy o una fecha futura." : "Choose today or a future date.");
  const common = {
    name: text(100),
    email: text(254).email(es ? "Ingresa un correo válido." : "Enter a valid email address."),
    phone: text(40).refine((v) => v.replace(/\D/g, "").length >= 7, es ? "Ingresa un teléfono válido." : "Enter a valid phone number."),
    language: z.enum(["en", "es"]),
    date,
    time: text(5).regex(/^([01]\d|2[0-3]):[0-5]\d$/, es ? "Elige una hora válida." : "Choose a valid time."),
    address: text(200),
    city: text(100),
    zip: text(10).regex(/^\d{5}(-\d{4})?$/, es ? "Ingresa un código postal válido." : "Enter a valid ZIP code."),
    notes: z.string().trim().max(2000, es ? "Acorta un poco este texto." : "Please shorten this text.").default(""),
    website: z.string().max(0).default(""),
  };
  return z.discriminatedUnion("kind", [
    z.object({
      ...common, kind: z.literal("event"),
      eventType: text(40).refine((v) => eventTypes.some((t) => t[0] === v), required),
      hours: z.enum(["2", "3", "extended"], { errorMap: () => ({ message: required }) }),
      adults: count(1),
      children: z.preprocess((v) => v === "" || v === undefined ? undefined : Number(v), z.number({ invalid_type_error: required }).int(es ? "Usa un número entero." : "Use a whole number.").min(0, es ? "Revisa esta cantidad." : "Please check this quantity.").max(10000, es ? "Revisa esta cantidad." : "Please check this quantity.").optional()),
      package: z.string().refine((v) => v === "unsure" || packages.some((p) => p.id === v), required),
      setup: z.enum(["signature", "cart", "unsure"]),
      setting: z.enum(["indoor", "outdoor", "unsure"]),
      beverages: z.array(z.enum(["Matcha", "Cold Brew", "Mocktails", "Not sure"])).min(1, es ? "Elige al menos una opción." : "Choose at least one option.").max(4),
      flavors: z.string().trim().max(1000, es ? "Acorta un poco este texto." : "Please shorten this text.").default(""),
    }),
    z.object({
      ...common, kind: z.literal("delivery"),
      business: z.string().trim().max(200).default(""),
      drinks: z.array(z.object({
        flavor: text(100).refine((v) => drinkChoices.includes(v), es ? "Elige un sabor del menú." : "Choose a flavor from the menu."),
        quantity: count(1),
      })).min(1, es ? "Elige al menos una bebida." : "Choose at least one drink.").max(20, es ? "Elige un máximo de 20 sabores." : "Choose no more than 20 flavors.").refine((items) => items.reduce((sum, item) => sum + item.quantity, 0) >= 5, es ? "El pedido mínimo es de 5 bebidas." : "Delivery has a five-drink minimum."),
    }),
  ]);
}

export type Inquiry = z.infer<ReturnType<typeof inquirySchema>>;

export function inquiryMessage(data: Inquiry) {
  const es = data.language === "es";
  const t = (en: string, spanish: string) => es ? spanish : en;
  const beverage = (value: string) => ({ "Cold Brew": t("Cold Brew", "Café frío"), Mocktails: t("Mocktails", "Cócteles sin alcohol"), "Not sure": t("Not sure", "Aún no lo sé") })[value] || value;
  const lines = [
    t("Inquiry: ", "Consulta: ") + (data.kind === "event" ? t("Event or Pop-Up", "Evento o Pop-Up") : t("Fresh Drink Delivery", "Entrega de bebidas frescas")),
    t("Name: ", "Nombre: ") + data.name, t("Email: ", "Correo: ") + data.email, t("Phone: ", "Teléfono: ") + data.phone,
    t("Preferred language: ", "Idioma de preferencia: ") + (es ? "Español" : "English"),
    (data.kind === "event" ? t("Event date: ", "Fecha del evento: ") : t("Delivery date: ", "Fecha de entrega: ")) + data.date,
    t("Requested start / delivery time: ", "Hora de inicio / entrega solicitada: ") + data.time,
    t("Address: ", "Dirección: ") + data.address + ", " + data.city + ", " + data.zip,
  ];
  if (data.kind === "event") {
    lines.push(
      t("Event type: ", "Tipo de evento: ") + (eventTypes.find((type) => type[0] === data.eventType)?.[es ? 2 : 1] || data.eventType),
      t("Service duration: ", "Duración del servicio: ") + (data.hours === "extended" ? t("More than 3 hours", "Más de 3 horas") : data.hours + t(" hours", " horas")),
      t("Adult guests: ", "Adultos: ") + data.adults, t("Children: ", "Niños: ") + (data.children ?? t("Not provided", "Sin especificar")),
      t("Setting: ", "Lugar: ") + (es ? { indoor: "Interior", outdoor: "Exterior", unsure: "Por definir" }[data.setting] : data.setting),
      t("Package: ", "Paquete: ") + (packages.find((p) => p.id === data.package)?.name || t("Not sure", "Por definir")),
      t("Setup: ", "Montaje: ") + ({ signature: t("Signature Casa Sol Setup — included", "Montaje clásico Casa Sol — incluido"), cart: t("Casa Sol Wooden Cart Experience — premium add-on", "Carrito de madera Casa Sol — adicional premium"), unsure: t("Not sure", "Por definir") }[data.setup]),
      t("Beverage categories: ", "Tipos de bebidas: ") + data.beverages.map(beverage).join(", "),
      t("Preferred flavors: ", "Sabores preferidos: ") + (data.flavors || t("To discuss", "Por definir")),
    );
  } else {
    lines.push(t("Business / suite / floor: ", "Negocio / oficina / piso: ") + (data.business || t("Not provided", "Sin especificar")), t("Drink size: 20 ounces", "Tamaño de las bebidas: 20 onzas"), t("Requested drinks:", "Bebidas solicitadas:"));
    data.drinks.forEach((item) => lines.push("  " + item.quantity + " × " + item.flavor));
    lines.push(t("Total drinks: ", "Total de bebidas: ") + data.drinks.reduce((sum, item) => sum + item.quantity, 0));
  }
  lines.push(t("Additional details: ", "Detalles adicionales: ") + (data.notes || t("None", "Ninguno")), "", t("Please share availability and the full quote, including applicable fees and tax, before confirmation. This inquiry does not reserve a date or confirm an order.", "Por favor, compartan la disponibilidad y la cotización completa, incluyendo cargos e impuestos aplicables, antes de confirmar. Esta consulta no reserva una fecha ni confirma un pedido."));
  return {
    subject: es ? "Consulta de " + (data.kind === "event" ? "evento" : "entrega") + " Casa Sol — " + data.date : "Casa Sol " + (data.kind === "event" ? "event" : "delivery") + " inquiry — " + data.date,
    text: lines.join("\n"),
  };
}

export function inquiryMailto(data: Inquiry) {
  const message = inquiryMessage(data);
  return "mailto:" + contactEmail + "?subject=" + encodeURIComponent(message.subject) + "&body=" + encodeURIComponent(message.text);
}
