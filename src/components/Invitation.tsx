import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { GoldDivider } from '../art/GoldOrnament'
import { EvergreenBranch, HollyDivider } from '../art/WinterBotanical'
import { wedding } from '../content/wedding'

/** An original winter correspondence card—not a reproduction of a marketplace template. */
export default function Invitation() {
  return (
    <section className="canvas-section flex min-h-screen min-h-[100svh] flex-col items-center justify-center py-28 text-center" aria-labelledby="invitation-title">
      <EvergreenBranch width={260} className="absolute -left-20 -top-3 opacity-50" animate />
      <EvergreenBranch width={230} className="absolute -bottom-5 -right-20 opacity-45" flip />
      <BotanicalArt kind="camellia" width="38%" className="-bottom-[1%] -right-[12%] opacity-65" rotate={-14} flip eager />
      <BotanicalArt kind="peony" width="54%" className="-left-[26%] top-[11%] opacity-26" rotate={16} eager />
      <span aria-hidden="true" className="absolute inset-6 border border-gold/35" />
      <span aria-hidden="true" className="absolute inset-9 border border-gold/15" />

      <motion.div className="relative z-10 flex flex-col items-center" variants={stagger(0.14)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="eyebrow text-evergreen">A season for forever</motion.p>
        <motion.p variants={fadeUp} className="mt-6 font-script text-2xl text-rose">Une saison pour toujours</motion.p>
        <motion.div variants={fadeUp} className="mt-5 text-gold"><HollyDivider /></motion.div>
        <motion.p variants={fadeUp} className="mt-5 font-sans text-[9px] uppercase tracking-label text-ink/60">Together with their families</motion.p>

        <motion.h1 id="invitation-title" variants={fadeUp} className="mt-8 font-script text-[clamp(4rem,19vw,5.4rem)] leading-[0.82] text-oxblood">
          {wedding.couple.first}
          <span className="my-4 block font-serif text-2xl italic text-gold">&amp;</span>
          {wedding.couple.second}
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-10 max-w-[19rem] text-balance font-serif text-[1.2rem] leading-[1.7] text-ink/82">invite you to gather in the warmth of candlelight as they exchange vows and begin their forever.</motion.p>
        <motion.div variants={fadeUp} className="mt-10"><GoldDivider /></motion.div>
        <motion.p variants={fadeUp} className="mt-8 whitespace-pre-line font-display text-base uppercase tracking-editorial leading-[2] text-oxblood">{wedding.date.long}</motion.p>
        <motion.p variants={fadeUp} className="eyebrow mt-6 text-evergreen">Goldland Plaza · Huế</motion.p>
      </motion.div>

      <div aria-hidden="true" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-gold/70"><span className="eyebrow-gold">Continue</span><span className="h-10 w-px bg-current" /></div>
    </section>
  )
}
