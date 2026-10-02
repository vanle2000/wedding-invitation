import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { fadeIn, fadeUp, softEase } from '../animations/variants'
import { wedding } from '../content/wedding'
import { deliverReply } from '../content/rsvpDelivery'
import BotanicalDecoration from '../decorations/BotanicalDecoration'
import OrnamentalDivider from '../decorations/OrnamentalDivider'
import RoseDecor from '../decorations/RoseDecor'
import Reveal from '../ui/Reveal'
import RadioOption from '../ui/RadioOption'

type Attendance = 'accept' | 'decline'
type Status = 'idle' | 'sending' | 'sent' | 'error'

interface FormState {
  attendance: Attendance
  name: string
  phone: string
  guests: string
}

const initial: FormState = { attendance: 'accept', name: '', phone: '', guests: '1' }

export default function Rsvp() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const set = <K extends keyof FormState>(key: K) => (value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = () => {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = 'Please tell us your name.'
    if (!/^[+\d][\d\s().-]{6,}$/.test(form.phone.trim())) e.phone = 'Please enter a valid phone number.'
    const n = Number(form.guests)
    if (form.attendance === 'accept' && (!Number.isInteger(n) || n < 1 || n > 10)) {
      e.guests = 'Between 1 and 10, please.'
    }
    return e
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    setStatus('sending')
    try {
      await deliverReply({
        attendance: form.attendance,
        name: form.name.trim(),
        phone: form.phone.trim(),
        guests: form.attendance === 'accept' ? Number(form.guests) : 0,
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const accepting = form.attendance === 'accept'
  const { delivery } = wedding.rsvp

  return (
    <section id="rsvp" className="relative bg-paper px-8 pt-32 pb-24 overflow-hidden" aria-labelledby="rsvp-heading">
      <RoseDecor image="coral-bloom" width={200} className="-right-12 -top-2" rotate={-156} flip delay={0.9} />
      <div className="pointer-events-none absolute -left-5 top-14 opacity-85 rotate-[8deg]">
        <BotanicalDecoration variant="sprig" size={40} />
      </div>

      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="confirmation"
            className="flex flex-col items-center text-center"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            role="status"
          >
            <div className="text-rose">
              <BotanicalDecoration variant="wreath" size={120} />
            </div>
            <p className="mt-8 font-script text-3xl text-rose">
              {accepting ? 'Splendid' : 'With regret'}
            </p>
            <h2 className="mt-4 font-display text-charcoal text-[1.75rem] leading-snug text-balance max-w-[18rem]">
              {accepting ? `Thank you, ${form.name.trim()}. We look forward to celebrating with you.` : `Thank you, ${form.name.trim()}. You will be missed.`}
            </h2>
            <p className="mt-6 label">
              {accepting
                ? `${form.guests} ${Number(form.guests) === 1 ? 'guest' : 'guests'} · reply received`
                : 'reply received'}
            </p>
            {(delivery.method === 'email' || delivery.method === 'sms') && (
              <p className="mt-6 font-serif italic text-charcoal/65 text-base max-w-[17rem] text-balance">
                {delivery.method === 'email'
                  ? 'Your mail app has opened with the reply — simply press send.'
                  : 'Your messages app has opened with the reply — simply press send.'}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div key="form" exit={{ opacity: 0, y: -10, transition: { duration: 0.6, ease: softEase } }}>
            <Reveal className="text-center">
              <p className="label">Kindly reply by {wedding.rsvp.deadline}</p>
              <p className="mt-5 font-script text-2xl text-rose leading-none">Save us a dance?</p>
              <h2 id="rsvp-heading" className="mt-4 font-display text-burgundy text-[1.7rem] uppercase tracking-[0.12em] leading-snug">
                Will you be
                <br />
                attending?
              </h2>
              <div className="mt-8 text-rose">
                <OrnamentalDivider variant="hairline" width={110} />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={submit} noValidate className="mt-12 mx-auto max-w-[20rem]">
                <fieldset className="space-y-1">
                  <legend className="sr-only">Attendance</legend>
                  <RadioOption name="attendance" value="accept" label="I shall attend with pleasure" checked={accepting} onChange={(v) => set('attendance')(v as Attendance)} />
                  <RadioOption name="attendance" value="decline" label="I must regretfully decline" checked={!accepting} onChange={(v) => set('attendance')(v as Attendance)} />
                </fieldset>

                <div className="mt-12 space-y-9">
                  <Field id="name" label="Full Name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => set('name')(e.target.value)}
                      className="field"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                  </Field>

                  <Field id="phone" label="Phone Number" error={errors.phone}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => set('phone')(e.target.value)}
                      className="field"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                  </Field>

                  <motion.div
                    initial={false}
                    animate={{ opacity: accepting ? 1 : 0.35 }}
                    transition={{ duration: 0.6 }}
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
                        onChange={(e) => set('guests')(e.target.value)}
                        disabled={!accepting}
                        className="field disabled:cursor-not-allowed"
                        aria-invalid={!!errors.guests}
                        aria-describedby={errors.guests ? 'guests-error' : undefined}
                      />
                    </Field>
                  </motion.div>
                </div>

                {status === 'error' && (
                  <p className="mt-8 text-center font-serif text-charcoal/80" role="alert">
                    We couldn&rsquo;t send your reply. Please try again in a moment.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-12 w-full min-h-[54px] rounded-[4px] bg-burgundy text-paper font-sans font-light text-xs uppercase tracking-label
                    transition-colors duration-500 hover:bg-charcoal disabled:opacity-70
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.2 }}
                >
                  {status === 'sending' ? 'Sending' : 'Send RSVP'}
                </motion.button>
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
      <label htmlFor={id} className="label-dark block mb-1">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            className="mt-2 font-serif italic text-sm text-charcoal/70"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
