/**
 * The single renderer for structured data.
 *
 * Pages build plain objects from the shared data files; this component does
 * the one thing that must be identical everywhere: emit a safe JSON-LD script.
 * `<` is escaped so a future value containing markup cannot close the script
 * element and inject code into the document.
 */
export default function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // The value is fully escaped above and originates only from local data.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
