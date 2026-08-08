"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronDown, Check, ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";

/* ── Schema ────────────────────────────────────────────── */
const SERVICE_OPTIONS = [
  "Web Design & Development",
  "Content & Copywriting",
  "Marketing Design",
  "Lead Generation",
  "Career & Personal Branding",
  "Full Growth Package (All Services)",
  "Not Sure Yet — I Need Advice",
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  whatsapp: z.string().trim().min(8, "Enter a valid WhatsApp number").max(20),
  services: z.array(z.string()).optional(),
  service: z.string().trim().min(1, "Tell us what you need").max(1000),
});

type FormData = z.infer<typeof schema>;

function getFollowingMonth() {
  const next = new Date();
  next.setMonth(next.getMonth() + 1);
  return next.toLocaleString("en-US", { month: "long" });
}

/* ── Field primitives ─────────────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-body text-sm text-white/70 block mb-1.5 ml-2 font-medium">{children}</label>
  );
}

function PillInput({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-white border border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-leway-dark placeholder:text-black/30 focus:outline-none focus:border-leway-green focus:ring-1 focus:ring-leway-green transition-all duration-200 ${className}`}
    />
  );
}

function PillTextarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full bg-white border border-black/10 rounded-3xl px-5 py-3.5 font-body text-sm text-leway-dark placeholder:text-black/30 focus:outline-none focus:border-leway-green focus:ring-1 focus:ring-leway-green transition-all duration-200 resize-none ${className}`}
    />
  );
}

/* ── Main Component ───────────────────────────────────── */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const followingMonth = getFollowingMonth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { services: [] } });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setSubmitted(data.name);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-[clamp(4rem,3rem+5vw,8rem)] bg-leway-dark text-white overflow-hidden"
      aria-label="Contact LEWAY Creatives"
    >
      {/* Background image with green overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/contact_image.webp"
          alt="LEWAY Creatives workspace"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center opacity-50"
        />
        {/* Dark pine & green overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-leway-dark/90 via-leway-forest/85 to-leway-dark/90" />
        <div className="absolute inset-0 bg-leway-green/15 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Headline ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col gap-8 lg:pr-10 lg:sticky lg:top-32"
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight">
                Let&apos;s build something you&apos;re proud of.
              </h2>
              <p className="font-body text-base md:text-lg text-white/55 mt-5 leading-relaxed max-w-md">
                Fill in your details and we&apos;ll get back to you within a few hours. No commitment required.
              </p>
            </div>

            {/* Trust strip */}
            <div className="flex flex-col gap-3">
              {[
                "23+ projects delivered worldwide",
                "Fast turnaround — no waiting weeks",
                "100% client satisfaction rate",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-leway-green/20 flex items-center justify-center flex-shrink-0">
                    <Check size={11} strokeWidth={2.5} className="text-leway-green" />
                  </span>
                  <span className="font-body text-sm text-white/55">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form card ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="relative"
          >
            {/* Floating Availability Badge */}
            <div className="absolute -top-5 right-6 z-20 hidden sm:flex items-center gap-2 bg-white text-leway-dark shadow-xl rounded-full px-5 py-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-leway-green animate-pulse" />
              <span className="font-body text-sm font-medium tracking-wide">
                Taking new clients for {followingMonth}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="bg-leway-forest border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center gap-6 shadow-2xl relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-leway-green/20 flex items-center justify-center">
                    <CheckCircle2 size={32} strokeWidth={1.5} className="text-leway-green" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl text-white mb-3">You&apos;re all set, {submitted}!</h3>
                    <p className="font-body text-base text-white/60 leading-relaxed">
                      We&apos;ve received your message and will be in touch within a few hours. Check your inbox (or WhatsApp).
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="bg-leway-forest border border-white/10 rounded-[2rem] p-5 sm:p-8 md:p-10 flex flex-col gap-6 shadow-2xl relative z-10"
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>Your name *</FieldLabel>
                      <PillInput
                        {...register("name")}
                        placeholder="Jane Smith"
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="font-body text-xs text-red-500 mt-1.5 pl-4">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <FieldLabel>Email address *</FieldLabel>
                      <PillInput
                        {...register("email")}
                        type="email"
                        placeholder="jane@company.com"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="font-body text-xs text-red-500 mt-1.5 pl-4">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <FieldLabel>WhatsApp number *</FieldLabel>
                    <PillInput
                      {...register("whatsapp")}
                      type="tel"
                      placeholder="+1 234 567 8900"
                      autoComplete="tel"
                    />
                    {errors.whatsapp && (
                      <p className="font-body text-xs text-red-500 mt-1.5 pl-4">{errors.whatsapp.message}</p>
                    )}
                  </div>

                  {/* Services multi-select dropdown */}
                  <div>
                    <FieldLabel>What do you need?</FieldLabel>
                    <Controller
                      name="services"
                      control={control}
                      render={({ field }) => {
                        const selected: string[] = field.value ?? [];
                        const toggle = (opt: string) => {
                          const next = selected.includes(opt)
                            ? selected.filter((s) => s !== opt)
                            : [...selected, opt];
                          field.onChange(next);
                        };
                        return (
                          <div ref={dropdownRef} className="relative">
                            <button
                              type="button"
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                              className="w-full bg-white border border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-left flex items-center justify-between transition-all duration-200 hover:border-leway-green"
                            >
                              <span className={selected.length ? "text-leway-dark" : "text-black/30"}>
                                {selected.length
                                  ? `${selected.length} service${selected.length > 1 ? "s" : ""} selected`
                                  : "Select services…"}
                              </span>
                              <ChevronDown
                                size={18}
                                className={`text-black/40 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                              />
                            </button>

                            <AnimatePresence>
                              {dropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 8 }}
                                  transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                                  className="absolute top-full left-0 right-0 mt-2 bg-leway-forest border border-white/10 rounded-2xl overflow-hidden z-50 shadow-xl"
                                >
                                  {SERVICE_OPTIONS.map((opt) => {
                                    const checked = selected.includes(opt);
                                    return (
                                      <button
                                        key={opt}
                                        type="button"
                                        onClick={() => toggle(opt)}
                                        className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                                      >
                                        <span
                                          className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all ${
                                            checked
                                              ? "bg-leway-green border-leway-green"
                                              : "border-white/20"
                                          }`}
                                        >
                                          {checked && <Check size={11} strokeWidth={3} className="text-white" />}
                                        </span>
                                        <span className="font-body text-sm text-white/80">{opt}</span>
                                      </button>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <FieldLabel>A little more detail *</FieldLabel>
                    <PillTextarea
                      {...register("service")}
                      rows={4}
                      placeholder="Tell us about your business, your goal, your timeline, your budget — anything that helps us prepare."
                    />
                    {errors.service && (
                      <p className="font-body text-xs text-red-500 mt-1.5 pl-4">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Error */}
                  {submitError && (
                    <p className="font-body text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
                      {submitError}
                    </p>
                  )}

                  {/* Reassurance — placed above submit as final persuasion beat */}
                  <p className="font-body text-xs text-white/40 text-center">
                    We respond within a few hours. No spam, ever.
                  </p>

                  {/* Submit */}
                  <CtaButton
                    type="submit"
                    disabled={isSubmitting}
                    showArrow={!isSubmitting}
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    wrapperClassName="w-full mt-2"
                  >
                    {isSubmitting ? "Sending…" : "Start a Project"}
                  </CtaButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}