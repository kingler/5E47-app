import Link from "next/link";
import { Bell, Search } from "lucide-react";
import type { User } from "@/lib/types";
import { ROLE_LABEL } from "@/lib/rbac";
import { Badge } from "@/components/ui/badge";

export function TopBar({ user }: { user: User }) {
  const tone =
    user.role === "creator"
      ? "creator"
      : user.role === "sponsor"
        ? "sponsor"
        : user.role === "investor"
          ? "investor"
          : "operator";

  return (
    <header className="hairline sticky top-0 z-30 backdrop-blur bg-bg/70">
      <div className="flex h-14 items-center justify-between gap-4 px-5 md:px-8">
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-lg border border-bg-border bg-bg-elev px-3 py-1.5 text-sm text-ink-muted w-80">
            <Search className="size-4" />
            <span className="truncate">Search creators, studios, campaigns…</span>
            <span className="ml-auto pill text-[10px]">⌘K</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge tone={tone as "creator" | "operator" | "sponsor" | "investor"}>
            {ROLE_LABEL[user.role]}
          </Badge>
          <button className="rounded-lg border border-bg-border bg-bg-elev p-2 text-ink-muted hover:text-ink">
            <Bell className="size-4" />
          </button>
          <Link
            href="/login"
            className="flex items-center gap-2.5 rounded-lg border border-bg-border bg-bg-elev px-2.5 py-1.5"
          >
            <div className="size-6 rounded-full bg-gradient-to-br from-ink to-ink-soft text-bg flex items-center justify-center text-[10px] font-bold">
              {user.name
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs text-ink">{user.name}</span>
              <span className="text-[10px] text-ink-soft">Switch persona</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
