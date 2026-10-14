import { useId } from 'react'

interface WaxSealProps {
  initials: [string, string]
  size?: number
  className?: string
  tone?: 'burgundy' | 'gold'
}

const palettes = {
  burgundy: {
    light: '#9A4452',
    middle: '#743345',
    deep: '#52202D',
    shadow: '#451824',
    emboss: '#D8C28E',
    textShadow: '#421621',
    text: '#E4CE9A',
  },
  gold: {
    light: '#E2C97D',
    middle: '#B89542',
    deep: '#7D6126',
    shadow: '#654B18',
    emboss: '#F0DA96',
    textShadow: '#674C18',
    text: '#F7E6AB',
  },
} as const

/** Irregular, softly highlighted wax with an embossed botanical monogram. */
export default function WaxSeal({ initials, size = 92, className = '', tone = 'burgundy' }: WaxSealProps) {
  const [first, second] = initials
  const palette = palettes[tone]
  const uid = useId().replace(/:/g, '')
  const waxId = `wax-${uid}`
  const highlightId = `wax-highlight-${uid}`

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 2px 2px rgba(61,53,55,0.28))' }}
    >
      <defs>
        <radialGradient id={waxId} cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor={palette.light} />
          <stop offset="55%" stopColor={palette.middle} />
          <stop offset="100%" stopColor={palette.deep} />
        </radialGradient>
        <radialGradient id={highlightId} cx="28%" cy="24%" r="42%">
          <stop offset="0%" stopColor="#FEFAF3" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#FEFAF3" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M50 4 C62 3 74 8 82 17 C92 27 97 40 95 53 C93 67 86 80 74 88 C63 96 47 98 35 93 C22 88 10 77 6 63 C2 49 5 34 14 22 C22 11 37 5 50 4Z"
        fill={`url(#${waxId})`}
      />
      <path
        d="M50 4 C62 3 74 8 82 17 C92 27 97 40 95 53 C93 67 86 80 74 88 C63 96 47 98 35 93 C22 88 10 77 6 63 C2 49 5 34 14 22 C22 11 37 5 50 4Z"
        fill={`url(#${highlightId})`}
      />

      <circle cx="50" cy="50" r="33" fill="none" stroke={palette.shadow} strokeWidth="1.2" opacity="0.78" />
      <circle cx="50" cy="49.2" r="33" fill="none" stroke={palette.emboss} strokeWidth="0.55" opacity="0.62" />

      {[0, 60, 120, 180, 240, 300].map((degrees) => (
        <path
          key={degrees}
          d="M0 0 C2 -1.6 4.6 -1.6 6.5 0 C4.6 1.6 2 1.6 0 0Z"
          transform={`rotate(${degrees} 50 50) translate(50 17) rotate(-30)`}
          fill="none"
          stroke={palette.emboss}
          strokeWidth="0.55"
          opacity="0.72"
        />
      ))}

      <text
        x="50"
        y="51.2"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily='"Bodoni Moda", "Cormorant Garamond", Georgia, serif'
        fontSize="30"
        fill={palette.textShadow}
        letterSpacing="1"
      >
        {first}
        {second}
      </text>
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily='"Bodoni Moda", "Cormorant Garamond", Georgia, serif'
        fontSize="30"
        fill={palette.text}
        letterSpacing="1"
        opacity="0.92"
      >
        {first}
        {second}
      </text>
    </svg>
  )
}
