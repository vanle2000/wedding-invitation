import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { GoldDivider } from '../art/GoldOrnament'
import { wedding } from '../content/wedding'

/** Opening correspondence page—the names are the only dominant script typography. */
export default function Invitation() {
  return (
    <section className="canvas-section flex min-h-screen min-h-[100svh] flex-col items-center justify-center py-28 text-center" aria-labelledby="invitation-title">
      <BotanicalArt kind="peony" width="76%" className="-left-[34%] -top-[8%] opacity-55" rotate={18} eager />
      <BotanicalArt kind="camellia" width="42%" className="-bottom-[2%] -right-[13%] opacity-65" rotate={-16} flip eager />
      <span aria-hidden="true" className="absolute inset-6 border border-gold/30" />
      <span aria-hidden="true" className="absolute inset-9 border border-gold/15" />

      <motion.div className="relative z-10 flex flex-col items-center" variants={stagger(0.14)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="eyebrow">Le Jardin Écarlate</motion.p>
        <motion.p variants={fadeUp} className="mt-6 font-script text-2xl text-rose">L&rsquo;amour nous réunit</motion.p>
        <motion.p variants={fadeUp} className="mt-7 font-sans text-[9px] uppercase tracking-label text-ink/60">Together with their families</motion.p>

        <motion.h1 id="invitation-title" variants={fadeUp} className="mt-8 font-script text-[clamp(4rem,19vw,5.4rem)] leading-[0.82] text-oxblood">
          {wedding.couple.first}
          <span className="my-4 block font-serif text-2xl italic text-gold">&amp;</span>
          {wedding.couple.second}
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-10 max-w-[19rem] text-balance font-serif text-[1.2rem] leading-[1.7] text-ink/82">
          request the honour of your presence as they exchange vows and begin their forever.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10"><GoldDivider /></motion.div>
        <motion.p variants={fadeUp} className="mt-8 whitespace-pre-line font-display text-base uppercase tracking-editorial leading-[2] text-oxblood">{wedding.date.long}</motion.p>
        <motion.p variants={fadeUp} className="eyebrow mt-6">Goldland Plaza · Huế</motion.p>
      </motion.div>

      <div aria-hidden="true" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-gold/70">
        <span className="eyebrow-gold">Découvrir</span><span className="h-10 w-px bg-current" />
      </div>
    </section>
  )
}
