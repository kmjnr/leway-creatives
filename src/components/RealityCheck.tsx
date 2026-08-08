"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    id: "strategy",
    title: "Strategy & design, seamlessly integrated.",
    desc: "We don't just make things look pretty. Every design decision is backed by conversion strategy — ensuring your brand doesn't just look the part, it wins business.",
    image: "/images/strategy_design_image.webp",
    alt: "Creative strategy desk setup — LEWAY Creatives",
    reverse: false,
  },
  {
    id: "growth",
    title: "Data-driven lead generation.",
    desc: "A beautiful website is useless if no one sees it. We integrate B2B lead generation into our workflow — filling your pipeline while we grow your brand.",
    image: "/images/growth_dashboard_laptop.webp",
    alt: "Growth dashboard on laptop — LEWAY Creatives",
    reverse: true,
  },
];

function FeatureRow({ feature, delay }: { feature: typeof features[0]; delay: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: feature.reverse ? 24 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className={`flex flex-col gap-5 ${feature.reverse ? "lg:order-2" : "lg:order-1"}`}
      >
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-leway-dark leading-[1.1] tracking-tight">
          {feature.title}
        </h3>
        <p className="font-body text-base md:text-lg text-leway-dark/65 leading-relaxed max-w-md">
          {feature.desc}
        </p>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: delay + 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className={`relative w-full aspect-[4/3] group z-0 ${feature.reverse ? "lg:order-1" : "lg:order-2"}`}
      >
        {/* Wireframe offset stroke */}
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-leway-gold -z-10 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
        
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-hover">
          <Image
            src={feature.image}
            alt={feature.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function RealityCheck() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-leway-stone/40 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Signature divider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="w-full h-px bg-leway-dark/10" />
          <p className="font-display italic text-2xl md:text-3xl lg:text-4xl text-leway-dark/80 text-center py-8 md:py-12 max-w-3xl mx-auto leading-[1.2]">
            We don&apos;t just make things look good. We make them work.
          </p>
          <div className="w-full h-px bg-leway-dark/10" />
        </motion.div>

        {/* Feature rows */}
        <div className="flex flex-col gap-12 md:gap-24 lg:gap-32">
          {features.map((feature, i) => (
            <FeatureRow key={feature.id} feature={feature} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}
