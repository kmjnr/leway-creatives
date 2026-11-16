import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import DeferredContactForm from "@/components/contact/DeferredContactForm";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/data/faqs";
import { projects } from "@/data/work";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { faqJsonLd, pageJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "LEWAY Creatives — web design, copywriting & lead generation | Nairobi, Kenya",
  description:
    `Web design, copywriting and lead generation from one senior team in Nairobi. ${projects.length} builds shown as they run, ${services.length} services with from-prices, and one fixed quote before any work starts.`,
  path: "/",
  keywords:
    "web design agency Kenya, web design Nairobi, copywriting agency, lead generation service, B2B lead generation, outsource web design, conversion landing page, LEWAY Creatives",
  absolute: true,
});

const liveCount = projects.filter((project) => project.status === "live").length;

/** The routes out of the homepage, so the landing page works as a hub. */
const routes = [
  {
    href: "/work",
    label: "Work",
    body: `${projects.length} builds with screenshots from the live deployment — ${liveCount} running on their own domains today.`,
  },
  {
    href: "/services",
    label: "Services",
    body: `All ${services.length} with a from-price, a realistic timeline and the deliverables spelled out.`,
  },
  {
    href: "/about",
    label: "About",
    body: "Who does the work, how a project runs, and the four things this studio refuses to do.",
  },
  {
    href: "/contact",
    label: "Contact",
    body: "A reply within one business day, a 20-minute scoping call, then one fixed quote.",
  },
];

// Structured data is generated from the same arrays the visible page renders,
// so the markup can never drift away from the content.
const jsonLd = pageJsonLd(
  {
    "@type": "ItemList",
    name: `${site.name} — selected work`,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        url: project.url,
        description: project.summary,
        creator: { "@id": `${site.url}/#organization` },
      },
    })),
  },
  { extra: [faqJsonLd(faqs)] },
);

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <main id="main">
        <Hero />
        <Work />
        <Services />
        <HowItWorks />

        {/* The signposts. The homepage argues the case; these take you deeper. */}
        <section aria-labelledby="routes-heading" className="bg-leway-paper-2">
          <div className="container pb-24 md:pb-32">
            <h2 id="routes-heading" className="font-display text-h2 text-leway-dark">
              Where to go next.
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-10 md:mt-14">
              {routes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="group block rounded-card bg-leway-paper-2 p-7 h-full transition-colors hover:bg-leway-mint"
                  >
                    <span className="font-display text-h3 text-leway-dark inline-flex items-center gap-2">
                      {route.label}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                    <span className="block font-body text-base text-leway-dark/70 mt-3 max-w-[36ch]">
                      {route.body}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FAQ />
        <ContactSection form={<DeferredContactForm />} />
      </main>
    </>
  );
}
