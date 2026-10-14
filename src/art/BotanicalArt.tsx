import { motion } from 'framer-motion'
import { imageReveal, viewportOnce } from '../animations/variants'

export type BotanicalKind = 'peony' | 'camellia'

const sources = {
  peony: { src: `${import.meta.env.BASE_URL}images/peony-antique.webp`, width: 1068, height: 1250 },
  camellia: { src: `${import.meta.env.BASE_URL}images/camellia-red.webp`, width: 327, height: 334 },
} as const

interface BotanicalArtProps {
  kind: BotanicalKind
  width: number | string
  className?: string
  flip?: boolean
  rotate?: number
  opacity?: number
  eager?: boolean
  reveal?: boolean
}

/** Public-domain archival botanical plate, isolated on transparent paper. */
export default function BotanicalArt({
  kind,
  width,
  className = '',
  flip = false,
  rotate = 0,
  opacity = 1,
  eager = false,
  reveal = true,
}: BotanicalArtProps) {
  const source = sources[kind]
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block select-none ${className}`}
      style={{ width, opacity }}
      variants={reveal ? imageReveal : undefined}
      initial={reveal ? 'hidden' : false}
      whileInView={reveal ? 'visible' : undefined}
      viewport={reveal ? viewportOnce : undefined}
    >
      <img
        src={source.src}
        alt=""
        width={source.width}
        height={source.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
        className="h-auto w-full"
        style={{ transform: `scaleX(${flip ? -1 : 1}) rotate(${rotate}deg)`, transformOrigin: 'center' }}
      />
    </motion.span>
  )
}
