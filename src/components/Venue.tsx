import BotanicalArt from '../art/BotanicalArt'
import { GoldFrame } from '../art/GoldOrnament'
import { GardenVine } from '../art/SpringBotanical'
import { directionsUrl, wedding } from '../content/wedding'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Venue() {
  return (
    <section className="canvas-section py-28" aria-labelledby="venue-title">
      <GardenVine width={245} className="absolute -left-20 top-0 opacity-42" /><BotanicalArt kind="peony" width="46%" className="-right-[20%] -top-[2%] opacity-24" rotate={-18} flip />
      <SectionHeading id="venue-title" kicker="Địa điểm tổ chức" phrase="Nơi mình cùng chung bước" title={wedding.venue.name} />
      <Reveal className="relative mt-7 text-center"><address className="not-italic font-serif text-lg leading-relaxed text-ink/72">{wedding.venue.address[0]}<br />{wedding.venue.address[1]}</address></Reveal>
      <Reveal className="relative mt-14 -mx-2"><GoldFrame className="bg-rouge-deep p-2"><img src={wedding.venue.image} alt="Minh họa không gian tiệc cưới tại Goldland Plaza" width="800" height="520" loading="lazy" decoding="async" className="block h-auto w-full" /></GoldFrame></Reveal>
      <Reveal className="relative mt-10 flex flex-col items-center text-center"><p className="max-w-[18rem] text-balance font-serif text-lg italic leading-relaxed text-ink/65">Cùng dùng tiệc, sẻ chia lời chúc và lưu lại những khoảnh khắc đáng nhớ giữa lòng Huế.</p><a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-7">Xem chỉ đường <span aria-hidden="true">→</span></a></Reveal>
    </section>
  )
}
