const grain = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`,
)}")`

interface PaperGrainProps {
  opacity?: number
  className?: string
}

export default function PaperGrain({ opacity = 0.045, className = '' }: PaperGrainProps) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 mix-blend-multiply ${className}`}
      style={{ backgroundImage: grain, backgroundSize: '220px 220px', opacity }}
    />
  )
}
