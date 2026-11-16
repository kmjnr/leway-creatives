# Design System: LEWAY Creatives (v2)

This document is normative. Every page — including every future page in the
multipage build — follows it. When a rule and a habit conflict, the rule wins.

## 1. The argument comes first

A section exists because it proves a claim, not because templates have that
section. The homepage order is the argument: **hero (the person behind the work)
→ selected work (the proof) → services → process → client words → FAQ →
contact.** New pages (case studies, service pages, about) must state their
claim-and-proof order before building.

The site's one idea: **the work is the proof.** Every page shows real
screenshots of live builds — never stock, never generated stand-ins, never
mockups presented as work.

## 2. Colour & roles

| Token | Hex | Role |
| --- | --- | --- |
| `leway-paper` | `#FAF8F2` | Ground. Most of every page. |
| `leway-paper-2` | `#F2EEE3` | Tone step between light sections. |
| `leway-mint` | `#DDF5E6` | The process field (one field per page). |
| `leway-stone` | `#E7E0D2` | Image wells / placeholders. |
| `leway-dark` | `#102117` | Ink; hero, proof and contact fields. |
| `leway-forest` | `#1B3327` | Panels sitting on dark fields. |
| `leway-green` | `#22C55E` | **Action fill only** — always with pine text (7.4:1). |
| `leway-green-ink` | `#0B6B3A` | Green as *text* on light surfaces (6.2:1 — passes AA). |
| `leway-gold` | `#C8A65A` | **The house mark.** One short gold rule above each page h1 (PageHeader, and the homepage hero). Nothing else on the site uses gold. |

- Never more than one action-colour surface in the first viewport.
- List markers are neutral dots — `leway-paper/50` on dark fields,
  `leway-dark/40` on light ones — never green. The one exception is the form
  success state, where green marks feedback, not action.
- Running text: `leway-dark` on light, `leway-paper` on dark; 65–75% opacity
  variants are the floor for secondary text. Anything below 50% opacity is
  decoration, not content.
- No pure white and pure black. No gradients, no glows, no glass.

## 3. Type

Two families, loaded via `next/font` (variable, `display: swap`):

- **Fraunces** (`--font-display`) — headlines and pull quotes only. Weight 600.
- **Outfit** (`--font-body`) — everything else.

Five steps, defined in `tailwind.config.ts`; do not invent others:
`text-display`, `text-h2`, `text-h3`, `text-lead`, `text-body` (17px),
`text-small` (14px — labels and metadata only, never running paragraphs).

Rules: headlines ≤ 2 lines at every width (write a title, not a sentence);
no italic/coloured accent words inside headlines; no uppercase tracked labels
(eyebrows are banned); body copy ≥ 16px.

## 4. Surfaces, radius, shadow, lines

- Sections are separated by tone steps and space — never hairlines or shadows.
- Radius: `rounded-card` (20px) for surfaces, `rounded-pill` for actions and
  chips. Nothing else.
- Shadows exist only on things that truly float: the mobile menu, the
  WhatsApp/scroll buttons. `shadow-overlay` / `shadow-overlay-sm` only.
- Focus: `:focus-visible { outline: 2px solid currentColor; offset 3px }` —
  global, already wired in `globals.css`.

## 5. Components that exist

`CtaButton` (primary / static / link), the `WorkCard` pattern (screenshot +
name + status + summary + "Visit site"), the FAQ accordion (aria-expanded +
aria-controls), the service row, and the contact form primitives (`Field`).
Compose multipage from these before inventing anything new.

## 6. Imagery

Two kinds of image, two jobs. They never swap roles.

- **Screenshots are proof.** Real screenshots of real deployments, captured at
  1440 wide, cropped to 16:10, exported as WebP q82. The pipeline is
  `scripts/capture-sites.mjs` (full-page captures of the live URLs) then
  `scripts/slice-gallery.mjs` (frames from a hand-picked offset plan, so no
  frame shows a broken or unloaded region of a live site). Every project links
  to the live URL. Status label: "Live site" or "In development" — text, no
  pulsing dots.
