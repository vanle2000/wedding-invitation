# Le Printemps de l’Amour — Phát & Thảo

A senior-level mobile wedding invitation built as a French spring garden folio: lifted deep rouge, warm ivory, antique gold, airy sage vines, archival peonies, and red camellias.

React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion

## Wedding details

- **Couple:** Phát & Thảo
- **Date:** Sunday, February 14, 2027
- **Ceremony:** 9:00 AM
- **Reception:** 5:00 PM
- **Venue:** Goldland Plaza, 14–20 Lý Thường Kiệt, Thuận Hóa, Huế

Replaceable content is centralized in `src/content/wedding.ts`.

## Experience

1. **French garden gatefold** — lifted-rouge doors, fine gold rules, peony and camellia art, sage vines, drifting petals, and a gold P&T medallion.
2. **Invitation** — generous ivory space, Parisienne names, a spring-bud ornament, and florals crossing the paper edge.
3. **Details** — a refined rouge insert with the February date and confirmed 9:00 AM / 5:00 PM times.
4. **Venue** — Goldland Plaza with a custom ivory, rouge, sage, and gold architectural illustration.
5. **Timeline** — a pale-sage editorial sequence with a thin gold line.
6. **RSVP** — attendance, full name, and guest count only; transparent hairline inputs and truthful delivery states.
7. **Final bloom** — touching the peony opens it petal-by-petal and reveals the couple’s last letter.

## Visual system

- Lifted rouge `#852E43`; rouge deep `#692235`; camellia `#AB3E53`
- Rose `#BC7180`; blush `#E9CDD3`; blush light `#F3E3E6`
- Warm ivory `#FAF6EC`; parchment `#F1E8DA`
- Sage `#79846E`; sage light `#DDE2D6`
- Antique gold `#C2A15A`; gold light `#DEC994`; ink `#3E3235`
- Parisienne only for names and short intimate phrases
- Bodoni Moda for headings/dates; Cormorant Garamond for prose; Jost for functional labels
- Primary canvas 390 × 844 px; fluid from 320–430 px; centered at 430 px on desktop
- Safe areas, keyboard focus handoff, inert closed content, and reduced motion included

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
    GoldOrnament.tsx
    PaperGrain.tsx
    RoyalMedallion.tsx
    SpringBotanical.tsx   # GardenVine, PetalDrift, SpringDivider, BloomMark
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

Both attached plates were isolated from their scanned paper, cleaned, and optimized locally. The vines, petals, flower divider, interactive bloom, frame, and medallion are original SVG components.

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
