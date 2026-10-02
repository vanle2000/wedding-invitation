import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'

export type RoseImage = 'pink-full' | 'coral-full' | 'pink-bloom' | 'coral-bloom'

const base = import.meta.env.BASE_URL
const sources: Record<RoseImage, { src: string; w: number; h: number }> = {
  'pink-full': { src: `${base}images/rose-pink-full.webp`, w: 1091, h: 1400 },
  'coral-full': { src: `${base}images/rose-coral-full.webp`, w: 1092, h: 1400 },
  'pink-bloom': { src: `${base}images/rose-pink-bloom.webp`, w: 1000, h: 539 },
  'coral-bloom': { src: `${base}images/rose-coral-bloom.webp`, w: 1000, h: 577 },
}

interface RoseDecorProps {
  image: RoseImage
  /** Width in px. */
  width: number
  className?: string
  style?: CSSProperties
  flip?: boolean
  rotate?: number
  opacity?: number
  /** Gentle breathing sway (default on). */
  sway?: boolean
  /** Stagger the sway so clusters don't move in unison. */
  delay?: number
}

/**
 * Real botanical art: Pierre-Joseph Redouté's "Les Roses" (1817–1824), public domain,
 * cut out onto transparent backgrounds. Placed around pages as physical flower décor.
 */
export default function RoseDecor({
  image,
  width,
  className = '',
  style,
  flip = false,
  rotate = 0,
  opacity = 1,
  sway = true,
  delay = 0,
}: RoseDecorProps) {
  const reduceMotion = useReducedMotion()
  const s = sources[image]
  const height = (width * s.h) / s.w
  const animate = sway && !reduceMotion ? { rotate: [rotate - 1.2, rotate + 1.2, rotate - 1.2], y: [0, -4, 0] } : { rotate }

  return (
    <motion.img
      src={s.src}
      alt=""
      aria-hidden="true"
      width={s.w}
      height={s.h}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`pointer-events-none select-none absolute ${className}`}
      style={{
        width,
        height,
        opacity,
        scaleX: flip ? -1 : 1,
        filter: 'saturate(0.82) hue-rotate(-6deg) drop-shadow(0 10px 14px rgba(78,106,134,0.18))',
        ...style,
      }}
      animate={animate}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}
