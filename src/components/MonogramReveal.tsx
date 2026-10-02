import { motion } from 'framer-motion'
import { fadeIn, slowScale, softEase } from '../animations/variants'
import { wedding } from '../content/wedding'
import Monogram from '../decorations/Monogram'
import PaperTexture from '../decorations/PaperTexture'

interface MonogramRevealProps {
  /** Start the reveal (true once the envelope has finished). */
  active: boolean
}

/**
 * Atmospheric sage page with the circular botanical monogram.
 * Acts as the first "page" after the envelope.
 */
export default function MonogramReveal({ active }: MonogramRevealProps) {
  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center text-paper overflow-hidden pt-safe pb-safe"
      style={{
        background:
          'radial-gradient(120% 90% at 50% 40%, #7E8972 0%, #78836C 45%, #677260 100%)',
      }}
      aria-label="Monogram"
    >
      <PaperTexture opacity={0.09} />

      <motion.div
        variants={slowScale}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <Monogram initials={wedding.couple.initials} size={236} color="#F7F4EC" />
      </motion.div>

      <motion.p
        className="label text-paper/80 mt-12 text-center"
        variants={fadeIn}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        transition={{ delay: 1.2, duration: 1.2, ease: softEase }}
      >
        {wedding.date.month} {wedding.date.day}, {wedding.date.year}
      </motion.p>

      {/* Scroll cue: a slow-breathing hairline */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2.25rem)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        aria-hidden="true"
      >
        <span className="label text-paper/60 text-[9px]">Scroll</span>
        <motion.span
          className="block w-px h-10 bg-paper/50 origin-top"
          animate={{ scaleY: [0.2, 1, 0.2] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
