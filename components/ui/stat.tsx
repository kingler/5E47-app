import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stat({
  label,
  value,
  delta,
  hint,
  tone,
  className,
}: {
  label: string;
  value: React.ReactNode;
  delta?: number;
  hint?: string;
  tone?: "creator" | "operator" | "sponsor" | "investor";
  className?: string;
}) {
  const up = (delta ?? 0) >= 0;
  const ring: Record<NonNullable<typeof tone>, string> = {
    creator: "before:bg-role-creator",
    operator: "before:bg-role-operator",
    sponsor: "before:bg-role-sponsor",
    investor: "before:bg-role-investor",
  };
  return (
    <div
      className={cn(
        "surface relative p-5 overflow-hidden",
        tone &&
          "before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-l-2xl",
        tone && ring[tone],
        className,
      )}
    >
      <div className="label">{label}</div>
      <div className="mt-2 flex items-baseline gap-3">
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center text-xs font-medium",
              up ? "text-emerald-400" : "text-red-400",
            )}
          >
            {up ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>
      {hint && <div className="mt-1 text-xs text-ink-soft">{hint}</div>}
    </div>
  );
}
