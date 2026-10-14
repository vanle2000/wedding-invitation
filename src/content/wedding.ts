/** All replaceable wedding content lives here. */
export interface TimelineItem {
  time: string
  title: string
  detail?: string
}

export interface WeddingContent {
  couple: {
    first: string
    second: string
    initials: [string, string]
  }
  date: {
    iso: string
    month: string
    day: string
    year: string
    weekday: string
    long: string
    numeric: string
  }
  ceremonyTime: string
  receptionTime: string
  venue: {
    name: string
    addressLine1: string
    addressLine2: string
    mapsQuery: string
    photo: string
  }
  couplePhoto: string
  timeline: TimelineItem[]
  rsvp: {
    deadline: string
    delivery:
      | { method: 'email'; to: string }
      | { method: 'sms'; to: string }
      | { method: 'endpoint'; url: string }
      | { method: 'demo' }
  }
  closing: {
    prelude: string
    note: string
    signoff: string
  }
}

export const wedding: WeddingContent = {
  couple: {
    first: 'Phát',
    second: 'Thảo',
    initials: ['P', 'T'],
  },
  date: {
    iso: '2027-02-14T09:00:00+07:00',
    month: 'February',
    day: '14',
    year: '2027',
    weekday: 'Sunday',
    long: 'Sunday, the fourteenth of February\ntwo thousand and twenty-seven',
    numeric: '14 · 02 · 2027',
  },
  ceremonyTime: '9:00 AM',
  receptionTime: '5:00 PM',
  venue: {
    name: 'Goldland Plaza',
    addressLine1: '14–20 Lý Thường Kiệt, Thuận Hóa',
    addressLine2: 'Huế, Việt Nam',
    mapsQuery: 'Goldland Plaza, Lý Thường Kiệt, Huế',
    photo: `${import.meta.env.BASE_URL}images/venue.svg`,
  },
  couplePhoto: `${import.meta.env.BASE_URL}images/couple.svg`,
  // Arrival and evening-welcome times frame the two confirmed event times.
  timeline: [
    { time: '8:30 AM', title: 'Guests Arrive', detail: 'A quiet welcome before the vows' },
    { time: '9:00 AM', title: 'Wedding Ceremony', detail: 'The beginning of forever' },
    { time: '4:30 PM', title: 'Evening Welcome', detail: 'Drinks and conversation' },
    { time: '5:00 PM', title: 'Reception', detail: 'Dinner, toasts and dancing' },
  ],
  rsvp: {
    deadline: 'February 1, 2027',
    // Replace with a real email, SMS number, or HTTPS endpoint before launch.
    delivery: { method: 'demo' },
  },
  closing: {
    prelude: 'One final note',
    note: 'For six years, every road has led us here. On Valentine’s Day, our next chapter begins—and it would not be complete without you.',
    signoff: 'With all our love',
  },
}

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  wedding.venue.mapsQuery,
)}`
