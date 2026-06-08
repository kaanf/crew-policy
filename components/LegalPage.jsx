import { legalDocuments } from "@/lib/legal-docs";

function renderInlineText(text) {
  const splitEmailPattern = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;
  const testEmailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const parts = text.split(splitEmailPattern);

  return parts.map((part, index) => {
    if (testEmailPattern.test(part)) {
      return (
        <a key={`${part}-${index}`} href={`mailto:${part}`}>
          {part}
        </a>
      );
    }

    return part;
  });
}

function PolicyBlock({ block }) {
  if (block.type === "h3") {
    return <h3>{block.content}</h3>;
  }

  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{renderInlineText(item)}</li>
        ))}
      </ul>
    );
  }

  return <p>{renderInlineText(block.content)}</p>;
}

function SectionLinks({ sections }) {
  return sections.map((section) => (
    <a key={section.id} href={`#${section.id}`}>
      {section.title}
    </a>
  ));
}

function LegalNav({ currentSlug }) {
  const basePath = process.env.PAGES_BASE_PATH || "";

  return (
    <nav className="legal-nav" aria-label="Legal pages">
      {legalDocuments.map((document) => (
        <a
          key={document.slug}
          href={`${basePath}/${document.slug}`}
          aria-current={document.slug === currentSlug ? "page" : undefined}
        >
          {document.title}
        </a>
      ))}
    </nav>
  );
}

export default function LegalPage({ document }) {
  const basePath = process.env.PAGES_BASE_PATH || "";

  return (
    <main className="policy-page">
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

      <section id="top" className="hero" aria-labelledby="policy-title">
        <p className="eyebrow">Crew Legal</p>
        <h1 id="policy-title">{document.title}</h1>
        {document.effectiveDate ? (
          <p className="updated">{document.effectiveDate}</p>
        ) : null}
        {document.intro.map((block, index) => (
          <p className="intro" key={`intro-${index}`}>
            {renderInlineText(block.content)}
          </p>
        ))}
        <LegalNav currentSlug={document.slug} />
      </section>

      <div className="content-shell">
        <aside className="toc" aria-label={`${document.title} sections`}>
          <div className="toc-desktop">
            <p>Sections</p>
            <nav>
              <SectionLinks sections={document.sections} />
            </nav>
          </div>

          <details className="toc-mobile">
            <summary>
              <span>Sections</span>
              <strong>Jump to section</strong>
            </summary>
            <nav>
              <SectionLinks sections={document.sections} />
            </nav>
          </details>
        </aside>

        <article className="policy-content">
          {document.sections.map((section) => (
            <section key={section.id} id={section.id} className="policy-section">
              <h2>{section.title}</h2>
              {section.blocks.map((block, index) => (
                <PolicyBlock key={`${section.id}-${index}`} block={block} />
              ))}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
