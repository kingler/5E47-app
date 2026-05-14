import * as React from "react";
import { cn } from "@/lib/utils";

type Tone =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "creator"
  | "operator"
  | "sponsor"
  | "investor";

const tones: Record<Tone, string> = {
  neutral: "bg-bg-elev text-ink-muted border-bg-border",
  accent: "bg-accent/10 text-accent border-accent/30",
  success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  danger: "bg-red-500/10 text-red-300 border-red-500/30",
  info: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  creator: "bg-role-creator/15 text-role-creator border-role-creator/30",
  operator: "bg-role-operator/15 text-role-operator border-role-operator/40",
  sponsor: "bg-role-sponsor/15 text-role-sponsor border-role-sponsor/40",
  investor: "bg-role-investor/15 text-role-investor border-role-investor/40",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
