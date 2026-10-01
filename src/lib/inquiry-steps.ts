import type { SafeParseReturnType } from "zod";
import type { Inquiry } from "./inquiry";

// Keep the full inquiry mounted; validate only the visible step until final review.
const fields = [
  ["kind"],
  ["date", "time", "eventType", "hours", "adults", "children", "setting", "address", "city", "zip", "business"],
  ["package", "setup", "beverages", "flavors", "drinks", "notes"],
  ["name", "email", "phone", "language"],
];

export function inquiryFieldStep(path: string) {
  const index = fields.findIndex(group => group.includes(path.split(".")[0]));
  return index < 0 ? 3 : index;
}

export function inquiryStepErrors(parsed: SafeParseReturnType<unknown, Inquiry>, step: number) {
  const errors: Record<string, string> = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      // On the contact step, re-check previous steps before producing the review.
      if (step >= 3 || inquiryFieldStep(path) === step) errors[path] = issue.message;
    }
  }
  return errors;
}
