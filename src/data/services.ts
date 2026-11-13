import type { Faq } from "./faqs";

export interface ServiceInclude {
  title: string;
  body: string;
}

export interface Service {
  slug: string;
  /** Full name — page h1, JSON-LD, form chips. */
  title: string;
  /** Short label for nav, cards and breadcrumbs. */
  short: string;
  /** One line for the services index and homepage list. */
  summary: string;
  /** Opening paragraph on the service page. */
  intro: string;
  /** What the client is actually stuck with, stated plainly. */
  problem: {
    heading: string;
    body: string;
  };
  includes: ServiceInclude[];
  /** Chip row — the concrete things that land in the folder. */
  deliverables: string[];
  timeline: {
    value: string;
    note: string;
  };
  price: {
    amount: string;
    suffix?: string;
    note: string;
  };
  /**
   * One atmospheric photograph for the service page. The crop is chosen to
   * exclude every defect in the source (see scripts/make-photography.mjs),
   * and the caption never claims the picture shows our team or a client.
   */
  photo?: {
    src: string;
    alt: string;
    caption: string;
    ratio: "16/10" | "4/3";
    /** Tailwind max-width class, matched to the file's real resolution. */
    maxW: string;
  };
  /** Two real projects from src/data/work.ts. */
  relatedProjects: string[];
  /** The screenshot that proves the service — a real client build. */
  proofProject: string;
  faqs: Faq[];
}

/**
 * Starter from-prices. One block to edit when the rate card changes;
 * every page, card and JSON-LD reads the same numbers.
 */
