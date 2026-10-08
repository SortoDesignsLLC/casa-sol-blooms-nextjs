/* eslint-disable @typescript-eslint/no-require-imports -- Compile the shared TypeScript validation and route with the existing TypeScript dependency. */
const { test, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const { randomUUID } = require("node:crypto");

const previousLoader = require.extensions[".ts"];
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  module._compile(compiled.outputText, filename);
};
const { inquirySchema, inquiryMessage, inquiryMailto, daysUntil, todayISO } = require("../src/lib/inquiry.ts");
const { POST } = require("../src/app/api/inquiry/route.ts");
const { inquiryEmails, inquiryEmailOrigin } = require("../src/lib/inquiry-emails.ts");

const base = {
  name: "Test Guest", email: "guest@example.com", phone: "202-555-0100", language: "en",
  date: "2099-10-10", time: "14:00", address: "123 Example Street", city: "Washington",
  zip: "20001", notes: "Test inquiry only", website: "",
};
const event = { ...base, kind: "event", eventType: "birthday", hours: "2", adults: "31", children: "5", package: "sol-social", setup: "signature", setting: "indoor", beverages: ["Matcha", "Mocktails"], flavors: "Fresa Fresca" };
const delivery = { ...base, kind: "delivery", business: "Example Office, floor 2", drinks: [{ flavor: "Fresa Fresca", quantity: "3" }, { flavor: "Nube de Caramelo", quantity: "2" }] };
const oldFetch = global.fetch;
const oldKey = process.env.RESEND_API_KEY;
const oldFrom = process.env.INQUIRY_FROM_EMAIL;
const oldSite = process.env.SITE_URL;
process.env.SITE_URL = "https://casasol.example";
after(() => {
  global.fetch = oldFetch;
  if (oldKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = oldKey;
  if (oldFrom === undefined) delete process.env.INQUIRY_FROM_EMAIL; else process.env.INQUIRY_FROM_EMAIL = oldFrom;
  if (oldSite === undefined) delete process.env.SITE_URL; else process.env.SITE_URL = oldSite;
  if (previousLoader) require.extensions[".ts"] = previousLoader; else delete require.extensions[".ts"];
});

test("event inquiry preserves adults and children separately and all selected beverages", () => {
  const result = inquirySchema().parse(event);
  assert.equal(result.adults, 31);
  assert.equal(result.children, 5);
  assert.deepEqual(result.beverages, ["Matcha", "Mocktails"]);
  const text = inquiryMessage(result).text;
  assert.match(text, /Adult guests: 31/);
  assert.match(text, /Children: 5/);
  assert.match(text, /Package: Sol Social/);
  assert.match(text, /Beverage categories: Matcha, Mocktails/);
  assert.match(inquiryMailto(result), /^mailto:casasolmatchacoffee@gmail.com\?/);
});

test("event minimum, required fields, dates, and whole guest counts are enforced", () => {
  for (const patch of [
    { hours: "1" }, { adults: "" }, { adults: "3.5" }, { adults: "-1" },
    { date: "2000-01-01" }, { date: "2099-02-30" }, { date: "bad" },
    { time: "25:00" }, { phone: "" }, { address: "" }, { city: "" }, { zip: "abc" },
    { beverages: [] }, { eventType: "unknown" }, { website: "spam.example" },
  ]) assert.equal(inquirySchema().safeParse({ ...event, ...patch }).success, false, JSON.stringify(patch));
  assert.equal(inquirySchema().parse({ ...event, children: "" }).children, undefined);
  assert.equal(inquirySchema().parse({ ...event, hours: "extended" }).hours, "extended");
});

test("delivery totals combine rows, reject fewer than five and invalid quantities", () => {
  const parsed = inquirySchema().parse(delivery);
  assert.equal(parsed.drinks.reduce((sum, row) => sum + row.quantity, 0), 5);
  assert.match(inquiryMessage(parsed).text, /Business \/ suite \/ floor: Example Office, floor 2/);
  assert.match(inquiryMessage(parsed).text, /3 × Fresa Fresca/);
  for (const drinks of [
    [{ flavor: "Fresa Fresca", quantity: "4" }],
    [{ flavor: "Fresa Fresca", quantity: "-5" }],
    [{ flavor: "Fresa Fresca", quantity: "5.5" }],
    [{ flavor: "Unknown", quantity: "5" }],
    [{ flavor: "Fresa Fresca", quantity: "" }],
  ]) assert.equal(inquirySchema().safeParse({ ...delivery, drinks }).success, false);
});

test("validation is localized, and the service calendar follows the DMV timezone", () => {
  const error = inquirySchema("es").safeParse({ ...event, name: "" });
  assert.equal(error.success, false);
  assert.match(error.error.issues[0].message, /Completa/);
  assert.equal(todayISO(new Date("2026-10-01T01:00:00Z")), "2026-09-30");
  assert.equal(daysUntil("2026-11-02", "2026-10-31"), 2);
  assert.equal(daysUntil("2026-10-14", "2026-09-30"), 14);
  assert.equal(daysUntil("2026-10-07", "2026-09-30"), 7);
});

function request(inquiry = event, extra = {}) {
  return new Request("https://casasol.example/api/inquiry", {
    method: "POST", headers: { "Content-Type": "application/json", origin: "https://casasol.example", "x-forwarded-for": randomUUID(), ...extra },
    body: JSON.stringify({ requestId: randomUUID(), inquiry }),
  });
}

test("the route refuses cross-origin and invalid data before contacting a provider", async () => {
  global.fetch = async () => { throw new Error("Provider must not be contacted"); };
  assert.equal((await POST(request(event, { origin: "https://other.example" }))).status, 403);
  assert.equal((await POST(request({ ...event, adults: "" }))).status, 400);
  assert.equal((await POST(request(event, { "Content-Type": "text/plain" }))).status, 415);
  const malformed = new Request("https://casasol.example/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" });
  assert.equal((await POST(malformed)).status, 400);
});

