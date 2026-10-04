import { getTranslations } from "@/lib/i18n/server";
import { Plus } from "lucide-react";

const faqs = [
  ["Where do you travel?", "All across the DMV — Maryland, DC and Northern Virginia. Ask us about anything a little further out."],
  ["How far ahead should I book?", "Two to four weeks is ideal. Requests made 14 calendar days or fewer before the event are subject to a $150 rush fee and availability. Requests within 7 days require payment in full to confirm."],
  ["Is the wooden cart included?", "Our Signature Casa Sol Setup — a branded table/drink station, menu display, and serving essentials — is included. The handcrafted wooden cart is a premium add-on, quoted for your location and transportation needs."],
  ["How do I secure my date?", "An inquiry does not reserve a date. Once your booking is confirmed, a 50% deposit secures it. The balance is due 7 days before your event; bookings within 7 days require full payment."],
];

export async function EventFaqs() {
  const t = await getTranslations();
  return <section id="faqs" className="sol-wrap py-12" aria-labelledby="faq-title">
    <p className="sol-label">{t("A little help with the details")}</p>
    <h2 id="faq-title" className="mt-4 mb-8">{t("Frequently asked questions")}</h2>
    <div className="sol-faq">{faqs.map(([question, answer]) => <details key={question}>
      <summary>{t(question)}<Plus size={18} aria-hidden="true" /></summary>
      <p>{t(answer)}</p>
    </details>)}</div>
  </section>;
}
