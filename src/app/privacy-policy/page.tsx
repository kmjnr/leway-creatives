import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { pageJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How LEWAY Creatives collects, uses and protects information — and the rights you have over it under the Kenya Data Protection Act and the GDPR.",
  path: "/privacy-policy",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Privacy policy" }];

const jsonLd = pageJsonLd(
  {
    "@type": "WebPage",
    name: "Privacy policy",
    url: `${site.url}/privacy-policy`,
    description:
      "How LEWAY Creatives collects, uses and protects personal information.",
  },
  { crumbs },
);

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <main id="main" className="bg-leway-paper">
        <PageHeader
          crumbs={crumbs}
          title="Privacy policy."
          lead="How LEWAY Creatives collects, uses and protects information — and the rights you have over it under the Kenya Data Protection Act and the GDPR."
        >
          <p className="font-body text-small text-leway-dark/65">
            Last updated 16 November 2026 · Questions? Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-leway-green-ink underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
            >
              {site.email}
            </a>
          </p>
        </PageHeader>

        <div className="container pt-16 md:pt-20 pb-24 md:pb-32">
          <div className="legal-prose max-w-3xl">
            <p>
              This policy explains what information LEWAY Creatives collects
              through this website, why we collect it, how it is stored, and
              what you can ask us to do with it. It covers the website only;
              client project work is also governed by the signed scope or
              statement of work for that project.
            </p>

            <h2>1. Who we are</h2>
            <p>
              LEWAY Creatives is a design and development studio based in{" "}
              {site.city}, {site.country}. For any question about this policy
              or your information, contact{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2>2. What we collect</h2>
            <h3>Information you send us</h3>
            <p>
              The contact form asks for your name, email address, a description
              of what you need, and optionally your company, WhatsApp number,
              budget range and the services you are interested in. We use these
              details only to reply to your enquiry and to prepare a quote.
            </p>
            <h3>Information collected automatically</h3>
            <p>
              Like most websites, our hosting provider records standard server
              logs — IP address, browser type, the page requested and the time
              of the request. These logs are used for security and to keep the
              site running. We do not use them to build a profile of you.
            </p>
            <h3>Cookies and analytics</h3>
            <p>
              This site does not set analytics, advertising or marketing
              cookies, and we do not run third-party tracking scripts. If that
              changes, this page will be updated before any tracking is enabled.
            </p>

            <h2>3. How your enquiry reaches us</h2>
            <p>
              When you submit the form, the details are sent to our server and
              forwarded to the studio&apos;s WhatsApp number through Callmebot,
              a third-party message relay, so we see the enquiry promptly.
              WhatsApp messages are then handled under WhatsApp&apos;s own
              privacy terms. If you prefer not to use the form, you can email us
              directly at <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2>4. Why we are allowed to use it</h2>
            <ul>
              <li>
                <strong>To answer your enquiry</strong> — we have a legitimate
                interest in responding to a message you chose to send us.
              </li>
              <li>
                <strong>To deliver a project</strong> — processing is necessary
                to perform the contract once you engage us.
              </li>
              <li>
                <strong>To meet legal obligations</strong> — for example keeping
                records for tax and accounting.
              </li>
            </ul>
            <p>
              We do not sell your information, and we do not add you to a
              marketing list because you sent an enquiry.
            </p>

            <h2>5. Who else sees it</h2>
            <ul>
              <li>
                <strong>Hosting:</strong> the site is hosted by Netlify, which
                processes requests and server logs on our behalf.
              </li>
              <li>
                <strong>Message delivery:</strong> Callmebot relays form
                submissions to WhatsApp.
              </li>
              <li>
                <strong>Professional advisers:</strong> accountants or lawyers,
                only where necessary and under confidentiality.
              </li>
            </ul>
            <p>
              We do not share enquiry details with advertisers or data brokers.
            </p>

            <h2>6. Where it is stored and for how long</h2>
            <p>
              Enquiries are received in Kenya and may pass through service
              providers that operate outside Kenya. Where information leaves
              Kenya, we rely on the provider&apos;s contractual safeguards.
            </p>
            <p>
              We keep an enquiry for as long as needed to respond and, if it
              becomes a project, for the period required for client records and
              tax. Enquiries that do not become projects are deleted when they
              are no longer useful, and in any case within 24 months.
            </p>

            <h2>7. How we protect it</h2>
            <p>
              The site is served over HTTPS. Form submissions are validated on
              the server, rate-limited, and delivered over an encrypted
              connection. Access to the studio&apos;s inbox and WhatsApp account
              is restricted to the people who run projects. No system is
              perfectly secure, but we keep the amount of information we hold to
              what is needed to do the work.
            </p>

            <h2>8. Your rights</h2>
            <p>
              Under the Kenya Data Protection Act 2019, and under the GDPR where
              it applies, you can ask us to:
            </p>
            <ul>
              <li>confirm what information we hold about you and give you a copy;</li>
              <li>correct information that is wrong or out of date;</li>
              <li>delete information we no longer need;</li>
              <li>restrict or object to how we use it;</li>
              <li>provide it in a portable format; and</li>
              <li>withdraw consent where processing is based on consent.</li>
            </ul>
            <p>
              Email <a href={`mailto:${site.email}`}>{site.email}</a> to make a
              request. We will respond within 30 days. If you are not satisfied,
              you can complain to the Office of the Data Protection Commissioner
              in Kenya, or to your local supervisory authority.
            </p>

            <h2>9. Children</h2>
            <p>
              This site is aimed at businesses and professional clients. It is
              not intended for anyone under 18, and we do not knowingly collect
              information from children.
            </p>

            <h2>10. Links to other sites</h2>
            <p>
              Case studies link to websites we built that are operated by our
              clients. Those sites have their own privacy policies, and this
              policy does not cover them.
            </p>

            <h2>11. Changes to this policy</h2>
            <p>
              If this policy changes, we will post the new version here and
              update the date at the top. Material changes affecting an active
              project will also be raised with that client directly.
            </p>

            <h2>12. Contact</h2>
            <p>
              Questions about privacy can go to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or{" "}
              {site.phoneDisplay}.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
