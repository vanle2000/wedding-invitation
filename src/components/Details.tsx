import { motion } from 'framer-motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import OrnamentalDivider from '../decorations/OrnamentalDivider'
import PaperTexture from '../decorations/PaperTexture'
import RoseDecor from '../decorations/RoseDecor'
import { FloralBorder } from '../decorations/FloralLayer'

interface DetailProps {
  label: string
  value: string
}

function Detail({ label, value }: DetailProps) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center">
      <span className="label-dark">{label}</span>
      <span className="mt-3 font-serif text-3xl text-charcoal">{value}</span>
    </motion.div>
  )
}

/** Typography-driven details page on secondary paper. */
export default function Details() {
  const { date, ceremonyTime, receptionTime } = wedding
  return (
    <section className="relative bg-paper-2 px-8 pt-32 pb-24 overflow-hidden" aria-label="Wedding details">
      <PaperTexture opacity={0.07} />
      <FloralBorder wisteria={['tl']} vineBottom roses={['br']} seed={5} />
      <RoseDecor image="pink-bloom" width={220} className="-right-16 -top-4" rotate={-150} flip delay={0.5} />
      <div className="pointer-events-none absolute -left-4 bottom-10 opacity-85 -rotate-6">
        <BotanicalDecoration variant="wildflower" size={60} />
      </div>

      <motion.div
        className="relative flex flex-col items-center text-center"
        variants={staggerChildren(0.18)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          <span className="label">{date.weekday}</span>
          <span className="mt-4 font-heading text-wedgwood text-[1.6rem] tracking-[0.2em] leading-none">
            {date.month}
          </span>
          <span className="font-display text-charcoal text-[4.4rem] leading-[0.95] mt-1">{date.day}</span>
          <span className="mt-2 font-serif text-2xl text-lilac tracking-[0.2em]">{date.year}</span>
        </motion.div>

        <motion.div variants={fadeUp} className="my-12 text-lilac">
          <OrnamentalDivider variant="hairline" width={120} />
        </motion.div>

        <div className="flex flex-col gap-10">
          <Detail label="Ceremony" value={ceremonyTime} />
          <Detail label="Reception" value={receptionTime} />
        </div>

        <motion.p variants={fadeUp} className="mt-14 font-serif italic text-charcoal/70 text-lg max-w-[18rem] text-balance">
          A lunch banquet to follow — the tenth day of the first lunar month, year of Đinh Mùi.
        </motion.p>
      </motion.div>
    </section>
  )
}
