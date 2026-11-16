import Breadcrumbs, { type Crumb } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  crumbs: Crumb[];
  title: string;
  lead?: string;
  /** Buttons, chips or a stat row — sits under the lead. */
  children?: React.ReactNode;
  tone?: "paper" | "dark";
  /** `wide` lets a long lead run in two columns on large screens. */
  width?: "narrow" | "wide";
  className?: string;
}

/**
 * The shared masthead for every interior page. It carries the breadcrumbs, the
 * single h1 and the standfirst; the sections below it are page-specific, so
 * interior pages share a header without sharing an argument.
 */
export default function PageHeader({
  crumbs,
  title,
  lead,
  children,
  tone = "paper",
  width = "narrow",
  className,
}: PageHeaderProps) {
  const dark = tone === "dark";

  return (
    <header
      className={cn(
        dark ? "bg-leway-dark" : "bg-leway-paper",
        "pt-28 md:pt-36",
        className,
      )}
    >
      <div className="container">
        <Breadcrumbs items={crumbs} tone={dark ? "dark" : "light"} />

        {/* The house mark: one short gold rule, every page. */}
        <span
          aria-hidden="true"
          className="block w-10 h-[3px] rounded-pill mt-7 bg-leway-gold"
        />

        <h1
          className={cn(
            "font-display text-display mt-6",
            dark ? "text-leway-paper" : "text-leway-dark",
          )}
        >
          {title}
        </h1>

        {lead && (
          <p
            className={cn(
              "font-body text-lead mt-6 max-w-[62ch]",
              dark ? "text-leway-paper/75" : "text-leway-dark/70",
              width === "wide" && "md:max-w-[78ch]",
            )}
          >
            {lead}
          </p>
        )}

        {children && <div className="mt-9">{children}</div>}
      </div>
    </header>
  );
}
