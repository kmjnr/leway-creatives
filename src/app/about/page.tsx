import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import PageCta from "@/components/PageCta";
import WorkCard from "@/components/ui/WorkCard";
import Photo from "@/components/ui/Photo";
import { CtaButton } from "@/components/ui/CtaButton";
import { projects } from "@/data/work";
import { services, serviceNames } from "@/data/services";
import { site } from "@/data/site";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  pageMetadata,
  websiteJsonLd,
} from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About — a small studio in Nairobi that ships",
  description:
    "LEWAY Creatives is a senior team in Nairobi building websites, copy and pipeline for businesses in Kenya and worldwide. How we work, who does what, and what we refuse to do.",
  path: "/about",
  keywords:
    "Nairobi web design studio, about LEWAY Creatives, small web studio Kenya, remote web design team",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "About" }];

/** The four steps, stated as commitments rather than a funnel diagram. */
const process = [
  {
    title: "Talk",
    body: "A 20-minute call about the outcome, not the deliverable. What has to change for this project to be worth doing? If we are not the right people, we say so on this call.",
  },
  {
    title: "Scope",
    body: "You get a written scope: the pages or pieces, the timeline, what we need from you and when, and one fixed price. Nothing starts until you approve that document.",
  },
  {
    title: "Build",
    body: "Design, words and code move together, so you review real pages rather than flat mockups. You see progress as it happens instead of at the end.",
  },
  {
    title: "Launch",
    body: "We deploy, check the analytics and the forms, and hand over the logins, the files and a walkthrough. After that the site is yours — no licence, no lock-in.",
  },
];

