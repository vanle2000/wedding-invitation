import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { fadeIn, softEase } from '../animations/variants'
import BotanicalArt from '../art/BotanicalArt'
import { GardenVine } from '../art/SpringBotanical'
import { deliverReply, type RsvpOutcome } from '../content/rsvpDelivery'
import { wedding } from '../content/wedding'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

type Attendance = 'accept' | 'decline'

const submitLabels = {
  demo: 'Xem thử phản hồi',
  email: 'Soạn email phản hồi',
  sms: 'Soạn tin nhắn phản hồi',
  endpoint: 'Gửi phản hồi',
} as const

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
    if (!name.trim()) return setError('Vui lòng cho chúng mình biết tên của bạn.')
    const count = Number(guests)
    if (accepting && (!Number.isInteger(count) || count < 1 || count > 10)) return setError('Vui lòng nhập số khách từ 1 đến 10.')
    setError(''); setStatus('sending')
    try {
      const result = await deliverReply({ attendance, name: name.trim(), guests: accepting ? count : 0 })
      setOutcome(result); setStatus('sent')
    } catch { setStatus('error') }
  }

  if (status === 'sent') {
    return <section className="canvas-section flex min-h-[42rem] flex-col items-center justify-center text-center" aria-label="Xác nhận phản hồi"><BotanicalArt kind="camellia" width="44%" className="-right-[13%] top-[6%] opacity-45" rotate={-20} flip /><motion.div variants={fadeIn} initial="hidden" animate="visible" className="relative"><p className="font-script text-3xl text-rose">Cảm ơn, {name.trim()}</p><h2 className="mt-6 max-w-[19rem] text-balance font-display text-[1.85rem] leading-tight text-rouge-deep">{accepting ? 'Chúng mình rất mong được đón bạn trong ngày vui.' : 'Chúng mình sẽ luôn nhớ đến bạn trong ngày đặc biệt này.'}</h2><p className="eyebrow mt-8">{outcome === 'delivered' ? 'Đã nhận phản hồi' : outcome === 'draft' ? 'Đã soạn phản hồi — vui lòng nhấn gửi' : 'Đã hoàn tất bản xem thử'}</p>{outcome === 'preview' && <p className="mx-auto mt-5 max-w-[17rem] font-serif text-base italic text-ink/60">Thiệp đang ở chế độ xem thử cho đến khi kết nối địa chỉ nhận phản hồi riêng.</p>}</motion.div></section>
  }

  return (
    <section id="rsvp" className="canvas-section py-28" aria-labelledby="rsvp-title">
      <GardenVine width={220} className="absolute -right-20 -top-3 opacity-28" flip /><BotanicalArt kind="peony" width="42%" className="-right-[22%] top-[8%] opacity-18" rotate={-18} flip />
      <SectionHeading id="rsvp-title" kicker={`Vui lòng phản hồi trước ${wedding.rsvp.deadline}`} phrase="Sự hiện diện của bạn là món quà quý" title="Bạn Sẽ Đến Chung Vui Chứ?" />
      <Reveal className="relative mx-auto mt-14 max-w-[20rem]"><form onSubmit={submit} noValidate><fieldset className="space-y-2"><legend className="sr-only">Xác nhận tham dự</legend><Choice label="Vui mừng tham dự" value="accept" selected={attendance} onSelect={setAttendance} /><Choice label="Tiếc rằng không thể tham dự" value="decline" selected={attendance} onSelect={setAttendance} /></fieldset><div className="mt-11 space-y-9"><label className="block"><span className="eyebrow text-rouge-deep">Họ và tên</span><input className="field" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" aria-invalid={!!error && !name.trim()} /></label><AnimatePresence initial={false}>{accepting && <motion.label className="block overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: softEase }}><span className="eyebrow text-rouge-deep">Số khách gồm cả bạn</span><input className="field" type="number" inputMode="numeric" min="1" max="10" value={guests} onChange={(event) => setGuests(event.target.value)} /></motion.label>}</AnimatePresence></div>{(error || status === 'error') && <p className="mt-6 text-center font-serif text-base italic text-camellia" role="alert">{error || 'Không thể chuẩn bị phản hồi. Vui lòng thử lại.'}</p>}<div className="mt-11 text-center"><motion.button type="submit" disabled={status === 'sending'} className="min-h-[50px] border border-rouge bg-rouge px-10 font-sans text-[10px] font-medium uppercase tracking-label text-ivory transition-colors duration-500 hover:bg-rouge-deep disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-3 focus-visible:ring-offset-ivory" whileTap={{ scale: 0.985 }}>{status === 'sending' ? 'Đang chuẩn bị…' : submitLabels[wedding.rsvp.delivery.method]}</motion.button></div>{wedding.rsvp.delivery.method === 'demo' && <p className="mt-5 text-center font-sans text-[9px] font-medium uppercase tracking-editorial text-rouge-deep/70">Chế độ xem thử</p>}</form></Reveal>
    </section>
  )
}

function Choice({ label, value, selected, onSelect }: { label: string; value: Attendance; selected: Attendance; onSelect: (value: Attendance) => void }) {
  const checked = value === selected
  return <label className="flex min-h-[48px] cursor-pointer items-center gap-4"><input className="peer sr-only" type="radio" name="attendance" value={value} checked={checked} onChange={() => onSelect(value)} /><span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full border border-rouge/55 peer-focus-visible:ring-2 peer-focus-visible:ring-gold peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ivory">{checked && <span className="h-2.5 w-2.5 rounded-full bg-camellia" />}</span><span className="font-serif text-lg leading-snug text-ink">{label}</span></label>
}
