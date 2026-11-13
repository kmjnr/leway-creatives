import { CtaButton } from "@/components/ui/CtaButton";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface PageCtaProps {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /**
   * The closing field. `mint` is already spent on the process section of a
   * page, so pages that use it there close on `dark` or `paper-2` instead.
   */
  tone?: "dark" | "mint" | "paper-2";
  /** Adds the reply promises and the direct contact routes. */
  withReplyDetail?: boolean;
  className?: string;
}

const promises = [
  "We reply within one business day",
  "A 20-minute scoping call, no deck",
  "A fixed quote before any work starts",
];

/** The closing band on interior pages: one decision, stated plainly. */
export default function PageCta({
  title,
  body,
  primary,
  secondary,
  tone = "dark",
  withReplyDetail = false,
  className,
}: PageCtaProps) {
  const dark = tone === "dark";

  return (
    <section
      aria-label="Next step"
      className={cn(
        dark ? "bg-leway-dark" : tone === "mint" ? "bg-leway-mint" : "bg-leway-paper-2",
        className,
      )}
    >
      <div className="container py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className={withReplyDetail ? "lg:col-span-7" : "lg:col-span-9"}>
            <h2
              className={cn(
                "font-display text-h2",
                dark ? "text-leway-paper" : "text-leway-dark",
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                "font-body text-lead mt-5 max-w-[58ch]",
                dark ? "text-leway-paper/75" : "text-leway-dark/70",
              )}
            >
              {body}
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-9">
              <CtaButton href={primary.href}>{primary.label}</CtaButton>
              {secondary && (
                <CtaButton href={secondary.href} variant="link">
                  {secondary.label}
                </CtaButton>
              )}
            </div>
          </div>

          {withReplyDetail && (
            <div className="lg:col-span-5 lg:pl-4">
              <ul className="flex flex-col gap-4">
                {promises.map((promise) => (
                  <li key={promise} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-[9px] w-1.5 h-1.5 rounded-full flex-shrink-0",
                        dark ? "bg-leway-paper/50" : "bg-leway-dark/40",
                      )}
                    />
                    <span
                      className={cn(
                        "font-body text-base",
                        dark ? "text-leway-paper/70" : "text-leway-dark/70",
                      )}
                    >
                      {promise}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-7">
                <a
                  href={`mailto:${site.email}`}
                  className={cn(
                    "font-body text-base py-2 underline underline-offset-4 transition-colors",
                    dark
                      ? "text-leway-paper decoration-leway-paper/40 hover:decoration-leway-paper"
                      : "text-leway-green-ink decoration-leway-green-ink/40 hover:decoration-leway-green-ink",
                  )}
                >
                  {site.email}
                </a>
                <a
                  href={site.whatsappProject}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "font-body text-base py-2 underline underline-offset-4 transition-colors",
                    dark
                      ? "text-leway-paper decoration-leway-paper/40 hover:decoration-leway-paper"
                      : "text-leway-green-ink decoration-leway-green-ink/40 hover:decoration-leway-green-ink",
                  )}
                >
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
