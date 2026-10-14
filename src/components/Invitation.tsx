import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { GoldDivider } from '../art/GoldOrnament'
import KetDongTamMark from '../art/KetDongTamMark'
import { GardenVine, SpringDivider } from '../art/SpringBotanical'
import { wedding } from '../content/wedding'

export default function Invitation() {
  return (
    <section className="canvas-section flex min-h-screen min-h-[100svh] flex-col items-center justify-center py-28 text-center" aria-labelledby="invitation-title">
      <GardenVine width={270} className="absolute -left-24 -top-2 opacity-48" animate /><GardenVine width={230} className="absolute -bottom-5 -right-20 opacity-38" flip /><BotanicalArt kind="peony" width="65%" className="-left-[30%] top-[5%] opacity-42" rotate={17} eager /><BotanicalArt kind="camellia" width="38%" className="-bottom-[2%] -right-[12%] opacity-60" rotate={-14} flip eager /><span aria-hidden="true" className="absolute inset-6 border border-gold/35" /><span aria-hidden="true" className="absolute inset-9 border border-gold/15" />

      <motion.div className="relative z-10 flex flex-col items-center" variants={stagger(0.14)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="eyebrow text-sage">Trân trọng báo hỷ</motion.p>
        <motion.p variants={fadeUp} className="mt-6 font-script text-[1.8rem] text-rose">Một đời đồng tâm</motion.p>
        <motion.div variants={fadeUp} className="mt-4"><KetDongTamMark initials={wedding.couple.initials} names={[wedding.couple.first, wedding.couple.second]} size={108} variant="line" /></motion.div>
        <motion.div variants={fadeUp} className="mt-2 text-gold"><SpringDivider /></motion.div>
        <motion.p variants={fadeUp} className="mt-5 font-sans text-[9px] uppercase tracking-label text-ink/60">Cùng gia đình hai bên</motion.p>
        <motion.h1 id="invitation-title" variants={fadeUp} className="mt-8 font-script text-[clamp(2.55rem,12vw,3.45rem)] leading-[1.02] text-rouge-deep">
          <span className="block">{wedding.couple.first}</span><span className="my-3 block font-serif text-xl italic text-gold">&amp;</span><span className="block">{wedding.couple.second}</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-10 max-w-[19rem] text-balance font-serif text-[1.15rem] leading-[1.75] text-ink/82">{wedding.story.introduction}</motion.p>
        <motion.p variants={fadeUp} className="mt-7 max-w-[19rem] text-balance font-serif text-[1.15rem] leading-[1.75] text-ink/82">Trân trọng kính mời bạn đến chung vui trong ngày lễ thành hôn của chúng mình.</motion.p>
        <motion.div variants={fadeUp} className="mt-10"><GoldDivider /></motion.div>
        <motion.p variants={fadeUp} className="mt-8 font-display text-base uppercase tracking-editorial leading-[2] text-rouge-deep">{wedding.date.long}</motion.p>
        <motion.p variants={fadeUp} className="eyebrow mt-6 text-sage">Goldland Plaza · Huế</motion.p>
      </motion.div>
      <div aria-hidden="true" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-gold/70"><span className="eyebrow-gold">Xem tiếp</span><span className="h-10 w-px bg-current" /></div>
    </section>
  )
}
