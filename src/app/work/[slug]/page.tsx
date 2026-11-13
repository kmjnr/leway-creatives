import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import PageCta from "@/components/PageCta";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import WorkCard from "@/components/ui/WorkCard";
import { CtaButton } from "@/components/ui/CtaButton";
import { getProject, projects, statusLabel } from "@/data/work";
import { serviceNames, services } from "@/data/services";
import { site } from "@/data/site";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  pageMetadata,
  websiteJsonLd,
} from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: `${project.name} — ${project.sector} case study`,
    description: project.summary,
    path: `/work/${project.slug}`,
    ogImage: project.image,
    ogImageAlt: project.imageAlt,
    ogType: "article",
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const dev = project.status === "in-development";
  const projectServices = project.services
    .map((s) => services.find((service) => service.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  const siblings = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: project.name },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(serviceNames),
      websiteJsonLd(),
      breadcrumbJsonLd(crumbs),
      {
        "@type": "CreativeWork",
        name: `${project.name} — ${project.type}`,
        description: project.summary,
        url: `${site.url}/work/${project.slug}`,
        image: `${site.url}${project.image}`,
        about: project.sector,
        creator: { "@id": `${site.url}/#organization` },
        ...(dev ? {} : { sameAs: project.url }),
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
        {/* Masthead — the claim, then the evidence, in that order. */}
        <article>
          <header className="bg-leway-paper pt-28 md:pt-36">
            <div className="container">
              <Breadcrumbs items={crumbs} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-6">
                <div className="lg:col-span-7">
                  <p className="font-body text-small text-leway-dark/65">
                    {project.sector} · {project.type} ·{" "}
                    <span className={dev ? "text-leway-dark/65" : "text-leway-green-ink"}>
                      {statusLabel(project.status)}
                    </span>
                  </p>
                  <span aria-hidden="true" className="block w-10 h-[3px] rounded-pill bg-leway-gold mt-7" />

                  <h1 className="font-display text-display text-leway-dark mt-6">
                    {project.name}
                  </h1>
                  <p className="font-body text-lead text-leway-dark/70 mt-6 max-w-[58ch]">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-9">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-pill bg-leway-green text-leway-dark px-7 py-4 min-h-[56px] font-semibold text-base hover:bg-[#1EB857] active:scale-[0.98] transition-all duration-200"
                    >
                      {dev ? "Open the preview" : "Visit the live site"}
                      <ArrowUpRight size={18} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                    <span className="font-body text-small text-leway-dark/65 break-all">
                      {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </span>
                  </div>
                </div>

                {/* Facts panel — tone step, not a card with a border. */}
                <dl className="lg:col-span-5 lg:pt-10">
                  <div className="rounded-card bg-leway-paper-2 p-7 md:p-9">
                    <div className="flex flex-col gap-7">
                      <div>
                        <dt className="font-body text-small text-leway-dark/65">Client</dt>
                        <dd className="font-body text-base text-leway-dark mt-1">{project.name}</dd>
                      </div>
                      <div>
                        <dt className="font-body text-small text-leway-dark/65">Sector</dt>
                        <dd className="font-body text-base text-leway-dark mt-1">{project.sector}</dd>
                      </div>
                      <div>
                        <dt className="font-body text-small text-leway-dark/65">Build</dt>
                        <dd className="font-body text-base text-leway-dark mt-1">{project.type}</dd>
                      </div>
                      <div>
                        <dt className="font-body text-small text-leway-dark/65">Our part</dt>
                        <dd className="mt-2 flex flex-wrap gap-2">
                          {projectServices.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              className="inline-flex items-center rounded-pill bg-leway-paper px-4 py-2 min-h-[36px] font-body text-small text-leway-dark hover:bg-leway-mint transition-colors"
                            >
                              {service.short}
                            </Link>
                          ))}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-body text-small text-leway-dark/65">Delivered</dt>
                        <dd className="mt-1 font-body text-base text-leway-dark">
                          {project.deliverables.join(" · ")}
                        </dd>
                      </div>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </header>

          {/* The argument: problem, decisions, result. */}
          <section aria-labelledby="problem-heading" className="bg-leway-dark">
            <div className="container py-20 md:py-28">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                <div className="lg:col-span-4">
                  <h2
                    id="problem-heading"
                    className="font-display text-h2 text-leway-paper lg:sticky lg:top-28"
                  >
                    The problem.
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="font-body text-lead text-leway-paper/80 max-w-[62ch]">
                    {project.problem}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="did-heading" className="bg-leway-paper">
            <div className="container py-20 md:py-28">
              <h2 id="did-heading" className="font-display text-h2 text-leway-dark">
                What we did.
              </h2>

              <ol className="mt-12 md:mt-16 flex flex-col gap-12 md:gap-16 max-w-3xl">
                {project.whatWeDid.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-8 gap-y-3">
                    <span
                      className="font-display text-h3 text-leway-dark/25 sm:w-14"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-h3 text-leway-dark">{step.title}</h3>
                      <p className="font-body text-base text-leway-dark/70 mt-3 max-w-[62ch]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Result, stated without numbers we did not measure. */}
              <div className="rounded-card bg-leway-mint p-8 md:p-12 mt-16 md:mt-20 max-w-3xl">
                <h3 className="font-display text-h3 text-leway-dark">Where it landed.</h3>
                <p className="font-body text-base text-leway-dark/75 mt-4 max-w-[62ch]">
                  {project.result}
                </p>
              </div>
            </div>
          </section>

          {/* Real screenshots of the deployment — the whole point. */}
          <section aria-labelledby="screens-heading" className="bg-leway-paper-2">
            <div className="container py-20 md:py-28">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <h2 id="screens-heading" className="font-display text-h2 text-leway-dark">
                    The build, as it runs.
                  </h2>
                  <p className="font-body text-lead text-leway-dark/70 mt-5">
                    Screenshots taken from the live deployment at 1440px wide,
                    at four points down the page. Nothing staged.
                  </p>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-base text-leway-green-ink py-3 underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
                >
                  {dev ? "Open the preview" : "Visit the live site"}
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>

              <ul className="flex flex-col gap-12 md:gap-16 mt-12 md:mt-16">
                {project.screens.map((screen, i) => (
                  <li key={screen.src}>
                    <figure>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-leway-stone">
                        <Image
                          src={screen.src}
                          alt={`${project.name} — ${screen.note}`}
                          fill
                          sizes="(max-width: 1240px) 100vw, 1240px"
                          className="object-cover object-top"
                          priority={i === 0}
                        />
                      </div>
                      <figcaption className="font-body text-small text-leway-dark/65 mt-4 flex flex-wrap items-baseline gap-x-3">
                        <span className="text-leway-dark/45" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {screen.note}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Next work, so the page is a route not a dead end. */}
          <section aria-labelledby="more-heading" className="bg-leway-paper">
            <div className="container py-20 md:py-28">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 id="more-heading" className="font-display text-h2 text-leway-dark">
                  Next.
                </h2>
                <CtaButton href="/work" variant="link">
                  All work
                </CtaButton>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-12">
                {siblings.map((sibling) => (
                  <WorkCard
                    key={sibling.slug}
                    project={sibling}
                    to="internal"
                    size="sm"
                    showMeta
                    showStatus={false}
                  />
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>

      <PageCta
        title="Something like this, for your business?"
        body="Send us the shape of the problem — the sector, the pages, the outcome you need. You will get a scope, a timeline and one fixed price back."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See what a build costs", href: "/services" }}
        withReplyDetail
      />
    </>
  );
}
