import { motion } from 'framer-motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import Bee from '../decorations/Bee'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import OrnamentalDivider from '../decorations/OrnamentalDivider'
import RegencyFrame from '../decorations/RegencyFrame'
import RoseDecor from '../decorations/RoseDecor'
import Calligraphy from '../ui/Calligraphy'
import Reveal from '../ui/Reveal'
import VintagePhoto from '../ui/VintagePhoto'

/**
 * The love letter: a ball invitation written in Copperplate calligraphy,
 * with the formal particulars engraved beneath in Didone capitals.
 */
export default function Invitation() {
  const { couple, date, ceremonyTime } = wedding
  return (
    <section className="relative bg-paper px-8 pt-40 pb-20 overflow-hidden" aria-labelledby="invite-heading">
      <div className="pointer-events-none absolute top-16 left-5 opacity-90">
        <BotanicalDecoration variant="corner" size={92} />
      </div>
      <RoseDecor image="coral-bloom" width={190} className="-right-16 -top-6" rotate={-24} flip delay={0.8} />
      <RoseDecor image="pink-full" width={200} className="-left-24 bottom-[2%]" rotate={18} opacity={0.95} delay={1.6} />

      <motion.div
        className="flex flex-col items-center text-center"
        variants={staggerChildren(0.16)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Masthead */}
        <motion.p variants={fadeUp} className="label text-wedgwood/80">
          A Ball in celebration of a marriage
        </motion.p>
        <motion.p variants={fadeUp} className="mt-3 font-serif italic text-charcoal/70 text-base">
          Huế · {date.weekday}, {date.month} {date.day}, {date.year}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 text-gold">
          <OrnamentalDivider variant="leaf" width={150} />
        </motion.div>

        {/* Salutation — written by hand */}
        <motion.div variants={fadeUp} className="mt-10">
          <Calligraphy as="p" className="text-[2.1rem] text-wedgwood leading-[1.1]" duration={2.4}>
            Dearest Gentle Reader,
          </Calligraphy>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 font-serif italic text-[1.2rem] text-charcoal/85 leading-relaxed max-w-[19rem] text-balance"
        >
          It is with the greatest delight that this author announces the match of the season.
          Together with their families,
        </motion.p>

        {/* Names in Copperplate */}
        <motion.h2 id="invite-heading" variants={fadeUp} className="mt-8 text-wedgwood leading-none">
          <Calligraphy className="block text-[3.6rem] leading-[1.05]" duration={2.6} delay={0.2}>
            {couple.first}
          </Calligraphy>
          <span className="block font-serif italic font-light text-lilac text-xl my-1">and</span>
          <Calligraphy className="block text-[3.6rem] leading-[1.05]" duration={2.6} delay={0.9}>
            {couple.second}
          </Calligraphy>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-8 font-serif italic text-[1.2rem] text-charcoal/85 leading-relaxed max-w-[19rem] text-balance"
        >
          request the honour of your presence at a Ball given in celebration of their marriage.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 text-gold">
          <OrnamentalDivider variant="hairline" width={110} />
        </motion.div>

        {/* Engraved particulars */}
        <motion.p
          variants={fadeUp}
          className="mt-8 font-display text-charcoal text-base uppercase tracking-[0.18em] leading-[2] whitespace-pre-line"
        >
          {date.long}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-3 label">
          at {ceremonyTime}
        </motion.p>
      </motion.div>

      {/* Framed portrait */}
      <Reveal className="mt-16 px-5">
        <RegencyFrame className="p-4">
          <VintagePhoto src={wedding.couplePhoto} alt={`${couple.first} and ${couple.second}`} ratio="4 / 5" frame={false} />
        </RegencyFrame>
      </Reveal>

      <Reveal delay={0.3} className="mt-8 flex flex-col items-center">
        <Calligraphy as="p" className="text-[1.7rem] text-lilac leading-none" duration={1.8}>
          Yours, ever truly
        </Calligraphy>
        <Bee size={24} className="mt-4" />
      </Reveal>
    </section>
  )
}
