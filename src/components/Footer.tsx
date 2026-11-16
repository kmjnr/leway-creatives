import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { projects } from "@/data/work";

/** Four routes people actually take, not a sitemap dump. */
const workLinks = [
  { label: "All work", href: "/work" },
  { label: "Live sites", href: "/work#live" },
  { label: "In development", href: "/work#in-development" },
  { label: "How we work", href: "/about#process" },
];

const studioLinks = [
  { label: "About the studio", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Questions", href: "/contact#faq" },
  { label: "Sitemap", href: "/sitemap" },
];

const legalLinks = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms & conditions", href: "/terms-and-conditions" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="font-body text-base font-semibold text-leway-dark">{title}</h2>
      <ul className="mt-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex items-center min-h-[44px] font-body text-base text-leway-dark/70 hover:text-leway-dark transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const liveCount = projects.filter((p) => p.status === "live").length;

  return (
    <footer aria-label="Site footer" className="bg-leway-paper-2">
      <div className="container pt-16 pb-10 md:pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-4 flex flex-col gap-5">
            <Link href="/" aria-label={`${site.name} home`} className="w-fit">
              <Image
                src="/images/leway_creatives_logo.png"
                alt={site.name}
                width={140}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <p className="font-body text-base text-leway-dark/65 max-w-[36ch]">
              {site.city}, {site.country} — web design, copywriting and lead
              generation for businesses in Kenya and worldwide.
            </p>
            <p className="font-body text-small text-leway-dark/65">
              {projects.length} builds on the site. {liveCount} live today.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                aria-label={`Email ${site.name}`}
                className="flex items-center justify-center w-12 h-12 rounded-pill bg-leway-dark/5 text-leway-dark hover:bg-leway-green transition-colors"
              >
                <Mail size={20} aria-hidden="true" />
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${site.name} (opens in a new tab)`}
                className="flex items-center justify-center w-12 h-12 rounded-pill bg-leway-dark/5 text-leway-dark hover:bg-leway-green transition-colors"
              >
                <MessageCircle size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services — every page reachable from the footer, no JS required. */}
          <div className="md:col-span-4">
            <nav aria-label="Services">
              <h2 className="font-body text-base font-semibold text-leway-dark">Services</h2>
              <ul className="mt-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center min-h-[44px] font-body text-base text-leway-dark/70 hover:text-leway-dark transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="md:col-span-2">
            <FooterColumn title="Work" links={workLinks} />
          </div>

          <div className="md:col-span-2">
            <FooterColumn title="Studio" links={studioLinks} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container pb-24 md:pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-5">
          <p className="font-body text-small text-leway-dark/65">
            © {year} {site.name} · {site.city}, {site.country}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center min-h-[44px] font-body text-small text-leway-dark/65 hover:text-leway-dark transition-colors"
            >
              {site.email}
            </a>
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center min-h-[44px] font-body text-small text-leway-dark/65 hover:text-leway-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
