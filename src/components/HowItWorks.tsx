"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Say Hello",
    desc: "Tell us what you need via WhatsApp or email. We respond within one hour — every time.",
  },
  {
    num: "02",
    title: "We Deep-Dive",
    desc: "We study your business, audience, and competitors before a single pixel is moved.",
  },
  {
    num: "03",
    title: "We Build",
    desc: "Websites, copy, lead lists, design assets — built to brief and refined until perfect.",
  },
  {
    num: "04",
    title: "You Launch",
    desc: "Go live with confidence. Files, logins, clear instructions — and we're one message away.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-[clamp(4rem,3rem+5vw,8rem)] bg-leway-mint/50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-leway-dark">
            Our simple process.
          </h2>
          <p className="font-body text-base md:text-lg text-leway-dark/60 mt-4 max-w-md mx-auto leading-relaxed">
            No confusion, no endless back-and-forth. Just a clear path from first message to final launch.
          </p>
        </motion.div>

        {/* Steps with organic connecting path */}
        <div className="relative">

          {/* Connecting SVG path — desktop only */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] pointer-events-none" aria-hidden="true">
            <svg width="100%" height="40" viewBox="0 0 900 40" fill="none" preserveAspectRatio="none">
              <path
                d="M0 20 C150 5, 220 35, 300 20 C380 5, 450 35, 600 20 C700 5, 780 35, 900 20"
                stroke="#22C55E"
                strokeWidth="2"
                strokeDasharray="6 4"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="card-warm p-6 md:p-8 flex flex-col gap-5 relative group cursor-default"
              >
                {/* Number circle */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-leway-dark flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-sm font-bold text-leway-gold">{step.num}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xl md:text-2xl text-leway-dark mb-2">{step.title}</h3>
                  <p className="font-body text-sm text-leway-dark/60 leading-relaxed">{step.desc}</p>
                </div>

                {/* Mobile connector dot */}
                {i < steps.length - 1 && (
                  <div className="sm:hidden flex justify-center mt-2">
                    <div className="w-px h-6 bg-leway-green/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Micro-CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className='text-center mt-16'
        >
          <p className='font-body text-base text-leway-dark/60 mb-4'>Ready to start?</p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className='font-body text-sm text-leway-green hover:text-leway-dark underline underline-offset-4 decoration-leway-green/40 hover:decoration-leway-dark transition-colors py-2 px-3'
          >
            Let&apos;s talk →
          </button>
        </motion.div>

      </div>
    </section>
  );
}
