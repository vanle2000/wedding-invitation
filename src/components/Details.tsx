import { motion } from 'framer-motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import OrnamentalDivider from '../decorations/OrnamentalDivider'
import RoseDecor from '../decorations/RoseDecor'

interface DetailProps {
  label: string
  value: string
}

function Detail({ label, value }: DetailProps) {
  return (
    <motion.div variants={fadeUp} className="flex flex-1 flex-col items-center px-2 text-center">
      <span className="label-dark">{label}</span>
      <span className="mt-4 font-serif text-[1.8rem] leading-none text-charcoal">{value}</span>
    </motion.div>
  )
}

/** Date and time printed as a restrained typographic broadside. */
export default function Details() {
  const { date, ceremonyTime, receptionTime } = wedding
  return (
    <section className="stationery-section py-28" aria-label="Wedding details">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[82%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-paper-2/38" />
      <RoseDecor image="coral-bloom" width={150} className="-left-20 -top-8 opacity-30" rotate={18} sway={false} />
      <div aria-hidden="true" className="absolute -right-4 bottom-12 opacity-25">
        <BotanicalDecoration variant="wildflower" size={60} flip />
      </div>

      <motion.div
        className="relative flex flex-col items-center text-center"
        variants={staggerChildren(0.16)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p variants={fadeUp} className="label">
          The particulars
        </motion.p>
        <motion.p variants={fadeUp} className="mt-5 font-script text-2xl text-rose">
          A Valentine, made forever
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center">
          <span className="font-display text-[1.6rem] uppercase tracking-editorial text-burgundy">{date.month}</span>
          <span className="mt-1 font-display text-[5.4rem] leading-[0.85] text-burgundy">{date.day}</span>
          <span className="mt-5 font-serif text-2xl tracking-[0.22em] text-charcoal">{date.year}</span>
          <span className="label mt-4">{date.weekday}</span>
        </motion.div>

        <motion.div variants={fadeUp} className="my-12 text-gold">
          <OrnamentalDivider variant="hairline" width={145} />
        </motion.div>

        <motion.div variants={fadeUp} className="flex w-full max-w-[20rem] items-stretch">
          <Detail label="Ceremony" value={ceremonyTime} />
          <span aria-hidden="true" className="w-px bg-gold/35" />
          <Detail label="Reception" value={receptionTime} />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-12 max-w-[18rem] text-balance font-serif text-lg italic leading-relaxed text-charcoal/70">
          Two moments, one promise, and a lifetime to follow.
        </motion.p>
      </motion.div>
    </section>
  )
}
