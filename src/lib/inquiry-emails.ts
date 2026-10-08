import { contactEmail, packages } from "../data/experiences";
import { eventTypes, inquiryMessage, type Inquiry } from "./inquiry";

type Detail = [label: string, value: string | number];
type Section = { title: string; rows: Detail[] };

function escape(value: string | number) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function inquiryEmailOrigin() {
  // Never build email links from an untrusted request Host or Origin header.
  const configured = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (!configured) throw new Error("Set SITE_URL for email images and links");
  const url = new URL(configured.includes("://") ? configured : `https://${configured}`);
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error("Invalid SITE_URL");
  return url.origin;
}

export function inquiryEmails(data: Inquiry, origin: string) {
  const es = data.language === "es";
  const t = (en: string, spanish: string) => es ? spanish : en;
  const event = data.kind === "event";
  const date = new Intl.DateTimeFormat(es ? "es-US" : "en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${data.date}T12:00:00Z`));
  const time = new Intl.DateTimeFormat(es ? "es-US" : "en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(`${data.date}T${data.time}:00Z`));
  const experience = event ? t("Event or Pop-Up", "Evento o Pop-Up") : t("Fresh Drink Delivery", "Entrega de bebidas frescas");
  const sections: Section[] = [
    { title: t("Your contact details", "Tus datos de contacto"), rows: [
      [t("Name", "Nombre"), data.name], [t("Email", "Correo"), data.email], [t("Phone", "Teléfono"), data.phone],
      [t("Preferred language", "Idioma de preferencia"), es ? "Español" : "English"],
    ] },
    { title: t("Date & place", "Fecha y lugar"), rows: [
      [t("Experience", "Experiencia"), experience], [t("Requested date", "Fecha solicitada"), date],
      [t("Requested time", "Hora solicitada"), `${time} · ${t("local to your venue", "hora local del lugar")}`],
      [t("Address", "Dirección"), `${data.address}, ${data.city}, ${data.zip}`],
    ] },
  ];
  if (data.kind === "event") {
    sections.push({ title: t("The celebration", "La celebración"), rows: [
      [t("Event type", "Tipo de evento"), eventTypes.find(item => item[0] === data.eventType)?.[es ? 2 : 1] || data.eventType],
      [t("Service duration", "Duración del servicio"), data.hours === "extended" ? t("More than 3 hours", "Más de 3 horas") : data.hours + t(" hours", " horas")],
      [t("Adult guests", "Adultos"), data.adults], [t("Children", "Niños"), data.children ?? t("Not provided", "Sin especificar")],
      [t("Setting", "Lugar"), { indoor: t("Indoor", "Interior"), outdoor: t("Outdoor", "Exterior"), unsure: t("To discuss", "Por definir") }[data.setting]],
      [t("Package", "Paquete"), packages.find(item => item.id === data.package)?.name || t("Help me choose", "Ayúdame a elegir")],
      [t("Setup", "Montaje"), { signature: t("Signature Casa Sol Setup · included", "Montaje clásico Casa Sol · incluido"), cart: t("Casa Sol Wooden Cart · premium add-on", "Carrito de madera Casa Sol · adicional premium"), unsure: t("Help me choose", "Ayúdame a elegir") }[data.setup]],
      [t("Beverages", "Bebidas"), data.beverages.map(value => ({ Matcha: "Matcha", "Not sure": t("Not sure", "Aún no lo sé"), "Cold Brew": t("Cold Brew", "Café frío"), Mocktails: t("Mocktails", "Cócteles sin alcohol") })[value]).join(", ")],
      [t("Preferred flavors", "Sabores preferidos"), data.flavors || t("To discuss", "Por definir")],
    ] });
  } else {
    sections[1].rows.push([t("Business / suite / floor", "Negocio / oficina / piso"), data.business || t("Not provided", "Sin especificar")]);
    sections.push({ title: t("Your drinks", "Tus bebidas"), rows: [
      [t("Drink size", "Tamaño de las bebidas"), t("20 ounces each", "20 onzas cada una")],
      ...data.drinks.map((item): Detail => [item.flavor, `${item.quantity} × 20 oz`]),
      [t("Total drinks", "Total de bebidas"), data.drinks.reduce((sum, item) => sum + item.quantity, 0)],
    ] });
  }
  sections.push({ title: t("The little details", "Los pequeños detalles"), rows: [[t("Additional details", "Detalles adicionales"), data.notes || t("None added", "Sin detalles adicionales")]] });

  const disclaimer = event
    ? t("This is a request, not a confirmed booking. Your date is secured only after availability is confirmed and the required payment is received.", "Esta es una solicitud, no una reserva confirmada. Tu fecha se asegura solo después de confirmar la disponibilidad y recibir el pago requerido.")
    : t("This is a request, not a confirmed order. We’ll confirm availability, delivery details, and your full total before you approve your order.", "Esta es una solicitud, no un pedido confirmado. Confirmaremos disponibilidad, detalles de entrega y el total completo antes de que apruebes tu pedido.");
  const steps = [
    t("We’ll review your details and reply personally within 2–3 business days.", "Revisaremos tus detalles y te responderemos personalmente dentro de 2–3 días hábiles."),
    t("You’ll receive a personalized quote with all applicable fees and tax. We’ll work through any little details together.", "Recibirás una cotización personalizada con los cargos e impuestos aplicables. Afinaremos juntos los pequeños detalles."),
    event
      ? t("Once availability and your quote are agreed, a 50% deposit secures your booking. The balance is due 7 days before your event; bookings within 7 days require full payment.", "Una vez acordadas la disponibilidad y la cotización, un depósito del 50% asegura tu reserva. El saldo vence 7 días antes del evento; las reservas dentro de 7 días requieren el pago completo.")
      : t("After you approve your quote, we’ll arrange payment and confirm your delivery. Your drinks will be made fresh for you.", "Después de aprobar tu cotización, coordinaremos el pago y confirmaremos tu entrega. Prepararemos tus bebidas frescas para ti."),
  ];
  const customerTitle = t("A lovely beginning.", "Un bonito comienzo.");
  const customerIntro = t(`Hi ${data.name}, thank you for inviting a little Casa Sol into your day. We’ve received your request, and we can’t wait to hear more.`, `Hola ${data.name}, gracias por invitar un poquito de Casa Sol a tu día. Recibimos tu solicitud y nos encantará conocer más.`);
  const ownerTitle = event ? t("A new celebration awaits.", "Una nueva celebración.") : t("Fresh sips, new request.", "Bebidas frescas, nueva solicitud.");
  const ownerIntro = t(`${data.name} sent a ${event ? "booking" : "delivery"} request. Review the details below and reply with availability and a personalized quote within 2–3 business days.`, `${data.name} envió una solicitud de ${event ? "reserva" : "entrega"}. Revisa los detalles y responde con disponibilidad y una cotización personalizada dentro de 2–3 días hábiles.`);
  const detailsHtml = sections.map(section => `<h2 style="margin:28px 0 10px;font-family:Georgia,serif;font-size:23px;font-weight:normal;color:#354c3e;">${escape(section.title)}</h2><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;table-layout:fixed;border-collapse:collapse;">${section.rows.map(([label, value]) => `<tr><td class="detail-label" width="38%" valign="top" style="width:38%;padding:11px 12px 11px 0;border-bottom:1px solid #e6e1d5;font-size:12px;line-height:19px;color:#696c60;">${escape(label)}</td><td valign="top" style="padding:11px 0;border-bottom:1px solid #e6e1d5;font-size:14px;line-height:21px;color:#354c3e;overflow-wrap:anywhere;word-break:break-word;">${escape(value).replace(/\r?\n/g, "<br>")}</td></tr>`).join("")}</table>`).join("");
  const stepHtml = `<h2 style="margin:0 0 18px;font-family:Georgia,serif;font-size:27px;font-weight:normal;">${t("What happens next", "Los próximos pasos")}</h2><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps.map((step, index) => `<tr><td width="34" valign="top" style="padding:0 12px 20px 0;color:#7c8665;font-family:Georgia,serif;font-size:22px;">0${index + 1}</td><td style="padding:0 0 20px;font-size:14px;line-height:23px;">${escape(step)}</td></tr>`).join("")}</table>`;

  function html(customer: boolean) {
    const title = customer ? customerTitle : ownerTitle;
    const intro = customer ? customerIntro : ownerIntro;
    const preheader = customer ? t("Your Casa Sol request is in. Here’s a copy of your details and what comes next.", "Recibimos tu solicitud Casa Sol. Aquí están tus detalles y los próximos pasos.") : `${experience} · ${date} · ${data.name}`;
    const reply = customer ? contactEmail : data.email;
    return `<!doctype html><html lang="${data.language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escape(title)}</title><style>@media only screen and (max-width:620px){.outer{padding:12px 0!important}.pad{padding-left:24px!important;padding-right:24px!important}.headline{font-size:36px!important}.detail-label{width:36%!important}}</style></head>
<body style="margin:0;padding:0;background:#eeeee5;color:#354c3e;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;"><div style="display:none;font-size:1px;line-height:1px;color:#eeeee5;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escape(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#eeeee5"><tr><td class="outer" align="center" style="padding:36px 12px;">
<!--[if mso]><table role="presentation" width="600"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fffdf7;border-top:5px solid #889575;">
<tr><td align="center" bgcolor="#ffffff" style="padding:28px 24px 24px;"><a href="${escape(origin)}" style="text-decoration:none;"><img src="${escape(origin)}/images/casa-sol-logo-full.jpg" width="190" height="116" alt="Casa Sol — Matcha & Coffee" style="display:block;width:190px;height:auto;border:0;color:#354c3e;font-family:Georgia,serif;"></a></td></tr>
<tr><td class="pad" style="padding:32px 44px 30px;"><p style="margin:0 0 16px;font-size:10px;line-height:17px;letter-spacing:2px;text-transform:uppercase;color:#697756;">${customer ? t("A little sunshine, on its way", "Un poquito de sol, en camino") : t("New inquiry · Casa Sol", "Nueva consulta · Casa Sol")}</p><h1 class="headline" style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:43px;line-height:1.12;font-weight:normal;letter-spacing:-1px;">${title}</h1><p style="margin:0;font-size:15px;line-height:25px;">${escape(intro)}</p></td></tr>
${customer ? `<tr><td><img src="${escape(origin)}/images/drinks.jpg" width="600" height="456" alt="${t("Fresh Casa Sol matcha drinks with flowers on soft blush linen", "Bebidas frescas de matcha Casa Sol con flores sobre lino rosa")}" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></td></tr><tr><td align="center" bgcolor="#f6e6e5" style="padding:17px 24px;font-family:Georgia,serif;font-size:18px;font-style:italic;">${t("Made with care. Shared with love.", "Hecho con cariño. Compartido con amor.")}</td></tr>` : ""}
<tr><td class="pad" style="padding:28px 44px 12px;"><p style="margin:0 0 8px;font-size:10px;line-height:18px;letter-spacing:2px;text-transform:uppercase;color:#697756;">${t("Request received", "Solicitud recibida")}</p><p style="margin:0;font-family:Georgia,serif;font-size:25px;line-height:33px;">${escape(experience)}<br><span style="font-family:Arial,Helvetica,sans-serif;font-size:14px;">${escape(date)} · ${escape(time)}</span></p>${detailsHtml}</td></tr>
<tr><td class="pad" style="padding:24px 44px 32px;"><p style="margin:0;padding:17px 20px;background:#f0f1e7;border-left:3px solid #889575;font-size:13px;line-height:22px;">${escape(disclaimer)}</p></td></tr>
${customer ? `<tr><td class="pad" bgcolor="#f0f1e7" style="padding:30px 44px 12px;">${stepHtml}</td></tr>` : ""}
<tr><td class="pad" align="center" style="padding:32px 44px;"><p style="margin:0 0 20px;font-size:14px;line-height:23px;">${customer ? t("A new idea or a little change? Just reply to this email. We’re here for it.", "¿Una nueva idea o un pequeño cambio? Responde a este correo. Estamos para ayudarte.") : t("The client receives a separate copy with their details and next steps. Reply below to start the conversation.", "El cliente recibe una copia por separado con sus detalles y los próximos pasos. Responde abajo para iniciar la conversación.")}</p><table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" bgcolor="#354c3e" style="border-radius:3px;mso-padding-alt:16px 28px;"><a href="mailto:${escape(reply)}" style="display:inline-block;padding:16px 28px;font-size:13px;color:#ffffff;text-decoration:none;">${customer ? t("A little note to Casa Sol", "Una notita para Casa Sol") : t("Reply to the client", "Responder al cliente")}</a></td></tr></table><p style="margin:24px 0 0;font-family:Georgia,serif;font-size:23px;font-style:italic;">${t("With a little sunshine,", "Con un poquito de sol,")}<br>Casa Sol</p></td></tr>
<tr><td align="center" bgcolor="#e4e8d9" style="padding:24px 18px;font-size:11px;line-height:20px;color:#4d6049;"><strong>CASA SOL · MATCHA & COFFEE</strong><br>${t("Made for your moments. Serving the DMV.", "Para tus momentos. En el área del DMV.")}<br><a href="mailto:${contactEmail}" style="color:#354c3e;text-decoration:underline;">${contactEmail}</a><br><a href="${escape(origin)}" style="color:#354c3e;text-decoration:underline;">${t("Visit Casa Sol", "Visita Casa Sol")}</a></td></tr>
</table><!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`;
  }

  const detailsText = sections.map(section => section.title + "\n" + section.rows.map(([label, value]) => `${label}: ${value}`).join("\n")).join("\n\n");
  return {
    owner: { subject: inquiryMessage(data).subject, html: html(false), text: `${ownerIntro}\n\n${detailsText}\n\n${disclaimer}\n\n${t("Reply to", "Responder a")}: ${data.email}` },
    customer: {
      subject: t("We received your Casa Sol request", "Recibimos tu solicitud Casa Sol") + ` — ${data.date}`,
      html: html(true),
      text: `${customerIntro}\n\n${detailsText}\n\n${disclaimer}\n\n${t("What happens next", "Los próximos pasos")}\n${steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}\n\n${t("Need to change something? Reply to this email.", "¿Necesitas cambiar algo? Responde a este correo.")}\n${contactEmail}\n${origin}`,
    },
  };
}
