import { motion } from 'framer-motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import Bee from '../decorations/Bee'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import PaperTexture from '../decorations/PaperTexture'
import RoseDecor from '../decorations/RoseDecor'
import { FloralBorder } from '../decorations/FloralLayer'
import Calligraphy from '../ui/Calligraphy'

/** Quiet final page: the author signs off. Generous bottom spacing and safe-area padding. */
export default function Closing() {
  const [a, b] = wedding.couple.initials
  return (
    <footer
      className="relative bg-paper-2 px-8 pt-56 overflow-hidden"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}
    >
      <PaperTexture opacity={0.06} />
      <FloralBorder wisteria={['tl', 'tr']} vineTop seed={13} />
      <RoseDecor image="pink-full" width={240} className="-left-20 -top-24" rotate={160} delay={0.4} />
      <RoseDecor image="coral-full" width={240} className="-right-20 -top-24" rotate={-160} flip delay={1.3} />

      <motion.div
        className="relative flex flex-col items-center text-center"
        variants={staggerChildren(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p variants={fadeUp} className="font-heading text-wedgwood text-[1.1rem] tracking-[0.18em] leading-[2]">
          We cannot wait
          <br />
          to celebrate
          <br />
          with you
        </motion.p>

        <motion.div variants={fadeUp} className="mt-14">
          <BotanicalDecoration variant="wreath" size={150} />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-12 font-script text-wedgwood text-[3.4rem] leading-none">
          {a} <span className="font-serif italic text-lilac text-3xl">&amp;</span> {b}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center">
          <Calligraphy as="p" className="text-[2.2rem] text-lilac leading-none" duration={2}>
            Yours, ever truly
          </Calligraphy>
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
