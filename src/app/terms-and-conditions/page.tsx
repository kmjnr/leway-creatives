import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { pageJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms & conditions",
  description:
    "The terms that apply when you use this site or engage LEWAY Creatives for work — scope, payment, ownership and liability, in plain language.",
  path: "/terms-and-conditions",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Terms & conditions" }];

const jsonLd = pageJsonLd(
  {
    "@type": "WebPage",
    name: "Terms & conditions",
    url: `${site.url}/terms-and-conditions`,
    description:
      "The terms that apply when you use this site or engage LEWAY Creatives for work.",
  },
  { crumbs },
);

export default function TermsAndConditionsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <main id="main" className="bg-leway-paper">
        <PageHeader
          crumbs={crumbs}
          title="Terms & conditions."
          lead="The terms that apply when you use this site or engage LEWAY Creatives for work — scope, payment, ownership and liability, in plain language."
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
              These terms apply to this website and to any work LEWAY Creatives
              carries out for you. Where a signed quote or statement of work
              sets different terms for a specific project, that document takes
              precedence for that project.
            </p>

            <h2>1. Who we are</h2>
            <p>
              LEWAY Creatives is a design and development studio based in{" "}
              {site.city}, {site.country}. In these terms, &quot;we&quot;,
              &quot;us&quot; and &quot;the studio&quot; mean LEWAY Creatives;
              &quot;you&quot; and &quot;the client&quot; mean the person or
              business engaging us.
            </p>

            <h2>2. What we do</h2>
            <p>
              We provide web design and development, copywriting, brand
              identity, lead generation and personal branding. The scope of a
              particular project — the pages or pieces, the deliverables, the
              timeline and the fee — is set out in a written quote before any
              work starts.
            </p>

            <h2>3. Quotes and scope</h2>
            <p>
              Every project is quoted at a fixed price after a scoping call. The
              quote describes what is included. Nothing is billable until you
              approve that quote in writing.
            </p>
            <p>
              If you ask for work outside the agreed scope, we will tell you
              what it costs before doing it. We do not quote low and recover the
              difference through change requests.
            </p>

            <h2>4. Payment</h2>
            <ul>
              <li>
                <strong>Deposit:</strong> projects normally begin with a deposit
                set out in the quote, with the balance due on completion.
              </li>
              <li>
                <strong>Invoicing:</strong> invoices are payable in the currency
                and within the period stated on the invoice.
              </li>
              <li>
                <strong>Late payment:</strong> we may pause work, and withhold
                handover, while an invoice is overdue.
              </li>
              <li>
                <strong>Refunds:</strong> fees are non-refundable once work has
                started, except where we fail to deliver what was agreed.
              </li>
            </ul>
            <p>
              We do not process card payments through this website. Payment
              methods are agreed in the quote.
            </p>

            <h2>5. Revisions</h2>
            <p>
              Two rounds of revisions are included in every project. Additional
              rounds, or a change of direction after approval, are quoted at a
              flat fee before the extra work begins.
            </p>

            <h2>6. What we need from you</h2>
            <p>
              To keep the agreed timeline, you agree to provide content,
              approvals and feedback when they are due, and to nominate one
              person who can approve work on your behalf. If those inputs are
              late, the timeline moves by at least the same amount.
            </p>

            <h2>7. Timelines</h2>
            <p>
              Timelines in a quote assume the inputs above arrive on time. We
              will tell you as soon as we know a date is at risk, and agree a
              revised date with you.
            </p>

            <h2>8. Ownership and handover</h2>
            <ul>
              <li>
                <strong>Your material:</strong> anything you supply remains
                yours, and you confirm you have the right to let us use it.
              </li>
              <li>
                <strong>Final deliverables:</strong> on receipt of final payment,
                ownership of the finished design, copy and code transfers to
                you.
              </li>
              <li>
                <strong>Handover:</strong> you receive the files, the domain and
                the logins you need. There is no licence fee and no lock-in to a
                platform we control.
              </li>
              <li>
                <strong>Our tools:</strong> internal working files, templates and
                code libraries we use across projects remain ours.
              </li>
              <li>
                <strong>Portfolio:</strong> we may show the finished work in our
                portfolio and case studies. Tell us before the project starts if
                a piece must stay private.
              </li>
            </ul>

            <h2>9. Third-party services</h2>
            <p>
              Projects may rely on third parties — hosting, domains, a content
              management system, fonts or plugins. Those services have their own
              terms and fees. We will tell you which ones a project depends on,
              and we are not responsible for outages or price changes on their
              side.
            </p>

            <h2>10. Confidentiality</h2>
            <p>
              We keep business information you share with us confidential and
              use it only for the project. We will not publish figures,
              strategies or material you mark as confidential without your
              permission.
            </p>

            <h2>11. Ending a project</h2>
            <p>
              Either side may end a project in writing. If you end it, you pay
              for work completed up to that date. If we end it without cause, we
              refund any amount paid for work not yet done. We may end a project
              immediately if asked to do something unlawful or misleading.
            </p>

            <h2>12. Liability</h2>
            <p>
              We deliver work with reasonable skill and care, but we do not
              guarantee a particular commercial result such as a ranking,
              traffic volume or number of enquiries, because those depend on
              factors outside our control.
            </p>
            <p>
              To the extent permitted by law, our total liability for a project
              is limited to the fee paid for that project. We are not liable for
              indirect or consequential loss, including lost profit or lost
              data, where that loss was not reasonably foreseeable.
            </p>

            <h2>13. Governing law</h2>
            <p>
              These terms are governed by the laws of Kenya. If a dispute
              arises, we will first try to resolve it informally; if that fails,
              the courts of Kenya have jurisdiction.
            </p>

            <h2>14. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. The version in force
              for a project is the one provided with its quote. The current
              version always appears on this page with the date it was updated.
            </p>

            <h2>15. Contact</h2>
            <p>
              Questions about these terms can go to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or{" "}
              {site.phoneDisplay}.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
