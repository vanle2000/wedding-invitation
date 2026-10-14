import { useId } from 'react'

interface WaxSealProps {
  initials: [string, string]
  names: [string, string]
  size?: number
  className?: string
  tone?: 'burgundy' | 'gold'
  dateLabel?: string
}

const palettes = {
  burgundy: {
    light: '#A14B5D',
    middle: '#743345',
    deep: '#4F1D2A',
    shadow: '#3D1420',
    emboss: '#D7BC7B',
    face: '#ECD69C',
  },
  gold: {
    light: '#E8D38D',
    middle: '#B88F38',
    deep: '#76571B',
    shadow: '#574012',
    emboss: '#F1DEA2',
    face: '#F8E9B9',
  },
} as const

/** A small embossed laurel branch used on each side of the royal crest. */
function Laurel({ flip = false, stroke }: { flip?: boolean; stroke: string }) {
  return (
    <g transform={flip ? 'translate(120 0) scale(-1 1)' : undefined} fill="none" stroke={stroke} strokeLinecap="round">
      <path d="M34 78 C29 68 29 58 33 48" strokeWidth="0.75" />
      {[
        [32, 72, -26],
        [30.5, 66, 24],
        [30.5, 59.5, -28],
        [31.5, 53.5, 24],
      ].map(([x, y, rotation], index) => (
        <path
          key={index}
          d="M0 0 C3.2 -2.4 7.2 -2.4 10 0 C7.2 2.4 3.2 2.4 0 0Z"
          transform={`translate(${x} ${y}) rotate(${rotation})`}
          strokeWidth="0.6"
        />
      ))}
    </g>
  )
}

/**
 * Royal heraldic wax seal: full names around the rim, Roman-inspired wedding
 * date below, a crown, laurel branches, and an intertwined P&T monogram.
 */
