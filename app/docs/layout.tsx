import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/shell/logo";
import { DocNav } from "@/components/docs/doc-nav";
import { docsSorted } from "@/lib/docs";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const docs = docsSorted().map((d) => ({
    slug: d.slug,
    title: d.title,
    category: d.category,
  }));

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-bg/70 border-b border-bg-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.22em] text-ink-soft border-l border-bg-border pl-4">
              Documentation
            </span>
          </div>
          <Link
            href="/"
            className="text-[13px] text-ink-muted hover:text-ink inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="size-3.5" />
            Back to 5E47
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <DocNav docs={docs} />
            </div>
          </aside>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
