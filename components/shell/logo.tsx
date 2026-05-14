import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex size-7 items-center justify-center rounded-lg bg-accent text-accent-ink font-black tracking-tight">
        <span className="text-[11px] leading-none">5E</span>
        <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-sm bg-bg shadow-[0_0_0_1.5px_#e6ff3d]" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-semibold tracking-tight">5E47</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
          Creator OS
        </span>
      </div>
    </div>
  );
}
