"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "I'm just starting out. Is this too expensive?",
    a: "We have packages built for bootstrapped founders and growing businesses alike. The real question isn't whether you can afford good design and copy — it's how much a weak website or empty pipeline is already costing you every month. Start small. Scale as you grow.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — the majority of our clients are based in the US, UK, Canada, and Australia. We work fully remotely, communicate via WhatsApp, Email, or Zoom, and deliver on tight timelines regardless of time zone.",
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
    q: "How quickly can you deliver a lead list?",
    a: "Most prospect and contact lists are delivered within 2–5 business days depending on size and complexity. Every lead is manually verified — we don't sell you scraped junk. Quality over quantity, always.",
  },
  {
    q: "How many revisions do I get?",
    a: "Every project includes 2 rounds of revisions. Most clients don't need both — because we get the brief right before we start building. Additional revisions are available at a flat fee, agreed upfront.",
  },
  {
    q: "What are your payment terms?",
    a: "50% upfront to kick off, 50% on delivery. For larger projects, we offer milestone-based billing. We accept M-Pesa, bank transfer, PayPal, and Wise for international clients.",
  },
  {
    q: "Do you offer a satisfaction guarantee?",
    a: "We're not happy until you are. Our revision process exists precisely so you never receive something that misses the mark. We've maintained a 100% project completion rate — and we intend to keep it that way.",
  },
  {
    q: "Can you work with my existing brand guidelines?",
    a: "Absolutely. Send us your brand kit and we'll work entirely within your identity. No brand guidelines yet? We can build that too — logo, colour system, typography, the full package.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. Monthly retainer plans are available for website maintenance, content updates, ongoing design, and lead generation. Think of us as your creative and growth department — on speed dial.",
  },
];

export default function FAQ() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal<HTMLDivElement>({ margin: "-80px" });
  const { ref: listRef, isVisible: listVisible } = useScrollReveal<HTMLDivElement>({ margin: "-60px" });

  return (
    <section id="faq" className="py-24 md:py-32 bg-background text-leway-dark noise-bg border-t border-leway-dark/5" aria-label="Frequently asked questions">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 md:gap-20 items-start">

          {/* Left — sticky heading */}
          <div
            ref={headRef}
            className={`md:sticky md:top-40 ${headVisible ? "animate-reveal-left" : "opacity-0"}`}
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
          </div>

          {/* Right — accordion list */}
          <div
            ref={listRef}
            className={`relative ${listVisible ? "animate-reveal-up" : "opacity-0"}`}
          >
            <Accordion type="single" collapsible className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-leway-dark/10 pb-0 mb-3 md:mb-4 transition-[border-color,background-color] duration-300 data-[state=open]:border-l-[3px] data-[state=open]:border-l-[#22C55E] bg-transparent hover:bg-black/[0.02]"
                >
                  <AccordionTrigger className="font-display text-left text-lg md:text-2xl lg:text-3xl font-medium text-leway-dark hover:no-underline py-4 md:py-6 px-3 md:px-4 gap-4 md:gap-6 [&[data-state=open]]:text-leway-dark [&[data-state=open]]:italic">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-base md:text-lg lg:text-xl text-leway-dark/70 leading-relaxed px-3 md:px-4 pb-6 md:pb-8 font-light">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
}
