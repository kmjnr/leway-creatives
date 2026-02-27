"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "I'm just starting out. Is this too expensive?",
    a: "We have packages for individuals and established brands. If you think professional design and copywriting is expensive, try the amateurs. It costs you customers every day.",
  },
  {
    q: "Do you use AI?",
    a: "We use AI for speed, not for thinking. The strategy is 100% human. The polish is 100% human. The tools just help us move faster.",
  },
  {
    q: "How long does a website take?",
    a: "A landing page? 2–4 days. A full site? 1–2 weeks. We move at the speed of business, not agency bureaucracy.",
  },
  {
    q: "How many revisions do I get?",
    a: "Every project includes 2 rounds of revisions baked into the price. Most clients nail it by round one because we get the brief right upfront. Additional rounds are available at a flat fee — no surprises.",
  },
  {
    q: "What are your payment terms?",
    a: "We require 50% upfront to kick off, and the remaining 50% on delivery. For larger projects, we offer milestone-based billing. We accept M-Pesa, bank transfer, and PayPal.",
  },
  {
    q: "Do you offer a satisfaction guarantee?",
    a: "We don't do refunds — we do results. That said, we've never had a client walk away unhappy. Our revision process ensures you get exactly what you need before we call it done.",
  },
  {
    q: "Can you work with my existing brand guidelines?",
    a: "Absolutely. Send us your brand kit and we'll work within your identity. If you don't have one yet, we can build that too — logos, color systems, typography, the whole package.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. We offer monthly retainer plans for content updates, website maintenance, and ongoing design work. Think of us as your creative department on speed dial.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background" aria-label="Frequently asked questions">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-0 items-start">
          {/* Left: Sticky heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-32"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Frequently<br />
              Asked<br />
              <span className="text-primary">Questions.</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground mt-4 max-w-xs">
              Straight answers. No fluff, no fine print.
            </p>
          </motion.div>

          {/* Right: FAQ timeline */}
          <div className="relative">
            {/* S-curve connecting line */}
            <svg
              className="absolute left-6 md:left-8 top-6 md:top-8 pointer-events-none z-0"
              style={{ height: "calc(100% - 3rem)" }}
              width="120"
              viewBox="0 0 120 600"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M 24 0 C 24 80, 100 100, 100 200 C 100 300, 24 250, 24 350 C 24 450, 100 400, 100 500 L 100 600"
                stroke="hsl(var(--border))"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <Accordion type="single" collapsible className="flex flex-col gap-12">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex items-start gap-6 md:gap-8"
                >
                  {/* Number circle */}
                  <div className="relative z-10 flex-shrink-0 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <span className="font-display text-lg md:text-xl font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Accordion item */}
                  <div className="flex-1 pt-1 md:pt-2">
                    <AccordionItem
                      value={`faq-${i}`}
                      className="border-b border-border pb-2"
                    >
                      <AccordionTrigger className="font-display text-left text-xl md:text-2xl font-bold text-foreground hover:no-underline py-0 gap-3">
                        <div className="flex items-center gap-3">
                          <HelpCircle size={20} className="text-primary shrink-0" />
                          {faq.q}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="font-body text-sm md:text-base text-muted-foreground leading-relaxed pt-3 max-w-sm">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
