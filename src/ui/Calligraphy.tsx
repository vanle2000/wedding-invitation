import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { viewportOnce } from '../animations/variants'

interface CalligraphyProps {
  children: ReactNode
  className?: string
  /** Seconds for the pen to travel across the text. */
  duration?: number
  delay?: number
  /** Animate immediately (true) or when scrolled into view (default). */
  immediate?: boolean
  as?: 'span' | 'p' | 'h1' | 'h2'
}

/**
 * Copperplate calligraphy that writes itself onto the page:
 * the text is revealed left→right behind a soft-edged mask, as if a pen were
 * travelling across the line. Honors prefers-reduced-motion.
 */
export default function Calligraphy({
  children,
  className = '',
  duration = 2.2,
  delay = 0,
  immediate = false,
  as = 'span',
}: CalligraphyProps) {
  const reduceMotion = useReducedMotion()
  const Tag = motion[as]
  const hidden = { clipPath: 'inset(-20% 100% -20% 0)' }
  const shown = { clipPath: 'inset(-20% 0% -20% 0)' }
  const transition = { duration: reduceMotion ? 0.6 : duration, delay, ease: [0.4, 0.0, 0.3, 1] as const }

  return (
    <Tag
      className={`font-script inline-block ${className}`}
      initial={hidden}
      {...(immediate ? { animate: shown } : { whileInView: shown, viewport: viewportOnce })}
      transition={transition}
    >
      {children}
    </Tag>
  )
}
