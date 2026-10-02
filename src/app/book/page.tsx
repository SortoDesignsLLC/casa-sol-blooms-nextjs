import { localizeMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/metadata";
import BookingForm from "@/components/booking-form";
import { packages } from "@/data/experiences";

const description = "Plan a Casa Sol event or request freshly prepared drink delivery in the DMV. Inquire in English or Spanish and receive a personalized quote.";
const pageMetadata: Metadata = { title: "Say Hello — Casa Sol Matcha & Coffee", description, openGraph: { ...sharedOpenGraph, title: "Say Hello — Casa Sol Matcha & Coffee", description } };

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const initialKind = query.type === "delivery" ? "delivery" : "event";
  const initialPackage = packages.some((item) => item.id === query.package) ? String(query.package) : "unsure";
  const initialSetup = query.setup === "cart" ? "cart" : "unsure";
  return <BookingForm key={[initialKind, initialPackage, initialSetup].join("-")} initialKind={initialKind} initialPackage={initialPackage} initialSetup={initialSetup} directSubmission={Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_FROM_EMAIL)} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return localizeMetadata(pageMetadata);
}
