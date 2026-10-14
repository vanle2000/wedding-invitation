import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { fadeIn, fadeUp, softEase } from '../animations/variants'
import { deliverReply, type DeliveryOutcome } from '../content/rsvpDelivery'
import { wedding } from '../content/wedding'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import RoseDecor from '../decorations/RoseDecor'
import RadioOption from '../ui/RadioOption'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

type Attendance = 'accept' | 'decline'
type Status = 'idle' | 'sending' | 'sent' | 'error'

interface FormState {
  attendance: Attendance
  name: string
  guests: string
}

const initial: FormState = { attendance: 'accept', name: '', guests: '1' }

const buttonLabel = {
  email: 'Prepare RSVP Email',
  sms: 'Prepare RSVP Message',
  endpoint: 'Send RSVP',
  demo: 'Preview Reply',
} as const

export default function Rsvp() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<Status>('idle')
  const [outcome, setOutcome] = useState<DeliveryOutcome | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const { delivery } = wedding.rsvp
  const accepting = form.attendance === 'accept'

  const set = <K extends keyof FormState>(key: K) => (value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const validate = () => {
    const next: typeof errors = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    const guests = Number(form.guests)
    if (accepting && (!Number.isInteger(guests) || guests < 1 || guests > 10)) {
      next.guests = 'Please enter a number from 1 to 10.'
    }
    return next
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setStatus('sending')
    try {
      const result = await deliverReply({
        attendance: form.attendance,
        name: form.name.trim(),
        guests: accepting ? Number(form.guests) : 0,
      })
      setOutcome(result)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="rsvp" className="stationery-section py-28" aria-labelledby="rsvp-heading">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[90%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-paper-2/32" />
      <RoseDecor image="coral-bloom" width={145} className="-right-20 -top-2 opacity-28" rotate={-20} flip sway={false} />
      <div aria-hidden="true" className="absolute -left-5 bottom-16 opacity-22">
        <BotanicalDecoration variant="sprig" size={42} />
      </div>

      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="confirmation"
            className="relative flex min-h-[30rem] flex-col items-center justify-center text-center"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="status"
          >
            <div className="text-rose">
              <BotanicalDecoration variant="wreath" size={128} />
            </div>
            <p className="mt-8 font-script text-3xl text-rose">{accepting ? 'With joy' : 'With love'}</p>
            <h2 className="mt-5 max-w-[19rem] text-balance font-display text-[1.75rem] leading-snug text-burgundy">
              {accepting
                ? `Thank you, ${form.name.trim()}. We cannot wait to celebrate with you.`
                : `Thank you, ${form.name.trim()}. You will be in our thoughts.`}
            </h2>
            <p className="label-dark mt-7">
              {outcome === 'delivered' ? 'Reply received' : outcome === 'draft' ? 'Reply prepared' : 'Preview complete'}
            </p>
            {outcome === 'draft' && (
              <p className="mt-4 max-w-[17rem] text-balance font-serif text-base italic text-charcoal/65">
                Your message app has opened a draft. Please press send there to complete your reply.
              </p>
            )}
            {outcome === 'preview' && (
              <p className="mt-4 max-w-[17rem] text-balance font-serif text-base italic text-charcoal/65">
                This is preview mode. A private RSVP destination will be connected before invitations are sent.
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div key="form" className="relative" exit={{ opacity: 0, y: -10, transition: { duration: 0.45, ease: softEase } }}>
            <SectionHeading id="rsvp-heading" kicker={`Kindly reply by ${wedding.rsvp.deadline}`} phrase="Your presence is our present" title="Will You Join Us?" />

            <Reveal delay={0.12}>
              <form onSubmit={submit} noValidate className="mx-auto mt-14 max-w-[20rem]">
                <fieldset className="space-y-2">
                  <legend className="sr-only">Will you attend?</legend>
                  <RadioOption name="attendance" value="accept" label="Joyfully accept" checked={accepting} onChange={(value) => set('attendance')(value as Attendance)} />
                  <RadioOption name="attendance" value="decline" label="Regretfully decline" checked={!accepting} onChange={(value) => set('attendance')(value as Attendance)} />
                </fieldset>

                <div className="mt-12 space-y-9">
                  <Field id="name" label="Full Name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => set('name')(event.target.value)}
                      className="field"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                  </Field>

                  <AnimatePresence initial={false}>
                    {accepting && (
                      <motion.div
                        key="guests"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: softEase }}
                        className="overflow-hidden"
                      >
                        <Field id="guests" label="Number of Guests Including You" error={errors.guests}>
                          <input
                            id="guests"
                            name="guests"
                            type="number"
                            inputMode="numeric"
                            min={1}
                            max={10}
                            step={1}
                            value={form.guests}
                            onChange={(event) => set('guests')(event.target.value)}
                            className="field"
                            aria-invalid={!!errors.guests}
                            aria-describedby={errors.guests ? 'guests-error' : undefined}
                          />
                        </Field>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {status === 'error' && (
                  <p className="mt-7 text-center font-serif text-base text-burgundy" role="alert">
                    We could not prepare your reply. Please try once more.
                  </p>
                )}

                <div className="mt-12 text-center">
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex min-h-[50px] items-center justify-center rounded-[2px] border border-burgundy bg-burgundy px-10 font-sans text-[10px] uppercase tracking-label text-ivory transition-colors duration-500 hover:bg-charcoal disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/35 focus-visible:ring-offset-3 focus-visible:ring-offset-paper"
                    whileTap={{ scale: 0.985 }}
                  >
                    {status === 'sending' ? 'Preparing…' : buttonLabel[delivery.method]}
                  </motion.button>
                </div>
                {delivery.method === 'demo' && <p className="mt-5 text-center font-sans text-[9px] uppercase tracking-editorial text-charcoal/42">Preview mode</p>}
              </form>
            </Reveal>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

interface FieldProps {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="label-dark block">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-error`} role="alert" className="mt-2 font-serif text-sm italic text-burgundy" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
