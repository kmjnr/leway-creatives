import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  whatsapp: z.string().trim().min(8, "Enter a valid WhatsApp number").max(20),
  service: z.string().trim().min(1, "Describe what you need").max(1000),
});

type FormData = z.infer<typeof schema>;

const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

export default function ContactForm() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const msg = encodeURIComponent(
      `Hi LEWAY Creatives!\n\nName: ${data.name}\nEmail: ${data.email}\nWhatsApp: ${data.whatsapp}\n\nService Needed:\n${data.service}`
    );
    setSubmitted(data.name);
    setTimeout(() => {
      window.open(`https://wa.me/254700000000?text=${msg}`, "_blank");
    }, 1500);
  };

  return (
    <section id="contact" className="relative pt-24 md:pt-32 pb-40 md:pb-52 bg-foreground overflow-hidden" aria-label="Contact form">
      {/* Decorative radial glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>
      <div className="relative container mx-auto px-6 max-w-4xl">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-accent-foreground leading-tight mb-6">
              You've Come This Far.{" "}
              <span className="text-primary">You're Interested.</span>
            </h2>
            <p className="font-body text-accent-foreground/70 text-lg mb-6 leading-relaxed">
              The market is crowded. Your competitors are noisy. Let's make you
              the only logical choice.
            </p>

            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
              </span>
              <span className="font-body text-sm text-accent-foreground/80">
                Only <strong>5 spots</strong> available for {currentMonth}
              </span>
            </div>

            <p className="font-body text-sm text-accent-foreground/50 italic">
              P.S. You'll leave the session with a roadmap even if we don't work
              together.
            </p>
          </motion.div>

          {/* Form / Success */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-overlay/10 bg-overlay/5 p-8"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                  >
                    <CheckCircle2 size={64} className="text-primary mb-4" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-accent-foreground mb-2">
                    Message Received!
                  </h3>
                  <p className="font-body text-accent-foreground/70 mb-6">
                    Thanks, <strong>{submitted}</strong>! We've received your
                    details. We are analyzing your request and will reach out to you
                    as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(null)}
                    className="flex items-center gap-2 text-sm text-primary font-semibold"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <h3 className="font-display text-xl font-bold text-accent-foreground mb-2">
                    Let's Turn Spend Into Well-Spent.
                  </h3>

                  <div>
                    <Label htmlFor="name" className="text-accent-foreground/80 text-sm">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      {...register("name")}
                      className="mt-1 bg-overlay/5 border-overlay/10 text-accent-foreground placeholder:text-accent-foreground/30"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-accent-foreground/80 text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="best@email.com"
                      {...register("email")}
                      className="mt-1 bg-overlay/5 border-overlay/10 text-accent-foreground placeholder:text-accent-foreground/30"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="whatsapp" className="text-accent-foreground/80 text-sm">
                      WhatsApp Number
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="+254..."
                      {...register("whatsapp")}
                      className="mt-1 bg-overlay/5 border-overlay/10 text-accent-foreground placeholder:text-accent-foreground/30"
                    />
                    <p className="text-xs text-accent-foreground/40 mt-1">
                      Please include country code
                    </p>
                    {errors.whatsapp && (
                      <p className="text-xs text-destructive mt-1">{errors.whatsapp.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-accent-foreground/80 text-sm">
                      What service are you looking for?
                    </Label>
                    <Textarea
                      id="service"
                      placeholder="I need a high-converting landing page for my real estate business..."
                      rows={4}
                      {...register("service")}
                      className="mt-1 bg-overlay/5 border-overlay/10 text-accent-foreground placeholder:text-accent-foreground/30"
                    />
                    {errors.service && (
                      <p className="text-xs text-destructive mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-3.5 font-display font-bold text-primary-foreground transition-transform hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/25"
                  >
                    Book A Free Strategy Session
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      {/* Diagonal divider with gradient */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          className="relative block w-full h-32 md:h-48"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="divider-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(153, 52%, 11%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(140, 6%, 97%)" stopOpacity="1" />
            </linearGradient>
          </defs>
          <polygon
            points="0,200 1200,40 1200,200"
            fill="url(#divider-gradient)"
          />
          <polygon
            points="0,200 1200,80 1200,200"
            fill="hsl(140, 6%, 97%)"
          />
        </svg>
      </div>
    </section>
  );
}
