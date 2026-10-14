import { motion } from 'framer-motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import OrnamentalDivider from '../decorations/OrnamentalDivider'
import RoseDecor from '../decorations/RoseDecor'
import Reveal from '../ui/Reveal'
import VintagePhoto from '../ui/VintagePhoto'

/** Formal announcement flowing directly from the monogram page into a printed portrait. */
export default function Invitation() {
  const { couple, date } = wedding
  return (
    <section className="stationery-section pt-16 pb-28" aria-labelledby="invitation-heading">
      <RoseDecor image="pink-bloom" width={160} className="-right-20 top-2 opacity-35" rotate={-22} flip sway={false} />
      <div aria-hidden="true" className="absolute -left-7 top-[31%] opacity-25">
        <BotanicalDecoration variant="sprig" size={44} />
      </div>

      <motion.div
        className="relative flex flex-col items-center text-center"
        variants={staggerChildren(0.14)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p variants={fadeUp} className="font-script text-2xl text-rose">
          Dearest friends &amp; family
        </motion.p>
        <motion.p variants={fadeUp} className="label-dark mt-6">
          Together with their families
        </motion.p>

        <motion.h1
          id="invitation-heading"
          variants={fadeUp}
          className="mt-10 font-display leading-[0.94] text-burgundy"
        >
          <span className="block text-[clamp(3.3rem,15vw,4.15rem)]">{couple.first}</span>
          <span className="my-3 block font-serif text-2xl font-light italic text-rose">and</span>
          <span className="block text-[clamp(3.3rem,15vw,4.15rem)]">{couple.second}</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-10 max-w-[19rem] text-balance font-serif text-[1.2rem] leading-relaxed text-charcoal/85"
        >
          request the honour of your presence as they exchange vows and begin their next chapter together.
        </motion.p>

        <motion.div variants={fadeUp} className="my-10 text-gold">
          <OrnamentalDivider variant="hairline" width={132} />
        </motion.div>

        <motion.p variants={fadeUp} className="whitespace-pre-line font-serif text-xl leading-[1.7] text-charcoal">
          {date.long}
        </motion.p>
        <motion.p variants={fadeUp} className="label mt-5">
          Huế · Việt Nam
        </motion.p>
      </motion.div>

      {/* A fine-art print rather than a UI card. */}
      <Reveal className="relative mt-20 -mx-3">
        <div aria-hidden="true" className="absolute -inset-x-2 -inset-y-3 border-y border-gold/30" />
        <VintagePhoto src={wedding.couplePhoto} alt={`${couple.first} and ${couple.second}`} ratio="4 / 5" frame={false} />
        <div className="relative mt-5 text-center">
          <p className="font-script text-xl text-rose">Six years, one promise</p>
          <p className="label mt-3">A love worth the wait</p>
        </div>
      </Reveal>
    </section>
  )
}
