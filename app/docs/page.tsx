import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { CATEGORY_ORDER, DOCS, docsSorted } from "@/lib/docs";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "5E47 · Documentation",
  description:
    "Business and product documentation for 5E47 — the agent-operated luxury creator residency, and DesignThru Studio's proposal to build Sam.",
};

export default function DocsIndex() {
  const featured = DOCS.find((d) => d.featured);
  const all = docsSorted();

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <div className="label">5E47 · Documentation</div>
        <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] text-balance">
          The brief, the business,
          <br />
          <span className="text-ink-muted italic">and the system that runs it.</span>
        </h1>
        <p className="text-ink-muted text-[15px] leading-[1.7] max-w-2xl">
          Everything behind 5E47's agent-operated residency — the business model,
          the plan and financials, the requirements, and DesignThru Studio's
          proposal to design and build <strong className="text-ink">Sam</strong>, the
          5E47 multi-agent system.
        </p>
      </header>

      {featured && (
        <Link
          href={`/docs/${featured.slug}`}
          className="group relative overflow-hidden rounded-2xl border border-accent/30 bg-accent/[0.04] p-8 md:p-10 transition-colors hover:border-accent/50"
        >
          <div className="absolute inset-0 -z-10 [background:radial-gradient(60%_80%_at_85%_0%,rgba(230,255,61,0.10),transparent_60%)]" />
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-accent mb-5">
            <Sparkles className="size-3.5" />
            Featured · Proposal
          </div>
          <h2 className="font-serif text-3xl md:text-4xl leading-[1.05] max-w-2xl">
            {featured.title}
          </h2>
          <p className="mt-4 text-ink-muted text-[15px] leading-[1.7] max-w-xl">
            {featured.subtitle}
          </p>
          <div className="mt-8 inline-flex items-center gap-2 text-sm text-accent">
            Read the proposal
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      )}

      <div className="flex flex-col gap-10">
        {CATEGORY_ORDER.map((cat) => {
          const items = all.filter((d) => d.category === cat && !d.featured);
          if (items.length === 0) return null;
          return (
            <section key={cat} className="flex flex-col gap-4">
              <div className="label">{cat}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/docs/${d.slug}`}
                    className="group surface p-5 flex flex-col gap-2 transition-colors hover:border-ink-soft"
                  >
                    <div className="flex items-center justify-between">
                      <FileText className="size-4 text-ink-soft" />
                      <ArrowRight className="size-4 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                    </div>
                    <div className="font-serif text-xl leading-snug">{d.title}</div>
                    <p className="text-[13px] text-ink-soft leading-relaxed">{d.subtitle}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
