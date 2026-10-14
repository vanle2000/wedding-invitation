import type { Variants } from 'framer-motion'

export const softEase = [0.22, 0.61, 0.36, 1] as const
export const viewportOnce = { once: true, amount: 0.2 } as const

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.85, ease: softEase } },
  exit: { opacity: 0, transition: { duration: 0.45, ease: softEase } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.95, delay, ease: softEase } }),
}

export const slowScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.15, ease: softEase } },
}

export const sectionReveal = fadeUp

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.025 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: softEase } },
}

/** Flush portrait doors rotate around their outside hinges—no x translation. */
export const leftDoorOpen: Variants = {
  closed: { rotateY: 0 },
  open: { rotateY: 105, transition: { duration: 1.15, ease: softEase } },
}

export const rightDoorOpen: Variants = {
  closed: { rotateY: 0 },
  open: { rotateY: -105, transition: { duration: 1.15, ease: softEase } },
}

export const cardReveal: Variants = {
  covered: { y: 10, scale: 0.96, opacity: 0.76 },
  revealed: { y: -8, scale: 1.025, opacity: 1, transition: { duration: 1.05, ease: softEase } },
}

export const stagger = (gap = 0.12, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
})
