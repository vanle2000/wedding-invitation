import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewportOnce } from '../animations/variants'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
  as?: 'div' | 'section' | 'header' | 'footer' | 'figure' | 'p' | 'h2' | 'li'
}

const elements = {
  div: motion.div,
  section: motion.section,
  header: motion.header,
  footer: motion.footer,
  figure: motion.figure,
  p: motion.p,
  h2: motion.h2,
  li: motion.li,
}

export default function Reveal({ children, className = '', delay = 0, variants = fadeUp, as = 'div' }: RevealProps) {
  const Element = elements[as]
  return (
    <Element className={className} variants={variants} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={delay}>
      {children}
    </Element>
  )
}
