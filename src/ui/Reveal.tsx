import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { sectionReveal, viewportOnce } from '../animations/variants'

interface RevealProps {
  as?: 'div' | 'section' | 'p' | 'h2' | 'h3' | 'li' | 'figure' | 'header' | 'footer'
  variants?: Variants
  delay?: number
  className?: string
  children?: ReactNode
  id?: string
}

const tags = {
  div: motion.div,
  section: motion.section,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  li: motion.li,
  figure: motion.figure,
  header: motion.header,
  footer: motion.footer,
} as const

/**
 * Scroll-triggered reveal wrapper. Defaults to the sectionReveal variant
 * (opacity 0→1, y 20→0, ~1s, soft easing). Plays once.
 */
export default function Reveal({
  as = 'div',
  variants = sectionReveal,
  delay = 0,
  className,
  children,
  id,
}: RevealProps) {
  const Tag = tags[as]
  return (
    <Tag
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={delay}
    >
      {children}
    </Tag>
  )
}
