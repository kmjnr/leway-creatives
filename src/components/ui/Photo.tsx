import Image from "next/image";
import { cn } from "@/lib/utils";

const RATIOS = {
  "16/10": "aspect-[16/10]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
} as const;

interface PhotoProps {
  src: string;
  alt: string;
  /** Optional caption — same treatment as the screenshot figure captions. */
  caption?: React.ReactNode;
  /** Width/height of the source image, for the img element's intrinsic ratio. */
  width?: number;
  height?: number;
  ratio?: keyof typeof RATIOS;
  sizes?: string;
  priority?: boolean;
  /** Circles the image — used for headshots. */
  round?: boolean;
  className?: string;
}

/**
 * The site's photography component. Every non-screenshot image goes through
 * here so the treatment is identical everywhere: one radius, one aspect-ratio
 * system, one caption style, one colour grade (see .photo in globals.css).
 *
 * Screenshots of live builds do NOT use this component — they are proof, not
 * atmosphere, and keep their own figure treatment.
 */
export default function Photo({
  src,
  alt,
  caption,
  width,
  height,
  ratio = "4/3",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  round = false,
  className,
}: PhotoProps) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div
        className={cn(
          "relative overflow-hidden bg-leway-stone",
          round ? "aspect-square rounded-full" : RATIOS[ratio],
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={!width}
          sizes={sizes}
          priority={priority}
          className="photo object-cover"
        />
      </div>
      {caption && (
        <figcaption
          className={cn(
            "font-body text-small text-leway-dark/65",
            round ? "mt-3 text-center" : "mt-4",
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
