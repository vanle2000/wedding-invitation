interface WaxSealProps {
  initials: [string, string]
  size?: number
  className?: string
}

/**
 * Burgundy wax seal with an irregular edge, soft highlight, and an
 * embossed monogram. Pure SVG — no raster assets.
 */
export default function WaxSeal({ initials, size = 92, className = '' }: WaxSealProps) {
  const [a, b] = initials
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 2px 2px rgba(74,51,56,0.3))' }}
    >
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#9A4452" />
          <stop offset="55%" stopColor="#7A2E3B" />
          <stop offset="100%" stopColor="#5A1F2A" />
        </radialGradient>
        <radialGradient id="waxHighlight" cx="30%" cy="25%" r="40%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Irregular wax blob */}
      <path
        d="M50 4 C 62 3, 74 8, 82 17 C 92 27, 97 40, 95 53 C 93 67, 86 80, 74 88 C 63 96, 47 98, 35 93 C 22 88, 10 77, 6 63 C 2 49, 5 34, 14 22 C 22 11, 37 5, 50 4 Z"
        fill="url(#wax)"
      />
      <path
        d="M50 4 C 62 3, 74 8, 82 17 C 92 27, 97 40, 95 53 C 93 67, 86 80, 74 88 C 63 96, 47 98, 35 93 C 22 88, 10 77, 6 63 C 2 49, 5 34, 14 22 C 22 11, 37 5, 50 4 Z"
        fill="url(#waxHighlight)"
      />
      {/* Embossed ring */}
      <circle cx="50" cy="50" r="33" fill="none" stroke="#4E1A24" strokeWidth="1.2" opacity="0.8" />
      <circle
        cx="50"
        cy="50"
        r="33"
        fill="none"
        stroke="#D9C39A"
        strokeWidth="0.5"
        opacity="0.55"
        transform="translate(0 -0.8)"
      />
      {/* Tiny leaves on the ring */}
      {[0, 60, 120, 180, 240, 300].map((d) => (
        <path
          key={d}
          d="M0 0 C 2 -1.6, 4.6 -1.6, 6.5 0 C 4.6 1.6, 2 1.6, 0 0 Z"
          transform={`rotate(${d} 50 50) translate(50 17) rotate(-30)`}
          fill="none"
          stroke="#D9C39A"
          strokeWidth="0.5"
          opacity="0.7"
        />
      ))}
      {/* Monogram (embossed: dark offset + light face) */}
      <text
        x="50"
        y="51.2"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily='"Bodoni Moda", "Cormorant Garamond", Georgia, serif'
        fontSize="30"
        fill="#4A1823"
        letterSpacing="1"
      >
        {a}
        {b}
      </text>
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily='"Bodoni Moda", "Cormorant Garamond", Georgia, serif'
        fontSize="30"
        fill="#D9C39A"
        letterSpacing="1"
        opacity="0.9"
      >
        {a}
        {b}
      </text>
    </svg>
  )
}