export const services: Service[] = [
  {
    slug: "web-design",
    title: "Web design & development",
    short: "Web design",
    summary:
      "Conversion-focused sites where the design, the words and the build are decided together — not handed between three suppliers.",
    intro:
      "We design and build the whole site: structure, layout, words and code. One team, one fixed quote, and a site that can be handed over without a dependency on us.",
    problem: {
      heading: "Most small-business sites are built backwards.",
      body: "A template is picked, pages are filled in, and only then does anyone ask what the visitor needs to do. The result looks acceptable and converts nothing. We start from the one action the site exists for — book, call, order, enquire — and build every page toward it.",
    },
    includes: [
      {
        title: "Structure decided first",
        body: "The page order and the argument on each page are agreed before any design file opens, so you review the logic while it is still cheap to change.",
      },
      {
        title: "Design and copy made together",
        body: "The same person writing the words is looking at the layout. Nothing gets filled in after the fact, and no headline is designed around copy that does not exist.",
      },
      {
        title: "A build you can run",
        body: "Fast, mobile-first, accessible markup. If you want to edit it yourself, the handover includes logins and a walkthrough; if you would rather not, a monthly retainer covers it.",
      },
    ],
    deliverables: [
      "Landing pages",
      "Full websites",
      "Portfolio sites",
      "CMS builds",
      "Appointment & enquiry flows",
      "Handover documentation",
    ],
    timeline: {
      value: "2 days – 2 weeks",
      note: "A landing page usually takes 2–4 working days. A full site takes 1–2 weeks, depending on page count and how quickly content and feedback come back.",
    },
    price: {
      amount: "KSh 45,000",
      note: "Landing pages start lower and are quoted per scope. Every quote is fixed before work starts.",
    },
        photo: {
      src: "/images/photography/photo-web-design.jpg",
      alt: "A dim studio wall with a warehouse window, dark shelves and framed prints",
      caption: "The build happens at a desk, not in a deck.",
      ratio: "16/10",
      maxW: "max-w-xl",
    },
relatedProjects: ["lifeline-hospitals", "overlandhire"],
    proofProject: "lifeline-hospitals",
    faqs: [
      {
        question: "Do you build on WordPress or a CMS?",
        answer:
          "When you need to edit content yourself, yes — we set up a CMS and leave you a short walkthrough. When the site is a fixed set of pages, a hand-coded build is faster and cheaper to host, and we will say so.",
      },
      {
        question: "Who owns the site when it is finished?",
        answer:
          "You do, once the final invoice is paid. That includes the design files, the code and the domain. There is no licence fee and no lock-in to a platform we control.",
      },
    ],
  },
  {
    slug: "copywriting",
    title: "Copywriting",
    short: "Copywriting",
    summary:
      "Website copy, email sequences and social content that sound like a person and give readers a reason to act.",
    intro:
      "Copy written with the design, not poured into it afterwards. Every page gets a job, and every sentence either moves the reader toward that job or gets cut.",
    problem: {
      heading: "The site is fine. The words are not.",
      body: "Pages open with the company's history, describe features nobody asked about, and end without asking for anything. Visitors leave not because the offer is wrong but because they cannot tell what it is. We rewrite the page around the reader's decision.",
    },
    includes: [
      {
        title: "A page-by-page argument",
        body: "Each page gets one job and one claim, and the sections are ordered to answer the questions a real buyer asks in the order they ask them.",
      },
      {
        title: "Written to be read aloud",
        body: "Plain sentences, active voice and no borrowed agency language. If a line could appear on any competitor's site, it is rewritten.",
      },
      {
        title: "Built to be measured",
        body: "Headlines and calls to action are written as testable pairs, so you can change one line later and learn something from it.",
      },
    ],
    deliverables: [
      "Website copy",
      "Email campaigns",
      "Social content",
      "Blog & articles",
      "Landing page copy",
      "Product descriptions",
    ],
    timeline: {
      value: "3 days – 1 week",
      note: "A single landing page takes about three working days. A full site usually runs alongside the design and lands within the build timeline.",
    },
    price: {
      amount: "KSh 15,000",
      note: "Per page for standalone copy. Site-wide copy is quoted with the build.",
    },
        photo: {
      src: "/images/photography/photo-copywriting.jpg",
      alt: "A bright home-office corner with a window, framed line art and a brass lamp",
      caption: "A quiet desk and plain sentences.",
      ratio: "4/3",
      maxW: "max-w-xl",
    },
relatedProjects: ["premiumsafeboxes", "forestwood"],
    proofProject: "premiumsafeboxes",
    faqs: [
      {
        question: "Can you write copy for a site someone else is building?",
        answer:
          "Yes. We work from the existing structure, or rebuild the structure first if the page order is the problem. You get the copy as a document mapped to each page and section.",
      },
      {
        question: "Do you use AI to write it?",
        answer:
          "For research and first drafts, sometimes. Every deliverable is reviewed, rewritten and signed off by the person accountable for it. Strategy and the final edit are human.",
      },
    ],
  },
  {
    slug: "brand-identity",
    title: "Brand identity",
    short: "Brand identity",
    summary:
      "Logo, type, colour and the rules that keep them consistent on every touchpoint — from the site to an invoice.",
    intro:
      "An identity built to be used, not framed. The mark, the type and the colour are chosen against the places they actually appear: a phone screen, a quote document, a sign above a door.",
    problem: {
      heading: "The brand looks different every time someone uses it.",
      body: "A logo from one supplier, colours picked per project, and no rule for either. Customers cannot recognise the business across a site, an invoice and a shopfront. We build a small, complete system and write down how to use it.",
    },
    includes: [
      {
        title: "A mark that survives size",
        body: "Primary, compact and single-colour versions, tested at favicon size and on a signboard — not just at presentation size.",
      },
      {
        title: "Type and colour with rules",
        body: "Two typefaces and a measured palette, each with a defined role and checked contrast pairings, so the system stays legible in real use.",
      },
      {
        title: "A guide someone will open",
        body: "A short brand guide covering the mark, spacing, colour, type and the three or four applications you actually produce.",
      },
    ],
    deliverables: [
      "Logo & marks",
      "Brand guidelines",
      "Marketing collateral",
      "Print",
      "Social templates",
      "File handover",
    ],
    timeline: {
      value: "1 – 2 weeks",
      note: "Two presentation rounds: direction first, then refinement. Final files are handed over in every format your suppliers ask for.",
    },
    price: {
      amount: "KSh 30,000",
      note: "Includes the guide and final files. Packaging and full collateral systems are quoted separately.",
    },
        photo: {
      src: "/images/photography/photo-brand-identity.jpg",
      alt: "A cream mug printed with a single logo mark beside two pens on a concrete surface",
      caption: "One mark, applied the same way everywhere.",
      ratio: "16/10",
      maxW: "max-w-sm",
    },
relatedProjects: ["hadiyed-flowers", "solarizeke"],
    proofProject: "hadiyed-flowers",
    faqs: [
      {
        question: "Do we need a full brand book?",
        answer:
          "Usually not. Most businesses need six to ten pages they will actually reference. We write the guide to the size of your team and the number of suppliers touching the brand.",
      },
      {
        question: "Can you work with an existing logo?",
        answer:
          "Yes. If the mark is sound we keep it and fix the system around it — type, colour, spacing and applications. If it does not survive small sizes we will say so before quoting.",
      },
    ],
  },
  {
    slug: "lead-generation",
    title: "Lead generation",
    short: "Lead generation",
    summary:
      "Verified prospect lists and outreach setup for B2B teams that need pipeline, not more impressions.",
    intro:
      "Research, list building and outreach setup, run to a definition of a qualified lead agreed before we start. You get contacts you can act on, not a spreadsheet of scraped addresses.",
    problem: {
      heading: "More traffic is not the same as more pipeline.",
      body: "Most B2B sites are good at being found and bad at starting conversations. Buying lists produces bounces and complaints. We define who is worth contacting, verify each record, and set up the sequences that get replies.",
    },
    includes: [
      {
        title: "A written definition of fit",
        body: "Sector, size, geography and the trigger that makes a company ready to buy — agreed in writing so nobody argues later about what a good lead is.",
      },
      {
        title: "Verified, sourced records",
        body: "Every contact is checked before delivery, with the source recorded. Bounce-prone and role-account addresses are removed rather than padded in.",
      },
      {
        title: "Outreach that can be handed over",
        body: "Sequences and templates built in your own tools, with the sending domain warmed and the reply handling documented.",
      },
    ],
    deliverables: [
      "Prospect list building",
      "B2B research",
      "LinkedIn outreach setup",
      "Contact verification",
      "Email sequences",
      "Reply handling guide",
    ],
    timeline: {
      value: "1 – 3 weeks",
      note: "A first verified list usually lands inside a week. Outreach setup and domain warming add the second and third.",
    },
    price: {
      amount: "KSh 20,000",
      suffix: "/month",
      note: "Monthly retainer per campaign. List volume is agreed per month; there is no per-lead commission.",
    },
        photo: {
      src: "/images/photography/photo-lead-generation.jpg",
      alt: "A green notebook and pen on an oak desk beside a closed laptop",
      caption: "Records built by hand, with the source written down.",
      ratio: "16/10",
      maxW: "max-w-xl",
    },
relatedProjects: ["paidtaskers", "docsfast"],
    proofProject: "paidtaskers",
    faqs: [
      {
        question: "How big is a list?",
        answer:
          "It depends on the definition of fit, not a target number. A tight definition in a small market might produce 150 verified contacts a month; a broad one produces more and converts worse. We agree the number together.",
      },
      {
        question: "Do you send the outreach for us?",
        answer:
          "If you want, yes — as a retainer with the sending domain and inboxes under your control. If you would rather run it in-house, we set it up and hand over the sequences.",
      },
    ],
  },
  {
    slug: "personal-branding",
    title: "Personal branding",
    short: "Personal branding",
    summary:
      "LinkedIn, CV and portfolio work for founders and professionals who need to be findable, credible and shortlisted.",
    intro:
      "Positioning, profile and portfolio for one person rather than a company. The goal is a specific outcome — interviews, inbound enquiries, speaking invitations — not a prettier profile.",
    problem: {
      heading: "The work is strong. The profile does not show it.",
      body: "A CV lists duties, a LinkedIn headline says the job title, and a portfolio is a gallery with no explanation. Recruiters and clients cannot see the scope, the decisions or the result. We restructure the story around evidence.",
    },
    includes: [
      {
        title: "A position you can defend",
        body: "The one sentence you want to be known for, tested against the roles or clients you are actually targeting.",
      },
      {
        title: "A profile that reads in ten seconds",
        body: "Headline, about section and featured work arranged so a recruiter or buyer gets the shape of your value before scrolling.",
      },
      {
        title: "Evidence, not adjectives",
        body: "Case notes and portfolio entries written as situation, decision, outcome — with numbers where you have them and no invented ones.",
      },
    ],
    deliverables: [
      "LinkedIn optimisation",
      "CV writing",
      "Portfolio curation",
      "Positioning",
      "Cover letters",
      "Interview narrative",
    ],
    timeline: {
      value: "3 – 7 days",
      note: "One working session, then a draft within three days and a final version after your notes.",
    },
    price: {
      amount: "KSh 12,000",
      note: "Profile and CV together. Portfolio curation is quoted on the number of projects.",
    },
        photo: {
      src: "/images/photography/photo-personal-branding.jpg",
      alt: "A woman smiling mid-conversation at a busy professional event",
      caption: "Positioning starts with how you introduce yourself.",
      ratio: "4/3",
      maxW: "max-w-md",
    },
relatedProjects: ["curatelove", "docsfast"],
    proofProject: "curatelove",
    faqs: [
      {
        question: "Will this get me a job?",
        answer:
          "We can make your experience legible and your applications consistent. We cannot promise an outcome we do not control. What we will do is tell you honestly when the positioning is the weak part, not the profile.",
      },
      {
        question: "Do you write for non-LinkedIn profiles?",
        answer:
          "Yes — CVs, portfolio sites, speaker bios and application statements. The same positioning work applies; only the format changes.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const serviceNames = services.map((service) => service.title);
