import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PageCta from "@/components/PageCta";
import ServiceRow from "@/components/ui/ServiceRow";
import Photo from "@/components/ui/Photo";
import FaqList from "@/components/ui/FaqList";
import { services, serviceNames } from "@/data/services";
import { faqs } from "@/data/faqs";
import { projectsForService } from "@/data/work";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  pageMetadata,
  websiteJsonLd,
} from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services — web design, copywriting, branding & lead generation",
  description:
    "Five services with from-prices and honest timelines: web design & development from KSh 45,000, brand identity from KSh 30,000, lead generation from KSh 20,000 a month.",
  path: "/services",
  keywords:
    "web design price Kenya, copywriting rates Nairobi, brand identity Kenya, lead generation service, personal branding Kenya",
});

/** What the prices have in common — stated once, on the index. */
const pricingRules = [
  "Every quote is fixed before work starts — no hourly surprises.",
  "Prices are per project unless the line says monthly.",
  "Two or three services together are quoted as one combined number.",
  "The scoping call is free and ends with a number, not a deck.",
];

const crumbs = [{ label: "Home", href: "/" }, { label: "Services" }];

export default function ServicesIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(serviceNames),
      websiteJsonLd(),
      breadcrumbJsonLd(crumbs),
      {
        "@type": "ItemList",
        name: "Services",
        itemListElement: services.map((service, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: service.title,
          description: service.summary,
        })),
      },
      faqJsonLd(faqs),
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
          title="Services."
          lead="Five ways to work with us. Each one has a starting price, a realistic timeline and a page that explains exactly what lands in your folder. Most projects combine two or three."
          tone="paper"
          width="wide"
        >
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center rounded-pill bg-leway-paper-2 px-5 py-3 min-h-[44px] font-body text-base text-leway-dark hover:bg-leway-mint transition-colors"
                >
                  {service.short}
                </Link>
              </li>
            ))}
          </ul>
        </PageHeader>

        {/* The five disciplines, one illustration each. Proof lives on the
            service pages and the work pages, not in this catalogue. */}
        <section aria-label="All services" className="bg-leway-paper">
          <div className="container py-20 md:py-28">
            <p className="font-body text-base text-leway-dark/70 mb-10 max-w-[62ch]">
              The pictures illustrate the disciplines, not finished client
              sites. Follow any service through for the real builds.
            </p>
            <ul className="flex flex-col gap-4">
              {services.map((service) => (
                <ServiceRow
                  key={service.slug}
                  service={service}
                  tone="paper"
                  showIndexImage
                />
              ))}
            </ul>
          </div>
        </section>

        {/* How the pricing works — one section, so no single page repeats it. */}
        <section aria-labelledby="pricing-heading" className="bg-leway-paper-2">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 id="pricing-heading" className="font-display text-h2 text-leway-dark">
                  How the pricing works.
                </h2>
                <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[44ch]">
                  The from-prices above are real starting points, not bait. What
                  you are quoted depends on page count, how much writing is
                  needed, and how quickly decisions come back.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ul className="flex flex-col gap-6">
                  {pricingRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-[10px] w-1.5 h-1.5 rounded-full bg-leway-dark/40 flex-shrink-0"
                      />
                      <span className="font-body text-base text-leway-dark/75 max-w-[58ch]">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="font-body text-base text-leway-dark/70 mt-10 max-w-[58ch]">
                  Not sure which you need? The honest answer is often the
                  smallest one that solves the problem. Say what you are trying
                  to fix and we will tell you which service that is — including
                  when it is the cheaper one.
                </p>

                <Photo
                  src="/images/photography/photo-pricing.jpg"
                  alt="An oak desk with a coffee cup, a succulent and a closed notebook"
                  ratio="16/10"
                  sizes="(max-width: 1024px) 100vw, 512px"
                  className="mt-10 max-w-lg"
                  caption="Every quote is written down before any work starts."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Which services built which projects — the cross-link. */}
        <section aria-labelledby="proof-heading" className="bg-leway-paper">
          <div className="container py-20 md:py-28">
            <h2 id="proof-heading" className="font-display text-h2 text-leway-dark">
              What each one built.
            </h2>
            <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[58ch]">
              The services are not sold in the abstract. Each of these has real
              projects attached; the case study pages show screenshots of the
              live deployment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-12">
              {services.map((service) => {
                const built = projectsForService(service.slug);
                const listed = built.slice(0, 4);
                const rest = built.length - listed.length;
                return (
                  <div key={service.slug} className="rounded-card bg-leway-paper-2 p-7">
                    <h3 className="font-display text-h3 text-leway-dark">
                      <Link
                        href={`/services/${service.slug}`}
                        className="hover:text-leway-green-ink transition-colors"
                      >
                        {service.short}
                      </Link>
                    </h3>
                    <p className="font-body text-small text-leway-dark/65 mt-2">
                      {built.length} project{built.length === 1 ? "" : "s"} on the site
                    </p>
                    <ul className="mt-4 flex flex-col gap-1">
                      {listed.map((project) => (
                        <li key={project.slug}>
                          <Link
                            href={`/work/${project.slug}`}
                            className="inline-flex items-center py-2 font-body text-base text-leway-dark/75 hover:text-leway-dark transition-colors"
                          >
                            {project.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {rest > 0 && (
                      <p className="font-body text-small text-leway-dark/65 mt-2">
                        and {rest} more on the{" "}
                        <Link
                          href="/work"
                          className="text-leway-green-ink underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
                        >
                          work page
                        </Link>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* The general FAQ lives here in full; service pages carry two each. */}
        <section aria-labelledby="faq-heading" className="bg-leway-paper-2">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <h2 id="faq-heading" className="font-display text-h2 text-leway-dark">
                    Before you ask.
                  </h2>
                  <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[34ch]">
                    The questions that come up on almost every first call.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-8">
                <FaqList items={faqs} idPrefix="services-faq" closedTone="paper" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageCta
        title="Tell us which one you need."
        body="Or tell us the problem and we will say which service fits — including when the answer is that you do not need us yet."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See the work first", href: "/work" }}
        withReplyDetail
      />
    </>
  );
}
