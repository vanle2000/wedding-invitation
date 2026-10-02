import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { softEase } from '../animations/variants'
import { wedding } from '../content/wedding'
import Bee from '../decorations/Bee'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import PaperTexture from '../decorations/PaperTexture'
import WaxSeal from '../decorations/WaxSeal'

type Stage = 'enter' | 'sealed' | 'opening' | 'rising' | 'leaving'

interface EnvelopeProps {
  onComplete: () => void
}

// Envelope geometry in SVG units (width 300 × height 200).
const W = 300
const H = 200
const FLAP_H = 112 // depth of the top flap tip

/**
 * Interactive opening sequence:
 * envelope settles → wax seal presses in → guest taps the seal →
 * seal breaks, flap lifts, invitation rises → fades into the monogram page.
 *
 * The flap is a plain SVG polygon rotated around its top edge, with the face
 * colour swapped half-way through the turn — no clip-path or backface tricks,
 * which keeps it smooth on iOS Safari.
 */
export default function Envelope({ onComplete }: EnvelopeProps) {
  const reduceMotion = useReducedMotion()
  const [stage, setStage] = useState<Stage>('enter')
  const [flapTurned, setFlapTurned] = useState(false)
  const timers = useRef<number[]>([])

  const after = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Entrance: settle, then reveal the seal and wait for the tap.
  useEffect(() => {
    after(reduceMotion ? 200 : 1300, () => setStage('sealed'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Scripted progression once opened.
  useEffect(() => {
    if (stage === 'opening') {
      after(reduceMotion ? 200 : 1000, () => setStage('rising'))
      after(reduceMotion ? 500 : 2500, () => setStage('leaving'))
    }
    if (stage === 'leaving') after(reduceMotion ? 300 : 1000, onComplete)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  const open = () => {
    if (stage === 'enter' || stage === 'sealed') setStage('opening')
  }

  const isOpen = stage !== 'enter' && stage !== 'sealed'
  const isRisen = stage === 'rising' || stage === 'leaving'

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-center bg-paper md:bg-surround"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'leaving' ? 0 : 1 }}
      transition={{ duration: 1.0, ease: softEase }}
      role="dialog"
      aria-label="Your invitation"
    >
      <div className="relative w-full max-w-invite bg-paper overflow-hidden flex flex-col items-center justify-center pt-safe pb-safe">
        <PaperTexture opacity={0.05} />

        {/* Warm light from above */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(90% 60% at 50% 0%, rgba(255,249,243,0.9), rgba(251,239,240,0) 70%)' }}
        />

        {/* Landscape engraving along the bottom */}
        <div className="pointer-events-none absolute bottom-[6%] left-0 right-0 flex justify-center opacity-70">
          <BotanicalDecoration variant="landscape" size={380} />
        </div>

        {/* Drifting petals */}
        {!reduceMotion &&
          PETALS.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute block rounded-[100%_0_100%_0]"
              style={{ left: p.x, top: '-4%', width: p.s, height: p.s * 0.7, background: p.c, opacity: 0.8 }}
              animate={{ y: ['0vh', '110vh'], x: [0, p.drift, 0], rotate: [0, p.rot] }}
              transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}

        <motion.p
          className="label text-burgundy/80 mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
          transition={{ duration: 1, delay: isOpen ? 0 : 0.6, ease: softEase }}
        >
          Dearest Gentle Reader
        </motion.p>

        {/* Envelope stage */}
        <motion.div
          className="relative"
          style={{ width: 'min(80vw, 330px)', aspectRatio: `${W} / ${H}` }}
          initial={{ opacity: 0, y: 30, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.3, ease: softEase }}
        >
          {/* Invitation card — sits inside, rises out on open */}
          <motion.div
            className="absolute left-[6%] right-[6%] top-[6%] bottom-[-2%] bg-ivory overflow-hidden shadow-[0_10px_24px_-18px_rgba(74,51,56,0.5)]"
            style={{ zIndex: isRisen ? 30 : 5 }}
            initial={false}
            animate={isRisen ? { y: '-46%', scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: softEase }}
          >
            <PaperTexture opacity={0.06} />
            <div className="absolute inset-[6px] border border-gold/70" />
            <div className="absolute inset-[10px] border border-gold/40" />
            <div className="absolute inset-0 flex flex-col items-center pt-[12%] text-burgundy">
              <span className="font-script text-base leading-none text-rose">Together with their families</span>
              <span className="font-display text-[1.5rem] leading-tight mt-3 tracking-wide">
                {wedding.couple.first}
                <span className="font-serif italic text-rose text-lg mx-2">&amp;</span>
                {wedding.couple.second}
              </span>
              <span className="label mt-3 text-[9px]">
                {wedding.date.month} {wedding.date.day} · {wedding.date.year}
              </span>
              <Bee size={22} className="mt-3" />
            </div>
          </motion.div>

          {/* Envelope body + side/bottom flaps (static SVG) */}
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 10, filter: 'drop-shadow(0 14px 22px rgba(139,46,65,0.14))' }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#F8E3E6" />
                <stop offset="1" stopColor="#F3D6DB" />
              </linearGradient>
              <linearGradient id="envBottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#F6DEE2" />
                <stop offset="1" stopColor="#F9E8EA" />
              </linearGradient>
            </defs>
            {/* Back panel is only needed before the card rises; the card covers it visually */}
            <rect x="0" y="0" width={W} height={H} fill="url(#envBody)" />
            {/* Side flaps */}
            <path d={`M0 0 L${W / 2} ${H * 0.52} L0 ${H} Z`} fill="#F7E0E4" stroke="#C9A961" strokeOpacity="0.55" strokeWidth="0.8" />
            <path d={`M${W} 0 L${W / 2} ${H * 0.52} L${W} ${H} Z`} fill="#F7E0E4" stroke="#C9A961" strokeOpacity="0.55" strokeWidth="0.8" />
            {/* Bottom flap */}
            <path d={`M0 ${H} L${W / 2} ${H * 0.44} L${W} ${H} Z`} fill="url(#envBottom)" stroke="#C9A961" strokeOpacity="0.7" strokeWidth="0.8" />
            {/* Outer edge */}
            <rect x="0.4" y="0.4" width={W - 0.8} height={H - 0.8} fill="none" stroke="#C9A961" strokeOpacity="0.8" strokeWidth="0.8" />
          </svg>

          {/* Top flap — rotates about its top edge */}
          <motion.div
            className="absolute left-0 right-0 top-0"
            style={{
              height: `${(FLAP_H / H) * 100}%`,
              transformOrigin: 'top center',
              zIndex: isRisen ? 8 : 20,
              transformPerspective: 900,
            }}
            initial={false}
            animate={{ rotateX: isOpen ? -176 : 0 }}
            transition={{ duration: 1.6, ease: softEase }}
            onUpdate={(latest) => {
              const rx = typeof latest.rotateX === 'number' ? latest.rotateX : parseFloat(String(latest.rotateX))
              const turned = rx < -90
              if (turned !== flapTurned) setFlapTurned(turned)
            }}
          >
            <svg viewBox={`0 0 ${W} ${FLAP_H}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
              <defs>
                <linearGradient id="flapFront" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FAE6E9" />
                  <stop offset="1" stopColor="#F4D9DE" />
                </linearGradient>
              </defs>
              <path
                d={`M0 0 L${W} 0 L${W / 2} ${FLAP_H} Z`}
                fill={flapTurned ? '#F1D1D7' : 'url(#flapFront)'}
                stroke="#C9A961"
                strokeOpacity="0.8"
                strokeWidth="0.8"
              />
              {!flapTurned && (
                <g opacity="0.9" transform={`translate(${W / 2 - 60} 10)`}>
                  <BotanicalDecoration variant="olive-branch" size={120} />
                </g>
              )}
            </svg>
          </motion.div>

          {/* Wax seal — a real button; breaks in two when tapped */}
          <motion.button
            type="button"
            onClick={open}
            disabled={isOpen}
            aria-label="Break the seal and open the invitation"
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-[26%] aspect-square rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            style={{ top: `${(FLAP_H / H) * 100}%`, zIndex: 40 }}
            initial={{ opacity: 0, scale: 1.3 }}
            animate={stage === 'enter' ? { opacity: 0, scale: 1.3 } : { opacity: isOpen ? 0 : 1, scale: 1 }}
            transition={{ duration: isOpen ? 0.5 : 0.8, ease: [0.34, 1.2, 0.64, 1] }}
            whileTap={{ scale: 0.94 }}
          >
            {/* Invitation pulse while waiting */}
            {stage === 'sealed' && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-burgundy/40"
                animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <WaxSeal initials={wedding.couple.initials} size={999} className="w-full h-full" />
          </motion.button>

          {/* Broken seal halves */}
          {isOpen && (
            <div
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26%] aspect-square"
              style={{ top: `${(FLAP_H / H) * 100}%`, zIndex: 35 }}
            >
              {([-1, 1] as const).map((dir) => (
                <motion.div
                  key={dir}
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: dir === -1 ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)' }}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  animate={{ x: dir * 26, y: 44, rotate: dir * 18, opacity: 0 }}
                  transition={{ duration: 1.1, ease: softEase }}
                >
                  <WaxSeal initials={wedding.couple.initials} size={999} className="w-full h-full" />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.p
          className="label text-rose mt-14 text-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === 'sealed' ? 1 : 0 }}
          transition={{ duration: 0.9, delay: stage === 'sealed' ? 0.6 : 0, ease: softEase }}
        >
          Tap the seal to open
        </motion.p>
      </div>
    </motion.div>
  )
}

const PETALS = [
  { x: '8%', s: 14, c: '#F3CBD3', d: 16, delay: 0, drift: 24, rot: 220 },
  { x: '24%', s: 10, c: '#E8A9B6', d: 19, delay: 3, drift: -18, rot: -180 },
  { x: '46%', s: 12, c: '#F6D7C3', d: 17, delay: 6, drift: 20, rot: 260 },
  { x: '66%', s: 9, c: '#D5C7E2', d: 21, delay: 1.5, drift: -22, rot: -200 },
  { x: '84%', s: 13, c: '#F3CBD3', d: 18, delay: 8, drift: 16, rot: 190 },
  { x: '92%', s: 8, c: '#E8A9B6', d: 20, delay: 11, drift: -14, rot: -160 },
]
