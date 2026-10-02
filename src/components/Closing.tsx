import { motion } from 'framer-motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import PaperTexture from '../decorations/PaperTexture'

/** Quiet final stationery page with generous bottom spacing and safe-area padding. */
export default function Closing() {
  const [a, b] = wedding.couple.initials
  return (
    <footer
      className="relative bg-paper-2 px-8 pt-28 overflow-hidden"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}
    >
      <PaperTexture opacity={0.07} />

      <motion.div
        className="relative flex flex-col items-center text-center"
        variants={staggerChildren(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p
          variants={fadeUp}
          className="font-display text-charcoal text-[1.5rem] uppercase tracking-[0.16em] leading-[1.6]"
        >
          We cannot wait
          <br />
          to celebrate
          <br />
          with you
        </motion.p>

        <motion.div variants={fadeUp} className="mt-14 text-sage">
          <BotanicalDecoration variant="olive-branch" size={170} />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-12 font-display text-charcoal text-4xl tracking-[0.2em]">
          {a} <span className="font-serif italic text-sage text-3xl">&amp;</span> {b}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-10 label">
          With love
        </motion.p>
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 left-0 right-0 flex justify-center opacity-60">
        <BotanicalDecoration variant="landscape" size={320} />
      </div>
    </footer>
  )
}
