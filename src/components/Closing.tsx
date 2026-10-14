import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { softEase } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import Candlelight from '../art/Candlelight'
import { GoldDivider } from '../art/GoldOrnament'
import PaperGrain from '../art/PaperGrain'
import { EvergreenBranch, WinterSparkles } from '../art/WinterBotanical'
import { wedding } from '../content/wedding'
import Reveal from '../ui/Reveal'

/** Original closing: light the ceremonial candles to reveal the final letter. */
export default function Closing() {
  const [lit, setLit] = useState(false)
  return (
    <footer className="relative overflow-hidden border-t border-gold/45 bg-wine px-7 pt-28 text-center text-ivory" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}>
      <PaperGrain opacity={0.08} />
      <WinterSparkles className="absolute inset-0 h-full w-full opacity-28" />
      <EvergreenBranch width={260} className="absolute -left-24 -top-4 opacity-45" />
      <EvergreenBranch width={240} className="absolute -bottom-10 -right-24 opacity-38" flip />
      <BotanicalArt kind="camellia" width="34%" className="-right-[13%] top-[12%] opacity-38" rotate={-18} flip />

      <Reveal className="relative">
        <p className="eyebrow-gold">One final light</p>
        <p className="mt-5 font-script text-3xl text-gold-light">Une saison pour toujours</p>
        <h2 className="mx-auto mt-5 max-w-[19rem] text-balance font-display text-[2rem] leading-tight">Carry this candlelight with you.</h2>
        <GoldDivider className="mt-8" />
        <p className="mx-auto mt-8 max-w-[17rem] text-balance font-serif text-lg italic leading-relaxed text-ivory/68">Light the candles to open our final note.</p>
      </Reveal>

      <motion.button type="button" onClick={() => setLit((value) => !value)} aria-expanded={lit} aria-controls="candle-letter" className="relative mx-auto mt-8 block min-h-[150px] w-full max-w-[240px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-wine" whileTap={{ scale: 0.985 }}>
        <Candlelight lit={lit} className="h-auto w-full" />
        <span className="eyebrow-gold mt-2 block">{lit ? 'Extinguish the candles' : 'Light the candles'}</span>
      </motion.button>

      <AnimatePresence initial={false}>
        {lit && <motion.div id="candle-letter" initial={{ height: 0, opacity: 0, y: -10 }} animate={{ height: 'auto', opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: -8 }} transition={{ duration: 0.7, ease: softEase }} className="relative overflow-hidden"><div className="mx-auto mt-10 max-w-[20rem] border-y border-gold/45 py-10"><p className="text-balance font-serif text-[1.2rem] italic leading-[1.75] text-ivory/84">{wedding.story.closing}</p><p className="mt-9 font-script text-3xl text-gold-light">With all our love,</p><p className="mt-4 font-display text-[1.6rem] text-ivory">{wedding.couple.first} <span className="font-serif italic text-gold">&amp;</span> {wedding.couple.second}</p></div></motion.div>}
      </AnimatePresence>

      <div className="relative mt-20"><p className="font-script text-[3rem] text-gold-light">P <span className="font-serif text-2xl italic text-gold">&amp;</span> T</p><p className="eyebrow-gold mt-5">{wedding.date.french} · Goldland Plaza</p></div>
    </footer>
  )
}
