"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavDoc = { slug: string; title: string; category: string };

export function DocNav({ docs }: { docs: NavDoc[] }) {
  const pathname = usePathname();
  const categories = Array.from(new Set(docs.map((d) => d.category)));

  return (
    <nav className="flex flex-col gap-5">
      <Link
        href="/docs"
        className={cn(
          "text-sm transition-colors",
          pathname === "/docs" ? "text-ink font-medium" : "text-ink-muted hover:text-ink",
        )}
      >
        Overview
      </Link>
      {categories.map((cat) => (
        <div key={cat} className="flex flex-col gap-1.5">
          <div className="label">{cat}</div>
          {docs
            .filter((d) => d.category === cat)
            .map((d) => {
              const href = `/docs/${d.slug}`;
              const active = pathname === href;
              return (
                <Link
                  key={d.slug}
                  href={href}
                  className={cn(
                    "text-sm leading-snug transition-colors border-l-2 pl-3 -ml-px py-0.5",
                    active
                      ? "text-ink border-accent"
                      : "text-ink-muted hover:text-ink border-transparent hover:border-ink-soft",
                  )}
                >
                  {d.title}
                </Link>
              );
            })}
        </div>
      ))}
    </nav>
  );
}
