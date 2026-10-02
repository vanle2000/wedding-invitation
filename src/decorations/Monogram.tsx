interface MonogramProps {
  initials: [string, string]
  /** Diameter in px. */
  size?: number
  /** Stroke/text colour. */
  color?: string
  /** Show the circular botanical ring around the initials. */
  ring?: boolean
  className?: string
}

/**
 * Circular botanical monogram: two thin concentric rings, a wreath of fine
 * olive leaves, and the couple's initials in an editorial serif.
 */
export default function Monogram({
  initials,
  size = 200,
  color = 'currentColor',
  ring = true,
  className = '',
}: MonogramProps) {
  const [a, b] = initials
  const leaves = 28
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={{ color }}
      role="img"
      aria-label={`Monogram ${a} and ${b}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ring && (
        <>
          <circle cx="100" cy="100" r="96" strokeWidth="0.5" opacity="0.7" />
          <circle cx="100" cy="100" r="78" strokeWidth="0.6" />
          {Array.from({ length: leaves }).map((_, i) => {
            const t = (i / leaves) * Math.PI * 2
            const r = 87
            const x = 100 + Math.cos(t) * r
            const y = 100 + Math.sin(t) * r
            const tangent = (t * 180) / Math.PI + 90
            const tilt = i % 2 === 0 ? -28 : 28
            return (
              <path
                key={i}
                d="M0 0 C 3.5 -2.8, 8 -2.8, 11 0 C 8 2.8, 3.5 2.8, 0 0 Z"
                transform={`translate(${x} ${y}) rotate(${tangent + tilt})`}
                strokeWidth="0.6"
              />
            )
          })}
          {[90, 270].map((d) => {
            const t = (d * Math.PI) / 180
            return (
              <circle
                key={d}
                cx={100 + Math.cos(t) * 87}
                cy={100 + Math.sin(t) * 87}
                r="1.8"
                strokeWidth="0.6"
              />
            )
          })}
        </>
      )}
      <text
        x="100"
        y="100"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        stroke="none"
        fontFamily='"Bodoni Moda", "Cormorant Garamond", Georgia, serif'
        fontWeight="400"
        fontSize="58"
        letterSpacing="2"
      >
        <tspan>{a}</tspan>
        <tspan fontSize="30" fontStyle="italic" dx="2" dy="-2">
          &amp;
        </tspan>
        <tspan dx="2" dy="2">
          {b}
        </tspan>
      </text>
    </svg>
  )
}
