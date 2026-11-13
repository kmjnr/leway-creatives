import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Our type scale uses named steps (text-display, text-h2, text-h3, text-lead,
 * text-body, text-small) instead of Tailwind's built-in sizes. tailwind-merge
 * does not know them, so it classifies `text-display` as a text *colour* — and
 * then silently drops it when a colour class follows, because in its model two
 * colours conflict. Teaching it the scale keeps `cn("text-display", "text-leway-dark")`
 * from losing the size.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h2", "h3", "lead", "body", "small"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
