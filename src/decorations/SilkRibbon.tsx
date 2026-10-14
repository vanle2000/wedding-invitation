import { motion } from 'framer-motion'
import { softEase } from '../animations/variants'

interface SilkRibbonProps {
  released: boolean
}

const silk = 'linear-gradient(180deg, #A95640 0%, #B96850 28%, #C57A61 52%, #AA5842 100%)'

/** Two frayed halves of a terracotta silk ribbon that release from beneath the seal. */
export default function SilkRibbon({ released }: SilkRibbonProps) {
  const half = 'absolute top-0 h-full w-[54%] overflow-hidden shadow-[0_3px_7px_rgba(75,48,40,0.16)]'

  return (
    <div aria-hidden="true" className="pointer-events-none absolute -left-[7%] -right-[7%] top-1/2 z-40 h-[47px] -translate-y-1/2">
      <motion.div
        className={`${half} left-0`}
        style={{ background: silk, clipPath: 'polygon(0 0, 100% 0, 97% 12%, 100% 25%, 96% 38%, 100% 52%, 97% 68%, 100% 82%, 96% 100%, 0 100%)' }}
        animate={released ? { x: '-106%', rotate: -2, opacity: 0.25 } : { x: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.05, ease: softEase }}
      >
        <span className="absolute inset-x-0 top-[11px] h-px bg-[#E4A28A]/35" />
        <span className="absolute inset-x-0 bottom-[9px] h-px bg-[#743C2E]/25" />
      </motion.div>

      <motion.div
        className={`${half} right-0`}
        style={{ background: silk, clipPath: 'polygon(4% 0, 100% 0, 100% 100%, 4% 100%, 0 84%, 3% 69%, 0 54%, 4% 39%, 0 23%, 3% 10%)' }}
        animate={released ? { x: '106%', rotate: 2, opacity: 0.25 } : { x: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.05, ease: softEase }}
      >
        <span className="absolute inset-x-0 top-[11px] h-px bg-[#E4A28A]/35" />
        <span className="absolute inset-x-0 bottom-[9px] h-px bg-[#743C2E]/25" />
      </motion.div>

      {/* Fine loose fibres at the split ends. */}
      <motion.svg
        viewBox="0 0 72 54"
        className="absolute left-1/2 top-1/2 h-[54px] w-[72px] -translate-x-1/2 -translate-y-1/2"
        animate={released ? { opacity: 0, scaleX: 1.5 } : { opacity: 0.7, scaleX: 1 }}
        transition={{ duration: 0.65, ease: softEase }}
      >
        <g stroke="#E3A18A" strokeWidth="0.6" opacity="0.75">
          <path d="M8 5 C28 18 28 35 8 49" />
          <path d="M14 3 C30 19 30 35 13 52" />
          <path d="M64 5 C44 18 44 35 64 49" />
          <path d="M58 3 C42 19 42 35 59 52" />
        </g>
      </motion.svg>
    </div>
  )
}
