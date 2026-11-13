import Image from "next/image";
import { getProject } from "@/data/work";

const steps = [
  {
    title: "Talk",
    body: "Tell us what you need by email or WhatsApp. We reply within one business day with honest first questions — and a straight answer on whether we are right for the job.",
  },
  {
    title: "Scope",
    body: "A short call, then a fixed quote covering scope, timeline and price. No hourly drift, no surprise invoices halfway through.",
  },
  {
    title: "Build",
    body: "Design and copy are made together. You review two structured checkpoints — structure first, then polish — so feedback lands where it changes the work.",
  },
  {
    title: "Launch",
    body: "Files, logins and a walkthrough before handover. Monthly retainers are available if you want us on call afterwards.",
  },
];

/**
 * One real build stands in for the process, because "you review real pages"
 * is easier to believe with a real page in front of you.
 */
const shown = getProject("overlandhire");
const frame = shown?.screens[1] ?? shown?.screens[0];

export default function HowItWorks() {
  return (
    <section id="process" aria-label="How a project runs" className="bg-leway-mint">
      <div className="container py-24 md:py-32">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 text-leway-dark">How a project runs.</h2>
          <p className="font-body text-lead text-leway-dark/70 mt-5">
            Four steps, one team, two checkpoints. You always know what is
            happening and what it costs.
          </p>
        </div>

        {/* Steps read left to right; order comes from position, not numbers. */}
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 mt-14 md:mt-20">
          {steps.map((step) => (
            <li key={step.title}>
              <p className="font-display text-h3 text-leway-dark">{step.title}</p>
              <p className="font-body text-base text-leway-dark/70 mt-4">{step.body}</p>
            </li>
          ))}
        </ol>

        {/* What a checkpoint actually looks at. */}
        {shown && frame && (
          <figure className="mt-16 md:mt-24">
            <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-leway-paper">
              <Image
                src={frame.src}
                alt={`${shown.name} — ${frame.note || shown.imageAlt}`}
                fill
                sizes="(max-width: 1240px) 100vw, 1240px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="font-body text-small text-leway-dark/65 mt-4 flex flex-wrap items-baseline gap-x-3 max-w-[72ch]">
              <span className="text-leway-dark">
                {shown.name}
              </span>
              <span>{frame.note || shown.summary}</span>
            </figcaption>
          </figure>
        )}

        <a
          href="#contact"
          className="inline-flex items-center gap-2 font-body text-base text-leway-green-ink mt-14 py-3 underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
        >
          Start step one
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

