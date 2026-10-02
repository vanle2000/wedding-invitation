import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { softEase, waxSealReveal } from '../animations/variants'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import PaperTexture from '../decorations/PaperTexture'
import WaxSeal from '../decorations/WaxSeal'

type Stage = 'enter' | 'sealed' | 'opening' | 'rising' | 'leaving'

interface EnvelopeProps {
  onComplete: () => void
}

/**
 * Full-screen opening sequence:
 * envelope appears → paper settles → wax seal presses in → flap lifts →
 * invitation rises out → scene fades into the monogram page.
 * Tapping the envelope at any point skips ahead to the opening.
 */
export default function Envelope({ onComplete }: EnvelopeProps) {
  const reduceMotion = useReducedMotion()
  const [stage, setStage] = useState<Stage>('enter')
  const timers = useRef<number[]>([])

  const schedule = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }, [])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  // Scripted timeline. Durations are long on purpose — paper moves slowly.
  useEffect(() => {
    if (reduceMotion) {
      setStage('sealed')
      schedule(() => setStage('leaving'), 900)
      return clearTimers
    }
    schedule(() => setStage('sealed'), 1500)
    schedule(() => setStage('opening'), 3600)
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion])

  // Progression after the flap starts opening.
  useEffect(() => {
    if (stage === 'opening') {
      clearTimers()
      schedule(() => setStage('rising'), 1100)
      schedule(() => setStage('leaving'), 2700)
    }
    if (stage === 'leaving') {
      clearTimers()
      schedule(onComplete, 1100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  const open = () => {
    if (stage === 'enter' || stage === 'sealed') setStage('opening')
  }

  const isOpen = stage === 'opening' || stage === 'rising' || stage === 'leaving'
  const isRisen = stage === 'rising' || stage === 'leaving'

  return (
    <motion.div
      key="envelope-scene"
      className="fixed inset-0 z-50 flex justify-center bg-paper md:bg-surround"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'leaving' ? 0 : 1 }}
      transition={{ duration: 1.1, ease: softEase }}
      aria-label="Opening the invitation"
      role="dialog"
    >
      <div className="relative w-full max-w-invite bg-paper overflow-hidden flex flex-col items-center justify-center pt-safe pb-safe">
        <PaperTexture />

        {/* Faint landscape engraving across the page bottom */}
        <div className="pointer-events-none absolute bottom-[8%] left-0 right-0 flex justify-center opacity-[0.55]">
          <BotanicalDecoration variant="landscape" size={360} />
        </div>

        <motion.p
          className="label mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 1.2, delay: isOpen ? 0 : 0.8, ease: softEase }}
        >
          You are invited
        </motion.p>

        {/* Envelope */}
        <motion.button
          type="button"
          onClick={open}
          aria-label="Open the invitation"
          className="relative block focus-visible:outline-none"
          style={{
            width: 'min(78vw, 320px)',
            aspectRatio: '1.47',
            perspective: 1400,
          }}
          initial={{ opacity: 0, y: 28, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.4, ease: softEase }}
        >
          {/* Body (back panel) */}
          <div className="absolute inset-0 bg-paper-2 border border-olive/20 shadow-[0_1px_0_rgba(63,73,61,0.08),0_18px_30px_-24px_rgba(52,51,46,0.45)]">
            <PaperTexture opacity={0.08} />
            <div className="absolute inset-0 flex items-end justify-center opacity-[0.45] pb-[10%]">
              <BotanicalDecoration variant="landscape" size={230} />
            </div>
          </div>

          {/* Invitation card inside */}
          <motion.div
            className="absolute left-[7%] right-[7%] top-[7%] bottom-[-2%] bg-paper border border-olive/15 overflow-hidden"
            style={{ zIndex: isRisen ? 25 : 5 }}
            initial={{ y: 0, scale: 1 }}
            animate={isRisen ? { y: '-44%', scale: 1.06 } : { y: 0, scale: 1 }}
            transition={{ duration: 1.6, ease: softEase }}
          >
            <PaperTexture opacity={0.07} />
            <div className="absolute inset-0 flex flex-col items-center pt-[14%] text-olive">
              <span className="font-script text-base leading-none text-sage">
                Together with their families
              </span>
              <span className="font-display text-[1.45rem] leading-tight mt-3 tracking-wide">
                {wedding.couple.first}
                <span className="font-serif italic text-sage text-lg mx-2">&amp;</span>
                {wedding.couple.second}
              </span>
              <span className="label mt-3 text-[9px]">
                {wedding.date.month} {wedding.date.day} · {wedding.date.year}
              </span>
            </div>
            <div className="absolute inset-2 border border-olive/10 pointer-events-none" />
          </motion.div>

          {/* Side + bottom flaps (static), drawn as one SVG */}
          <svg
            viewBox="0 0 147 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 10 }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="flapShade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#EDE8DA" />
                <stop offset="1" stopColor="#E6E0CF" />
              </linearGradient>
            </defs>
            <path
              d="M0 0 L73.5 52 L0 100 Z"
              fill="#EAE4D4"
              stroke="#3F493D"
              strokeOpacity="0.18"
              strokeWidth="0.5"
            />
            <path
              d="M147 0 L73.5 52 L147 100 Z"
              fill="#EAE4D4"
              stroke="#3F493D"
              strokeOpacity="0.18"
              strokeWidth="0.5"
            />
            <path
              d="M0 100 L73.5 44 L147 100 Z"
              fill="url(#flapShade)"
              stroke="#3F493D"
              strokeOpacity="0.22"
              strokeWidth="0.5"
            />
          </svg>

          {/* Top flap — rotates around its top edge */}
          <motion.div
            className="absolute left-0 right-0 top-0"
            style={{
              height: '58%',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              zIndex: isRisen ? 8 : 30,
            }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? -178 : 0 }}
            transition={{ duration: 1.7, ease: softEase }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(180deg, #EFEADB 0%, #E8E2D1 100%)',
              }}
            >
              <svg
                viewBox="0 0 147 58"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <path
                  d="M0 0 L73.5 58 L147 0"
                  fill="none"
                  stroke="#3F493D"
                  strokeOpacity="0.22"
                  strokeWidth="0.5"
                />
              </svg>
              <div className="absolute inset-0 flex items-start justify-center pt-[6%] opacity-[0.6]">
                <BotanicalDecoration variant="olive-branch" size={120} />
              </div>
            </div>
            {/* Back face (inside of the flap) */}
            <div
              className="absolute inset-0 bg-paper-2"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}
            />

            {/* Wax seal rides on the flap tip */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[-28%]"
              style={{ backfaceVisibility: 'hidden' }}
              variants={waxSealReveal}
              initial="hidden"
              animate={stage === 'enter' ? 'hidden' : 'visible'}
            >
              <WaxSeal initials={wedding.couple.initials} size={78} />
            </motion.div>
          </motion.div>
        </motion.button>

        <motion.p
          className="label mt-12 text-[10px] text-sage/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === 'sealed' ? 1 : 0 }}
          transition={{ duration: 1, delay: stage === 'sealed' ? 0.9 : 0, ease: softEase }}
        >
          Tap the seal to open
        </motion.p>
      </div>
    </motion.div>
  )
}
