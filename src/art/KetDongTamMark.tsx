import { useId } from 'react'

interface KetDongTamMarkProps {
  initials: [string, string]
  names: [string, string]
  size?: number
  className?: string
  variant?: 'medallion' | 'line'
}

/**
 * Original Kết Đồng Tâm identity: two continuous mirrored love-knot loops
 * woven at one centre, paired tassels, and the couple's Vietnamese given names.
 * This is a contemporary interpretation, not a claimed historical replica.
 */
export default function KetDongTamMark({
  initials,
  names,
  size = 112,
  className = '',
  variant = 'medallion',
}: KetDongTamMarkProps) {
  const uid = useId().replace(/:/g, '')
  const nameArcId = `ket-dong-tam-name-${uid}`
  const labelArcId = `ket-dong-tam-label-${uid}`
  const medallion = variant === 'medallion'
  const primary = medallion ? '#DEC994' : '#852E43'
  const secondary = '#C2A15A'
  const shadow = medallion ? '#5A1C2C' : '#E4C9CE'
  const background = medallion ? '#692235' : 'transparent'

  const shortNames = names.map((name) => {
    const parts = name.trim().split(/\s+/)
    return parts[parts.length - 1]
  })
  const nameLabel = shortNames.join('  •  ').toLocaleUpperCase('vi-VN')

  return (
    <svg
      viewBox="0 0 140 140"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Biểu tượng Kết Đồng Tâm của ${names[0]} và ${names[1]}`}
    >
      <defs>
        <path id={nameArcId} d="M22 68 A48 48 0 0 1 118 68" />
        <path id={labelArcId} d="M27 91 A48 48 0 0 0 113 91" />
        <radialGradient id={`ket-dong-tam-bg-${uid}`} cx="34%" cy="28%" r="78%">
          <stop offset="0" stopColor={medallion ? '#91354A' : '#FAF6EC'} />
          <stop offset="0.65" stopColor={background} />
          <stop offset="1" stopColor={medallion ? '#581A29' : '#FAF6EC'} />
        </radialGradient>
      </defs>

      <circle cx="70" cy="70" r="65" fill={`url(#ket-dong-tam-bg-${uid})`} stroke={secondary} strokeWidth={medallion ? 2.2 : 1.2} />
      <circle cx="70" cy="70" r="58" fill="none" stroke={primary} strokeWidth="0.7" opacity="0.8" />
      <circle cx="70" cy="70" r="53" fill="none" stroke={secondary} strokeWidth="0.55" strokeDasharray="1 3" opacity="0.75" />

      {/* Given names and the identity phrase follow the circle. */}
      <text fill={primary} fontFamily='"Be Vietnam Pro", sans-serif' fontSize="6.4" fontWeight="500" letterSpacing="1">
        <textPath href={`#${nameArcId}`} startOffset="50%" textAnchor="middle">
          {nameLabel}
        </textPath>
      </text>
      <text fill={primary} fontFamily='"Noto Serif Display", serif' fontSize="6.2" fontWeight="500" letterSpacing="1.05">
        <textPath href={`#${labelArcId}`} startOffset="50%" textAnchor="middle">
          KẾT ĐỒNG TÂM
        </textPath>
      </text>

      {/* Shadow pass gives the linework a pressed/engraved edge. */}
      <g transform="translate(0 1)" fill="none" stroke={shadow} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" opacity={medallion ? 0.72 : 0.38}>
        <path d="M70 64 C54 43 31 43 23 58 C15 73 27 88 43 88 C55 88 63 78 70 67 C77 78 85 88 97 88 C113 88 125 73 117 58 C109 43 86 43 70 64Z" />
        <path d="M63 75 C59 88 54 99 48 108 M77 75 C81 88 86 99 92 108" />
      </g>

      {/* Gold/rouge face: a single continuous double-heart knot. */}
      <g fill="none" stroke={primary} strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round">
        <path d="M70 64 C54 43 31 43 23 58 C15 73 27 88 43 88 C55 88 63 78 70 67 C77 78 85 88 97 88 C113 88 125 73 117 58 C109 43 86 43 70 64Z" />
        <path d="M63 75 C59 88 54 99 48 108 C45 114 47 120 51 124" />
        <path d="M77 75 C81 88 86 99 92 108 C95 114 93 120 89 124" />
        <path d="M44 123 C48 119 53 119 56 124 C52 129 47 129 44 123Z" />
        <path d="M96 123 C92 119 87 119 84 124 C88 129 93 129 96 123Z" />
      </g>

      {/* Over-under crossing and central diamond knot. */}
      <path d="M61 61 C65 63 68 66 70 69 C72 66 75 63 79 61" fill="none" stroke={background === 'transparent' ? '#FAF6EC' : background} strokeWidth="5" strokeLinecap="round" />
      <path d="M61 61 C65 63 68 66 70 69 C72 66 75 63 79 61" fill="none" stroke={primary} strokeWidth="2.15" strokeLinecap="round" />
      <path d="M70 60 L79 69 L70 78 L61 69Z" fill={background === 'transparent' ? '#FAF6EC' : background} stroke={secondary} strokeWidth="1.2" />
      <circle cx="70" cy="69" r="4.1" fill={primary} />
      <text x="70" y="70.2" textAnchor="middle" dominantBaseline="central" fill={medallion ? '#692235' : '#FAF6EC'} fontFamily='"Be Vietnam Pro", sans-serif' fontSize="4.5" fontWeight="500">
        {initials[0]}•{initials[1]}
      </text>

      {/* Three small petals crown the knot. */}
      <g fill={medallion ? '#BC7180' : '#AB3E53'} stroke={secondary} strokeWidth="0.6">
        <ellipse cx="70" cy="28" rx="5" ry="9" />
        <ellipse cx="62" cy="32" rx="4" ry="8" transform="rotate(-35 62 32)" />
        <ellipse cx="78" cy="32" rx="4" ry="8" transform="rotate(35 78 32)" />
      </g>
    </svg>
  )
}
