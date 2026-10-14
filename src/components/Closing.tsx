import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { softEase } from '../animations/variants'
import BotanicalCorners from '../art/BotanicalCorners'
import { GoldDivider } from '../art/GoldOrnament'
import PaperGrain from '../art/PaperGrain'
import { wedding } from '../content/wedding'
import Reveal from '../ui/Reveal'

/** The same archival peony artwork becomes the final interactive flower. */
export default function Closing() {
  const [open, setOpen] = useState(false)
  return (
    <footer className="relative overflow-hidden border-t border-trim/40 bg-rouge px-7 pt-28 text-center text-ivory" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}>
      <PaperGrain opacity={0.065} />
      <BotanicalCorners dark />
      <Reveal className="relative z-10">
        <p className="section-label-light">Một đóa hoa cuối</p>
        <p className="romantic-script mt-5 text-3xl text-gold-light">Đồng tâm, đồng hành</p>
        <h2 className="mx-auto mt-5 max-w-[19rem] text-balance font-display text-[1.9rem] font-light leading-[1.3]">Mỗi cánh hoa giữ một lời thương.</h2>
        <GoldDivider className="mt-8" />
        <p className="mx-auto mt-8 max-w-[17rem] text-balance font-serif text-lg italic leading-relaxed text-ivory/72">Chạm vào hoa mẫu đơn để mở lời nhắn cuối của chúng mình.</p>
      </Reveal>

      <motion.button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="loi-nhan-cuoi" className="relative z-10 mx-auto mt-7 grid min-h-[180px] w-[180px] place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-4 focus-visible:ring-offset-rouge" whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
        <motion.img src={`${import.meta.env.BASE_URL}images/peony-antique.webp`} alt="" width="1068" height="1250" className="h-[168px] w-[150px] object-contain mix-blend-multiply" initial={false} animate={{ scale: open ? 1.06 : 0.96, rotate: open ? -3 : 0, opacity: open ? 1 : 0.82 }} transition={{ duration: 0.7, ease: softEase }} />
        <span className="eyebrow-gold absolute bottom-0">{open ? 'Khép lời nhắn' : 'Mở lời nhắn'}</span>
      </motion.button>

      <AnimatePresence initial={false}>{open && <motion.div id="loi-nhan-cuoi" initial={{ height: 0, opacity: 0, y: -10 }} animate={{ height: 'auto', opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: -8 }} transition={{ duration: 0.7, ease: softEase }} className="relative z-10 overflow-hidden"><div className="mx-auto mt-10 max-w-[20rem] border-y border-gold-light/45 py-10"><p className="text-balance font-serif text-[1.15rem] italic leading-[1.78] text-ivory/84">{wedding.story.closing}</p><p className="romantic-script mt-9 text-3xl text-gold-light">Thương mến,</p><p className="mt-4 font-display text-[1.25rem] font-light leading-[1.6] text-ivory">{wedding.couple.first}<br /><span className="font-serif italic text-gold-light">&amp;</span><br />{wedding.couple.second}</p></div></motion.div>}</AnimatePresence>

      <div className="relative z-10 mt-20"><p className="foil-text font-script text-[3rem] leading-[1.3]">P <span className="font-serif text-2xl italic">&amp;</span> T</p><p className="section-label-light mt-5">{wedding.date.display} · Goldland Plaza</p></div>
    </footer>
  )
}
