import { motion } from 'framer-motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import Bee from '../decorations/Bee'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import OrnamentalDivider from '../decorations/OrnamentalDivider'
import RegencyFrame from '../decorations/RegencyFrame'
import Reveal from '../ui/Reveal'
import VintagePhoto from '../ui/VintagePhoto'

/** The Society Papers: a Whistledown-style letter announcing the match, then the framed portrait. */
export default function Invitation() {
  const { couple, date, ceremonyTime } = wedding
  return (
    <section className="relative bg-paper px-8 pt-24 pb-20 overflow-hidden" aria-labelledby="invite-heading">
      <div className="pointer-events-none absolute top-6 left-5 opacity-90">
        <BotanicalDecoration variant="corner" size={92} />
      </div>
      <div className="pointer-events-none absolute -right-3 bottom-[20%] opacity-85 rotate-12">
        <BotanicalDecoration variant="sprig" size={40} />
      </div>

      <motion.div
        className="flex flex-col items-center text-center"
        variants={staggerChildren(0.16)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Masthead */}
        <motion.p variants={fadeUp} className="label text-burgundy/80">
          The Society Papers
        </motion.p>
        <motion.p variants={fadeUp} className="mt-3 font-serif italic text-charcoal/70 text-base">
          Huế · {date.weekday}, {date.month} {date.day}, {date.year}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 text-gold">
          <OrnamentalDivider variant="leaf" width={150} />
        </motion.div>

        {/* The letter */}
        <motion.p variants={fadeUp} className="mt-10 font-script text-[1.9rem] text-rose leading-none">
          Dearest Gentle Reader,
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 font-serif text-lg text-charcoal/85 leading-relaxed max-w-[19rem] text-balance"
        >
          It is with the greatest delight that this author announces the match of the season.
          Together with their families,
        </motion.p>

        <motion.h2 id="invite-heading" variants={fadeUp} className="mt-8 font-display text-burgundy leading-[1.08]">
          <span className="block text-[2.7rem]">{couple.first}</span>
          <span className="block font-serif italic font-light text-rose text-2xl my-2">and</span>
          <span className="block text-[2.7rem]">{couple.second}</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-8 font-serif text-lg text-charcoal/85 leading-relaxed max-w-[19rem] text-balance"
        >
          request the pleasure of your company at the celebration of their marriage.
        </motion.p>

        <motion.p variants={fadeUp} className="mt-8 font-serif text-xl text-charcoal whitespace-pre-line leading-relaxed">
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
        <p className="font-script text-xl text-rose">Yours truly,</p>
        <Bee size={24} className="mt-3" />
      </Reveal>
    </section>
  )
}
