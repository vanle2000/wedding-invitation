import { motion } from 'framer-motion'
import { imageReveal, viewportOnce } from '../animations/variants'
import PaperTexture from '../decorations/PaperTexture'

interface VintagePhotoProps {
  src: string
  alt: string
  /** CSS aspect-ratio, e.g. "4 / 5". */
  ratio?: string
  /** 'frame' adds a thin double hairline border like a mounted print. */
  frame?: boolean
  className?: string
  delay?: number
}

/**
 * Photograph with a vintage treatment: desaturated, warm, low contrast,
 * film grain, and softened edges that melt into the paper.
 */
export default function VintagePhoto({
  src,
  alt,
  ratio = '4 / 5',
  frame = true,
  className = '',
  delay = 0,
}: VintagePhotoProps) {
  return (
    <motion.figure
      className={`relative ${className}`}
      variants={imageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={delay}
    >
      <div className={`relative ${frame ? 'p-2 border border-wedgwood/20' : ''}`}>
        {frame && <div aria-hidden="true" className="absolute inset-[5px] border border-wedgwood/10 pointer-events-none" />}
        <div className="relative overflow-hidden" style={{ aspectRatio: ratio }}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="vintage-photo absolute inset-0 w-full h-full object-cover"
          />
          {/* Soft edge vignette in paper tone */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 36px 10px rgba(250,246,238,0.6)',
            }}
          />
          <PaperTexture opacity={0.12} />
        </div>
      </div>
    </motion.figure>
  )
}
