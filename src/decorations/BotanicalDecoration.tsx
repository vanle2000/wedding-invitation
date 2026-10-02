import type { CSSProperties } from 'react'

export type BotanicalVariant = 'olive-branch' | 'sprig' | 'wildflower' | 'corner' | 'landscape' | 'wreath'

/**
 * Regency / Bridgerton palette for the botanicals: soft sage foliage,
 * muted burgundy stems and outlines, and pastel blooms.
 */
export const bloomPalette = {
  stem: '#8A5260',
  outline: '#7A2E3B',
  leaf: '#C9D2BC',
  leafLine: '#8F9C80',
  pink: '#F3CBD3',
  blush: '#E8A9B6',
  rose: '#D98A9C',
  peach: '#F6D7C3',
  wisteria: '#D5C7E2',
  butter: '#F4E6BF',
  burgundy: '#7A2E3B',
  gold: '#C2AE7C',
} as const

interface BotanicalDecorationProps {
  variant: BotanicalVariant
  /** Width in px (height follows the variant's aspect ratio). */
  size?: number
  /** 'color' = pastel Bridgerton palette (default). 'mono' = single currentColor linework. */
  tone?: 'color' | 'mono'
  className?: string
  style?: CSSProperties
  flip?: boolean
}

type Pal = Record<keyof typeof bloomPalette, string>

const mono = (): Pal =>
  Object.fromEntries(Object.keys(bloomPalette).map((k) => [k, 'currentColor'])) as Pal

/** Leaf pointing along +x from the origin. */
const Leaf = ({ x, y, len, angle, p }: { x: number; y: number; len: number; angle: number; p: Pal }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <path
      d={`M0 0 C ${len * 0.3} ${-len * 0.24}, ${len * 0.7} ${-len * 0.24}, ${len} 0 C ${len * 0.7} ${len * 0.24}, ${len * 0.3} ${len * 0.24}, 0 0 Z`}
      fill={p.leaf}
      fillOpacity={p.leaf === 'currentColor' ? 0 : 0.9}
      stroke={p.leafLine}
      strokeWidth="0.7"
    />
    <path d={`M${len * 0.1} 0 L${len * 0.9} 0`} stroke={p.leafLine} strokeWidth="0.45" opacity="0.8" />
  </g>
)

/** Five-petal pastel blossom with a small burgundy/gold heart. */
const Blossom = ({
  x,
  y,
  r,
  fill,
  p,
  rotate = 0,
}: {
  x: number
  y: number
  r: number
  fill: string
  p: Pal
  rotate?: number
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse
        key={a}
        cx="0"
        cy={-r * 0.62}
        rx={r * 0.46}
        ry={r * 0.66}
        transform={`rotate(${a})`}
        fill={fill}
        fillOpacity={fill === 'currentColor' ? 0 : 0.95}
        stroke={p.outline}
        strokeOpacity="0.55"
        strokeWidth="0.5"
      />
    ))}
    <circle r={r * 0.26} fill={p.burgundy} fillOpacity="0.85" />
    <circle r={r * 0.1} cx={-r * 0.08} cy={-r * 0.08} fill={p.gold} />
  </g>
)

