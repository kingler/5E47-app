"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Human-in-the-loop control: Sam recommends, the committee/operator ratifies.
// Admissions and pricing changes are never applied autonomously.
export function RecommendationControl({ action }: { action: string }) {
  const [decision, setDecision] = useState<"pending" | "ratified" | "overridden">("pending");

  if (decision === "ratified") {
    return <Badge tone="success"><Check className="size-3" /> Ratified — {action.toUpperCase()}</Badge>;
  }
  if (decision === "overridden") {
    return <Badge tone="warning"><X className="size-3" /> Overridden — held by operator</Badge>;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setDecision("ratified")}
        className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-accent-ink px-3 py-1.5 text-xs font-medium hover:bg-accent-muted transition-colors"
      >
        <Check className="size-3.5" /> Ratify
      </button>
      <button
        onClick={() => setDecision("overridden")}
        className="inline-flex items-center gap-1.5 rounded-lg border border-bg-border bg-bg-elev px-3 py-1.5 text-xs hover:border-ink-soft transition-colors"
      >
        <X className="size-3.5" /> Override
      </button>
    </div>
  );
}
