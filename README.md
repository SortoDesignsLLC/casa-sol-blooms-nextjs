# Casa Sol Blooms

Next.js App Router copy of the Casa Sol matcha and coffee cart website. Uses TypeScript, React and Tailwind CSS. All brand photography is served locally from `public/images`.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Routes: `/`, `/menu`, `/book`, `/about`.

## Validate and deploy

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Deploy using a Next.js-compatible Node host. For public link previews on a custom domain, set `SITE_URL` to the full HTTPS website URL before building. Vercel deployment URLs are detected automatically. Without either, metadata uses the local preview URL.

## Content

- Edit drinks and seasonal flavors in `src/data/menu.ts`.
- Page content lives in `src/app`; the interactive booking page is `src/components/booking-form.tsx`.
- Shared navigation, footer and decorations live in `src/components`.
- Styling is in `src/styles.css`; the custom sun favicon is `public/icon.svg`.

The booking form validates details and opens a prefilled email in the visitor's email app. It does not send email automatically, reserve dates, or process payments.

Source: https://github.com/ErickSorto/casa-sol-blooms (snapshot fe75707). This copy has independent routing, build configuration and local assets.

## Link previews and icons

All four pages share `public/social/casa-sol-preview.jpg` (1200 × 630) with Open Graph and Twitter image metadata. Configure the public origin with `SITE_URL` (see `.env.example`); rebuild when changing it. Messaging services need a publicly accessible deployment and may cache an older preview.

The sun favicon is maintained as `public/icon.svg`. PNG sizes and the multi-size ICO can be regenerated with `node scripts/generate-icons.mjs`. The image tooling uses Sharp, provided by Next.js.
