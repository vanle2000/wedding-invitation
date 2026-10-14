import type { CSSProperties } from 'react'

const petals = [
  { left: 7, size: 18, duration: 17, delay: -4, drift: 34, turn: 230 },
  { left: 16, size: 13, duration: 21, delay: -13, drift: -24, turn: -180 },
  { left: 29, size: 16, duration: 19, delay: -8, drift: 28, turn: 260 },
  { left: 41, size: 11, duration: 23, delay: -17, drift: -20, turn: -210 },
  { left: 53, size: 17, duration: 20, delay: -2, drift: 32, turn: 200 },
  { left: 64, size: 12, duration: 24, delay: -10, drift: -27, turn: -240 },
  { left: 73, size: 15, duration: 18, delay: -15, drift: 23, turn: 280 },
  { left: 82, size: 10, duration: 22, delay: -5, drift: -18, turn: -200 },
  { left: 90, size: 16, duration: 25, delay: -20, drift: 26, turn: 250 },
  { left: 96, size: 12, duration: 19, delay: -11, drift: -22, turn: -220 },
] as const

type PetalStyle = CSSProperties & {
  '--petal-left': string
  '--petal-size': string
  '--petal-duration': string
  '--petal-delay': string
  '--petal-drift': string
  '--petal-turn': string
}

/** Ten deterministic CSS particles—no runtime allocation loop or animation timer. */
export default function FallingPetals() {
  return (
    <div className="petal-layer" aria-hidden="true">
      {petals.map((petal) => {
        const style: PetalStyle = {
          '--petal-left': `${petal.left}%`,
          '--petal-size': `${petal.size}px`,
          '--petal-duration': `${petal.duration}s`,
          '--petal-delay': `${petal.delay}s`,
          '--petal-drift': `${petal.drift}px`,
          '--petal-turn': `${petal.turn}deg`,
          backgroundImage: `url(${import.meta.env.BASE_URL}images/peony-petal.png)`,
        }
        return <span key={petal.left} className="falling-petal" style={style} />
      })}
    </div>
  )
}
