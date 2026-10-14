interface KetDongTamMarkProps {
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

/** Clean raised cord with a quiet pressed edge and a single gold glint. */
function CordPath({ d, width = 4 }: CordPathProps) {
  return (
    <>
      <path d={d} fill="none" stroke={CORD_DARK} strokeWidth={width + 1.2} strokeLinecap="round" strokeLinejoin="round" opacity="0.35" transform="translate(0 0.7)" />
      <path d={d} fill="none" stroke={CORD} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={GOLD_LIGHT} strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" transform="translate(-0.35 -0.35)" />
    </>
  )
}

/**
 * Text-free Kết Đồng Tâm mark. Smooth, symmetrical cord geometry distills the
 * Good Luck / one-mind knot family into four long ears, four short ears, a
 * soft woven centre, lower return loop, and paired tassels.
 */
export default function KetDongTamMark({ size = 112, className = '', variant = 'medallion' }: KetDongTamMarkProps) {
  const medallion = variant === 'medallion'

  return (
    <svg viewBox="0 0 120 140" width={size} height={size * (140 / 120)} className={className} role="img" aria-label="Biểu tượng Kết Đồng Tâm">
      {medallion && (
        <>
          <circle cx="60" cy="70" r="57" fill={IVORY} stroke={GOLD} strokeWidth="2.2" />
          <circle cx="60" cy="70" r="52" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.7" />
          <circle cx="60" cy="70" r="48" fill="none" stroke={CORD_DARK} strokeWidth="0.45" strokeDasharray="1 3" opacity="0.45" />
        </>
      )}

      {/* Paired cords enter from above. */}
      <CordPath d="M52 14 C52 26 50 34 47 42" width={3.4} />
      <CordPath d="M68 14 C68 26 70 34 73 42" width={3.4} />

      {/* Four long ears establish the clear cardinal silhouette. */}
      <CordPath d="M48 43 C42 31 47 23 60 23 C73 23 78 31 72 43" />
      <CordPath d="M48 48 C35 39 21 44 21 57 C21 70 35 75 48 65" />
      <CordPath d="M72 48 C85 39 99 44 99 57 C99 70 85 75 72 65" />
      <CordPath d="M50 78 C43 90 48 100 60 101 C72 100 77 90 70 78" />

      {/* Four small diagonal ears retain the layered Good Luck knot rhythm. */}
      <CordPath d="M50 46 C43 41 39 44 40 50 C41 56 47 57 52 52" width={3.2} />
      <CordPath d="M70 46 C77 41 81 44 80 50 C79 56 73 57 68 52" width={3.2} />
      <CordPath d="M50 72 C43 76 42 82 47 86 C52 90 57 84 56 78" width={3.2} />
      <CordPath d="M70 72 C77 76 78 82 73 86 C68 90 63 84 64 78" width={3.2} />

      {/* Two smooth S-curves create the woven centre. */}
      <path d="M47 43 C60 43 48 58 60 61 C72 64 60 79 73 79" fill="none" stroke={CORD_DARK} strokeWidth="5.2" strokeLinecap="round" opacity="0.35" transform="translate(0 0.7)" />
      <path d="M47 43 C60 43 48 58 60 61 C72 64 60 79 73 79" fill="none" stroke={CORD} strokeWidth="4" strokeLinecap="round" />
      <path d="M73 43 C60 43 72 58 60 61 C48 64 60 79 47 79" fill="none" stroke={CORD_DARK} strokeWidth="5.2" strokeLinecap="round" opacity="0.35" transform="translate(0 0.7)" />
      <path d="M73 43 C60 43 72 58 60 61 C48 64 60 79 47 79" fill="none" stroke={CORD} strokeWidth="4" strokeLinecap="round" />
      {/* A single pale interruption makes the over-under crossing obvious. */}
      <path d="M56 58 C58 59 59 60 60 61 C61 60 62 59 64 58" fill="none" stroke={IVORY} strokeWidth="5.6" strokeLinecap="round" />
      <path d="M56 58 C58 59 59 60 60 61 C61 60 62 59 64 58" fill="none" stroke={CORD} strokeWidth="4" strokeLinecap="round" />

      {/* Twin cords leave beneath the return loop. */}
      <CordPath d="M54 88 C54 99 51 107 49 116" width={3.3} />
      <CordPath d="M66 88 C66 99 69 107 71 116" width={3.3} />

      {/* Paired tassels—four fine strands each. */}
      <g stroke={CORD} strokeWidth="1.35" strokeLinecap="round">
        {[0, 2.7, 5.4, 8.1].map((offset) => <path key={`left-${offset}`} d={`M${43 + offset} 113 C${42 + offset} 121 ${41 + offset} 127 ${40 + offset} 134`} />)}
        {[0, 2.7, 5.4, 8.1].map((offset) => <path key={`right-${offset}`} d={`M${69 + offset} 113 C${70 + offset} 121 ${71 + offset} 127 ${72 + offset} 134`} />)}
      </g>

      {/* Tiny gold bead marks the shared centre without letters or names. */}
      <circle cx="60" cy="61" r="3.8" fill={IVORY} stroke={GOLD} strokeWidth="1.1" />
    </svg>
  )
}
