import Link from "next/link";

export interface Crumb {
  label: string;
  /** Omit on the current page — it renders as text, not a link. */
  href?: string;
}

/**
 * Breadcrumbs for interior pages. The last crumb is always the current page.
 * Tap targets are padded to 44px without changing the visual rhythm.
 */
export default function Breadcrumbs({
  items,
  tone = "light",
}: {
  items: Crumb[];
  /** `dark` sits on the ink and forest fields. */
  tone?: "light" | "dark";
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={
                    tone === "dark"
                      ? "font-body text-small text-leway-paper/70 py-3 hover:text-leway-paper transition-colors"
                      : "font-body text-small text-leway-dark/65 py-3 hover:text-leway-dark transition-colors"
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={
                    tone === "dark"
                      ? "font-body text-small text-leway-paper/90 py-3"
                      : "font-body text-small text-leway-dark/85 py-3"
                  }
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <span
                  aria-hidden="true"
                  className={
                    tone === "dark" ? "text-leway-paper/35" : "text-leway-dark/30"
                  }
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
