import { motion } from "framer-motion";

const scrollTo = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-accent overflow-hidden pt-20"
      aria-label="Hero"
    >
      {/* Subtle gradient orb */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-start gap-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-primary tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Design & Copywriting Agency
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-accent-foreground max-w-4xl">
            Your Business Looks Like an Amateur.{" "}
            <span className="text-primary">Let's Fix That.</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-accent-foreground/70 max-w-2xl leading-relaxed">
            You don't need just a "pretty website" or text copies. You need a{" "}
            <strong className="text-accent-foreground">sales engine</strong>. We combine elite
            Web Design with Psychological Copywriting to turn your visitors and
            audience into obsessive buyers.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <button
              onClick={() => scrollTo("#contact")}
              className="rounded-full bg-primary px-8 py-3.5 font-display font-bold text-primary-foreground transition-transform hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            >
              Start Your Transformation
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="rounded-full border border-accent-foreground/20 px-8 py-3.5 font-display font-semibold text-accent-foreground transition-transform hover:scale-105 hover:border-accent-foreground/40"
            >
              Order Service
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
