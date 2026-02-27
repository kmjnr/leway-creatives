"use client";

import { motion } from "framer-motion";
import { AlertTriangle, X, TrendingDown } from "lucide-react";

const silentKillers = [
  {
    title: '"Your website looks DIY"',
    desc: "First impressions happen in 0.05 seconds. If you look cheap, they assume your work is cheap.",
  },
  {
    title: '"Resumes get buried"',
    desc: "PDFs are static graveyards. Recruiters want to see live, interactive proof of competence.",
  },
  {
    title: '"Confusion kills conversion"',
    desc: "If they can't figure out what you do in 3 seconds, they're gone forever.",
  },
];

export default function RealityCheck() {
  return (
    <section className="py-24 md:py-32 bg-background" aria-label="The reality check">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            The Reality Check
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Why your current site is{" "}
            <span className="text-destructive">costing you money</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            It's not just pixels. It's the silent sound of potential clients hitting the 'back' button.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* Left — Silent Killers card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="rounded-2xl border border-overlay/10 bg-accent p-6 md:p-8 shadow-lg shadow-overlay-shadow/5">
              <div className="flex items-center gap-2.5 mb-6">
                <AlertTriangle size={20} className="text-primary" />
                <h3 className="font-display text-xl font-bold text-accent-foreground">
                  The Silent Killers
                </h3>
              </div>

              <div className="flex flex-col gap-5">
                {silentKillers.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 shrink-0 rounded-full bg-destructive/10 p-1">
                      <X size={12} className="text-destructive" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-accent-foreground mb-0.5">
                        {item.title}
                      </p>
                      <p className="font-body text-xs text-accent-foreground/50 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Left accent bar */}
            <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            {/* Quote below the card */}
            <motion.blockquote
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 pl-4 border-l-2 border-overlay/10 font-body text-sm italic text-muted-foreground leading-relaxed max-w-md"
            >
              "I sent out 50 proposals last month. The silence was deafening. It feels like shouting into the void, knowing you're qualified, but watching less experienced people get the contracts simply because they looked the part."
            </motion.blockquote>
          </motion.div>

          {/* Right — Cost of Inaction card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-overlay/10 bg-secondary p-6 md:p-8 shadow-lg shadow-overlay-shadow/10"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              The Cost of Inaction
            </p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-5xl md:text-6xl font-extrabold text-destructive">
                -$7,000
              </span>
              <span className="font-body text-muted-foreground text-sm">/ month</span>
            </div>

            {/* Stat rows */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-between rounded-xl border border-overlay/10 bg-accent px-5 py-3.5">
                <span className="font-body text-sm text-accent-foreground/70">
                  Missed Client Opportunities
                </span>
                <span className="font-display text-sm font-bold text-accent-foreground">
                  3 Leads
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-overlay/10 bg-accent px-5 py-3.5">
                <span className="font-body text-sm text-accent-foreground/70">
                  Avg. Project Value
                </span>
                <span className="font-display text-sm font-bold text-accent-foreground">
                  $2,350
                </span>
              </div>
            </div>

            {/* Annual total */}
            <div className="flex items-center justify-between px-2 mb-6">
              <span className="font-body text-sm text-muted-foreground">Annual Revenue Lost</span>
              <span className="font-display text-lg font-bold text-destructive">$84,000</span>
            </div>

            {/* Warning callout */}
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-5 py-4 flex items-start gap-3">
              <TrendingDown size={18} className="text-destructive mt-0.5 shrink-0" />
              <p className="font-body text-xs text-destructive leading-relaxed">
                Your current portfolio isn't just sitting there. It is actively repelling high-ticket clients.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
