import BotanicalArt from '../art/BotanicalArt'
import { GoldFrame } from '../art/GoldOrnament'
import { GardenVine } from '../art/SpringBotanical'
import { directionsUrl, wedding } from '../content/wedding'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Venue() {
  return (
    <section className="canvas-section py-28" aria-labelledby="venue-title">
      <GardenVine width={245} className="absolute -left-20 top-0 opacity-42" />
      <BotanicalArt kind="peony" width="46%" className="-right-[20%] -top-[2%] opacity-24" rotate={-18} flip />
      <SectionHeading id="venue-title" kicker="The gathering place" phrase="Au cœur de Huế" title={wedding.venue.name} />
      <Reveal className="relative mt-7 text-center"><address className="not-italic font-serif text-lg leading-relaxed text-ink/72">{wedding.venue.address[0]}<br />{wedding.venue.address[1]}</address></Reveal>
      <Reveal className="relative mt-14 -mx-2"><GoldFrame className="bg-rouge-deep p-2"><img src={wedding.venue.image} alt="An elegant illustration of the Goldland Plaza celebration" width="800" height="520" loading="lazy" decoding="async" className="block h-auto w-full" /></GoldFrame></Reveal>
      <Reveal className="relative mt-10 flex flex-col items-center text-center"><p className="max-w-[18rem] text-balance font-serif text-lg italic leading-relaxed text-ink/65">An evening of flowers, dinner, and dancing in the heart of Huế.</p><a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-7">View Directions <span aria-hidden="true">→</span></a></Reveal>
    </section>
  )
}
