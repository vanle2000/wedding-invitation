import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { softEase } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { GoldDivider } from '../art/GoldOrnament'
import PaperGrain from '../art/PaperGrain'
import { BloomMark, GardenVine } from '../art/SpringBotanical'
import { wedding } from '../content/wedding'
import Reveal from '../ui/Reveal'

/** Senior-level closing: a peony blooms to reveal the final letter. */
export default function Closing() {
  const [open, setOpen] = useState(false)
  return (
    <footer className="relative overflow-hidden border-t border-gold/45 bg-rouge px-7 pt-28 text-center text-ivory" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}>
      <PaperGrain opacity={0.06} />
      <GardenVine width={265} className="absolute -left-24 -top-4 opacity-42" />
      <GardenVine width={235} className="absolute -bottom-10 -right-24 opacity-32" flip />
      <BotanicalArt kind="camellia" width="33%" className="-right-[12%] top-[11%] opacity-32" rotate={-17} flip />

      <Reveal className="relative">
        <p className="eyebrow-gold">One final bloom</p>
        <p className="mt-5 font-script text-3xl text-gold-light">Le printemps de l&rsquo;amour</p>
        <h2 className="mx-auto mt-5 max-w-[19rem] text-balance font-display text-[2rem] leading-tight">The garden keeps one last letter.</h2>
        <GoldDivider className="mt-8" />
        <p className="mx-auto mt-8 max-w-[17rem] text-balance font-serif text-lg italic leading-relaxed text-ivory/68">Touch the peony and let our final words bloom.</p>
      </Reveal>

      <motion.button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="spring-letter" className="relative mx-auto mt-7 grid min-h-[170px] w-[170px] place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rouge" whileTap={{ scale: 0.985 }}>
        <BloomMark open={open} className="h-[155px] w-[145px]" />
        <span className="eyebrow-gold absolute bottom-0">{open ? 'Fold the letter' : 'Open the flower'}</span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && <motion.div id="spring-letter" initial={{ height: 0, opacity: 0, y: -10 }} animate={{ height: 'auto', opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: -8 }} transition={{ duration: 0.7, ease: softEase }} className="relative overflow-hidden"><div className="mx-auto mt-10 max-w-[20rem] border-y border-gold/45 py-10"><p className="text-balance font-serif text-[1.2rem] italic leading-[1.75] text-ivory/84">{wedding.story.closing}</p><p className="mt-9 font-script text-3xl text-gold-light">Avec tout notre amour,</p><p className="mt-4 font-display text-[1.6rem] text-ivory">{wedding.couple.first} <span className="font-serif italic text-gold">&amp;</span> {wedding.couple.second}</p></div></motion.div>}
      </AnimatePresence>

      <div className="relative mt-20"><p className="font-script text-[3rem] text-gold-light">P <span className="font-serif text-2xl italic text-gold">&amp;</span> T</p><p className="eyebrow-gold mt-5">{wedding.date.french} · Goldland Plaza</p></div>
    </footer>
  )
}
