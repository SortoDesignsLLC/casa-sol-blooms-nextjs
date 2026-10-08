# Casa Sol Blooms

Next.js App Router website for the Casa Sol mobile beverage experience. Uses TypeScript, React and Tailwind CSS. All brand photography is served locally from `public/images`.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Routes: `/`, `/menu`, `/packages`, `/delivery`, `/book`, `/about`. Delivery details live at `/delivery`; the legacy `/#delivery` link points to the homepage delivery introduction. `/book?type=delivery` preselects delivery. Page links open at the top instantly; in-page section links still work.

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

For direct submission, configure server-only `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL` (for example `Casa Sol <hello@casasolmatcha.com>`, on the verified Resend domain), and the public `SITE_URL` (see `.env.example`). Restart/redeploy after configuring. Each submission sends two separate branded HTML and plain-text emails in one [Resend batch](https://resend.com/docs/api-reference/emails/send-batch-emails): an owner notification to `casasolmatchacoffee@gmail.com` with the client as reply-to, and a photo-led client receipt with the owner as reply-to. Both include every inquiry detail in the selected English/Spanish language. The client receipt explains response time, quoting, and event deposit or delivery confirmation steps. It does not confirm a reservation or order.

The route reports success only after Resend returns IDs for both messages. This confirms provider acceptance, not inbox delivery; check Resend for delivery/bounce status. Retrying an unchanged request uses the same batch idempotency key (Resend retains these for 24 hours), preventing duplicate messages after an interrupted response. Failed sends preserve the entered details and offer an email fallback. The automated tests mock provider responses and never send email.

Email templates live in `src/lib/inquiry-emails.ts`. Run `npm run preview:emails` to generate event/delivery, owner/client, and English/Spanish previews in the ignored `output/email-previews/` directory. Open those HTML files in a browser or serve that directory locally. The real logo and drink photo load from `SITE_URL`, so that origin must be publicly accessible. Previews use fictional details and do not send messages.

The route has same-origin checks, a honeypot, a payload limit, provider timeout, retry idempotency, and a per-instance throttle. For distributed or high-traffic deployment, configure a shared rate limit at the hosting layer.

Final totals are supplied in a personalized quote before customer confirmation. No automated checkout or tax/mileage calculation is enabled: delivery drink prices, the delivery-radius origin, event mileage rates, tax settings, and cart transport fees still need owner confirmation. The 31+ attendee assistant fee is published, without guessing whether children count toward that threshold.

Source: https://github.com/ErickSorto/casa-sol-blooms (snapshot fe75707). This copy has independent routing, build configuration and local assets.

## Link previews and icons

All pages share `public/social/casa-sol-preview.jpg` (1200 × 630) with Open Graph and Twitter image metadata. Configure the public origin with `SITE_URL` (see `.env.example`); rebuild when changing it. Messaging services need a publicly accessible deployment and may cache an older preview.

The sun favicon is maintained as `public/icon.svg`. PNG sizes and the multi-size ICO can be regenerated with `node scripts/generate-icons.mjs`. The image tooling uses Sharp, provided by Next.js.

## English and Spanish

The first response uses the browser’s `Accept-Language` preference list, including regional variants such as `es-MX` and `es-SV`. Unsupported languages fall back to English. The language toggle saves an explicit choice in the `casa-sol-language` cookie for one year; that choice takes priority on every page and subsequent visit. No location permission is needed.

Pages render in the selected language on the server, including the HTML language, metadata, image descriptions, navigation, menu, story, pricing and booking terms. This uses request-time rendering and requires the normal Next.js server. Existing URLs, query parameters and section links stay the same. Changing language refreshes the server content without remounting the inquiry, so answers and the current step are retained. Prepared email drafts and validation messages use the selected language.

Maintain Spanish copy in `src/lib/i18n/es.json`, keyed by its English source text; the inquiry and terms also contain paired English/Spanish copy. Keep drink and package names as brand names, and keep internal IDs and form values stable. When editing English copy, update its Spanish entry too. `npm test` checks language negotiation, translated inquiry drafts and translation coverage for the shared content data.
