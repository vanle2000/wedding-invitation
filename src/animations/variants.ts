import type { Transition, Variants } from 'framer-motion'

/** Soft paper easing: measured and tactile, without springy overshoot. */
export const softEase = [0.22, 0.61, 0.36, 1] as const
export const slow: Transition = { duration: 0.95, ease: softEase }
export const slower: Transition = { duration: 1.35, ease: softEase }

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: slow },
  exit: { opacity: 0, transition: { duration: 0.55, ease: softEase } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: softEase, delay },
  }),
}

export const slowScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: softEase } },
}

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: softEase, delay },
  }),
}

export const staggerChildren = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.035 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1.35, ease: softEase, delay },
  }),
}

export const waxSealReveal: Variants = {
  hidden: { opacity: 0, scale: 1.14 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.85, ease: softEase } },
  broken: { opacity: 0, scale: 0.9, y: 16, transition: { duration: 0.5, ease: softEase } },
}

/** Reliable 2D fold: the SVG triangle collapses to its fold, then opens upward. */
export const envelopeOpen: Variants = {
  closed: { d: 'M0 104 L320 104 L160 212 Z' },
  open: {
    d: ['M0 104 L320 104 L160 212 Z', 'M0 104 L320 104 L160 108 Z', 'M0 104 L320 104 L160 4 Z'],
    transition: { duration: 1.15, times: [0, 0.46, 1], ease: softEase },
  },
}

export const viewportOnce = { once: true, amount: 0.22 } as const
