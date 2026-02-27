"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "LEWAY Creatives fixed my bounce rate. Went from 70% to 35% in a week. That was supercharged by consistent automation, streamlined processes and communication. We are excited to continue this partnership!",
    name: "Mary J",
    role: "Solopreneur",
    stars: 5,
    size: "large" as const,
  },
  {
    quote:
      "Got 3 interviews the month after they rewrote my LinkedIn. Game changer. I can monitor my personal brand before things get too big to handle.",
    name: "Alex Kamau",
    role: "Job Seeker",
    stars: 5,
    size: "medium" as const,
  },
  {
    quote:
      "The landing page they built converted 3x better than our old site from day one.",
    name: "Sarah M",
    role: "Startup Founder",
    stars: 5,
    size: "medium" as const,
  },
  {
    quote:
      "LEWAY has proven to be an invaluable asset in our marketing toolkit.",
    name: "Brian O",
    role: "Marketing Lead",
    stars: 5,
    size: "small" as const,
  },
  {
    quote:
      "There was no agency in the industry that could provide the level of detail that LEWAY does. They provide context as well as the prioritization of tasks.",
    name: "Michael N",
    role: "Managing Director",
    stars: 5,
    size: "large" as const,
  },
  {
    quote:
      "This team is one of the best we have in the market, so easy to implement and so easy to use, just amazing!",
    name: "Diana K",
    role: "Brand Strategist",
    stars: 5,
    size: "small" as const,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-primary text-primary" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 bg-background"
      aria-label="Client testimonials"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary mb-3 block">
            Feedback
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
            See what our clients think about{" "}
            <span className="text-primary">LEWAY</span>
          </h2>
        </motion.div>

        {/* Masonry Bento Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="break-inside-avoid rounded-2xl border border-border bg-card p-6 md:p-7 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Author header */}
              <div className="flex items-center gap-3">
                {/* Placeholder avatar */}
                <div className="h-11 w-11 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
                  <span className="font-display font-bold text-muted-foreground text-sm">
                    {t.name[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <cite className="font-display font-bold text-card-foreground not-italic text-sm block truncate">
                    {t.name}
                  </cite>
                  <span className="text-xs text-muted-foreground">{t.role}</span>
                </div>
              </div>

              {/* Quote */}
              <p className="font-body text-card-foreground/80 leading-relaxed text-sm">
                {t.quote}
              </p>

              {/* Stars */}
              <StarRating count={t.stars} />
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
