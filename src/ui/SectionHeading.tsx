import OrnamentalDivider from '../decorations/OrnamentalDivider'
import Reveal from './Reveal'

interface SectionHeadingProps {
  id: string
  kicker: string
  title: string
  phrase?: string
  className?: string
}

/** Shared editorial heading—not a card, just type and a hairline ornament on paper. */
export default function SectionHeading({ id, kicker, title, phrase, className = '' }: SectionHeadingProps) {
  return (
    <Reveal className={`relative text-center ${className}`}>
      <p className="label">{kicker}</p>
      {phrase && <p className="mt-4 font-script text-2xl text-rose">{phrase}</p>}
      <h2 id={id} className="mt-4 font-display text-[2.15rem] leading-[1.08] text-burgundy text-balance">
        {title}
      </h2>
      <div className="mt-7 text-gold">
        <OrnamentalDivider variant="leaf" width={128} />
      </div>
    </Reveal>
  )
}
