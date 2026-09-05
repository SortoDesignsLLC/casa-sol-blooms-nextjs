import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/metadata";
export const metadata: Metadata = {
  "title": "Book Us — Casa Sol Matcha & Coffee",
  "description": "Request Casa Sol for your wedding, shower, birthday or pop-up in the DMV. Share your date, location and guest count and we'll be in touch.",
  "openGraph": {
    ...sharedOpenGraph,
    "title": "Book Us — Casa Sol Matcha & Coffee",
    "description": "Request Casa Sol for your wedding, shower, birthday or pop-up in the DMV. Share your date, location and guest count and we'll be in touch."
  }
};
import BookPage from "@/components/booking-form";
export default function Page() { return <BookPage />; }
