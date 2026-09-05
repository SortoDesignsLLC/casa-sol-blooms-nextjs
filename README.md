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

Deploy using a Next.js-compatible Node host. No environment variables are required.

## Content

- Edit drinks and seasonal flavors in `src/data/menu.ts`.
- Page content lives in `src/app`; the interactive booking page is `src/components/booking-form.tsx`.
- Shared navigation, footer and decorations live in `src/components`.
- Styling is in `src/styles.css`; the custom sun favicon is `public/icon.svg`.

The booking form validates details and opens a prefilled email in the visitor's email app. It does not send email automatically, reserve dates, or process payments.

Source: https://github.com/ErickSorto/casa-sol-blooms (snapshot fe75707). This copy has independent routing, build configuration and local assets.
