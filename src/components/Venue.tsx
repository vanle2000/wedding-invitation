import BotanicalArt from '../art/BotanicalArt'
import { GoldFrame } from '../art/GoldOrnament'
import { EvergreenBranch } from '../art/WinterBotanical'
import { directionsUrl, wedding } from '../content/wedding'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Venue() {
  return (
    <section className="canvas-section py-28" aria-labelledby="venue-title">
      <EvergreenBranch width={235} className="absolute -left-20 top-1 opacity-42" />
      <BotanicalArt kind="camellia" width="35%" className="-right-[14%] top-[2%] opacity-42" rotate={-18} flip />
      <SectionHeading id="venue-title" kicker="The gathering place" phrase="Where winter glows warm" title={wedding.venue.name} />
      <Reveal className="relative mt-7 text-center"><address className="not-italic font-serif text-lg leading-relaxed text-ink/72">{wedding.venue.address[0]}<br />{wedding.venue.address[1]}</address></Reveal>
      <Reveal className="relative mt-14 -mx-2"><GoldFrame className="bg-wine p-2"><img src={wedding.venue.image} alt="An atmospheric illustration of the Goldland Plaza celebration" width="800" height="520" loading="lazy" decoding="async" className="block h-auto w-full" /></GoldFrame></Reveal>
      <Reveal className="relative mt-10 flex flex-col items-center text-center"><p className="max-w-[18rem] text-balance font-serif text-lg italic leading-relaxed text-ink/65">Candlelight, dinner, and dancing in the heart of Huế.</p><a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-7">View Directions <span aria-hidden="true">→</span></a></Reveal>
    </section>
  )
}
