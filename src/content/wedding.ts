export interface TimelineMoment {
  time: string
  title: string
  note: string
}

export type RsvpDelivery =
  | { method: 'demo' }
  | { method: 'email'; to: string }
  | { method: 'sms'; to: string }
  | { method: 'endpoint'; url: string }

export const wedding = {
  couple: {
    first: 'Phát',
    second: 'Thảo',
    initials: ['P', 'T'] as [string, string],
  },
  date: {
    iso: '2027-02-14T09:00:00+07:00',
    weekday: 'Sunday',
    month: 'February',
    day: '14',
    year: '2027',
    french: '14 Février 2027',
    long: 'Sunday, the fourteenth of February\ntwo thousand and twenty-seven',
  },
  ceremony: {
    label: 'Wedding Ceremony',
    time: '9:00 AM',
  },
  reception: {
    label: 'Evening Reception',
    time: '5:00 PM',
  },
  venue: {
    name: 'Goldland Plaza',
    address: ['14–20 Lý Thường Kiệt, Thuận Hóa', 'Huế, Việt Nam'],
    query: 'Goldland Plaza, Lý Thường Kiệt, Huế',
    image: `${import.meta.env.BASE_URL}images/venue-illustration.svg`,
  },
  timeline: [
    { time: '8:30 AM', title: 'Guests Arrive', note: 'A quiet welcome before the vows' },
    { time: '9:00 AM', title: 'The Ceremony', note: 'Two hearts make one promise' },
    { time: '4:30 PM', title: 'Evening Welcome', note: 'Aperitifs and conversation' },
    { time: '5:00 PM', title: 'The Reception', note: 'Dinner, toasts and dancing' },
  ] as TimelineMoment[],
  rsvp: {
    deadline: 'February 1, 2027',
    delivery: { method: 'demo' } as RsvpDelivery,
  },
  story: {
    introduction: 'In the first bloom of the season, after six years of laughter, letters, and roads travelled between Đà Nẵng and Huế, we invite you into the garden of our beginning.',
    closing: 'Like a garden returning to bloom, our story has been shaped by patience, light, and every person who helped it grow. Thank you for becoming part of our forever.',
  },
} as const

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(wedding.venue.query)}`
