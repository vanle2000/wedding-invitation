import { useId } from 'react'

interface KetDongTamMarkProps {
  initials: [string, string]
  names: [string, string]
  size?: number
  className?: string
  variant?: 'medallion' | 'line'
}

const CORD = '#A43A4E'
const CORD_DARK = '#692235'
const GOLD = '#C2A15A'
const GOLD_LIGHT = '#DEC994'
const IVORY = '#FAF6EC'

interface CordPathProps {
  d: string
  width?: number
}

/** Three-pass cord: pressed edge, raised red face, and fine gold highlight. */
function CordPath({ d, width = 4.2 }: CordPathProps) {
  return (
    <>
      <path d={d} fill="none" stroke={CORD_DARK} strokeWidth={width + 1.5} strokeLinecap="round" strokeLinejoin="round" opacity="0.48" transform="translate(0 0.9)" />
      <path d={d} fill="none" stroke={CORD} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={GOLD_LIGHT} strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" opacity="0.62" transform="translate(-0.5 -0.5)" />
    </>
  )
}

/**
 * Contemporary Kết Đồng Tâm identity grounded in the Good Luck / one-mind
 * knot family: paired entering cords, angular woven centre, alternating looped
 * ears, a lower return loop, and twin tassels. It is original vector geometry,
 * not a trace or a claim of an exact historical tying diagram.
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
  const shortNames = names.map((name) => {
    const parts = name.trim().split(/\s+/)
    return parts[parts.length - 1]
  })
  const nameLabel = shortNames.join('  •  ').toLocaleUpperCase('vi-VN')

  return (
    <svg viewBox="0 0 140 140" width={size} height={size} className={className} role="img" aria-label={`Biểu tượng Kết Đồng Tâm của ${names[0]} và ${names[1]}`}>
      <defs>
        <path id={nameArcId} d="M22 66 A48 48 0 0 1 118 66" />
        <path id={labelArcId} d="M27 99 A48 48 0 0 0 113 99" />
        <radialGradient id={`ket-dong-tam-bg-${uid}`} cx="34%" cy="28%" r="78%">
          <stop offset="0" stopColor={medallion ? '#FFF9EE' : IVORY} />
          <stop offset="0.72" stopColor={medallion ? '#F4E8D7' : IVORY} />
          <stop offset="1" stopColor={medallion ? '#E7D3B9' : IVORY} />
        </radialGradient>
      </defs>

      <circle cx="70" cy="70" r="65" fill={medallion ? `url(#ket-dong-tam-bg-${uid})` : 'transparent'} stroke={GOLD} strokeWidth={medallion ? 2.4 : 1.2} />
      <circle cx="70" cy="70" r="59" fill="none" stroke={CORD_DARK} strokeWidth="0.65" opacity="0.55" />
      <circle cx="70" cy="70" r="54" fill="none" stroke={GOLD} strokeWidth="0.55" strokeDasharray="1 3" opacity="0.82" />

      {/* Clear short names above; identity title below. */}
      <text fill={CORD_DARK} fontFamily='"Be Vietnam Pro", sans-serif' fontSize="6.4" fontWeight="500" letterSpacing="1">
        <textPath href={`#${nameArcId}`} startOffset="50%" textAnchor="middle">{nameLabel}</textPath>
      </text>
      <text fill={CORD_DARK} fontFamily='"Noto Serif Display", serif' fontSize="6.2" fontWeight="500" letterSpacing="1">
        <textPath href={`#${labelArcId}`} startOffset="50%" textAnchor="middle">KẾT ĐỒNG TÂM</textPath>
      </text>

      {/* Two cords enter the compact knot from above. */}
      <CordPath d="M60 20 C60 29 58 34 57 42" width={3.5} />
      <CordPath d="M80 20 C80 29 82 34 83 42" width={3.5} />

      {/* Four long ears: top, left, right and lower return loop. */}
      <CordPath d="M59 46 C54 35 58 28 70 28 C82 28 86 35 81 46" />
      <CordPath d="M51 51 C40 44 27 47 27 58 C27 69 40 72 51 64" />
      <CordPath d="M89 51 C100 44 113 47 113 58 C113 69 100 72 89 64" />
      <CordPath d="M60 86 C56 98 60 106 70 106 C80 106 84 98 80 86" />

      {/* Four shorter diagonal ears balance the double crown structure. */}
      <CordPath d="M56 47 C48 43 47 35 53 32 C59 29 64 35 64 43" width={3.6} />
      <CordPath d="M84 47 C92 43 93 35 87 32 C81 29 76 35 76 43" width={3.6} />
      <CordPath d="M55 79 C47 83 47 91 53 94 C59 97 64 91 64 84" width={3.6} />
      <CordPath d="M85 79 C93 83 93 91 87 94 C81 97 76 91 76 84" width={3.6} />

      {/* Angular woven centre. The pale breaks make over-under crossings legible. */}
      <path d="M52 45 H68 V57 H82 V45 H90 V65 H78 V79 H90 V87 H70 V75 H56 V87 H48 V67 H60 V53 H48 V45Z" fill="none" stroke={CORD_DARK} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" transform="translate(0 1)" />
      <path d="M52 45 H68 V57 H82 V45 H90 V65 H78 V79 H90 V87 H70 V75 H56 V87 H48 V67 H60 V53 H48 V45Z" fill="none" stroke={CORD} strokeWidth="4.3" strokeLinecap="round" strokeLinejoin="round" />
      {[['M64 51 H72', 0], ['M84 59 V68', 0], ['M62 81 H72', 0], ['M54 60 V70', 0]].map(([d], index) => (
        <g key={index}>
          <path d={String(d)} stroke={IVORY} strokeWidth="6.2" strokeLinecap="round" />
          <path d={String(d)} stroke={CORD} strokeWidth="4.3" strokeLinecap="round" />
          <path d={String(d)} stroke={GOLD_LIGHT} strokeWidth="0.65" strokeLinecap="round" opacity="0.62" transform="translate(-0.4 -0.4)" />
        </g>
      ))}

      {/* Two cords leave below and finish in paired silk tassels. */}
      <CordPath d="M62 88 C61 100 57 108 55 116" width={3.5} />
      <CordPath d="M78 88 C79 100 83 108 85 116" width={3.5} />
      <g stroke={CORD} strokeWidth="1.5" strokeLinecap="round">
        {[0, 3, 6, 9].map((offset) => <path key={`left-${offset}`} d={`M${50 + offset} 113 C${49 + offset} 120 ${48 + offset} 126 ${47 + offset} 132`} />)}
        {[0, 3, 6, 9].map((offset) => <path key={`right-${offset}`} d={`M${80 + offset} 113 C${81 + offset} 120 ${82 + offset} 126 ${83 + offset} 132`} />)}
      </g>

      {/* P•T seal at the centre of the weave. */}
      <circle cx="70" cy="66" r="7" fill={IVORY} stroke={GOLD} strokeWidth="1.1" />
      <text x="70" y="67" textAnchor="middle" dominantBaseline="central" fill={CORD_DARK} fontFamily='"Be Vietnam Pro", sans-serif' fontSize="5.1" fontWeight="500">{initials[0]}•{initials[1]}</text>
    </svg>
  )
}
