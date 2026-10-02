import type { CSSProperties } from 'react'

export type BotanicalVariant = 'olive-branch' | 'sprig' | 'wildflower' | 'corner' | 'landscape' | 'wreath'

interface BotanicalDecorationProps {
  variant: BotanicalVariant
  /** Width in px (height follows the variant's aspect ratio). */
  size?: number
  /** Stroke/fill colour. Defaults to currentColor so Tailwind text-* classes work. */
  color?: string
  className?: string
  style?: CSSProperties
  flip?: boolean
}

const stroke = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** A single olive leaf as a path, pointing along +x from (0,0). */
const leaf = (x: number, y: number, len: number, angle: number, key: string) => (
  <path
    key={key}
    d={`M0 0 C ${len * 0.3} ${-len * 0.22}, ${len * 0.7} ${-len * 0.22}, ${len} 0 C ${len * 0.7} ${len * 0.22}, ${len * 0.3} ${len * 0.22}, 0 0 Z`}
    transform={`translate(${x} ${y}) rotate(${angle})`}
    strokeWidth="0.8"
  />
)

/**
 * Fine-line botanical engravings as inline SVG.
 * All variants are drawn in a single stroke colour so they stay low-contrast.
 */
export default function BotanicalDecoration({
  variant,
  size = 120,
  color = 'currentColor',
  className = '',
  style,
  flip = false,
}: BotanicalDecorationProps) {
  const common = {
    className,
    style: { ...style, color, transform: flip ? `scaleX(-1) ${style?.transform ?? ''}` : style?.transform },
    'aria-hidden': true as const,
    stroke: 'currentColor',
    ...stroke,
  }

  switch (variant) {
    case 'olive-branch':
      return (
        <svg viewBox="0 0 200 70" width={size} height={size * 0.35} {...common}>
          <path d="M4 60 C 50 40, 110 30, 196 12" strokeWidth="0.9" />
          {[
            [28, 52, 26, -58],
            [48, 46, 28, 20],
            [68, 42, 28, -62],
            [90, 36, 30, 14],
            [112, 31, 28, -66],
            [136, 26, 30, 8],
            [158, 21, 26, -70],
            [178, 16, 24, 2],
          ].map(([x, y, l, a], i) => leaf(x, y, l, a, `l${i}`))}
          <circle cx="58" cy="50" r="3" strokeWidth="0.8" />
          <circle cx="124" cy="34" r="2.6" strokeWidth="0.8" />
        </svg>
      )

    case 'sprig':
      return (
        <svg viewBox="0 0 60 120" width={size} height={size * 2} {...common}>
          <path d="M30 116 C 32 80, 28 50, 30 6" strokeWidth="0.8" />
          {[
            [30, 96, 20, -140],
            [30, 84, 20, -40],
            [30, 70, 18, -142],
            [30, 58, 18, -38],
            [30, 44, 16, -146],
            [30, 32, 16, -34],
            [30, 20, 13, -150],
            [30, 14, 12, -30],
          ].map(([x, y, l, a], i) => leaf(x, y, l, a, `s${i}`))}
        </svg>
      )

    case 'wildflower':
      return (
        <svg viewBox="0 0 80 100" width={size} height={size * 1.25} {...common}>
          <path d="M40 98 C 42 70, 36 50, 40 26" strokeWidth="0.8" />
          <path d="M40 70 C 30 66, 24 60, 22 52" strokeWidth="0.7" />
          <path d="M40 58 C 50 54, 56 48, 58 40" strokeWidth="0.7" />
          {/* Five-petal head */}
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="40"
              cy="14"
              rx="4"
              ry="8"
              transform={`rotate(${a} 40 22)`}
              strokeWidth="0.75"
            />
          ))}
          <circle cx="40" cy="22" r="2.2" strokeWidth="0.75" />
          {/* Small buds */}
          <circle cx="22" cy="50" r="2.4" strokeWidth="0.7" />
          <circle cx="58" cy="38" r="2.2" strokeWidth="0.7" />
          {leaf(40, 84, 16, -150, 'wl1')}
          {leaf(40, 78, 14, -20, 'wl2')}
        </svg>
      )

    case 'corner':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} {...common}>
          <path d="M6 114 L6 6 L114 6" strokeWidth="0.7" />
          <path d="M14 106 L14 14 L106 14" strokeWidth="0.5" opacity="0.7" />
          <path d="M14 40 C 20 30, 30 22, 40 14" strokeWidth="0.8" />
          {leaf(18, 36, 14, -60, 'c1')}
          {leaf(26, 26, 14, 10, 'c2')}
          {leaf(34, 18, 12, -58, 'c3')}
          <circle cx="40" cy="14" r="1.8" strokeWidth="0.7" />
        </svg>
      )

    case 'landscape':
      // Faint estate landscape — rolling hills, cypress trees, a distant house.
      return (
        <svg viewBox="0 0 320 110" width={size} height={size * 0.344} {...common}>
          <path d="M0 86 C 60 70, 110 78, 160 70 C 220 60, 270 74, 320 66" strokeWidth="0.7" />
          <path d="M0 100 C 70 90, 130 96, 190 88 C 250 80, 290 92, 320 86" strokeWidth="0.7" />
          {/* Cypresses */}
          {[52, 66, 230, 244, 258].map((x, i) => (
            <path
              key={x}
              d={`M${x} ${74 - (i % 2) * 2} C ${x - 4} ${60}, ${x - 3} ${46}, ${x} ${34 - (i % 2) * 6} C ${x + 3} ${46}, ${x + 4} ${60}, ${x} ${74 - (i % 2) * 2} Z`}
              strokeWidth="0.7"
            />
          ))}
          {/* House */}
          <path d="M140 72 L140 56 L158 46 L176 56 L176 72" strokeWidth="0.7" />
          <path d="M148 72 L148 62 L154 62 L154 72 M163 60 L169 60 L169 66 L163 66 Z" strokeWidth="0.6" />
          {/* Sun */}
          <circle cx="282" cy="26" r="9" strokeWidth="0.6" strokeDasharray="1.5 2.5" />
          {/* Foreground grasses */}
          <path
            d="M20 100 C 22 94, 24 90, 25 86 M30 100 C 30 95, 32 90, 36 86 M300 92 C 302 88, 302 84, 304 80"
            strokeWidth="0.6"
          />
        </svg>
      )

    case 'wreath':
      return (
        <svg viewBox="0 0 200 200" width={size} height={size} {...common}>
          <circle cx="100" cy="100" r="78" strokeWidth="0.6" />
          {Array.from({ length: 22 }).map((_, i) => {
            const a = (i / 22) * Math.PI * 2
            const r = 78
            const x = 100 + Math.cos(a) * r
            const y = 100 + Math.sin(a) * r
            const deg = (a * 180) / Math.PI + (i % 2 ? 60 : -60) + 90
            return leaf(x, y, 15, deg, `w${i}`)
          })}
          {[30, 120, 210, 300].map((d) => {
            const a = (d * Math.PI) / 180
            return (
              <circle
                key={d}
                cx={100 + Math.cos(a) * 78}
                cy={100 + Math.sin(a) * 78}
                r="2.4"
                strokeWidth="0.7"
              />
            )
          })}
        </svg>
      )
  }
}
