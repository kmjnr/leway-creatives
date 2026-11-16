import { services } from "./services";

/**
 * The contact form's option lists, shared by the client form and the API route.
 * The route validates against these exact values, so a tampered payload cannot
 * inject arbitrary text into the WhatsApp notification.
 */
export const NOT_SURE_OPTION = "Not sure yet — advise me";

export const serviceOptions = [
  ...services.map((service) => service.title),
  NOT_SURE_OPTION,
] as const;

export const budgetOptions = [
  "Not sure yet",
  "Under KSh 50,000",
  "KSh 50,000 – 150,000",
  "KSh 150,000 – 400,000",
  "KSh 400,000+",
  "Monthly retainer",
] as const;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;
