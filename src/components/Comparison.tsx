"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";

const theirItems = [
  'Design OR copy. Never both.',
  'Slow timelines, bloated by process.',
  'Pretty pixels. No strategy behind them.',
  'Handed off to juniors after you sign.',
  'Premium pricing for mediocre output.',
];

const ourItems = [
  { title: "Design + Copy + Leads", desc: "Everything you need to grow, under one roof." },
  { title: "Sprint-based delivery", desc: "Clear goals, rapid execution, no waiting months." },
  { title: "Conversion obsessed", desc: "Every element is designed to turn visitors into clients." },
  { title: "Direct senior talent", desc: "You work with us — not a junior team." },
];

export default function Comparison() {
  return (
    <section className="relative py-[clamp(4rem,3rem+5vw,8rem)] bg-leway-stone/40 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-leway-dark max-w-xl">
            Why other agencies fall short.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

          {/* Them */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col gap-4"
          >
            <Eyebrow className="text-leway-dark/40 mb-2">The Standard Agency</Eyebrow>
            {theirItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="group card-warm p-5 md:p-6 flex items-start gap-4 transition-colors duration-300 cursor-default"
              >
                <div className="w-8 h-8 rounded-full bg-leway-dark/5 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <span className="text-leway-dark/30 font-bold text-xs">—</span>
                </div>
                <div className="pt-1 md:pt-1.5">
                  <p className="font-display text-base md:text-lg text-leway-dark/70 leading-tight">{item}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Us */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col gap-4"
          >
            <Eyebrow className="text-leway-green mb-2">LEWAY Creatives</Eyebrow>
            {ourItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="group card-warm p-5 md:p-6 flex items-start gap-4 hover:bg-leway-green transition-colors duration-300 cursor-default"
              >
                <div className="w-8 h-8 rounded-full bg-leway-mint group-hover:bg-leway-dark/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <span className="text-leway-green group-hover:text-leway-dark font-bold text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl text-leway-dark group-hover:text-leway-dark">{item.title}</h3>
                  <p className="font-body text-sm text-leway-dark/60 group-hover:text-leway-dark/80 mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}