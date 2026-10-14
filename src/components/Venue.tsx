import BotanicalArt from '../art/BotanicalArt'
import { GoldFrame } from '../art/GoldOrnament'
import { directionsUrl, wedding } from '../content/wedding'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Venue() {
  return (
    <section className="canvas-section py-28" aria-labelledby="venue-title">
      <BotanicalArt kind="peony" width="52%" className="-right-[24%] -top-[4%] opacity-24" rotate={-20} flip />
      <SectionHeading id="venue-title" kicker="Le lieu" phrase="Au cœur de Huế" title={wedding.venue.name} />
      <Reveal className="relative mt-7 text-center">
        <address className="not-italic font-serif text-lg leading-relaxed text-ink/72">{wedding.venue.address[0]}<br />{wedding.venue.address[1]}</address>
      </Reveal>
      <Reveal className="relative mt-14 -mx-2" variants={undefined}>
        <GoldFrame className="bg-wine p-2">
          <img src={wedding.venue.image} alt="An atmospheric illustration of the Goldland Plaza celebration" width="800" height="520" loading="lazy" decoding="async" className="block h-auto w-full" />
        </GoldFrame>
      </Reveal>
      <Reveal className="relative mt-10 flex flex-col items-center text-center">
        <p className="max-w-[18rem] text-balance font-serif text-lg italic leading-relaxed text-ink/65">An evening of candlelight, dinner, and dancing in the heart of the city.</p>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-7">View Directions <span aria-hidden="true">→</span></a>
      </Reveal>
    </section>
  )
}
