# Une Saison Pour Toujours — Phát & Thảo

An original mobile-first winter wedding invitation: evergreen velvet, oxblood ribbon, ivory correspondence paper, antique gold, candlelight, archival camellias, and the quiet warmth of a February celebration.

This project shares only the broad seasonal vocabulary of the user-provided marketplace reference. Its composition, copy, artwork, components, and interactions are original.

React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion

## Wedding details

- **Couple:** Phát & Thảo
- **Date:** Sunday, February 14, 2027
- **Ceremony:** 9:00 AM
- **Reception:** 5:00 PM
- **Venue:** Goldland Plaza, 14–20 Lý Thường Kiệt, Thuận Hóa, Huế

Replaceable content is centralized in `src/content/wedding.ts`.

## Experience

1. **Winter gatefold** — evergreen velvet doors joined by an oxblood ribbon and gold P&T medallion. Pressing the ornament opens the folio; the revealed ivory invitation becomes the second touch target.
2. **Invitation** — “Une Saison Pour Toujours,” French handwriting, evergreen framing, red camellia and antique peony.
3. **Details** — an oxblood winter insert with the February date and confirmed 9:00 AM / 5:00 PM times.
4. **Venue** — Goldland Plaza with a custom candlelit oxblood-and-gold illustration.
5. **Timeline** — a dark-evergreen editorial sequence with holly, berries, pine and snow.
6. **RSVP** — attendance, full name and guest count only; truthful preview/draft/delivered states.
7. **Candlelight closing** — guests light five ceremonial candles to reveal the final love letter.

## Visual system

- Evergreen `#17382F`; pine `#294B3C`
- Oxblood `#681C2A`; wine `#4A101B`; cranberry `#92283A`; camellia `#A52A3C`
- Warm ivory `#F8F1E4`; parchment `#EFE3D1`; snow `#E8E4DA`
- Antique gold `#BE9B50`; gold light `#D8C68F`
- Parisienne only for names and short intimate phrases
- Bodoni Moda for headings/dates; Cormorant Garamond for prose; Jost for functional labels
- Custom SVG `EvergreenBranch`, `WinterSparkles`, `HollyDivider`, pinecone and `Candlelight`—no marketplace graphics
- Primary canvas 390 × 844 px; fluid from 320–430 px; centered at 430 px on desktop
- Safe areas, keyboard focus handoff, inert closed content and reduced motion included

## Architecture

```text
src/
  App.tsx
  animations/variants.ts
  content/
    wedding.ts
    rsvpDelivery.ts
  art/
    BotanicalArt.tsx
    Candlelight.tsx
    GoldOrnament.tsx
    PaperGrain.tsx
    RoyalMedallion.tsx
    WinterBotanical.tsx
  ui/
    Reveal.tsx
    SectionHeading.tsx
  components/
    GatefoldCover.tsx
    InvitationCanvas.tsx
    Invitation.tsx
    Details.tsx
    Venue.tsx
    Timeline.tsx
    Rsvp.tsx
    Closing.tsx
```

## Archival botanical art

- `peony-antique.webp` — [Jacques Le Moyne de Morgues, *Peony*](https://commons.wikimedia.org/wiki/File:Jacques_Le_Moyne_de_Morgues._Peony.jpg), public domain.
- `camellia-red.webp` — [Kawahara Keiga, *Camellia japonica*](https://commons.wikimedia.org/wiki/File:Camellia_japonica_%E3%83%84%E3%83%90%E3%82%AD.jpg), public domain.

Both attached plates were isolated from their scanned paper, cleaned and optimized locally. All evergreen, holly, snow, pinecone, candle and ornament graphics are original SVG components.

## RSVP

The current build uses preview mode. Before sending invitations, set `wedding.rsvp.delivery`:

```ts
{ method: 'email', to: 'you@example.com' }
{ method: 'sms', to: '+84901234567' }
{ method: 'endpoint', url: 'https://…' }
{ method: 'demo' }
```

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

Pushing `main` deploys through `.github/workflows/deploy.yml`.
