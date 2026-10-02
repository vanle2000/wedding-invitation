import type { ReactNode } from 'react'

interface RegencyFrameProps {
  children: ReactNode
  className?: string
  /** Gold tone for the filigree. */
  color?: string
  /** Paper colour behind the frame, used to mask the border under the corner flourishes. */
  bg?: string
}

/**
 * Gilded Regency frame: a double hairline border with scrolled corner
 * flourishes and a small cartouche at the top centre. Scales with its content.
 */
export default function RegencyFrame({ children, className = '', color = '#C9A961', bg = '#FAF6EE' }: RegencyFrameProps) {
  const corner = (
    <g fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 40 C 2 14, 14 2, 40 2" />
      <path d="M8 40 C 8 20, 20 8, 40 8" opacity="0.7" />
      <path d="M12 30 C 14 20, 20 14, 30 12 C 24 16, 20 20, 18 26 C 22 24, 26 24, 28 26" />
      <path d="M12 30 C 10 24, 12 18, 16 16" opacity="0.8" />
      <circle cx="31" cy="27" r="1.6" fill={color} stroke="none" />
      <circle cx="19" cy="12" r="1.2" fill={color} stroke="none" />
      <path d="M22 36 C 26 30, 32 28, 38 30" opacity="0.8" />
    </g>
  )

  return (
    <div className={`relative ${className}`}>
      {/* Border lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 border" style={{ borderColor: color }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-[6px] border opacity-70" style={{ borderColor: color }} />

      {/* Corners */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
        <svg
          key={pos}
          aria-hidden="true"
          viewBox="0 0 42 42"
          className={`pointer-events-none absolute w-10 h-10 ${
            pos === 'tl'
              ? '-top-1 -left-1'
              : pos === 'tr'
                ? '-top-1 -right-1 -scale-x-100'
                : pos === 'bl'
                  ? '-bottom-1 -left-1 -scale-y-100'
                  : '-bottom-1 -right-1 -scale-x-100 -scale-y-100'
          }`}
        >
          <rect x="0" y="0" width="42" height="42" fill={bg} />
          {corner}
        </svg>
      ))}

      {/* Top cartouche */}
      <svg
        aria-hidden="true"
        viewBox="0 0 80 18"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[9px] w-20 h-[18px]"
      >
        <rect x="14" y="2" width="52" height="14" fill={bg} />
        <g fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
          <path d="M16 9 C 24 2, 32 2, 40 9 C 48 16, 56 16, 64 9" />
          <path d="M16 9 C 24 16, 32 16, 40 9 C 48 2, 56 2, 64 9" opacity="0.7" />
          <circle cx="40" cy="9" r="2" fill={color} stroke="none" />
        </g>
      </svg>

      <div className="relative">{children}</div>
    </div>
  )
}
