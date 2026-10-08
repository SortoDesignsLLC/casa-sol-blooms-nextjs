/* eslint-disable @typescript-eslint/no-require-imports -- Render the actual TypeScript templates without sending email. */
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

require.extensions[".ts"] = (module, filename) => {
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  module._compile(compiled.outputText, filename);
};
const { inquiryEmails } = require("../src/lib/inquiry-emails.ts");
const destination = path.join(__dirname, "../output/email-previews");
fs.mkdirSync(destination, { recursive: true });
const common = { name: "Sofia Rivera", email: "sofia@example.com", phone: "202-555-0142", date: "2099-11-14", time: "14:00", address: "123 Celebration Lane", city: "Washington, DC", zip: "20001", notes: "A warm, botanical celebration. Please let us know about dairy-free options.", website: "" };
const examples = [
  { ...common, kind: "event", eventType: "birthday", hours: "2", adults: 31, children: 5, package: "sol-social", setup: "cart", setting: "outdoor", beverages: ["Matcha", "Mocktails"], flavors: "Fresa Fresca, Mango Sol" },
  { ...common, kind: "delivery", business: "Rivera Studio · Suite 200", drinks: [{ flavor: "Fresa Fresca", quantity: 3 }, { flavor: "Nube de Caramelo", quantity: 2 }] },
];
const links = [];
for (const example of examples) for (const language of ["en", "es"]) {
  const messages = inquiryEmails({ ...example, language }, process.env.SITE_URL || "https://casasolmatcha.com");
  for (const [recipient, email] of Object.entries(messages)) {
    const filename = `${example.kind}-${recipient}-${language}.html`;
    fs.writeFileSync(path.join(destination, filename), email.html);
    links.push(`<li><a href="${filename}">${example.kind} · ${recipient} · ${language.toUpperCase()}</a></li>`);
  }
}
fs.writeFileSync(path.join(destination, "index.html"), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Casa Sol email previews</title><body style="margin:40px auto;padding:24px;max-width:680px;background:#fffdf7;color:#354c3e;font:18px/1.8 Georgia,serif"><h1>Casa Sol email previews</h1><p>Sample details only. These previews do not send email.</p><ul>${links.join("")}</ul></body></html>`);
console.log(`Created 8 email previews in ${destination}`);
