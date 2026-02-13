import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "LEWAY Creatives fixed my bounce rate. Went from 70% to 35% in a week.",
    name: "Mary J",
    tag: "Solopreneur",
    stars: 5,
  },
  {
    quote: "Got 3 interviews the month after they rewrote my LinkedIn. Game changer.",
    name: "Alex Kamau",
    tag: "Job Seeker",
    stars: 5,
  },
  {
    quote: "The landing page they built converted 3x better than our old site from day one.",
    name: "Sarah M",
    tag: "Startup Founder",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-accent" aria-label="Client testimonials">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent-foreground mb-4">
            What Our Clients <span className="text-primary">Say</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-overlay/10 bg-overlay/5 p-8 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="font-body text-accent-foreground/80 leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </p>
              <footer className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <cite className="font-display font-bold text-accent-foreground not-italic text-sm">
                    {t.name}
                  </cite>
                  <span className="ml-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {t.tag}
                  </span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
