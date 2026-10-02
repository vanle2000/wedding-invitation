interface OrnamentalDividerProps {
  /** 'hairline' = thin rule with centre diamond; 'leaf' = rule with small olive sprig; 'dots' = three small dots. */
  variant?: 'hairline' | 'leaf' | 'dots'
  className?: string
  /** Tailwind text colour class drives the stroke via currentColor. */
  width?: number
}

export default function OrnamentalDivider({
  variant = 'hairline',
  className = '',
  width = 160,
}: OrnamentalDividerProps) {
  if (variant === 'dots') {
    return (
      <div aria-hidden="true" className={`flex items-center justify-center gap-3 ${className}`}>
        <span className="block w-1 h-1 rounded-full bg-current opacity-60" />
        <span className="block w-1.5 h-1.5 rounded-full bg-current" />
        <span className="block w-1 h-1 rounded-full bg-current opacity-60" />
      </div>
    )
  }

  if (variant === 'leaf') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 200 24"
        width={width}
        height={width * 0.12}
        className={`mx-auto block ${className}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
      >
        <path d="M0 12 H 76" />
        <path d="M124 12 H 200" />
        <path d="M84 12 C 92 6, 108 6, 116 12 C 108 18, 92 18, 84 12 Z" />
        <path d="M100 7 L100 17" />
        <circle cx="80" cy="12" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="120" cy="12" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 12"
      width={width}
      height={width * 0.06}
      className={`mx-auto block ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
    >
      <path d="M0 6 H 88" />
      <path d="M112 6 H 200" />
      <path d="M100 1.5 L104.5 6 L100 10.5 L95.5 6 Z" />
    </svg>
  )
}
