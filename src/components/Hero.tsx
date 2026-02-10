import { motion } from "framer-motion";
import { Globe, Palette, PenTool, UserCheck } from "lucide-react";

const scrollTo = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

const services = [
  { icon: Globe, label: "Web Design" },
  { icon: Palette, label: "Graphic Design" },
  { icon: PenTool, label: "Copywriting" },
  { icon: UserCheck, label: "Personal Branding" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-accent overflow-hidden pt-20"
      aria-label="Hero"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[200px] h-[200px] rounded-full bg-primary/6 blur-[80px] pointer-events-none" />

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--accent-foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-start gap-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-primary tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Design & Copywriting Agency
            </span>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.05] text-accent-foreground max-w-xl">
              Your Business Looks Like an Amateur.{" "}
              <span className="text-primary">Let's Fix That.</span>
            </h1>

            <p className="font-body text-lg md:text-xl text-accent-foreground/70 max-w-lg leading-relaxed">
              You don't need just a "pretty website" or text copies. You need a{" "}
              <strong className="text-accent-foreground">sales engine</strong>. We combine elite
              Web Design with Psychological Copywriting to turn your visitors into obsessive buyers.
            </p>

            <div className="flex flex-wrap gap-4 mt-1">
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

            {/* Service pills — at a glance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mt-2"
            >
              {services.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 text-sm font-medium text-accent-foreground/80"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Creative image composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-[80%] rounded-3xl bg-primary/15 blur-[60px]" />
            </div>

            {/* Main image card */}
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Primary image container — tilted for dynamism */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-primary/10 rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[4/5] bg-gradient-to-br from-accent via-accent to-primary/20 flex items-center justify-center">
                  {/* Placeholder — replace with actual image */}
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Palette className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-accent-foreground/50 font-body text-sm">
                      Hero image placeholder
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating accent cards — service previews */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -left-6 top-1/4 rounded-xl border border-white/10 bg-accent/90 backdrop-blur-md px-4 py-3 shadow-lg shadow-black/20 -rotate-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-bold text-accent-foreground">Web Design</p>
                    <p className="text-[10px] text-accent-foreground/50">Sites that convert</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="absolute -right-4 top-[15%] rounded-xl border border-white/10 bg-accent/90 backdrop-blur-md px-4 py-3 shadow-lg shadow-black/20 rotate-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <PenTool className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-bold text-accent-foreground">Copywriting</p>
                    <p className="text-[10px] text-accent-foreground/50">Words that sell</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-xl border border-white/10 bg-accent/90 backdrop-blur-md px-5 py-3 shadow-lg shadow-black/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-bold text-accent-foreground">Personal Branding</p>
                    <p className="text-[10px] text-accent-foreground/50">Stand out to recruiters</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
