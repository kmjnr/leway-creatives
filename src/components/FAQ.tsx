"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "I\u2019m just starting out. Is this too expensive?",
    a: "We have packages built for bootstrapped founders and growing businesses alike. The real question isn\u2019t whether you can afford good design and copy \u2014 it\u2019s how much a weak website or empty pipeline is already costing you every month. Start small. Scale as you grow.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes \u2014 the majority of our clients are based in the US, UK, Canada, and Australia. We work fully remotely, communicate via WhatsApp, Email, or Zoom, and deliver on tight timelines regardless of time zone.",
  },
  {
    q: "Do you use AI?",
    a: "We use AI as a tool, not a replacement for thinking. The strategy, the positioning, the creative decisions \u2014 100% human. AI helps us move faster without cutting corners on quality.",
  },
  {
    q: "How long does a website take?",
    a: "A landing page: 2\u20134 days. A full website: 1\u20132 weeks. We move at the speed of business \u2014 not agency bureaucracy. Timeline is confirmed before we kick off so there are no surprises.",
  },
  {
    q: "How quickly can you deliver a lead list?",
    a: "Most prospect and contact lists are delivered within 2\u20135 business days depending on size and complexity. Every lead is manually verified \u2014 we don\u2019t sell you scraped junk. Quality over quantity, always.",
  },
  {
    q: "How many revisions do I get?",
    a: "Every project includes 2 rounds of revisions. Most clients don\u2019t need both \u2014 because we get the brief right before we start building. Additional revisions are available at a flat fee, agreed upfront.",
  },
  {
    q: "What are your payment terms?",
    a: "50% upfront to kick off, 50% on delivery. For larger projects, we offer milestone-based billing. We accept M-Pesa, bank transfer, PayPal, and Wise for international clients.",
  },
  {
    q: "Do you offer a satisfaction guarantee?",
    a: "We\u2019re not happy until you are. Our revision process exists precisely so you never receive something that misses the mark. We\u2019ve maintained a 100% project completion rate \u2014 and we intend to keep it that way.",
  },
  {
    q: "Can you work with my existing brand guidelines?",
    a: "Absolutely. Send us your brand kit and we\u2019ll work entirely within your identity. No brand guidelines yet? We can build that too \u2014 logo, colour system, typography, the full package.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. Monthly retainer plans are available for website maintenance, content updates, ongoing design, and lead generation. Think of us as your creative and growth department \u2014 on speed dial.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background text-leway-dark noise-bg border-t border-leway-dark/5" aria-label="Frequently asked questions">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 md:gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-40"
          >
            <h2 className="font-ui uppercase tracking-widest text-[#8A9E8E] text-[11px] mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#0D6B35]"></span>
              FAQ
            </h2>
            <h3 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05]">
              Straight <br />
              <span className="italic text-leway-dark">Answers.</span>
            </h3>
            <p className="font-body text-lg md:text-xl text-leway-dark/70 mt-6 md:mt-8 max-w-sm font-light leading-relaxed">
              No fluff. No fine print. Just exactly what you need to know before we get to work.
            </p>
          </motion.div>

          <div className="relative">
            <Accordion type="single" collapsible className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <AccordionItem
                    value={`faq-${i}`}
                    className="border-b border-leway-dark/10 pb-0 mb-3 md:mb-4 transition-all duration-300 data-[state=open]:border-l-[3px] data-[state=open]:border-l-[#22C55E] bg-transparent hover:bg-black/[0.02]"
                  >
                    <AccordionTrigger className="font-display text-left text-lg md:text-2xl lg:text-3xl font-medium text-leway-dark hover:no-underline py-4 md:py-6 px-3 md:px-4 gap-4 md:gap-6 [&[data-state=open]]:text-leway-dark [&[data-state=open]]:italic">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-base md:text-lg lg:text-xl text-leway-dark/70 leading-relaxed px-3 md:px-4 pb-6 md:pb-8 font-light">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
