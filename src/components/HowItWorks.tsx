"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Reach Out",
    desc: "Tell us what you need via WhatsApp or Email — website, copy, leads, design, or all of the above. We respond within 1 hour, every time.",
  },
  {
    icon: Search,
    title: "The Deep Dive",
    desc: "We dig into your business — your goals, your audience, your competitors, and your gaps. No assumptions. We build strategy before we build anything else.",
  },
  {
    icon: Hammer,
    title: "The Build",
    desc: "We execute — websites, copy, lead lists, design assets, research reports. Every deliverable is built to a brief, reviewed against your goals, and refined until it’s right.",
  },
  {
    icon: Rocket,
    title: "The Launch",
    desc: "We hand everything over — files, logins, instructions, and a clear plan for what to do next. You launch with confidence, not confusion. And we’re still one message away.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 bg-background text-leway-dark overflow-hidden noise-bg z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">

          {/* Sticky Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 lg:sticky lg:top-40"
          >
            <h2 className="font-ui uppercase tracking-widest text-[#8A9E8E] text-[11px] mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#0D6B35]"></span>
              PROCESS
            </h2>
            <h3 className="font-display text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.05]">
              How It<br />
              <span className="italic text-leway-dark">Works.</span>
            </h3>
            <p className="font-body text-lg md:text-xl text-leway-dark/70 mt-6 md:mt-8 max-w-md font-light leading-relaxed">
              No confusion. No back-and-forth. No agency nonsense. Just a clear process from first message to final delivery.
            </p>
          </motion.div>

          {/* Scrolling Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-16 md:gap-24 lg:gap-32 lg:pl-10 mt-8 lg:mt-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`relative group flex ${i % 2 !== 0 ? 'lg:justify-end' : ''}`}
              >
                {/* Faded step number — clipped to avoid overflow on mobile */}
                <span className={`absolute -top-6 left-0 font-display text-[6rem] md:text-[10rem] lg:text-[12rem] font-bold text-leway-dark/[0.04] select-none leading-none z-0 transition-colors duration-500 group-hover:text-leway-green/[0.15] overflow-hidden ${i % 2 !== 0 ? 'lg:-left-20' : ''}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className={`relative z-10 pl-5 md:pl-10 border-l border-leway-dark/10 group-hover:border-leway-green transition-colors duration-500 bg-background/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl ${i % 2 !== 0 ? 'lg:max-w-lg' : ''}`}>
                  <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="p-3 md:p-4 bg-leway-dark text-white rounded-full group-hover:bg-leway-green group-hover:text-leway-dark transition-colors duration-500 shadow-xl shadow-leway-dark/5 z-20 relative shrink-0">
                      <step.icon size={20} strokeWidth={1.5} />
                    </div>
                    <h4 className="font-display text-2xl md:text-3xl lg:text-5xl font-medium text-leway-dark z-20 relative">
                      {step.title}
                    </h4>
                  </div>
                  <p className="font-body text-base md:text-xl lg:text-2xl text-leway-dark/70 leading-relaxed font-light max-w-lg z-20 relative">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
