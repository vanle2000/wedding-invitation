/**
 * Single source of truth for all wedding content.
 * Replace the placeholders here; no component needs to change.
 */
export interface TimelineItem {
  time: string
  title: string
}

export interface WeddingContent {
  couple: {
    first: string
    second: string
    /** Single initials used for the monogram and wax seal, e.g. "A" and "M". */
    initials: [string, string]
  }
  date: {
    /** ISO 8601 with offset — used only if you add a countdown later. */
    iso: string
    month: string // "JUNE"
    day: string // "12"
    year: string // "2027"
    weekday: string // "Saturday"
    long: string // "Saturday, the twelfth of June, two thousand twenty-seven"
  }
  ceremonyTime: string
  receptionTime: string
  venue: {
    name: string
    addressLine1: string
    addressLine2: string
    /** Google Maps query for directions. */
    mapsQuery: string
    photo: string
  }
  couplePhoto: string
  timeline: TimelineItem[]
  rsvp: {
    deadline: string
    /**
     * How replies reach you. No backend needed for 'email' or 'sms':
     *  - { method: 'email', to: 'you@example.com' }  → opens the guest's mail app, pre-filled
     *  - { method: 'sms',   to: '+14155550123' }     → opens the guest's messages app, pre-filled
     *  - { method: 'endpoint', url: 'https://…' }    → POSTs JSON to Formspree / Getform / Apps Script
     *  - { method: 'demo' }                          → shows the confirmation without sending
     */
    delivery:
      | { method: 'email'; to: string }
      | { method: 'sms'; to: string }
      | { method: 'endpoint'; url: string }
      | { method: 'demo' }
  }
}

export const wedding: WeddingContent = {
  couple: {
    first: 'Phát',
    second: 'Thảo',
    initials: ['P', 'T'],
  },
  date: {
    iso: '2027-02-15T11:00:00+07:00',
    month: 'February',
    day: '15',
    year: '2027',
    weekday: 'Monday',
    long: 'Monday, the fifteenth of February\ntwo thousand and twenty-seven',
  },
  // TODO confirm with the couple — reception is a lunch (giờ Ngọ); morning ceremonies at home.
  ceremonyTime: '9:00 AM',
  receptionTime: '11:30 AM',
  venue: {
    name: 'Goldland Plaza',
    addressLine1: '14–20 Lý Thường Kiệt, Thuận Hóa',
    addressLine2: 'Huế, Việt Nam',
    mapsQuery: 'Goldland Plaza, Lý Thường Kiệt, Huế',
    photo: `${import.meta.env.BASE_URL}images/venue.svg`,
  },
  couplePhoto: `${import.meta.env.BASE_URL}images/couple.svg`,
  timeline: [
    { time: '11:00 AM', title: 'Guests Arrive' },
    { time: '11:30 AM', title: 'Ceremony' },
    { time: '12:00 PM', title: 'Lunch Banquet' },
    { time: '1:30 PM', title: 'Farewell' },
  ],
  rsvp: {
    deadline: 'the first of February',
    delivery: { method: 'email', to: 'couple@example.com' },
  },
}

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  wedding.venue.mapsQuery,
)}`
