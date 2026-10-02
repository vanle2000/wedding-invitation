/**
 * Fixed, very-low-opacity film grain over the whole experience.
 * Generated procedurally with an SVG turbulence filter — no image asset needed.
 */
const grain = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/>
      <feColorMatrix type='saturate' values='0'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>`,
)}")`

interface PaperTextureProps {
  /** 0–1. Keep ≤ 0.08 so it reads as paper, not noise. */
  opacity?: number
  className?: string
}

export default function PaperTexture({ opacity = 0.055, className = '' }: PaperTextureProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 mix-blend-multiply ${className}`}
      style={{ backgroundImage: grain, backgroundSize: '240px 240px', opacity }}
    />
  )
}
