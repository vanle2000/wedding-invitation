import { motion, useReducedMotion } from 'framer-motion'

interface CandlelightProps {
  lit: boolean
  className?: string
}

/** A quiet row of ceremonial candles; flames appear only after interaction. */
export default function Candlelight({ lit, className = '' }: CandlelightProps) {
  const reduceMotion = useReducedMotion()
  const candles = [
    { x: 34, y: 36, h: 64 },
    { x: 72, y: 18, h: 82 },
    { x: 110, y: 30, h: 70 },
    { x: 148, y: 10, h: 90 },
    { x: 186, y: 27, h: 73 },
  ]
  return (
    <svg viewBox="0 0 220 125" className={className} aria-hidden="true">
      <path d="M10 109 H210" stroke="#BE9B50" strokeWidth="0.8" opacity="0.65" />
      {candles.map((candle, index) => (
        <g key={candle.x}>
          <rect x={candle.x - 8} y={candle.y} width="16" height={candle.h} fill={index % 2 ? '#EFE3D1' : '#F8F1E4'} stroke="#BE9B50" strokeWidth="0.7" />
          <path d={`M${candle.x - 8} ${candle.y + 14} Q${candle.x} ${candle.y + 18} ${candle.x + 8} ${candle.y + 12}`} fill="none" stroke="#D8C68F" strokeWidth="0.5" />
          <line x1={candle.x} y1={candle.y} x2={candle.x} y2={candle.y - 5} stroke="#33292B" strokeWidth="1" />
          <motion.path
            d={`M${candle.x} ${candle.y - 7} C${candle.x - 7} ${candle.y - 15} ${candle.x - 2} ${candle.y - 25} ${candle.x} ${candle.y - 31} C${candle.x + 8} ${candle.y - 20} ${candle.x + 6} ${candle.y - 12} ${candle.x} ${candle.y - 7}Z`}
            fill="#D8A33D"
            initial={false}
            animate={{ opacity: lit ? 1 : 0, scale: lit ? 1 : 0.65, transformOrigin: `${candle.x}px ${candle.y}px` }}
            transition={{ duration: 0.45, delay: lit ? index * 0.12 : 0 }}
          />
          {lit && !reduceMotion && (
            <motion.ellipse
              cx={candle.x}
              cy={candle.y - 18}
              rx="13"
              ry="20"
              fill="#D8A33D"
              opacity="0.12"
              animate={{ opacity: [0.07, 0.17, 0.07], scale: [0.9, 1.08, 0.9] }}
              transition={{ duration: 2.4 + index * 0.16, repeat: Infinity }}
            />
          )}
        </g>
      ))}
    </svg>
  )
}
