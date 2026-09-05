"use client";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarHeart, MapPin, Users, Sparkles, Heart, Mail, Phone } from "lucide-react";



const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Please add a valid email").max(255),
  phone: z.string().trim().max(30).optional(),
  date: z.string().trim().min(1, "Please choose a date"),
  time: z.string().trim().max(60).optional(),
  location: z.string().trim().min(1, "Where is the event?").max(200),
  eventType: z.string().trim().min(1, "What kind of event is it?").max(100),
  guests: z.string().trim().min(1, "Estimated guest count").max(20),
  hours: z.string().trim().max(40).optional(),
  drinks: z.string().trim().max(500).optional(),
  notes: z.string().trim().max(1000).optional(),
});

const steps = [
  {
    icon: Sparkles,
    title: "Pick your vibe",
    text: "Tell us your date, your drinks and how many sips you need.",
  },
  {
    icon: MapPin,
    title: "We come to you",
    text: "We roll in with the cart, set up and style everything for you.",
  },
  {
    icon: Heart,
    title: "Sip & celebrate",
    text: "Your guests get handcrafted matcha and cold brew all event long.",
  },
];

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/40";

export default function BookPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    const d = parsed.data;
    const body = [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone || "-"}`,
      `Event date: ${d.date}`,
      `Start time: ${d.time || "-"}`,
      `Location: ${d.location}`,
      `Event type: ${d.eventType}`,
      `Guest count: ${d.guests}`,
      `Hours of service: ${d.hours || "-"}`,
      `Drink preferences: ${d.drinks || "-"}`,
      `Customization requests: ${d.notes || "-"}`,
    ].join("\n");

    window.location.href = `mailto:casasolmatchacoffee@gmail.com?subject=${encodeURIComponent(
      `Event inquiry — ${d.eventType} on ${d.date}`,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    toast.success("Your inquiry is ready to send — just hit send in your email app.");
  }

  return (
    <div className="bg-surface-cream">
      <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="text-center">
        <p className="eyebrow">Let&apos;s Celebrate</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Book Casa Sol</h1>
        <p className="font-script mt-2 text-3xl text-primary">for your next event</p>
        <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
          Weddings, corporate events, birthdays, bridal &amp; baby showers, pop-ups and private
          parties — anywhere in the DMV.
        </p>
      </div>

      <ol className="mt-12 grid gap-5 sm:grid-cols-3">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="rounded-[1.75rem] border border-border/70 bg-card p-6 text-center shadow-luxe"
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent">
              <s.icon size={24} className="text-primary" />
            </div>
            <p className="eyebrow mt-4">Step {i + 1}</p>
            <h2 className="mt-1 text-xl">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {s.text.replace("&amp;", "&")}
            </p>
          </li>
        ))}
      </ol>

      <form
        onSubmit={handleSubmit}
        className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-9"
      >
        <h2 className="text-2xl">Tell us about your event</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Please inquire 2–4 weeks in advance. Last-minute bookings may be accepted based on
          availability.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="Your name" name="name" error={errors["name"]} placeholder="Maria Sorto" />
          <Field
            label="Email"
            name="email"
            type="email"
            error={errors["email"]}
            placeholder="you@email.com"
          />
          <Field label="Phone (optional)" name="phone" error={errors["phone"]} placeholder="301-000-0000" />
          <Field label="Event date" name="date" type="date" error={errors["date"]} />
          <Field label="Start time" name="time" type="time" error={errors["time"]} />
          <Field label="Hours of service" name="hours" error={errors["hours"]} placeholder="3 hours" />
          <Field
            label="Event location"
            name="location"
            error={errors["location"]}
            placeholder="City, venue or address"
          />
          <Field
            label="Event type"
            name="eventType"
            error={errors["eventType"]}
            placeholder="Wedding, birthday, pop-up…"
          />
          <Field label="Estimated guests" name="guests" error={errors["guests"]} placeholder="75" />
        </div>

        <div className="mt-5">
          <label htmlFor="drinks" className="text-sm text-foreground">Drink preferences</label>
          <textarea
            id="drinks"
            name="drinks"
            rows={3}
            placeholder="Fresa Fresca, Nube de Caramelo, a custom flavor…"
            className={fieldClass}
          />
        </div>

        <div className="mt-5">
          <label htmlFor="notes" className="text-sm text-foreground">Customization requests</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Colors, signage, cup stickers, anything you're dreaming up."
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
        >
          <CalendarHeart size={16} /> Send my inquiry
        </button>

        {sent && (
          <p className="mt-4 text-center text-sm text-secondary-foreground">
            Your inquiry is ready. Send it from your email app to request availability.
          </p>
        )}
      </form>

      <div className="mt-8 rounded-3xl bg-secondary/50 p-7 text-center">
        <Users size={20} className="mx-auto text-secondary-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">
          Sending an inquiry doesn&apos;t hold your date. Your event is officially secured once
          we&apos;ve confirmed availability and received your 50% deposit — the remaining balance is
          due 7 days before your event.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 text-sm sm:flex-row sm:justify-center sm:gap-8">
        <a href="tel:3018353714" className="inline-flex items-center gap-2 hover:text-primary">
          <Phone size={15} className="text-primary" /> 301-835-3714
        </a>
        <a
          href="mailto:casasolmatchacoffee@gmail.com"
          className="inline-flex items-center gap-2 break-all hover:text-primary"
        >
          <Mail size={15} className="text-primary" /> casasolmatchacoffee@gmail.com
        </a>
      </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-foreground">{children}</span>;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string | undefined;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input type={type} name={name} placeholder={placeholder} className={fieldClass} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} />
      {error && <span id={`${name}-error`} className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
