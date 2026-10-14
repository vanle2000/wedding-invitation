import { useId } from 'react'

interface RoyalMedallionProps {
  initials: [string, string]
  names: [string, string]
  size?: number
  className?: string
}

/** Gold folio clasp with a French floral monogram. */
export default function RoyalMedallion({ initials, names, size = 92, className = '' }: RoyalMedallionProps) {
  const uid = useId().replace(/:/g, '')
  const arcId = `folio-name-arc-${uid}`
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} role="img" aria-label={`${names[0]} and ${names[1]} monogram`}>
      <defs>
        <radialGradient id={`foil-${uid}`} cx="35%" cy="28%" r="78%">
          <stop offset="0" stopColor="#E1CB8C" />
          <stop offset="0.48" stopColor="#BE9B50" />
          <stop offset="1" stopColor="#80652C" />
        </radialGradient>
        <path id={arcId} d="M22 65 A40 40 0 0 1 98 65" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="#4A101B" stroke="url(#foil-${uid})" strokeWidth="3" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="#BE9B50" strokeWidth="0.8" />
      <circle cx="60" cy="60" r="43" fill="none" stroke="#BE9B50" strokeWidth="0.5" strokeDasharray="1 3" />
      <text fill="#D8C68F" fontFamily='"Jost", sans-serif' fontSize="6.5" letterSpacing="1.2">
        <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
          {names.join('  •  ').toLocaleUpperCase('vi-VN')}
        </textPath>
      </text>
      <text x="60" y="65" textAnchor="middle" dominantBaseline="central" fill="#D8C68F" fontFamily='"Parisienne", cursive' fontSize="35">
        {initials[0]}<tspan fontFamily='"Cormorant Garamond", serif' fontSize="20">&amp;</tspan>{initials[1]}
      </text>
      <path d="M39 84 C47 77 53 77 60 84 C67 77 73 77 81 84" fill="none" stroke="#BE9B50" strokeWidth="0.8" />
    </svg>
  )
}
