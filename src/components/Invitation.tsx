import { motion } from 'framer-motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import OrnamentalDivider from '../decorations/OrnamentalDivider'
import Reveal from '../ui/Reveal'
import VintagePhoto from '../ui/VintagePhoto'

/** Main invitation page: editorial typography on warm ivory paper. */
export default function Invitation() {
  const { couple, date, ceremonyTime } = wedding
  return (
    <section className="relative bg-paper px-8 pt-24 pb-20 overflow-hidden" aria-labelledby="invite-heading">
      {/* Asymmetric decoration: corner top-left, sprig lower-right */}
      <div className="pointer-events-none absolute top-6 left-5 opacity-80">
        <BotanicalDecoration variant="corner" size={88} />
      </div>
      <div className="pointer-events-none absolute -right-3 bottom-[22%] opacity-75 rotate-12">
        <BotanicalDecoration variant="sprig" size={38} />
      </div>

      <motion.div
        className="flex flex-col items-center text-center"
        variants={staggerChildren(0.16)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p variants={fadeUp} className="font-script text-2xl text-sage leading-none">
          Together with their families
        </motion.p>

        <motion.h2 id="invite-heading" variants={fadeUp} className="mt-10 font-display text-charcoal leading-[1.08]">
          <span className="block text-[2.6rem]">{couple.first}</span>
          <span className="block font-serif italic font-light text-sage text-2xl my-2">and</span>
          <span className="block text-[2.6rem]">{couple.second}</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-8 font-serif text-lg text-charcoal/80 leading-relaxed max-w-[17rem] text-balance"
        >
          request the pleasure of your company at the celebration of their marriage
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 text-sage">
          <OrnamentalDivider variant="leaf" width={150} />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-8 font-serif text-xl text-charcoal whitespace-pre-line leading-relaxed">
          {date.long}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-3 label">
          at {ceremonyTime}
        </motion.p>
      </motion.div>

      <div className="mt-16 px-4">
        <VintagePhoto src={wedding.couplePhoto} alt={`${couple.first} and ${couple.second}`} ratio="4 / 5" />
      </div>

      <Reveal as="p" delay={0.3} className="mt-8 text-center font-script text-xl text-sage">
        {couple.first} &amp; {couple.second}
      </Reveal>
    </section>
  )
}
