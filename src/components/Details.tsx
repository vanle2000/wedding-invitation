import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { GoldDivider } from '../art/GoldOrnament'
import PaperGrain from '../art/PaperGrain'
import { EvergreenBranch, WinterSparkles } from '../art/WinterBotanical'
import { wedding } from '../content/wedding'

export default function Details() {
  return (
    <section className="canvas-section overflow-hidden border-y border-gold/45 bg-oxblood py-28 text-center text-ivory" aria-label="Wedding details">
      <PaperGrain opacity={0.07} />
      <WinterSparkles className="absolute inset-0 h-full w-full opacity-28" />
      <EvergreenBranch width={230} className="absolute -right-20 -top-5 opacity-48" flip />
      <EvergreenBranch width={210} className="absolute -bottom-8 -left-20 opacity-38" />
      <BotanicalArt kind="camellia" width="40%" className="-right-[17%] bottom-[3%] opacity-24" rotate={-20} flip />

      <motion.div className="relative z-10 flex flex-col items-center" variants={stagger(0.14)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="eyebrow-gold">The winter particulars</motion.p>
        <motion.p variants={fadeUp} className="mt-5 font-script text-2xl text-gold-light">A Valentine made forever</motion.p>
        <motion.div variants={fadeUp} className="mt-10">
          <p className="font-display text-[1.55rem] uppercase tracking-editorial text-gold-light">{wedding.date.month}</p>
          <p className="mt-1 font-display text-[6.2rem] leading-[0.8] text-ivory">{wedding.date.day}</p>
          <p className="mt-6 font-serif text-2xl tracking-[0.24em] text-gold-light">{wedding.date.year}</p>
          <p className="eyebrow-gold mt-5">{wedding.date.weekday}</p>
        </motion.div>
        <motion.div variants={fadeUp} className="my-12"><GoldDivider /></motion.div>
        <motion.div variants={fadeUp} className="flex w-full max-w-[20rem] items-stretch">
          <div className="flex-1 px-3"><p className="eyebrow-gold">Ceremony</p><p className="mt-4 font-serif text-[1.8rem]">{wedding.ceremony.time}</p></div>
          <span className="w-px bg-gold/55" />
          <div className="flex-1 px-3"><p className="eyebrow-gold">Reception</p><p className="mt-4 font-serif text-[1.8rem]">{wedding.reception.time}</p></div>
        </motion.div>
        <motion.p variants={fadeUp} className="mt-12 max-w-[18rem] text-balance font-serif text-lg italic leading-relaxed text-ivory/72">One winter day, two beautiful moments, and a lifetime to follow.</motion.p>
      </motion.div>
    </section>
  )
}
