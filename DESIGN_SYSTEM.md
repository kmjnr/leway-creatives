# Design System: LEWAY Creatives

## 1. Visual Theme & Atmosphere
A warm, approachable, and highly professional interface that balances trust with modern creative energy. The atmosphere feels like a collaborative, high-end agency workspace—clean and structured, yet deeply inviting. It shifts away from aggressive dark-mode "exclusive" aesthetics toward a softer, warmer foundation utilizing airy layouts, highly diffused shadows, and friendly, high-x-height serif typography.
- **Density:** Daily App Balanced (4-5) - Content breathes with generous whitespace.
- **Variance:** Offset Asymmetric (5-6) - Clean grids with deliberate asymmetric focal points (like Z-pattern layouts and bento boxes) to prevent boredom.
- **Motion:** Fluid CSS (5-6) - Soft, spring-physics hovers and gentle scroll-interpolated fade-ups. Not chaotic.

## 2. Color Palette & Roles
- **Soft Paper (#FAF8F2)** — Primary background surface. The core of the warm, approachable feel. Replaces harsh pure white.
- **Warm Stone (#EDE7DB)** — Secondary background surface. Used for cards, panels, and layered depth.
- **Deep Pine (#102117)** — Primary text and high-contrast anchor blocks (like the Hero section background). Replaces pure black.
- **Forest Slate (#1B3327)** — Secondary dark depth. Used for dark supporting backgrounds and deep gradients.
- **Signal Green (#22C55E)** — Primary accent. Used for CTAs, active states, focus rings, and high-visibility highlights.
- **Mint Haze (#DDF5E6)** — Soft utility accent. Used for soft highlights, badge backgrounds, and visual relief around icons.
- **Soft Gold (#C8A65A)** — Premium accent. Used extremely sparingly for refined details, statistics, and small structural dividers.
- **Warm Grey (#D8D3C7)** — Neutral structural line. Used for borders, form fields, and subtle dividers.

*(Note: Maximum 1 primary bright accent. The palette remains strictly within this warm/green/gold ecosystem. No purple, neon, or cool-grey fluctuations.)*

## 3. Typography Rules
- **Display: Fraunces** — Track-tight, controlled scale. Friendly, high-x-height soft serif used strictly for H1/H2 headlines and large statistics. It communicates approachability and editorial polish.
- **Body: Outfit** — Relaxed leading (1.6+), 65ch max-width. Extremely clean, readable sans-serif used for all paragraphs, descriptions, and functional text.
- **UI / Accents: Syne** — Used selectively for small category labels, tags, and uppercase eyebrow text. Spaced carefully.
- **Banned Fonts:** Inter, Arial, Times New Roman, Georgia. Generic serifs are banned; Fraunces is specifically chosen for its character.

## 4. Component Stylings (Optimized for Reuse)
To ensure maximum reusability across the site, all UI elements must be built as abstracted, isolated React components. Do not repeat long strings of Tailwind utility classes inline across pages.
* **Buttons (`<Button>`):** Fully rounded pills (`rounded-full`) with generous padding (`px-6 py-3`). Primary uses **Signal Green** fill with **Deep Pine** text (for WCAG contrast). Tactile feedback: `-translate-y-[1px]` or `scale-[0.98]` on active. "Button-in-button" nested trailing arrow wrapper where applicable.
* **Cards & Containers (`<Card>`):** Generously rounded corners (`rounded-2xl` or `2rem`). They employ the "Double-Bezel" technique: a subtle outer shell border (`ring-1 ring-black/5`) with an inner core background (**Warm Stone** or **White**). Highly diffused, soft ambient shadows (`shadow-sm` or `shadow-md`).
* **Inputs:** Label above, error below. Focus ring in **Signal Green**. No floating labels. Backgrounds use **Warm Stone** or **White** depending on the surface.
* **Badges/Tags (`<Badge>`):** Pill-shaped, small uppercase text. Background **Mint Haze**, text **Deep Pine**.
* **Imagery (`<OptimizedImage>`):** All images must have matching rounded corners (`rounded-2xl`). No sharp-edged photography unless full-bleed. Images should feel warm, human, and collaborative.

## 5. Layout & Responsive Principles
The design system is strictly built to be **Mobile-First** and bulletproof across all viewports.
- **Strict Mobile Collapse:** All multi-column layouts (Grid, Flex) must stack cleanly to a single column (`w-full`, `px-4`) below the `md` breakpoint (`< 768px`). Horizontal scrolling is considered a critical failure.
- **Touch Targets:** All interactive elements must have a minimum `44px` tap target size to ensure accessibility on mobile devices.
- **Grid-First Architecture:** Rely on CSS Grid for service blocks and features. Avoid complex flexbox percentage math.
- **Whitespace (Macro):** Layouts must breathe. Use `py-24` to `py-32` for section vertical padding on desktop, scaling down to `py-16` on mobile via `clamp()`.
- **Viewport Stability:** Full-height sections must use `min-h-[100dvh]`, never `h-screen`, to prevent catastrophic layout jumping on iOS Safari.

## 6. Motion & Interaction
- **Spring Physics Default:** Use custom cubic-beziers or spring physics for all interactions. No linear easing.
- **Scroll Interpolation:** Elements enter the viewport with a gentle fade-up (`translate-y-12 opacity-0` to `translate-y-0 opacity-100`). No element should appear statically on load.
- **Performance:** Animate exclusively via `transform` and `opacity`. Never animate layout-triggering properties (`top`, `left`, `width`, `height`).

## 7. Performance, Speed & SEO (Web-Vitals Guardrails)
- **Image Optimization:** All visual assets must be delivered in **.webp** format and processed through Next.js `<Image>` component to ensure lazy loading, strict width/height dimensions (preventing Cumulative Layout Shift - CLS), and responsive `srcset` generation.
- **Component Lazy Loading:** Below-the-fold components must be dynamically imported (`next/dynamic`) to reduce the initial JavaScript payload and achieve lightning-fast First Contentful Paint (FCP).
- **Semantic HTML:** The DOM tree must enforce strict structural meaning for SEO bots. 
  - Only one `<h1>` per page. 
  - Use `<section>`, `<article>`, and `<nav>` tags rather than generic `<div>`s.
- **Font Optimization:** All fonts (`Fraunces`, `Outfit`, `Syne`) are loaded via `next/font` with `display: swap` to prevent Flash of Invisible Text (FOIT) without render-blocking the page load.

## 8. Anti-Patterns (Banned)
- **No Aggressive / Fear-Mongering Copy:** Do not use confrontational language ("Your brand looks like an amateur"). Keep tone collaborative and expert.
- **No Forced Dark Mode:** The site defaults to light/warm modes. Do not invert sections unexpectedly.
- **No Pure Black or Pure White:** Use **Deep Pine (#102117)** and **Soft Paper (#FAF8F2)** instead.
- **No Generic Drop Shadows:** Harsh, dark, high-opacity shadows are banned. Use soft, diffused, color-tinted shadows.
- **No Emojis:** Use clean, consistent SVG icons (e.g., Phosphor Icons) rendered in brand colors.
- **No 3-Column Equal Grids Overuse:** Do not use basic 3-column rows repetitively. Mix with Bento or asymmetrical layouts.
- **No AI Purple / Neon Glows:** Stick strictly to the green/gold/warm ecosystem.
- **No Fake "Tech" UI:** Do not build fake dashboards with HTML divs. Use high-quality generated images (WebP) or actual portfolio screenshots.
