import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { GoldDivider } from '../art/GoldOrnament'
import PaperGrain from '../art/PaperGrain'
import { GardenVine, SpringDivider } from '../art/SpringBotanical'
import { wedding } from '../content/wedding'

export default function Details() {
  return (
    <section className="canvas-section overflow-hidden border-y border-gold/45 bg-rouge py-28 text-center text-ivory" aria-label="Thông tin hôn lễ">
      <PaperGrain opacity={0.06} /><GardenVine width={245} className="absolute -right-20 -top-6 opacity-45" flip /><GardenVine width={210} className="absolute -bottom-8 -left-20 opacity-32" /><BotanicalArt kind="camellia" width="38%" className="-right-[15%] bottom-[3%] opacity-24" rotate={-19} flip />
      <motion.div className="relative z-10 flex flex-col items-center" variants={stagger(0.14)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="eyebrow-gold">Thông tin hôn lễ</motion.p><motion.p variants={fadeUp} className="mt-5 font-script text-[1.8rem] text-gold-light">Ngày chung đôi</motion.p><motion.div variants={fadeUp} className="mt-7 text-gold-light"><SpringDivider /></motion.div>
        <motion.div variants={fadeUp} className="mt-9"><p className="font-display text-[1.45rem] uppercase tracking-editorial text-gold-light">{wedding.date.month}</p><p className="mt-1 font-display text-[6.2rem] leading-[0.8] text-ivory">{wedding.date.day}</p><p className="mt-6 font-serif text-2xl tracking-[0.24em] text-gold-light">{wedding.date.year}</p><p className="eyebrow-gold mt-5">{wedding.date.weekday}</p></motion.div>
        <motion.div variants={fadeUp} className="my-12"><GoldDivider /></motion.div>
        <motion.div variants={fadeUp} className="flex w-full max-w-[20rem] items-stretch"><div className="flex-1 px-3"><p className="eyebrow-gold">{wedding.ceremony.label}</p><p className="mt-4 font-serif text-[1.8rem]">{wedding.ceremony.time}</p></div><span className="w-px bg-gold/55" /><div className="flex-1 px-3"><p className="eyebrow-gold">{wedding.reception.label}</p><p className="mt-4 font-serif text-[1.8rem]">{wedding.reception.time}</p></div></motion.div>
        <motion.p variants={fadeUp} className="mt-12 max-w-[18rem] text-balance font-serif text-lg italic leading-relaxed text-ivory/72">Hai khoảnh khắc đẹp, một lời nguyện ước và trọn đời bên nhau.</motion.p>
      </motion.div>
    </section>
  )
}
