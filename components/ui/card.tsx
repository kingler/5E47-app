import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "surface p-5 flex flex-col gap-3",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  hint,
  action,
  className,
}: {
  title: React.ReactNode;
  hint?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-3", className)}>
      <div>
        <div className="text-sm font-semibold text-ink">{title}</div>
        {hint ? (
          <div className="text-xs text-ink-soft mt-0.5">{hint}</div>
        ) : null}
      </div>
      {action}
    </div>
  );
}
