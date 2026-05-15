// A film-still composition: dark interior, tall arched window with a single
// shaft of morning light, a still chair in silhouette, dust motes in the
// beam. All vector — composes with the page's grain + grading layers.

export function FilmStill({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        {/* Wall + floor gradient */}
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c0c10" />
          <stop offset="60%" stopColor="#08080b" />
          <stop offset="100%" stopColor="#020203" />
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15151a" />
          <stop offset="100%" stopColor="#020203" />
        </linearGradient>

        {/* Sun / window light */}
        <radialGradient id="sun" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0%" stopColor="#fff8d8" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#fff0b0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff0b0" stopOpacity="0" />
        </radialGradient>

        {/* Beam mask */}
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff2c0" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#fff2c0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#fff2c0" stopOpacity="0" />
        </linearGradient>

        {/* Vignette */}
        <radialGradient id="vignette" cx="0.5" cy="0.55" r="0.75">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.85" />
        </radialGradient>

        {/* Window arch */}
        <clipPath id="archClip">
          <path d="M 1140 120 L 1140 560 L 1340 560 L 1340 120 A 100 100 0 0 0 1140 120 Z" />
        </clipPath>
      </defs>

      {/* Back wall */}
      <rect width="1600" height="700" fill="url(#wall)" />
      {/* Floor */}
      <rect y="700" width="1600" height="300" fill="url(#floor)" />
      {/* Floor seam */}
      <line x1="0" y1="700" x2="1600" y2="700" stroke="#1a1a22" strokeWidth="1" />

      {/* Window frame */}
      <g clipPath="url(#archClip)">
        <rect x="1140" y="60" width="200" height="500" fill="url(#sun)" />
        {/* Window mullions */}
        <line x1="1240" y1="60" x2="1240" y2="560" stroke="#000" strokeOpacity="0.55" strokeWidth="3" />
        <line x1="1140" y1="280" x2="1340" y2="280" stroke="#000" strokeOpacity="0.55" strokeWidth="3" />
        <line x1="1140" y1="420" x2="1340" y2="420" stroke="#000" strokeOpacity="0.55" strokeWidth="3" />
      </g>
      {/* Window outline */}
      <path
        d="M 1140 120 L 1140 560 L 1340 560 L 1340 120 A 100 100 0 0 0 1140 120 Z"
        fill="none"
        stroke="#222226"
        strokeWidth="2"
      />

      {/* Light beam falling on the floor */}
      <polygon
        points="1140,560 1340,560 1180,1000 760,1000"
        fill="url(#beam)"
        opacity="0.85"
      />

      {/* Floor reflection of the window */}
      <ellipse cx="1240" cy="720" rx="160" ry="14" fill="#fff2c0" opacity="0.18" />

      {/* Architectural lines (paneling) */}
      <g stroke="#16161c" strokeWidth="1.2" opacity="0.9">
        <line x1="0" y1="180" x2="1100" y2="180" />
        <line x1="0" y1="540" x2="1100" y2="540" />
        <line x1="380" y1="0" x2="380" y2="700" />
        <line x1="760" y1="0" x2="760" y2="700" />
      </g>

      {/* Chair silhouette */}
      <g fill="#020203">
        <rect x="380" y="540" width="120" height="20" rx="3" />
        <rect x="384" y="540" width="6" height="160" />
        <rect x="490" y="540" width="6" height="160" />
        <rect x="380" y="430" width="6" height="120" />
        <rect x="494" y="430" width="6" height="120" />
        <rect x="380" y="430" width="120" height="10" rx="2" />
      </g>

      {/* Dust motes in beam */}
      <g fill="#fff2c0" opacity="0.9">
        <circle cx="980" cy="780" r="1.6" />
        <circle cx="1020" cy="820" r="1.2" />
        <circle cx="940" cy="700" r="1" />
        <circle cx="1080" cy="660" r="1.4" />
        <circle cx="1140" cy="780" r="1.1" />
        <circle cx="900" cy="860" r="1.5" />
        <circle cx="860" cy="740" r="1" />
        <circle cx="1180" cy="900" r="1.3" />
        <circle cx="820" cy="900" r="1" />
      </g>

      {/* Vignette */}
      <rect width="1600" height="1000" fill="url(#vignette)" />
    </svg>
  );
}
