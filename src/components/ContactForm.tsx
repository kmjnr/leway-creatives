"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { services } from "@/data/services";
import { replyPromises, site } from "@/data/site";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  ...services.map((service) => service.title),
  "Not sure yet — advise me",
] as const;

const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under KSh 50,000",
  "KSh 50,000 – 150,000",
  "KSh 150,000 – 400,000",
  "KSh 400,000+",
  "Monthly retainer",
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  company: z.string().trim().max(120, "Keep it under 120 characters").optional().or(z.literal("")),
  whatsapp: z.string().trim().max(20, "Enter a valid number, or leave it empty").optional().or(z.literal("")),
  services: z.array(z.string()).optional(),
  budget: z.string().optional(),
  message: z.string().trim().min(20, "A couple of sentences helps us prepare — at least 20 characters").max(2000),
  website: z.string().optional(), // honeypot — humans never see this field
});

type FormData = z.infer<typeof schema>;

/* ── Field primitives — labels are bound with htmlFor ─────────── */
function Field({
  id,
  label,
  error,
  optional = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-body text-small font-medium text-leway-paper/85 mb-2">
        {label}
        {optional && <span className="text-leway-paper/70 font-normal"> · optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="font-body text-small text-red-300 mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full bg-leway-paper text-leway-dark rounded-pill px-5 min-h-[52px] font-body text-base placeholder:text-leway-dark/35 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-leway-dark";

interface ContactFormProps {
  /** Omit on the contact page, where the page header already carries the h1. */
  title?: string;
  lead?: string;
}

export default function ContactForm({
  title = "Tell us what you need.",
  lead = "A few lines are enough — the goal, the timeline, the budget if you have one. We reply within one business day with questions or a call slot.",
}: ContactFormProps) {
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [], company: "", whatsapp: "", budget: "", website: "" },
  });

  const onInvalid = (errs: typeof errors) => {
    const order = ["name", "email", "company", "whatsapp", "budget", "message"] as const;
    const first = order.find((key) => errs[key]);
    if (first) document.getElementById(`cf-${first}`)?.focus();
  };

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    if (data.website) return; // bot filled the honeypot — pretend success
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong. Please try again, or email us directly.");
      }
      setSubmittedName(data.name.trim().split(/\s+/)[0]);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="bg-leway-dark text-leway-paper"
    >
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left: the pitch and the direct routes */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">
            {title && (
              <h2 className="font-display text-h2 text-leway-paper [text-wrap:balance]">
                {title}
              </h2>
            )}
            {lead && (
              <p className="font-body text-lead text-leway-paper/70 max-w-[44ch]">
                {lead}
              </p>
            )}

            <ul className="flex flex-col gap-3 font-body text-base text-leway-paper/80">
              {replyPromises.map((promise) => (
                <li key={promise} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-leway-paper/50 flex-shrink-0"
                  />
                  {promise}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 min-h-[52px] px-6 rounded-pill bg-leway-forest text-leway-paper hover:bg-leway-dark transition-colors"
              >
                <Mail size={18} aria-hidden="true" />
                {site.email}
              </a>
              <a
                href={site.whatsappProject}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 min-h-[52px] px-6 rounded-pill bg-leway-forest text-leway-paper hover:bg-leway-dark transition-colors"
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp us
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <p className="font-body text-small text-leway-paper/70">
              {site.city}, {site.country} · working with teams in Kenya, the US,
              the UK, Canada and Australia.
            </p>

            {/* Fills the column with something useful rather than empty space
                beside the form. */}
            <div className="pt-2">
              <h3 className="font-body text-base font-semibold text-leway-paper">
                What helps us quote quickly
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {[
                  "The one thing a visitor should do on the finished site.",
                  "The pages you already have, or think you need.",
                  "Any deadline that is real, and what depends on it.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[10px] w-1.5 h-1.5 rounded-full bg-leway-paper/50 flex-shrink-0"
                    />
                    <span className="font-body text-base text-leway-paper/70 max-w-[38ch]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: the form */}
          <div className="bg-leway-forest rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
            {submittedName ? (
              <div role="status" className="flex flex-col items-center text-center gap-5 py-14">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-leway-green/20 text-leway-green">
                  <Check size={30} strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="font-display text-h3 text-leway-paper">
                  Thanks, {submittedName}.
                </h3>
                <p className="font-body text-base text-leway-paper/70 max-w-[36ch]">
                  Your enquiry is with us. Expect a reply within one business
                  day — if it&rsquo;s urgent, message us on WhatsApp.
                </p>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-base text-leway-green underline decoration-leway-green/40 underline-offset-4 hover:decoration-leway-green py-2"
                >
                  Message us on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
                {/* Honeypot — hidden from humans, irresistible to bots */}
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label htmlFor="cf-website">Website</label>
                  <input id="cf-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="cf-name" label="Your name" error={errors.name?.message}>
                    <input
                      id="cf-name"
                      type="text"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "cf-name-error" : undefined}
                      className={cn(inputClass, errors.name && "ring-2 ring-red-400")}
                      {...register("name")}
                    />
                  </Field>
                  <Field id="cf-email" label="Email" error={errors.email?.message}>
                    <input
                      id="cf-email"
                      type="email"
                      autoComplete="email"
                      spellCheck={false}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "cf-email-error" : undefined}
                      className={cn(inputClass, errors.email && "ring-2 ring-red-400")}
                      {...register("email")}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="cf-company" label="Company" optional error={errors.company?.message}>
                    <input
                      id="cf-company"
                      type="text"
                      autoComplete="organization"
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? "cf-company-error" : undefined}
                      className={cn(inputClass, errors.company && "ring-2 ring-red-400")}
                      {...register("company")}
                    />
                  </Field>
                  <Field id="cf-whatsapp" label="WhatsApp number" optional error={errors.whatsapp?.message}>
                    <input
                      id="cf-whatsapp"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+254…"
                      aria-invalid={!!errors.whatsapp}
                      aria-describedby={errors.whatsapp ? "cf-whatsapp-error" : undefined}
                      className={cn(inputClass, errors.whatsapp && "ring-2 ring-red-400")}
                      {...register("whatsapp")}
                    />
                  </Field>
                </div>

                {/* Services as checkbox chips — no popovers, fully keyboard-usable */}
                <fieldset>
                  <legend className="font-body text-small font-medium text-leway-paper/85 mb-3">
                    What do you need? <span className="text-leway-paper/70 font-normal">· pick any</span>
                  </legend>
                  <div className="flex flex-wrap gap-2.5">
                    {SERVICE_OPTIONS.map((option) => (
                      <label key={option} className="cursor-pointer">
                        <input type="checkbox" value={option} className="sr-only peer" {...register("services")} />
                        <span className="inline-flex items-center min-h-[44px] px-4 rounded-pill bg-leway-paper/10 text-leway-paper/85 font-body text-small transition-colors peer-checked:bg-leway-green peer-checked:text-leway-dark peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-leway-paper">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Field id="cf-budget" label="Budget range" optional error={errors.budget?.message}>
                  <div className="relative">
                    <select
                      id="cf-budget"
                      defaultValue=""
                      aria-invalid={!!errors.budget}
                      aria-describedby={errors.budget ? "cf-budget-error" : undefined}
                      className={cn(inputClass, "appearance-none pr-12", errors.budget && "ring-2 ring-red-400")}
                      {...register("budget")}
                    >
                      <option value="">Select a range…</option>
                      {BUDGET_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-leway-dark/65"
                    />
                  </div>
                </Field>

                <Field id="cf-message" label="A little more detail" error={errors.message?.message}>
                  <textarea
                    id="cf-message"
                    rows={4}
                    placeholder="What are you building, and what should it do for the business?"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "cf-message-error" : undefined}
                    className={cn(
                      "w-full bg-leway-paper text-leway-dark rounded-card px-5 py-4 font-body text-base placeholder:text-leway-dark/35 resize-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-leway-dark",
                      errors.message && "ring-2 ring-red-400",
                    )}
                    {...register("message")}
                  />
                </Field>

                {submitError && (
                  <p role="alert" className="font-body text-small text-red-300 bg-leway-dark/40 rounded-card px-4 py-3">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center min-h-[56px] rounded-pill bg-leway-green text-leway-dark font-semibold text-base hover:bg-[#1EB857] active:scale-[0.98] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending…" : "Send enquiry"}
                </button>

                <p className="font-body text-small text-leway-paper/70 text-center">
                  We reply within one business day. No newsletters, no spam.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
