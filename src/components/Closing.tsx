import { motion } from 'framer-motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import Bee from '../decorations/Bee'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import PaperTexture from '../decorations/PaperTexture'

/** Quiet final page: the author signs off. Generous bottom spacing and safe-area padding. */
export default function Closing() {
  const [a, b] = wedding.couple.initials
  return (
    <footer
      className="relative bg-paper-2 px-8 pt-28 overflow-hidden"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}
    >
      <PaperTexture opacity={0.06} />

      <motion.div
        className="relative flex flex-col items-center text-center"
        variants={staggerChildren(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p variants={fadeUp} className="font-display text-burgundy text-[1.5rem] uppercase tracking-[0.16em] leading-[1.6]">
          We cannot wait
          <br />
          to celebrate
          <br />
          with you
        </motion.p>

        <motion.div variants={fadeUp} className="mt-14">
          <BotanicalDecoration variant="wreath" size={150} />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-12 font-display text-burgundy text-4xl tracking-[0.2em]">
          {a} <span className="font-serif italic text-rose text-3xl">&amp;</span> {b}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center">
          <p className="font-script text-2xl text-rose leading-none">Yours truly</p>
          <p className="label mt-4">With love, {wedding.couple.first} &amp; {wedding.couple.second}</p>
          <Bee size={26} className="mt-6" />
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 left-0 right-0 flex justify-center opacity-70">
        <BotanicalDecoration variant="landscape" size={320} />
      </div>
    </footer>
  )
}
