// Architectural elevation: a tall building cross-section with six floors.
// Used to anchor the §02 building section. Pure SVG, server-rendered.

export function BuildingElevation({
  className,
  highlightFloor,
}: {
  className?: string;
  highlightFloor?: number;
}) {
  const floors = [6, 5, 4, 3, 2, 1];
  const floorH = 70;
  const top = 60;
  return (
    <svg
      className={className}
      viewBox="0 0 280 540"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="bld-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15151a" />
          <stop offset="100%" stopColor="#0a0a0d" />
        </linearGradient>
        <linearGradient id="window-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff2c0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fff2c0" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Building outline */}
      <rect x="60" y="40" width="180" height="460" fill="url(#bld-fill)" stroke="#23232b" strokeWidth="1" />
      {/* Roof */}
      <rect x="56" y="30" width="188" height="14" fill="#23232b" />
      {/* Antenna */}
      <line x1="150" y1="30" x2="150" y2="6" stroke="#3a3a44" strokeWidth="1.5" />
      <circle cx="150" cy="6" r="2" fill="#e6ff3d" />

      {/* Floor lines + windows */}
      {floors.map((n, i) => {
        const y = top + i * floorH;
        const isHi = highlightFloor === n;
        return (
          <g key={n}>
            <line x1="60" y1={y + floorH} x2="240" y2={y + floorH} stroke="#23232b" strokeWidth="1" />
            {/* Floor label */}
            <text
              x="50"
              y={y + floorH / 2 + 4}
              fontFamily="ui-monospace, monospace"
              fontSize="9"
              fill={isHi ? "#e6ff3d" : "#6b6b78"}
              textAnchor="end"
            >
              {String(n).padStart(2, "0")}
            </text>
            {/* Windows row */}
            {[0, 1, 2, 3].map((c) => {
              const x = 78 + c * 38;
              return (
                <rect
                  key={c}
                  x={x}
                  y={y + 12}
                  width="28"
                  height={floorH - 24}
                  fill={isHi ? "url(#window-glow)" : "#0a0a0d"}
                  stroke={isHi ? "#e6ff3d" : "#1a1a20"}
                  strokeWidth={isHi ? "0.8" : "0.5"}
                />
              );
            })}
          </g>
        );
      })}

      {/* Ground line + door */}
      <rect x="130" y="500" width="40" height="20" fill="#0a0a0d" stroke="#23232b" />
      <line x1="0" y1="520" x2="280" y2="520" stroke="#23232b" />
      {/* Sidewalk hatching */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={i}
          x1={i * 20}
          y1="538"
          x2={i * 20 + 12}
          y2="525"
          stroke="#16161c"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
