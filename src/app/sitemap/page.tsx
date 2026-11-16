import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PageCta from "@/components/PageCta";
import JsonLd from "@/components/JsonLd";
import { services } from "@/data/services";
import { projects, statusLabel } from "@/data/work";
import { site } from "@/data/site";
import { pageJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Sitemap",
  description:
    "Every page on lewaycreatives.com in one list: the studio, its five services, ten builds and the legal pages.",
  path: "/sitemap",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Sitemap" }];

const mainPages = [
  {
    href: "/",
    label: "Home",
    body: "The studio's argument, selected work and services.",
  },
  {
    href: "/work",
    label: "Work",
    body: `${projects.length} builds, with screenshots from the deployment.`,
  },
  {
    href: "/services",
    label: "Services",
    body: `${services.length} services with from-prices and timelines.`,
  },
  {
    href: "/about",
    label: "About",
    body: "Who does the work and how a project runs.",
  },
  {
    href: "/contact",
    label: "Contact",
    body: "Enquiries, answered within one business day.",
  },
];

const legalPages = [
  {
    href: "/privacy-policy",
    label: "Privacy policy",
    body: "What we collect, why, and the rights you have over it.",
  },
  {
    href: "/terms-and-conditions",
    label: "Terms & conditions",
    body: "Scope, payment, ownership and liability, in plain language.",
  },
];

const jsonLd = pageJsonLd(
  {
    "@type": "WebPage",
    name: `Sitemap — ${site.name}`,
    url: `${site.url}/sitemap`,
    description:
      "Every page on lewaycreatives.com: main pages, services, work and legal pages.",
  },
  { crumbs },
);

export default function SitemapPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <main id="main">
        <PageHeader
          crumbs={crumbs}
          title="Sitemap."
          lead="Every page on this site, in one place. The XML version for search engines lives at /sitemap.xml."
          width="wide"
        />

        <section aria-labelledby="pages-heading" className="bg-leway-paper">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 id="pages-heading" className="font-display text-h2 text-leway-dark">
                  Pages.
                </h2>
                <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[40ch]">
                  The {mainPages.length} routes that make up the site, plus the
                  legal pages.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                <div>
                  <h3 className="font-body text-base font-semibold text-leway-dark">
                    Main
                  </h3>
                  <ul className="mt-2">
                    {mainPages.map((page) => (
                      <li key={page.href}>
                        <Link
                          href={page.href}
                          className="group block py-3 min-h-[44px] border-b border-leway-dark/10"
                        >
                          <span className="font-body text-base text-leway-dark group-hover:text-leway-green-ink transition-colors">
                            {page.label}
                          </span>
                          <span className="block font-body text-small text-leway-dark/65 mt-0.5">
                            {page.body}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-body text-base font-semibold text-leway-dark">
                    Legal
                  </h3>
                  <ul className="mt-2">
                    {legalPages.map((page) => (
                      <li key={page.href}>
                        <Link
                          href={page.href}
                          className="group block py-3 min-h-[44px] border-b border-leway-dark/10"
                        >
                          <span className="font-body text-base text-leway-dark group-hover:text-leway-green-ink transition-colors">
                            {page.label}
                          </span>
                          <span className="block font-body text-small text-leway-dark/65 mt-0.5">
                            {page.body}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="services-heading" className="bg-leway-paper-2">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 id="services-heading" className="font-display text-h2 text-leway-dark">
                  Services.
                </h2>
                <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[38ch]">
                  One page per discipline, each with a from-price and a timeline.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ul>
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-4 min-h-[44px] border-b border-leway-dark/10"
                      >
                        <span className="font-body text-base text-leway-dark group-hover:text-leway-green-ink transition-colors">
                          {service.title}
                        </span>
                        <span className="font-body text-small text-leway-dark/65">
                          From {service.price.amount}
                          {service.price.suffix ?? ""}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="work-heading" className="bg-leway-paper">
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 id="work-heading" className="font-display text-h2 text-leway-dark">
                  Work.
                </h2>
                <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[38ch]">
                  One case study per build, with screenshots of the deployment.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/work/${project.slug}`}
                        className="group flex items-baseline justify-between gap-4 py-3 min-h-[44px] border-b border-leway-dark/10"
                      >
                        <span className="font-body text-base text-leway-dark group-hover:text-leway-green-ink transition-colors">
                          {project.name}
                        </span>
                        <span className="font-body text-small text-leway-dark/65 whitespace-nowrap">
                          {statusLabel(project.status)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageCta
        title="Looking for something specific?"
        body="Tell us what you need and we will point you to the right page — or tell you plainly that you do not need us yet."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See the work", href: "/work" }}
        withReplyDetail
      />
    </>
  );
}