/** Closed rosebud on a short stem. */
const Bud = ({ x, y, fill, p, angle = 0 }: { x: number; y: number; fill: string; p: Pal; angle?: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <path d="M0 0 C -3 -3, -3 -8, 0 -11 C 3 -8, 3 -3, 0 0 Z" fill={fill} fillOpacity="0.95" stroke={p.outline} strokeOpacity="0.55" strokeWidth="0.5" />
    <path d="M-2.4 -2 C -1 -5, 1 -5, 2.4 -2" fill="none" stroke={p.leafLine} strokeWidth="0.6" />
  </g>
)

export default function BotanicalDecoration({
  variant,
  size = 120,
  tone = 'color',
  className = '',
  style,
  flip = false,
}: BotanicalDecorationProps) {
  const p: Pal = tone === 'mono' ? mono() : { ...bloomPalette }
  const common = {
    className,
    style: { ...style, transform: flip ? `scaleX(-1) ${style?.transform ?? ''}` : style?.transform },
    'aria-hidden': true as const,
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (variant) {
    // A trailing rose branch: sage leaves, pink blooms, a burgundy stem.
    case 'olive-branch':
      return (
        <svg viewBox="0 0 200 70" width={size} height={size * 0.35} {...common}>
          <path d="M4 60 C 50 40, 110 30, 196 12" stroke={p.stem} strokeWidth="0.9" />
          {(
            [
              [28, 52, 24, -58],
              [48, 46, 26, 20],
              [90, 36, 28, 14],
              [112, 31, 26, -66],
              [158, 21, 24, -70],
              [178, 16, 22, 2],
            ] as const
          ).map(([x, y, l, a], i) => (
            <Leaf key={i} x={x} y={y} len={l} angle={a} p={p} />
          ))}
          <Blossom x={70} y={40} r={9} fill={p.pink} p={p} rotate={12} />
          <Blossom x={136} y={25} r={7.5} fill={p.wisteria} p={p} rotate={-20} />
          <Bud x={58} y={48} fill={p.blush} p={p} angle={-30} />
          <Bud x={150} y={22} fill={p.peach} p={p} angle={25} />
        </svg>
      )

    // Upright sprig with tiny alternating blossoms.
    case 'sprig':
      return (
        <svg viewBox="0 0 60 120" width={size} height={size * 2} {...common}>
          <path d="M30 116 C 32 80, 28 50, 30 6" stroke={p.stem} strokeWidth="0.8" />
          {(
            [
              [30, 96, 18, -140],
              [30, 84, 18, -40],
              [30, 58, 16, -38],
              [30, 44, 14, -146],
              [30, 20, 12, -150],
            ] as const
          ).map(([x, y, l, a], i) => (
            <Leaf key={i} x={x} y={y} len={l} angle={a} p={p} />
          ))}
          <Blossom x={22} y={70} r={6} fill={p.pink} p={p} />
          <Blossom x={38} y={32} r={5.5} fill={p.peach} p={p} rotate={20} />
          <Blossom x={30} y={8} r={5} fill={p.blush} p={p} rotate={-10} />
          <Bud x={37} y={52} fill={p.wisteria} p={p} angle={30} />
        </svg>
      )

    // A full peony-like bloom with pastel companions.
    case 'wildflower':
      return (
        <svg viewBox="0 0 80 100" width={size} height={size * 1.25} {...common}>
          <path d="M40 98 C 42 70, 36 50, 40 26" stroke={p.stem} strokeWidth="0.8" />
          <path d="M40 70 C 30 66, 24 60, 22 52" stroke={p.stem} strokeWidth="0.7" />
          <path d="M40 58 C 50 54, 56 48, 58 40" stroke={p.stem} strokeWidth="0.7" />
          <Leaf x={40} y={84} len={16} angle={-150} p={p} />
          <Leaf x={40} y={78} len={14} angle={-20} p={p} />
          {/* Layered peony */}
          <Blossom x={40} y={22} r={15} fill={p.pink} p={p} />
          <Blossom x={40} y={22} r={9} fill={p.blush} p={p} rotate={36} />
          <Blossom x={22} y={50} r={6} fill={p.wisteria} p={p} rotate={15} />
          <Blossom x={58} y={38} r={5.5} fill={p.butter} p={p} rotate={-15} />
        </svg>
      )

    // Ornamental corner: double hairline with a rose spray.
    case 'corner':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} {...common}>
          <path d="M6 114 L6 6 L114 6" stroke={p.gold} strokeWidth="0.8" />
          <path d="M14 106 L14 14 L106 14" stroke={p.gold} strokeWidth="0.5" opacity="0.7" />
          <path d="M14 46 C 20 34, 30 24, 46 14" stroke={p.stem} strokeWidth="0.8" />
          <Leaf x={18} y={40} len={13} angle={-60} p={p} />
          <Leaf x={34} y={22} len={12} angle={-58} p={p} />
          <Blossom x={26} y={29} r={8} fill={p.pink} p={p} rotate={10} />
          <Blossom x={46} y={14} r={5.5} fill={p.peach} p={p} rotate={-25} />
          <Bud x={16} y={52} fill={p.blush} p={p} angle={-110} />
        </svg>
      )

    // Regency estate under a blush sky — pastel washes under fine linework.
    case 'landscape':
      return (
        <svg viewBox="0 0 320 110" width={size} height={size * 0.344} {...common}>
          {tone === 'color' && (
            <>
              <rect x="0" y="0" width="320" height="86" fill={p.pink} fillOpacity="0.28" />
              <path d="M0 86 C 60 70, 110 78, 160 70 C 220 60, 270 74, 320 66 L320 110 L0 110 Z" fill={p.leaf} fillOpacity="0.55" />
              <path d="M0 100 C 70 90, 130 96, 190 88 C 250 80, 290 92, 320 86 L320 110 L0 110 Z" fill={p.leafLine} fillOpacity="0.28" />
            </>
          )}
          <path d="M0 86 C 60 70, 110 78, 160 70 C 220 60, 270 74, 320 66" stroke={p.leafLine} strokeWidth="0.7" />
          <path d="M0 100 C 70 90, 130 96, 190 88 C 250 80, 290 92, 320 86" stroke={p.leafLine} strokeWidth="0.7" />
          {[52, 66, 230, 244, 258].map((x, i) => (
            <path
              key={x}
              d={`M${x} ${74 - (i % 2) * 2} C ${x - 4} 60, ${x - 3} 46, ${x} ${34 - (i % 2) * 6} C ${x + 3} 46, ${x + 4} 60, ${x} ${74 - (i % 2) * 2} Z`}
              fill={p.leaf}
              fillOpacity={tone === 'color' ? 0.9 : 0}
              stroke={p.leafLine}
              strokeWidth="0.7"
            />
          ))}
          {/* Manor */}
          <path d="M140 72 L140 56 L158 46 L176 56 L176 72 Z" fill={p.butter} fillOpacity={tone === 'color' ? 0.8 : 0} stroke={p.stem} strokeWidth="0.7" />
          <path d="M148 72 L148 62 L154 62 L154 72 M163 60 L169 60 L169 66 L163 66 Z" stroke={p.stem} strokeWidth="0.6" />
          {/* Sun */}
          <circle cx="282" cy="26" r="9" fill={p.peach} fillOpacity={tone === 'color' ? 0.8 : 0} stroke={p.gold} strokeWidth="0.6" strokeDasharray="1.5 2.5" />
          {/* Foreground blooms */}
          <Blossom x={24} y={92} r={5} fill={p.blush} p={p} />
          <Blossom x={40} y={96} r={4} fill={p.wisteria} p={p} rotate={20} />
          <Blossom x={296} y={88} r={4.5} fill={p.pink} p={p} rotate={-10} />
          <path d="M30 100 C 30 95, 32 90, 36 86 M304 94 C 304 90, 305 86, 307 82" stroke={p.leafLine} strokeWidth="0.6" />
        </svg>
      )

    // Wreath of sage leaves punctuated by pastel blooms.
    case 'wreath': {
      const n = 22
      const blooms = [p.pink, p.wisteria, p.peach, p.blush, p.butter, p.rose]
      return (
        <svg viewBox="0 0 200 200" width={size} height={size} {...common}>
          <circle cx="100" cy="100" r="78" stroke={p.stem} strokeWidth="0.6" />
          {Array.from({ length: n }).map((_, i) => {
            const a = (i / n) * Math.PI * 2
            const x = 100 + Math.cos(a) * 78
            const y = 100 + Math.sin(a) * 78
            const deg = (a * 180) / Math.PI + (i % 2 ? 60 : -60) + 90
            return <Leaf key={i} x={x} y={y} len={15} angle={deg} p={p} />
          })}
          {[15, 75, 135, 195, 255, 315].map((d, i) => {
            const a = (d * Math.PI) / 180
            return (
              <Blossom
                key={d}
                x={100 + Math.cos(a) * 78}
                y={100 + Math.sin(a) * 78}
                r={i % 2 === 0 ? 8 : 6}
                fill={blooms[i % blooms.length]}
                p={p}
                rotate={d}
              />
            )
          })}
        </svg>
      )
    }
  }
}
