import { motion } from 'framer-motion'
import { fadeUp, softEase, stagger, viewportOnce } from '../animations/variants'
import { EvergreenBranch, HollyDivider, WinterSparkles } from '../art/WinterBotanical'
import PaperGrain from '../art/PaperGrain'
import { wedding } from '../content/wedding'
import SectionHeading from '../ui/SectionHeading'

export default function Timeline() {
  return (
    <section className="canvas-section overflow-hidden border-y border-gold/40 bg-evergreen py-28 text-ivory" aria-labelledby="timeline-title">
      <PaperGrain opacity={0.08} />
      <WinterSparkles className="absolute inset-0 h-full w-full opacity-25" />
      <EvergreenBranch width={225} className="absolute -right-20 -top-4 opacity-42" flip />
      <EvergreenBranch width={210} className="absolute -bottom-8 -left-20 opacity-35" />
      <SectionHeading id="timeline-title" kicker="Order of the day" phrase="Every moment, with you" title="Our Winter Celebration" dark />
      <div className="relative mx-auto mt-12 text-gold"><HollyDivider /></div>
      <div className="relative mx-auto mt-14 max-w-[19rem] pl-11">
        <motion.span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gold" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={viewportOnce} transition={{ duration: 1.3, ease: softEase }} />
        <motion.ol className="space-y-12" variants={stagger(0.14)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {wedding.timeline.map((moment) => <motion.li key={`${moment.time}-${moment.title}`} variants={fadeUp} className="relative"><span aria-hidden="true" className="absolute -left-[41px] top-1 grid h-[11px] w-[11px] place-items-center rounded-full border border-gold bg-evergreen"><span className="h-[3px] w-[3px] rounded-full bg-cranberry" /></span><time className="eyebrow-gold">{moment.time}</time><h3 className="mt-2 font-display text-[1.55rem] text-ivory">{moment.title}</h3><p className="mt-2 font-serif text-base italic text-ivory/65">{moment.note}</p></motion.li>)}
        </motion.ol>
      </div>
    </section>
  )
}