export default function WaxSeal({
  initials,
  names,
  size = 92,
  className = '',
  tone = 'burgundy',
  dateLabel = '14 · 02 · 2027',
}: WaxSealProps) {
  const [firstInitial, secondInitial] = initials
  const [firstName, secondName] = names
  const palette = palettes[tone]
  const uid = useId().replace(/:/g, '')
  const waxId = `royal-wax-${uid}`
  const highlightId = `royal-highlight-${uid}`
  const upperArcId = `royal-name-arc-${uid}`
  const lowerArcId = `royal-date-arc-${uid}`
  const nameLabel = `${firstName.toLocaleUpperCase('vi-VN')}  •  ${secondName.toLocaleUpperCase('vi-VN')}`

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Royal wax seal of ${firstName} and ${secondName}`}
      style={{ filter: 'drop-shadow(0 3px 3px rgba(61,53,55,0.32))' }}
    >
      <defs>
        <radialGradient id={waxId} cx="34%" cy="28%" r="80%">
          <stop offset="0%" stopColor={palette.light} />
          <stop offset="52%" stopColor={palette.middle} />
          <stop offset="100%" stopColor={palette.deep} />
        </radialGradient>
        <radialGradient id={highlightId} cx="28%" cy="22%" r="46%">
          <stop offset="0%" stopColor="#FEFAF3" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FEFAF3" stopOpacity="0" />
        </radialGradient>
        <path id={upperArcId} d="M21 59 A39 39 0 0 1 99 59" />
        <path id={lowerArcId} d="M24 77 A42 42 0 0 0 96 77" />
      </defs>

      {/* Hand-poured irregular edge. */}
      <path
        d="M60 3 C74 2 88 7 99 17 C110 28 117 42 116 57 C118 72 110 89 98 99 C87 111 71 117 57 116 C41 118 26 111 16 100 C5 90 1 74 4 59 C1 44 7 29 18 18 C28 8 45 3 60 3Z"
        fill={`url(#${waxId})`}
      />
      <path
        d="M60 3 C74 2 88 7 99 17 C110 28 117 42 116 57 C118 72 110 89 98 99 C87 111 71 117 57 116 C41 118 26 111 16 100 C5 90 1 74 4 59 C1 44 7 29 18 18 C28 8 45 3 60 3Z"
        fill={`url(#${highlightId})`}
      />

      {/* Rope edge and double heraldic rim. */}
      <circle cx="60" cy="60" r="50" fill="none" stroke={palette.shadow} strokeWidth="1.4" strokeDasharray="1.2 2.2" opacity="0.82" />
      <circle cx="60" cy="59.2" r="47" fill="none" stroke={palette.emboss} strokeWidth="0.65" opacity="0.72" />
      <circle cx="60" cy="60" r="37" fill="none" stroke={palette.shadow} strokeWidth="1.1" opacity="0.75" />
      <circle cx="60" cy="59.2" r="37" fill="none" stroke={palette.emboss} strokeWidth="0.55" opacity="0.75" />

      {/* Names and wedding date embossed into the circular rim. */}
      <text fill={palette.shadow} fontFamily='"Bodoni Moda", Georgia, serif' fontSize="6.4" fontWeight="500" letterSpacing="1.15">
        <textPath href={`#${upperArcId}`} startOffset="50%" textAnchor="middle">
          {nameLabel}
        </textPath>
      </text>
      <text fill={palette.face} fontFamily='"Bodoni Moda", Georgia, serif' fontSize="6.4" fontWeight="500" letterSpacing="1.15" transform="translate(0 -0.65)" opacity="0.92">
        <textPath href={`#${upperArcId}`} startOffset="50%" textAnchor="middle">
          {nameLabel}
        </textPath>
      </text>
      <text fill={palette.face} fontFamily='"Jost", sans-serif' fontSize="5.2" letterSpacing="1" opacity="0.9">
        <textPath href={`#${lowerArcId}`} startOffset="50%" textAnchor="middle">
          {dateLabel}
        </textPath>
      </text>

      {/* Laurel branches flank the central crest. */}
      <Laurel stroke={palette.shadow} />
      <Laurel flip stroke={palette.shadow} />
      <g transform="translate(0 -0.7)" opacity="0.82">
        <Laurel stroke={palette.emboss} />
        <Laurel flip stroke={palette.emboss} />
      </g>

      {/* Five-point royal crown. */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M47 45 L45 36 L52 40 L60 30 L68 40 L75 36 L73 45Z" stroke={palette.shadow} strokeWidth="1.4" />
        <path d="M47 44.2 L45.8 36.9 L52 41 L60 31.2 L68 41 L74.2 36.9 L73 44.2Z" stroke={palette.emboss} strokeWidth="0.7" />
        <path d="M48 48 H72" stroke={palette.shadow} strokeWidth="1.4" />
        <path d="M48 47.2 H72" stroke={palette.emboss} strokeWidth="0.65" />
        {[45, 52, 60, 68, 75].map((x) => (
          <circle key={x} cx={x} cy={x === 60 ? 29.5 : 35.5} r="1.25" fill={palette.face} stroke={palette.shadow} strokeWidth="0.55" />
        ))}
      </g>

      {/* Intertwined central monogram with pressed shadow/highlight relief. */}
      <text
        x="60"
        y="66.1"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily='"Bodoni Moda", "Cormorant Garamond", Georgia, serif'
        fontSize="25"
        fontStyle="italic"
        fill={palette.shadow}
        letterSpacing="-1"
      >
        {firstInitial}&amp;{secondInitial}
      </text>
      <text
        x="60"
        y="64.9"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily='"Bodoni Moda", "Cormorant Garamond", Georgia, serif'
        fontSize="25"
        fontStyle="italic"
        fill={palette.face}
        letterSpacing="-1"
        opacity="0.94"
      >
        {firstInitial}&amp;{secondInitial}
      </text>

      {/* Tiny fleur-de-lis punctuation at the base of the crest. */}
      <path d="M60 77 C57 74 55 76 57 79 C58 80 59 81 60 83 C61 81 62 80 63 79 C65 76 63 74 60 77Z" fill={palette.face} opacity="0.88" />
    </svg>
  )
}
