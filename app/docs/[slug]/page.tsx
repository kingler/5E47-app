import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  DOCS,
  docsSorted,
  getDoc,
  renderDocHtml,
  tableOfContents,
} from "@/lib/docs";

export const dynamic = "force-static";

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return { title: "5E47 · Documentation" };
  return { title: `5E47 · ${doc.title}`, description: doc.subtitle };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const html = renderDocHtml(doc);
  const toc = tableOfContents(doc);
  const ordered = docsSorted();
  const idx = ordered.findIndex((d) => d.slug === doc.slug);
  const prev = idx > 0 ? ordered[idx - 1] : undefined;
  const next = idx < ordered.length - 1 ? ordered[idx + 1] : undefined;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-10">
      <article className="min-w-0">
        <div className="label mb-3">{doc.category}</div>
        <div
          className="prose prose-invert max-w-none
            prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight
            prose-h1:text-[clamp(2rem,4vw,3rem)] prose-h1:leading-[1.05] prose-h1:mb-4
            prose-h2:mt-12 prose-h2:scroll-mt-24 prose-h2:border-t prose-h2:border-bg-border prose-h2:pt-8
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-ink prose-strong:font-semibold
            prose-code:text-accent prose-code:before:content-[''] prose-code:after:content-['']
            prose-hr:border-bg-border
            prose-blockquote:border-l-accent prose-blockquote:text-ink-muted prose-blockquote:font-normal prose-blockquote:not-italic
            prose-th:text-ink prose-th:border-bg-border prose-td:border-bg-border
            prose-thead:border-bg-border prose-tr:border-bg-border
            prose-table:text-sm
            prose-li:marker:text-ink-soft"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <nav className="mt-16 pt-8 border-t border-bg-border grid grid-cols-2 gap-3">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="group surface p-4 flex flex-col gap-1 transition-colors hover:border-ink-soft"
            >
              <span className="text-[11px] text-ink-soft inline-flex items-center gap-1">
                <ArrowLeft className="size-3" /> Previous
              </span>
              <span className="text-sm text-ink">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="group surface p-4 flex flex-col gap-1 text-right transition-colors hover:border-ink-soft"
            >
              <span className="text-[11px] text-ink-soft inline-flex items-center justify-end gap-1">
                Next <ArrowRight className="size-3" />
              </span>
              <span className="text-sm text-ink">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      {toc.length > 0 && (
        <aside className="hidden xl:block">
          <div className="sticky top-28 flex flex-col gap-2">
            <div className="label">On this page</div>
            {toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="text-[13px] text-ink-soft hover:text-ink leading-snug transition-colors"
              >
                {t.text}
              </a>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
