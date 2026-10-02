import { motion } from 'framer-motion'
import { fadeUp, softEase, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import PaperTexture from '../decorations/PaperTexture'
import RoseDecor from '../decorations/RoseDecor'

/** Thin vertical editorial timeline on secondary paper. */
export default function Timeline() {
  return (
    <section className="relative bg-paper-2 px-8 py-24 overflow-hidden" aria-labelledby="timeline-heading">
      <PaperTexture opacity={0.07} />
      <RoseDecor image="pink-full" width={190} className="-right-24 -bottom-16" rotate={-20} flip opacity={0.9} delay={0.7} />
      <div className="pointer-events-none absolute -left-4 bottom-8 opacity-85 rotate-6">
        <BotanicalDecoration variant="wildflower" size={64} />
      </div>

      <motion.div
        className="relative"
        variants={staggerChildren(0.14)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h2 id="timeline-heading" variants={fadeUp} className="label text-center">
          The Dance Card
        </motion.h2>

        <div className="relative mt-14 mx-auto max-w-[17rem]">
          {/* Hairline spine that draws itself */}
          <motion.span
            aria-hidden="true"
            className="absolute left-1/2 top-2 bottom-2 w-px bg-burgundy/30 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.8, ease: softEase }}
          />

          <ol className="relative space-y-12">
            {wedding.timeline.map((item, i) => {
              const left = i % 2 === 0
              return (
                <motion.li key={item.title} variants={fadeUp} className="relative grid grid-cols-[1fr_auto_1fr] items-center">
                  {/* Time and title alternate sides for an editorial rhythm */}
                  <div className={`${left ? 'text-right pr-6' : 'order-3 text-left pl-6'}`}>
                    <span className="label-dark text-[10px]">{item.time}</span>
                  </div>
                  <span aria-hidden="true" className="order-2 block w-1.5 h-1.5 rounded-full bg-burgundy" />
                  <div className={`${left ? 'order-3 text-left pl-6' : 'text-right pr-6'}`}>
                    <span className="font-serif text-2xl text-charcoal leading-tight block">{item.title}</span>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </motion.div>
    </section>
  )
}
