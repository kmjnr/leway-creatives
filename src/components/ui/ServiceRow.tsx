import Link from "next/link";
import type { Service } from "@/data/services";
import Photo from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

interface ServiceRowProps {
  service: Service;
  /** Shows the from-price. The services index and service pages use it. */
  showPrice?: boolean;
  /** Shows the deliverable names under the summary. */
  showDeliverables?: boolean;
  /**
   * Shows the discipline illustration from service.indexImage. Used on the
   * services index, where the list is a catalogue of the five disciplines
   * rather than a wall of proof. Real build screenshots live on the service
   * and case-study pages.
   */
  showIndexImage?: boolean;
  /** Surface the row sits on, so the hover state reads as a lift. */
  tone?: "paper" | "paper-2";
  className?: string;
}

/**
 * The site's service row: no card, no number, no icon. Title, claim, the
 * concrete deliverables, and one link to the service page. The whole row is
 * clickable through a single stretched link, so there is one tab stop.
 */
export default function ServiceRow({
  service,
  showPrice = true,
  showDeliverables = true,
  showIndexImage = false,
  tone = "paper-2",
  className,
}: ServiceRowProps) {
  return (
    <li
      className={cn(
        "group relative rounded-card px-4 md:px-6 py-8 md:py-9 transition-colors",
        tone === "paper-2" ? "hover:bg-leway-paper" : "hover:bg-leway-paper-2",
        className,
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 items-start gap-x-10 gap-y-7",
          showIndexImage && "lg:grid-cols-[1fr_19rem]",
        )}
      >
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h3 className="font-display text-h3 text-leway-dark">
              <Link
                href={`/services/${service.slug}`}
                className="after:absolute after:inset-0 after:rounded-card"
              >
                {service.title}
              </Link>
            </h3>
            {showPrice && (
              <p className="font-body text-small text-leway-dark/65">
                From{" "}
                <span className="text-leway-dark">
                  {service.price.amount}
                  {service.price.suffix ?? ""}
                </span>
              </p>
            )}
          </div>

          <p className="font-body text-base text-leway-dark/70 mt-3 max-w-[62ch]">
            {service.summary}
          </p>

          {showDeliverables && (
            <p className="font-body text-small text-leway-dark/65 mt-4 max-w-[70ch]">
              {service.deliverables.join(" · ")}
            </p>
          )}

          <span className="inline-flex items-center gap-1.5 font-body text-small text-leway-dark mt-4 underline decoration-leway-dark/40 underline-offset-4 group-hover:decoration-leway-dark transition-colors">
            What this covers
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </span>
        </div>

        {showIndexImage && (
          <Photo
            src={service.indexImage.src}
            alt={service.indexImage.alt}
            caption={service.indexImage.caption}
            ratio="16/10"
            sizes="(max-width: 1024px) 100vw, 304px"
            className="lg:pt-1"
          />
        )}
      </div>
    </li>
  );
}
