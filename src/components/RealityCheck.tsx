"use client";

import { motion } from "framer-motion";

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
    <section className="relative pt-40 pb-56 md:pb-64 bg-background-dark text-leway-light overflow-hidden bg-radial-dark noise-bg-dark clip-diagonal-top -mt-10 z-20 w-full">
      <div className="absolute top-10 right-10 pointer-events-none select-none opacity-[0.03] md:opacity-[0.02] leading-none mix-blend-screen">
        <span className="font-display text-[15rem] md:text-[25rem] font-bold text-white">02</span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 overflow-x-hidden w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 md:gap-6 max-w-2xl"
          >
            <h2 className="font-ui uppercase tracking-widest text-[#C9A84C] text-[11px] flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C9A84C]"></span>
              REALITY CHECK
            </h2>
            <h3 className="font-display text-3xl md:text-5xl lg:text-7xl font-medium leading-[1.05]">
              Why your current site is <span className="italic text-white">costing you money</span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:text-right"
          >
            <p className="font-ui text-[0.65rem] tracking-[0.2em] text-paper/50 uppercase mb-2">The Cost of Inaction</p>
            <div className="font-display text-5xl md:text-7xl lg:text-9xl font-normal text-white tracking-tighter leading-none inline-block relative">
              -$7k
              <span className="absolute -bottom-2 -right-4 text-xs md:text-sm font-ui tracking-widest text-leway-gold uppercase rotate-[-9deg]">Alert</span>
            </div>
            <p className="font-body text-paper/60 text-base md:text-lg mt-4 font-light">/ month lost to amateurs.</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 item-start border-t border-white/10 pt-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-12 lg:col-span-5"
          >
            <h4 className="font-display text-2xl lg:text-3xl mb-8 border-l-2 border-leway-green pl-6 py-1">The Silent Killers</h4>
            <div className="flex flex-col gap-10">
              {silentKillers.map((item) => (
                <div key={item.title} className="flex flex-col gap-2 relative">
                  <div className="absolute -left-4 top-2 w-[4px] h-[4px] bg-leway-gold/50 rounded-full" />
                  <p className="font-display text-lg md:text-2xl text-white break-words w-full">{item.title}</p>
                  <p className="font-body text-paper/60 leading-relaxed font-light text-base md:text-lg">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-12 lg:col-span-7 flex flex-col justify-center"
          >
            <blockquote className="font-display text-xl md:text-3xl lg:text-[2.75rem] leading-[1.3] md:leading-[1.25] text-white/95 break-words">
              "I sent out 50 proposals last month. The silence was deafening. It feels like shouting into the void, knowing you're qualified, but watching less experienced people get the contracts simply because they <span className="italic text-leway-gold opacity-90">looked the part</span>."
            </blockquote>
            <p className="font-ui uppercase tracking-widest text-sm text-leway-green mt-8 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-leway-green"></span>
              Real Client Experience
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
