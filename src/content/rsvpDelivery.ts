import { wedding } from './wedding'

export interface RsvpReply {
  attendance: 'accept' | 'decline'
  name: string
  guests: number
}

export type RsvpOutcome = 'delivered' | 'draft' | 'preview'

export function formatReply(reply: RsvpReply): string {
  const response =
    reply.attendance === 'accept'
      ? `xác nhận tham dự cùng ${reply.guests} ${reply.guests === 1 ? 'khách' : 'khách mời'}`
      : 'tiếc rằng không thể tham dự'
  return [`PHẢN HỒI THIỆP CƯỚI — ${wedding.couple.first} & ${wedding.couple.second}`, wedding.date.display, '', `${reply.name} ${response}.`].join('\n')
}

export async function deliverReply(reply: RsvpReply): Promise<RsvpOutcome> {
  const delivery = wedding.rsvp.delivery
  if (delivery.method === 'demo') {
    await new Promise((resolve) => window.setTimeout(resolve, 600))
    return 'preview'
  }
  if (delivery.method === 'email') {
    window.location.href = `mailto:${delivery.to}?subject=${encodeURIComponent(`Phản hồi thiệp cưới — ${reply.name}`)}&body=${encodeURIComponent(formatReply(reply))}`
    return 'draft'
  }
  if (delivery.method === 'sms') {
    const separator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? '&' : '?'
    window.location.href = `sms:${delivery.to}${separator}body=${encodeURIComponent(formatReply(reply))}`
    return 'draft'
  }

  const response = await fetch(delivery.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...reply, submittedAt: new Date().toISOString() }),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return 'delivered'
}
