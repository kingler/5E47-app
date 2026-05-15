// Editorial portrait silhouettes — chiaroscuro, single light source, B&W.
// Six variants, deterministically picked per index so the wall reads as a
// curated room of distinct people rather than a tile pattern.
//
// When a `src` is supplied (e.g. /landing/portraits/03.jpg) the real photo
// renders instead, with the grade/grain layered on top in CSS.

type Variant = 0 | 1 | 2 | 3 | 4 | 5;

export function Portrait({ index, src }: { index: number; src?: string }) {
  if (src) return <PortraitPhoto src={src} />;
  return <PortraitSvg index={index} />;
}

function PortraitPhoto({ src }: { src: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover grayscale contrast-110"
      />
      {/* Vignette + grade */}
      <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_55%,transparent_55%,rgba(0,0,0,0.7)_100%)]" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.18] mix-blend-overlay" aria-hidden>
        <filter id={`pgrain-${src.replace(/[^a-z0-9]/gi, "")}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#pgrain-${src.replace(/[^a-z0-9]/gi, "")})`} />
      </svg>
    </div>
  );
}

function PortraitSvg({ index }: { index: number }) {
  const variant = (index % 6) as Variant;
  const lightFromLeft = index % 2 === 0;
  const id = `p-${index}`;

  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden className="w-full h-full">
      <defs>
        <radialGradient
          id={`${id}-key`}
          cx={lightFromLeft ? "0.25" : "0.75"}
          cy="0.3"
          r="0.7"
        >
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a20" />
          <stop offset="100%" stopColor="#06060a" />
        </linearGradient>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.5" r="0.7">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.7" />
        </radialGradient>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.18" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      <rect width="200" height="200" fill={`url(#${id}-bg)`} />
      <rect width="200" height="200" fill={`url(#${id}-key)`} />

      <g fill="#020203">
        {variant === 0 && (
          <>
            <ellipse cx="100" cy="92" rx="32" ry="38" />
            <path d="M 70 100 Q 60 150, 80 200 L 120 200 Q 140 150, 130 100 Z" />
            <path d="M 70 95 Q 55 140, 65 200 L 80 200 Q 70 150, 75 100 Z" />
          </>
        )}
        {variant === 1 && (
          <>
            <ellipse cx="100" cy="88" rx="30" ry="34" />
            <path d="M 60 200 L 60 145 Q 60 122, 100 122 Q 140 122, 140 145 L 140 200 Z" />
          </>
        )}
        {variant === 2 && (
          <>
            <ellipse cx="100" cy="82" rx="28" ry="34" />
            <rect x="92" y="112" width="16" height="22" />
            <path d="M 55 200 L 55 150 Q 55 130, 100 130 Q 145 130, 145 150 L 145 200 Z" />
          </>
        )}
        {variant === 3 && (
          <>
            <ellipse cx="100" cy="92" rx="30" ry="34" />
            <ellipse cx="100" cy="60" rx="46" ry="9" />
            <rect x="76" y="40" width="48" height="28" rx="6" />
            <path d="M 60 200 L 60 145 Q 60 122, 100 122 Q 140 122, 140 145 L 140 200 Z" />
          </>
        )}
        {variant === 4 && (
          <>
            <ellipse cx="100" cy="78" rx="40" ry="30" />
            <ellipse cx="100" cy="92" rx="30" ry="32" />
            <path d="M 58 200 L 58 148 Q 58 124, 100 124 Q 142 124, 142 148 L 142 200 Z" />
          </>
        )}
        {variant === 5 && (
          <>
            <ellipse cx="100" cy="90" rx="30" ry="34" />
            <path d="M 60 200 L 60 145 Q 60 122, 100 122 Q 140 122, 140 145 L 140 200 Z" />
            <rect x="78" y="86" width="18" height="10" rx="3" fill="#0a0a0d" stroke="#3a3a44" strokeWidth="1" />
            <rect x="104" y="86" width="18" height="10" rx="3" fill="#0a0a0d" stroke="#3a3a44" strokeWidth="1" />
            <line x1="96" y1="91" x2="104" y2="91" stroke="#3a3a44" strokeWidth="1" />
          </>
        )}
      </g>

      <rect width="200" height="200" fill={`url(#${id}-key)`} opacity="0.55" style={{ mixBlendMode: "screen" }} />
      <rect width="200" height="200" fill={`url(#${id}-vig)`} />
      <rect width="200" height="200" filter={`url(#${id}-grain)`} opacity="0.5" />
    </svg>
  );
}