/** What we will not do. Easier to trust a studio whose refusals are written down. */
const refusals = [
  "We do not show work we did not do, or stock images of somebody else's building.",
  "We do not put a number in a case study that we did not measure ourselves.",
  "We do not quote low to win the job and recover it with change requests.",
  "We do not lock you into a platform we control — you get the domain and the code.",
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(serviceNames),
      websiteJsonLd(),
      breadcrumbJsonLd(crumbs),
      {
        "@type": "AboutPage",
        name: `About ${site.name}`,
        description:
          "Who builds the work, how a project runs, and what the studio refuses to do.",
        url: `${site.url}/about`,
      },
    ],
  };

  const proof = projects.find((p) => p.slug === "lifeline-hospitals") ?? projects[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main">
        <PageHeader
          crumbs={crumbs}
          title="A small studio that ships."
          lead={`${site.name} is a senior team in ${site.city}. We design and build websites, write the words that go on them, and set up the outreach that brings people back. No account managers, no handoffs between three suppliers.`}
          width="wide"
        />

        {/* Who we are, in plain statements rather than a founding myth. */}
        <section aria-labelledby="who-heading" className="bg-leway-paper">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 id="who-heading" className="font-display text-h2 text-leway-dark">
                  Who you actually work with.
                </h2>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-6">
                <p className="font-body text-lead text-leway-dark/75 max-w-[62ch]">
                  When you hire us, the person who scopes the work is the person
                  who designs it and the person who builds it. There is no relay
                  race between a sales call, a designer and a developer, which
                  is where most small projects lose their decisions.
                </p>
                <p className="font-body text-base text-leway-dark/70 max-w-[62ch]">
                  We take on a small number of projects at once so that the
                  timeline we agree is one we can actually keep. That is also
                  why the scoping call sometimes ends with us recommending less
                  work than you asked for — a landing page instead of a site, or
                  copy instead of a rebuild.
                </p>

                <Photo
                  src="/images/photography/founder-portrait.webp"
                  alt="Lewis Kim, founder of LEWAY Creatives"
                  caption="Lewis Kim — the person who scopes, designs and builds the work."
                  ratio="1/1"
                  sizes="(max-width: 1024px) 100vw, 320px"
                  className="mt-10 max-w-xs"
                />

                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
                  <div>
                    <dt className="font-body text-small text-leway-dark/65">Based in</dt>
                    <dd className="font-body text-base text-leway-dark mt-1">
                      {site.city}, {site.country}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-body text-small text-leway-dark/65">Working with</dt>
                    <dd className="font-body text-base text-leway-dark mt-1">
                      Clients in Kenya, the US, the UK, Canada and Australia
                    </dd>
                  </div>
                  <div>
                    <dt className="font-body text-small text-leway-dark/65">Building since</dt>
                    <dd className="font-body text-base text-leway-dark mt-1">{site.founded}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* How a project runs — this is the page's mint field. */}
        <section id="process" aria-labelledby="process-heading" className="bg-leway-mint">
          <div className="container py-20 md:py-28">
            <div className="max-w-2xl">
              <h2 id="process-heading" className="font-display text-h2 text-leway-dark">
                Four steps, and what each one owes you.
              </h2>
              <p className="font-body text-lead text-leway-dark/75 mt-5">
                Every project runs this way, whether it is a landing page or a
                full site. The point of writing it down is that you can hold us
                to it.
              </p>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-12 md:mt-16">
              {process.map((step, i) => (
                <li key={step.title}>
                  <span className="font-display text-h3 text-leway-dark/30" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-h3 text-leway-dark mt-3">{step.title}</h3>
                  <p className="font-body text-base text-leway-dark/75 mt-3 max-w-[42ch]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-14">
              <CtaButton href="/contact">Book the scoping call</CtaButton>
            </div>
          </div>
        </section>

        {/* The refusals. */}
        <section aria-labelledby="refusals-heading" className="bg-leway-dark">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h2
                  id="refusals-heading"
                  className="font-display text-h2 text-leway-paper lg:sticky lg:top-28"
                >
                  What we will not do.
                </h2>
              </div>
              <div className="lg:col-span-8">
                <ul className="flex flex-col gap-7">
                  {refusals.map((rule) => (
                    <li key={rule} className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-[10px] w-1.5 h-1.5 rounded-full bg-leway-paper/50 flex-shrink-0"
                      />
                      <span className="font-body text-lead text-leway-paper/80 max-w-[58ch]">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="font-body text-base text-leway-paper/70 mt-10 max-w-[58ch]">
                  The work is the proof. Everything on this site is a screenshot
                  of something that runs, and every project links to it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* One build, shown rather than described. */}
        <section aria-labelledby="how-heading" className="bg-leway-paper">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <h2 id="how-heading" className="font-display text-h2 text-leway-dark">
                  What that looks like on a screen.
                </h2>
                <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[46ch]">
                  A hospital group with two branches needed patients to find the
                  right one and book without calling. Here is the build, and the
                  decisions behind it.
                </p>
                <div className="mt-8">
                  <Link
                    href={`/work/${proof.slug}`}
                    className="inline-flex items-center gap-2 font-body text-base text-leway-green-ink py-3 underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
                  >
                    Read the {proof.name} case study
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-leway-stone">
                    <Image
                      src={proof.screens[1]?.src ?? proof.image}
                      alt={`${proof.name} — ${proof.screens[1]?.note ?? proof.imageAlt}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="font-body text-small text-leway-dark/65 mt-4">
                    {proof.name} — {proof.screens[1]?.note ?? proof.sector}
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-20 md:mt-24">
              {projects.slice(0, 3).map((project) => (
                <WorkCard
                  key={project.slug}
                  project={project}
                  to="internal"
                  size="sm"
                  showMeta
                  showStatus={false}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mt-12">
              <CtaButton href="/work" variant="link">
                All ten builds
              </CtaButton>
              <Link
                href="/services"
                className="font-body text-base text-leway-dark/70 py-3 underline decoration-leway-dark/40 underline-offset-4 hover:text-leway-dark hover:decoration-leway-dark transition-colors"
              >
                {services.length} services, with from-prices
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PageCta
        title="If this sounds like the way you want to work."
        body="Tell us the problem in a few lines. You will get a reply within one business day, a 20-minute call, and one fixed number before anything starts."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See the work", href: "/work" }}
        withReplyDetail
      />
    </>
  );
}
