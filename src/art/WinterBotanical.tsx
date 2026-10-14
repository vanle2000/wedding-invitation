import { motion, useReducedMotion } from 'framer-motion'

interface WinterBotanicalProps {
  className?: string
  width?: number | string
  flip?: boolean
  animate?: boolean
}

/** Evergreen branch with hand-drawn needles, cranberry berries and a pinecone. */
export function EvergreenBranch({ className = '', width = 220, flip = false, animate = false }: WinterBotanicalProps) {
  const reduceMotion = useReducedMotion()
  const nodes = [28, 48, 68, 88, 108, 128, 148, 168, 188, 208]
  return (
    <motion.svg
      viewBox="0 0 240 100"
      className={`pointer-events-none ${className}`}
      style={{ width, scaleX: flip ? -1 : 1, transformOrigin: 'center' }}
      aria-hidden="true"
      animate={animate && !reduceMotion ? { rotate: [-0.8, 0.8, -0.8] } : undefined}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M8 78 C62 66 128 45 232 18" fill="none" stroke="#6B5A3C" strokeWidth="2.2" strokeLinecap="round" />
      {nodes.map((x, index) => {
        const y = 78 - (x - 8) * 0.27
        const length = 32 - index * 0.9
        return (
          <g key={x} stroke={index % 3 === 0 ? '#3B5C49' : '#294B3C'} strokeWidth="1.7" strokeLinecap="round">
            <path d={`M${x} ${y} l${-length * 0.72} ${-length * 0.58}`} />
            <path d={`M${x + 3} ${y - 1} l${-length * 0.42} ${-length * 0.86}`} />
            <path d={`M${x} ${y} l${length * 0.45} ${length * 0.75}`} />
            <path d={`M${x + 4} ${y - 2} l${length * 0.7} ${length * 0.45}`} />
          </g>
        )
      })}
      <g fill="#92283A" stroke="#D1A35E" strokeWidth="0.65">
        <circle cx="83" cy="54" r="5" /><circle cx="94" cy="57" r="4.5" /><circle cx="89" cy="46" r="4" />
        <circle cx="169" cy="29" r="4.2" /><circle cx="179" cy="31" r="4.8" /><circle cx="174" cy="22" r="3.8" />
      </g>
      <g transform="translate(126 55) rotate(-18)">
        <path d="M0 0 C-11 4 -13 22 0 31 C13 22 11 4 0 0Z" fill="#7B5435" stroke="#BE9B50" strokeWidth="0.8" />
        {[-6, 0, 6, 12, 18].map((y) => <path key={y} d={`M-8 ${y + 7} Q0 ${y + 13} 8 ${y + 7}`} fill="none" stroke="#D0AA68" strokeWidth="0.7" />)}
      </g>
    </motion.svg>
  )
}

/** Gold stars and pale snow used sparingly on the opening folio. */
export function WinterSparkles({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const flakes = [
    [8, 12, 1.4], [22, 28, 0.9], [38, 8, 1], [55, 34, 1.3], [71, 16, 0.8], [89, 30, 1.1],
    [15, 63, 0.8], [33, 81, 1.2], [61, 69, 0.9], [82, 88, 1.3], [94, 58, 0.7],
  ] as const
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`pointer-events-none ${className}`} aria-hidden="true">
      {flakes.map(([x, y, radius], index) => (
        <motion.circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={radius}
          fill={index % 3 === 0 ? '#BE9B50' : '#E8E4DA'}
          opacity={index % 2 ? 0.42 : 0.68}
          animate={!reduceMotion ? { opacity: [0.25, 0.75, 0.25] } : undefined}
          transition={{ duration: 3.5 + (index % 4), repeat: Infinity, delay: index * 0.14 }}
        />
      ))}
    </svg>
  )
}

/** Small holly divider—original SVG, not template artwork. */
export function HollyDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 34" className={`mx-auto h-[34px] w-[180px] ${className}`} aria-hidden="true">
      <path d="M0 17 H62 M118 17 H180" stroke="currentColor" strokeWidth="0.8" />
      <g transform="translate(90 17)">
        <path d="M-5 0 C-22-18-39-12-40 2 C-30-5-25 8-15 2 C-19 12-7 13-5 0Z" fill="#294B3C" stroke="#BE9B50" strokeWidth="0.7" />
        <path d="M5 0 C22-18 39-12 40 2 C30-5 25 8 15 2 C19 12 7 13 5 0Z" fill="#294B3C" stroke="#BE9B50" strokeWidth="0.7" />
        <circle cx="-5" cy="2" r="5" fill="#92283A" /><circle cx="5" cy="2" r="5" fill="#A52A3C" /><circle cy="-5" r="4.5" fill="#92283A" />
      </g>
    </svg>
  )
}
