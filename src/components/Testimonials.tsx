"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

const testimonials = [
  {
    quote: "LEWAY Creatives fixed my bounce rate. Went from 70% to 35% in a week. Streamlined automation and communication — we're continuing this partnership!",
    name: "Mary J.",
    role: "Solopreneur",
    stars: 5,
    initials: "MJ",
    color: "bg-leway-mint",
    avatar: "/images/avatar_1.png"
  },
  {
    quote: "The landing page they built converted 3× better than our old site from day one. Genuinely remarkable work.",
    name: "Alan Paige",
    role: "Startup Founder",
    stars: 5,
    initials: "AP",
    color: "bg-leway-stone",
    avatar: "/images/avatar_2.png"
  },
  {
    quote: "There was no agency in the industry that could provide the level of detail that LEWAY does — context and prioritisation all the way.",
    name: "Michael N.",
    role: "Managing Director",
    stars: 5,
    initials: "MN",
    color: "bg-leway-mint",
    avatar: "/images/avatar_3.png"
  },
  {
    quote: "Got 3 interviews the month after they rewrote my LinkedIn. Total game changer for my career.",
    name: "Alexis K.",
    role: "Job Seeker",
    stars: 5,
    initials: "AK",
    color: "bg-leway-stone",
    avatar: "/images/avatar_4.png"
  },
  {
    quote: "LEWAY has proven to be an invaluable asset in our marketing toolkit.",
    name: "Brian O.",
    role: "Marketing Lead",
    stars: 5,
    initials: "BO",
    color: "bg-leway-mint",
    avatar: "/images/avatar_5.png"
  },
  {
    quote: "One of the best teams in the market — so easy to work with, just amazing!",
    name: "Oliver Brown",
    role: "Brand Strategist",
    stars: 5,
    initials: "OB",
    color: "bg-leway-stone",
    avatar: "/images/avatar_6.png"
  },
];

function TestimonialCard({ t, delay }: { t: typeof testimonials[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className="card-warm p-6 md:p-7 flex flex-col gap-4 break-inside-avoid mb-5 md:mb-6 isolate cursor-default"
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={14} className="fill-leway-gold text-leway-gold" />
        ))}
      </div>

      {/* Quote */}
      <p className="font-body text-base text-leway-dark/80 leading-relaxed">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Attribution */}
      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-black/5">
        <div className={`relative w-14 h-14 rounded-full ${t.color} overflow-hidden flex items-center justify-center flex-shrink-0`}>
          {t.avatar ? (
            <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="56px" />
          ) : (
            <span className="font-display text-sm font-bold text-leway-dark">{t.initials}</span>
          )}
        </div>
        <div>
          <p className="font-display text-base font-semibold text-leway-dark leading-tight">{t.name}</p>
          <Eyebrow className="text-leway-gold">{t.role}</Eyebrow>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-[clamp(4rem,3rem+5vw,8rem)] bg-leway-light overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-leway-dark">
            Real results from real clients.
          </h2>
          <p className="font-body text-base md:text-lg text-leway-dark/60 mt-4 leading-relaxed">
            We let the work — and the people — speak for themselves.
          </p>
        </motion.div>

        {/* Masonry stagger grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 0.06} />
          ))}
        </div>

      </div>
    </section>
  );
}
