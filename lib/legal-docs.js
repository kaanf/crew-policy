import fs from "node:fs";
import path from "node:path";

const docsDirectory = path.join(process.cwd(), "content");

export const legalDocuments = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    file: "privacy-policy.md",
    description:
      "How Crew collects, uses, shares, and protects information when you use the app."
  },
  {
    slug: "house-rules",
    title: "House Rules",
    file: "house-rules.md",
    description:
      "The safety, consent, venue, and gameplay rules for every Crew event."
  },
  {
    slug: "terms-of-use",
    title: "Terms of Use",
    file: "terms-of-use.md",
    description:
      "The terms that govern your access to and use of Crew and related services."
  }
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function flushParagraph(state) {
  if (state.paragraph.length === 0) {
    return;
  }

  state.currentBlocks.push({
    type: "p",
    content: state.paragraph.join(" ")
  });
  state.paragraph = [];
}

function flushList(state) {
  if (state.list.length === 0) {
    return;
  }

  state.currentBlocks.push({
    type: "list",
    items: state.list
  });
  state.list = [];
}

function startSection(state, title) {
  flushParagraph(state);
  flushList(state);

  const section = {
    id: slugify(title),
    title,
    blocks: []
  };

  state.sections.push(section);
  state.currentBlocks = section.blocks;
}

export function getLegalDocument(slug) {
  const documentMeta = legalDocuments.find((document) => document.slug === slug);

  if (!documentMeta) {
    throw new Error(`Unknown legal document: ${slug}`);
  }

  const filePath = path.join(docsDirectory, documentMeta.file);
  const markdown = fs.readFileSync(filePath, "utf8");
  const lines = markdown.split(/\r?\n/);
  const state = {
    title: documentMeta.title,
    effectiveDate: "",
    intro: [],
    sections: [],
    currentBlocks: [],
    paragraph: [],
    list: []
  };

  state.currentBlocks = state.intro;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph(state);
      flushList(state);
      continue;
    }

    if (line.startsWith("# ")) {
      state.title = line.replace(/^#\s+/, "");
      continue;
    }

    if (line.startsWith("## ")) {
      startSection(state, line.replace(/^##\s+/, ""));
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph(state);
      flushList(state);
      state.currentBlocks.push({
        type: "h3",
        content: line.replace(/^###\s+/, "")
      });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph(state);
      state.list.push(line.replace(/^-\s+/, ""));
      continue;
    }

    if (!state.effectiveDate && line.startsWith("Effective date:")) {
      state.effectiveDate = line;
      continue;
    }

    flushList(state);
    state.paragraph.push(line);
  }

  flushParagraph(state);
  flushList(state);

  return {
    ...documentMeta,
    title: state.title,
    effectiveDate: state.effectiveDate,
    intro: state.intro,
    sections: state.sections
  };
}

export function getLegalDocumentMeta(slug) {
  return legalDocuments.find((document) => document.slug === slug);
}
