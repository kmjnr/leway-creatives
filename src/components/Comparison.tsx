import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const features = [
"Design + Copy",
"Fast Timeline",
"Conversion Focus",
"Personal Touch",
"Affordable Pricing"];


export default function Comparison() {
  return (
    <section className="py-24 md:py-32 bg-background" aria-label="Why choose LEWAY">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}>

            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
              Why Other Agencies Fail
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-md">
              Most creatives focus on one thing: making it look cool. We focus on making it work.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 font-display text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105">

              Get Your Strategy Audit
            </a>
          </motion.div>

          {/* Right — Comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border/50 bg-background overflow-hidden shadow-lg shadow-foreground/5">

            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_auto]">
              <div className="px-6 py-4 border-b border-border/50">
                <span className="font-body text-sm text-muted-foreground italic">Feature</span>
              </div>
              <div className="px-8 py-4 border-b border-border/50 text-center min-w-[100px]">
                <span className="font-display text-sm font-bold text-foreground">LEWAY</span>
              </div>
              <div className="px-8 py-4 border-b border-border/50 text-center min-w-[100px]">
                <span className="font-body text-sm text-muted-foreground">Others</span>
              </div>
            </div>

            {/* Rows */}
            {features.map((feature, i) =>
            <div
              key={i}
              className={`grid grid-cols-[1fr_auto_auto] ${i < features.length - 1 ? "border-b border-border/50" : ""}`}>

                <div className="px-6 py-4">
                  <span className="font-body text-sm text-foreground">{feature}</span>
                </div>
                <div className="px-8 py-4 flex items-center justify-center min-w-[100px]">
                  <CheckCircle size={22} className="text-primary" />
                </div>
                <div className="px-8 py-4 flex items-center justify-center min-w-[100px]">
                  <XCircle size={22} className="text-destructive" />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>);

}