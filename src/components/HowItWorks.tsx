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
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-0 items-start">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-32"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              How It<br />
              <span className="text-primary">Works.</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground mt-4 max-w-xs">
              We don't guess. We execute — in four precise steps.
            </p>
          </motion.div>

          {/* Right: Timeline */}
          <div className="relative">
            {/* Creative organic connecting line */}
            <svg
              className="absolute left-6 md:left-8 top-8 bottom-8 h-[calc(100%-4rem)] w-12 -translate-x-1/2"
              viewBox="0 0 48 400"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                  <stop offset="30%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {/* Thick organic background stroke */}
              <path
                d="M 24 0 C 28 40, 18 80, 24 120 C 30 160, 16 200, 24 240 C 32 280, 20 320, 24 360 L 24 400"
                stroke="url(#line-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Thin sharp center stroke */}
              <path
                d="M 24 0 C 26 50, 22 90, 24 130 C 26 170, 22 210, 24 250 C 26 290, 22 340, 24 400"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />
              {/* Decorative dots at nodes */}
              <circle cx="24" cy="0" r="3" fill="hsl(var(--primary))" fillOpacity="0.3" />
              <circle cx="24" cy="133" r="2.5" fill="hsl(var(--primary))" fillOpacity="0.25" />
              <circle cx="24" cy="266" r="2" fill="hsl(var(--primary))" fillOpacity="0.2" />
              <circle cx="24" cy="400" r="3" fill="hsl(var(--primary))" fillOpacity="0.15" />
            </svg>

            <div className="flex flex-col gap-16">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
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

                    {/* Content */}
                    <div className="pt-1 md:pt-2">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon size={20} className="text-primary" />
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
