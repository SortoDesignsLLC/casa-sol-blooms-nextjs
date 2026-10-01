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
  const count = (min: number) => z.preprocess((value) => value === "" || value === undefined ? undefined : Number(value), z.number({ required_error: required, invalid_type_error: required }).int(es ? "Usa un número entero." : "Use a whole number.").min(min, es ? "Revisa esta cantidad." : "Please check this quantity.").max(10000));
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
    notes: z.string().trim().max(2000).default(""),
    website: z.string().max(0).default(""),
  };
  return z.discriminatedUnion("kind", [
    z.object({
      ...common, kind: z.literal("event"),
      eventType: text(40).refine((v) => eventTypes.some((t) => t[0] === v), required),
      hours: z.enum(["2", "3", "extended"], { errorMap: () => ({ message: required }) }),
      adults: count(1),
      children: z.preprocess((v) => v === "" || v === undefined ? undefined : Number(v), z.number().int().min(0).max(10000).optional()),
      package: z.string().refine((v) => v === "unsure" || packages.some((p) => p.id === v), required),
      setup: z.enum(["signature", "cart", "unsure"]),
      setting: z.enum(["indoor", "outdoor", "unsure"]),
      beverages: z.array(z.enum(["Matcha", "Cold Brew", "Mocktails", "Not sure"])).min(1, es ? "Elige al menos una opción." : "Choose at least one option.").max(4),
      flavors: z.string().trim().max(1000).default(""),
    }),
    z.object({
      ...common, kind: z.literal("delivery"),
      business: z.string().trim().max(200).default(""),
      drinks: z.array(z.object({
        flavor: text(100).refine((v) => drinkChoices.includes(v), es ? "Elige un sabor del menú." : "Choose a flavor from the menu."),
        quantity: count(1),
      })).min(1).max(20).refine((items) => items.reduce((sum, item) => sum + item.quantity, 0) >= 5, es ? "El pedido mínimo es de 5 bebidas." : "Delivery has a five-drink minimum."),
    }),
  ]);
}

export type Inquiry = z.infer<ReturnType<typeof inquirySchema>>;

export function inquiryMessage(data: Inquiry) {
  const lines = [
    "Inquiry: " + (data.kind === "event" ? "Event or Pop-Up" : "Fresh Drink Delivery"),
    "Name: " + data.name, "Email: " + data.email, "Phone: " + data.phone,
    "Preferred language: " + (data.language === "es" ? "Español" : "English"),
    (data.kind === "event" ? "Event" : "Delivery") + " date: " + data.date,
    "Requested start / delivery time: " + data.time,
    "Address: " + data.address + ", " + data.city + ", " + data.zip,
  ];
  if (data.kind === "event") {
    lines.push(
      "Event type: " + (eventTypes.find((type) => type[0] === data.eventType)?.[1] || data.eventType),
      "Service duration: " + (data.hours === "extended" ? "More than 3 hours" : data.hours + " hours"),
      "Adult guests: " + data.adults, "Children: " + (data.children ?? "Not provided"),
      "Setting: " + data.setting,
      "Package: " + (packages.find((p) => p.id === data.package)?.name || "Not sure"),
      "Setup: " + ({ signature: "Signature Casa Sol Setup — included", cart: "Casa Sol Wooden Cart Experience — premium add-on", unsure: "Not sure" }[data.setup]),
      "Beverage categories: " + data.beverages.join(", "),
      "Preferred flavors: " + (data.flavors || "To discuss"),
    );
  } else {
    lines.push("Business / suite / floor: " + (data.business || "Not provided"), "Drink size: 20 ounces", "Requested drinks:");
    data.drinks.forEach((item) => lines.push("  " + item.quantity + " × " + item.flavor));
    lines.push("Total drinks: " + data.drinks.reduce((sum, item) => sum + item.quantity, 0));
  }
  lines.push("Additional details: " + (data.notes || "None"), "", "Please share availability and the full quote, including applicable fees and tax, before confirmation. This inquiry does not reserve a date or confirm an order.");
  return {
    subject: "Casa Sol " + (data.kind === "event" ? "event" : "delivery") + " inquiry — " + data.date,
    text: lines.join("\n"),
  };
}

export function inquiryMailto(data: Inquiry) {
  const message = inquiryMessage(data);
  return "mailto:" + contactEmail + "?subject=" + encodeURIComponent(message.subject) + "&body=" + encodeURIComponent(message.text);
}
