import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { envelopeOpen, softEase, waxSealReveal } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import PaperTexture from '../decorations/PaperTexture'
import RoseDecor from '../decorations/RoseDecor'
import WaxSeal from '../decorations/WaxSeal'

type Phase = 'entering' | 'ready' | 'opening' | 'emerging' | 'leaving'

interface EnvelopeProps {
  onComplete: () => void
}

const cardVariants = {
  inside: { y: 0, scale: 1 },
  emerged: { y: '-67%', scale: 1.035, transition: { duration: 1.25, ease: softEase } },
}

/**
 * A reliable, tactile 2D paper fold. The SVG flap morphs from a downward
 * triangle to an upward triangle, then the invitation emerges. Animation
 * completion—not timers—drives every phase.
 */
export default function Envelope({ onComplete }: EnvelopeProps) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('entering')
  const sealRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (phase === 'ready') sealRef.current?.focus({ preventScroll: true })
  }, [phase])

  const open = () => {
    if (phase !== 'ready') return
    setPhase(reduceMotion ? 'leaving' : 'opening')
  }

  const openOrLater = phase === 'opening' || phase === 'emerging' || phase === 'leaving'
  const cardIsEmerging = phase === 'emerging' || phase === 'leaving'

  return (
    <motion.div
      className="fixed inset-0 z-50 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-paper px-safe pt-safe pb-safe"
      role="dialog"
      aria-modal="true"
      aria-label="Open Phát and Thảo's wedding invitation"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'leaving' ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.65, ease: softEase }}
      onAnimationComplete={() => {
        if (phase === 'leaving') onComplete()
      }}
    >
      <PaperTexture opacity={0.055} />

      {/* Quiet botanical composition—the envelope remains the focal object. */}
      <RoseDecor image="pink-full" width={210} className="-bottom-20 -left-24 opacity-50" rotate={12} sway={false} />
      <RoseDecor image="coral-bloom" width={160} className="-right-16 -top-4 opacity-35" rotate={-28} flip sway={false} />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[7%] flex justify-center opacity-25">
        <BotanicalDecoration variant="landscape" size={390} />
      </div>

      <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center px-5">
        <motion.p
          className="label-dark mb-8 text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: openOrLater ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8, delay: phase === 'entering' ? 0.25 : 0, ease: softEase }}
        >
          A love letter, sealed for you
        </motion.p>

        <motion.div
          className="relative w-[min(86vw,338px)] aspect-[320/306]"
          initial={{ opacity: 0, y: 24, rotate: -0.8 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: reduceMotion ? 0.25 : 1.05, ease: softEase }}
          onAnimationComplete={() => {
            if (phase === 'entering') setPhase('ready')
          }}
        >
          {/* Back panel */}
          <svg viewBox="0 0 320 306" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="envelope-paper" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FEFAF3" />
                <stop offset="1" stopColor="#F2E9DC" />
              </linearGradient>
            </defs>
            <rect x="1" y="104" width="318" height="200" fill="url(#envelope-paper)" stroke="#B4975A" strokeOpacity="0.55" />
          </svg>

          {/* The invitation insert starts behind the envelope flaps. */}
          <motion.article
            className="absolute left-[7%] right-[7%] top-[38.5%] h-[55%] overflow-hidden border border-gold/45 bg-ivory px-4 pt-6 text-center"
            style={{ zIndex: cardIsEmerging ? 30 : 8 }}
            variants={cardVariants}
            initial="inside"
            animate={cardIsEmerging ? 'emerged' : 'inside'}
            onAnimationComplete={(definition) => {
              if (phase === 'emerging' && definition === 'emerged') setPhase('leaving')
            }}
          >
            <PaperTexture opacity={0.05} />
            <p className="font-script text-base text-rose">Together, always</p>
            <p className="mt-2 font-display text-[1.45rem] text-burgundy">
              {wedding.couple.first}
              <span className="mx-2 font-serif text-base italic text-rose">&amp;</span>
              {wedding.couple.second}
            </p>
            <p className="label mt-3">{wedding.date.numeric}</p>
            <div className="absolute inset-1.5 border border-gold/20" aria-hidden="true" />
          </motion.article>

          {/* Side and lower folds conceal the insert until it rises. */}
          <svg viewBox="0 0 320 306" className="absolute inset-0 z-20 h-full w-full" aria-hidden="true">
            <path d="M0 104 L160 210 L0 304 Z" fill="#F7F0E5" stroke="#B4975A" strokeOpacity="0.35" />
            <path d="M320 104 L160 210 L320 304 Z" fill="#F7F0E5" stroke="#B4975A" strokeOpacity="0.35" />
            <path d="M0 304 L160 192 L320 304 Z" fill="#F2E9DC" stroke="#B4975A" strokeOpacity="0.45" />
            <rect x="1" y="104" width="318" height="200" fill="none" stroke="#B4975A" strokeOpacity="0.58" />
          </svg>

          {/* Top flap: one morphing SVG path, with no 3D/backface compositing. */}
          <svg
            viewBox="0 0 320 306"
            className="absolute inset-0 h-full w-full overflow-visible"
            style={{ zIndex: phase === 'opening' || phase === 'entering' || phase === 'ready' ? 28 : 6 }}
            aria-hidden="true"
          >
            <motion.path
              variants={envelopeOpen}
              initial="closed"
              animate={phase === 'opening' ? 'open' : phase === 'entering' || phase === 'ready' ? 'closed' : 'open'}
              fill={phase === 'opening' ? '#EFE5D8' : '#FBF5EB'}
              stroke="#B4975A"
              strokeOpacity="0.62"
              onAnimationComplete={(definition) => {
                if (phase === 'opening' && definition === 'open') setPhase('emerging')
              }}
            />
          </svg>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[40%] z-30 -translate-x-1/2 opacity-40"
            animate={{ opacity: openOrLater ? 0 : 0.4 }}
            transition={{ duration: 0.35 }}
          >
            <BotanicalDecoration variant="olive-branch" size={145} />
          </motion.div>

          {/* Static wrapper owns centering; Framer owns only the seal's scale/fade. */}
          <div className="absolute left-1/2 top-[69.3%] z-40 -translate-x-1/2 -translate-y-1/2">
            <motion.button
              ref={sealRef}
              type="button"
              onClick={open}
              disabled={phase !== 'ready'}
              aria-label="Break the P and T wax seal and open the invitation"
              className="relative grid h-[76px] w-[76px] place-items-center rounded-full disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/45 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
              variants={waxSealReveal}
              initial="hidden"
              animate={phase === 'ready' ? 'visible' : openOrLater ? 'broken' : 'hidden'}
              whileTap={phase === 'ready' ? { scale: 0.96 } : undefined}
            >
              {phase === 'ready' && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-burgundy/30"
                  animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                  transition={{ duration: 2.1, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <WaxSeal initials={wedding.couple.initials} size={74} />
            </motion.button>
          </div>
        </motion.div>

        <motion.p
          className="label mt-5 text-center text-rose"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'ready' ? 1 : 0 }}
          transition={{ duration: 0.7, ease: softEase }}
          aria-live="polite"
        >
          {phase === 'ready' ? 'Tap the seal to open' : ''}
        </motion.p>
      </div>
    </motion.div>
  )
}
