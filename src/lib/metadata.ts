import type { Metadata } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";

interface PageMetaOptions {
  /** Goes through the layout's title template unless `absolute` is set. */
  title: string;
  description: string;
  /** Route path with a leading slash — used for the canonical URL. */
  path: string;
  /** Defaults to the studio OG card. */
  ogImage?: string;
  ogImageAlt?: string;
  /** Actual pixel size of `ogImage`; defaults suit the 1200×630 studio card. */
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: "website" | "article";
  keywords?: string;
  /** Skips the "| LEWAY Creatives" template — used by the homepage only. */
  absolute?: boolean;
}

/**
 * Every page's metadata comes through here, so canonicals, Open Graph and
 * Twitter cards can never drift apart or miss a field.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogImage = site.ogImage,
  ogImageAlt = `${site.name} — selected work`,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogType = "website",
  keywords,
  absolute = false,
}: PageMetaOptions): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;

  return {
    title: absolute ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: ogType,
      images: [{ url: ogImage, width: ogImageWidth, height: ogImageHeight, alt: ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Typical from-price span, derived from the rate card rather than restated. */
const prices = services.map((service) =>
  Number(service.price.amount.replace(/[^\d]/g, "")),
);
const priceRange = `KSh ${Math.min(...prices).toLocaleString("en-KE")} – KSh ${Math.max(...prices).toLocaleString("en-KE")}`;

/**
 * Composes the nodes every page shares. Pass the page's own node(s) and,
 * where relevant, its breadcrumbs; the result is one @graph with stable @ids.
 */
export function pageJsonLd(
  page: Record<string, unknown> | Record<string, unknown>[],
  options: {
    crumbs?: { label: string; href?: string }[];
    extra?: Record<string, unknown>[];
  } = {},
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(services.map((service) => service.title)),
      websiteJsonLd(),
      ...(options.crumbs ? [breadcrumbJsonLd(options.crumbs)] : []),
      ...(Array.isArray(page) ? page : [page]),
      ...(options.extra ?? []),
    ],
  };
}

/** Organization + WebSite nodes. Referenced by @id from every page's graph. */
export function organizationJsonLd(serviceNames: string[]) {
  return {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}${site.ogImage}`,
    logo: `${site.url}/images/leway_creatives_logo.png`,
    description:
      "Web design, copywriting, brand identity, lead generation and personal branding from one senior team in Nairobi, Kenya.",
    priceRange,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: "KE",
    },
    areaServed: site.areasServed.map((code) => ({
      "@type": "Country",
      identifier: code,
    })),
    knowsAbout: serviceNames,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: serviceNames.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };
}

/** A breadcrumb trail, generated from the same crumbs the page renders. */
export function breadcrumbJsonLd(items: { label: string; href?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href === "/" ? "" : item.href}` } : {}),
    })),
  };
}

export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
