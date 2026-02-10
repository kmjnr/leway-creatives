import { motion } from "framer-motion";
import { MessageSquare, Search, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Reach Out",
    desc: "Send us your requirements via WhatsApp or Email. We get back to you within 1 hour.",
  },
  {
    icon: Search,
    title: "The Deep Dive",
    desc: "We break down your business or career to understand who you are, what's the pain, and what you aim to achieve.",
  },
  {
    icon: Hammer,
    title: "The Build",
    desc: "We build your product — website, banners, articles, social content. Real strategy from Day 1.",
  },
  {
    icon: Rocket,
    title: "The Launch",
    desc: "When your product is ready for use, we hand over the keys to you and ensure everything runs perfectly.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background" aria-label="How it works">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            We don't guess. We execute.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
                  <Icon size={28} className="text-primary" />
                </div>
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 font-display text-6xl font-extrabold text-foreground/5 select-none">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
