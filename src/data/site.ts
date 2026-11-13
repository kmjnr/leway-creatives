/**
 * Single source of truth for the studio's identity and contact routes.
 * Nav, footer, metadata, JSON-LD and every page read from here.
 */
export const site = {
  name: "LEWAY Creatives",
  shortName: "LEWAY",
  url: "https://lewaycreatives.com",
  email: "connect@lewaycreatives.com",
  phone: "+254741408647",
  phoneDisplay: "+254 741 408 647",
  whatsapp: "https://wa.me/254741408647",
  whatsappProject:
    "https://wa.me/254741408647?text=Hi%20LEWAY%20Creatives!%20I%27d%20like%20to%20discuss%20a%20project.",
  city: "Nairobi",
  country: "Kenya",
  region: "Kenya",
  areasServed: ["KE", "US", "GB", "CA", "AU"],
  ogImage: "/og-work.jpg",
  founded: "2023",
} as const;

export const contactLine =
  "Web design, copywriting and lead generation from one senior team in Nairobi — for businesses in Kenya and worldwide.";

export const replyPromises = [
  "We reply within one business day",
  "Then a 20-minute scoping call",
  "Then a fixed quote — before any work starts",
] as const;