test("missing provider configuration returns unavailable, never a false success", async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.INQUIRY_FROM_EMAIL;
  assert.equal((await POST(request())).status, 503);
});

test("provider errors and missing receipts do not claim the inquiry was sent", async () => {
  process.env.RESEND_API_KEY = "test-only";
  process.env.INQUIRY_FROM_EMAIL = "Casa Sol <inquiries@example.com>";
  global.fetch = async () => Response.json({ error: "Unavailable" }, { status: 500 });
  assert.equal((await POST(request())).status, 502);
  global.fetch = async () => Response.json({});
  assert.equal((await POST(request())).status, 502);
  global.fetch = async () => { throw new Error("Timeout"); };
  assert.equal((await POST(request())).status, 502);
});

test("successful delivery sends private owner and client emails with opposite reply-to addresses", async () => {
  process.env.RESEND_API_KEY = "test-only";
  process.env.INQUIRY_FROM_EMAIL = "Casa Sol <inquiries@example.com>";
  let captured;
  global.fetch = async (url, options) => {
    captured = { url, options, body: JSON.parse(options.body) };
    return Response.json({ data: [{ id: "owner-receipt" }, { id: "client-receipt" }] });
  };
  const result = await POST(request(delivery));
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { sent: true });
  assert.equal(captured.url, "https://api.resend.com/emails/batch");
  assert.equal(captured.body.length, 2);
  const [owner, client] = captured.body;
  assert.deepEqual(owner.to, ["casasolmatchacoffee@gmail.com"]);
  assert.equal(owner.reply_to, "guest@example.com");
  assert.deepEqual(client.to, ["guest@example.com"]);
  assert.equal(client.reply_to, "casasolmatchacoffee@gmail.com");
  assert.match(captured.options.headers["Idempotency-Key"], /^casa-sol-inquiry-pair\//);
  for (const email of [owner, client]) {
    assert.equal(email.from, process.env.INQUIRY_FROM_EMAIL);
    assert.equal(email.cc, undefined);
    assert.match(email.text, /Total drinks: 5/);
    assert.match(email.html, /https:\/\/casasol.example\/images\/casa-sol-logo-full.jpg/);
  }
  assert.match(client.html, /images\/drinks.jpg/);
  assert.match(client.text, /What happens next/);
  assert.match(client.text, /not a confirmed order/);
  assert.doesNotMatch(client.text, /50% deposit/);
});

