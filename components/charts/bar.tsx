import { cn } from "@/lib/utils";

// Tiny dependency-free SVG bar/line charts. They scale to container width
// and render server-side, which keeps the dashboards snappy without
// hauling in a charting library.

export function MiniBar({
  data,
  height = 120,
  className,
  tone = "accent",
}: {
  data: number[];
  height?: number;
  className?: string;
  tone?: "accent" | "creator" | "operator" | "sponsor" | "investor";
}) {
  const max = Math.max(...data, 1);
  const tones: Record<typeof tone, string> = {
    accent: "fill-accent",
    creator: "fill-role-creator",
    operator: "fill-role-operator",
    sponsor: "fill-role-sponsor",
    investor: "fill-role-investor",
  };
  return (
    <svg
      viewBox={`0 0 ${data.length * 14} ${height}`}
      preserveAspectRatio="none"
      className={cn("w-full", className)}
      style={{ height }}
    >
      {data.map((v, i) => {
        const h = (v / max) * (height - 8);
        return (
          <rect
            key={i}
            x={i * 14 + 2}
            y={height - h}
            width={10}
            height={h}
            rx={2}
            className={cn(tones[tone], "opacity-90")}
          />
        );
      })}
    </svg>
  );
}

export function Sparkline({
  data,
  height = 64,
  className,
  tone = "accent",
}: {
  data: number[];
  height?: number;
  className?: string;
  tone?: "accent" | "creator" | "operator" | "sponsor" | "investor";
}) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = ((max - v) / range) * (height - 4) + 2;
    return `${x},${y}`;
  });
  const tones: Record<typeof tone, string> = {
    accent: "stroke-accent",
    creator: "stroke-role-creator",
    operator: "stroke-role-operator",
    sponsor: "stroke-role-sponsor",
    investor: "stroke-role-investor",
  };
  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      className={cn("w-full", className)}
      style={{ height }}
    >
      <polyline
        fill="none"
        strokeWidth={1.5}
        className={cn(tones[tone])}
        points={points.join(" ")}
      />
    </svg>
  );
}
