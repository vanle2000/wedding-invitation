import type { Transition, Variants } from 'framer-motion'

/** Soft, paper-like easing — decelerates gently with no overshoot. */
export const softEase = [0.22, 0.61, 0.36, 1] as const

export const slow: Transition = { duration: 1.0, ease: softEase }
export const slower: Transition = { duration: 1.4, ease: softEase }

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: slow },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { ...slow, delay } }),
}

export const slowScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.8, ease: softEase } },
}

/** Default section reveal: opacity 0→1, y 20→0, ~1s. Accepts a `custom` delay in seconds. */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: softEase, delay },
  }),
}

/** Stagger container for children using fadeUp/sectionReveal. */
export const staggerChildren = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

/** Photographs: slow fade with a gentle de-zoom, like a print settling into its frame. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: softEase, delay },
  }),
}

/** Wax seal: presses into the paper. */
export const waxSealReveal: Variants = {
  hidden: { opacity: 0, scale: 1.25 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.34, 1.2, 0.64, 1] } },
}

/** Envelope flap: rotates around its top edge. Parent must set perspective. */
export const envelopeOpen: Variants = {
  closed: { rotateX: 0 },
  open: { rotateX: -180, transition: { duration: 1.6, ease: softEase } },
}

/** Viewport options for scroll-triggered reveals. */
export const viewportOnce = { once: true, amount: 0.25 } as const
