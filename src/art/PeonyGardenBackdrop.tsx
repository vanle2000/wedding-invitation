import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const base = import.meta.env.BASE_URL

/** Rear garden, isolated edge blooms, and blurred foreground for camera depth. */
export default function PeonyGardenBackdrop() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, (value) => value * 0.2)

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Rear photographic plane moves at 0.2× scroll speed. */}
      <motion.div
        className="absolute -inset-x-[10%] -inset-y-[18%] bg-cover bg-center"
        style={{ backgroundImage: `url(${base}images/peony-garden.webp)`, y: reduceMotion ? 0 : parallaxY }}
      />
      <div className="absolute inset-0 bg-canvas/28 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-rouge-deep/10 via-transparent to-rouge-deep/15" />

      {/* Mid-plane isolated PNG blooms nestle the card into the bed. */}
      <img src={`${base}images/peony-open-isolated.png`} alt="" width="1100" height="731" loading="eager" fetchPriority="high" decoding="async" className="absolute -bottom-[2%] -left-[31%] z-10 w-[83%] drop-shadow-[0_14px_24px_rgba(44,37,35,0.2)]" />
      <img src={`${base}images/peony-blush-pair.png`} alt="" width="810" height="824" loading="eager" fetchPriority="high" decoding="async" className="absolute -right-[24%] -top-[4%] z-10 w-[68%] drop-shadow-[0_14px_24px_rgba(44,37,35,0.16)]" />

      {/* Foreground: three defocused photographic fragments create lens depth. */}
      <img src={`${base}images/peony-open-isolated.png`} alt="" width="1100" height="731" loading="eager" decoding="async" className="absolute -right-[28%] bottom-[13%] z-30 w-[48%] opacity-55 blur-[4px]" />
      <img src={`${base}images/peony-blush-pair.png`} alt="" width="810" height="824" loading="eager" decoding="async" className="absolute -left-[26%] top-[17%] z-30 w-[42%] opacity-48 blur-[4px]" />
      <span
        className="absolute -bottom-8 left-[18%] z-30 h-36 w-24 rotate-[24deg] rounded-[75%_25%_70%_30%] bg-cover bg-left-bottom opacity-45 blur-[4px]"
        style={{ backgroundImage: `url(${base}images/peony-garden.webp)` }}
      />
    </div>
  )
}
