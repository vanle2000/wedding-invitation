import { motion } from 'framer-motion'
import { fadeIn, slowScale, softEase } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import Monogram from '../decorations/Monogram'
import OrnamentalDivider from '../decorations/OrnamentalDivider'
import RoseDecor from '../decorations/RoseDecor'

interface MonogramRevealProps {
  active: boolean
}

/** The insert becomes the first page: an airy monogram bridge into the story. */
export default function MonogramReveal({ active }: MonogramRevealProps) {
  return (
    <section className="relative flex min-h-[88vh] min-h-[88svh] flex-col items-center justify-center px-7 py-24 text-center" aria-label="Phát and Thảo monogram">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[72%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-paper-2/45" />
      <RoseDecor image="pink-bloom" width={180} className="-right-16 top-6 opacity-45" rotate={-18} flip sway={false} />
      <RoseDecor image="coral-bloom" width={150} className="-left-16 bottom-16 opacity-30" rotate={20} sway={false} />

      <motion.div variants={slowScale} initial="hidden" animate={active ? 'visible' : 'hidden'} className="relative text-burgundy">
        <Monogram initials={wedding.couple.initials} size={218} color="#743345" />
      </motion.div>

      <motion.div variants={fadeIn} initial="hidden" animate={active ? 'visible' : 'hidden'} transition={{ delay: 0.65, duration: 0.9, ease: softEase }} className="relative mt-8">
        <p className="font-script text-2xl text-rose">A love letter, sealed for you</p>
        <p className="label-dark mt-5">{wedding.date.numeric} · Huế</p>
        <div className="mt-8 text-gold">
          <OrnamentalDivider variant="leaf" width={130} />
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.65 : 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <span className="label text-[9px]">Continue</span>
        <span className="h-9 w-px bg-gold/55" />
      </motion.div>

      <div aria-hidden="true" className="absolute -bottom-8 right-4 opacity-30">
        <BotanicalDecoration variant="sprig" size={36} />
      </div>
    </section>
  )
}
