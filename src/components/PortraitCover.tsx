import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { portraitCoverLift, softEase } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { GoldFrame } from '../art/GoldOrnament'
import KetDongTamMark from '../art/KetDongTamMark'
import PaperGrain from '../art/PaperGrain'
import { GardenVine, PetalDrift } from '../art/SpringBotanical'
import { wedding } from '../content/wedding'

type CoverPhase = 'entering' | 'ready' | 'lifting' | 'revealed' | 'leaving'

interface PortraitCoverProps {
  onComplete: () => void
}

/** One portrait cover lifting over one portrait invitation—no landscape expansion. */
export default function PortraitCover({ onComplete }: PortraitCoverProps) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<CoverPhase>('entering')
  const markRef = useRef<HTMLButtonElement>(null)
  const invitationRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (phase === 'ready') markRef.current?.focus({ preventScroll: true })
    if (phase === 'revealed') invitationRef.current?.focus({ preventScroll: true })
  }, [phase])

  const liftCover = () => {
    if (phase !== 'ready') return
    setPhase(reduceMotion ? 'revealed' : 'lifting')
  }

  const coverIsOpen = phase === 'lifting' || phase === 'revealed' || phase === 'leaving'

  return (
    <motion.div
      className="fixed inset-0 z-50 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-surround px-safe pt-safe pb-safe"
      role="dialog"
      aria-modal="true"
      aria-label="Mở thiệp cưới của Lê Tấn Phát và Dương Nguyệt Thảo"
      animate={{ opacity: phase === 'leaving' ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.65, ease: softEase }}
      onAnimationComplete={() => phase === 'leaving' && onComplete()}
    >
      <PaperGrain opacity={0.05} />
      <PetalDrift className="absolute inset-0" />
      <BotanicalArt kind="peony" width={220} className="-bottom-24 -left-24 opacity-30" rotate={14} eager reveal={false} />
      <BotanicalArt kind="camellia" width={125} className="-right-10 -top-4 opacity-35" rotate={-18} flip eager reveal={false} />

      <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center px-5">
        <motion.p className="eyebrow mb-6 text-center" initial={{ opacity: 0, y: 6 }} animate={{ opacity: phase === 'leaving' ? 0 : 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: softEase }}>
          Trân trọng kính mời
        </motion.p>

        {/* Height-aware width cap keeps the first card portrait in every orientation. */}
        <motion.div
          data-orientation="portrait"
          className="relative aspect-[4/5] w-[min(82vw,64svh,320px)] overflow-visible"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.25 : 0.95, ease: softEase }}
          onAnimationComplete={() => phase === 'entering' && setPhase('ready')}
        >
          {/* The ivory invitation remains fixed beneath the lifting cover. */}
          <GoldFrame className="absolute inset-0 bg-ivory p-3 shadow-[0_18px_38px_-24px_rgba(62,50,53,0.45)]">
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-4 text-center">
              <PaperGrain />
              <GardenVine width={190} className="absolute -left-14 -top-3 opacity-30" />
              <BotanicalArt kind="camellia" width="43%" className="-bottom-[8%] -right-[13%] opacity-52" rotate={-14} flip reveal={false} />
              <p className="relative font-script text-[1.55rem] text-rose">Một đời đồng tâm</p>
              <p className="relative mt-5 font-script text-[clamp(1.35rem,6.5vw,1.75rem)] leading-[1.08] text-rouge-deep">
                <span className="block whitespace-nowrap">{wedding.couple.first}</span>
                <span className="my-1.5 block font-serif text-base italic text-gold">&amp;</span>
                <span className="block whitespace-nowrap">{wedding.couple.second}</span>
              </p>
              <p className="relative mt-6 font-sans text-[9px] font-medium uppercase tracking-label text-rouge-deep/80">{wedding.date.display}</p>
            </div>
          </GoldFrame>

          {/* A single portrait folio cover. It lifts up, never sideways. */}
          <motion.div
            className="absolute inset-0 z-20 overflow-hidden border border-gold/70 bg-rouge shadow-[0_14px_34px_-24px_rgba(62,50,53,0.5)]"
            variants={portraitCoverLift}
            initial="closed"
            animate={coverIsOpen ? 'open' : 'closed'}
            transition={reduceMotion ? { duration: 0.01 } : undefined}
            onAnimationComplete={(definition) => phase === 'lifting' && definition === 'open' && setPhase('revealed')}
          >
            <PaperGrain opacity={0.065} />
            <span aria-hidden="true" className="absolute inset-3 border border-gold/40" />
            <span aria-hidden="true" className="absolute inset-6 border border-gold/15" />
            <GardenVine width={210} className="absolute -left-20 -top-4 opacity-28" />
            <GardenVine width={200} className="absolute -bottom-7 -right-20 opacity-24" flip />
            <div className="absolute inset-0 flex flex-col items-center justify-between px-6 py-10 text-center">
              <div>
                <p className="eyebrow-gold">Thiệp hỷ</p>
                <p className="mt-4 font-script text-2xl text-gold-light">Kết đồng tâm</p>
              </div>
              <motion.button
                ref={markRef}
                type="button"
                onClick={liftCover}
                disabled={phase !== 'ready'}
                className="relative grid h-[112px] w-[112px] place-items-center rounded-full disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-4 focus-visible:ring-offset-rouge"
                aria-label="Mở biểu tượng Kết Đồng Tâm"
                whileTap={phase === 'ready' ? { scale: 0.97 } : undefined}
              >
                {phase === 'ready' && <motion.span aria-hidden="true" className="absolute inset-1 rounded-full border border-gold-light/50" animate={{ scale: [1, 1.22], opacity: [0.5, 0] }} transition={{ duration: 2.3, repeat: Infinity, ease: 'easeOut' }} />}
                <KetDongTamMark size={94} />
              </motion.button>
              <p className="font-display text-sm uppercase tracking-editorial text-gold-light">14 · 02 · 2027</p>
            </div>
          </motion.div>

          {/* The revealed portrait invitation is the second intentional action. */}
          <motion.button
            ref={invitationRef}
            type="button"
            disabled={phase !== 'revealed'}
            onClick={() => phase === 'revealed' && setPhase('leaving')}
            className="absolute inset-0 z-10 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-surround"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'revealed' ? 1 : 0 }}
            transition={{ duration: 0.45, ease: softEase }}
            aria-label="Mở nội dung thiệp cưới"
          >
            <span className="absolute bottom-5 left-1/2 min-h-[36px] -translate-x-1/2 whitespace-nowrap border-b border-gold/70 font-sans text-[9px] font-medium uppercase tracking-label text-rouge-deep">Mở thiệp cưới</span>
          </motion.button>
        </motion.div>

        <motion.p key={phase} className="mt-6 min-h-[16px] font-sans text-[9px] font-medium uppercase tracking-label text-rouge-deep/80" initial={{ opacity: 0, y: 3 }} animate={{ opacity: phase === 'leaving' ? 0 : 1, y: 0 }} transition={{ duration: 0.4, ease: softEase }} aria-live="polite">
          {phase === 'ready' ? 'Chạm vào biểu tượng để mở' : phase === 'revealed' ? 'Thiệp hồng đã mở' : ''}
        </motion.p>
      </div>
    </motion.div>
  )
}
