import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { softEase } from '../animations/variants'

interface PeonyBloomMomentProps {
  open: boolean
  onToggle: () => void
  controlsId: string
}

const burst = [
  { x: -72, y: -52, size: 5, delay: 0 }, { x: -35, y: -84, size: 3, delay: 0.05 },
  { x: 18, y: -90, size: 4, delay: 0.1 }, { x: 67, y: -58, size: 5, delay: 0.15 },
  { x: 86, y: -8, size: 3, delay: 0.2 }, { x: 70, y: 54, size: 4, delay: 0.25 },
  { x: 22, y: 82, size: 5, delay: 0.3 }, { x: -42, y: 75, size: 3, delay: 0.35 },
  { x: -83, y: 35, size: 4, delay: 0.4 }, { x: -92, y: -12, size: 3, delay: 0.45 },
] as const

/** Photographic closed-bud to open-bloom transition with a restrained gold burst. */
export default function PeonyBloomMoment({ open, onToggle, controlsId }: PeonyBloomMomentProps) {
  const reduceMotion = useReducedMotion()
  const base = import.meta.env.BASE_URL
  return (
    <div className="relative mx-auto mt-8 h-[205px] w-[205px]">
      <motion.button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={controlsId}
        className="absolute left-1/2 top-1/2 z-10 grid h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold-light/70 bg-ivory/10 p-[7px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-4 focus-visible:ring-offset-rouge"
        whileHover={!reduceMotion ? { scale: 1.015 } : undefined}
        whileTap={{ scale: 0.985 }}
      >
        <span className="relative block h-full w-full overflow-hidden rounded-full border border-gold/60 bg-parchment">
          <motion.img
            src={`${base}images/peony-bud-photo.webp`}
            alt="Nụ hoa mẫu đơn khép kín"
            width="760"
            height="760"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover saturate-[0.78] contrast-[0.92]"
            initial={false}
            animate={{ opacity: open ? 0 : 1, scale: open ? 1.12 : 1 }}
            transition={{ duration: 0.72, ease: softEase }}
          />
          <motion.img
            src={`${base}images/peony-open-photo.webp`}
            alt="Hoa mẫu đơn đã nở"
            width="760"
            height="760"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover saturate-[0.72] contrast-[0.9]"
            initial={false}
            animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.72, rotate: open ? 0 : -5 }}
            transition={{ duration: 0.8, ease: softEase }}
          />
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-gradient-to-tr from-rouge-deep/18 via-transparent to-gold-light/20 mix-blend-soft-light" />
        </span>
        <span className="sr-only">{open ? 'Khép lời nhắn' : 'Làm hoa mẫu đơn nở và mở lời nhắn'}</span>
      </motion.button>

      <AnimatePresence>
        {open && !reduceMotion && burst.map((particle, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 rounded-full bg-gold-light shadow-[0_0_8px_rgba(229,193,88,0.65)]"
            style={{ width: particle.size, height: particle.size }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{ x: particle.x, y: particle.y, scale: [0, 1.25, 0.7], opacity: [0, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.15, delay: particle.delay, ease: softEase }}
          />
        ))}
      </AnimatePresence>
      <span className="eyebrow-gold absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap">{open ? 'Khép lời nhắn' : 'Chạm để hoa nở'}</span>
    </div>
  )
}
