import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'
import BotanicalCorners from '../art/BotanicalCorners'
import { GoldDivider } from '../art/GoldOrnament'
import KetDongTamMark from '../art/KetDongTamMark'
import { wedding } from '../content/wedding'

export default function Invitation() {
  return (
    <section className="canvas-section flex min-h-screen min-h-[100svh] flex-col items-center justify-center py-28 text-center" aria-labelledby="invitation-title">
      <BotanicalCorners />
      <span aria-hidden="true" className="absolute inset-6 border border-trim/40" />
      <span aria-hidden="true" className="absolute inset-9 border border-gold/15" />

      <motion.div className="relative z-10 flex flex-col items-center" variants={stagger(0.14)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="section-label">Trân trọng báo hỷ</motion.p>
        <motion.p variants={fadeUp} className="romantic-script mt-6 text-[1.8rem] text-rose">Một đời đồng tâm</motion.p>
        <motion.div variants={fadeUp} className="mt-4"><KetDongTamMark size={108} variant="line" /></motion.div>
        <motion.div variants={fadeUp} className="mt-4"><GoldDivider /></motion.div>
        <motion.p variants={fadeUp} className="section-label mt-6">Cùng gia đình hai bên</motion.p>

        <motion.h1 id="invitation-title" variants={fadeUp} className="mt-9 font-display text-[clamp(1.65rem,7.2vw,2.15rem)] font-light leading-[1.48] tracking-[0.035em] text-rouge-deep">
          <span className="block whitespace-nowrap">{wedding.couple.first}</span>
          <span className="my-1 block font-serif text-lg italic tracking-normal text-gold">&amp;</span>
          <span className="block whitespace-nowrap">{wedding.couple.second}</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-10 max-w-[19rem] text-balance font-serif text-[1.1rem] leading-[1.78] text-ink/82">{wedding.story.introduction}</motion.p>
        <motion.p variants={fadeUp} className="mt-7 max-w-[19rem] text-balance font-serif text-[1.1rem] leading-[1.78] text-ink/82">Trân trọng kính mời bạn đến chung vui trong ngày lễ thành hôn của chúng mình.</motion.p>
        <motion.div variants={fadeUp} className="mt-10"><GoldDivider /></motion.div>
        <motion.p variants={fadeUp} className="section-label mt-8">{wedding.date.long}</motion.p>
        <motion.p variants={fadeUp} className="section-label mt-5 text-sage">Goldland Plaza · Huế</motion.p>
      </motion.div>

      <div aria-hidden="true" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-gold/70"><span className="section-label">Xem tiếp</span><span className="h-10 w-px bg-current" /></div>
    </section>
  )
}
