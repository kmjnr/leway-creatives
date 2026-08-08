import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        /* ── Semantic aliases ─────────────────── */
        background: {
          DEFAULT: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          mint: "var(--color-bg-mint)",
          dark: "var(--color-bg-dark)",
          "dark-secondary": "var(--color-bg-dark-secondary)",
        },
        foreground: {
          DEFAULT: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          inverse: "var(--color-text-inverse)",
        },
        border: {
          DEFAULT: "var(--color-border-default)",
          strong: "var(--color-border-strong)",
          inverse: "var(--color-border-inverse)",
        },
        primary: {
          DEFAULT: "var(--color-accent-primary)",
          foreground: "var(--color-bg-primary)",
        },
        /* ── Brand palette ───────────────────── */
        leway: {
          green:  "#22C55E",  /* Signal Green  */
          dark:   "#102117",  /* Deep Pine     */
          light:  "#FAF8F2",  /* Soft Paper    */
          stone:  "#EDE7DB",  /* Warm Stone    */
          mint:   "#DDF5E6",  /* Mint Haze     */
          gold:   "#C8A65A",  /* Soft Gold     */
          forest: "#1B3327",  /* Forest Slate  */
        },

      },

      fontFamily: {
        display: ["var(--font-display)", "Fraunces", "serif"],
        body:    ["var(--font-body)",    "Outfit",   "sans-serif"],
        ui:      ["var(--font-ui)",      "Syne",     "sans-serif"],
      },

      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        "2xl":"var(--radius-2xl)",
        full: "var(--radius-full)",
        /* Named aliases */
        card:  "var(--radius-xl)",   /* 24px */
        image: "var(--radius-2xl)",  /* 32px */
        pill:  "var(--radius-full)", /* pill */
      },

      boxShadow: {
        card:  "var(--shadow-card)",
        badge: "var(--shadow-badge)",
        hover: "var(--shadow-hover)",
        green: "var(--shadow-green)",
      },

      keyframes: {
        "ripple": {
          "0%": { 
            boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.8), 0 0 0 0 rgba(34, 197, 94, 0.4), 0 0 0 0 rgba(34, 197, 94, 0.2)" 
          },
          "100%": { 
            boxShadow: "0 0 0 12px rgba(34, 197, 94, 0), 0 0 0 24px rgba(34, 197, 94, 0), 0 0 0 36px rgba(34, 197, 94, 0)" 
          },
        },
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to:   { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to:   { height: "0", opacity: "0" },
        },
      },
      animation: {
        "ripple": "ripple 2.5s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
