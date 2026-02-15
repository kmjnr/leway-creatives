import { motion } from "framer-motion";
import { Globe, Palette, PenTool, UserCheck } from "lucide-react";
import heroImage from "@/assets/images/hero-image.webp";

const scrollTo = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  const buttons =
  <div className="flex flex-wrap gap-4 mt-1">
      <button
      onClick={() => scrollTo("#contact")}
      className="rounded-full bg-primary px-8 py-3.5 font-display font-bold text-primary-foreground transition-transform hover:scale-105 hover:shadow-xl hover:shadow-primary/25">

        Start Your Transformation
      </button>
      <button
      onClick={() => scrollTo("#contact")}
      className="rounded-full border border-accent-foreground/20 px-8 py-3.5 font-display font-semibold text-accent-foreground transition-transform hover:scale-105 hover:border-accent-foreground/40">

        See Services   
      </button>
    </div>;


  return (
    <section
      className="relative min-h-screen flex items-center bg-accent overflow-hidden pt-20 pb-16 md:pb-24"
      aria-label="Hero">

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
          backgroundSize: "24px 24px"
        }} />


      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-start gap-7">

            <span className="inline-flex items-center gap-2 rounded-full border border-overlay/10 bg-overlay/5 px-4 py-1.5 text-xs font-medium text-primary tracking-wide uppercase">
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

            {/* Buttons: visible on desktop only */}
            <div className="hidden lg:block">{buttons}</div>
          </motion.div>

          {/* Right: Creative image composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end">

            {/* Glow behind image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-[80%] rounded-3xl bg-primary/15 blur-[60px]" />
            </div>

            {/* Main image card */}
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Primary image container — tilted for dynamism */}
              <div className="relative rounded-2xl overflow-hidden border border-overlay/10 bg-overlay/5 backdrop-blur-sm shadow-2xl shadow-primary/10 rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                  src={heroImage}
                  alt="LEWAY Creatives — laptop, tablet and phone showcasing web design, visual identity and personal branding work"
                  className="w-full h-auto object-cover"
                  loading="eager" />

              </div>

              {/* Floating accent cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -left-6 top-[18%] rounded-xl border border-overlay/10 bg-accent/90 backdrop-blur-md px-4 py-3 shadow-lg shadow-overlay-shadow/20 -rotate-3">

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
                className="absolute -right-4 top-[8%] rounded-xl border border-overlay/10 bg-accent/90 backdrop-blur-md px-4 py-3 shadow-lg shadow-overlay-shadow/20 rotate-2">

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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="absolute -left-4 top-[55%] rounded-xl border border-overlay/10 bg-accent/90 backdrop-blur-md px-4 py-3 shadow-lg shadow-overlay-shadow/20 rotate-2">

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Palette className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-bold text-accent-foreground">Graphic Design</p>
                    <p className="text-[10px] text-accent-foreground/50">Visuals that pop</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-xl border border-overlay/10 bg-accent/90 backdrop-blur-md px-5 py-3 shadow-lg shadow-overlay-shadow/20">

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

          {/* Buttons: visible on mobile only, after image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:hidden">

            {buttons}
          </motion.div>
        </div>
      </div>
    </section>);

}