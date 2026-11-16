# LEWAY Creatives

Marketing and portfolio site for LEWAY Creatives, a design and development
studio in Nairobi. Built with Next.js 16 (App Router), React 18, TypeScript and
Tailwind CSS.

Live site: https://lewaycreatives.com

## Getting started

```sh
npm install
cp .env.local.example .env.local   # then fill in the Callmebot credentials
npm run dev                        # http://localhost:3000
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `CALLMEBOT_PHONE` | yes (production) | WhatsApp number that receives enquiries, with country code |
| `CALLMEBOT_APIKEY` | yes (production) | API key issued by the Callmebot bot |

Without these, the contact form returns a configuration error and logs a
warning; every other page still works.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config, `eslint-config-next`) |
| `npx tsc --noEmit` | Type check |

## Project structure

```
src/
  app/                 routes (App Router)
    api/contact/       enquiry endpoint (validation + rate limit + WhatsApp)
    services/[slug]/   one page per service, statically generated
    work/[slug]/       one page per case study, statically generated
    sitemap.ts         /sitemap.xml, generated from the data files
  components/          page sections and shared UI
    ui/                WorkCard, ServiceRow, Photo, FaqList, Breadcrumbs, CtaButton
  data/                single source of truth for content
  lib/                 metadata + JSON-LD helpers, class-name utility
public/                images, robots.txt, llms.txt, OG image
scripts/               image pipeline and QA helpers (not shipped)
```

## Content conventions

`src/data/` is the only place content lives. Pages, navigation, JSON-LD,
`sitemap.xml` and the footer all read from it, so a new service or project
cannot appear in one place and be missing from another.

- `site.ts` — identity, contact routes, reply promises, content date.
- `services.ts` — five services: page copy, deliverables, timeline, price,
  images, related projects, FAQs.
- `work.ts` — ten projects: case-study copy, screenshots, status, services.
- `faqs.ts` — the general FAQ.
- `contact.ts` — the form's option lists, shared with the API route.

`DESIGN_SYSTEM.md` is normative for layout, colour, type, imagery and copy.

## Deployment

The site deploys to Netlify via `@netlify/plugin-nextjs` (`netlify.toml`).
Set the environment variables above in the Netlify dashboard before the first
deploy. Security headers are defined in `next.config.mjs`.

## Notes

- Screenshots in `public/images/work/` are real captures of the deployments,
  produced by `scripts/capture-sites.mjs` and `scripts/slice-gallery.mjs`.
- `public/llms.txt` summarises the studio for AI answer engines.
- The contact route keeps an in-memory rate limit per instance; it is a burst
  guard, not a distributed quota.
