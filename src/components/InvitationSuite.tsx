import { motion } from 'framer-motion'
import type { RefObject } from 'react'
import { softEase, waxSealReveal } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import OrnamentalDivider from '../decorations/OrnamentalDivider'
import PaperTexture from '../decorations/PaperTexture'
import SilkRibbon from '../decorations/SilkRibbon'
import VellumWildflowers from '../decorations/VellumWildflowers'
import WaxSeal from '../decorations/WaxSeal'

export type SuitePhase = 'entering' | 'ready' | 'unveiling' | 'revealed' | 'leaving'

interface InvitationSuiteProps {
  phase: SuitePhase
  sealRef: RefObject<HTMLButtonElement | null>
  invitationRef: RefObject<HTMLButtonElement | null>
  onUntie: () => void
  onUnveiled: () => void
  onContinue: () => void
}

const paperShadow = '0 13px 24px -18px rgba(61,53,55,0.46), 0 2px 5px rgba(61,53,55,0.08)'

/**
 * A top-down 4:5 flat-lay composition: details card, reply card, main invite,
 * cloudy floral vellum, frayed silk ribbon, and a gold monogram seal.
 */
export default function InvitationSuite({
  phase,
  sealRef,
  invitationRef,
  onUntie,
  onUnveiled,
  onContinue,
}: InvitationSuiteProps) {
  const unwrapped = phase === 'unveiling' || phase === 'revealed' || phase === 'leaving'
  const revealed = phase === 'revealed' || phase === 'leaving'

  return (
    <div className="relative aspect-[4/5] w-full" aria-label="Vellum-wrapped wedding invitation suite">
      {/* Details insert, tucked behind the main invitation. */}
      <motion.article
        className="absolute left-[-1%] top-[7%] h-[66%] w-[55%] border border-gold/25 bg-paper-deep px-4 py-5 text-center"
        style={{ boxShadow: paperShadow, transformOrigin: 'bottom center' }}
        animate={revealed ? { x: '-7%', y: '-2%', rotate: -7 } : { x: 0, y: 0, rotate: -3.2 }}
        transition={{ duration: 1.05, ease: softEase }}
      >
        <PaperTexture opacity={0.045} />
        <p className="font-sans text-[7px] uppercase tracking-label text-burgundy">The Details</p>
        <p className="mt-4 font-display text-[1.55rem] leading-none text-burgundy">14</p>
        <p className="mt-1 font-serif text-[10px] uppercase tracking-editorial text-charcoal/70">February · 2027</p>
        <div className="mt-4 text-gold">
          <OrnamentalDivider variant="hairline" width={64} />
        </div>
        <p className="mt-4 font-serif text-xs leading-relaxed text-charcoal/75">
          Ceremony · 9 AM
          <br />
          Reception · 5 PM
        </p>
      </motion.article>

      {/* Reply card, offset on the right. */}
      <motion.article
        className="absolute bottom-[7%] right-[-2%] h-[43%] w-[57%] border border-gold/25 bg-paper-2 px-4 py-5 text-center"
        style={{ boxShadow: paperShadow, transformOrigin: 'top center' }}
        animate={revealed ? { x: '8%', y: '3%', rotate: 7 } : { x: 0, y: 0, rotate: 3.6 }}
        transition={{ duration: 1.05, ease: softEase }}
      >
        <PaperTexture opacity={0.045} />
        <div className="mx-auto w-fit opacity-45">
          <BotanicalDecoration variant="wildflower" size={32} />
        </div>
        <p className="mt-2 font-script text-base text-rose">Kindly reply</p>
        <p className="mt-2 font-sans text-[7px] uppercase tracking-label text-burgundy">By February First</p>
        <span className="mt-4 inline-block border-b border-burgundy/30 pb-0.5 font-serif text-[10px] italic text-charcoal/65">
          Your presence is our present
        </span>
      </motion.article>

      {/* Main portrait invitation. */}
      <motion.article
        className="absolute bottom-[2%] left-[11%] right-[11%] top-[2%] overflow-hidden border border-gold/35 bg-ivory px-6 py-9 text-center"
        style={{ boxShadow: paperShadow }}
        animate={revealed ? { y: '-2%', rotate: -0.3, scale: 1.018 } : { y: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 1.05, ease: softEase }}
      >
        <PaperTexture opacity={0.048} />
        <div aria-hidden="true" className="absolute inset-[7px] border border-gold/18" />
        <div aria-hidden="true" className="absolute -right-6 -top-3 opacity-28">
          <BotanicalDecoration variant="olive-branch" size={120} flip />
        </div>

        <div className="relative flex h-full flex-col items-center">
          <p className="font-script text-lg text-rose">Together, always</p>
          <p className="mt-5 font-sans text-[7px] uppercase tracking-label text-charcoal/60">Together with their families</p>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,9vw,2.45rem)] leading-[0.95] text-burgundy">
            {wedding.couple.first}
            <span className="my-2 block font-serif text-base italic text-rose">and</span>
            {wedding.couple.second}
          </h2>
          <div className="mt-6 text-gold">
            <OrnamentalDivider variant="leaf" width={90} />
          </div>
          <p className="mt-6 whitespace-pre-line font-serif text-sm leading-relaxed text-charcoal/75">
            {wedding.date.long}
          </p>
          <p className="mt-auto font-sans text-[7px] uppercase tracking-label text-burgundy">Goldland Plaza · Huế</p>
        </div>
      </motion.article>

      {/* Cloudy vellum wrap—the invitation remains legible beneath it. */}
      <motion.div
        className="absolute bottom-[1%] left-[9%] right-[9%] top-[1%] z-30 overflow-hidden border border-[#FFFDF8]/60 text-[#FFFDF8]"
        style={{
          backgroundColor: 'rgba(237,232,218,0.76)',
          backdropFilter: 'blur(0.65px) saturate(0.86)',
          WebkitBackdropFilter: 'blur(0.65px) saturate(0.86)',
          boxShadow: '0 6px 14px rgba(61,53,55,0.08)',
          transformOrigin: 'top right',
        }}
        initial={false}
        animate={unwrapped ? { x: '88%', y: '-12%', rotate: 7, opacity: 0.08 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.25, ease: softEase }}
        onAnimationComplete={() => {
          if (phase === 'unveiling') onUnveiled()
        }}
      >
        <PaperTexture opacity={0.075} />
        <VellumWildflowers className="absolute inset-0 h-full w-full drop-shadow-[0_1px_0_rgba(116,51,69,0.14)]" />
        <div className="absolute inset-0 bg-[#F1EDE3]/10" />
      </motion.div>

      <SilkRibbon released={unwrapped} />

      {/* Static wrapper handles centering; Framer handles seal press/fade. */}
      <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <motion.button
          ref={sealRef}
          type="button"
          onClick={onUntie}
          disabled={phase !== 'ready'}
          aria-label="Press the gold P and T seal to release the silk ribbon"
          className="grid h-[78px] w-[78px] place-items-center rounded-full disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/45 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
          variants={waxSealReveal}
          initial="hidden"
          animate={phase === 'ready' ? 'visible' : unwrapped ? 'broken' : 'hidden'}
          whileTap={phase === 'ready' ? { scale: 0.96 } : undefined}
        >
          {phase === 'ready' && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-gold/50"
              animate={{ scale: [1, 1.34], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <WaxSeal initials={wedding.couple.initials} tone="gold" size={76} />
        </motion.button>
      </div>

      {/* Once unwrapped, the full invitation itself becomes the final touch target. */}
      <motion.button
        ref={invitationRef}
        type="button"
        onClick={onContinue}
        disabled={!revealed || phase === 'leaving'}
        aria-label="Open the full wedding invitation"
        className="absolute bottom-[2%] left-[11%] right-[11%] top-[2%] z-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.55, ease: softEase }}
      >
        <span className="absolute bottom-5 left-1/2 min-h-[38px] -translate-x-1/2 whitespace-nowrap border-b border-burgundy/35 font-sans text-[8px] uppercase tracking-label text-burgundy">
          Open the invitation
        </span>
      </motion.button>
    </div>
  )
}
