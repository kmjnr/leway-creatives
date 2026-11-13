import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageCta from "@/components/PageCta";
import FaqList from "@/components/ui/FaqList";
import Photo from "@/components/ui/Photo";
import WorkCard from "@/components/ui/WorkCard";
import { CtaButton } from "@/components/ui/CtaButton";
import { getService, services, serviceNames } from "@/data/services";
import { getProject, projectsForService } from "@/data/work";
import { site } from "@/data/site";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  pageMetadata,
  websiteJsonLd,
} from "@/lib/metadata";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: `${service.title} — from ${service.price.amount}${service.price.suffix ?? ""}`,
    description: service.summary,
    path: `/services/${service.slug}`,
    ogImage: getProject(service.proofProject)?.image ?? site.ogImage,
    ogImageAlt: getProject(service.proofProject)?.imageAlt ?? `${site.name} — selected work`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.relatedProjects
    .map((s) => getProject(s))
    .filter((p): p is NonNullable<ReturnType<typeof getProject>> => Boolean(p));
  const alsoBuilt = projectsForService(service.slug)
    .filter((p) => !service.relatedProjects.includes(p.slug))
    .slice(0, 3);
  const otherServices = services.filter((s) => s.slug !== service.slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.short },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(serviceNames),
      websiteJsonLd(),
      breadcrumbJsonLd(crumbs),
      {
        "@type": "Service",
        name: service.title,
        serviceType: service.title,
        description: service.summary,
        url: `${site.url}/services/${service.slug}`,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: site.areasServed.map((code) => ({
          "@type": "Country",
          identifier: code,
        })),
        offers: {
          "@type": "Offer",
          priceCurrency: "KES",
          price: service.price.amount.replace(/[^\d]/g, ""),
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: service.price.amount.replace(/[^\d]/g, ""),
            priceCurrency: "KES",
            valueAddedTaxIncluded: false,
          },
          description: service.price.note,
          availability: "https://schema.org/InStock",
        },
      },
      // The two questions on this page, and only those, so the markup cannot drift.
      faqJsonLd(service.faqs),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main">
        <header className="bg-leway-paper pt-28 md:pt-36">
          <div className="container">
            <Breadcrumbs items={crumbs} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-6">
              <div className="lg:col-span-7">
                <span aria-hidden="true" className="block w-10 h-[3px] rounded-pill bg-leway-gold mt-7" />

                <h1 className="font-display text-display text-leway-dark mt-6">
                  {service.title}
                </h1>
                <p className="font-body text-lead text-leway-dark/70 mt-6 max-w-[58ch]">
                  {service.intro}
                </p>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-9">
                  <CtaButton href="/contact">Start with a scoping call</CtaButton>
                  <Link
                    href="#proof"
                    className="font-body text-base text-leway-dark/70 py-3 underline decoration-leway-dark/40 underline-offset-4 hover:text-leway-dark hover:decoration-leway-dark transition-colors"
                  >
                    See the proof first
                  </Link>
                </div>
              </div>

              {/* The three numbers people came for. */}
              <dl className="lg:col-span-5 lg:pt-4">
                <div className="rounded-card bg-leway-paper-2 p-7 md:p-9 flex flex-col gap-7">
                  <div>
                    <dt className="font-body text-small text-leway-dark/65">From</dt>
                    <dd className="mt-1 flex items-baseline gap-1.5">
                      <span className="font-display text-h2 text-leway-dark">
                        {service.price.amount}
                      </span>
                      {service.price.suffix && (
                        <span className="font-body text-base text-leway-dark/65">
                          {service.price.suffix}
                        </span>
                      )}
                    </dd>
                    <p className="font-body text-small text-leway-dark/65 mt-2 max-w-[42ch]">
                      {service.price.note}
                    </p>
                  </div>
                  <div>
                    <dt className="font-body text-small text-leway-dark/65">Typical timeline</dt>
                    <dd className="font-body text-base text-leway-dark mt-1">
                      {service.timeline.value}
                    </dd>
                    <p className="font-body text-small text-leway-dark/65 mt-2 max-w-[42ch]">
                      {service.timeline.note}
                    </p>
                  </div>
                  <div>
                    <dt className="font-body text-small text-leway-dark/65">Deliverables</dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-pill bg-leway-paper px-4 py-2 font-body text-small text-leway-dark"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </header>

        {/* The problem, stated plainly. */}
        <section aria-labelledby="problem-heading" className="bg-leway-dark">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-5">
                <h2
                  id="problem-heading"
                  className="font-display text-h2 text-leway-paper lg:sticky lg:top-28"
                >
                  {service.problem.heading}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="font-body text-lead text-leway-paper/80 max-w-[60ch]">
                  {service.problem.body}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What the work involves. The page's one mint field: this is the process. */}
        <section aria-labelledby="includes-heading" className="bg-leway-mint">
          <div className="container py-20 md:py-28">
            <h2 id="includes-heading" className="font-display text-h2 text-leway-dark">
              What that involves.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 mt-12 md:mt-16">
              {service.includes.map((item, i) => (
                <div key={item.title}>
                  <span
                    className="font-display text-h3 text-leway-dark/30"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-h3 text-leway-dark mt-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-base text-leway-dark/75 mt-3 max-w-[46ch]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Atmosphere for the process field. Never presented as a build. */}
            <Photo
              src={service.involvesImage.src}
              alt={service.involvesImage.alt}
              caption={service.involvesImage.caption}
              ratio="16/10"
              sizes="(max-width: 768px) 100vw, 768px"
              className="mt-14 md:mt-16 max-w-3xl"
            />
          </div>
        </section>

        {/* Where the finished work turns up. Atmosphere only, never evidence. */}
        <section aria-labelledby="context-heading" className="bg-leway-paper-2">
          <div className="container py-20 md:py-28">
            <div className="max-w-2xl">
              <h2 id="context-heading" className="font-display text-h2 text-leway-dark">
                Where it shows up.
              </h2>
              <p className="font-body text-lead text-leway-dark/70 mt-5">
                The work leaves our desk and turns up in ordinary places — a
                counter, a leaflet, a phone that finally rings. The photograph
                is atmosphere. The proof is the builds below.
              </p>
            </div>

            <Photo
              src={service.contextImage.src}
              alt={service.contextImage.alt}
              caption={service.contextImage.caption}
              ratio="16/10"
              sizes="(max-width: 1240px) 100vw, 1240px"
              className="mt-12 md:mt-16"
            />
          </div>
        </section>

        {/* The proof: real screenshots of real builds, in their own field. */}
        <section id="proof" aria-labelledby="proof-heading" className="bg-leway-paper">
          <div className="container py-20 md:py-28">
            <div className="max-w-2xl">
              <h2 id="proof-heading" className="font-display text-h2 text-leway-dark">
                Built, and running.
              </h2>
              <p className="font-body text-lead text-leway-dark/70 mt-5">
                Two builds that used this service. Each links to the live
                deployment and the decisions behind it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14 mt-12 md:mt-16">
              {related.map((project) => (
                <WorkCard
                  key={project.slug}
                  project={project}
                  to="internal"
                  size="lg"
                  showMeta
                  showStatus={false}
                />
              ))}
            </div>

            {alsoBuilt.length > 0 && (
              <>
                <h3 className="font-display text-h3 text-leway-dark mt-20">
                  Also built with this service.
                </h3>
                <ul className="mt-6 flex flex-col">
                  {alsoBuilt.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 py-3 min-h-[44px] font-body text-base text-leway-dark/75 hover:text-leway-dark transition-colors"
                      >
                        {project.name}
                        <span className="text-leway-dark/45" aria-hidden="true">
                          {project.sector}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 mt-6 py-3 font-body text-base text-leway-green-ink underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
                >
                  All {projectsForService(service.slug).length} projects with this service
                </Link>
              </>
            )}
          </div>
        </section>

        {/* Two questions, from the same array the JSON-LD reads. */}
        <section aria-labelledby="service-faq-heading" className="bg-leway-paper">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <h2
                    id="service-faq-heading"
                    className="font-display text-h2 text-leway-dark"
                  >
                    Two questions.
                  </h2>
                  <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[32ch]">
                    The two that come up most on this service. Everything else
                    is on the services page.
                  </p>
                  <Link
                    href="/services#faq-heading"
                    className="inline-flex items-center gap-2 font-body text-base text-leway-green-ink mt-7 py-3 underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
                  >
                    All the questions
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-8">
                <FaqList items={service.faqs} idPrefix={`service-${service.slug}-faq`} />
              </div>
            </div>
          </div>
        </section>

        {/* The other four, so the page routes onward. */}
        <section aria-labelledby="others-heading" className="bg-leway-paper-2">
          <div className="container py-20 md:py-28">
            <h2 id="others-heading" className="font-display text-h2 text-leway-dark">
              Often booked with.
            </h2>
            <ul className="mt-10 flex flex-col">
              {otherServices.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/services/${other.slug}`}
                    className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-6 min-h-[44px] hover:text-leway-dark transition-colors"
                  >
                    <span className="font-display text-h3 text-leway-dark">
                      {other.title}
                    </span>
                    <span className="font-body text-small text-leway-dark/65">
                      From {other.price.amount}
                      {other.price.suffix ?? ""}
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="inline ml-2 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <PageCta
        title={`Start with ${service.short.toLowerCase()}.`}
        body={`Tell us the scope and you will get a fixed quote for ${service.title.toLowerCase()} — plus an honest answer if a smaller piece of work would do the job.`}
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See all services", href: "/services" }}
        withReplyDetail
      />
    </>
  );
}
