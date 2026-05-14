import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="surface overflow-hidden">
      <table
        className={cn("w-full text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function THead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      {...props}
      className={cn(
        "text-left text-[11px] uppercase tracking-wider text-ink-soft bg-bg-elev/60",
        props.className,
      )}
    />
  );
}

export function TH(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className={cn("px-4 py-2.5 font-medium", props.className)}
    />
  );
}

export function TR(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      {...props}
      className={cn(
        "border-t border-bg-border hover:bg-bg-elev/50 transition-colors",
        props.className,
      )}
    />
  );
}

export function TD(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      className={cn("px-4 py-3 align-middle", props.className)}
    />
  );
}
