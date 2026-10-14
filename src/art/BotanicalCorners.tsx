import BotanicalArt from './BotanicalArt'

interface BotanicalCornersProps {
  className?: string
  mirror?: boolean
  dark?: boolean
  reveal?: boolean
}

/**
 * One unified archival botanical treatment: the same peony and red camellia
 * cut-outs, anchored to opposite frame corners with multiply integration.
 */
export default function BotanicalCorners({ className = '', mirror = false, dark = false, reveal = true }: BotanicalCornersProps) {
  const peonyOpacity = dark ? 0.16 : 0.24
  const camelliaOpacity = dark ? 0.2 : 0.32
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <BotanicalArt
        kind="peony"
        width="58%"
        className={`${mirror ? '-right-[27%]' : '-left-[27%]'} -top-[13%] mix-blend-multiply`}
        rotate={mirror ? -18 : 18}
        flip={mirror}
        opacity={peonyOpacity}
        reveal={reveal}
      />
      <BotanicalArt
        kind="camellia"
        width="38%"
        className={`${mirror ? '-left-[12%]' : '-right-[12%]'} -bottom-[7%] mix-blend-multiply`}
        rotate={mirror ? 14 : -14}
        flip={!mirror}
        opacity={camelliaOpacity}
        reveal={reveal}
      />
    </div>
  )
}
