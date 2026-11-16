import { Mail, MessageCircle } from "lucide-react";
import { replyPromises, site } from "@/data/site";

interface ContactSectionProps {
  /** Omit on the contact page, where the page header already carries the h1. */
  title?: string;
  lead?: string;
  /**
   * The interactive form. Passed in rather than imported so a page that only
   * needs the form further down (the homepage) can hand over a deferred
   * version without pulling the validation bundle into its initial graph.
   */
  form: React.ReactNode;
}

const quoteHints = [
  "The one thing a visitor should do on the finished site.",
  "The pages you already have, or think you need.",
  "Any deadline that is real, and what depends on it.",
];

/**
 * The contact field: a static argument on the left, the form on the right.
 * The left column is server-rendered, so the promise, the email address and
 * the WhatsApp route exist even if the form's JavaScript never loads.
 */
export default function ContactSection({
  title = "Tell us what you need.",
  lead = "A few lines are enough — the goal, the timeline, the budget if you have one. We reply within one business day with questions or a call slot.",
  form,
}: ContactSectionProps) {
  return (
    <section id="contact" aria-label="Contact" className="bg-leway-dark text-leway-paper">
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
                {quoteHints.map((item) => (
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
          {form}
        </div>
      </div>
    </section>
  );
}
