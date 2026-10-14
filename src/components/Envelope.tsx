import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { softEase } from '../animations/variants'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import PaperTexture from '../decorations/PaperTexture'
import RoseDecor from '../decorations/RoseDecor'
import InvitationSuite, { type SuitePhase } from './InvitationSuite'

interface EnvelopeProps {
  onComplete: () => void
}

/**
 * Full-screen flat-lay opening. Guests first press the gold seal to release the
 * silk and lift the vellum, then tap the revealed invitation to enter.
 */
export default function Envelope({ onComplete }: EnvelopeProps) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<SuitePhase>('entering')
  const sealRef = useRef<HTMLButtonElement>(null)
  const invitationRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (phase === 'ready') sealRef.current?.focus({ preventScroll: true })
    if (phase === 'revealed') invitationRef.current?.focus({ preventScroll: true })
  }, [phase])

  const untie = () => {
    if (phase !== 'ready') return
    setPhase(reduceMotion ? 'revealed' : 'unveiling')
  }

  const continueToInvitation = () => {
    if (phase !== 'revealed') return
    setPhase('leaving')
  }

  const caption = {
    entering: 'A suite assembled for you',
    ready: 'Press the seal to untie',
    unveiling: 'Lifting the vellum',
    revealed: 'The invitation is yours',
    leaving: 'With love, Phát & Thảo',
  }[phase]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-[#E7E0D5] px-safe pt-safe pb-safe"
      role="dialog"
      aria-modal="true"
      aria-label="Open Phát and Thảo's vellum-wrapped wedding invitation suite"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'leaving' ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: softEase }}
      onAnimationComplete={() => {
        if (phase === 'leaving') onComplete()
      }}
    >
      <PaperTexture opacity={0.065} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(88deg, rgba(116,98,79,0.10) 0, rgba(116,98,79,0.10) 1px, transparent 1px, transparent 7px)',
        }}
      />

      {/* Flat-lay styling at the edges of the photograph. */}
      <RoseDecor image="pink-full" width={220} className="-bottom-24 -left-24 opacity-55" rotate={14} sway={false} />
      <RoseDecor image="coral-bloom" width={170} className="-right-20 -top-6 opacity-40" rotate={-28} flip sway={false} />
      <div aria-hidden="true" className="absolute -left-8 top-[12%] opacity-30">
        <BotanicalDecoration variant="sprig" size={52} />
      </div>
      <div aria-hidden="true" className="absolute -right-8 bottom-[12%] opacity-25">
        <BotanicalDecoration variant="olive-branch" size={145} flip />
      </div>

      <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center px-5">
        <motion.p
          className="mb-6 font-sans text-[9px] uppercase tracking-label text-charcoal/65"
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: phase === 'leaving' ? 0 : 1, y: 0 }}
          transition={{ duration: 0.75, delay: phase === 'entering' ? 0.2 : 0, ease: softEase }}
        >
          Phát &amp; Thảo · 14 February 2027
        </motion.p>

        <motion.div
          className="w-[min(84vw,326px)]"
          initial={{ opacity: 0, y: 22, scale: 0.975, rotate: -0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          transition={{ duration: reduceMotion ? 0.25 : 1.05, ease: softEase }}
          onAnimationComplete={() => {
            if (phase === 'entering') setPhase('ready')
          }}
        >
          <InvitationSuite
            phase={phase}
            sealRef={sealRef}
            invitationRef={invitationRef}
            onUntie={untie}
            onUnveiled={() => {
              if (phase === 'unveiling') setPhase('revealed')
            }}
            onContinue={continueToInvitation}
          />
        </motion.div>

        <motion.p
          className="mt-6 min-h-[14px] font-sans text-[9px] uppercase tracking-label text-charcoal/60"
          key={caption}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: phase === 'leaving' ? 0 : 1, y: 0 }}
          transition={{ duration: 0.45, ease: softEase }}
          aria-live="polite"
        >
          {caption}
        </motion.p>
      </div>
    </motion.div>
  )
}
