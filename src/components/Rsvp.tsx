import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { fadeIn, softEase } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { EvergreenBranch } from '../art/WinterBotanical'
import { deliverReply, type RsvpOutcome } from '../content/rsvpDelivery'
import { wedding } from '../content/wedding'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

type Attendance = 'accept' | 'decline'

export default function Rsvp() {
  const [attendance, setAttendance] = useState<Attendance>('accept')
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('1')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [outcome, setOutcome] = useState<RsvpOutcome | null>(null)
  const [error, setError] = useState('')
  const accepting = attendance === 'accept'

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim()) return setError('Please tell us your name.')
    const count = Number(guests)
    if (accepting && (!Number.isInteger(count) || count < 1 || count > 10)) return setError('Please enter 1–10 guests.')
    setError(''); setStatus('sending')
    try {
      const result = await deliverReply({ attendance, name: name.trim(), guests: accepting ? count : 0 })
      setOutcome(result); setStatus('sent')
    } catch { setStatus('error') }
  }

  if (status === 'sent') {
    return (
      <section className="canvas-section flex min-h-[42rem] flex-col items-center justify-center text-center" aria-label="RSVP confirmation">
        <BotanicalArt kind="camellia" width="44%" className="-right-[13%] top-[6%] opacity-45" rotate={-20} flip />
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="relative">
          <p className="font-script text-3xl text-rose">Merci, {name.trim()}</p>
          <h2 className="mt-6 max-w-[19rem] text-balance font-display text-[2rem] leading-tight text-oxblood">{accepting ? 'We cannot wait to celebrate with you.' : 'You will be in our thoughts.'}</h2>
          <p className="eyebrow mt-8">{outcome === 'delivered' ? 'Reply received' : outcome === 'draft' ? 'Reply prepared—please press send' : 'Preview complete'}</p>
          {outcome === 'preview' && <p className="mx-auto mt-5 max-w-[17rem] font-serif text-base italic text-ink/60">Preview mode is active until a private RSVP destination is connected.</p>}
        </motion.div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="canvas-section py-28" aria-labelledby="rsvp-title">
      <EvergreenBranch width={215} className="absolute -right-20 -top-3 opacity-38" flip />
      <BotanicalArt kind="peony" width="42%" className="-right-[22%] top-[8%] opacity-20" rotate={-18} flip />
      <SectionHeading id="rsvp-title" kicker={`Répondez avant le ${wedding.rsvp.deadline}`} phrase="Votre présence est un cadeau" title="Will You Join Us?" />
      <Reveal className="relative mx-auto mt-14 max-w-[20rem]">
        <form onSubmit={submit} noValidate>
          <fieldset className="space-y-2">
            <legend className="sr-only">Attendance</legend>
            <Choice label="Joyfully accept" value="accept" selected={attendance} onSelect={setAttendance} />
            <Choice label="Regretfully decline" value="decline" selected={attendance} onSelect={setAttendance} />
          </fieldset>
          <div className="mt-11 space-y-9">
            <label className="block"><span className="eyebrow text-oxblood">Full Name</span><input className="field" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" aria-invalid={!!error && !name.trim()} /></label>
            <AnimatePresence initial={false}>
              {accepting && <motion.label className="block overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: softEase }}><span className="eyebrow text-oxblood">Number of Guests Including You</span><input className="field" type="number" inputMode="numeric" min="1" max="10" value={guests} onChange={(event) => setGuests(event.target.value)} /></motion.label>}
            </AnimatePresence>
          </div>
          {(error || status === 'error') && <p className="mt-6 text-center font-serif text-base italic text-camellia" role="alert">{error || 'We could not prepare your reply. Please try again.'}</p>}
          <div className="mt-11 text-center"><motion.button type="submit" disabled={status === 'sending'} className="min-h-[50px] border border-oxblood bg-oxblood px-10 font-sans text-[9px] uppercase tracking-label text-ivory transition-colors duration-500 hover:bg-wine disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-3 focus-visible:ring-offset-ivory" whileTap={{ scale: 0.985 }}>{status === 'sending' ? 'Preparing…' : wedding.rsvp.delivery.method === 'demo' ? 'Preview Reply' : 'Send RSVP'}</motion.button></div>
          {wedding.rsvp.delivery.method === 'demo' && <p className="mt-5 text-center font-sans text-[8px] uppercase tracking-editorial text-ink/40">Preview mode</p>}
        </form>
      </Reveal>
    </section>
  )
}

function Choice({ label, value, selected, onSelect }: { label: string; value: Attendance; selected: Attendance; onSelect: (value: Attendance) => void }) {
  const checked = value === selected
  return <label className="flex min-h-[48px] cursor-pointer items-center gap-4"><input className="sr-only" type="radio" name="attendance" value={value} checked={checked} onChange={() => onSelect(value)} /><span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full border border-oxblood/55">{checked && <span className="h-2.5 w-2.5 rounded-full bg-camellia" />}</span><span className="font-serif text-xl text-ink">{label}</span></label>
}
