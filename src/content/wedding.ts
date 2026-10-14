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
    first: 'Lê Tấn Phát',
    second: 'Dương Nguyệt Thảo',
    givenFirst: 'Phát',
    givenSecond: 'Thảo',
    initials: ['P', 'T'] as [string, string],
  },
  date: {
    iso: '2027-02-14T09:00:00+07:00',
    weekday: 'Chủ Nhật',
    month: 'Tháng Hai',
    day: '14',
    year: '2027',
    display: '14 tháng 02 năm 2027',
    long: 'Chủ Nhật, ngày 14 tháng 02 năm 2027',
  },
  ceremony: {
    label: 'Lễ thành hôn',
    time: '9:00',
  },
  reception: {
    label: 'Tiệc cưới',
    time: '17:00',
  },
  venue: {
    name: 'Goldland Plaza',
    address: ['14–20 Lý Thường Kiệt, Thuận Hóa', 'Huế, Việt Nam'],
    query: 'Goldland Plaza, Lý Thường Kiệt, Huế',
    image: `${import.meta.env.BASE_URL}images/venue-illustration.svg`,
  },
  timeline: [
    { time: '08:30', title: 'Đón khách', note: 'Gặp gỡ và lưu lại những khoảnh khắc đầu tiên' },
    { time: '09:00', title: 'Lễ thành hôn', note: 'Hai trái tim cùng trao một lời nguyện ước' },
    { time: '16:30', title: 'Đón khách dự tiệc', note: 'Cùng nâng ly và sẻ chia niềm vui' },
    { time: '17:00', title: 'Tiệc cưới', note: 'Dùng tiệc, chúc mừng và chung vui' },
  ] as TimelineMoment[],
  rsvp: {
    deadline: '01 tháng 02 năm 2027',
    delivery: { method: 'demo' } as RsvpDelivery,
  },
  story: {
    introduction: 'Sau sáu năm của tiếng cười, những lá thư và những cung đường giữa Đà Nẵng – Huế, chúng mình trân trọng mời bạn đến chứng kiến ngày hai trái tim cùng chung một nhịp.',
    closing: 'Như khu vườn trở lại mùa hoa, câu chuyện của chúng mình được vun đắp bằng sự kiên nhẫn, ánh sáng và tình thương. Cảm ơn bạn đã trở thành một phần trong hành trình trọn đời này.',
  },
} as const

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(wedding.venue.query)}`
