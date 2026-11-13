import screens from "./screens.json";

export type WorkStatus = "live" | "in-development";

export interface WorkStep {
  title: string;
  body: string;
}

export interface WorkScreen {
  src: string;
  width: number;
  height: number;
  note: string;
}

export interface Project {
  slug: string;
  /** The client or product as it appears in public. */
  name: string;
  url: string;
  /** Who the work was for — a sector, stated the way the client would. */
  sector: string;
  /** The shape of the build, used as a chip on the work index. */
  type: string;
  status: WorkStatus;
  /** Card and case-study standfirst, one or two sentences. */
  summary: string;
  /** The case study: what the client was actually stuck with. */
  problem: string;
  /** What we did about it, three decisions. */
  whatWeDid: WorkStep[];
  /** Where it landed. Never a metric we did not measure. */
  result: string;
  deliverables: string[];
  /** Service slugs from src/data/services.ts — drives the cross-links. */
  services: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
  /** Real screenshots of the deployment, sliced by scripts/slice-gallery.mjs. */
  screens: WorkScreen[];
}

/**
 * One source of truth for every piece of work. The work index, the case-study
 * pages, the homepage and the JSON-LD all read this file; nothing restates a
 * project anywhere else.
 */
const base: Omit<Project, "screens">[] = [
  {
    slug: "lifeline-hospitals",
    name: "Lifeline Group of Hospitals",
    url: "https://thelifelinegroupofhospitals.netlify.app/",
    sector: "Healthcare",
    type: "Full website",
    status: "in-development",
    summary:
      "A 24/7 private hospital site for two Nairobi branches, covering emergency care, imaging, specialists, branch details and appointment requests.",
    problem:
      "Two branches, seven specialty clinics and an emergency line that never closes — but the site did not say which service ran where, or how a patient gets seen. The front desk was answering questions the website should have settled, and every missed call was a patient who went elsewhere.",
    whatWeDid: [
      {
        title: "Mapped every service to a branch",
        body: "Each service page states which branch runs it, the hours, and whether a referral is needed, so the site answers the question before the phone rings.",
      },
      {
        title: "Built the appointment request into the spine",
        body: "Request an appointment sits in the header, the hero and the foot of every service page, and asks only for what the desk needs to triage a case.",
      },
      {
        title: "Made the emergency route unmissable",
        body: "The 24/7 line and ambulance number travel with the branch finder rather than hiding on a contact page.",
      },
    ],
    result:
      "Both branches now run off one site instead of two sets of assumptions. Design and content are signed off; the build is in final review before the live switch.",
    deliverables: ["Site design", "Service architecture", "Appointment flow"],
    services: ["web-design", "copywriting"],
    image: "/images/work/lifeline-hospitals-01.webp",
    imageAlt:
      "Lifeline Group of Hospitals homepage with the headline Quality Healthcare, Close to Home and a hospital reception photograph",
    featured: true,
  },
  {
    slug: "adorntech",
    name: "AdornTech",
    url: "https://adorntech.netlify.app",
    sector: "Retail & e-commerce",
    type: "E-commerce storefront",
    status: "in-development",
    summary:
      "An electronics storefront for Ongata Rongai: a browsable catalogue, WhatsApp ordering, M-Pesa payment and same-day delivery.",
    problem:
      "A real shop selling real stock through WhatsApp photos and a phone number. Buyers could not check what was in stock, what it cost, or whether delivery was included — so they asked, and the shop answered the same question fifty times a day.",
    whatWeDid: [
      {
        title: "Gave the stock a catalogue",
        body: "Products grouped the way customers ask for them — charging, audio, security, accessories — with the price and availability on the card rather than behind an enquiry.",
      },
      {
        title: "Ended checkout where customers already are",
        body: "The basket hands off to WhatsApp with the order already written out, so the shop keeps the conversation it is used to instead of learning a new dashboard.",
      },
      {
        title: "Stated the promises on the product card",
        body: "Genuine-stock, same-day-delivery and pay-on-delivery terms appear next to the price, which is where the doubt actually happens.",
      },
    ],
    result:
      "The catalogue, basket and WhatsApp ordering path are built and being loaded with the shop's own stock list before launch.",
    deliverables: ["Catalogue UX", "WhatsApp checkout", "Mobile-first build"],
    services: ["web-design", "brand-identity"],
    image: "/images/work/adorntech-01.webp",
    imageAlt:
      "AdornTech homepage with the headline Genuine electronics, honest prices, today and a photograph of the shop interior",
    featured: true,
  },
  {
    slug: "overlandhire",
    name: "OverlandHire",
    url: "https://overlandhire.netlify.app",
    sector: "Car hire",
    type: "Full website",
    status: "in-development",
    summary:
      "Self-drive and chauffeur hire with plain-KES pricing, a fleet search and a 15-minute handover promise.",
    problem:
      "Car hire in Kenya is quoted over the phone, and the price changes between the call and the counter. The site had to put the real daily rate, the deposit rules and the excess in front of the customer before anyone picked up a phone.",
    whatWeDid: [
      {
        title: "Priced the fleet in plain shillings",
        body: "Each vehicle carries its own daily rate and deposit, so the comparison a customer makes is between cars — not between quotes they have to go and request.",
      },
      {
        title: "Built the search around how people ask",
        body: "Pick-up point, date and duration, with the fleet and the hire terms filtering live underneath, because that is the order the question is asked in.",
      },
      {
        title: "Put the handover promise in writing",
        body: "The 15-minute handover, the M-Pesa deposit and the mileage allowance are stated as terms on the page rather than as reassurance in a testimonial.",
      },
    ],
    result:
      "Fleet search, booking enquiry and the pricing copy are complete. The build is in review ahead of launch.",
    deliverables: ["Fleet search", "Booking enquiry", "Pricing copy"],
    services: ["web-design", "copywriting"],
    image: "/images/work/overlandhire-01.webp",
    imageAlt:
      "OverlandHire homepage with a safari landscape, a Toyota Land Cruiser and a fleet availability search bar",
    featured: true,
  },
  {
    slug: "solarizeke",
    name: "SolarizeKE",
    url: "https://solarizeke.netlify.app",
    sector: "Energy",
    type: "Full website",
    status: "in-development",
    summary:
      "An independent solar decision desk: sizing calculators, a provider directory, licence checks and buyer guides for Kenyan homes and businesses.",
    problem:
      "Solar is sold on optimistic numbers. A buyer cannot tell a licensed installer from a reseller, cannot check what a system will realistically produce, and has no way to compare two quotes that describe different equipment. Every decision rests on trusting whoever is selling.",
    whatWeDid: [
      {
        title: "Made the tools show their assumptions",
        body: "The calculators state the inputs and the reasoning behind each figure, so the estimate can be used to ask a better question instead of being mistaken for a quotation.",
      },
      {
        title: "Built a directory with evidence attached",
        body: "Listings carry licence class, source links and last-checked dates, so a buyer can verify a provider rather than take the page's word for it.",
      },
      {
        title: "Published the methodology",
        body: "How records are sourced, dated and corrected is a page on the site, which is what separates a reference from an advertorial.",
      },
    ],
    result:
      "The calculators, the provider directory and the methodology pages are built. Directory records are being expanded and sourced before launch.",
    deliverables: ["Decision tools", "Provider directory", "Editorial system"],
    services: ["web-design", "copywriting", "brand-identity"],
    image: "/images/work/solarizeke-01.webp",
    imageAlt:
      "SolarizeKE homepage with the headline Make the next solar decision a clearer one and a directory search",
    featured: true,
  },
  {
    slug: "forestwood",
    name: "Forestwood Limited",
    url: "https://fleetwoodltd.netlify.app/",
    sector: "Property & leasing",
    type: "Full website",
    status: "in-development",
    summary:
      "A leasing site for secure car-yard space in Mombasa — open bays, covered canopies and showroom units, with an availability enquiry.",
    problem:
      "A secure yard with three kinds of space and no way to show availability, bay sizes or monthly rates without a site visit. Dealers were driving across Mombasa to find out whether the particular bay they needed was free.",
    whatWeDid: [
      {
        title: "Priced the space by type, per month",
        body: "Open bays, covered canopies and showroom units each carry a monthly rate band, so a dealer can rule the yard in or out in one screen.",
      },
      {
        title: "Wrote the operational detail landlords skip",
        body: "Security cover, access hours, wash bays, power and the lease terms are stated plainly — the things a dealer checks before committing stock to a yard.",
      },
      {
        title: "Ran one enquiry path from every space",
        body: "Whichever bay type a visitor is reading about, the enquiry arrives with that choice already attached, so the first reply can be specific.",
      },
    ],
    result:
      "The site, the availability enquiry and the copy are complete and awaiting final content from the yard.",
    deliverables: ["Site design", "Availability enquiry", "Copy"],
    services: ["web-design", "copywriting"],
    image: "/images/work/forestwood-01.webp",
    imageAlt:
      "Forestwood Limited homepage with the headline Your cars. Our ground. and an aerial photograph of a car yard in Mombasa",
    featured: false,
  },
  {
    slug: "hadiyed-flowers",
    name: "Hadiyed Flowers & Gifts",
    url: "https://hadiyedflowersecomm.netlify.app",
    sector: "Florist & gifting",
    type: "E-commerce storefront",
    status: "in-development",
    summary:
      "A florist and gifting storefront with occasion browsing, personalisation and same-day delivery across Nairobi.",
    problem:
      "Gift buyers shop by occasion and delivery date, not by flower type. The storefront had to lead with the reason for the gift and be honest about what can still arrive today, or the sale goes to whoever answers fastest.",
    whatWeDid: [
      {
        title: "Led with the occasion",
        body: "Birthday, anniversary, new baby, condolence — the navigation starts from why the customer is buying, and the catalogue follows.",
      },
      {
        title: "Put delivery terms beside the price",
        body: "Same-day cut-offs and the areas covered sit with the product rather than at checkout, which is where gift buyers abandon.",
      },
      {
        title: "Made personalisation a product",
        body: "Gift boxes and personalised items are merchandised as their own range instead of being a note field bolted onto a bouquet.",
      },
    ],
    result:
      "The storefront, occasion browsing and delivery flow are built. Product photography and final pricing are being loaded ahead of launch.",
    deliverables: ["Storefront design", "Occasion browsing", "Delivery flow"],
    services: ["web-design", "brand-identity"],
    image: "/images/work/hadiyed-flowers-01.webp",
    imageAlt:
      "Hadiyed Flowers and Gifts homepage with the headline Curated Luxury Gift Sets and a gift box beside bouquets",
    featured: false,
  },
  {
    slug: "paidtaskers",
    name: "PaidTaskers",
    url: "https://paidtaskers.app",
    sector: "Gig economy",
    type: "Directory",
    status: "live",
    summary:
      "A directory of platforms that pay for online work, with every listing verified monthly, payout methods checked and sources cited.",
    problem:
      "Directories of paid online work are where people go to lose money. Dead platforms sit next to referral spam, payout claims are copied between sites, and a visitor has no way to tell which listing was checked and which was pasted.",
    whatWeDid: [
      {
        title: "Made verification a visible rule",
        body: "Every listing states what was checked, when, and what the site refuses to do — the trust section is written as commitments rather than badges.",
      },
      {
        title: "Published numbers other directories hide",
        body: "Live platform counts, average payout and the change since the last review are on the page, so the directory can be judged on its own data.",
      },
      {
        title: "Built filters around how people look for work",
        body: "Task type, payout method, region and whether experience is required — the four things that decide whether a listing is any use to the person reading it.",
      },
    ],
    result:
      "Live on its own domain with the full directory indexed and running on a monthly review cycle.",
    deliverables: ["Directory architecture", "Search and filtering", "Listing verification"],
    services: ["web-design", "lead-generation"],
    image: "/images/work/paidtaskers-01.webp",
    imageAlt:
      "PaidTaskers homepage with the headline Discover platforms that pay you for online work and a live directory count",
    featured: false,
  },
  {
    slug: "docsfast",
    name: "DocsFast",
    url: "https://docsfast.tech",
    sector: "Productivity tools",
    type: "Web app",
    status: "live",
    summary:
      "Fifteen document converters that run entirely in the browser — Markdown, Word, PDF, CSV and more — with a fidelity report and no uploads.",
    problem:
      "Converting a document usually means handing a private file to a server you cannot see, then finding out what broke after it comes back. The product had to convert real files without the upload, and say honestly what survived the conversion.",
    whatWeDid: [
      {
        title: "Moved the conversion into the browser",
        body: "Files are read and written on the visitor's own machine, so the privacy claim is a fact about the architecture rather than a policy paragraph.",
      },
      {
        title: "Replaced the promise with a report",
        body: "Each conversion returns a short fidelity report naming what was preserved and what was dropped, which is the part other converters never mention.",
      },
      {
        title: "Put all fifteen tools on one page",
        body: "Every conversion is reachable from the homepage in one click, with the common ones promoted and the rest listed rather than hidden behind a menu.",
      },
    ],
    result:
      "Live and running in the browser with no upload step and no account required.",
    deliverables: ["Tool UX", "Browser-side conversion", "Responsive build"],
    services: ["web-design", "lead-generation", "personal-branding"],
    image: "/images/work/docsfast-01.webp",
    imageAlt:
      "DocsFast homepage with the headline Convert anything, right in your browser and a live document preview",
    featured: false,
  },
  {
    slug: "curatelove",
    name: "CurateLove",
    url: "https://curatelove.netlify.app/",
    sector: "Consumer AI",
    type: "Web app",
    status: "live",
    summary:
      "A free AI love-letter generator that turns a few relationship details into a finished letter in about two minutes, with no signup and no stored letters.",
    problem:
      "AI writing tools ask for an account, a card or a subscription before they show you anything usable. For a task this small — one letter, once — that trade is bad, and the writing that comes back usually reads like neither the sender nor a human.",
    whatWeDid: [
      {
        title: "Put the generator in the hero",
        body: "The inputs are the first thing on the page. No sign-up wall, no product tour, no five-section argument before the visitor can try it.",
      },
      {
        title: "Designed for one sitting",
        body: "Occasion, recipient, tone and a few details, then a draft in about two minutes — the whole flow fits on a phone screen without scrolling back.",
      },
      {
        title: "Backed the writing with research",
        body: "The page explains what the generator is doing and cites the relationship research behind the structure, so the output is not presented as a black box.",
      },
    ],
    result:
      "Live and free to use, with letters generated on the spot and nothing stored between sessions.",
    deliverables: ["Product design", "Interface build", "Prompt flow"],
    services: ["web-design", "personal-branding"],
    image: "/images/work/curatelove-01.webp",
    imageAlt:
      "CurateLove homepage with the headline Free AI Love Letter Generator and occasion buttons",
    featured: false,
  },
  {
    slug: "premiumsafeboxes",
    name: "JIMBO Safe Boxes",
    url: "https://premiumsafeboxes.netlify.app",
    sector: "Security equipment",
    type: "Landing page",
    status: "live",
    summary:
      "A single-product landing page for a Kenya safe-box distributor, built for paid traffic: offer stack, urgency, trust proof and a direct order path.",
    problem:
      "One high-consideration product sold through paid traffic. The visitor arrives cold, knows nothing about safe ratings, and decides in seconds — so the page has to carry the entire argument, from specification to delivery, with no second page to fall back on.",
    whatWeDid: [
      {
        title: "Gave the page one job",
        body: "Everything above the fold points at the same action, and no navigation offers the visitor somewhere else to go.",
      },
      {
        title: "Made the specification the proof",
        body: "Weight, fire resistance, locking and dimensions are shown with the product, because for a safe the specification is what the buyer is actually assessing.",
      },
      {
        title: "Finished the order on the page",
        body: "The order form completes in place with delivery details and payment terms, instead of handing a warm buyer to a checkout that asks them to start again.",
      },
    ],
    result:
      "Live and taking orders, structured around the ad angles driving traffic to it.",
    deliverables: ["Landing page", "Offer structure", "Paid-traffic copy"],
    services: ["copywriting", "brand-identity"],
    image: "/images/work/premiumsafeboxes-01.webp",
    imageAlt:
      "JIMBO safe box landing page with the headline Protect Your Valuables from Fire and Theft and a countdown offer",
    featured: false,
  },
];

export const projects: Project[] = base.map((project) => ({
  ...project,
  screens: (screens as Record<string, WorkScreen[]>)[project.slug] ?? [],
}));

export const featuredProjects = projects.filter((project) => project.featured);
export const moreProjects = projects.filter((project) => !project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function statusLabel(status: WorkStatus) {
  return status === "live" ? "Live site" : "In development";
}

/** Projects that used a given service — the cross-link on service pages. */
export function projectsForService(serviceSlug: string) {
  return projects.filter((project) => project.services.includes(serviceSlug));
}
