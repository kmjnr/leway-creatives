"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Squiggle } from "@/components/ui/Squiggle";

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative py-[clamp(4rem,3rem+5vw,8rem)] bg-leway-light overflow-hidden"
    >
      {/* Mint blob — bottom right */}
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(221,245,230,0.6) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="relative"
          >
            {/* Main squircle image */}
            <div className="relative w-full aspect-[4/5] group z-0">
              {/* Wireframe offset stroke */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-leway-gold -z-10 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
              
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-leway-stone shadow-hover">
                <Image
                  src="/images/strategy_desk_setup.webp"
                  alt="LEWAY Creatives creative workspace — strategy and design"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-4 md:-right-8 badge-float max-w-[220px] md:max-w-[260px] hidden md:block"
            >
              <p className="font-display text-sm italic text-leway-dark/80 leading-snug">
                &ldquo;Design without strategy is just decoration.&rdquo;
              </p>
              <Eyebrow className="text-leway-green mt-3">— LEWAY Philosophy</Eyebrow>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col gap-7"
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-leway-dark leading-[1.08] tracking-tight mb-5">
                Great work starts with{" "}
                <span className="relative inline-block">
                  listening.
                  <Squiggle color="#22C55E" />
                </span>
              </h2>

              <p className="font-body text-base md:text-lg text-leway-dark/65 leading-relaxed max-w-md">
                We don&apos;t build generic websites or write filler content. We take the time to understand your business, your clients, and your goals — then build something that genuinely works.
              </p>
              <p className="font-body text-base md:text-lg text-leway-dark/65 leading-relaxed max-w-md mt-4">
                Design, copy, and leads — all under one roof. That&apos;s how we help you grow without the chaos of juggling multiple agencies.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
