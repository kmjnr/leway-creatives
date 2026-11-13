import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import FaqList from "@/components/ui/FaqList";
import Photo from "@/components/ui/Photo";
import { faqs } from "@/data/faqs";
import { services, serviceNames } from "@/data/services";
import { projects } from "@/data/work";
import { site } from "@/data/site";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  pageMetadata,
  websiteJsonLd,
} from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact — start a project",
  description:
    "Tell us what you need and get a reply within one business day: a 20-minute scoping call, then one fixed quote before any work starts. Nairobi, Kenya — working worldwide.",
  path: "/contact",
  keywords:
    "contact web designer Nairobi, hire web designer Kenya, get a website quote Kenya, LEWAY Creatives contact",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Contact" }];

/** Three builds that used different services, so the strip shows range. */
const peek = [
  projects.find((p) => p.slug === "lifeline-hospitals"),
  projects.find((p) => p.slug === "paidtaskers"),
  projects.find((p) => p.slug === "premiumsafeboxes"),
].filter((p): p is (typeof projects)[number] => Boolean(p));

/** What happens after the form, so nobody has to guess. */
const nextSteps = [
  {
    title: "A reply within one business day",
    body: "From a person, with either questions or two slots for a call. Not an autoresponder and not a newsletter signup.",
  },
  {
    title: "A 20-minute scoping call",
    body: "We ask what the site or the campaign has to achieve, who it has to convince, and what the deadline actually is.",
  },
  {
    title: "One fixed quote, in writing",
    body: "Scope, timeline, price, and what we need from you. Nothing is billable until you approve that document.",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(serviceNames),
      websiteJsonLd(),
      breadcrumbJsonLd(crumbs),
      {
        "@type": "ContactPage",
        name: `Contact ${site.name}`,
        description:
          "Project enquiries, scoping calls and fixed quotes for web design, copywriting and lead generation.",
        url: `${site.url}/contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main">
        <PageHeader
          crumbs={crumbs}
          title="Start a project."
          lead="Tell us the outcome you need and what is in the way. A few lines is enough — you will get a reply from the person who would do the work."
          tone="dark"
        />

        {/* The form continues the dark field the header opened. */}
        <ContactForm title="" lead="" />

        {/* What happens next. */}
        <section aria-labelledby="next-heading" className="bg-leway-paper">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 id="next-heading" className="font-display text-h2 text-leway-dark">
                  What happens next.
                </h2>
                <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[34ch]">
                  Three steps, in this order, with nothing billable until the
                  third one is agreed.
                </p>

                <Photo
                  src="/images/photography/contact-desk.jpg"
                  alt="A person on a video call at a desk, laptop open, notebook beside them"
                  ratio="4/3"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="mt-10"
                  caption="Every project starts the same way: a short call, then a written scope."
                />
              </div>

              <ol className="lg:col-span-8 flex flex-col gap-10">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[auto_1fr] gap-x-7 gap-y-2">
                    <span className="font-display text-h3 text-leway-dark/25" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-h3 text-leway-dark">{step.title}</h3>
                      <p className="font-body text-base text-leway-dark/70 mt-3 max-w-[58ch]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* If they would rather not fill in a form. */}
        <section aria-labelledby="direct-heading" className="bg-leway-paper-2">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 id="direct-heading" className="font-display text-h2 text-leway-dark">
                  Or skip the form.
                </h2>
                <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[44ch]">
                  Both routes reach the same inbox, and both get answered the
                  same day.
                </p>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-4">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-card bg-leway-paper px-7 py-6 min-h-[44px] hover:bg-leway-mint transition-colors"
                >
                  <span className="font-display text-h3 text-leway-dark">
                    Email the studio
                  </span>
                  <span className="font-body text-base text-leway-dark/70">
                    {site.email}
                  </span>
                </a>
                <a
                  href={site.whatsappProject}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-card bg-leway-paper px-7 py-6 min-h-[44px] hover:bg-leway-mint transition-colors"
                >
                  <span className="font-display text-h3 text-leway-dark">
                    WhatsApp us
                  </span>
                  <span className="font-body text-base text-leway-dark/70">
                    {site.phoneDisplay}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>

                <p className="font-body text-base text-leway-dark/70 mt-4 max-w-[58ch]">
                  Not ready to talk? The{" "}
                  <Link
                    href="/services"
                    className="text-leway-green-ink underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
                  >
                    services page lists from-prices and timelines
                  </Link>{" "}
                  and the{" "}
                  <Link
                    href="/work"
                    className="text-leway-green-ink underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
                  >
                    work page shows what came out of them
                  </Link>
                  . {services.length} services, ten builds, no gate.
                </p>

                {/* A taste of the work, so someone deciding whether to get in
                    touch sees the evidence without leaving the page. */}
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6 mt-10">
                  {peek.map((project) => {
                    const frame = project.screens[1] ?? project.screens[0];
                    return (
                      <li key={project.slug}>
                        <Link href={`/work/${project.slug}`} className="group block">
                          <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-leway-stone">
                            <Image
                              src={frame.src}
                              alt={`${project.name} — ${frame.note || project.imageAlt}`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 320px"
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                          </div>
                          <p className="font-body text-small text-leway-dark mt-3">
                            {project.name}
                            <span className="text-leway-dark/65"> · {project.sector}</span>
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className="bg-leway-paper">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <h2 id="faq-heading" className="font-display text-h2 text-leway-dark">
                    Still deciding?
                  </h2>
                  <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[34ch]">
                    The questions people ask before they send the form.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-8">
                <FaqList items={faqs} idPrefix="contact-faq" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
