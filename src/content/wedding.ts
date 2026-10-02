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
    /** POST endpoint (Formspree, Getform, Apps Script…). Empty string = demo mode. */
    endpoint: string
  }
}

export const wedding: WeddingContent = {
  couple: {
    first: 'Amélie',
    second: 'Maxime',
    initials: ['A', 'M'],
  },
  date: {
    iso: '2027-06-12T18:00:00+02:00',
    month: 'June',
    day: '12',
    year: '2027',
    weekday: 'Saturday',
    long: 'Saturday, the twelfth of June\ntwo thousand and twenty-seven',
  },
  ceremonyTime: '6:00 PM',
  receptionTime: '8:00 PM',
  venue: {
    name: 'Château de Placeholder',
    addressLine1: '12 Route de la Vallée',
    addressLine2: '37150 Loire Valley, France',
    mapsQuery: 'Château de Chenonceau, 37150 Chenonceaux, France',
    photo: `${import.meta.env.BASE_URL}images/venue.svg`,
  },
  couplePhoto: `${import.meta.env.BASE_URL}images/couple.svg`,
  timeline: [
    { time: '5:30 PM', title: 'Guests Arrive' },
    { time: '6:00 PM', title: 'Ceremony' },
    { time: '7:00 PM', title: 'Cocktail Hour' },
    { time: '8:00 PM', title: 'Dinner & Dancing' },
  ],
  rsvp: {
    deadline: 'the first of May',
    endpoint: '',
  },
}

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  wedding.venue.mapsQuery,
)}`
