import { z } from "zod";
import { inquiryMessage, inquirySchema } from "../../../lib/inquiry";
import { contactEmail } from "../../../data/experiences";

export const runtime = "nodejs";

// A small per-instance throttle; add a shared limiter at the hosting layer for high traffic.
const attempts = new Map<string, { count: number; expires: number }>();

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "JSON required" }, { status: 415 });
  }
  let raw: unknown;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > 24000) return Response.json({ error: "Inquiry too long" }, { status: 413 });
    raw = JSON.parse(text);
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  const envelope = z.object({ requestId: z.string().uuid(), inquiry: z.unknown() }).safeParse(raw);
  if (!envelope.success) return Response.json({ error: "Invalid request" }, { status: 400 });
  const parsed = inquirySchema().safeParse(envelope.data.inquiry);
  if (!parsed.success) return Response.json({ error: "Please check your inquiry details" }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !from) return Response.json({ error: "Please use the email inquiry option" }, { status: 503 });

  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const recent = attempts.get(ip);
  if (recent && recent.count >= 5) return Response.json({ error: "Please try again shortly" }, { status: 429, headers: { "Retry-After": "60" } });
  if (attempts.size >= 10000 && !recent) return Response.json({ error: "Please try again shortly" }, { status: 429 });
  attempts.set(ip, { count: (recent?.count || 0) + 1, expires: recent?.expires || now + 60000 });

  const message = inquiryMessage(parsed.data);
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json", "Idempotency-Key": "casa-sol-inquiry/" + envelope.data.requestId },
      body: JSON.stringify({ from, to: [contactEmail], reply_to: parsed.data.email, subject: message.subject, text: message.text }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok) return Response.json({ error: "Could not confirm submission" }, { status: 502 });
    const receipt = await result.json();
    if (!receipt.id) return Response.json({ error: "Could not confirm submission" }, { status: 502 });
    return Response.json({ sent: true });
  } catch {
    return Response.json({ error: "Could not confirm submission" }, { status: 502 });
  }
}
