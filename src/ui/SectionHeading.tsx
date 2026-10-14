import { GoldDivider } from '../art/GoldOrnament'
import Reveal from './Reveal'

interface SectionHeadingProps {
  kicker: string
  title: string
  phrase?: string
  id: string
  dark?: boolean
}

export default function SectionHeading({ kicker, title, phrase, id, dark = false }: SectionHeadingProps) {
  return (
    <Reveal className="relative text-center">
      <p className={dark ? 'section-label-light' : 'section-label'}>{kicker}</p>
      {phrase && <p className={`romantic-script mt-4 text-2xl ${dark ? 'text-gold-light' : 'text-rose'}`}>{phrase}</p>}
      <h2 id={id} className={`mt-4 text-balance font-display text-[2.05rem] font-light leading-[1.24] tracking-[0.02em] ${dark ? 'text-ivory' : 'text-rouge-deep'}`}>
        {title}
      </h2>
      <GoldDivider className="mt-7" />
    </Reveal>
  )
}
