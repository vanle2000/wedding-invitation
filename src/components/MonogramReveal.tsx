import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent } from 'react'
import { fadeIn, slowScale, softEase } from '../animations/variants'
import { wedding } from '../content/wedding'
import Bee from '../decorations/Bee'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import Monogram from '../decorations/Monogram'
import PaperTexture from '../decorations/PaperTexture'
import RegencyFrame from '../decorations/RegencyFrame'
import RoseDecor from '../decorations/RoseDecor'
import Calligraphy from '../ui/Calligraphy'

interface MonogramRevealProps {
  /** Start the reveal (true once the envelope has finished). */
  active: boolean
}

/**
 * Bright rose-paper page with the gilded monogram.
 * The frame tilts gently toward the pointer / finger for a tactile feel.
 */
export default function MonogramReveal({ active }: MonogramRevealProps) {
  const reduceMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 60, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 60, damping: 18 })

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduceMotion) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-paper-2 overflow-hidden pt-safe pb-safe"
      aria-label="Monogram"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <PaperTexture opacity={0.06} />
      {/* Warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(70% 50% at 50% 45%, rgba(255,249,243,0.85), rgba(230,238,244,0) 70%)' }}
      />

      {/* Roses tumbling in from the corners */}
      <RoseDecor image="coral-bloom" width={240} className="-left-16 -top-6" rotate={22} delay={0.4} />
      <RoseDecor image="pink-bloom" width={200} className="-right-20 -bottom-4" rotate={-160} flip delay={1.2} />
      <div className="pointer-events-none absolute bottom-24 -left-4 opacity-90 -rotate-12">
        <BotanicalDecoration variant="sprig" size={44} />
      </div>

      <motion.div
        variants={slowScale}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative"
      >
        <RegencyFrame className="p-7" bg="#E6EEF4">
          <Monogram initials={wedding.couple.initials} size={200} color="#4E6A86" />
        </RegencyFrame>
      </motion.div>

      <motion.div
        className="relative mt-10 flex flex-col items-center"
        variants={fadeIn}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        transition={{ delay: 1.1, duration: 1.2, ease: softEase }}
      >
        <Calligraphy as="p" className="text-[2rem] text-lilac leading-none" duration={2.2} immediate={active}>
          The match of the season
        </Calligraphy>
        <p className="label text-wedgwood/80 mt-4">
          {wedding.date.month} {wedding.date.day}, {wedding.date.year}
        </p>
        <Bee size={26} className="mt-5" />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2.25rem)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        aria-hidden="true"
      >
        <span className="label text-lilac text-[9px]">Scroll</span>
        <motion.span
          className="block w-px h-10 bg-wedgwood/40 origin-top"
          animate={{ scaleY: [0.2, 1, 0.2] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
