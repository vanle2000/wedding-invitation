import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { fadeUp, softEase, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import OrnamentalDivider from '../decorations/OrnamentalDivider'
import RoseDecor from '../decorations/RoseDecor'
import WaxSeal from '../decorations/WaxSeal'

/**
 * Memorable closing: guests press a small seal to unfold the couple's final
 * love note. The paragraph remains editorial serif; script is reserved for
 * the intimate sign-off.
 */
export default function Closing() {
  const [open, setOpen] = useState(false)
  const { couple, date, closing } = wedding

  return (
    <footer className="relative px-7 pt-24 text-center" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}>
      <RoseDecor image="pink-full" width={185} className="-left-24 top-6 opacity-38" rotate={17} sway={false} />
      <RoseDecor image="coral-full" width={175} className="-right-24 bottom-2 opacity-30" rotate={-17} flip sway={false} />

      <motion.div variants={staggerChildren(0.16)} initial="hidden" whileInView="visible" viewport={viewportOnce} className="relative">
        <motion.p variants={fadeUp} className="label">{closing.prelude}</motion.p>
        <motion.h2 variants={fadeUp} className="mx-auto mt-5 max-w-[19rem] text-balance font-display text-[2.15rem] leading-[1.15] text-burgundy">
          The Next Chapter Begins With You
        </motion.h2>
        <motion.div variants={fadeUp} className="mt-8 text-gold">
          <OrnamentalDivider variant="leaf" width={132} />
        </motion.div>

        <motion.p variants={fadeUp} className="mx-auto mt-9 max-w-[18rem] text-balance font-serif text-lg italic leading-relaxed text-charcoal/68">
          There is one last message waiting beneath the seal.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center">
          <motion.button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="final-love-note"
            className="grid h-[78px] w-[78px] place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
            whileTap={{ scale: 0.96 }}
          >
            <WaxSeal initials={couple.initials} names={[couple.first, couple.second]} size={74} />
            <span className="sr-only">{open ? 'Fold the final love note' : 'Open the final love note'}</span>
          </motion.button>
          <span className="label mt-4">{open ? 'Fold the note' : 'Press the seal'}</span>
        </motion.div>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="final-love-note"
            key="note"
            initial={{ height: 0, opacity: 0, y: -12 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.75, ease: softEase }}
            className="relative overflow-hidden"
          >
            <div className="mx-auto mt-12 max-w-[20rem] border-y border-gold/38 py-10">
              <div aria-hidden="true" className="mx-auto mb-8 w-fit opacity-45">
                <BotanicalDecoration variant="olive-branch" size={150} />
              </div>
              <p className="text-balance font-serif text-[1.25rem] italic leading-[1.7] text-charcoal/84">{closing.note}</p>
              <p className="mt-9 font-script text-2xl text-rose">{closing.signoff}</p>
              <p className="mt-4 font-display text-[1.65rem] text-burgundy">
                {couple.first} <span className="font-serif text-lg italic text-rose">&amp;</span> {couple.second}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mt-20">
        <p className="font-display text-3xl tracking-[0.14em] text-burgundy">P <span className="font-serif text-2xl italic text-rose">&amp;</span> T</p>
        <p className="label mt-5">{date.numeric} · Goldland Plaza</p>
        <div aria-hidden="true" className="mx-auto mt-8 w-fit opacity-24">
          <BotanicalDecoration variant="landscape" size={310} />
        </div>
      </div>
    </footer>
  )
}
