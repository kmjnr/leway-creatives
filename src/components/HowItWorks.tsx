import Photo from "@/components/ui/Photo";

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
 * The process field gets atmosphere, not a screenshot. A car-hire pricing
 * page never belonged under "How a project runs"; screenshots of live builds
 * stay in the Work section and the case studies, where they are evidence.
 */
const processImage = {
  src: "/images/generated/process-desk.webp",
  alt: "Four cream sheets with faint empty pencil layout boxes laid in a row on a desk beside a closed notebook, a pencil and a cup of coffee",
  caption:
    "Four steps, written down before anything is built. Atmosphere, not a client build.",
};

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

        <Photo
          src={processImage.src}
          alt={processImage.alt}
          caption={processImage.caption}
          ratio="16/10"
          sizes="(max-width: 1240px) 100vw, 1240px"
          className="mt-16 md:mt-24"
        />

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
