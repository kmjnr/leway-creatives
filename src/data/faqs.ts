export interface Faq {
  question: string;
  answer: string;
}

/**
 * Single source of truth for the FAQ. The visible section and the JSON-LD
 * in page.tsx both render from this array so they can never drift apart.
 */
export const faqs: Faq[] = [
  {
    question: "What does a project cost?",
    answer:
      "Every project is quoted after a short scoping call, and the quote is fixed before work starts. Landing pages, full websites, copywriting, brand identity and lead generation are priced separately, so you only pay for what you need.",
  },
  {
    question: "How long does a website take?",
    answer:
      "A landing page usually takes 2–4 working days. A full website takes 1–2 weeks, depending on the number of pages and how quickly content and feedback come back. The timeline is agreed before we start.",
  },
  {
    question: "Do you write the copy as well?",
    answer:
      "Yes. Copywriting is part of most projects, not an add-on. The same team writes the words and designs the page, so the message and the layout are decided together.",
  },
  {
    question: "Do you work with clients outside Kenya?",
    answer:
      "We work with clients across Kenya, the US, the UK, Canada and Australia. Calls are scheduled around your time zone, and most of the work happens asynchronously over email or WhatsApp.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Two rounds of revisions are included in every project. Most projects need one, because the brief and the structure are agreed before design starts. Extra rounds are quoted at a flat fee.",
  },
  {
    question: "Can you maintain the site after launch?",
    answer:
      "Yes. Monthly retainers cover content updates, design changes, new pages and technical maintenance. You can also take the files and manage everything yourself — handover includes logins and a short walkthrough.",
  },
  {
    question: "Do you use AI?",
    answer:
      "We use AI for speed, not for judgement. Strategy, positioning and the final edit are human. AI helps with research and first drafts; every deliverable is reviewed and rewritten by the person accountable for it.",
  },
];
