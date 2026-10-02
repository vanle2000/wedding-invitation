import { directionsUrl, wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import RoseDecor from '../decorations/RoseDecor'
import Reveal from '../ui/Reveal'
import VintagePhoto from '../ui/VintagePhoto'

/** Editorial venue page: label, large serif name, address, photograph, hairline link. */
export default function Venue() {
  const { venue } = wedding
  return (
    <section className="relative bg-paper px-8 pt-32 pb-24 overflow-hidden" aria-labelledby="venue-heading">
      <RoseDecor image="coral-bloom" width={190} className="-left-14 -top-10" rotate={28} delay={0.3} />
      <div className="pointer-events-none absolute right-2 bottom-6 opacity-85">
        <BotanicalDecoration variant="olive-branch" size={140} flip />
      </div>

      <Reveal className="text-center">
        <p className="label">The Ball shall be held at</p>
        <h2 id="venue-heading" className="mt-5 font-display text-charcoal text-[2.2rem] leading-[1.12] text-balance">
          {venue.name}
        </h2>
        <address className="not-italic mt-5 font-serif text-lg text-charcoal/75 leading-relaxed">
          {venue.addressLine1}
          <br />
          {venue.addressLine2}
        </address>
      </Reveal>

      <div className="mt-12 -mx-2">
        <VintagePhoto src={venue.photo} alt={venue.name} ratio="3 / 2" frame={false} />
      </div>

      <Reveal delay={0.2} className="mt-10 flex justify-center">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hairline-link min-h-[44px] items-end"
        >
          View Directions
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mb-[1px]" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </Reveal>

      <Reveal as="p" delay={0.3} className="mt-6 text-center font-serif italic text-charcoal/60 text-base">
        A luncheon at the hour of the Horse — carriages at half past one.
      </Reveal>
    </section>
  )
}
