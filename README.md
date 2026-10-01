# Casa Sol Blooms

Next.js App Router website for the Casa Sol mobile beverage experience. Uses TypeScript, React and Tailwind CSS. All brand photography is served locally from `public/images`.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Routes: `/`, `/menu`, `/packages`, `/book`, `/about`. Delivery is featured at `/#delivery`; `/book?type=delivery#inquiry` opens the delivery inquiry.

## Validate and deploy

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

Deploy using a Next.js-compatible Node host. For public link previews on a custom domain, set `SITE_URL` to the full HTTPS website URL before building. Vercel deployment URLs are detected automatically. Without either, metadata uses the local preview URL.

## Content

- Edit drinks and seasonal flavors in `src/data/menu.ts`.
- Package names, starting prices, and enhancements live in `src/data/experiences.ts`.
- Owner-approved story copy lives in `src/data/story.ts`.
- Page content lives in `src/app`; the interactive booking page is `src/components/booking-form.tsx`.
- Shared navigation, footer and decorations live in `src/components`.
- Base styling is in `src/styles.css`; the editorial layouts are in `src/experience.css` and the guided inquiry styles are in `src/components/booking-form.module.css`; the custom sun favicon is `public/icon.svg`.

The bilingual inquiry uses five steps: experience, details, drinks/package/setup, contact, and review. It supports Event or Pop-Up and Fresh Drink Delivery, retains answers when navigating back, validates each step, and offers edit links before submission. It validates exact addresses, separate adult/child counts, a two-hour event minimum, and a five-drink delivery minimum. Package and cart links preselect the matching inquiry option.

By default, submitting prepares a clearly labeled email draft addressed to casasolmatchacoffee@gmail.com. Visitors then open and send the draft themselves; copying the inquiry is also available. No date or order is confirmed by the website.

For direct submission, configure server-only `RESEND_API_KEY` and `INQUIRY_FROM_EMAIL` using a sender on a verified Resend domain (see `.env.example`). Restart/redeploy after configuring. The route sends to the fixed owner inbox with the visitor's address as reply-to and only reports success after a provider receipt. Failed sends preserve the entered details and offer an email fallback. Provider integration follows [Resend's send-email API](https://resend.com/docs/api-reference/emails/send-email). The automated tests mock provider responses and never send email.

The route has same-origin checks, a honeypot, a payload limit, provider timeout, retry idempotency, and a per-instance throttle. For distributed or high-traffic deployment, configure a shared rate limit at the hosting layer.

Final totals are supplied in a personalized quote before customer confirmation. No automated checkout or tax/mileage calculation is enabled: delivery drink prices, the delivery-radius origin, event mileage rates, tax settings, and cart transport fees still need owner confirmation. The 31+ attendee assistant fee is published, without guessing whether children count toward that threshold.

Source: https://github.com/ErickSorto/casa-sol-blooms (snapshot fe75707). This copy has independent routing, build configuration and local assets.

## Link previews and icons

All pages share `public/social/casa-sol-preview.jpg` (1200 × 630) with Open Graph and Twitter image metadata. Configure the public origin with `SITE_URL` (see `.env.example`); rebuild when changing it. Messaging services need a publicly accessible deployment and may cache an older preview.

The sun favicon is maintained as `public/icon.svg`. PNG sizes and the multi-size ICO can be regenerated with `node scripts/generate-icons.mjs`. The image tooling uses Sharp, provided by Next.js.
