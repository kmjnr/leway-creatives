import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page does not exist on lewaycreatives.com. Here are the routes that do.",
  robots: { index: false, follow: true },
};

/** The useful routes, so a 404 is a detour rather than a dead end. */
const routes = [
  { href: "/work", label: "Work", body: "Ten builds with screenshots from the deployment." },
  { href: "/services", label: "Services", body: "Five services, each with a from-price." },
  { href: "/about", label: "About", body: "Who does the work and how a project runs." },
  { href: "/contact", label: "Contact", body: "One reply within a business day." },
];

export default function NotFound() {
  return (
    <main id="main" className="bg-leway-paper pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container">
        <p className="font-body text-small text-leway-dark/65">404</p>
        <span aria-hidden="true" className="block w-10 h-[3px] rounded-pill bg-leway-gold mt-7" />
        <h1 className="font-display text-display text-leway-dark mt-6 max-w-[24ch]">
          That page does not exist.
        </h1>
        <p className="font-body text-lead text-leway-dark/70 mt-6 max-w-[54ch]">
          The link may be old, or the page may have moved. Everything on the
          site is reachable from these four routes — or from the{" "}
          <Link
            href="/"
            className="text-leway-green-ink underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
          >
            homepage
          </Link>
          .
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 mt-14 max-w-5xl">
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
                <span className="block font-body text-base text-leway-dark/70 mt-3 max-w-[34ch]">
                  {route.body}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Five service pages, read from the same file the nav reads. */}
        <div className="mt-16">
          <h2 className="font-body text-base font-semibold text-leway-dark">
            Or jump to a service
          </h2>
          <ul className="flex flex-wrap gap-2 mt-4">
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
        </div>
      </div>
    </main>
  );
}
