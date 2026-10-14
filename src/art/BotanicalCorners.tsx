interface BotanicalCornersProps {
  className?: string
  mirror?: boolean
  dark?: boolean
}

const base = import.meta.env.BASE_URL

/** One photographic peony style, anchored to opposite frame edges. */
export default function BotanicalCorners({ className = '', mirror = false, dark = false }: BotanicalCornersProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={`${base}images/peony-open-isolated.png`}
        alt=""
        width="1100"
        height="731"
        loading="lazy"
        decoding="async"
        className={`absolute -top-[6%] w-[56%] mix-blend-multiply ${mirror ? '-right-[24%] -scale-x-100' : '-left-[24%]'} ${dark ? 'opacity-18' : 'opacity-26'}`}
      />
      <img
        src={`${base}images/peony-blush-pair.png`}
        alt=""
        width="810"
        height="824"
        loading="lazy"
        decoding="async"
        className={`absolute -bottom-[10%] w-[45%] mix-blend-multiply ${mirror ? '-left-[16%] -scale-x-100' : '-right-[16%]'} ${dark ? 'opacity-18' : 'opacity-32'}`}
      />
    </div>
  )
}
