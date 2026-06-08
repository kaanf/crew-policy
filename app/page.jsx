import { legalDocuments } from "@/lib/legal-docs";

export const metadata = {
  title: "Crew Legal",
  description: "Crew legal documents: Privacy Policy, House Rules, and Terms of Use."
};

export default function LegalIndexPage() {
  const basePath = process.env.PAGES_BASE_PATH || "";

  return (
    <main className="policy-page legal-index">
      <header className="site-header" aria-label="Crew">
        <a className="brand" href={`${basePath}/`} aria-label="Crew legal home">
          <img
            src={`${basePath}/crew_black_logo.png`}
            alt="Crew"
            width={1201}
            height={387}
          />
        </a>
        <a className="contact-link" href="mailto:frtpkaan@gmail.com">
          Contact
        </a>
      </header>

      <section className="hero legal-index-hero" aria-labelledby="legal-title">
        <p className="eyebrow">Crew Legal</p>
        <h1 id="legal-title">Legal documents for Crew</h1>
        <p className="intro">
          Review Crew's Privacy Policy, House Rules, and Terms of Use for app,
          event, ticket, QR, and real-world game features.
        </p>
      </section>

      <section className="legal-card-grid" aria-label="Legal documents">
        {legalDocuments.map((document) => (
          <a
            className="legal-card"
            key={document.slug}
            href={`${basePath}/${document.slug}`}
          >
            <span>{document.title}</span>
            <p>{document.description}</p>
          </a>
        ))}
      </section>
    </main>
  );
}
