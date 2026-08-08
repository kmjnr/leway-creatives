"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    q: "I'm just starting out. Is this too expensive?",
    a: "We have packages built for bootstrapped founders and growing businesses alike. The real question isn't whether you can afford good design and copy — it's how much a weak website or empty pipeline is already costing you every month. Start small. Scale as you grow.",
  },
  {
    q: "Do you use AI?",
    a: "We use AI as a tool, not a replacement for thinking. The strategy, the positioning, the creative decisions — 100% human. AI helps us move faster without cutting corners on quality.",
  },
  {
    q: "How long does a website take?",
    a: "A landing page: 2–4 days. A full website: 1–2 weeks. We move at the speed of business — not agency bureaucracy. Timeline is confirmed before we kick off so there are no surprises.",
  },
  {
    q: "How many revisions do I get?",
    a: "Every project includes 2 rounds of revisions. Most clients don't need both — because we get the brief right before we start building. Additional revisions are available at a flat fee, agreed upfront.",
  },
  {
    q: "Do you offer a satisfaction guarantee?",
    a: "We're not happy until you are. Our revision process exists precisely so you never receive something that misses the mark. We've maintained a 100% project completion rate — and we intend to keep it that way.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-6 text-left p-5 md:p-6 rounded-2xl transition-all duration-300 ${
          open
            ? "bg-white shadow-badge"
            : "bg-white/60 hover:bg-white hover:shadow-card"
        }`}
        aria-expanded={open}
      >
        <span className="font-display text-base md:text-lg text-leway-dark leading-snug flex-1">
          {faq.q}
        </span>
        <span
          className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
            open ? "bg-leway-green text-leway-dark" : "bg-leway-stone text-leway-dark/50"
          }`}
        >
          {open ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 py-4 font-body text-base text-leway-dark/70 leading-relaxed">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-[clamp(4rem,3rem+5vw,8rem)] bg-leway-light overflow-hidden" aria-label="Frequently asked questions">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">

          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-leway-dark mb-5">
                Frequently Asked Questions.
              </h2>
              <p className="font-body text-base md:text-lg text-leway-dark/60 max-w-sm leading-relaxed">
                No fluff. No fine print. Just exactly what you need to know before we get to work.
              </p>

              {/* Decorative accent */}
              <div className="mt-8 w-12 h-1 rounded-full bg-leway-green" />

              {/* Added FAQ Image */}
              <div className="relative w-full aspect-[4/5] md:aspect-[4/3] group z-0 mt-10 md:mt-12 mb-10 lg:mb-0">
                {/* Wireframe offset stroke */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-leway-gold -z-10 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />

                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-card">
                  <Image
                    src="/images/faq_image.webp"
                    alt="Frequently Asked Questions"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — FAQ items */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>

        </div>
        
        {/* Visual transition line */}
        <div className="flex justify-center mt-16 md:mt-20">
          <div className="w-16 h-0.5 bg-leway-gold/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
