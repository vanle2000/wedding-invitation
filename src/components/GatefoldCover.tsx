import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { gateLeft, gateRight, softEase } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { GoldFrame } from '../art/GoldOrnament'
import PaperGrain from '../art/PaperGrain'
import RoyalMedallion from '../art/RoyalMedallion'
import { wedding } from '../content/wedding'

type CoverPhase = 'entering' | 'ready' | 'opening' | 'revealed' | 'leaving'

interface GatefoldCoverProps {
  onComplete: () => void
}

/** Deep-red French folio that opens like two lacquered stationery panels. */
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
      aria-label="Open Phát and Thảo's wedding invitation"
      animate={{ opacity: phase === 'leaving' ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.65, ease: softEase }}
      onAnimationComplete={() => {
        if (phase === 'leaving') onComplete()
      }}
    >
      <PaperGrain opacity={0.075} />
      <BotanicalArt kind="peony" width={250} className="-bottom-24 -left-28 opacity-35" rotate={13} eager reveal={false} />
      <BotanicalArt kind="camellia" width={150} className="-right-12 -top-5 opacity-45" rotate={-22} flip eager reveal={false} />

      <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center px-5">
        <motion.p
          className="eyebrow-gold mb-6 text-center"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: phase === 'leaving' ? 0 : 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: softEase }}
        >
          Une invitation pour vous
        </motion.p>

        <motion.div
          className="relative aspect-[4/5] w-[min(82vw,320px)] [perspective:1000px]"
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.25 : 1, ease: softEase }}
          onAnimationComplete={() => {
            if (phase === 'entering') setPhase('ready')
          }}
        >
          {/* Ivory correspondence card beneath the doors. */}
          <GoldFrame className="absolute inset-[4%] bg-ivory p-3 shadow-[0_16px_35px_-22px_rgba(20,5,8,0.65)]">
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-5 text-center">
              <PaperGrain />
              <BotanicalArt kind="peony" width="72%" className="-left-[34%] -top-[15%] opacity-38" rotate={20} reveal={false} />
              <BotanicalArt kind="camellia" width="45%" className="-bottom-[8%] -right-[14%] opacity-55" rotate={-15} flip reveal={false} />
              <p className="relative font-script text-xl text-rose">L&rsquo;amour nous réunit</p>
              <p className="relative mt-6 font-script text-[clamp(2.6rem,13vw,3.5rem)] leading-[0.94] text-oxblood">
                {wedding.couple.first}
                <span className="my-2 block font-serif text-xl italic text-gold">&amp;</span>
                {wedding.couple.second}
              </p>
              <p className="relative mt-7 font-sans text-[8px] uppercase tracking-label text-ink/65">{wedding.date.french}</p>
            </div>
          </GoldFrame>

          {/* Left folio door. */}
          <motion.div
            className="absolute bottom-0 left-0 top-0 z-20 w-1/2 origin-left overflow-hidden border-y border-l border-gold/70 bg-oxblood"
            variants={gateLeft}
            initial="closed"
            animate={phase === 'opening' || phase === 'revealed' || phase === 'leaving' ? 'open' : 'closed'}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <PaperGrain opacity={0.08} />
            <span aria-hidden="true" className="absolute inset-3 border border-gold/35" />
            <BotanicalArt kind="peony" width={180} className="-left-20 top-5 opacity-28" rotate={25} reveal={false} />
            <span aria-hidden="true" className="absolute bottom-[8%] right-4 font-display text-[7rem] leading-none text-gold/[0.06]">P</span>
          </motion.div>

          {/* Right folio door. Its completion advances the interaction. */}
          <motion.div
            className="absolute bottom-0 right-0 top-0 z-20 w-1/2 origin-right overflow-hidden border-y border-r border-gold/70 bg-oxblood"
            variants={gateRight}
            initial="closed"
            animate={phase === 'opening' || phase === 'revealed' || phase === 'leaving' ? 'open' : 'closed'}
            style={{ transformStyle: 'preserve-3d' }}
            onAnimationComplete={(definition) => {
              if (phase === 'opening' && definition === 'open') setPhase('revealed')
            }}
          >
            <PaperGrain opacity={0.08} />
            <span aria-hidden="true" className="absolute inset-3 border border-gold/35" />
            <BotanicalArt kind="camellia" width={135} className="-right-14 bottom-8 opacity-38" rotate={-18} flip reveal={false} />
            <span aria-hidden="true" className="absolute left-4 top-[8%] font-display text-[7rem] leading-none text-gold/[0.06]">T</span>
          </motion.div>

          {/* Gold clasp. Static wrapper owns positioning; Motion owns scale/fade. */}
          <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <motion.button
              ref={sealRef}
              type="button"
              onClick={open}
              disabled={phase !== 'ready'}
              className="grid h-[96px] w-[96px] place-items-center rounded-full disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-wine"
              aria-label="Open the P and T gold monogram folio"
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: phase === 'ready' ? 1 : 0, scale: phase === 'ready' ? 1 : 0.9 }}
              transition={{ duration: 0.7, ease: softEase }}
              whileTap={phase === 'ready' ? { scale: 0.96 } : undefined}
            >
              {phase === 'ready' && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-1 rounded-full border border-gold/45"
                  animate={{ scale: [1, 1.27], opacity: [0.6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <RoyalMedallion initials={wedding.couple.initials} names={[wedding.couple.first, wedding.couple.second]} size={90} />
            </motion.button>
          </div>

          {/* Revealed card becomes the final touch target. */}
          <motion.button
            ref={enterRef}
            type="button"
            disabled={phase !== 'revealed'}
            onClick={() => phase === 'revealed' && setPhase('leaving')}
            className="absolute inset-[4%] z-10 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-wine"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'revealed' ? 1 : 0 }}
            transition={{ duration: 0.5, ease: softEase }}
            aria-label="Enter the wedding invitation"
          >
            <span className="absolute bottom-5 left-1/2 min-h-[36px] -translate-x-1/2 whitespace-nowrap border-b border-gold/70 font-sans text-[8px] uppercase tracking-label text-oxblood">
              Enter the garden
            </span>
          </motion.button>
        </motion.div>

        <motion.p
          key={phase}
          className="mt-6 min-h-[14px] font-sans text-[8px] uppercase tracking-label text-gold-light/80"
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: phase === 'leaving' ? 0 : 1, y: 0 }}
          transition={{ duration: 0.4, ease: softEase }}
          aria-live="polite"
        >
          {phase === 'ready' ? 'Press the monogram to open' : phase === 'revealed' ? 'The garden awaits' : ''}
        </motion.p>
      </div>
    </motion.div>
  )
}
