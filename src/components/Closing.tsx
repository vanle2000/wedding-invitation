import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { softEase } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { GoldDivider } from '../art/GoldOrnament'
import PaperGrain from '../art/PaperGrain'
import { wedding } from '../content/wedding'
import Reveal from '../ui/Reveal'

/** “Le dernier pétale”: a red camellia reveals the final letter. */
export default function Closing() {
  const [open, setOpen] = useState(false)
  return (
    <footer className="relative overflow-hidden border-t border-gold/45 bg-wine px-7 pt-28 text-center text-ivory" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}>
      <PaperGrain opacity={0.075} />
      <BotanicalArt kind="peony" width="70%" className="-left-[34%] -top-[3%] opacity-18" rotate={18} />
      <Reveal className="relative">
        <p className="eyebrow-gold">Le dernier pétale</p>
        <p className="mt-5 font-script text-3xl text-gold-light">Une dernière lettre</p>
        <h2 className="mx-auto mt-5 max-w-[19rem] text-balance font-display text-[2rem] leading-tight">The garden keeps one final secret.</h2>
        <GoldDivider className="mt-8" />
        <p className="mx-auto mt-8 max-w-[17rem] text-balance font-serif text-lg italic leading-relaxed text-ivory/68">Touch the camellia to open our last note.</p>
      </Reveal>

      <div className="relative mx-auto mt-8 h-36 w-36">
        <motion.button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="last-letter" className="relative grid h-36 w-36 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-wine" whileTap={{ scale: 0.97 }}>
          <motion.img src={`${import.meta.env.BASE_URL}images/camellia-red.webp`} alt="" width="327" height="334" className="h-32 w-32 object-contain" animate={{ rotate: open ? -8 : 0, scale: open ? 1.06 : 1 }} transition={{ duration: 0.65, ease: softEase }} />
          <span className="sr-only">{open ? 'Close the final love letter' : 'Open the final love letter'}</span>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div id="last-letter" initial={{ height: 0, opacity: 0, y: -10 }} animate={{ height: 'auto', opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: -8 }} transition={{ duration: 0.7, ease: softEase }} className="relative overflow-hidden">
            <div className="mx-auto mt-8 max-w-[20rem] border-y border-gold/45 py-10">
              <p className="text-balance font-serif text-[1.2rem] italic leading-[1.75] text-ivory/84">{wedding.story.closing}</p>
              <p className="mt-9 font-script text-3xl text-gold-light">Avec tout notre amour,</p>
              <p className="mt-4 font-display text-[1.6rem] text-ivory">{wedding.couple.first} <span className="font-serif italic text-gold">&amp;</span> {wedding.couple.second}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mt-20"><p className="font-script text-[3rem] text-gold-light">P <span className="font-serif text-2xl italic text-gold">&amp;</span> T</p><p className="eyebrow-gold mt-5">{wedding.date.french} · Goldland Plaza</p></div>
    </footer>
  )
}
