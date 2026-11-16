"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const founder = {
  src: "/images/photography/hero-founder.webp",
  alt: "Lewis Kim, founder of LEWAY Creatives, at his desk with a finished website design open on the laptop",
  caption: "Lewis Kim — the person who scopes, designs and builds the work.",
};

/** Maximum pointer offset, in pixels, at the edge of the hero. */
const RANGE_X = 6;
const RANGE_Y = 5;

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  // Pointer parallax on the hero portrait — transform only, one frame per
  // move, and disabled for reduced-motion users. Touch devices never fire
  // mousemove, so the image simply stays still there.
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    const figure = figureRef.current;
    if (!rect || !figure) return;

    const x = (0.5 - (e.clientX - rect.left) / rect.width) * RANGE_X * 2;
    const y = (0.5 - (e.clientY - rect.top) / rect.height) * RANGE_Y * 2;

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      figure.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    });
  }, []);

  const handleLeave = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    if (figureRef.current) {
      figureRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);

  return (
    <section
      aria-label="Introduction"
      className="relative bg-leway-dark text-leway-paper overflow-hidden"
    >
      <div
        ref={sectionRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="container grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center pt-32 pb-20 lg:pt-40 lg:pb-28"
      >
        {/* Text */}
        <div className="lg:col-span-6 flex flex-col items-start gap-7">
          {/* The house mark — same gold rule the interior pages carry. */}
          <span aria-hidden="true" className="block w-10 h-[3px] rounded-pill bg-leway-gold" />

          <h1 className="font-display text-display">
            Websites that
            <br />
            win you work.
          </h1>

          <p className="font-body text-lead text-leway-paper/75 max-w-[46ch]">
            Design, copywriting, and lead generation from one senior team in
            Nairobi — for businesses in Kenya and worldwide.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2.5 rounded-pill bg-leway-green text-leway-dark font-semibold text-base px-7 min-h-[56px] hover:bg-[#1EB857] active:scale-[0.98] transition-colors"
            >
              See the work
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-pill text-leway-paper font-semibold text-base px-7 min-h-[56px] underline decoration-white/40 underline-offset-8 hover:decoration-white transition-colors"
            >
              Start a project
            </a>
          </div>

          <p className="font-body text-small text-leway-paper/70 max-w-[44ch]">
            Hospitals, retail, car hire, solar and directory products — every
            project below links to the real deployment, not a mockup.
          </p>
        </div>

        {/* The founder portrait — one photograph, the hero's parallax subject. */}
        <div className="lg:col-span-6 relative">
          <figure ref={figureRef} className="hero-parallax relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-leway-forest">
              <Image
                src={founder.src}
                alt={founder.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="photo object-cover"
              />
            </div>
            <figcaption className="mt-3 font-body text-small text-leway-paper/70 sm:text-right">
              {founder.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
