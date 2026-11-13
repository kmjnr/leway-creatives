import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceRow from "@/components/ui/ServiceRow";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" aria-label="Services" className="bg-leway-paper-2">
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky heading column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-display text-h2 text-leway-dark">What we do.</h2>
              <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[36ch]">
                One team for the site, the words and the pipeline. Most projects
                combine two or three of these, quoted as one fixed price after a
                short scoping call.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 font-body text-base text-leway-green-ink mt-7 py-3 underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
              >
                Services, timelines and prices
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Service list — no cards, no numbering */}
          <ul className="lg:col-span-8 flex flex-col">
            {services.map((service) => (
              <ServiceRow
                key={service.slug}
                service={service}
                showPrice={false}
                showDeliverables
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