test("both provider receipts are required, including on HTTP 200 responses", async () => {
  for (const payload of [{ data: [{ id: "owner-only" }] }, { data: [{ id: "owner" }, {}] }, { data: [{ id: "owner" }, { id: "" }] }]) {
    global.fetch = async () => Response.json(payload);
    assert.equal((await POST(request())).status, 502);
  }
});

test("retrying a timed-out request reuses the exact batch and idempotency key", async () => {
  const initial = request();
  const retry = initial.clone();
  const attempts = [];
  global.fetch = async (_url, options) => {
    attempts.push(options);
    if (attempts.length === 1) throw new Error("Response lost");
    return Response.json({ data: [{ id: "owner" }, { id: "client" }] });
  };
  assert.equal((await POST(initial)).status, 502);
  assert.equal((await POST(retry)).status, 200);
  assert.equal(attempts[0].headers["Idempotency-Key"], attempts[1].headers["Idempotency-Key"]);
  assert.equal(attempts[0].body, attempts[1].body);
});

test("email templates preserve every event detail, escape visitor HTML, and localize both languages", () => {
  for (const language of ["en", "es"]) {
    const data = inquirySchema(language).parse({ ...event, language, name: 'Alex <img src=x onerror="alert(1)">', notes: "First line\n<script>bad</script> & more" });
    const emails = inquiryEmails(data, "https://casasol.example");
    for (const email of [emails.owner, emails.customer]) {
      for (const value of [data.email, data.phone, data.address, data.city, data.zip, "31", "5", "Sol Social", "Fresa Fresca", "Matcha"]) assert.ok(email.html.includes(value), value);
      assert.match(email.html, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
      assert.match(email.html, /First line<br>&lt;script&gt;bad&lt;\/script&gt; &amp; more/);
      assert.doesNotMatch(email.html, /<script>|<img src=x/);
      assert.match(email.html, new RegExp(`lang="${language}"`));
    }
    assert.match(emails.customer.text, language === "es" ? /depósito del 50%/ : /50% deposit/);
    assert.match(emails.customer.text, language === "es" ? /no una reserva confirmada/ : /not a confirmed booking/);
    assert.match(emails.customer.html, language === "es" ? /Los próximos pasos/ : /What happens next/);
  }
});

test("Spanish delivery receipt includes flavor quantities, business, and delivery-specific next steps", () => {
  const emails = inquiryEmails(inquirySchema("es").parse({ ...delivery, language: "es" }), "https://casasol.example");
  for (const email of [emails.owner, emails.customer]) {
    assert.match(email.text, /Fresa Fresca: 3 × 20 oz/);
    assert.match(email.text, /Nube de Caramelo: 2 × 20 oz/);
    assert.match(email.text, /Total de bebidas: 5/);
    assert.match(email.text, /Example Office, floor 2/);
  }
  assert.match(emails.customer.text, /confirmaremos tu entrega/);
  assert.doesNotMatch(emails.customer.text, /depósito del 50%/);
});

test("email URLs use the configured origin and reject unsafe URL schemes", () => {
  process.env.SITE_URL = "https://casasol.example/path";
  assert.equal(inquiryEmailOrigin(), "https://casasol.example");
  process.env.SITE_URL = "javascript://bad";
  assert.throws(inquiryEmailOrigin);
  process.env.SITE_URL = "https://casasol.example";
});

test("guided steps validate the current choice without blocking on later contact fields", () => {
  const { inquiryStepErrors, inquiryFieldStep } = require("../src/lib/inquiry-steps.ts");
  const incomplete = inquirySchema().safeParse({ ...event, date: "", name: "", email: "", phone: "", beverages: [] });
  assert.deepEqual(inquiryStepErrors(incomplete, 0), {});
  assert.deepEqual(Object.keys(inquiryStepErrors(incomplete, 1)), ["date"]);
  assert.deepEqual(Object.keys(inquiryStepErrors(incomplete, 2)), ["beverages"]);
  for (const step of [3, 4]) {
    const errors = inquiryStepErrors(incomplete, step);
    for (const key of ["date", "name", "email", "phone", "beverages"]) assert.ok(errors[key]);
  }
  assert.equal(inquiryFieldStep("drinks.1.quantity"), 2);
  assert.equal(inquiryFieldStep("package"), 2);
});

test("delivery step enforces the five-drink minimum before collecting contact details", () => {
  const { inquiryStepErrors } = require("../src/lib/inquiry-steps.ts");
  const partial = { ...delivery, name: "", email: "", phone: "", drinks: [{ flavor: "Fresa Fresca", quantity: "4" }] };
  assert.match(inquiryStepErrors(inquirySchema().safeParse(partial), 2).drinks, /five-drink/);
  const fixed = { ...partial, drinks: delivery.drinks };
  assert.deepEqual(inquiryStepErrors(inquirySchema().safeParse(fixed), 2), {});
  assert.deepEqual(inquiryStepErrors(inquirySchema().safeParse(delivery), 4), {});
});

test("language negotiation respects saved choices, regional tags, weights and fallbacks", () => {
  const { resolveLocale } = require("../src/lib/i18n/locale.ts");
  assert.equal(resolveLocale(undefined, "es-MX,es;q=0.9,en;q=0.8"), "es");
  assert.equal(resolveLocale(undefined, "es;q=0.5,en-US;q=0.9"), "en");
  assert.equal(resolveLocale(undefined, "fr-CA,es-SV;q=0.8,en;q=0.5"), "es");
  assert.equal(resolveLocale(undefined, "EN-gb,es;q=0.9"), "en");
  assert.equal(resolveLocale(undefined, "es;q=0,en;q=0.5"), "en");
  assert.equal(resolveLocale(undefined, "es;q=bad,en;q=0.5"), "en");
  assert.equal(resolveLocale(undefined, "fr-FR,de;q=0.8"), "en");
  assert.equal(resolveLocale(undefined, null), "en");
  assert.equal(resolveLocale("en", "es-MX"), "en");
  assert.equal(resolveLocale("es", "en-US"), "es");
  assert.equal(resolveLocale("invalid", "es-SV"), "es");
});

test("Spanish email drafts preserve inquiry details and translate event and delivery labels", () => {
  const spanishEvent = inquiryMessage(inquirySchema("es").parse({ ...event, language: "es" }));
  assert.match(spanishEvent.subject, /Consulta de evento Casa Sol/);
  assert.match(spanishEvent.text, /Adultos: 31/);
  assert.match(spanishEvent.text, /Tipo de evento: Cumpleaños/);
  assert.match(spanishEvent.text, /Tipos de bebidas: Matcha, Cócteles sin alcohol/);
  assert.match(spanishEvent.text, /Paquete: Sol Social/);
  const spanishDelivery = inquiryMessage(inquirySchema("es").parse({ ...delivery, language: "es" }));
  assert.match(spanishDelivery.text, /Total de bebidas: 5/);
  assert.match(spanishDelivery.text, /3 × Fresa Fresca/);
  assert.match(spanishDelivery.text, /Esta consulta no reserva una fecha ni confirma un pedido/);
});

test("Spanish dictionary covers menu descriptions, story and experience data", () => {
  const dictionary = require("../src/lib/i18n/es.json");
  const { menu, seasonal } = require("../src/data/menu.ts");
  const { story } = require("../src/data/story.ts");
  const { packages, enhancements } = require("../src/data/experiences.ts");
  const copy = [...story, ...menu.flatMap(group => [group.title, group.note, ...group.items.map(item => item.description)]), ...seasonal.map(item => item.description), ...packages.flatMap(item => [item.description, item.guests]), ...enhancements.flatMap(item => [item.title, item.description, item.price])];
  for (const text of copy) assert.ok(dictionary[text], "Missing translation: " + text);
});
