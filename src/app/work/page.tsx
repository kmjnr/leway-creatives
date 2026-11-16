import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PageCta from "@/components/PageCta";
import JsonLd from "@/components/JsonLd";
import WorkCard from "@/components/ui/WorkCard";
import { projects } from "@/data/work";
import { site } from "@/data/site";
import { pageJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work — live sites and builds in development",
  description: `${projects.length} builds from LEWAY Creatives: hospitals, retail, car hire, solar, property, florist, directories and web apps. Every screenshot taken from the live deployment.`,
  path: "/work",
  keywords:
    "web design portfolio Kenya, Nairobi web design case studies, e-commerce website Kenya, landing page examples",
});

const live = projects.filter((p) => p.status === "live");
const inDevelopment = projects.filter((p) => p.status === "in-development");
const sectors = Array.from(new Set(projects.map((p) => p.sector)));

const crumbs = [{ label: "Home", href: "/" }, { label: "Work" }];

const jsonLd = pageJsonLd(
  {
    "@type": "CollectionPage",
    name: "Work — live sites and builds in development",
    description: `${projects.length} builds from ${site.name}, with screenshots taken from each live deployment.`,
    url: `${site.url}/work`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: project.name,
        url: `${site.url}/work/${project.slug}`,
      })),
    },
  },
  { crumbs },
);

function Count({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-display text-h3 text-leway-dark">{value}</p>
      <p className="font-body text-small text-leway-dark/65 mt-1">{label}</p>
    </div>
  );
}

export default function WorkIndexPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <main id="main">
        <PageHeader
          crumbs={crumbs}
          title="Work."
          lead={`${projects.length} builds — hospitals, retail, car hire, solar, property, directories and two products of our own. Every screenshot on this site is taken from the deployment itself, and every project links to the real thing.`}
        >
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:flex sm:flex-wrap sm:gap-x-12">
          <Count value={live.length} label="Live on their own domain" />
          <Count value={inDevelopment.length} label="Client sites in development" />
          <Count value={sectors.length} label="Sectors" />
        </div>
      </PageHeader>

      {/* In development first: these are the client builds and the deeper work. */}
      <section
        id="in-development"
        aria-labelledby="in-development-heading"
        className="bg-leway-paper"
      >
        <div className="container py-20 md:py-28">
          <div className="max-w-2xl">
            <h2 id="in-development-heading" className="font-display text-h2 text-leway-dark">
              In development.
            </h2>
            <p className="font-body text-lead text-leway-dark/70 mt-5">
              Client sites that are built and being reviewed with the client
              before launch. The previews are open to anyone — check them
              yourself.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14 mt-12 md:mt-16">
            {inDevelopment.map((project) => (
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
        </div>
      </section>

      <section id="live" aria-labelledby="live-heading" className="bg-leway-paper-2">
        <div className="container py-20 md:py-28">
          <div className="max-w-2xl">
            <h2 id="live-heading" className="font-display text-h2 text-leway-dark">
              Live now.
            </h2>
            <p className="font-body text-lead text-leway-dark/70 mt-5">
              Products running on their own domains, with real users and no
              launch date to hide behind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-12 md:mt-16">
            {live.map((project) => (
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

          <p className="font-body text-base text-leway-dark/70 mt-14 max-w-[62ch]">
            Prefer to skip the write-ups?{" "}
            <Link
              href="/#work"
              className="text-leway-green-ink underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
            >
              The homepage links straight to every live site
            </Link>
            .
          </p>
        </div>
      </section>
      </main>

      <PageCta
        title={`Your build would be number ${projects.length + 1}.`}
        body="Tell us what the site has to do and we will come back with a scope, a timeline and one fixed price — before any work starts."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See what a build costs", href: "/services" }}
        withReplyDetail
      />
    </>
  );
}
