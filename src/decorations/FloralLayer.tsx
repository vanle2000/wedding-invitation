import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'

/**
 * The Floral Layer — custom SVG wisteria, English roses and botanical vines
 * in soft pastel pinks and lavenders, placed along section borders.
 */
export const floral = {
  lavender: '#C9B8E0',
  lavenderDeep: '#A98BC9',
  royal: '#6B4FA0',
  pink: '#F3CAD3',
  quartz: '#E6B3BD',
  roseDeep: '#D497A6',
  leaf: '#CFDBD6',
  leafLine: '#8AA09A',
  vine: '#7F8FA3',
  gold: '#D4AF37',
} as const

const seeded = (seed: number) => {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/* ---------- Wisteria: a cascading raceme of small lavender blossoms ---------- */

interface WisteriaProps {
  /** Width in px; height ≈ 2.6× width. */
  width?: number
  className?: string
  style?: CSSProperties
  flip?: boolean
  /** Different seeds give different blossom arrangements. */
  seed?: number
  sway?: boolean
}

export function Wisteria({ width = 90, className = '', style, flip = false, seed = 1, sway = true }: WisteriaProps) {
  const reduceMotion = useReducedMotion()
  const rnd = seeded(seed)
  const blossoms: { x: number; y: number; r: number; c: string }[] = []
  // A raceme tapers downward: wide at top, narrow at tip.
  for (let i = 0; i < 46; i++) {
    const t = i / 46
    const spread = 22 * (1 - t * 0.85)
    blossoms.push({
      x: 50 + (rnd() - 0.5) * 2 * spread,
      y: 36 + t * 210,
      r: 6.2 - t * 2.4,
      c: [floral.lavender, floral.lavenderDeep, floral.pink, floral.lavender][Math.floor(rnd() * 4)],
    })
  }
  return (
    <motion.svg
      viewBox="0 0 100 260"
      width={width}
      height={width * 2.6}
      className={`pointer-events-none absolute ${className}`}
      style={{ transformOrigin: 'top center', ...style, scaleX: flip ? -1 : 1 }}
      aria-hidden="true"
      animate={sway && !reduceMotion ? { rotate: [-1.5, 1.5, -1.5] } : undefined}
      transition={{ duration: 6 + seed * 0.7, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Vine and leaves at the top */}
      <path d="M50 0 C 48 10, 52 22, 50 38" stroke={floral.vine} strokeWidth="1" fill="none" />
      {[
        [38, 14, -150],
        [62, 20, -30],
        [36, 30, -160],
        [64, 34, -20],
      ].map(([x, y, a], i) => (
        <path
          key={i}
          d="M0 0 C 5 -4, 12 -4, 17 0 C 12 4, 5 4, 0 0 Z"
          transform={`translate(${x} ${y}) rotate(${a})`}
          fill={floral.leaf}
          stroke={floral.leafLine}
          strokeWidth="0.6"
        />
      ))}
      {/* Blossoms: each a small pea-flower — two overlapping petals */}
      {blossoms.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y})`}>
          <ellipse cx="0" cy="0" rx={b.r} ry={b.r * 0.78} fill={b.c} opacity="0.95" />
          <ellipse cx={b.r * 0.1} cy={-b.r * 0.35} rx={b.r * 0.6} ry={b.r * 0.5} fill="#F5EEF9" opacity="0.7" />
          <circle cx="0" cy={b.r * 0.15} r={b.r * 0.18} fill={floral.royal} opacity="0.7" />
        </g>
      ))}
    </motion.svg>
  )
}

/* ---------- English rose: a many-petalled cupped bloom ---------- */

interface EnglishRoseProps {
  size?: number
  className?: string
  style?: CSSProperties
  tone?: 'pink' | 'quartz' | 'lavender'
  rotate?: number
}

export function EnglishRose({ size = 80, className = '', style, tone = 'pink', rotate = 0 }: EnglishRoseProps) {
  const outer = tone === 'lavender' ? floral.lavender : tone === 'quartz' ? floral.quartz : floral.pink
  const inner = tone === 'lavender' ? floral.lavenderDeep : floral.roseDeep
  const rings = [
    { n: 9, r: 30, pr: 15, c: outer, o: 0.95 },
    { n: 8, r: 21, pr: 12, c: outer, o: 1 },
    { n: 7, r: 13, pr: 9.5, c: inner, o: 0.85 },
    { n: 6, r: 7, pr: 7, c: inner, o: 1 },
  ]
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`pointer-events-none ${className}`}
      style={{ ...style, transform: `rotate(${rotate}deg) ${style?.transform ?? ''}` }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`er-${tone}`} cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Leaves behind */}
      {[20, 160, 290].map((a) => (
        <path
          key={a}
          d="M0 0 C 8 -9, 22 -9, 32 0 C 22 9, 8 9, 0 0 Z"
          transform={`rotate(${a} 50 50) translate(68 50)`}
          fill={floral.leaf}
          stroke={floral.leafLine}
          strokeWidth="0.6"
        />
      ))}
      {rings.map((ring, ri) =>
        Array.from({ length: ring.n }).map((_, i) => {
          const a = (i / ring.n) * 360 + ri * 17
          return (
            <path
              key={`${ri}-${i}`}
              d={`M0 0 C ${-ring.pr * 0.9} ${-ring.pr * 0.6}, ${-ring.pr * 0.9} ${-ring.pr * 1.8}, 0 ${-ring.pr * 2} C ${ring.pr * 0.9} ${-ring.pr * 1.8}, ${ring.pr * 0.9} ${-ring.pr * 0.6}, 0 0 Z`}
              transform={`translate(50 50) rotate(${a}) translate(0 ${-ring.r + ring.pr * 2 - 2})`}
              fill={ring.c}
              fillOpacity={ring.o}
              stroke={inner}
              strokeOpacity="0.35"
              strokeWidth="0.5"
            />
          )
        }),
      )}
      <circle cx="50" cy="50" r="36" fill={`url(#er-${tone})`} />
      <circle cx="50" cy="50" r="2.4" fill={floral.gold} opacity="0.9" />
    </svg>
  )
}

/* ---------- Vine: a botanical border that runs along an edge ---------- */

interface VineProps {
  /** Length in px along the edge. */
  length?: number
  className?: string
  style?: CSSProperties
  /** 'horizontal' runs left→right; 'vertical' runs top→bottom. */
  orientation?: 'horizontal' | 'vertical'
  seed?: number
}

export function Vine({ length = 320, className = '', style, orientation = 'horizontal', seed = 3 }: VineProps) {
  const rnd = seeded(seed)
  const nodes = Array.from({ length: 9 }).map((_, i) => ({
    x: 20 + i * 40 + (rnd() - 0.5) * 10,
    y: 20 + Math.sin(i * 1.3) * 6,
    kind: i % 3 === 0 ? 'rose' : i % 3 === 1 ? 'bud' : 'leaf',
    up: i % 2 === 0,
  }))
  return (
    <svg
      viewBox="0 0 360 40"
      width={orientation === 'horizontal' ? length : length * (40 / 360)}
      height={orientation === 'horizontal' ? length * (40 / 360) : length}
      className={`pointer-events-none ${className}`}
      style={{ ...style, transform: orientation === 'vertical' ? `rotate(90deg) ${style?.transform ?? ''}` : style?.transform }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 20 C 40 10, 80 30, 120 20 C 160 10, 200 30, 240 20 C 280 10, 320 30, 360 20" stroke={floral.vine} strokeWidth="0.9" fill="none" />
      {nodes.map((n, i) => {
        const dir = n.up ? -1 : 1
        if (n.kind === 'leaf')
          return (
            <path
              key={i}
              d="M0 0 C 4 -5, 11 -5, 15 0 C 11 5, 4 5, 0 0 Z"
              transform={`translate(${n.x} ${n.y}) rotate(${dir * -55})`}
              fill={floral.leaf}
              stroke={floral.leafLine}
              strokeWidth="0.6"
            />
          )
        if (n.kind === 'bud')
          return (
            <g key={i} transform={`translate(${n.x} ${n.y + dir * 7})`}>
              <ellipse rx="3.2" ry="4.4" fill={floral.lavender} stroke={floral.royal} strokeOpacity="0.4" strokeWidth="0.5" />
              <ellipse cx="1" cy="-1" rx="1.6" ry="2.2" fill="#F5EEF9" opacity="0.7" />
            </g>
          )
        return (
          <g key={i} transform={`translate(${n.x} ${n.y + dir * 8})`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy="-4.2" rx="3" ry="4.4" transform={`rotate(${a})`} fill={i % 2 ? floral.pink : floral.quartz} stroke={floral.roseDeep} strokeOpacity="0.4" strokeWidth="0.5" />
            ))}
            <circle r="1.6" fill={floral.gold} />
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- Border composition helpers ---------- */

interface FloralBorderProps {
  /** Which edges get wisteria cascades. */
  wisteria?: ('tl' | 'tr')[]
  /** Show a vine along the top edge. */
  vineTop?: boolean
  /** Show a vine along the bottom edge. */
  vineBottom?: boolean
  /** Small roses tucked into corners. */
  roses?: ('bl' | 'br')[]
  seed?: number
}

/** Drop inside any `relative overflow-hidden` section to dress its borders. */
export function FloralBorder({ wisteria = ['tl'], vineTop = false, vineBottom = false, roses = [], seed = 1 }: FloralBorderProps) {
  return (
    <>
      {wisteria.includes('tl') && <Wisteria className="-top-2 -left-5" width={86} seed={seed} />}
      {wisteria.includes('tr') && <Wisteria className="-top-2 -right-5" width={78} seed={seed + 2} flip />}
      {vineTop && <Vine className="absolute top-3 left-1/2 -translate-x-1/2 opacity-90" length={300} seed={seed} />}
      {vineBottom && <Vine className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-90 -scale-y-100" length={300} seed={seed + 1} />}
      {roses.includes('bl') && <EnglishRose className="absolute -bottom-4 -left-4" size={84} tone="pink" rotate={-12} />}
      {roses.includes('br') && <EnglishRose className="absolute -bottom-5 -right-5" size={92} tone="lavender" rotate={18} />}
    </>
  )
}
