import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Registry for the public documentation site. Markdown lives in /docs and is
// read + rendered at build time (these routes are statically generated), so
// no filesystem access is needed at runtime.

export type DocCategory = "Proposal" | "Business" | "Product" | "Engineering";

export interface DocMeta {
  slug: string;
  title: string;
  subtitle: string;
  file: string;
  category: DocCategory;
  order: number;
  featured?: boolean;
}

export const DOCS: DocMeta[] = [
  {
    slug: "designthru-studio-proposal",
    title: "DesignThru Studio Proposal",
    subtitle: "Statement of work & investment to design and build Sam, the 5E47 MAS.",
    file: "06-designthru-studio-proposal.md",
    category: "Proposal",
    order: 0,
    featured: true,
  },
  {
    slug: "leased-network-pivot-strategy",
    title: "Leased Network Pivot Strategy",
    subtitle: "The pivot to Hit House — an asset-light, lease-led, location-interchangeable membership network.",
    file: "08-leased-network-pivot-strategy.md",
    category: "Business",
    order: 1,
  },
  {
    slug: "business-model-canvas",
    title: "Business Model Canvas",
    subtitle: "The nine blocks of the agent-operated, lease-led network, mapped to Sam's subagents.",
    file: "01-business-model-canvas.md",
    category: "Business",
    order: 2,
  },
  {
    slug: "business-plan",
    title: "Business Plan",
    subtitle: "Market, marketing strategy, lease-led financials, and multi-city network growth.",
    file: "02-business-plan.md",
    category: "Business",
    order: 3,
  },
  {
    slug: "business-requirements",
    title: "Business Requirements Document",
    subtitle: "Objectives, scope, stakeholders, and business requirements for the MAS.",
    file: "03-business-requirements-document.md",
    category: "Product",
    order: 4,
  },
  {
    slug: "product-requirements",
    title: "Product Requirements Document",
    subtitle: "Product vision, agent specs, user stories, and success metrics.",
    file: "04-product-requirements-document.md",
    category: "Product",
    order: 5,
  },
  {
    slug: "software-development-plan",
    title: "Software Development Plan & Cost",
    subtitle: "Architecture, phases, schedule, team, and cost estimate.",
    file: "05-software-development-plan.md",
    category: "Engineering",
    order: 6,
  },
  {
    slug: "spv-capitalization-strategy",
    title: "SPV Capitalization Strategy",
    subtitle: "Lease-led entity architecture, capital stacks, waterfalls, and the per-market Leasehold SPV template.",
    file: "07-spv-capitalization-strategy.md",
    category: "Business",
    order: 7,
  },
];

export const CATEGORY_ORDER: DocCategory[] = ["Proposal", "Business", "Product", "Engineering"];

export function getDoc(slug: string): DocMeta | undefined {
  return DOCS.find((d) => d.slug === slug);
}

export function docsSorted(): DocMeta[] {
  return [...DOCS].sort((a, b) => a.order - b.order);
}

function readRaw(meta: DocMeta): string {
  return fs.readFileSync(path.join(process.cwd(), "docs", meta.file), "utf8");
}

export function renderDocHtml(meta: DocMeta): string {
  marked.setOptions({ gfm: true, breaks: false });
  const html = marked.parse(readRaw(meta), { async: false }) as string;
  // marked v18 doesn't emit heading ids; inject them on h2 so the on-page
  // table of contents can link to each section.
  return html.replace(/<h2>(.*?)<\/h2>/g, (_match, inner: string) => {
    const text = inner
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    return `<h2 id="${slugify(text)}">${inner}</h2>`;
  });
}

export interface TocItem {
  id: string;
  text: string;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Extract H2 headings for an on-page table of contents.
export function tableOfContents(meta: DocMeta): TocItem[] {
  const raw = readRaw(meta);
  const items: TocItem[] = [];
  for (const line of raw.split("\n")) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m && !line.startsWith("###")) {
      const text = m[1].replace(/[*_`]/g, "");
      items.push({ id: slugify(text), text });
    }
  }
  return items;
}

export { slugify };
