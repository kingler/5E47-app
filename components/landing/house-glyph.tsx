// Small editorial vignettes for each house — keyboard, clapper, lectern,
// notebook. Pure SVG, deeply cropped so they read as detail photography.
//
// When `src` is supplied the real photograph renders instead.

export function HouseGlyph({
  kind,
  src,
}: {
  kind: "music" | "video" | "masterclass" | "founders";
  src?: string;
}) {
  if (src) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={src}
          alt=""
          decoding="async"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] contrast-110"
        />
        <div className="absolute inset-0 [background:radial-gradient(70%_70%_at_30%_30%,transparent,rgba(0,0,0,0.55))]" />
      </div>
    );
  }
  return <HouseGlyphSvg kind={kind} />;
}

function HouseGlyphSvg({ kind }: { kind: "music" | "video" | "masterclass" | "founders" }) {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={`hg-${kind}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0e0e13" />
          <stop offset="100%" stopColor="#06060a" />
        </linearGradient>
        <radialGradient id={`hg-${kind}-spot`} cx="0.7" cy="0.2" r="0.7">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#hg-${kind}-bg)`} />
      <rect width="320" height="200" fill={`url(#hg-${kind}-spot)`} />

      {kind === "music" && (
        <g transform="translate(20 70)">
          {/* Keyboard — diagonal */}
          <g transform="rotate(-12)">
            {Array.from({ length: 16 }).map((_, i) => (
              <rect key={i} x={i * 18} y={0} width="17" height="80" fill="#f5f5f7" stroke="#0a0a0d" strokeWidth="1" />
            ))}
            {[0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 14].map((i) => (
              <rect key={i} x={i * 18 + 11} y={0} width="12" height="48" fill="#0a0a0d" />
            ))}
          </g>
        </g>
      )}

      {kind === "video" && (
        <g>
          {/* Clapper */}
          <g transform="translate(60 60) rotate(-8)">
            <rect x="0" y="40" width="220" height="120" fill="#0a0a0d" stroke="#23232b" />
            <g transform="translate(0 0)">
              <rect x="0" y="0" width="220" height="40" fill="#1a1a20" />
              <g>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <polygon
                    key={i}
                    points={`${i * 32},40 ${i * 32 + 16},0 ${i * 32 + 32},40`}
                    fill={i % 2 === 0 ? "#f5f5f7" : "#0a0a0d"}
                  />
                ))}
              </g>
            </g>
            <text x="20" y="100" fontFamily="ui-monospace, monospace" fontSize="14" fill="#9a9aa6">
              SCENE  TAKE
            </text>
            <text x="20" y="130" fontFamily="ui-monospace, monospace" fontSize="22" fill="#e6ff3d">
              05  47
            </text>
          </g>
        </g>
      )}

      {kind === "masterclass" && (
        <g>
          {/* Lectern + notes */}
          <g transform="translate(60 50)">
            <polygon points="0,140 200,140 220,150 -20,150" fill="#1a1a20" />
            <rect x="20" y="40" width="160" height="100" fill="#0e0e13" stroke="#23232b" />
            <line x1="40" y1="60" x2="160" y2="60" stroke="#3a3a44" strokeWidth="1" />
            <line x1="40" y1="76" x2="140" y2="76" stroke="#3a3a44" strokeWidth="1" />
            <line x1="40" y1="92" x2="150" y2="92" stroke="#3a3a44" strokeWidth="1" />
            <line x1="40" y1="108" x2="120" y2="108" stroke="#3a3a44" strokeWidth="1" />
            {/* Lamp */}
            <line x1="200" y1="40" x2="200" y2="0" stroke="#3a3a44" strokeWidth="2" />
            <ellipse cx="200" cy="0" rx="14" ry="6" fill="#3a3a44" />
            <ellipse cx="200" cy="40" rx="50" ry="6" fill="#fff2c0" opacity="0.18" />
          </g>
        </g>
      )}

      {kind === "founders" && (
        <g>
          {/* Open notebook + pen */}
          <g transform="translate(40 60)">
            <rect x="0" y="0" width="240" height="120" fill="#0e0e13" stroke="#23232b" />
            <line x1="120" y1="0" x2="120" y2="120" stroke="#23232b" strokeWidth="1" />
            {[24, 40, 56, 72, 88, 104].map((y) => (
              <line key={y} x1="14" y1={y} x2="108" y2={y} stroke="#1a1a20" strokeWidth="0.6" />
            ))}
            {[24, 40, 56, 72, 88].map((y) => (
              <line key={y} x1="132" y1={y} x2="226" y2={y} stroke="#1a1a20" strokeWidth="0.6" />
            ))}
            <text x="14" y="22" fontFamily="ui-serif, Georgia" fontStyle="italic" fontSize="12" fill="#9a9aa6">
              The list of things to ship—
            </text>
            <text x="14" y="40" fontFamily="ui-serif, Georgia" fontSize="11" fill="#6b6b78">
              · v0 to ten people
            </text>
            <text x="14" y="56" fontFamily="ui-serif, Georgia" fontSize="11" fill="#6b6b78">
              · the founder letter
            </text>
            <text x="14" y="72" fontFamily="ui-serif, Georgia" fontSize="11" fill="#6b6b78">
              · the first hire
            </text>
            {/* Pen */}
            <g transform="translate(160 80) rotate(28)">
              <rect x="0" y="0" width="120" height="6" fill="#23232b" />
              <polygon points="120,0 140,3 120,6" fill="#e6ff3d" />
            </g>
          </g>
        </g>
      )}
    </svg>
  );
}
