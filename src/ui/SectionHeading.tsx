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
      <p className={dark ? 'eyebrow-gold' : 'eyebrow'}>{kicker}</p>
      {phrase && <p className={`mt-4 font-script text-2xl ${dark ? 'text-gold-light' : 'text-rose'}`}>{phrase}</p>}
      <h2 id={id} className={`mt-4 font-display text-[2.15rem] leading-[1.1] text-balance ${dark ? 'text-ivory' : 'text-rouge-deep'}`}>
        {title}
      </h2>
      <GoldDivider className="mt-7" />
    </Reveal>
  )
}
