# Wedding Invitation

A mobile-first interactive digital wedding invitation in a bright, warm Bridgerton
Regency style: light pink paper, gold filigree frames, burgundy ink, pastel botanicals,
a Whistledown-style letter, and a wax-sealed envelope you tap to open.

React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build → dist/
npm run preview    # serve dist/ locally
npm run typecheck  # tsc only
npm run lint       # oxlint
```

## Personalise

All content lives in `src/content/wedding.ts`. Replace the placeholders; no component changes needed.

| Key | Controls |
| --- | --- |
| `couple.first`, `couple.second`, `couple.initials` | Names everywhere; initials drive the monogram, wax seal and closing |
| `date.*` | Month / day / year / weekday blocks and the long-form date line |
| `ceremonyTime`, `receptionTime` | Details page |
| `venue.*` | Name, address, Google Maps query for "View Directions", venue photo |
| `couplePhoto` | Framed portrait on the invitation page |
| `timeline[]` | Vertical timeline entries |
| `rsvp.deadline` | Shown above the form |
| `rsvp.delivery` | How replies reach you — see below |

Photos: drop real images into `public/images/` and update the paths. The `VintagePhoto`
component applies the desaturated, warm, low-contrast, grained treatment automatically.

### RSVP delivery (no backend needed)

```ts
delivery: { method: 'email', to: 'you@example.com' }   // default — opens guest's mail app, pre-filled
delivery: { method: 'sms',   to: '+14155550123' }      // opens guest's messages app, pre-filled
delivery: { method: 'endpoint', url: 'https://…' }     // POST JSON to Formspree / Getform / Apps Script
delivery: { method: 'demo' }                           // show confirmation without sending
```

Email/SMS replies read: `RSVP for A & M · Jane Doe joyfully accepts (2 guests). Phone: …`.
Endpoint payload: `{ attendance: "accept" | "decline", name, phone, guests, submittedAt }`.

## Structure

```
src/
  content/wedding.ts            all wedding content
  animations/variants.ts        fadeIn, fadeUp, slowScale, sectionReveal, imageReveal,
                                waxSealReveal, envelopeOpen, staggerChildren
  decorations/
    BotanicalDecoration.tsx     rose branch · sprig · peony · corner · landscape · wreath (pastel Bridgerton palette)
    OrnamentalDivider.tsx       hairline · leaf · dots
    Monogram.tsx                circular botanical monogram
    WaxSeal.tsx                 burgundy seal with gold embossed initials
    RegencyFrame.tsx            gilded frame with scrolled corners
    Bee.tsx                     the Regency bee signature mark
    PaperTexture.tsx            procedural film grain overlay
  ui/
    Reveal.tsx                  scroll-triggered reveal wrapper
    VintagePhoto.tsx            framed photograph with vintage treatment
    RadioOption.tsx             custom radio control
  components/
    Envelope.tsx                full-screen opening sequence
    MonogramReveal.tsx          sage page with monogram
    Invitation.tsx · Details.tsx · Venue.tsx · Timeline.tsx · Rsvp.tsx · Closing.tsx
  App.tsx                       phase state + centred mobile-width sheet
```

## Design notes

- Palette: `#FBEFF0` blush paper, `#F6DEE2` rose paper, `#FFF9F3` ivory, `#C9788A` rose, `#8B2E41` burgundy, `#4A3338` charcoal, `#C9A961` gold, `#C3B1D9` wisteria.
- Type: Bodoni Moda (display), Cormorant Garamond (serif), Jost (labels), Parisienne (small script phrases only).
- Mobile target 390 × 844; tested range 320–430 px. On desktop the sheet is centred at 430 px on a neutral surround.
- Safe areas: `env(safe-area-inset-top/bottom)` on the envelope, monogram page and closing.
- Reduced motion: the envelope sequence shortens to a brief fade.

## Deploy

`vite.config.ts` sets `base: './'`, so `dist/` works unchanged on GitHub Pages, Netlify or Vercel.
