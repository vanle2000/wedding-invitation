import { motion } from 'framer-motion'
import { fadeUp, softEase, staggerChildren, viewportOnce } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import RoseDecor from '../decorations/RoseDecor'
import SectionHeading from '../ui/SectionHeading'

/** A single-column editorial timeline optimized for narrow mobile screens. */
export default function Timeline() {
  return (
    <section className="stationery-section py-28" aria-labelledby="timeline-heading">
      <RoseDecor image="pink-bloom" width={145} className="-left-20 top-12 opacity-30" rotate={18} sway={false} />
      <div aria-hidden="true" className="absolute -right-6 bottom-8 opacity-22">
        <BotanicalDecoration variant="sprig" size={45} flip />
      </div>

      <SectionHeading id="timeline-heading" kicker="Order of the day" phrase="Every beautiful moment" title="A Day to Remember" />

      <div className="relative mx-auto mt-16 max-w-[19rem] pl-10">
        <motion.span
          aria-hidden="true"
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gold/55"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.35, ease: softEase }}
        />

        <motion.ol
          className="relative space-y-12"
          variants={staggerChildren(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {wedding.timeline.map((item) => (
            <motion.li key={`${item.time}-${item.title}`} variants={fadeUp} className="relative">
              <span aria-hidden="true" className="absolute -left-[37px] top-[5px] grid h-[9px] w-[9px] place-items-center rounded-full border border-burgundy/55 bg-paper">
                <span className="h-[3px] w-[3px] rounded-full bg-burgundy" />
              </span>
              <time className="label-dark block">{item.time}</time>
              <h3 className="mt-2 font-serif text-[1.65rem] leading-tight text-charcoal">{item.title}</h3>
              {item.detail && <p className="mt-1.5 font-serif text-base italic text-charcoal/62">{item.detail}</p>}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
