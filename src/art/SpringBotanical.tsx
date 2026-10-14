import { motion, useReducedMotion } from 'framer-motion'
import { softEase } from '../animations/variants'

interface GardenVineProps {
  width?: number | string
  className?: string
  flip?: boolean
  animate?: boolean
}

/** Airy spring vine with sage leaves, peony buds and camellia-red accents. */
export function GardenVine({ width = 230, className = '', flip = false, animate = false }: GardenVineProps) {
  const reduceMotion = useReducedMotion()
  const leaves = [30, 52, 76, 101, 126, 151, 176, 201]
  return (
    <motion.svg
      viewBox="0 0 240 110"
      className={`pointer-events-none ${className}`}
      style={{ width, scaleX: flip ? -1 : 1, transformOrigin: 'center' }}
      aria-hidden="true"
      animate={animate && !reduceMotion ? { rotate: [-0.7, 0.7, -0.7], y: [0, -2, 0] } : undefined}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M8 91 C64 79 122 57 232 18" fill="none" stroke="#79846E" strokeWidth="1.5" strokeLinecap="round" />
      {leaves.map((x, index) => {
        const y = 91 - (x - 8) * 0.33
        const direction = index % 2 === 0 ? -1 : 1
        return (
          <g key={x} transform={`translate(${x} ${y}) rotate(${direction * (index % 3 === 0 ? 42 : 31)})`}>
            <path d="M0 0 C7-8 20-8 28 0 C20 8 7 8 0 0Z" fill={index % 3 === 0 ? '#DDE2D6' : '#AAB5A0'} stroke="#79846E" strokeWidth="0.65" />
            <path d="M3 0 H25" stroke="#79846E" strokeWidth="0.45" />
          </g>
        )
      })}
      <g transform="translate(88 65)">
        <path d="M0 8 C-8 1-5-10 0-14 C5-10 8 1 0 8Z" fill="#BC7180" stroke="#852E43" strokeWidth="0.7" />
        <path d="M-6 5 L0 10 L6 5" fill="#79846E" stroke="#79846E" strokeWidth="0.5" />
      </g>
      <g transform="translate(181 32)">
        {[0, 72, 144, 216, 288].map((degrees) => <ellipse key={degrees} cx="0" cy="-7" rx="4.5" ry="7" transform={`rotate(${degrees})`} fill="#AB3E53" stroke="#692235" strokeWidth="0.5" />)}
        <circle r="2.2" fill="#C2A15A" />
      </g>
    </motion.svg>
  )
}

/** A restrained field of spring petals for the gatefold only. */
export function PetalDrift({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const petals = [
    [10, 3, 11, 18, 1], [24, -7, 9, -14, 3], [41, 1, 8, 20, 5], [58, -5, 10, -17, 0],
    [72, 4, 8, 15, 4], [87, -8, 11, -18, 2], [95, 8, 7, 12, 7],
  ] as const
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      {petals.map(([left, top, size, drift, delay], index) => (
        <motion.span
          key={`${left}-${top}`}
          className="absolute rounded-[100%_0_100%_0]"
          style={{ left: `${left}%`, top: `${top}%`, width: size, height: size * 0.72, background: index % 3 === 0 ? '#E9CDD3' : index % 3 === 1 ? '#BC7180' : '#AB3E53', opacity: 0.55 }}
          animate={!reduceMotion ? { y: ['0vh', '105vh'], x: [0, drift, 0], rotate: [0, 190] } : undefined}
          transition={{ duration: 16 + index * 1.2, delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

/** Gold line divider with a spring bud at its centre. */
export function SpringDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 30" className={`mx-auto h-[30px] w-[180px] ${className}`} aria-hidden="true">
      <path d="M0 15 H68 M112 15 H180" stroke="currentColor" strokeWidth="0.8" />
      <path d="M90 23 C78 16 81 3 90 0 C99 3 102 16 90 23Z" fill="#BC7180" stroke="#852E43" strokeWidth="0.7" />
      <path d="M77 16 C82 8 88 7 90 15 C92 7 98 8 103 16 C97 14 94 19 90 25 C86 19 83 14 77 16Z" fill="#DDE2D6" stroke="#79846E" strokeWidth="0.6" />
      <circle cx="68" cy="15" r="1.2" fill="currentColor" /><circle cx="112" cy="15" r="1.2" fill="currentColor" />
    </svg>
  )
}

/** A peony mark that opens petal-by-petal for the final love note. */
export function BloomMark({ open, className = '' }: { open: boolean; className?: string }) {
  const outer = [0, 60, 120, 180, 240, 300]
  const inner = [30, 102, 174, 246, 318]
  return (
    <svg viewBox="0 0 140 150" className={className} aria-hidden="true">
      <path d="M70 142 C73 116 68 92 70 68" fill="none" stroke="#79846E" strokeWidth="1.5" />
      <path d="M70 118 C48 101 37 109 32 124 C48 129 59 126 70 118Z" fill="#AAB5A0" stroke="#79846E" strokeWidth="0.8" />
      <path d="M70 102 C88 86 101 92 106 107 C91 113 81 111 70 102Z" fill="#DDE2D6" stroke="#79846E" strokeWidth="0.8" />
      <g transform="translate(70 56)">
        {outer.map((angle, index) => (
          <motion.ellipse key={angle} cx="0" cy="-25" rx="17" ry="27" transform={`rotate(${angle})`} fill="#AB3E53" stroke="#692235" strokeWidth="0.7" initial={false} animate={{ scale: open ? 1 : 0.58, rotate: open ? 0 : index % 2 ? 13 : -13, opacity: open ? 1 : 0.72 }} transition={{ duration: 0.7, delay: open ? index * 0.06 : 0, ease: softEase }} style={{ transformOrigin: '0px 0px' }} />
        ))}
        {inner.map((angle, index) => (
          <motion.ellipse key={angle} cx="0" cy="-15" rx="11" ry="18" transform={`rotate(${angle})`} fill="#BC7180" stroke="#852E43" strokeWidth="0.55" initial={false} animate={{ scale: open ? 1 : 0.45, opacity: open ? 1 : 0.65 }} transition={{ duration: 0.65, delay: open ? 0.2 + index * 0.05 : 0, ease: softEase }} style={{ transformOrigin: '0px 0px' }} />
        ))}
        <circle r="6" fill="#C2A15A" />
      </g>
    </svg>
  )
}
