import { motion } from "framer-motion";
import { XCircle, CheckCircle, Zap, User } from "lucide-react";

const rows = [
  {
    typical: "Pretty but pointless",
    typicalIcon: <XCircle size={16} className="text-destructive" />,
    leway: "Conversion-Focused",
    lewayIcon: <CheckCircle size={16} className="text-primary" />,
  },
  {
    typical: "Slow WordPress bloat",
    typicalIcon: <XCircle size={16} className="text-destructive" />,
    leway: "Blazing Fast Next.js",
    lewayIcon: <Zap size={16} className="text-primary" />,
  },
  {
    typical: "Generic AI Copy",
    typicalIcon: <XCircle size={16} className="text-destructive" />,
    leway: "Human Strategy",
    lewayIcon: <User size={16} className="text-primary" />,
  },
];

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
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
              Why the "Other Guys" Fail
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-md">
              Most creatives focus on one thing: making it look cool. We focus on making it work.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 font-display text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
            >
              Get Your Strategy Audit
            </a>
          </motion.div>

          {/* Right — Comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-overlay/10 bg-background overflow-hidden shadow-lg shadow-overlay-shadow/5"
          >
            {/* Header */}
            <div className="grid grid-cols-2">
              <div className="px-6 py-4 border-b border-r border-overlay/10">
                <span className="font-body text-sm italic text-muted-foreground">
                  Typical Agency
                </span>
              </div>
              <div className="px-6 py-4 border-b border-overlay/10 bg-primary/5">
                <span className="font-display text-sm font-bold text-primary">
                  LEWAY Creatives
                </span>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 ${i < rows.length - 1 ? "border-b border-overlay/10" : ""}`}
              >
                <div className="flex items-center gap-2.5 px-6 py-4 border-r border-overlay/10">
                  {row.typicalIcon}
                  <span className="font-body text-sm text-muted-foreground">{row.typical}</span>
                </div>
                <div className="flex items-center gap-2.5 px-6 py-4 bg-primary/[0.03]">
                  {row.lewayIcon}
                  <span className="font-display text-sm font-bold text-foreground">
                    {row.leway}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
