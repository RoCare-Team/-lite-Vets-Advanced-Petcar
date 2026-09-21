export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be emitted as raw JSON; escape "<" to keep it inert.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
