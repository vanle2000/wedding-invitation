import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'
import BotanicalCorners from '../art/BotanicalCorners'
import { GoldDivider } from '../art/GoldOrnament'
import PaperGrain from '../art/PaperGrain'
import { wedding } from '../content/wedding'

export default function Details() {
  return (
    <section className="canvas-section overflow-hidden border-y border-trim/40 bg-rouge py-28 text-center text-ivory" aria-label="Thông tin hôn lễ">
      <PaperGrain opacity={0.065} />
      <BotanicalCorners dark mirror />
      <motion.div className="relative z-10 flex flex-col items-center" variants={stagger(0.14)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="section-label-light">Thông tin hôn lễ</motion.p>
        <motion.p variants={fadeUp} className="romantic-script mt-5 text-[1.8rem] text-gold-light">Ngày chung đôi</motion.p>
        <motion.div variants={fadeUp} className="mt-8"><GoldDivider /></motion.div>
        <motion.div variants={fadeUp} className="mt-9">
          <p className="section-label-light">{wedding.date.month}</p>
          <p className="mt-2 font-display text-[6rem] font-light leading-[0.85] text-ivory">{wedding.date.day}</p>
          <p className="mt-6 font-display text-xl font-light tracking-editorial text-gold-light">{wedding.date.year}</p>
          <p className="section-label-light mt-5">{wedding.date.weekday}</p>
        </motion.div>
        <motion.div variants={fadeUp} className="my-12"><GoldDivider /></motion.div>
        <motion.div variants={fadeUp} className="flex w-full max-w-[20rem] items-stretch">
          <div className="flex-1 px-3"><p className="section-label-light">{wedding.ceremony.label}</p><p className="mt-4 font-serif text-[1.8rem]">{wedding.ceremony.time}</p></div>
          <span className="w-px bg-gold-light/45" />
          <div className="flex-1 px-3"><p className="section-label-light">{wedding.reception.label}</p><p className="mt-4 font-serif text-[1.8rem]">{wedding.reception.time}</p></div>
        </motion.div>
        <motion.p variants={fadeUp} className="mt-12 max-w-[18rem] text-balance font-serif text-lg italic leading-relaxed text-ivory/72">Hai khoảnh khắc đẹp, một lời nguyện ước và trọn đời bên nhau.</motion.p>
      </motion.div>
    </section>
  )
}
