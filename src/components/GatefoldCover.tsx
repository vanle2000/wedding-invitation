import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { gateLeft, gateRight, softEase } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { GoldFrame } from '../art/GoldOrnament'
import PaperGrain from '../art/PaperGrain'
import RoyalMedallion from '../art/RoyalMedallion'
import { GardenVine, PetalDrift } from '../art/SpringBotanical'
import { wedding } from '../content/wedding'

type CoverPhase = 'entering' | 'ready' | 'opening' | 'revealed' | 'leaving'

interface GatefoldCoverProps {
  onComplete: () => void
}

/** Lifted-rouge French garden folio with a gold P&T clasp. */
export default function GatefoldCover({ onComplete }: GatefoldCoverProps) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<CoverPhase>('entering')
  const sealRef = useRef<HTMLButtonElement>(null)
  const enterRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (phase === 'ready') sealRef.current?.focus({ preventScroll: true })
    if (phase === 'revealed') enterRef.current?.focus({ preventScroll: true })
  }, [phase])

  const open = () => {
    if (phase !== 'ready') return
    setPhase(reduceMotion ? 'revealed' : 'opening')
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-surround px-safe pt-safe pb-safe"
      role="dialog"
      aria-modal="true"
      aria-label="Open Phát and Thảo's spring wedding invitation"
      animate={{ opacity: phase === 'leaving' ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.65, ease: softEase }}
      onAnimationComplete={() => phase === 'leaving' && onComplete()}
    >
      <PaperGrain opacity={0.055} />
      <PetalDrift className="absolute inset-0" />
      <BotanicalArt kind="peony" width={235} className="-bottom-24 -left-24 opacity-42" rotate={15} eager reveal={false} />
      <BotanicalArt kind="camellia" width={135} className="-right-10 -top-5 opacity-48" rotate={-20} flip eager reveal={false} />

      <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center px-5">
        <motion.p className="eyebrow mb-6 text-center text-rouge-deep" initial={{ opacity: 0, y: 6 }} animate={{ opacity: phase === 'leaving' ? 0 : 1, y: 0 }} transition={{ duration: 0.75, delay: 0.2, ease: softEase }}>
          Une invitation de printemps
        </motion.p>

        <motion.div
          className="relative aspect-[4/5] w-[min(82vw,320px)] [perspective:1000px]"
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.25 : 1, ease: softEase }}
          onAnimationComplete={() => phase === 'entering' && setPhase('ready')}
        >
          <GoldFrame className="absolute inset-[4%] bg-ivory p-3 shadow-[0_18px_38px_-24px_rgba(62,50,53,0.45)]">
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-5 text-center">
              <PaperGrain />
              <GardenVine width={195} className="absolute -left-14 -top-3 opacity-35" />
              <BotanicalArt kind="camellia" width="45%" className="-bottom-[8%] -right-[14%] opacity-60" rotate={-14} flip reveal={false} />
              <p className="relative font-script text-xl text-rose">Le printemps de l&rsquo;amour</p>
              <p className="relative mt-6 font-script text-[clamp(2.6rem,13vw,3.5rem)] leading-[0.94] text-rouge-deep">
                {wedding.couple.first}<span className="my-2 block font-serif text-xl italic text-gold">&amp;</span>{wedding.couple.second}
              </p>
              <p className="relative mt-7 font-sans text-[8px] uppercase tracking-label text-ink/65">{wedding.date.french}</p>
            </div>
          </GoldFrame>

          <motion.div className="absolute bottom-0 left-0 top-0 z-20 w-1/2 origin-left overflow-hidden border-y border-l border-gold/70 bg-rouge" variants={gateLeft} initial="closed" animate={phase === 'opening' || phase === 'revealed' || phase === 'leaving' ? 'open' : 'closed'} style={{ transformStyle: 'preserve-3d' }}>
            <PaperGrain opacity={0.07} />
            <span aria-hidden="true" className="absolute inset-3 border border-gold/40" />
            <GardenVine width={195} className="absolute -left-20 top-12 opacity-45" />
            <BotanicalArt kind="peony" width={160} className="-bottom-12 -left-20 opacity-28" rotate={22} reveal={false} />
            <span aria-hidden="true" className="absolute bottom-[8%] right-4 font-display text-[7rem] leading-none text-gold/[0.08]">P</span>
          </motion.div>

          <motion.div className="absolute bottom-0 right-0 top-0 z-20 w-1/2 origin-right overflow-hidden border-y border-r border-gold/70 bg-rouge" variants={gateRight} initial="closed" animate={phase === 'opening' || phase === 'revealed' || phase === 'leaving' ? 'open' : 'closed'} style={{ transformStyle: 'preserve-3d' }} onAnimationComplete={(definition) => phase === 'opening' && definition === 'open' && setPhase('revealed')}>
            <PaperGrain opacity={0.07} />
            <span aria-hidden="true" className="absolute inset-3 border border-gold/40" />
            <GardenVine width={195} className="absolute -right-20 bottom-12 opacity-45" flip />
            <BotanicalArt kind="camellia" width={120} className="-right-12 top-10 opacity-38" rotate={-18} flip reveal={false} />
            <span aria-hidden="true" className="absolute left-4 top-[8%] font-display text-[7rem] leading-none text-gold/[0.08]">T</span>
          </motion.div>

          <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <motion.button ref={sealRef} type="button" onClick={open} disabled={phase !== 'ready'} className="grid h-[96px] w-[96px] place-items-center rounded-full disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-surround" aria-label="Open the P and T spring garden folio" initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: phase === 'ready' ? 1 : 0, scale: phase === 'ready' ? 1 : 0.9 }} transition={{ duration: 0.7, ease: softEase }} whileTap={phase === 'ready' ? { scale: 0.96 } : undefined}>
              {phase === 'ready' && <motion.span aria-hidden="true" className="absolute inset-1 rounded-full border border-gold/50" animate={{ scale: [1, 1.25], opacity: [0.55, 0] }} transition={{ duration: 2.3, repeat: Infinity, ease: 'easeOut' }} />}
              <RoyalMedallion initials={wedding.couple.initials} names={[wedding.couple.first, wedding.couple.second]} size={90} />
            </motion.button>
          </div>

          <motion.button ref={enterRef} type="button" disabled={phase !== 'revealed'} onClick={() => phase === 'revealed' && setPhase('leaving')} className="absolute inset-[4%] z-10 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-surround" initial={{ opacity: 0 }} animate={{ opacity: phase === 'revealed' ? 1 : 0 }} transition={{ duration: 0.5, ease: softEase }} aria-label="Enter the wedding invitation">
            <span className="absolute bottom-5 left-1/2 min-h-[36px] -translate-x-1/2 whitespace-nowrap border-b border-gold/70 font-sans text-[8px] uppercase tracking-label text-rouge-deep">Open our invitation</span>
          </motion.button>
        </motion.div>

        <motion.p key={phase} className="mt-6 min-h-[14px] font-sans text-[8px] uppercase tracking-label text-rouge-deep/70" initial={{ opacity: 0, y: 3 }} animate={{ opacity: phase === 'leaving' ? 0 : 1, y: 0 }} transition={{ duration: 0.4, ease: softEase }} aria-live="polite">
          {phase === 'ready' ? 'Press the monogram to open' : phase === 'revealed' ? 'The garden is in bloom' : ''}
        </motion.p>
      </div>
    </motion.div>
  )
}
