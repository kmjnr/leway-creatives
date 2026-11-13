import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { projects } from "@/data/work";
import { site } from "@/data/site";

const BASE_URL = site.url;

/**
 * Generated from the same data the pages render, so a new service or project
 * cannot be added without appearing here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const top = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  return [
    ...top.map((entry) => ({
      url: `${BASE_URL}${entry.path}`,
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),

    // One page per service.
    ...services.map((service) => ({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // One page per project, case studies ranking just under the indexes.
    ...projects.map((project) => ({
      url: `${BASE_URL}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
