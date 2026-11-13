import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        leway: {
          green:       "#22C55E", /* action fill — always with pine text     */
          "green-ink": "#0B6B3A", /* green text on light surfaces (WCAG AA)  */
          dark:        "#102117", /* Deep Pine — ink and dark fields         */
          forest:      "#1B3327", /* Forest Slate — panels on dark fields    */
          paper:       "#FAF8F2", /* Soft Paper — ground                     */
          "paper-2":   "#F2EEE3", /* tone step between light sections        */
          stone:       "#E7E0D2", /* image wells                             */
          mint:        "#DDF5E6", /* process field                           */
          gold:        "#C8A65A", /* reserve — at most one small use a page  */
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Fraunces", "serif"],
        body:    ["var(--font-body)", "Outfit", "sans-serif"],
      },
      fontSize: {
        /* The whole site uses these five steps and nothing else. */
        display: ["clamp(2.75rem, 2rem + 4.2vw, 5.25rem)", { lineHeight: "1.0",  letterSpacing: "-0.035em" }],
        h2:      ["clamp(2rem, 1.65rem + 1.7vw, 3.25rem)",   { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        h3:      ["clamp(1.375rem, 1.2rem + 0.7vw, 1.875rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        lead:    ["clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", { lineHeight: "1.6" }],
        body:    ["1.0625rem", { lineHeight: "1.65" }],
        small:   ["0.875rem", { lineHeight: "1.55" }],
      },
      borderRadius: {
        card: "1.25rem",
        image: "1.25rem",
        pill: "9999px",
      },
      boxShadow: {
        /* Resting elements carry no shadow — only overlays. */
        overlay: "0 16px 48px rgba(16, 33, 23, 0.20)",
        "overlay-sm": "0 8px 24px rgba(16, 33, 23, 0.16)",
      },
    },
  },
  plugins: [],
} satisfies Config;
