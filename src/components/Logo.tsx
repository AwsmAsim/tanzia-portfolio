export function Logo({ size = 40, light = false }: { size?: number; light?: boolean }) {
  const ring = light ? '#e3c982' : '#e3c982'
  const disc = light ? '#f4f1d9' : '#143d2b'
  const bars = light ? '#143d2b' : '#f4f1d9'
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill={disc} stroke={ring} strokeWidth="2.5" />
      <g fill={bars}>
        <rect x="18" y="34" width="6" height="12" rx="1.5" />
        <rect x="28" y="28" width="6" height="18" rx="1.5" />
        <rect x="38" y="22" width="6" height="24" rx="1.5" />
      </g>
      <path
        d="M18 30 L28 24 L36 27 L46 17"
        fill="none"
        stroke={ring}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41 17 L46 17 L46 22"
        fill="none"
        stroke={ring}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Decorative flowing contour-line motif (echoes her deck corners). */
export function Contour({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <path
          key={i}
          d={`M-20 ${60 + i * 16} C 80 ${10 + i * 16}, 140 ${150 + i * 14}, 240 ${110 + i * 15} S 420 ${40 + i * 16}, 460 ${120 + i * 15}`}
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.5 - i * 0.03}
        />
      ))}
    </svg>
  )
}
