import { motion } from 'framer-motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import Bee from '../decorations/Bee'
import { EnglishRose, FloralBorder } from '../decorations/FloralLayer'
import OrnamentalDivider from '../decorations/OrnamentalDivider'
import RegencyFrame from '../decorations/RegencyFrame'
import RoseDecor from '../decorations/RoseDecor'
import Calligraphy from '../ui/Calligraphy'
import Reveal from '../ui/Reveal'
import SocietyMasthead from '../ui/SocietyMasthead'
import VintagePhoto from '../ui/VintagePhoto'

/**
 * Lady Whistledown's Society Papers — the announcement, laid out like a broadsheet:
 * masthead, dateline, headline in Cinzel Decorative, a drop-capped column of gossip
 * in Cormorant, the couple's names in Copperplate, and the engraved particulars.
 */
export default function Invitation() {
  const { couple, date, ceremonyTime } = wedding
  return (
    <section className="relative bg-paper px-7 pt-28 pb-20 overflow-hidden" aria-labelledby="invite-heading">
      <FloralBorder wisteria={['tl', 'tr']} seed={2} />
      <RoseDecor image="pink-full" width={200} className="-left-24 bottom-[2%]" rotate={18} opacity={0.95} delay={1.6} />
      <EnglishRose className="absolute right-2 top-[46%] opacity-90" size={70} tone="quartz" rotate={14} />

      <motion.div
        className="relative flex flex-col items-center text-center"
        variants={staggerChildren(0.14)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp} className="w-full">
          <SocietyMasthead dateline={`Huế · ${date.day} ${date.month} ${date.year}`} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          id="invite-heading"
          variants={fadeUp}
          className="mt-8 font-heading text-wedgwood text-[1.05rem] tracking-[0.12em] leading-[1.7] text-balance"
        >
          The Match of the Season
          <span className="block font-serif italic font-light normal-case tracking-normal text-charcoal/70 text-base mt-1">
            A Ball to be given in celebration of a marriage
          </span>
        </motion.h2>

        <motion.div variants={fadeUp} className="mt-6 text-gold">
          <OrnamentalDivider variant="leaf" width={140} />
        </motion.div>

        {/* Salutation — written by hand */}
        <motion.div variants={fadeUp} className="mt-8">
          <Calligraphy as="p" className="text-[2rem] text-royal leading-[1.1]" duration={2.4}>
            Dearest Gentle Reader,
          </Calligraphy>
        </motion.div>

        {/* Column with drop cap */}
        <motion.p
          variants={fadeUp}
          className="mt-5 font-serif text-[1.15rem] text-charcoal/90 leading-[1.65] text-left max-w-[20rem] first-letter:font-heading first-letter:text-[2.6rem] first-letter:text-wedgwood first-letter:float-left first-letter:mr-2 first-letter:leading-[0.85] first-letter:mt-1"
        >
          It is with the greatest delight that this author can confirm what the ton has long
          suspected. After six years of devoted courtship, and three spent writing letters between
          Đà Nẵng and Huế, a match has been made. Together with their families,
        </motion.p>

        {/* Names in Copperplate */}
        <motion.div variants={fadeUp} className="mt-8 text-wedgwood leading-none">
          <Calligraphy className="block text-[3.6rem] leading-[1.05]" duration={2.6} delay={0.2}>
            {couple.first}
          </Calligraphy>
          <span className="block font-serif italic font-light text-lilac text-xl my-1">and</span>
          <Calligraphy className="block text-[3.6rem] leading-[1.05]" duration={2.6} delay={0.9}>
            {couple.second}
          </Calligraphy>
        </motion.div>

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
      <Reveal className="relative mt-16 px-5">
        <RegencyFrame className="p-4">
          <VintagePhoto src={wedding.couplePhoto} alt={`${couple.first} and ${couple.second}`} ratio="4 / 5" frame={false} />
        </RegencyFrame>
      </Reveal>

      <Reveal delay={0.3} className="relative mt-8 flex flex-col items-center">
        <Calligraphy as="p" className="text-[1.7rem] text-royal leading-none" duration={1.8}>
          Yours, ever truly
        </Calligraphy>
        <Bee size={24} className="mt-4" />
      </Reveal>
    </section>
  )
}
