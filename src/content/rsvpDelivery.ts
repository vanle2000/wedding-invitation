import { wedding } from './wedding'

export interface RsvpReply {
  attendance: 'accept' | 'decline'
  name: string
  phone: string
  guests: number
}

/** Human-readable message used for email / SMS replies. */
export function formatReply(r: RsvpReply): string {
  const { couple } = wedding
  const line = r.attendance === 'accept' ? `joyfully accepts (${r.guests} ${r.guests === 1 ? 'guest' : 'guests'})` : 'regretfully declines'
  return [`RSVP for ${couple.first} & ${couple.second}`, '', `${r.name} ${line}.`, `Phone: ${r.phone}`].join('\n')
}

/**
 * Delivers the reply according to wedding.rsvp.delivery.
 * Email/SMS open the guest's own app pre-filled — no server required.
 */
export async function deliverReply(r: RsvpReply): Promise<void> {
  const d = wedding.rsvp.delivery
  switch (d.method) {
    case 'email': {
      const subject = encodeURIComponent(`RSVP — ${r.name}`)
      const body = encodeURIComponent(formatReply(r))
      window.location.href = `mailto:${d.to}?subject=${subject}&body=${body}`
      return
    }
    case 'sms': {
      const body = encodeURIComponent(formatReply(r))
      // iOS uses "&body=", Android uses "?body=". Both accept this form.
      window.location.href = `sms:${d.to}?&body=${body}`
      return
    }
    case 'endpoint': {
      const res = await fetch(d.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...r, submittedAt: new Date().toISOString() }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return
    }
    case 'demo':
      await new Promise((resolve) => setTimeout(resolve, 900))
  }
}
