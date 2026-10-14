import { motion } from 'framer-motion'
import { fadeUp, softEase, stagger, viewportOnce } from '../animations/variants'
import BotanicalCorners from '../art/BotanicalCorners'
import { wedding } from '../content/wedding'
import SectionHeading from '../ui/SectionHeading'

export default function Timeline() {
  return (
    <section className="canvas-section overflow-hidden border-y border-trim/30 bg-sage-light/55 py-28" aria-labelledby="timeline-title">
      <BotanicalCorners dark />
      <SectionHeading id="timeline-title" kicker="Lịch trình ngày vui" phrase="Từng khoảnh khắc bên nhau" title="Ngày Vui Trọn Vẹn" />
      <div className="relative mx-auto mt-16 max-w-[19rem] pl-11">
        <motion.span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gold" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={viewportOnce} transition={{ duration: 1.3, ease: softEase }} />
        <motion.ol className="space-y-12" variants={stagger(0.14)} initial="hidden" whileInView="visible" viewport={viewportOnce}>{wedding.timeline.map((moment) => <motion.li key={`${moment.time}-${moment.title}`} variants={fadeUp} className="relative"><span aria-hidden="true" className="absolute -left-[41px] top-1 grid h-[11px] w-[11px] place-items-center rounded-full border border-gold bg-ivory"><span className="h-[3px] w-[3px] rounded-full bg-camellia" /></span><time className="section-label text-rouge-deep">{moment.time}</time><h3 className="mt-2 font-display text-[1.45rem] font-light leading-snug text-rouge-deep">{moment.title}</h3><p className="mt-2 font-serif text-base italic text-ink/62">{moment.note}</p></motion.li>)}</motion.ol>
      </div>
    </section>
  )
}
