import { motion } from "framer-motion";
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
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background" aria-label="Frequently asked questions">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="font-display text-left font-bold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
