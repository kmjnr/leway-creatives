import Image from "next/image";
import Link from "next/link";
import { statusLabel, type Project } from "@/data/work";
import { cn } from "@/lib/utils";

interface WorkCardProps {
  project: Project;
  /**
   * Where the card leads. `internal` routes to the case study, `external` to
   * the live deployment. Both exist on the site: the homepage sends people to
   * the real thing, the work index sends them to the write-up.
   */
  to?: "internal" | "external";
  /** `lg` is the two-up treatment, `sm` the three-up one. */
  size?: "lg" | "sm";
  /** Renders "sector · type" above the name. */
  showMeta?: boolean;
  /** Hides the status label where the section heading already states it. */
  showStatus?: boolean;
  className?: string;
}

export default function WorkCard({
  project,
  to = "external",
  size = "lg",
  showMeta = false,
  showStatus = true,
  className,
}: WorkCardProps) {
  const dev = project.status === "in-development";
  const external = to === "external";

  const media = (
    <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-leway-stone">
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes={
          size === "lg"
            ? "(max-width: 1024px) 100vw, 46vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
        }
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );

  const body = (
    <>
      {showMeta && (
        <span className="block font-body text-small text-leway-dark/65">
          {project.sector} · {project.type}
        </span>
      )}

      <div
        className={cn(
          "flex items-baseline justify-between gap-4",
          showMeta ? "mt-1.5" : "mt-4",
        )}
      >
        <h3 className={cn("font-display text-leway-dark", size === "lg" ? "text-h3" : "text-xl")}>
          {project.name}
        </h3>
        {showStatus && (
          <span
            className={cn(
              "font-body text-small whitespace-nowrap",
              dev ? "text-leway-dark/65" : "text-leway-green-ink",
            )}
          >
            {statusLabel(project.status)}
          </span>
        )}
      </div>

      <p
        className={cn(
          "font-body text-base text-leway-dark/65 mt-2",
          size === "lg" ? "max-w-[52ch]" : "max-w-[46ch]",
        )}
      >
        {project.summary}
      </p>

      <span className="inline-flex items-center gap-1.5 font-body text-small text-leway-dark mt-3 underline decoration-leway-dark/40 underline-offset-4 group-hover:decoration-leway-dark transition-colors">
        {external ? (dev ? "Preview site" : "Visit site") : "Read the case study"}
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("group block rounded-card outline-offset-4", className)}
      >
        <span className="sr-only">Opens in a new tab</span>
        {media}
        {body}
      </a>
    );
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn("group block rounded-card outline-offset-4", className)}
    >
      {media}
      {body}
    </Link>
  );
}
