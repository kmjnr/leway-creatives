"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";

const testimonials = [
  {
    quote:
      "LEWAY Creatives fixed my bounce rate. Went from 70% to 35% in a week. That was supercharged by consistent automation, streamlined processes and communication. We are excited to continue this partnership!",
    name: "Mary J",
    role: "Solopreneur",
    stars: 5,
    avatar: "/images/avatar_1.png",
  },
  {
    quote:
      "The landing page they built converted 3x better than our old site from day one.",
    name: "Sarah M",
    role: "Startup Founder",
    stars: 5,
    avatar: "/images/avatar_2.png",
  },
  {
    quote:
      "LEWAY has proven to be an invaluable asset in our marketing toolkit.",
    name: "Brian O",
    role: "Marketing Lead",
    stars: 5,
    avatar: "/images/avatar_3.png",
  },
  {
    quote:
      "There was no agency in the industry that could provide the level of detail that LEWAY does. They provide context as well as the prioritization of tasks.",
    name: "Michael N",
    role: "Managing Director",
    stars: 5,
    avatar: "/images/avatar_6.png",
  },
  {
    quote:
      "This team is one of the best we have in the market, so easy to implement and so easy to use, just amazing!",
    name: "Diana K",
    role: "Brand Strategist",
    stars: 5,
    avatar: "/images/avatar_4.png",
  },
  {
    quote:
      "Got 3 interviews the month after they rewrote my LinkedIn. Game changer. I can monitor my personal brand before things get too big to handle.",
    name: "Alex Kamau",
    role: "Job Seeker",
    stars: 5,
    avatar: "/images/avatar_5.png",
  },
];

function TestimonialCard({ t, index }: { t: (typeof testimonials)[number]; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLQuoteElement>({ margin: "-40px" });

  return (
    <blockquote
      ref={ref}
      className={`break-inside-avoid relative p-6 md:p-8 lg:p-10 flex flex-col gap-5 md:gap-6 group bg-white/[0.02] border-l-[3px] border-leway-green hover:bg-white/[0.05] transition-colors duration-500 shadow-xl shadow-forest/5 ${isVisible ? "animate-reveal-up" : "opacity-0"}`}
      style={{ animationDelay: `${(index % 3) * 0.15}s` }}
    >
      {/* Massive decorative quote mark */}
      <div className="absolute top-4 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
        <Quote size={80} className="text-leway-dark fill-current" />
      </div>

      <div className="flex gap-1.5 relative z-10">
        {Array.from({ length: t.stars }).map((_, j) => (
          <Star key={j} size={16} className="fill-leway-gold text-leway-gold" />
        ))}
      </div>

      <p className="font-body text-lg md:text-xl text-leway-dark/80 leading-relaxed font-light relative z-10">
        &quot;{t.quote}&quot;
      </p>

      <div className="flex items-center gap-5 mt-4 relative z-10">
        <div className="h-14 w-14 rounded-full bg-background flex items-center justify-center shadow-inner overflow-hidden shrink-0 border border-leway-green grayscale group-hover:grayscale-0 transition-all duration-500">
          {t.avatar ? (
            <Image src={t.avatar} alt={t.name} width={56} height={56} className="w-full h-full object-cover" />
          ) : (
            <span className="font-display font-bold text-leway-dark text-xl">
              {t.name[0]}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <cite className="font-display font-medium text-leway-dark not-italic text-lg">
            {t.name}
          </cite>
          <span className="font-ui text-xs tracking-[0.15em] uppercase text-leway-green mt-1">
            {t.role}
          </span>
        </div>
      </div>
    </blockquote>
  );
}

export default function Testimonials() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal<HTMLDivElement>({ margin: "-80px" });

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-32 bg-background text-leway-dark overflow-hidden noise-bg z-10"
      aria-label="Client testimonials"
    >
      <div className="container mx-auto px-6 max-w-7xl">

        <div
          ref={headRef}
          className={`mb-20 text-center flex flex-col items-center ${headVisible ? "animate-reveal-up" : "opacity-0"}`}
        >
          <h2 className="font-ui uppercase tracking-widest text-[#8A9E8E] text-[11px] mb-6 flex items-center justify-center gap-4 w-full">
            <span className="w-8 h-[2px] bg-[#0D6B35]"></span>
            CLIENT FEEDBACK
            <span className="w-8 h-[2px] bg-[#0D6B35]"></span>
          </h2>
          <h3 className="font-display text-4xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] md:leading-[1.05] max-w-4xl tracking-tight">
            See What They <br className="hidden md:block" /> <span className="italic text-leway-dark">Think About Us</span>
          </h3>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
