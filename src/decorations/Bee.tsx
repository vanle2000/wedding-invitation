interface BeeProps {
  size?: number
  className?: string
  color?: string
}

/** The Regency bee — a small gilded line-drawn bee used as a signature mark. */
export default function Bee({ size = 28, className = '', color = '#C9A961' }: BeeProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke={color}
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Wings */}
      <ellipse cx="14" cy="13" rx="7" ry="4.2" transform="rotate(-28 14 13)" opacity="0.8" />
      <ellipse cx="26" cy="13" rx="7" ry="4.2" transform="rotate(28 26 13)" opacity="0.8" />
      <ellipse cx="15.5" cy="16" rx="4.5" ry="2.6" transform="rotate(-20 15.5 16)" opacity="0.6" />
      <ellipse cx="24.5" cy="16" rx="4.5" ry="2.6" transform="rotate(20 24.5 16)" opacity="0.6" />
      {/* Body */}
      <ellipse cx="20" cy="24" rx="6" ry="9" fill="#FBEFF0" />
      <path d="M14.6 21 H25.4 M14.2 24.5 H25.8 M15 28 H25" />
      <path d="M17 21 C 17 18, 23 18, 23 21" />
      {/* Head + antennae */}
      <circle cx="20" cy="13.5" r="2.6" fill="#FBEFF0" />
      <path d="M18.6 11.4 C 17 9, 15.5 8.5, 14.5 7.5 M21.4 11.4 C 23 9, 24.5 8.5, 25.5 7.5" />
      <circle cx="14.5" cy="7.5" r="0.7" fill={color} stroke="none" />
      <circle cx="25.5" cy="7.5" r="0.7" fill={color} stroke="none" />
      {/* Sting */}
      <path d="M20 33 L20 35.5" />
    </svg>
  )
}
