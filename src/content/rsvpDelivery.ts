import { wedding } from './wedding'

export interface RsvpReply {
  attendance: 'accept' | 'decline'
  name: string
  guests: number
}

export type DeliveryOutcome = 'delivered' | 'draft' | 'preview'

export function formatReply(reply: RsvpReply): string {
  const { couple, date } = wedding
  const response =
    reply.attendance === 'accept'
      ? `joyfully accepts for ${reply.guests} ${reply.guests === 1 ? 'guest' : 'guests'}`
      : 'regretfully declines'

  return [
    `RSVP for ${couple.first} & ${couple.second}`,
    `${date.month} ${date.day}, ${date.year}`,
    '',
    `${reply.name} ${response}.`,
  ].join('\n')
}

/** Deliver through the configured transport and report what actually happened. */
export async function deliverReply(reply: RsvpReply): Promise<DeliveryOutcome> {
  const delivery = wedding.rsvp.delivery

  switch (delivery.method) {
    case 'email': {
      const subject = encodeURIComponent(`RSVP — ${reply.name}`)
      const body = encodeURIComponent(formatReply(reply))
      window.location.href = `mailto:${delivery.to}?subject=${subject}&body=${body}`
      return 'draft'
    }
    case 'sms': {
      const body = encodeURIComponent(formatReply(reply))
      const separator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? '&' : '?'
      window.location.href = `sms:${delivery.to}${separator}body=${body}`
      return 'draft'
    }
    case 'endpoint': {
      const response = await fetch(delivery.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...reply, submittedAt: new Date().toISOString() }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return 'delivered'
    }
    case 'demo':
      await new Promise((resolve) => window.setTimeout(resolve, 650))
      return 'preview'
  }
}
