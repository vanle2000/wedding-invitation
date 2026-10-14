import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'
import { GoldDivider } from '../art/GoldOrnament'
import KetDongTamMark from '../art/KetDongTamMark'
import PeonyGardenBackdrop from '../art/PeonyGardenBackdrop'
import PaperGrain from '../art/PaperGrain'
import { wedding } from '../content/wedding'

/** Central semi-transparent cardstock nested inside a photographic peony garden. */
export default function Invitation() {
  return (
    <section className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-5 py-20 text-center" aria-labelledby="invitation-title">
      <PeonyGardenBackdrop />

      <motion.article
        className="photographic-card relative z-20 mx-auto w-full max-w-[340px] border border-trim/45 px-7 py-14 shadow-[0_22px_55px_-30px_rgba(44,37,35,0.5)]"
        variants={stagger(0.14)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <PaperGrain opacity={0.04} />
        <span aria-hidden="true" className="absolute inset-[7px] border border-gold/25" />
        <div className="relative z-10 flex flex-col items-center">
          <motion.p variants={fadeUp} className="section-label">Trân trọng báo hỷ</motion.p>
          <motion.p variants={fadeUp} className="romantic-script mt-5 text-[1.8rem] text-rose">Một đời đồng tâm</motion.p>
          <motion.div variants={fadeUp} className="mt-3"><KetDongTamMark size={96} variant="line" /></motion.div>
          <motion.div variants={fadeUp} className="mt-3"><GoldDivider /></motion.div>
          <motion.p variants={fadeUp} className="section-label mt-6">Cùng gia đình hai bên</motion.p>

          <motion.h1 id="invitation-title" variants={fadeUp} className="mt-8 font-display text-[clamp(1.55rem,6.7vw,2rem)] font-light leading-[1.5] tracking-[0.03em] text-rouge-deep">
            <span className="block whitespace-nowrap">{wedding.couple.first}</span>
            <span className="my-1 block font-serif text-base italic tracking-normal text-gold">&amp;</span>
            <span className="block whitespace-nowrap">{wedding.couple.second}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-9 max-w-[18rem] text-balance font-serif text-base leading-[1.8] text-ink/84">{wedding.story.introduction}</motion.p>
          <motion.p variants={fadeUp} className="mt-6 max-w-[18rem] text-balance font-serif text-base leading-[1.8] text-ink/84">Trân trọng kính mời bạn đến chung vui trong ngày lễ thành hôn của chúng mình.</motion.p>
          <motion.div variants={fadeUp} className="mt-9"><GoldDivider /></motion.div>
          <motion.p variants={fadeUp} className="section-label mt-7">{wedding.date.long}</motion.p>
          <motion.p variants={fadeUp} className="section-label mt-4 text-sage">Goldland Plaza · Huế</motion.p>
        </div>
      </motion.article>
    </section>
  )
}