- **Photography is atmosphere.** Imported photography is allowed and must go
  through `src/components/ui/Photo.tsx`, which applies the single house grade
  (`.photo`: saturate 0.92, contrast 1.03) so imported images sit inside the
  paper-and-pine register. Rules:
  - Crop out any legible third-party brand name, any garbled text and any
    visible AI artefact before use — the derivative files live in
    `public/images/photography/`, built by `scripts/make-photography.mjs`.
  - Never caption a stock photograph as a member of the team or as a named
    client.
  - At most one photograph per section; screenshots and photographs are not
    mixed inside one section. The one exception is an index list of
    independent, linked entries (the five rows under "Services"), where each
    row carries exactly one image of its own discipline and none carries a
    screenshot. The list is one catalogue, not five stacked decorations.
- The hero portrait is the one photograph rendered directly in `Hero.tsx`
  rather than through `Photo.tsx`, because it is the parallax subject; it still
  carries the `.photo` grade. `scripts/make-hero.mjs` crops the GPT Image 2.5
  Flare refinement of the founder's own photograph to 16:10, 1200×750 WebP q82.
  The refinement preserves his face and shows a finished design on the laptop,
  not outline wireframes. The About page uses the supplied portrait itself as
  a square WebP. Caption both as the founder; the user confirmed the identity.
- **Generated atmosphere** obeys every photography rule above. Section images
  made with GPT Image 2.6 (Flora) are exported by `scripts/make-generated.mjs`
  into `public/images/generated/` as 1200×750 WebP q82 and always render
  through `Photo.tsx`. Prompts exclude legible text, logos and garbled
  characters; captions describe the scene and never present a generated image
  as a client build. Real build screenshots stay in their own section, so a
  generated image never stands in for proof.
- No literal-metaphor stock (no giant question marks). No fake dashboards
  presented as our own product. No image with a visible AI defect.

## 7. Motion

- Content is visible without JavaScript. Never animate from `opacity: 0` in
  SSR-rendered markup.
- Transform/opacity only; `prefers-reduced-motion` honoured globally.
- The one signature move: pointer parallax on the hero portrait. The proof
  stays still, in the work section below it.
  Feedback on hover/press everywhere else. No scroll reveals.

## 8. Accessibility contract

- Every input has a bound `<label htmlFor>`; errors use
  `aria-describedby` + `role="alert"` + focus moved on submit failure.
- Accordions and disclosures: `aria-expanded` + `aria-controls`.
- Tap targets ≥ 44px, including nav and footer links.
- Skip link in the layout; `section[id] { scroll-margin-top: 6rem }`.
- Colour contrast ≥ 4.5:1 for text — the palette table lists the two safe
  green pairings; anything else needs a measured check.

## 9. Copy

Specific, plain, active. Banned: "world-class", "unforgettable",
"seamless(ly)", "game changer", "unlock", "supercharge", the "not just X, it's
Y" construction, invented statistics, five-star rows, fake availability
badges, fake chat simulations. Claims about work always point at the work.

## 10. Multipage rules (next phase)

- IA: `/` · `/work` (+ `/work/[slug]`) · `/services` (+ 5 service pages) ·
  `/about` · `/contact`. Nav: Home · Work · Services · About · Contact.
- Each page: own `h1`, metadata, OG image, breadcrumbs; own composition —
  never a clone of the homepage section sequence.
- Per-service pages get: the problem it solves, deliverables, timeline,
  from-price, two related projects, two FAQs — shared data files
  (the `src/data/faqs.ts` pattern) so JSON-LD can never drift from the page.
- Case studies get: client, sector, problem, what we did, result, 3–6
  screenshots — from `src/data/work.ts`, one source of truth.
