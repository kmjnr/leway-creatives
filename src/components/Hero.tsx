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
import { featuredProjects } from "@/data/work";

const mainShot = featuredProjects[0];
const sideShot = featuredProjects[1];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Pointer parallax on the work collage — transform only, disabled for
  // reduced-motion users and on touch (no mousemove events fire).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const mainX = useTransform(sx, [-0.5, 0.5], reduceMotion ? [0, 0] : [5, -5]);
  const mainY = useTransform(sy, [-0.5, 0.5], reduceMotion ? [0, 0] : [4, -4]);
  const sideX = useTransform(sx, [-0.5, 0.5], reduceMotion ? [0, 0] : [-12, 12]);
  const sideY = useTransform(sy, [-0.5, 0.5], reduceMotion ? [0, 0] : [-8, 8]);

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
            screenshot on this page is the live site, not a mockup.
          </p>
        </div>

        {/* Work collage — real client builds, pointer parallax */}
        <div className="lg:col-span-6 relative pb-10 sm:pb-14 lg:pb-0">
          <motion.figure style={{ x: mainX, y: mainY }} className="relative z-10">
            <div className="rounded-[1.5rem] bg-leway-paper p-2.5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem]">
                <Image
                  src={mainShot.image}
                  alt={mainShot.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <figcaption className="mt-3 font-body text-small text-leway-paper/70 sm:text-right">
              {mainShot.name} — Nairobi hospital, client build
            </figcaption>
          </motion.figure>

          <motion.figure
            style={{ x: sideX, y: sideY }}
            className="absolute -bottom-2 sm:-bottom-6 -left-2 sm:-left-10 z-20 w-[52%] sm:w-[46%] hidden sm:block"
          >
            <div className="rounded-[1.25rem] bg-leway-paper p-2">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[0.75rem]">
                <Image
                  src={sideShot.image}
                  alt={sideShot.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 30vw, 18vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <figcaption className="mt-2 font-body text-small text-leway-paper/70">
              {sideShot.name} — electronics retail, client build
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
