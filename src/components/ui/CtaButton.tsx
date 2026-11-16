import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "link";

interface CtaButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-pill font-semibold text-base transition-all duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-leway-green text-leway-dark px-7 py-4 hover:bg-[#1EB857] min-h-[56px]",
  link: "text-current underline decoration-1 underline-offset-4 hover:decoration-2 py-3 px-1",
};

/**
 * The only button style on the site. One fill colour (Signal Green with pine
 * text), one pill radius. Links styled as text use the "link" variant.
 *
 * Internal hrefs render through next/link so navigation is client-side;
 * external, mailto and tel hrefs stay plain anchors.
 */
export function CtaButton({
  href,
  variant = "primary",
  children,
  className,
  ...props
}: CtaButtonProps) {
  const classes = cn(base, variants[variant], className);
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}

CtaButton.displayName = "CtaButton";
