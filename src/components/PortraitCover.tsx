import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cardReveal, leftDoorOpen, rightDoorOpen, softEase } from '../animations/variants'
import BotanicalCorners from '../art/BotanicalCorners'
import { GoldFrame } from '../art/GoldOrnament'
import KetDongTamMark from '../art/KetDongTamMark'
import PaperGrain from '../art/PaperGrain'
import { wedding } from '../content/wedding'

type CoverPhase = 'entering' | 'ready' | 'opening' | 'revealed' | 'leaving'

interface PortraitCoverProps {
  onComplete: () => void
}

/** Portrait 4:5 folio with two flush 3D doors hinged at the outside edges. */
export default function PortraitCover({ onComplete }: PortraitCoverProps) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<CoverPhase>('entering')
  const sealRef = useRef<HTMLButtonElement>(null)
  const invitationRef = useRef<HTMLButtonElement>(null)
  const doorsOpen = phase === 'opening' || phase === 'revealed' || phase === 'leaving'

  useEffect(() => {
    if (phase === 'ready') sealRef.current?.focus({ preventScroll: true })
    if (phase === 'revealed') invitationRef.current?.focus({ preventScroll: true })
  }, [phase])

  const openDoors = () => {
    if (phase !== 'ready') return
    setPhase(reduceMotion ? 'revealed' : 'opening')
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-canvas px-safe pt-safe pb-safe"
      role="dialog"
      aria-modal="true"
      aria-label="Mở thiệp cưới của Lê Tấn Phát và Dương Nguyệt Thảo"
      animate={{ opacity: phase === 'leaving' ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.65, ease: softEase }}
      onAnimationComplete={() => phase === 'leaving' && onComplete()}
    >
      <PaperGrain opacity={0.055} />

      <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center px-5">
        <motion.p className="section-label mb-6 text-center" initial={{ opacity: 0, y: 6 }} animate={{ opacity: phase === 'leaving' ? 0 : 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: softEase }}>
          Trân trọng kính mời
        </motion.p>

        <motion.div
          data-orientation="portrait"
          className="relative aspect-[4/5] w-[min(82vw,64svh,320px)] [perspective:1200px]"
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.25 : 0.9, ease: softEase }}
          onAnimationComplete={() => phase === 'entering' && setPhase('ready')}
        >
          {/* Central ivory cardstock expands gently upward as the doors open. */}
          <motion.div className="absolute inset-0" variants={cardReveal} initial="covered" animate={doorsOpen ? 'revealed' : 'covered'} transition={reduceMotion ? { duration: 0.01 } : undefined}>
            <GoldFrame className="h-full bg-ivory p-3 shadow-[0_18px_40px_-25px_rgba(44,37,35,0.38)]">
              <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-5 text-center">
                <PaperGrain opacity={0.045} />
                <BotanicalCorners reveal={false} />
                <div className="relative z-10">
                  <p className="romantic-script text-[1.55rem] text-rose">Một đời đồng tâm</p>
                  <div className="mt-6 font-display text-[clamp(1.05rem,4.6vw,1.35rem)] font-light leading-[1.5] tracking-[0.03em] text-rouge-deep">
                    <p>{wedding.couple.first}</p>
                    <p className="my-1 font-serif text-sm italic text-gold">&amp;</p>
                    <p>{wedding.couple.second}</p>
                  </div>
                  <p className="section-label mt-7">{wedding.date.display}</p>
                </div>
              </div>
            </GoldFrame>
          </motion.div>

          {/* Left door: exactly half width, flush to the centre seam. */}
          <motion.div
            className="absolute inset-y-0 left-0 z-20 w-1/2 origin-left overflow-hidden border-y border-l border-trim/40 bg-rouge [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform]"
            variants={leftDoorOpen}
            initial="closed"
            animate={doorsOpen ? 'open' : 'closed'}
            transition={reduceMotion ? { duration: 0.01 } : undefined}
          >
            <PaperGrain opacity={0.07} />
            <span aria-hidden="true" className="absolute inset-3 border border-trim/30" />
            <span aria-hidden="true" className="foil-text absolute right-5 top-[24%] font-script text-[4.7rem] leading-none">P</span>
            <span aria-hidden="true" className="absolute inset-y-0 right-0 w-px bg-trim/30" />
          </motion.div>

          {/* Right door: meets the left door at exactly 50%, with no gap. */}
          <motion.div
            className="absolute inset-y-0 right-0 z-20 w-1/2 origin-right overflow-hidden border-y border-r border-trim/40 bg-rouge [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform]"
            variants={rightDoorOpen}
            initial="closed"
            animate={doorsOpen ? 'open' : 'closed'}
            transition={reduceMotion ? { duration: 0.01 } : undefined}
            onAnimationComplete={(definition) => phase === 'opening' && definition === 'open' && setPhase('revealed')}
          >
            <PaperGrain opacity={0.07} />
            <span aria-hidden="true" className="absolute inset-3 border border-trim/30" />
            <span aria-hidden="true" className="foil-text absolute left-5 top-[24%] font-script text-[4.7rem] leading-none">T</span>
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-trim/30" />
          </motion.div>

          {/* Delicate gold wax action centered on the intersection of both doors. */}
          <motion.div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2" animate={{ opacity: phase === 'ready' ? 1 : 0, scale: phase === 'ready' ? 1 : 0.9 }} transition={{ duration: 0.45, ease: softEase }}>
            <motion.button
              ref={sealRef}
              type="button"
              onClick={openDoors}
              disabled={phase !== 'ready'}
              className="gold-wax relative grid h-[88px] w-[88px] place-items-center rounded-[48%_52%_47%_53%] border border-trim/50 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rouge-deep focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
              aria-label="Mở Thiệp Cưới"
              whileHover={phase === 'ready' && !reduceMotion ? { scale: 1.025 } : undefined}
              whileTap={phase === 'ready' ? { scale: 0.97 } : undefined}
            >
              {phase === 'ready' && !reduceMotion && <motion.span aria-hidden="true" className="absolute inset-0 rounded-full border border-trim/45" animate={{ scale: [1, 1.2], opacity: [0.48, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />}
              <KetDongTamMark size={61} variant="line" />
            </motion.button>
            <motion.span className="section-label absolute left-1/2 top-[calc(100%+13px)] w-36 -translate-x-1/2 text-center text-gold-light" animate={{ opacity: phase === 'ready' ? 1 : 0, y: phase === 'ready' ? 0 : 5 }} transition={{ duration: 0.35, ease: softEase }}>
              Mở Thiệp Cưới
            </motion.span>
          </motion.div>

          {/* Revealed card action remains inside the same portrait frame. */}
          <motion.button
            ref={invitationRef}
            type="button"
            disabled={phase !== 'revealed'}
            onClick={() => phase === 'revealed' && setPhase('leaving')}
            className="absolute inset-0 z-10 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'revealed' ? 1 : 0 }}
            transition={{ duration: 0.45, ease: softEase }}
            aria-label="Mở nội dung thiệp cưới"
          >
            <span className="absolute bottom-5 left-1/2 min-h-[36px] -translate-x-1/2 whitespace-nowrap border-b border-gold/70 font-sans text-[10px] font-medium uppercase tracking-label text-rouge-deep">Xem nội dung thiệp</span>
          </motion.button>
        </motion.div>

        <motion.p className="mt-6 min-h-[16px] font-sans text-[10px] font-medium uppercase tracking-label text-rouge-deep/80" animate={{ opacity: phase === 'revealed' ? 1 : 0 }} transition={{ duration: 0.4, ease: softEase }} aria-live="polite">
          {phase === 'revealed' ? 'Thiệp hồng đã mở' : ''}
        </motion.p>
      </div>
    </motion.div>
  )
}
