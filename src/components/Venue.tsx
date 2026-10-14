import BotanicalCorners from '../art/BotanicalCorners'
import { GoldFrame } from '../art/GoldOrnament'
import { directionsUrl, mapEmbedUrl, wedding } from '../content/wedding'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Venue() {
  return (
    <section className="canvas-section py-28" aria-labelledby="venue-title">
      <BotanicalCorners mirror />
      <SectionHeading id="venue-title" kicker="Địa điểm tổ chức" phrase="Nơi mình cùng chung bước" title={wedding.venue.name} />
      <Reveal className="relative mt-7 text-center">
        <address className="not-italic font-serif text-lg leading-relaxed text-ink/72">{wedding.venue.address[0]}<br />{wedding.venue.address[1]}</address>
      </Reveal>

      <Reveal className="relative mx-auto mt-14 max-w-[19rem]">
        <GoldFrame className="bg-rouge-deep p-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-parchment">
            <iframe
              title="Bản đồ Goldland Plaza"
              src={mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0 grayscale-[65%] sepia-[12%] contrast-[0.88]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 border border-trim/30 mix-blend-multiply" />
          </div>
        </GoldFrame>
      </Reveal>

      <Reveal className="relative mt-10 flex flex-col items-center text-center">
        <p className="max-w-[18rem] text-balance font-serif text-lg italic leading-relaxed text-ink/65">Cùng dùng tiệc, sẻ chia lời chúc và lưu lại những khoảnh khắc đáng nhớ giữa lòng Huế.</p>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-7">Xem chỉ đường <span aria-hidden="true">→</span></a>
      </Reveal>
    </section>
  )
}
