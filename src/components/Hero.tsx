"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

const founder = {
  src: "/images/photography/hero-founder.webp",
  alt: "Lewis Kim, founder of LEWAY Creatives, at his desk with a finished website design open on the laptop",
  caption: "Lewis Kim — the person who scopes, designs and builds the work.",
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Pointer parallax on the hero portrait — transform only, disabled for
  // reduced-motion users and on touch (no mousemove events fire).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const imageX = useTransform(sx, [-0.5, 0.5], reduceMotion ? [0, 0] : [6, -6]);
  const imageY = useTransform(sy, [-0.5, 0.5], reduceMotion ? [0, 0] : [5, -5]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      aria-label="Introduction"
      className="relative bg-leway-dark text-leway-paper overflow-hidden"
    >
      <div
        ref={ref}
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
            project below links to the live site, not a mockup.
          </p>
        </div>

        {/* The founder portrait — one photograph, the hero's parallax subject. */}
        <div className="lg:col-span-6 relative">
          <motion.figure style={{ x: imageX, y: imageY }} className="relative">
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
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
