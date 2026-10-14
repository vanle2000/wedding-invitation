import { directionsUrl, wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import RoseDecor from '../decorations/RoseDecor'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import VintagePhoto from '../ui/VintagePhoto'

/** Venue presented as an editorial place feature, not a map or UI card. */
export default function Venue() {
  const { venue } = wedding
  return (
    <section className="stationery-section py-28" aria-labelledby="venue-heading">
      <RoseDecor image="pink-full" width={170} className="-right-24 top-0 opacity-28" rotate={-18} flip sway={false} />
      <div aria-hidden="true" className="absolute -left-8 bottom-8 opacity-25">
        <BotanicalDecoration variant="olive-branch" size={150} />
      </div>

      <SectionHeading id="venue-heading" kicker="The place" phrase="Where our forever begins" title={venue.name} />

      <Reveal as="p" delay={0.1} className="relative mx-auto mt-6 text-center">
        <address className="not-italic font-serif text-lg leading-relaxed text-charcoal/72">
          {venue.addressLine1}
          <br />
          {venue.addressLine2}
        </address>
      </Reveal>

      <div className="relative mt-14 -mx-7 sm:-mx-9">
        <div aria-hidden="true" className="absolute inset-x-0 -top-px z-10 h-px bg-gold/35" />
        <VintagePhoto src={venue.photo} alt={venue.name} ratio="3 / 2" frame={false} />
        <div aria-hidden="true" className="absolute inset-x-0 -bottom-px z-10 h-px bg-gold/35" />
      </div>

      <Reveal delay={0.15} className="relative mt-10 flex flex-col items-center text-center">
        <p className="font-serif text-lg italic text-charcoal/65">In the heart of Huế</p>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="hairline-link mt-6">
          View Directions
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </Reveal>
    </section>
  )
}
